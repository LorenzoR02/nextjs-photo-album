import Head from 'next/head'
import Image from 'next/image'
import firebase from 'public/firebase.png'

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
        <div className='mt-12 flex flex-col justify-center items-center'>
          <h1 className='font-semibold text-2xl'>Create an account and store all your photos on Firebase</h1>
          <Image
            src={firebase}
            alt='firebase'
          ></Image>
        </div>
      </main>
    </>
  )
}

