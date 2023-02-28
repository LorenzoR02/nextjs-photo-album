import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="shadow-md flex justify-between items-center p-4">
      <Link href='/' className="font-bold text-lg" >Photo Album</Link>
      <div className="flex gap-4">
        {!user
          ?
          <>
            <Link href='/auth/register' >Register</Link>
            <Link href='/auth/login' >Login</Link>
          </>
          :
          <>
            <Link href='/gallery' >Gallery</Link>
            <Link href='/auth/logout' >Logout</Link>
            <p>Logged as: {user.email}</p>
          </>
        }
      </div>
    </nav>
  )
}

export default Navbar