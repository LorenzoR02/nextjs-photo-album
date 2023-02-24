import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { useRouter } from "next/router"

function Navbar() {
  const { user, logout } = useAuth()

  const router = useRouter()

  return (
    <nav>
      {!user
        ?
        <>
          <Link href='/auth/register' >Register</Link>
          <Link href='/auth/login' >Login</Link>
        </>
        :
          <span onClick={() => {
            
            logout()
            router.push('/auth/login')

          }}>Logout</span>
      }
    </nav>
  )
}

export default Navbar