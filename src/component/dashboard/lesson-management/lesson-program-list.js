import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setListRefreshToken, setOperation } from '../../../store/slices/misc-slice';
import { deleteLessonProgram, getLessonProgramsByPage } from '../../../api/lesson-program-service';
import { swalAlert, swalConfirm } from '../../../helpers/functions/swal';

const LessonProgramList = () => {

    const [list, setList] = useState([]);
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
        const resp = await getLessonProgramsByPage(page, lazyState.rows);
        setList(resp.content);
        setTotalRows(resp.totalElements);
      } catch (err) {
        console.log(err);
      } finally{
        setLoading(false);
      }
    }
  
    const onPage = (event) => {
      setlazyState(event);
    }
  
    const handleDelete = async (id) => {
      const resp = await swalConfirm("Are you sure to delete?");
      if (!resp.isConfirmed) return;
      setLoading(true);
      try {
        await deleteLessonProgram(id);
        dispatch(setListRefreshToken(Math.random()));
        swalAlert("Program was deleted", "success");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
  
    const getLessonsNames = (row) => { 
      return row.lessonName.map((item)=>item.lessonName).join("-")
     }
  
    const handleNewRecord = () => {
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
          <Button className='btn-link' onClick={() => handleDelete(row.lessonProgramId)}>
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
            <span>Lesson Program List</span>
            <Button onClick={handleNewRecord}>New Lesson Program</Button>
          </Card.Title>

          <DataTable
            lazy
            dataKey="lessonProgramId"
            totalRecords={totalRows}
            loading={loading}
            value={list}
            paginator
            rows={lazyState.rows}
            first={lazyState.first}
            onPage={onPage}
          >
          
            <Column body={getLessonsNames} header="Lessons"></Column> 
            <Column field='day' header="Day"></Column> 
            <Column field="startTime" header="Start Time"></Column> 
            <Column field="stopTime" header="Stop Time"></Column>
            <Column body={getOperationButtons} headerStyle={{width: "120px"}}></Column>  


          </DataTable>

        </Card.Body>
      </Card>
    </Container>
  )
}

export default LessonProgramList