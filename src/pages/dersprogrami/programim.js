import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, Typography, Button, Grid, TableFooter, CircularProgress, Box } from '@mui/material';
import useAxios from '../api/axiosWithToken';
import { Plus } from 'mdi-material-ui';
import { toast } from 'react-toastify';
import axios from 'axios';

function Programim() {
  const [schedule, setSchedule] = useState({});
  const [questions, setQuestions] = useState()
  const [dates, setDates] = useState() // gün-tarih listesi o haftanın tarihleri içinde 
  const [entries, setEntries] = useState() //mevcut girilmiş soruları çeker

  const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  const { axiosWithToken } = useAxios();

  const getDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // JavaScript ayları 0'dan başlar, bu yüzden +1 ekliyoruz.
    const year = today.getFullYear();




    return year + '-' + month + '-' + day;
  }
  useEffect(() => {

    const getSchedule = async () => {
      try {
        const { data } = await axiosWithToken.post('', {
          query: 'select',
          service: 'schedule'
        });
        if (data.status) {
          setSchedule(data.data.schedule)
        }

      } catch (error) {
        console.error(error);
      }
    }
    getSchedule()




  }, []);

  const getEntries = async () => {

    const headers = {
      'Content-Type': 'application/json', // request body'nin json formatında olduğunu belirtmek için
      'Authorization': "d145f1e018c6958987921cd4d1f45d05", // gerekirse authentication token'ı da ekleyebilirsiniz
      // diğer isteğe bağlı headerlar
    };

    try {
        const { data } = await axios.post('http://localhost/dersprogram/', {
      "query": "select",
      "service": "scheduleEntry",
      "dates": dates
    }, { headers });

    setEntries(data?.data.scheduleEntry)
    } catch (error) {
      
    }
  

  }

  useEffect(() => {
  
      getEntries()
    
  }, [dates])


  useEffect(() => {

    const datem = async () => {
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

      setDates(dates)
       getEntries()
    }

    datem();

    //   Yukarıdaki kod parçasında, toISOString() yöntemi kullanarak JavaScript tarih nesnesini ISO 8601 biçimine dönüştürdük. Daha sonra, split('T')[0] kullanarak, tarihin "T" karakterinden önceki kısmını ayırarak yıl, ay ve gün bilgilerini içeren bir dize elde ettik. Son olarak, bu dizeyi dates nesnesine atadık. Bu şekilde, tarihler "Yıl-Ay-Gün" biçiminde saklanabilir ve PHPMyAdmin ile uyumlu hale getirilmiş olur.

  }, [])

  const handleInputChange = (e, day, index, date) => {
    const value = e.target.value;

    setSchedule(prevState => { //mevcut stateyi aldık
      const updatedSchedule = { ...prevState }; //obje içine aldık
      updatedSchedule[day][index]["sonuc"] = value;  //gün içinden index sayılı kısmı bul ve input number olarak güncelle
      updatedSchedule[day][index]["tarih"] = date;
      updatedSchedule[day][index]["gün"] = day;

      //index listedeki yerinide verecektir doğal olarak
console.log(updatedSchedule)

      return updatedSchedule;
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = [];

    //nested yapıda olan soru çözüm bilgilerinin herbirini birer tek nesne haline getirdik

    for (const [day, lessons] of Object.entries(schedule)) {
      for (const lesson of lessons) {
        if(lesson.sonuc){ //giriş yapılmayan inputları ekleme
              result.push({
          ders: lesson.ders,
          süre: lesson.süre,
          soru: lesson.soru,
          sonuc: lesson.sonuc,
          tarih: lesson.tarih,
          gün: day
        });
        }
    
      }
    }
    try {
      const { data } = await axiosWithToken.post('', {
        "query": 'insert',
        "service": 'scheduleEntry',
        "entries": result
      });
     
        toast.success("Soru adetleri eklendi.")
console.log(data)
      
    } catch (error) {
      console.error(error);
    }

  };


  return (
    <>
{entries ? (
  <Grid container spacing={2}>
  {Object.keys(schedule).map((day, i) => (
    <Grid item xs={12} key={i}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Tarih
            </Typography>
            <Typography variant="body1">
              {dates[day].split('-').reverse().join('.')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Gün
            </Typography>
            <Typography variant="body1">{day}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Ders / Hedef Süre(dk) / Hedef Soru / Çözülen Soru
            </Typography>
            <Grid container>
              {schedule[day].map((lesson, index) => (
                <React.Fragment key={`${day}-${index}`}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body1">{lesson.ders}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1">{lesson.süre}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body1">{lesson.soru}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Input
                      defaultValue={
                        entries &&
                        entries?.filter(
                          (item) =>
                            item.tarih === dates[day] && item.ders === lesson.ders
                        )[0]?.sonuc
                      }
                      placeholder="Çözülen adedi giriniz"
                      onChange={(e) =>
                        handleInputChange(e, day, index, dates[day])
                      }
                    />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      
      </Paper>
    </Grid>
  ))}
    <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handleSubmit}
          size="small"
        >
          Kaydet
        </Button>
</Grid>


)
:
(

  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <CircularProgress />
</Box>

)


}
</>


  );

}

export default Programim;
