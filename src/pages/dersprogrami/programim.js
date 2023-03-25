import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, Typography, Button, Grid, TableFooter } from '@mui/material';
import useAxios from '../api/axiosWithToken';
import { Plus } from 'mdi-material-ui';

function Programim() {
  const [schedule, setSchedule] = useState({});
  const [questions, setQuestions] = useState()


  const { axiosWithToken } = useAxios();

  const getDate = ()=> {
    const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // JavaScript ayları 0'dan başlar, bu yüzden +1 ekliyoruz.
const year = today.getFullYear();

return day + '/' + month + '/' + year;
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

  const handleInputChange = (e, day, index, inputNumber) => {
    const value = e.target.value;
    setSchedule(prevState => { //mevcut stateyi aldık
      const updatedSchedule = { ...prevState }; //obje içine aldık
      updatedSchedule[day][index][`input${inputNumber}`] = value;  //gün içinden index sayılı kısmı bul ve input number olarak güncelle
      updatedSchedule[day][index]["tarih"] = getDate(); 
//index listedeki yerinide verecektir doğal olarak

      return updatedSchedule;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(schedule);
  };

  return (
    <Grid container >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Günler</TableCell>
              <TableCell>Ders</TableCell>
              <TableCell>Süre (Dakika)</TableCell>
              <TableCell>Soru Hedef (Adet)</TableCell>
              <TableCell>Soru ÇÖZÜLEN (Adet)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(schedule).map((day, i) => (
              <TableRow key={i}>
                <TableCell>{day}</TableCell>
                {schedule[day].map((lesson, index) => (
                  <React.Fragment key={`${day}-${index}`}>
                    <TableCell> <span>{lesson.select}</span>  </TableCell>
                    <TableCell>  <Typography >{lesson.input} </Typography> </TableCell>
                    <TableCell>   <Typography >{lesson.input2} </Typography>  </TableCell>
                    <TableCell>  <Input onChange={(e) => handleInputChange(e, day, index, 3)} /></TableCell>
                    {/* <TableCell>  < Plus className='add-button' onClick={handleAdd(day,lesson.input,lesson.input2, )}/></TableCell> */}
                  </React.Fragment>
                ))}

              </TableRow>
            ))}
          </TableBody>
          <TableFooter >   <Button sx={{ margin: "20px" }} variant='contained' onClick={handleSubmit} size="small" >Kaydet</Button></TableFooter>
        </Table>

      </TableContainer>
    </Grid>
  );
}

export default Programim;
