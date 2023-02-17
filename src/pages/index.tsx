import Head from 'next/head'
import Link from 'next/link'

export default function Home() {

  return (
    <>
      <Head>
        <title>Photo Album</title>
        <meta name="Store your photos" content="A powerfull storage for all your photos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href='/auth/register' >Register</Link>
        <Link href='/auth/login' >Login</Link>
        <Link href='/auth/logout' >Logout</Link>
        
      </main>
    </>
  )
}
