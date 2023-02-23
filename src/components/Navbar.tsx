import Link from "next/link"

function Navbar() {
  return (
    <nav>
      <Link href='/auth/register' >Register</Link>
      <Link href='/auth/login' >Login</Link>
      <Link href='/auth/logout' >Logout</Link>
    </nav>
  )
}

export default Navbar