import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DeleteCircleOutline, Plus as AddIcon } from 'mdi-material-ui';
import useAxios from '../api/axiosWithToken';
import { useRouter } from 'next/router';


import KategorilerModal from './KategorilerModal';
import { toast } from 'react-toastify';

const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

const initialSchedule = {
  "Pazartesi": [],
  "Salı": [],
  "Çarşamba": [],
  "Perşembe": [],
  "Cuma": [],
  "Cumartesi": [],
  "Pazar": []
}



export default function DersProgrami() {

  const [dayInputs, setDayInputs] = useState({});
  const [categories, setCategories] = useState()
  const [isLoading, setIsLoading] = useState(false);

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
        } else {
          defaultSchedule();
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
      [day]: [...(dayInputs[day] || []), { ders: '', konu: '', süre: '', soru: '', sonuc: '',tarih:'' }]
    });
  };

  const defaultSchedule = async () => {  //başlangıçta ders programı boş olacağı için günleri ekleyip sıfır bir ders programı kaydettik
    const { data } = await axiosWithToken.post('', {
      query: 'insert',
      service: 'schedule',
      schedule: JSON.stringify(initialSchedule)
    });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    //ders programı ekleme sırasına göre günler karışıyor o yüzden yeniden sıraladık
    const siraliDersProgrami = Object.entries(dayInputs)
      .sort((a, b) => {
        const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

        return daysOfWeek.indexOf(a[0]) - daysOfWeek.indexOf(b[0]);
      })
      .reduce((obj, [key, value]) => {
        obj[key] = value;

        return obj;
      }, {});

    try {
      const { data } = await axiosWithToken.post('', {
        query: 'insert',
        service: 'schedule',
        schedule: JSON.stringify(siraliDersProgrami)
      });
      if (data.status) {
        toast.success("Ders programı kaydedildi.")
        setIsLoading(false)
      }

    } catch (error) {
      console.error(error);
      setIsLoading(false)
    }

  };

  const removeInput = (day, index) => {
    setDayInputs({
      ...dayInputs,
      [day]: dayInputs[day].filter((_, i) => i !== index)
    });
  };


  return (

    <Box className='content-center' sx={{minWidth:"800px",overflowX:"auto"}}>
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
                            value={input.ders}
                            label="Ders"
                            onChange={(e) =>
                              setDayInputs({
                                ...dayInputs,
                                [day]: [
                                  ...dayInputs[day].slice(0, index),
                                  { ...input, ders: e.target.value },
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
                            value={input.süre}
                            onChange={(e) =>
                              setDayInputs({
                                ...dayInputs,
                                [day]: [
                                  ...dayInputs[day].slice(0, index),
                                  { ...input, süre: e.target.value },
                                  ...dayInputs[day].slice(index + 1)
                                ]
                              })
                            }
                          />
                          <TextField
                            fullWidth
                            style={{ minWidth: "200px" }}
                            size="small"
                            id={`${day}-${index}-input`}
                            label="Hedef (soru)"
                            value={input.soru}
                            onChange={(e) =>
                              setDayInputs({
                                ...dayInputs,
                                [day]: [
                                  ...dayInputs[day].slice(0, index),
                                  { ...input, soru: e.target.value },
                                  ...dayInputs[day].slice(index + 1)
                                ]
                              })
                            }
                          />
                          <IconButton onClick={() => removeInput(day, index)} size="medium">
                            <DeleteCircleOutline className='sil-button' />
                          </IconButton>
                        </FormControl>

                       

                      ))}</td>
                    <td>
                      <AddIcon
                        onClick={() => addInput(day)}
                        size="small"
                        className='add-button'
                      />
                    </td>
                  
                    <Divider></Divider>
                  </tr>
                ))}
              </table>
            </Grid>
            <Button type="submit" variant="contained" size="small" disabled={isLoading}>
        {isLoading && <CircularProgress color="info" size={20} />}
        {!isLoading && 'Kaydet'}
      </Button>
          </form>
        </CardContent>
      </Card>



      {/* modal */}
      <KategorilerModal setOpen={setOpen} open={open} setCategories={setCategories} />

    </Box>


  );
}
