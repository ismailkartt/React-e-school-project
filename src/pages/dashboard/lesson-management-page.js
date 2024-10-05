import React, { useState } from 'react'
import Spacer from '../../component/common/spacer'
import { Tab, Tabs } from 'react-bootstrap'
import EducationTermList from '../../component/dashboard/lesson-management/education-term-list'
import { useSelector } from 'react-redux'
import NewEducationTermForm from '../../component/dashboard/lesson-management/new-education-term-form';
import LessonList from '../../component/dashboard/lesson-management/lesson-list'
import NewLessonProgramForm from '../../component/dashboard/lesson-management/new-lesson-program-form'
import NewLessonForm from '../../component/dashboard/lesson-management/new-lesson-form'
import LessonProgramList from '../../component/dashboard/lesson-management/lesson-program-list'
import LessonAssignment from '../../component/dashboard/lesson-management/lesson-assignment'

const LessonManagementPage = () => {

    const [key, setKey] = useState("terms");
    const { currentOperation } = useSelector(state => state.misc);


  return (
    <>
        <Spacer/>
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill={true}
        >
            <Tab eventKey="terms" title="Education Term">
                <Spacer height={30}/>
                {
                    currentOperation === "new" && 
                    <>
                        <NewEducationTermForm/>
                        <Spacer/>
                    </>
                }
                <EducationTermList/>    
            </Tab>
            <Tab eventKey="lessons" title="Lessons">
            <Spacer height={30}/>
                {
                    currentOperation === "new" && 
                    <>
                        <NewLessonForm/>
                        <Spacer height={30}/>
                    </>
                }
                <Spacer height={30}/>
                <LessonList/>
            </Tab>
            <Tab eventKey="programs" title="Lesson Programs">
            <Spacer height={30}/>
                {
                    currentOperation === "new" && 
                    <>
                        <NewLessonProgramForm/>
                        <Spacer height={30}/>
                    </>
                }
                <LessonProgramList/>
                <Spacer height={30}/>
                <LessonAssignment/>
                <Spacer height={30}/>
            </Tab>
        </Tabs>
        <Spacer height={30}/>
    </>
  )
}

export default LessonManagementPage