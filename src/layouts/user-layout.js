import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCurrentRecord, setOperation } from '../store/slices/misc-slice';
import UserMenu from '../component/common/user-menu';

const UserLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);   
    dispatch(setCurrentRecord(null));
    dispatch(setOperation(null));
    setLoading(false);
  }, [pathname])

  if(loading) return null;

  return (
    <>
        <UserMenu/>
        <Outlet/>
    </>
  )
}

export default UserLayout