import { NextPage } from "next"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/config/firebaseApp"

interface Props { }

const signup: NextPage = (props): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log(user)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return <div>
    <form onSubmit={signUp}>
      <span>Email</span>
      <input type='email' value={email} onChange={(text) => setEmail(text.target.value)} />
      <span>Password</span>
      <input type='password' value={password} onChange={(text) => setPassword(text.target.value)} />
      <input type='submit' value='Sign Up' />
    </form>
  </div>
}

export default signup