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
    <div className='flex flex-col justify-center items-center m-12 gap-2'>
      <p>Are you sure you want to logout?</p>
      <div className="flex gap-4">
      <button onClick={() => { router.back() }}>Cancel</button>
      <button onClick={Logout}>Logout</button>
      </div>
    </div>
  )
}

export default LogoutPage