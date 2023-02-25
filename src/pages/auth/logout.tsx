import { useAuth } from "@/context/AuthContext"
import { NextPage } from "next"
import { useRouter } from "next/router"

const LogoutPage: NextPage = (props): JSX.Element => {

  const { logout } = useAuth()
  const router = useRouter()

  const Logout = () => {
    logout()
    router.push('/')
  }


  return (
    <div>
      <p>Are you sure you want to logout?</p>
      <button onClick={() => { router.push('/') }}>Cancel</button>
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default LogoutPage