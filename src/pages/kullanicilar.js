
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useAxios from './api/axiosWithToken';
import { Select, MenuItem, Button, List, ListItem, ListItemText, Paper } from "@mui/material";
import Grid from '@mui/material/Grid'
import ApexChart from 'src/grafikler/HaftalikTablo';
import { Typography } from '@mui/material'

const Kullanicilar = () => {

  const [users, setUsers] = useState()
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedHafta, setSelectedHafta] = useState("");
  const [results, setResults] = useState();
  const [chartData, setChartData] = useState();

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleHaftaChange = (event) => {
    setSelectedHafta(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setChartData()
    const [start, end] = selectedHafta.split("/");

    const filteredResults = users.sonuclar.filter((item) =>
      item.user_id === selectedUser &&
      item.tarih >= start &&
      item.tarih <= end
    );

    // setResults(filteredResults);
    topla(filteredResults)
  };
  console.log(results)

  const user = useSelector((state) => state.user);

  const router = useRouter();

  if (user.statu !== 2) {
    router.push("/")
  }



  const { axiosWithToken } = useAxios();

  const topla = (datam) => {


    let totalHedefAdet = {};
    let totalSonuc = {};

    for (let i = 0; i < datam.length; i++) {
      let item = datam[i];
      let date = item.gün;
      if (date in totalHedefAdet) {
        totalHedefAdet[date] += parseInt(item.hedef_adet);
        totalSonuc[date] += parseInt(item.sonuc);
      } else {
        totalHedefAdet[date] = parseInt(item.hedef_adet);
        totalSonuc[date] = parseInt(item.sonuc);
      }
    }
    console.log(totalHedefAdet)
    console.log(totalSonuc)
    setResults({ "hedef": totalHedefAdet, "sonuc": totalSonuc, "tarih": "" })
  }

  useEffect(() => {

    setChartData(results)

  }, [results])


  useEffect(() => {
    const getEntries = async () => { //bu haftanın ders girişlerini alacak

      const { data } = await axiosWithToken.post('', {
        "query": "select",
        "service": "users"
      });
      if (data.status) {
        setUsers(data.data)
      }
    }
    getEntries()

  }, [])


  return (
    <Grid container display="flex" flexDirection="column" gap="50px" component={Paper} sx={{minHeight:"500px"}}>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Select value={selectedUser} onChange={handleUserChange}>
            <MenuItem value="">Select User</MenuItem>
            {users?.users.map((user) => (
              <MenuItem key={user.user_id} value={user.user_id}>
                {user.adi}
              </MenuItem>
            ))}
          </Select>

          <Select value={selectedHafta} onChange={handleHaftaChange}>
            <MenuItem value="">Select Week</MenuItem>
            {users?.haftalar.map((hafta) => (
              <MenuItem key={hafta.id} value={hafta.hafta}>
                {hafta.hafta}
              </MenuItem>
            ))}
          </Select>

          <Button type="submit">Submit</Button>


        </form>
      </Grid>
      <Grid item xs={12} md={6}>
        {chartData ?
          (
           
              <ApexChart chartData={chartData} />
           
          )
          :
          (
            <Typography>Veri girilmediği için Grafik şuanda gösterilemiyor</Typography>
          )
        }
      </Grid>


    </Grid>

  )
}

export default Kullanicilar