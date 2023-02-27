import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import { AuthContextProvider } from '@/context/AuthContext'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ProtectedRoute from '@/components/ProtectedRoute'
import config from '@/config/config'

export default function App({ Component, pageProps }: AppProps) {
  
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Photo Album</title>
        <meta name="Store your photos" content="A powerfull storage for all your photos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthContextProvider>
        <Navbar />
        {config.noAuthRequiredPaths.includes(router.pathname)
        ? 
          <Component {...pageProps} />
        :
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        }
      </AuthContextProvider>
    </>
  )
}
