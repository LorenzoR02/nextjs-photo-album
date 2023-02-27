const config = {
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID
  },
  supportedFormats: ['image/png', 'image/jpeg', 'image/jpg'],
  noAuthRequiredPaths: ['/', '/auth/login', '/auth/register'],
}

export default config