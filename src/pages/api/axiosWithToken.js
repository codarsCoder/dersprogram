import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";


const BASE_URL = "https://localhost/";

//* Axios Instance for Public API Request
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxios = () => {

  const router = useRouter()


  // redux tan user al 
  const token = useSelector((state => state.user.token))


  let axiosWithToken;

  if (token) {

    //* Axios Instance for Private API Request
    
    axiosWithToken = axios.create({
      baseURL: BASE_URL,
      headers: { Authorization: `Token ${token}` },
    });

  } else {
    router.push('/login')

  }

//   const { data } = await axiosWithToken.get(`account/${user?.id}/`) kullanım

  return { axiosWithToken };
};

export default useAxios;
