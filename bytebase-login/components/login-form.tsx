"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"

//这是一个登录表单组件，使用了 Next.js 和 React 的一些功能
// 它包含了一个输入框用于输入电子邮件和密码，一个登录按钮，一个 GitHub 登录按钮，
export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const isMobile = useIsMobile()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login - in a real app, you would call your auth API
    try {
      // await login(email, password)
      console.log("Logging in with:", email, password)
      setTimeout(() => {
        router.push("/login")
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Login failed:", error)
      setIsLoading(false)
    }
  }

  const handleGithubLogin = () => {
    // Redirect to GitHub OAuth endpoint
    window.location.href = "/api/auth/github"
  }

  return (
    <Card
      className={`w-full ${isMobile ? "max-w-[90%]" : "max-w-[40%] min-w-[350px]"} shadow-xl bg-white/90 backdrop-blur-sm`}
    >
      <CardHeader className={`space-y-1 ${isMobile ? "px-4 py-4" : "px-6 py-6"}`}>
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Bytebase Logo" className="h-10" />
        </div>
        <CardTitle className="text-3xl font-bold text-center">Sign in to Bytebase</CardTitle>
        <CardDescription className="text-center text-lg">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent className={`space-y-4 ${isMobile ? "px-4" : "px-6"}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`${isMobile ? "text-base py-4" : "text-lg py-6"}`}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <Link href="/forgot-password" className="text-base text-blue-600 hover:text-blue-800 font-medium">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`${isMobile ? "text-base py-4" : "text-lg py-6"}`}
            />
          </div>
          <Button
            type="submit"
            className={`w-full ${isMobile ? "text-base py-4" : "text-lg py-6"} bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700`}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center space-x-2">
          <Separator className="flex-1" />
          <span className="text-xs text-gray-400">OR</span>
          <Separator className="flex-1" />
        </div>

        <Button
          variant="outline"
          className={`w-full ${isMobile ? "text-base py-4" : "text-lg py-6"} border-2 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10`}
          onClick={handleGithubLogin}
        >
          <Github className="mr-2 h-5 w-5" />
          Sign in with GitHub
        </Button>
      </CardContent>
      <CardFooter className={`flex flex-col space-y-4 border-t ${isMobile ? "pt-3 px-4" : "pt-4 px-6"}`}>
        <div className={`text-center ${isMobile ? "text-sm" : "text-base"}`}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign up
          </Link>
        </div>
        <div className={`text-center ${isMobile ? "text-xs" : "text-sm"} text-gray-500`}>
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:text-blue-800">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
            Privacy Policy
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
