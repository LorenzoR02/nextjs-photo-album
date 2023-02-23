import { auth } from "@/config/firebase"
import { NextPage } from "next"
import { useRouter } from "next/router"

const LogoutPage: NextPage = (props): JSX.Element => {

  const router = useRouter()
  
  const Logout = () => {
    auth.signOut()
    .then(() => router.push('/'))
    .catch(error => console.log(error))
  }


  return (
    <div>
      <p>Are you sure you want to logout?</p>
      <button onClick={() => {router.push('/')}}>Cancel</button>
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default LogoutPage