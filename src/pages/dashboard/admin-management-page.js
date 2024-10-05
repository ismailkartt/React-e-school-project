import React from 'react'
import AdminList from '../../component/dashboard/admin-management/admin-list'
import { useSelector } from 'react-redux'
import Spacer from '../../component/common/spacer';
import NewAdminForm from '../../component/dashboard/admin-management/new-admin-form';

const AdminManagementPage = () => {

  const { currentOperation } = useSelector(state => state.misc);

  return (
    <>
        <Spacer/>
        {
          currentOperation === "new" && (
            <>
              <NewAdminForm/>
              <Spacer/>
            </>
          )
        }
        <AdminList/>
        <Spacer/>
    </>
  )
}

export default AdminManagementPage