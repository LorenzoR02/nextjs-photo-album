import Navbar from '@/components/Navbar'
import { AuthContextProvider } from '@/context/AuthContext'
import { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {

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
        <h1 className='text-red-500'>ciao</h1>
        <Component {...pageProps} />

      </AuthContextProvider>
    </>
  )
}
