import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, Typography, Button, Grid, TableFooter } from '@mui/material';
import useAxios from '../api/axiosWithToken';
import { Plus } from 'mdi-material-ui';

function Programim() {
  const [schedule, setSchedule] = useState({});

  const { axiosWithToken } = useAxios();

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
    setSchedule(prevState => {
      const updatedSchedule = { ...prevState };
      updatedSchedule[day][index][`input${inputNumber}`] = value;
      
      return updatedSchedule;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                  <TableCell sx={{display:"flex", flexDirection:"column"}}> 
                  <span>{lesson.select}</span> 
                      <Typography >{lesson.input} </Typography> 
                  <Input onChange={(e) => handleInputChange(e, day, index, 3)} /></TableCell>
                    <TableCell>  < Plus className='add-button' onClick={handleInputChange}/></TableCell>
                </React.Fragment>
                ))}

              </TableRow>
          ))}
        </TableBody>
        <TableFooter >   <Button sx={{margin:"20px"}} variant='contained' onClick={handleSubmit}  size="small" >Kaydet</Button></TableFooter>
      </Table>
   
    </TableContainer>
    </Grid>
  );
}

export default Programim;
