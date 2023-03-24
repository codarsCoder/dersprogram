import { useState } from 'react';
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Delete as DeleteIcon, Plus as AddIcon } from 'mdi-material-ui';
import useAxios from './api/axiosWithToken';
import { useRouter } from 'next/router';

const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

export default function Form() {

  const [dayInputs, setDayInputs] = useState({});

  const { axiosWithToken } = useAxios();

  const router = useRouter();

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
        schedule: dayInputs
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
    <form onSubmit={handleSubmit}>
      <Grid style={{ marginBottom: "20px" }} container spacing={2}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {daysOfWeek.map((day) => (
            <Grid item xs={12} md={4} key={day}>
              <h2>{day}</h2>
              {dayInputs[day]?.map((input, index) => (
                <FormControl style={{ display: 'flex', flexDirection: 'row', gap: "20px", marginBottom: "20px" }} gap-5 key={index} fullWidth>
                  <InputLabel htmlFor={`${day}-${index}-select`}>Öğün</InputLabel>
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
                    <MenuItem value="Kahvaltı">Kahvaltı</MenuItem>
                    <MenuItem value="Öğle Yemeği">Öğle Yemeği</MenuItem>
                    <MenuItem value="Akşam Yemeği">Akşam Yemeği</MenuItem>
                  </Select>
                  <TextField
                    fullWidth
                    style={{ minWidth: "200px" }}
                    size="small"
                    id={`${day}-${index}-input`}
                    label="Yemek İsmi"
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
              ))}
              <Button onClick={() => addInput(day)} variant="contained" size="small">
                <AddIcon />
              </Button>
            </Grid>
          ))}
        </div>
      </Grid>
      <Button type="submit" variant="contained" size="small" color="warning">
        Kaydet
      </Button>
    </form>
  );
}
