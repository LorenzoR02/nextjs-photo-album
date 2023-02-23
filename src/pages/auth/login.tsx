import ErrorText from "@/components/ErrorText"
import { auth } from "@/config/firebase"
import { useAuth } from "@/context/AuthContext"
import { signInWithEmailAndPassword } from "firebase/auth"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const LoginPage: NextPage = (props): JSX.Element => {
  const [authenticating, setAuthenticating] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const router = useRouter()

  const loginWithEmailAndPassword = () => {
    event?.preventDefault();

    if (error !== '') setError('')

    setAuthenticating(true)

    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      router.push('/')
    })
    .catch(error => {
      console.log(error)
      setError('Unable to sign in. Please try again later')
      setAuthenticating(false)
    })
    
  }

  return (
    <div>
      <form onSubmit={loginWithEmailAndPassword}>
        <span>Email</span>
        <input 
          type='email' 
          name='email' 
          id='email' 
          value={email} 
          onChange={(text) => setEmail(text.target.value)} />
        <span>Password</span>
        <input 
          type='password' 
          name='password' 
          id='password' 
          value={password} 
          onChange={(text) => setPassword(text.target.value)} />
        <input 
          disabled={authenticating}
          type='submit' 
          value='Login' />

        <ErrorText error={error} />
      </form>
    </div>
  )
}

export default LoginPage