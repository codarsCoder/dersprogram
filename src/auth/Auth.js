import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from 'src/redux/userslice';

const Auth = ({children}) => {

      // router tanımla 
  const router = useRouter()


  // redux tan user al 
 const user = useSelector((state => state.user))
 const dispatch = useDispatch()


 useEffect(() => {

    if (!router.isReady) {
        return
      }
      
   // kullanıcının maili reduxdan gelmiyorsa anasayfaya at
   if (!user.token &&  router.pathname !== '/register') {
     router.push("/login")
   } else {
    dispatch(setLoader({status:false})) //preloaderdeki işlemi burada iptal ettik
   }
 }, [user])

 return (
    <>{children}</>
  )

}

export default Auth