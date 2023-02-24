import ErrorText from "@/components/ErrorText"
import { useAuth } from "@/context/AuthContext"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const LoginPage: NextPage = (props): JSX.Element => {
  const [authenticating, setAuthenticating] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const { user, login } = useAuth()

  const router = useRouter()

  const loginWithEmailAndPassword = (e: any) => {
    e.preventDefault();
    setError('')

    setAuthenticating(true)

    login(email, password)
      .then(() => {
        router.push('/')
      })
      .catch((error: any) => {

        if (error.code.includes('auth/weak-password')) {
          setError('Please enter a stronger password')
        } else if (error.code.includes('auth/email-already-in-use')) {
          setError('Email already in use')
        } else {
          setError('Unable to register. Please try again later')
        }
      })

    setAuthenticating(false)

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