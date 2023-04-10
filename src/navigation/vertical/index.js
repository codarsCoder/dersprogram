// ** Icon imports

import { AccountCog, AccountMultiple, BookAccount, BookClock, HomeAccount, NaturePeople, PlusBox, ViewCarousel } from 'mdi-material-ui'
import { useSelector } from 'react-redux'


  const navigation = () => {
  
    const user = useSelector((state) => state.user);
  
    const items = [
      {
        title: "Admin Paneli",
        icon: HomeAccount,
        path: "/",
      },
      {
        title: "Hesap Ayarları",
        icon: AccountCog,
        path: "/hesap",
      },
      {
        title: "Ders Programı",
        icon: BookClock,
        path: "/dersprogrami",
      },
      {
        title: "Soru Gir",
        icon: PlusBox,
        path: "/dersprogrami/programim",
      },
    ];
  
    if (user.statu == 2) {
      items.splice(1, 0, {
        title: "Kullanıcılar",
        icon: AccountMultiple,
        path: "kullanici/kullanicilar",
      },{
        title: "Kullanıcı Ekle",
        icon: PlusBox,
        path: "/kullanici",
      });
    }
  
    return items;
  };
  
  export default navigation;
  