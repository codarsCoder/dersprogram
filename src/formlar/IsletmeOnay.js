// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import ListStatus from 'mdi-material-ui/ListStatus'
import ArrowLeft from 'mdi-material-ui/ArrowLeft'
import { useState } from 'react'
import { FormControl, IconButton, InputLabel } from '@mui/material'
import Confirm from 'src/bildirimler/Confirm'
import useVericek from 'src/hooks/useVericek'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/router'


// accordion meü
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ChevronDown from 'mdi-material-ui/ChevronDown';


const IsletmeOnay = ({ business }) => {


  const router = useRouter()


  const [values, setValues] = useState({
    'id': '',
    'status': business.status,
    'message': '',
    'shop_id': ''
  })

  //accordion meü için 
  const [expanded, setExpanded] = useState(false);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const [statusMessage, setStatusMessage] = useState("")

  const [open, setOpen] = useState(false);

  // //  veriçekme hooku
  // const { responseData, postData } = useVericek();

  const messages = [
    `Merhaba ${business.shop_username}. İşletmenizin kayıt statusu pasif durumuna alınmıştır.`,
    `Merhaba ${business.shop_username}. İşletme kaydınızdaki eksik yada hatalı verilerden dolayı işletmeniz aktif edilememiştir. Lütfen aşağıda belirtilen kısımları güncelleyiniz.`,
    `Merhaba ${business.shop_username}. Tebrikler! İşletme kaydınız başarıyla gerçekleştirilmiştir. WhereIsHalal ailesine hoş geldiniz.`,
    `Merhaba ${business.shop_username}. Üzgünüz! İşletme kaydınızdaki eksik yada hatalı verilerin düzeltilmemesinden dolayı işletme kayıt talebiniz reddedilmiştir.`,
  ]



  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const handleChangeStatus = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, ['message']: messages[value], ['id']: business.shop_userid, ['shop_id']: business.shop_id });
    setStatusMessage(messages[value]) //statu koduna göre otomatik mesajı yapıştırıyoruz
  }

  const handleChangeMessage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setStatusMessage(value) // alana girilen değeri message statesine güncelle
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  // confirm kullanımı
  const [openC, setOpenC] = useState(false);

  const handleConfirm = async () => {

    const { data } = await axios.post("https://whereishelal.demoservis.com", {
      "query": "update",
      "service": "shop_status",
      "user_id": values.id,
      "message": values.message,
      "status": values.status,
      "shop_id": values.shop_id
    })
    data.status ? toast.info(data.message) : toast.error(data.message)
  };

  const handleCancel = () => {
    // Confirm iptal edildiğinde yapılacak işlemler
  };







  return (
    <>
      <Card>
        <Grid sx={{ marginTop: "20px", padding: "30px" }} item xs={12}><Typography variant="h6">Bu form ile bir işletmenin yayın durumunu değiştirebilirsiniz. Budeğişiklikler ilgili işletmeye bildirim olarak iletilecektir.</Typography>
        </Grid>
        <CardHeader title='İşletme Durum Bildirim Formu' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form onSubmit={e => {
            e.preventDefault()
            setOpenC(true)
          }}>
            <Grid container xs={12} spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled
                  label='İşletme Id'
                  name='id'
                  placeholder={business.shop_id}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='isletme-statu'>Onay Durumu</InputLabel>
                  <Select
                    label='Onay Durumu'
                    id='isletme-onay'
                    labelId='isletme-statu'
                    name='status'
                    value={values.status}
                    onChange={handleChangeStatus}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    startAdornment={(
                      <InputAdornment position='start'>
                        <ListStatus />
                      </InputAdornment>
                    )}
                  >
                    <MenuItem value='0'>PASİF</MenuItem>
                    <MenuItem value='1'>BEKLEMEDE</MenuItem>
                    <MenuItem value='2'>AKTİF</MenuItem>
                    <MenuItem value='3'>REDDEDİLDİ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  label='Mesaj'
                  name='message'
                  placeholder='Mesaj'
                  value={statusMessage}
                  onChange={handleChangeMessage}
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <MessageOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' size='large'>
                  Gönder
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <Grid p={5} container justifyContent="end" item xs={12}>     <Button variant="outlined" color="secondary" size='small' onClick={() => router.back()} startIcon={<ArrowLeft />}> GERİ DÖN</Button></Grid>

      </Card>

      <Confirm
        open={openC}
        setOpen={setOpenC}
        title="Onayınız Gerekli!"
        message="İletiniz kullanıcıya  gönderilecek emin misiniz?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <div>

        {
          Object.keys(business).map(item => {

            return (
              <>
                <Accordion expanded={expanded === item} onChange={handleChangeAccordion(item)}>
                  <AccordionSummary
                    expandIcon={<ChevronDown />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{background: expanded == item ?  "#37a84a" : "#f9f9f9" }}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0, color: expanded == item &&  "white" }}>
                     {item}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                      Aliquam eget maximus est, id dignissim quam.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            )



          })
        }

      </div>
    </>

  )
}

export default IsletmeOnay
