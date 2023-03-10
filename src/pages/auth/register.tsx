import ErrorText from "@/components/ErrorText"
import { useAuth } from "@/context/AuthContext"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const RegisterPage: NextPage = (props): JSX.Element => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [registering, setRegistering] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const router = useRouter()

  const signUpWithEmailAndPassword = (e: any) => {
    e.preventDefault()
    setError('')

    if (confirm === password) {

      setRegistering(true)

      register(email, password)
        .then(() => {
          router.push('/gallery')
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

      setRegistering(false)

    } else {
      setError('The two passwords do not match')
    }
  }

  return (
    <div>
      <form onSubmit={signUpWithEmailAndPassword} className='flex flex-col justify-center items-center m-12 gap-2'>
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
        <span>Confirm Password</span>
        <input
          type='password'
          name='confirm'
          id='confirm'
          value={confirm}
          onChange={(text) => setConfirm(text.target.value)} />
        <input
          disabled={registering}
          type='submit'
          value='Sign Up' />

        <ErrorText error={error} />
      </form>
    </div>
  )
}

export default RegisterPage