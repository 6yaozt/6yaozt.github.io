import LoginForm from "@/components/login-form"
import AnimatedBackground from "@/components/animated-background"

// 这是网页的入口文件，包含一个登录表单和一个动画背景
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 sm:p-4">
      <AnimatedBackground />
      <LoginForm />
    </main>
  )
}
