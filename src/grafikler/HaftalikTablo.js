import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import paper from 'src/@core/theme/overrides/paper';


const ApexChart = ({ entries }) => {
    console.log(entries)
    
    const [series] = useState([
        {
            name: 'Mevcut',
            data: [
                {
                    x: 'Pazartesi',
                    y: entries.sonuc["Pazartesi"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: entries.hedef["Pazartesi"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Salı',
                    y: entries.sonuc["Salı"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: entries.hedef["Salı"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Çarşamba',
                    y: entries.sonuc["Çarşamba"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: entries.hedef["Çarşamba"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Perşembe',
                    y: entries.sonuc["Perşembe"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: entries.hedef["Perşembe"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Cuma',
                    y: entries.sonuc["Cuma"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: entries.hedef["Cuma"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Cumartesi',
                    y: entries.sonuc["Cumartesi"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: entries.hedef["Cumartesi"],
                            strokeHeight: 5,
                            strokeColor: '#775DD0',
                        },
                    ],
                },
                {
                    x: 'Pazar',
                    y: entries.sonuc["Pazar"],
                    goals: [
                        {
                            name: 'Hedef',
                            value: entries.hedef["Pazar"],
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
            <Typography variant='h6' sx={{textAlign:"center",paddingTop:"20px" }}> {`${(entries.tarih["Pazartesi"].split("-").reverse().join("."))} - ${(entries.tarih["Pazar"].split("-").reverse().join("."))}`}</Typography>
          
            <ReactApexcharts options={options} series={series} type="bar" height={350} />
        </Box>
    );
};

export default ApexChart;



