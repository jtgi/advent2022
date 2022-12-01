import { BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/router"
import { LoginForm } from "src/auth/components/LoginForm"
import AdminLayout from "src/core/layouts/AdminLayout"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <AdminLayout title="Log In">
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          return router.push(next)
        }}
      />
    </AdminLayout>
  )
}

export default LoginPage
