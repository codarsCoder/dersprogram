import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// http://localhost/dersprogram/

const BASE_URL = "https://codarscoder.tk/dersprogrami/";

//* Axios Instance for Public API Request
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxios =  () => {

  const router = useRouter()


  // redux tan user al 
  const token = useSelector((state => state.user.token))


  let axiosWithToken;

  if (token) {

    //* Axios Instance for Private API Request

    axiosWithToken =  axios.create({
      baseURL: BASE_URL,
      headers: { Authorization: token },
    });

  }



  return { axiosWithToken };
};

export default useAxios;

// const { axiosWithToken } = useAxios();
// try {
//   const {data}=  await axiosWithToken.post('', {
//       query: 'select',
//       service: 'userlogout',
//     });
//     console.log(data)
//   } catch (error) {
//     console.error(error);
//   }