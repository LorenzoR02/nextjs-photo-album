import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/router"
import { useEffect } from "react"


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const user = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(!user.user){
      router.push('/auth/login')
    }

  }, [router, user])

  return (
    <>
      {user ? children : null}
    </>
  )
}

export default ProtectedRoute