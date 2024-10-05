import React from 'react'
import { useSelector } from 'react-redux'
import StudentList from '../../component/dashboard/student-management/student-list'
import NewStudentForm from '../../component/dashboard/student-management/new-student-form'
import EditStudentForm from '../../component/dashboard/student-management/edit-student-form'
import Spacer from '../../component/common/spacer'

const StudentManagementPage = () => {

    const { currentOperation } = useSelector((state) => state.misc);

  return (
    <>
        <Spacer/>
        {
            currentOperation === "new" && (
                <>
                    <NewStudentForm/>
                    <Spacer/>
                </>
            )
        }
        {
            currentOperation === "edit" && (
                <>
                    <EditStudentForm/>
                    <Spacer/>
                </>
            )
        }
        <StudentList/>
        <Spacer/>
    </>
  )
}

export default StudentManagementPage