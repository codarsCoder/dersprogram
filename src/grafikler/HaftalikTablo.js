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
                    y: chartData?.sonuc["Pazartesi"] ? chartData?.sonuc["Pazartesi"] : 0,
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Pazartesi"] ? chartData?.hedef["Pazartesi"] : 0,
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Salı',
                    y: chartData?.sonuc["Salı"] ? chartData?.sonuc["Salı"] : 0,
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Salı"] ? chartData?.hedef["Salı"] : 0,
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Çarşamba',
                    y: chartData?.sonuc["Çarşamba"] ? chartData?.sonuc["Çarşamba"] : 0,
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Çarşamba"] ? chartData?.hedef["Çarşamba"] : 0,
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Perşembe',
                    y: chartData?.sonuc["Perşembe"] ? chartData?.sonuc["Perşembe"] : 0,
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Perşembe"] ? chartData?.hedef["Perşembe"] : 0,
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Cuma',
                    y: chartData?.sonuc["Cuma"] ? chartData?.sonuc["Cuma"] : 0,
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Cuma"] ? chartData?.hedef["Cuma"] : 0,
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Cumartesi',
                    y: chartData?.sonuc["Cumartesi"] ? chartData?.sonuc["Cumartesi"] : 0,
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Cumartesi"] ? chartData?.hedef["Cumartesi"] : 0,
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Pazar',
                    y: chartData?.sonuc["Pazar"] ? chartData?.sonuc["Pazar"] : 0,
                    goals: [
                        {
                            name: 'Hedef',
                            value: chartData?.hedef["Pazar"] ? chartData?.hedef["Pazar"] : 0,
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
            textAlign: "center",
            height: 350,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },

        plotOptions: {
            bar: {
                columnWidth: '60%',
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
            <Typography variant='h5' sx={{ textAlign: "center", paddingTop: "20px" }}>Haftalık Hedef-Sonuç Tablosu </Typography>
            {chartData?.tarih &&
                (

                    <Typography variant='h6' sx={{ textAlign: "center", paddingTop: "20px" }}> {`${(chartData?.tarih["Pazartesi"].split("-").reverse().join("."))} - ${(chartData?.tarih["Pazar"].split("-").reverse().join("."))}`}</Typography>
                )
            }

            <ReactApexcharts options={options} series={series} type="bar" height={350} />
        </Box>
    );
};

export default ApexChart;



