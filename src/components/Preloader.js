import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from 'src/redux/userslice';


const Preloader = () => {

  // redux tan user al 
  const user = useSelector((state => state.user))
  const dispatch = useDispatch()

useEffect(() => {
 dispatch(setLoader({status:true}))  // sayfa yenilendiğinde aktif olsun yani bir sayfaya girilmeye çalışılırsa preloader aktif olsunsayfa gözükmesin 
}, [])



  return (
    <>
      {
        user.preLoader &&
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      }
    </>
  );


};

export default Preloader;
