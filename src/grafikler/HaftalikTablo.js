import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import paper from 'src/@core/theme/overrides/paper';


const ApexChart = ({ chartData }) => {

    const [series] = useState([
        {
            name: 'Mevcut',
            data: [
                {
                    x: 'Pazartesi',
                    y: chartData?.sonuc["Pazartesi"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Pazartesi"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Salı',
                    y: chartData?.sonuc["Salı"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Salı"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Çarşamba',
                    y: chartData?.sonuc["Çarşamba"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Çarşamba"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Perşembe',
                    y: chartData?.sonuc["Perşembe"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Perşembe"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Cuma',
                    y: chartData?.sonuc["Cuma"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Cuma"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Cumartesi',
                    y: chartData?.sonuc["Cumartesi"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Cumartesi"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Pazar',
                    y: chartData?.sonuc["Pazar"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Pazar"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },

            ],
        },
    ]);

    const [options] = useState({
        chart: {
            textAlign:"center",
            height: 350,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },

        plotOptions: {
            bar: {
                columnWidth: '20%',
            },
        },
        colors: ['#FFB400'],
        dataLabels: {
            enabled: true,

        },
        legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['Mevcut', 'Hedef'],
            markers: {
                fillColors: ['#FFB400', '#775DD0'],
            },
        },
    });

    return (
        <Box component={Paper} id="chart">
            <Typography variant='h5' sx={{textAlign:"center",paddingTop:"20px" }}>Haftalık Hedef-Sonuç Tablosu </Typography>
            <Typography variant='h6' sx={{textAlign:"center",paddingTop:"20px" }}> {`${(chartData?.tarih["Pazartesi"].split("-").reverse().join("."))} - ${(chartData?.tarih["Pazar"].split("-").reverse().join("."))}`}</Typography>
          
            <ReactApexcharts  options={options} series={series} type="bar" height={350} />
        </Box>
    );
};

export default ApexChart;



