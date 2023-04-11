// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports

import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useVericek from 'src/hooks/useVericek'
import { useState } from 'react'
import ApexChart from 'src/grafikler/HaftalikTablo'
import useAxios from './api/axiosWithToken'
import { Box, Button, CircularProgress, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'







const Dashboard = () => {

  // router tanımla 
  const router = useRouter()

  // redux tan user al 
  const user = useSelector((state => state.user))

  //  veriçekme hooku
  const { responseData, postData } = useVericek();

const [weeks, setWeeks] = useState()

  // const result = []; toplam sorular için

  // for (const day in schedule) {
  //   let totalQuestions = 0;
  //   schedule[day].forEach((lesson) => {
  //     totalQuestions += parseInt(lesson.soru);
  //   });
  //   result.push({ day: day, totalQuestions: totalQuestions });
  // }



  const defaultEntries = {
    "hedef": {
      "Pazartesi": 0,
      "Salı": 0,
      "Çarşamba": 0,
      "Pazar": 0,
      "Perşembe": 0,
      "Cuma": 0,
      "Cumartesi": 0
    },
    "sonuc": {
      "Pazartesi": 0,
      "Salı": 0,
      "Çarşamba": 0,
      "Pazar": 0,
      "Perşembe": 0,
      "Cuma": 0,
      "Cumartesi": 0
    },
    "tarih": {
      "Pazartesi": "0000-00-00",
      "Salı": "0000-00-00",
      "Çarşamba": "0000-00-00",
      "Perşembe": "0000-00-00",
      "Cuma": "0000-00-00",
      "Cumartesi": "0000-00-00",
      "Pazar": "0000-00-00"
    }
  }

  
  const [dates, setDates] = useState() // gün-tarih listesi o haftanın tarihlsetChartDataeri içinde 
  const [entries, setEntries] = useState() //mevcut girilmiş soruları çeker
  const [entriesList, setEntriesList] = useState() //mevcut girilmiş soruları çeker
  const [chartData,setChartData ] = useState(defaultEntries);
  const [selectedHafta, setSelectedHafta] = useState("Hafta Seçiniz");

  const { axiosWithToken } = useAxios();

  //  tüm işletmeleri isteyelim
  useEffect(() => {
    postData({
      "query": "select",
      "service": "all_shop"
    })
  }, [])

  useEffect(() => { // bu haftanın tarihlerini hesaplayacak

    const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

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
      setDates(dates)
    }
  }, [])

  const getEntries = async (datem = "") => { //bu haftanın ders girişlerini alacak

    try {
      const { data } = await axiosWithToken.post('', {
        "query": "select",
        "service": "scheduleEntry",
        "dates": datem ? datem : dates  // parametre yoksa o haftayı çeker
      });

      setEntriesList(data.data.scheduleEntry)
      //toplam hedefler hesaplanıyor
      const datam = data?.data.scheduleEntry
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



      setEntries({ "hedef": totalHedefAdet, "sonuc": totalSonuc, "tarih": dates })
    } catch (error) {

    }

  }

  useEffect(() => {

    getEntries()

  }, [dates])

  useEffect(() => {
    console.log("first")
    setChartData()
    setChartData(entries)

  }, [entries])

  useEffect(() => {

    const getweeks = async () => {

      const { data } = await axiosWithToken.post('', {
        "query": "select",
        "service": "weeks"
      });

   setWeeks(data.data)
    }

    getweeks();
  }, [])



const handleHaftaChange = (event) => {
  setSelectedHafta(event.target.value);
};


const handleSubmit = (event) => {
  event.preventDefault();

// setDates({"Pazar":selectedHafta.split("/")[1], "Pazartesi":selectedHafta.split("/")[0]})

getEntries({"Pazar":selectedHafta.split("/")[1], "Pazartesi":selectedHafta.split("/")[0]})
}

  return (
    entries ?
      (
        <>
      
        <ApexChartWrapper>
          <Grid container spacing={6} p={3}>
            {chartData ?
              (
                <Grid item xs={12} md={6} >
                  <ApexChart chartData={chartData} />
                </Grid>
              )
              :
              (
                <Typography sx={{ width: "100%", textAlign: "center" }}>Veri girilmediği için Grafik şuanda gösterilemiyor.</Typography>
              )
            }
          </Grid>
        </ApexChartWrapper> 
        <Grid item spacing={5}>
            <form onSubmit={handleSubmit}>

              <Select style={{ marginRight: "10px", marginBottom: "10px" }} value={selectedHafta} onChange={handleHaftaChange}>
                <MenuItem value="Hafta Seçiniz">
                  Hafta Seçiniz
                </MenuItem>
                {weeks?.haftalar.map((hafta) => (
                  <MenuItem key={hafta.id} value={hafta.hafta}>
                    {hafta.hafta}
                  </MenuItem>
                ))}
              </Select>

              <Button size='large' variant="contained" type="submit">Göster</Button>


            </form>
          </Grid>
        <Grid>
        <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Tarih</TableCell>
            <TableCell>Gün</TableCell>
            <TableCell>Konu</TableCell>
            <TableCell>Ders</TableCell>
            <TableCell>Hedef Süre</TableCell>
            <TableCell>Hedef Adet</TableCell>
            <TableCell>Sonuç</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entriesList?.map((row,i) => (
            <TableRow key={row.id}>
              <TableCell>{i+1}</TableCell>
              <TableCell>{row.tarih}</TableCell>
              <TableCell>{row.gün}</TableCell>
              <TableCell>{row.konu}</TableCell>
              <TableCell>{row.ders}</TableCell>
              <TableCell>{row.hedef_süre}</TableCell>
              <TableCell>{row.hedef_adet}</TableCell>
              <TableCell>{row.sonuc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
         </>
      )
      :
      (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      )
  );

}

export default Dashboard





{/* <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Tüm İşletmeler' titleTypographyProps={{ variant: 'h6' }} />
            {responseData && <TumIsletmelerCollapseTable responseData={responseData} />}
          </Card>
        </Grid>
        <Grid item xs={12}>
          <RolesTable />
        </Grid>
        <Grid item xs={12}>
          <TumIsletmelerTablo />
        </Grid> */}