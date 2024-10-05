import React, { useEffect, useState } from 'react'
import AppRouter from './router'
import { useDispatch } from 'react-redux';
import { getUser } from './api/auth-service';
import { login, logout } from './store/slices/auth-slice';
import LoadingSpinner from './component/common/loading-spinner';

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const loadData = async () => { 
    try {
    const resp = await getUser();
    dispatch(login(resp));
    } catch (err) {
      console.log(err);
      dispatch(logout());
    }
    finally{
      setLoading(false);
    }
   }

   useEffect(() => {
     loadData();
     // eslint-disable-next-line
   }, [])
   

  return <>{loading ? <LoadingSpinner/> : <AppRouter/>}</>
};
   
export default App