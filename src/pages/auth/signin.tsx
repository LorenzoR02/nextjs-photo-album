import { NextPage } from "next"
import { useState } from "react"

interface Props { }

const SignIn: NextPage = (props): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <div>
    <form>
      <span>Email</span>
      <input type='email' value={email} onChange={(text) => setEmail(text.target.value)} />
      <span>Password</span>
      <input type='password' value={password} onChange={(text) => setPassword(text.target.value)} />
      <input type='submit' value='Sign Up' />
    </form>
  </div>
}

export default SignIn