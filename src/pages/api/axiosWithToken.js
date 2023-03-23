import axios from "axios";
import { useRouter } from "next/router";

// ** Config
import authConfig from 'src/configs/auth'
import { useAuth } from "src/hooks/useAuth";

const BASE_URL = "https://localhost/";

//* Axios Instance for Public API Request
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxios = () => {

  const router = useRouter()
  const { logout } = useAuth()

  const storedToken = window.sessionStorage.getItem(authConfig.storageTokenKeyName) || JSON.parse(window.localStorage.getItem('userData'))
  let axiosWithToken;

  if (storedToken) {

    //* Axios Instance for Private API Request
    
    axiosWithToken = axios.create({
      baseURL: BASE_URL,
      headers: { Authorization: `Token ${storedToken}` },
    });

  } else {

    if (router.asPath !== '/') {
      router.replace({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      })
    } else {
      router.push('/login')
    }

  }


  return { axiosWithToken };
};

export default useAxios;
