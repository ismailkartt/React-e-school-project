import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { swalAlert, swalConfirm } from '../../../helpers/functions/swal'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { setCurrentRecord, setListRefreshToken, setOperation } from '../../../store/slices/misc-slice'
import { deleteStudent, getStudentsByPage } from '../../../api/student-service'


const StudentList = () => {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const {listRefreshToken} = useSelector(state => state.misc); 

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  })

  const loadData = async (page) => {
    setLoading(true);
    try {
      const resp = await getStudentsByPage(page, lazyState.rows);
      setUsers(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
  }

  const getFullName = (row) => {
    return `${row.name} ${row.surname}`;
  }

  const onPage = (event) => {
    setlazyState(event);
  }

  const handleDelete = async (id) => {
    const resp = await swalConfirm("Are you sure to delete?");
    if (!resp.isConfirmed) return;
    setLoading(true);
    try {
      await deleteStudent(id);
      dispatch(setListRefreshToken(Math.random()))
      swalAlert("Student was deleted", "success");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => { 
    dispatch(setCurrentRecord(row));
    dispatch(setOperation("edit"));
   }

  const handleNewUser = () => {
    dispatch(setOperation("new"));
  }

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState, listRefreshToken]);
  

  const getOperationButtons = (row) => {
    if(row.built_in){
      return null;
    }
    return (
      <div>
        <Button className='btn-link' onClick={() => handleEdit(row)}>
          <FaEdit/>
        </Button>
        <Button className='btn-link' onClick={() => handleDelete(row.userId)}>
          <FaTimes/>
        </Button>
      </div>
    )
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className='d-flex justify-content-between'>
            <span>Student List</span>
            <Button onClick={handleNewUser}>New Student</Button> 
          </Card.Title>

          <DataTable
            lazy
            dataKey="id"
            totalRecords={totalRows}
            loading={loading}
            value={users}
            paginator
            rows={lazyState.rows}
            first={lazyState.first}
            onPage={onPage}
          >
          
            <Column body={getFullName} header="Name"></Column> 
            <Column field="gender" header="Gender"></Column> 
            <Column field="phoneNumber" header="Phone Number"></Column>
            <Column field="ssn" header="SSN"></Column>
            <Column field="username" header="User Name"></Column> 
            <Column body={getOperationButtons} headerStyle={{width: "120px"}}></Column>  


          </DataTable>

        </Card.Body>
      </Card>
    </Container>
  )
}

export default StudentList