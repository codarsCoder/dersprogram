// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

import { AccountCog, BookAccount, BookClock, HomeAccount, PlusBox, ViewCarousel } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Admin Paneli',
      icon: HomeAccount,
      path: '/'
    },
    {
      title: 'Hesap Ayarları',
      icon: AccountCog,
      path: '/hesap'
    },
    
    {
      title: 'Ders Programı',
      icon: BookClock,
      path: '/dersprogrami'
    },
    {
      title: 'Soru Gir',
      icon: PlusBox,
      path: '/dersprogrami/programim'
    },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
  
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
