import React from 'react'
import { Card, CardHeader, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Preloader from 'src/components/Preloader'
import useVericek from 'src/hooks/useVericek'
import TumIsletmelerCollapseTable2 from 'src/tables/TumIsletmelerCollapseTable2'

const Isletmeler = () => {

    // router tanımla 
    const router = useRouter()

    // redux tan user al 
    const user = useSelector((state => state.user))

    //  veriçekme hooku
    const { responseData, postData } = useVericek();

    const [loader, setLoader] = useState(true)

    useEffect(() => {

        // kullanıcının maili reduxdan gelmiyorsa anasayfaya at
        if (!user.mail) {
            router.push("/login")
        } else {
            // setLoader(false)
        }

    }, [user])


    //  tüm işletmeleri isteyelim

    useEffect(() => {

        postData({
            "query": "select",
            "service": "admin_shop_all"
        })

    }, [])




    return (
        <>
            {
                loader ?
                    (
                        <Grid item xs={12}>
                            {responseData && <TumIsletmelerCollapseTable2 responseData={responseData} />}
                        </Grid>
                    ) : (
                        <Preloader />
                    )
            }
        </>
    )
}

export default Isletmeler