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
  const [isLoading, setIsLoading] = useState(false);
  const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  const { axiosWithToken } = useAxios();



  useEffect(() => {

    const datem = async () => {
      const today = new Date();

      // Bu haftanın başlangıç tarihini hesaplayın
      const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));

      // Bu haftanın son tarihini hesaplayın
      const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);

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

    if (dates) {
      const { data } = await axiosWithToken.post('', {
        "query": "select",
        "service": "scheduleEntry",
        "dates": dates
      });

      console.log(data?.data)
      if (data.data?.entry === 3) { //girilmş sonuçlar varsa daha önceden hafta oluşturulmuş demektir direkt alıyoruz
        setEntries(data?.data.scheduleEntry)

      } else if (data.data?.entry === 2) { // 2 geldiyse hiç sonuç yoktur ders programından default bir haftalık programı yazıyoruz
        let output = [];

        for (let gun in schedule) {
          for (let ders of schedule[gun]) {
            let item = {
              "tarih": dates[gun],
              "gün": gun,
              "konu": ders["konu"],
              "ders": ders["ders"],
              "hedef_süre": ders["süre"],
              "hedef_adet": ders["soru"],
              "sonuc": ders["sonuc"]
            };
            output.push(item);
          }
        }
        setEntries(output)

      } else {

      }
    }

  }

  useEffect(() => {

    getEntries()

  }, [dates])




  const handleInputChange = (e, day, date, lesson, süre, adet) => {
    const values = e.target.value;
    const updatedEntries = entries;


const son = updatedEntries.map(item => {
      if (item.gün === day && item.ders === lesson && item.tarih === date) {

        return { ...item, sonuc: values };
      }

      return item;
    });

    const matchingEntry = updatedEntries.find(item => item.gün === day && item.ders === lesson && item.tarih === date);
    if (!matchingEntry) {
      updatedEntries.push({
        tarih: date,
        gün: day,
        sonuc: values,
        ders: lesson,
        hedef_süre: süre,
        hedef_adet: adet
      });
    } else {
      updatedEntries = son;
    }

    setEntries(updatedEntries);
  };

  console.log(entries)

  //bu fonksiyon konu kısmını alıp veriyi güncelliyor
  const handleInputChange2 = (e, day, date, lesson, süre, adet) => {
    const values = e.target.value;
    const updatedEntries = entries;


const son = updatedEntries.map(item => {
      if (item.gün === day && item.ders === lesson && item.tarih === date) {

        return { ...item, konu: values, hedef_süre:süre, hedef_adet:adet };
      }

      return item;
    });

    const matchingEntry = updatedEntries.find(item => item.gün === day && item.ders === lesson && item.tarih === date);
    if (!matchingEntry) {
      updatedEntries.push({
        tarih: date,
        gün: day,
        konu: values,
        ders: lesson,
        hedef_süre: süre,
        hedef_adet: adet
      });
    } else {
      updatedEntries = son;
    }

    setEntries(updatedEntries);

  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const { data } = await axiosWithToken.post('', {
        "query": 'insert',
        "service": 'scheduleEntry',
        "entries": entries,
        "dates": dates
      });
      toast.success("Soru adetleri eklendi.")
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      setIsLoading(false)
    }

  };
  console.log(entries)

  return (
    <>
      {entries ? (
        <Grid container spacing={2}>
          {Object.keys(schedule).map((day, i) => (  // burada her zaman ders programı baz alınıp daha önce girilmiş sonuçlar varsa o gerekli yerlere yazılıyor böylece ders programı güncellendiğinde güncel hali ekrana basılıyor
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
                      {dates?.[day]?.split('-').reverse().join('.')}
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
                          <Grid sx={{ borderBottom: "1px solid", mt: 2 }} item xs={4} md={3}>
                            {!index && !i && (
                              <Typography variant="h6" gutterBottom>
                                Ders:
                              </Typography>
                            )}
                            <Typography variant="body1">{lesson.ders}</Typography>
                          </Grid>
                          <Grid sx={{ borderBottom: "1px solid", mt: 2 }} item xs={4} md={3}>
                            {!index && !i && (
                              <Typography variant="h6" gutterBottom>
                                Konu:
                              </Typography>
                            )}
                            <Input
                              disableUnderline={true}
                              sx={{ width: "105px" }}
                              value={
                                entries &&
                                entries?.filter(
                                  (item) =>
                                    item.tarih === dates[day] && item.ders === lesson.ders
                                )[0]?.konu
                              }
                              placeholder="Konu"
                              onChange={(e) =>
                                handleInputChange2(e, day, dates[day], lesson.ders, lesson.süre, lesson.soru)
                              }
                            />
                          </Grid>
                          <Grid sx={{ borderBottom: "1px solid", mt: 2 }} item xs={2} md={2}>
                            {!index && !i && (
                              <Typography variant="h6" gutterBottom>
                                Süre:
                              </Typography>
                            )}
                            <Typography variant="body1">{lesson.süre}</Typography>
                          </Grid>
                          <Grid sx={{ borderBottom: "1px solid", mt: 2 }} item xs={2} md={2}>
                            {!index && !i && (
                              <Typography variant="h6" gutterBottom>
                                Soru:
                              </Typography>
                            )}
                            <Typography variant="body1">{lesson.soru}</Typography>
                          </Grid>
                          <Grid sx={{ borderBottom: "1px solid", mt: 1 }} item xs={3} md={2}>
                            {!index && !i && (
                              <Typography variant="h6" gutterBottom>
                                Çözülen:
                              </Typography>
                            )}
                            <Input
                              disableUnderline={true}
                              sx={{ width: "105px" }}
                              value={
                                entries &&
                                entries?.filter(
                                  (item) =>
                                    item.tarih === dates[day] && item.ders === lesson.ders
                                )[0]?.sonuc
                              }
                              placeholder="Çözülen adet"
                              onChange={(e) =>
                                handleInputChange(e, day, dates[day], lesson.ders, lesson.süre, lesson.soru)
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
          {isLoading && <CircularProgress color="info" size={20} />}
        {!isLoading && 'Kaydet'}
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
