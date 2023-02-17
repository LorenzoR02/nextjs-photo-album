import ErrorText from "@/components/ErrorText"
import { auth } from "@/config/firebaseApp"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { NextPage } from "next"
import { useState } from "react"

const RegisterPage: NextPage = (props): JSX.Element => {
  const [registering, setRegistering] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [error, setError] = useState<string>('')

  const signUpWithEmailAndPassword = () => {
    event?.preventDefault();

    if (password !== confirm) {
      setError('Please make sure your password match')
      return null
    }

    if (error !== '') setError('')

    setRegistering(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        // redirect to home page
        console.log(result)
      })
      .catch(error => {
        console.log(error)

        if (error.code.includes('auth/weak-password')) {
          setError('Please enter a stronger password')
        } else if (error.code.includes('auth/email-already-in-use')) {
          setError('Email already in use')
        } else {
          setError('Unable to register. Please try again later')
        }

        setRegistering(false)
      })
  }

  return (
    <div>
      <form onSubmit={signUpWithEmailAndPassword}>
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