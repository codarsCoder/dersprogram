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

  const getDefaultEntries = () => {
    console.log("default çalıştı")
    let output = [];

    for (let gun in schedule) {
      for (let ders of schedule[gun]) {
        let item = {
          "tarih": dates[gun],
          "gün": gun,
          "ders": ders["ders"],
          "hedef_süre": ders["süre"],
          "hedef_adet": ders["soru"],
          "sonuc": ders["sonuc"]
        };
        output.push(item);
      }
    }
    console.log(output)
    setEntries(output)
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
    console.log("sc hazır")
    getSchedule()

  }, []);

  console.log(schedule)
  console.log(dates)

  const getEntries = async () => {

if(dates){
      const { data } = await axiosWithToken.post('', {
      "query": "select",
      "service": "scheduleEntry",
      "dates": dates
    });
    // console.log(data?.data.entry)
    if (data.data?.entry === 3) {
      console.log("firsttttt")
      setEntries(data?.data.scheduleEntry)
      console.log(data?.data.scheduleEntry)

    } else if (data.data?.entry === 2) {
      console.log("first")
      let output = [];

      for (let gun in schedule) {
        for (let ders of schedule[gun]) {
          let item = {
            "tarih": dates[gun],
            "gün": gun,
            "ders": ders["ders"],
            "hedef_süre": ders["süre"],
            "hedef_adet": ders["soru"],
            "sonuc": ders["sonuc"]
          };
          output.push(item);
        }
      }
      console.log(output)
      setEntries(output)
    } else {

    }


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

      return updatedSchedule;
    });

  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = [];

    //nested yapıda olan soru çözüm bilgilerinin herbirini birer tek nesne haline getirdik

    for (const [day, lessons] of Object.entries(schedule)) {
      for (const lesson of lessons) {
        if (lesson.sonuc) { //giriş yapılmayan inputları ekleme
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
        "entries": result,
        "dates": dates
      });

      toast.success("Soru adetleri eklendi.")

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
                  <Grid item xs={12} sm={2}>
                    {!i && (
                      <Typography variant="h6" gutterBottom>
                        Tarih:
                      </Typography>
                    )}
                    <Typography variant="body1">
                      {dates?.[day].split('-').reverse().join('.')}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={2}>
                    {!i && (
                      <Typography variant="h6" gutterBottom>
                        Gün:
                      </Typography>
                    )}
                    <Typography variant="body1">{day}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>            {/* 0.index dışınnda gözükme */}
                    {/* {!i && (
                      <Typography variant="h6" gutterBottom>
                        Ders / Hedef Süre(dk) / Hedef Soru / Çözülen Soru
                      </Typography>
                    )} */}

                    <Grid container>
                      {schedule[day].map((lesson, index) => (
                        <React.Fragment key={`${day}-${index}`}>
                          <Grid sx={{ borderBottom: "1px solid", mt: 2 }} item xs={4} sm={4}>
                            {!index && !i && (
                              <Typography variant="h6" gutterBottom>
                                Ders:
                              </Typography>
                            )}
                            <Typography variant="body1">{lesson.ders}</Typography>
                          </Grid>
                          <Grid sx={{ borderBottom: "1px solid", mt: 2 }} item xs={2} sm={2}>
                            {!index && !i && (
                              <Typography variant="h6" gutterBottom>
                                Süre:
                              </Typography>
                            )}
                            <Typography variant="body1">{lesson.süre}</Typography>
                          </Grid>
                          <Grid sx={{ borderBottom: "1px solid", mt: 2 }} item xs={2} sm={2}>
                            {!index && !i && (
                              <Typography variant="h6" gutterBottom>
                                Soru:
                              </Typography>
                            )}
                            <Typography variant="body1">{lesson.soru}</Typography>
                          </Grid>
                          <Grid sx={{ borderBottom: "1px solid", mt: 1 }} item xs={3} sm={3}>
                            {!index && !i && (
                              <Typography variant="h6" gutterBottom>
                                Çözülen:
                              </Typography>
                            )}
                            <Input
                              disableUnderline={true}
                              sx={{ width: "105px" }}
                              defaultValue={
                                entries &&
                                entries?.filter(
                                  (item) =>
                                    item.tarih === dates[day] && item.ders === lesson.ders
                                )[0]?.sonuc
                              }
                              placeholder="Çözülen adet"
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
            sx={{ m: 2, cursor: "pointer !important" }}
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
