import axios from 'axios'
import React from 'react'
import Link from 'next/link'
import IsletmeOnay from 'src/formlar/IsletmeOnay'
import Grid from '@mui/material/Grid'

const Isletme = ({ business }) => {


    return (

        <Grid item xs={6} sm={4}>
            <IsletmeOnay business={business} />
        </Grid>

    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const { query } = context

    const { data } = await axios.post("https://whereishelal.demoservis.com",
        {
            "query": "select",
            "service": "admin_shop_detail",
            "shop_id": query.id
        })
        
    // Pass data to the page via props

    return { props: { business: data.data } }

}

export default Isletme