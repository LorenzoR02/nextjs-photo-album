import { NextPage } from "next"

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  return <div>
    <form>
      <span>Email</span>
      <input type='email' />
      <span>Password</span>
      <input type='password' />
      <input type='submit' value='Sign Up' />
    </form>
  </div>
}

export default SignIn