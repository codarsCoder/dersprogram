import { Card, CardHeader, Box } from '@mui/material'
import { DataGrid, GridToolbar, trTR } from '@mui/x-data-grid'
import React, { useState } from 'react'
import Chip from '@mui/material/Chip';
import Link from 'src/@core/theme/overrides/link'
import StickerCheck from 'mdi-material-ui/StickerCheck'
import StickerRemove from 'mdi-material-ui/StickerRemove'
import ArrowRightBox from 'mdi-material-ui/ArrowRightBox'
import { useRouter } from 'next/router';

const TumIsletmelerCollapseTable2 = ({ responseData }) => {
  // isletme, sahibi, kategori, odeme, git, email, telefon, ulke, sehir, shop_id

  const router = useRouter()

  const isletmeStatus = {
    0: "Pasif",
    1: "Beklemede",
    2: "Aktif",
    3: "Reddedildi",
  }

  // const statusObj = {
  //   // Beklemede:  'info' ,
  //   0: 'error',
  //   1: 'primary',
  //   2: 'warning',
  //   3: 'success'
  // }

  const columns = [
    {
      flex: 0.03,
      minWidth: 40,
      headerName: 'No',
      field: 'id',
    },
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'İşletme',
      field: 'shop_name',
      renderCell: (params) => {

        return (
          <div
            className="chip-link"
            style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
            onClick={() => router.push(`/isletme/${params.row.shop_id}`)}
          >
            {params.row.shop_name}
          </div>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'Sahibi',
      field: 'shop_username',
    },

    {
      flex: 0.2,
      minWidth: 100,
      headerName: 'Kategori',
      field: 'kategori',
    },
    {
      flex: 0.07,
      minWidth: 40,
      headerName: 'Ödeme',
      field: 'isPaid',
      renderCell: (params) => {
        const { value } = params;
        const status = getStatusObj(Number(value));

        return (
          (params.row.isPaid == "true" || params.row.isPaid == "True") ? <StickerCheck sx={{ color: "blue" }} /> : <StickerRemove />
        );
      },

    },
    // (row.odeme == "true" || row.odeme == "True") ? "Yapıldı" : "Yapılmadı"
    {
      flex: 0.07,
      minWidth: 80,
      field: 'status',
      headerName: 'Durum',
      renderCell: (params) => {
        const { value } = params;
        const status = getStatusObj(Number(value));


        return (
          <Chip label={status.title} color={status.color} />
        );
      },
    },
    {
      flex: 0.07,
      minWidth: 80,
      field: 'shop_id',
      headerName: 'Düzenle',
      renderCell: (params) => {


        return (
          <ArrowRightBox style={{ textDecoration: 'underline', color: 'success', cursor: 'pointer' }}
            onClick={() => router.push(`/isletme/${params.row.shop_id}`)} />
        );
      },
    },
  ]

  const getStatusObj = (status) => {
    switch (status) {
      case 0:
        return { title: 'Pasif', color: 'success' };
      case 1:
        return { title: 'Beklemede', color: 'warning' };
      case 2:
        return { title: 'Aktif', color: 'primary' };
      case 3:
        return { title: 'Reddedildi', color: 'error' };
      default:
        return { title: 'unknown', color: 'default' };
    }
  }

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // ** States
  const [data, setData] = useState(responseData.data.map((item, index) => ({ shop_id: item.shop_id, shop_name: item.shop_name, shop_username: item.shop_username, kategori: item.kategori, isPaid: item.isPaid, status: item.status, id: index + 1 })))
  const [pageSize, setPageSize] = useState(50)
  const [filteredData, setFilteredData] = useState([])



  return (
    <Card className='isletme-card'>
      <CardHeader title='İşletmeler' />
      <Box sx={{ padding: "20px" }}>
        <DataGrid
          autoHeight
          columns={columns}
          localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          slots={{ toolbar: GridToolbar }}
          rows={filteredData.length ? filteredData : data}
          componentsProps={{
            baseButton: {
              // variant: 'outlined',
            }
          }}
        />
      </Box>

    </Card>
  )
}

export default TumIsletmelerCollapseTable2