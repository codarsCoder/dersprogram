// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Auth from 'src/auth/Auth'
import Preloader from 'src/components/Preloader'



const clientSideEmotionCache = createEmotionCache()
let persistor = persistStore(store);

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)


  return (
    <CacheProvider value={emotionCache}>
      {/* Persist gate Redux in kalıcı olmasını saglamak icin */}
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Head>
            <title>{`${themeConfig.templateName} - ders proramı Admin Template`}</title>
            <meta
              name='description'
              content={`${themeConfig.templateName} – ders proramı Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
            />
            <meta name='keywords' content='ders proramı' />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>
          <ToastContainer />
          <Preloader />
          <Auth>
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => {
                  return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </Auth>
        </Provider>
      </PersistGate>
    </CacheProvider >
  )
}

export default App
