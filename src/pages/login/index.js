// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'


import { useDispatch, useSelector } from 'react-redux'
import { setLoader, userLogin } from 'src/redux/userslice'
import axios from 'axios'
import { toast } from 'react-toastify'
import useAxios from '../api/axiosWithToken'


// ** Styled Components

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))


const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    email: 'deneme@deneme.com',
    password: '123',
    showPassword: false
  })

  // REDUX
  const user = useSelector((state => state.user))
  const dispatch = useDispatch()

  // EĞER KULLANICI GİRİS YAPMISSA YONLENDİR
  useEffect(() => {
    if (user.id) {
      router.push("/")
    }
  }, [user, router])

  useEffect(() => { //loader açıksa kapatmış olalım
    dispatch(setLoader({ status: false }))
  }, [])
  
  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const { axiosWithToken } = useAxios();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // LOGİN 
  const handleSubmit = async (event) => {

    event.preventDefault()

    // LOGİN İSTEGİ ATIYORUZ    const { data } = await axiosWithToken.get(`account/${user?.id}/`)
    const { data } = await axios.post("https://codarscoder.tk/dersprogrami/", {
      "query": "select",
      "service": "userlogin",
      "email": values.email,
      "parola": values.password
    })

    if (data.status) {

      toast.success("Giriş Başarılı!")

      // REDUXA İŞLİ YORUZ
      dispatch(userLogin({id: data.data.email,  mail: data.data.email, adi:data.data.adi, token:data.data.Token, statu:data.data.statu  }))

      // YÖNLENDİRİYORUZ
      router.push("/")

    } else {
        toast.error("Email yada şifre bilgileriniz yanlış!")
    }

  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
        <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{textAlign:"center", fontWeight: 600, marginBottom: 1.5 }}>
            Giriş
            </Typography>
          </Box>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <TextField value={values.email} type='email' onChange={handleChange('email')} autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Parola</InputLabel>
              <OutlinedInput
                label='Parola'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Beni hatırla' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Parolamı unuttum</LinkStyled>
              </Link>
            </Box>
    
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              type='submit'
            >
              GİRİŞ
            </Button>
          </form>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2'>
                <Link passHref href='/register'>
                  <LinkStyled>Üye değil misiniz?</LinkStyled>
                </Link>
              </Typography>
            </Box>
        </CardContent>
      </Card>
      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
