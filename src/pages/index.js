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
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useVericek from 'src/hooks/useVericek'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import RolesTable from 'src/tables/roles'
import Preloader from 'src/components/Preloader'
import { useState } from 'react'
import ApexChart from 'src/grafikler/HaftalikTablo'
import useAxios from './api/axiosWithToken'
import { Paper, Typography } from '@mui/material'







const Dashboard = () => {

  // router tanımla 
  const router = useRouter()

  // redux tan user al 
  const user = useSelector((state => state.user))

  //  veriçekme hooku
  const { responseData, postData } = useVericek();



  // const result = []; toplam sorular için

  // for (const day in schedule) {
  //   let totalQuestions = 0;
  //   schedule[day].forEach((lesson) => {
  //     totalQuestions += parseInt(lesson.soru);
  //   });
  //   result.push({ day: day, totalQuestions: totalQuestions });
  // }

  // console.log(result);

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

  const [dates, setDates] = useState() // gün-tarih listesi o haftanın tarihleri içinde 
  const [entries, setEntries] = useState() //mevcut girilmiş soruları çeker
  const [chartData, setChartData] = useState(defaultEntries);
  

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

  const getEntries = async () => { //bu haftanın ders girişlerini alacak

    try {
      const { data } = await axiosWithToken.post('', {
        "query": "select",
        "service": "scheduleEntry",
        "dates": dates
      });
      
//toplam hedefler hesaplanıyor
const datam =data?.data.scheduleEntry
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



      setEntries({"hedef":totalHedefAdet,"sonuc":totalSonuc,"tarih":dates})
    } catch (error) {

    }

  }

  useEffect(() => {

    getEntries()

  }, [dates])

  useEffect(() => {

   setChartData(entries)

  }, [entries])




  return (
    <ApexChartWrapper>
      <Grid container spacing={6} p={3}>
        {/* <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid> */}
        {chartData ?
          (
            <Grid   item xs={12} md={6} >
              <ApexChart  chartData={chartData} />
            </Grid>
          )
          :
          (
            <Typography sx={{width:"100%",textAlign:"center"}}>Veri girilmediği için Grafik şuanda gösterilemiyor</Typography>
          )
        }

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
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
