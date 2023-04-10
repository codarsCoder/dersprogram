// ** React Imports
import { useState, Fragment, useRef } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
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
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'


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
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(4),
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))



const RegisterPage = () => {

    const parolaRef = useRef(null)


    const user = useSelector((state) => state.user);

    const router = useRouter();

    if (user.statu !== 2) {
        router.push("/")
    }


    // ** States
    const [values, setValues] = useState({
        password: '',
        showPassword: false
    })

    // ** Hook
    const theme = useTheme()

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }

    // KAYIT 
    const handleSubmit = async (event) => {

        event.preventDefault()
        if (!values.ad || !values.email || !values.parola || !values.parola2) {
            return toast.error("Formdaki alanlar boş bırakılamaz!")
        }
        if (values.parola === values.parola2 && values.parola !== "") {
            // LOGİN İSTEGİ ATIYORUZ    const { data } = await axiosWithToken.get(`account/${user?.id}/`)
            const { data } = await axios.post("https://codarscoder.tk/dersprogrami/", {
                "query": "insert",
                "service": "user",
                "adi": values.adi,
                "email": values.email,
                "parola": values.parola,
                "telefon": 1
            })

            if (data.status) {

                toast.success("Kayıt Başarılı!")



                // YÖNLENDİRİYORUZ
                //   router.push("/login")

            } else {
                toast.error("Kayıt Başarılı Olmadı!")
            }

        } else {
            toast.error("Girilen parolalar uyuşmuyor!")
            parolaRef.current.focus()
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
                            Kullanıcı Ekle
                        </Typography>
                    </Box>
                    <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                        <TextField required autoFocus fullWidth id='ad' label='Adınız - Soyadınız' sx={{ marginBottom: 4 }} onChange={handleChange('adi')} />
                        <TextField fullWidth type='email' label='Email' sx={{ marginBottom: 4 }} onChange={handleChange('email')} />
                        <FormControl fullWidth>
                            <InputLabel htmlFor='auth-register-password'>Parola</InputLabel>
                            <OutlinedInput
                                ref={parolaRef}
                                label='Password'
                                value={values.parola}
                                id='auth-register-password'
                                onChange={handleChange('parola')}
                                type={values.showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            aria-label='toggle password visibility'
                                        >
                                            {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ mt: 4 }} fullWidth>
                            <InputLabel htmlFor='auth-register-password'>Parola Tekrar</InputLabel>
                            <OutlinedInput
                                label='Password'
                                value={values.parola2}
                                id='auth-register-password'
                                onChange={handleChange('parola2')}
                                type={values.showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            aria-label='toggle password visibility'
                                        >
                                            {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7, mt: 4 }} onClick={handleSubmit}>
                            Kayıt Ol
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

// RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
