import React from 'react'
import Spacer from '../../component/common/spacer'
import { useSelector } from 'react-redux';
import NewTeacherForm from '../../component/dashboard/teacher-manager-management/new-teacher-form';
import EditTeacherForm from '../../component/dashboard/teacher-manager-management/edit-teacher-form';
import TeacherList from '../../component/dashboard/teacher-manager-management/teacher-list';

const TeacherManagementPage = () => {

  const { currentOperation } = useSelector((state) => state.misc);

  return (
    <>
    <Spacer/>
    {
        currentOperation === "new" && (
            <>
                <NewTeacherForm/>
                <Spacer/>
            </>
        )
    }
    {
        currentOperation === "edit" && (
            <>
                <EditTeacherForm/>
                <Spacer/>
            </>
        )
    }
    <TeacherList/>
    <Spacer/>
</>
  )
}

export default TeacherManagementPage