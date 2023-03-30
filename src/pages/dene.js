import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyTable = () => {

  // Örnek bir dizi oluşturun
  const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  // Şu anki tarihi alın
  const today = new Date();
  
  // Haftanın ilk günü olan pazartesinin tarihini hesaplayın
  const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  
  const getEntries = async (dates) => {


    const headers = {
        'Content-Type': 'application/json', // request body'nin json formatında olduğunu belirtmek için
        'Authorization': "d145f1e018c6958987921cd4d1f45d05", // gerekirse authentication token'ı da ekleyebilirsiniz
        // diğer isteğe bağlı headerlar
      };

      const { data } = await axios.post('http://localhost/dersprogram/', {
        "query" : "select",
        "service" : "scheduleEntry",
        "dates": dates
      },  {headers} );
   
      

  }

  useEffect(() => {
    
    const today = new Date();

    // Bu haftanın başlangıç tarihini hesaplayın
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);

    // Tablodaki tarihlerin saklanacağı bir dizi oluşturun
    const dates = {};

    // Her bir günün karşısına o günün tarihini yazdırın
    for (let i = 0; i < daysOfWeek.length; i++) {
      const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      const formattedDate = date.toLocaleDateString('tr-TR').split('.').reverse().join('-');
      dates[daysOfWeek[i]] = formattedDate;
    }



  getEntries(dates)
    
    
  }, [])
  



  return (
  <div></div>
  );
};


  
export default MyTable;
