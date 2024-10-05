import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getContactMessageByPage } from "../../../api/contact-message-services";

const ContactMessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const loadData = async (page) => {
    setLoading(true);
    try {
      const resp = await getContactMessageByPage(page, lazyState.rows);
      setMessages(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyState]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Contact Message List</Card.Title>

          <DataTable
            value={messages}
            lazy
            dataKey={(e) => {
              return Math.random();
            }}
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRows}
            onPage={onPage}
            loading={loading}
            tableStyle={{ minWidth: "100%" }}
            stripedRows
          >
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email" />
            <Column field="date" header="Date" />
            <Column field="subject" header="Subject" />
            <Column field="message" header="Message" />
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactMessageList;
