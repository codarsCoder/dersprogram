import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../pages/api/axiosWithToken';
import { setLoader, userLogout } from 'src/redux/userslice';
import { toast } from 'react-toastify';

const Auth = ({ children }) => {

  // router tanımla 
  const router = useRouter()

  const { axiosWithToken } = useAxios();

  // redux tan user al 
  const user = useSelector((state => state.user))
  const dispatch = useDispatch()

  useEffect(() => {

    const checkTokenn = async () => {
      if (axiosWithToken) {
        const { data } = await axiosWithToken.post('', {
          "query": "select",
          "service": "checkToken"
        });

        if (!data.status) {
          toast.error("Giriş süreniz doldu tekrar giriş yapınız!")
          dispatch(userLogout())
          router.push("/login")
        }

      } else { //axioswithtoken boş gelmişse demekki hiç token vs yok 
        // toast.error("Giriş süreniz doldu tekrar giriş yapınız!")
        dispatch(userLogout())
        router.push("/login")
      }
    }

    checkTokenn();

  }, [router.pathname])

  useEffect(() => {

    if (!router.isReady) {
      return
    }

    // kullanıcının maili reduxdan gelmiyorsa anasayfaya at
    if (!user.token && router.pathname !== '/register') {
      router.push("/login")
    } else {
      dispatch(setLoader({ status: false })) //preloaderdeki işlemi burada iptal ettik
    }
  }, [user])

  return (
    <>{children}</>
  )

}

export default Auth