import axios from 'axios';
import { useState } from 'react';

const useVericek = () => {

    const url = "https://whereishelal.demoservis.com";
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const postData = async (dt) => {

        try {
            const {data} = await axios.post(url, dt);
            setResponseData(data);
        } catch (error) {
            setError(error);
        }
    };

    return { responseData, error, postData };
//  kullanımı   const { responseData, isLoading, error, postData } = useAxiosPost();
};

export default useVericek;