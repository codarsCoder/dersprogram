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
import TumIsletmelerTablo from 'src/tables/TumIsletmelerTablo'
import useVericek from 'src/hooks/useVericek'
import TumIsletmelerCollapseTable from 'src/tables/TumIsletmelerCollapseTable2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import RolesTable from 'src/tables/roles'
import Preloader from 'src/components/Preloader'
import { useState } from 'react'

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



  //  tüm işletmeleri isteyelim
  useEffect(() => {
    postData({
      "query" : "select",
      "service" : "all_shop" 
  })
  }, [])


  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
          { responseData && <TumIsletmelerCollapseTable responseData = {responseData} />}
        </Card>
      </Grid>
        <Grid item xs={12}>
        <RolesTable />
        </Grid>
        <Grid item xs={12}>
          <TumIsletmelerTablo />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
