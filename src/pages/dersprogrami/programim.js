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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>Tarih</TableCell>
              <TableCell align="center">Ders</TableCell>
              <TableCell align="center">Konu</TableCell>
              <TableCell align="center">Hedef Süre(dk)</TableCell>
              <TableCell align="center">Hedef Soru</TableCell>
              <TableCell align="center">Çözülen Soru</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(schedule).map((day, i) => (
              <>
                <TableRow key={i}>
                  <TableCell align="center" rowSpan={schedule[day].length + 1}>{dates?.[day]?.split('-').reverse().join('.')}</TableCell>
                  <TableCell align="center" rowSpan={schedule[day].length + 1}>{day}</TableCell>
                </TableRow>
                {schedule[day].map((lesson, index) => (
                  <TableRow key={`${day}-${index}`}>
                    <TableCell align="center">{lesson.ders}</TableCell>
                    <TableCell align="center">
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
                    </TableCell>
                    <TableCell align="center">{lesson.süre}</TableCell>
                    <TableCell align="center">{lesson.soru}</TableCell>
                    <TableCell align="center">
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
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            size="small"
          >
            {isLoading && <CircularProgress color="info" size={20} />}
            {!isLoading && 'Kaydet'}
          </Button>
        </Box>
      </TableContainer>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )}
  </>
);


}

export default Programim;
