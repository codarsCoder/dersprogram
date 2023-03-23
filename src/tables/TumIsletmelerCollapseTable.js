// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import Chip from '@mui/material/Chip'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Link from 'next/link'


const isletmeStatus = {
  0: "Pasif",
  1: "Beklemede",
  2: "Aktif",
  3: "Reddedildi",
}

const statusObj = {
  // Beklemede:  'info' ,
  Reddedildi: 'error',
  Aktif: 'primary',
  Beklemede: 'warning',
  Pasif: 'success'
}

// const createData = (isletme, sahibi, kategori, odeme, git, email, ulke, telefon, sehir)
const createData = (isletme, sahibi, kategori, odeme, git, email, telefon, ulke, sehir, shop_id) => {
  // const [isletme, sahibi, kategori, odeme, git, email,telefon, ulke,  sehir] = data;

  return {
    isletme,
    sahibi,
    kategori,
    odeme,
    git,
    history: [
      {
        email,
        ulke,
        telefon,
        sehir
      }
    ],
    shop_id
  }
}

const Row = props => {
  // ** Props
  const { row } = props


  // ** State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell >
          {row.isletme}
        </TableCell>
        <TableCell align='left'>  <Link href={`/isletme/${row.shop_id}`} passHref><a>{row.sahibi}</a></Link></TableCell>
        <TableCell align='left'>{row.kategori}</TableCell>

        <TableCell align='left'>{(row.odeme == "true" || row.odeme == "True") ? "Yapıldı" : "Yapılmadı"}</TableCell>

        <TableCell align='left'>
          <Chip
            label={<Link href={`/isletme/${row.shop_id}`} passHref><a className='chip-link'>{isletmeStatus[row.git]}</a></Link>}
            color={statusObj[isletmeStatus[row.git]]}
            sx={{
              textDecoration: 'none !important',
              color: 'white',
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
          {/* <Link href={`/isletme/${row.shop_id}`} passHref><a>{isletmeStatus[row.git]}</a></Link></TableCell> */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important', backgroundColor: "#d3d3f2" }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Detay
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Telefon</TableCell>
                    <TableCell align='left'>Ülke</TableCell>
                    <TableCell align='left'>Şehir</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, i) => (
                    <TableRow key={i}>
                      <TableCell component='th' scope='row'>
                        {historyRow.email}
                      </TableCell>
                      <TableCell>{historyRow.telefon}</TableCell>
                      <TableCell align='left'>{historyRow.ulke}</TableCell>
                      <TableCell align='left'>{historyRow.sehir}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}



const TumIsletmelerCollapseTable = ({ responseData }) => {

  const rows = responseData.data.map((item) => createData(item.shop_name, item.shop_username, item.kategori, item.isPaid, item.status, item.mail, item.phone, item.location.country, item.location.city, item.shop_id))

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>İŞLETME</TableCell>
            <TableCell align='left'>SAHİBİ</TableCell>
            <TableCell align='left'>KATEGORİ</TableCell>
            <TableCell align='left'>ÖDEME</TableCell>
            <TableCell align='left'>DURUM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TumIsletmelerCollapseTable
