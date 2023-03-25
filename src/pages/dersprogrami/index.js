import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Delete as DeleteIcon, Plus as AddIcon } from 'mdi-material-ui';
import useAxios from '../api/axiosWithToken';
import { useRouter } from 'next/router';


import KategorilerModal from './KategorilerModal';

const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

export default function DersProgrami() {

  const [dayInputs, setDayInputs] = useState({});
  const [categories, setCategories] = useState()


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);


  const { axiosWithToken } = useAxios();

  const router = useRouter();

  useEffect(() => {

    const getCategories = async () => {
      try {
        const { data } = await axiosWithToken.post('', {
          query: 'select',
          service: 'kategori'
        });
        if (data.status) {
          setCategories(data.data.kategoriler)
        }
   
      } catch (error) {
        console.error(error);
      }
    }
    getCategories();

    const getSchedule = async () => {
      try {
        const { data } = await axiosWithToken.post('', {
          query: 'select',
          service: 'schedule'
        });
        if (data.status) {
          setDayInputs(data.data.schedule)
        }

      } catch (error) {
        console.error(error);
      }
    }
    getSchedule();



  }, [])




  const addInput = (day) => {
    setDayInputs({
      ...dayInputs,
      [day]: [...(dayInputs[day] || []), { select: '', input: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosWithToken.post('', {
        query: 'insert',
        service: 'schedule',
        schedule: JSON.stringify(dayInputs)
      });
      if (data.status) {
        // router.reload();
      }
      console.log(data)
    } catch (error) {
      console.error(error);
    }
    console.log(dayInputs);
  };

  const removeInput = (day, index) => {
    setDayInputs({
      ...dayInputs,
      [day]: dayInputs[day].filter((_, i) => i !== index)
    });
  };

  return (

    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardHeader title="Ders Programı Ekle/Düzenle" />
      <Grid sx={{ paddingLeft: 5 }}>  <Button variant='contained' color='secondary' startIcon={<AddIcon />} onClick={handleOpen}>Ders Ekle</Button></Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid style={{ marginBottom: "20px" }} container spacing={2}>
              <table className='schedule-table'>
                {daysOfWeek.map((day) => (
                  <tr key={day}>
                    <td> <h4>{day}</h4></td>
                    <td>
                      {dayInputs[day]?.map((input, index) => (
                        <FormControl style={{ display: 'flex', flexDirection: 'row', gap: "20px", marginBottom: "20px" }} key={index} fullWidth>
                          <InputLabel htmlFor={`${day}-${index}-select`}>Ders</InputLabel>
                          <Select
                            size="small"
                            labelId={`${day}-${index}-select-label`}
                            id={`${day}-${index}-select`}
                            value={input.select}
                            label="Ders"
                            onChange={(e) =>
                              setDayInputs({
                                ...dayInputs,
                                [day]: [
                                  ...dayInputs[day].slice(0, index),
                                  { ...input, select: e.target.value },
                                  ...dayInputs[day].slice(index + 1)
                                ]
                              })
                            }
                          >
                            <MenuItem value="">Seçiniz</MenuItem>
                            {categories && categories?.map((item, i) => <MenuItem key={i} value={item.kategori_adi} >{item.kategori_adi}</MenuItem>)}
                          </Select>
                          <TextField
                            fullWidth
                            style={{ minWidth: "200px" }}
                            size="small"
                            id={`${day}-${index}-input`}
                            label="Hedef (dk)"
                            value={input.input}
                            onChange={(e) =>
                              setDayInputs({
                                ...dayInputs,
                                [day]: [
                                  ...dayInputs[day].slice(0, index),
                                  { ...input, input: e.target.value },
                                  ...dayInputs[day].slice(index + 1)
                                ]
                              })
                            }
                          />
                          <IconButton onClick={() => removeInput(day, index)} size="small">
                            <DeleteIcon />
                          </IconButton>
                        </FormControl>

                      ))}</td>
                    <td>
                      <AddIcon
                        onClick={() => addInput(day)}
                        size="small"
                        style={{
                          backgroundColor: 'blue',
                          color: 'white',
                          borderRadius: '50%',
                          cursor: 'pointer'
                        }}
                      />
                    </td>
                    <Divider></Divider>
                  </tr>
                ))}
              </table>
            </Grid>
            <Button type="submit" variant="contained" size="small" color="warning">
              Kaydet
            </Button>
          </form>
        </CardContent>
      </Card>



      {/* modal */}
      <KategorilerModal setOpen={setOpen}  open={open} />

    </Box>


  );
}
