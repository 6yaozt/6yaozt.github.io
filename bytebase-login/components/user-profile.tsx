"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Users, Github, Mail, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
// Add the useIsMobile hook import
import { useIsMobile } from "@/hooks/use-mobile"

//这里是用户GitHub授权登录之后的用户信息展示组件，仅展示了用户头像等基本信息
interface GitHubUser {
  id: number
  login: string
  name: string | null
  email: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

// Add the useIsMobile hook
export default function UserProfile({ user }: { user: GitHubUser }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Adjust breakpoint as needed
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)

    // In a real app, you would call an API to clear the session
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Clear cookies and redirect to home
      document.cookie = "github_user=; Max-Age=0; path=/; domain=" + window.location.hostname
      window.location.href = "/"
    } catch (error) {
      console.error("Logout failed:", error)
      setIsLoggingOut(false)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card className="w-full max-w-2xl shadow-xl bg-white/90 backdrop-blur-sm mx-4">
      <CardHeader className={`pb-2 ${isMobile ? "px-4 pt-4" : "px-6 pt-6"}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-green-600 mb-1">Login Successful!</CardTitle>
            <CardDescription>You have successfully logged in with your GitHub account</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
            Authenticated
          </Badge>
        </div>
      </CardHeader>

      <CardContent className={`pt-6 ${isMobile ? "px-4" : "px-6"}`}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className={`${isMobile ? "h-16 w-16" : "h-24 w-24"} border-2 border-blue-100`}>
              <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.login} />
              <AvatarFallback>{user.login.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h3 className={`font-bold ${isMobile ? "text-lg" : "text-xl"}`}>{user.name || user.login}</h3>
              <p className="text-gray-500">@{user.login}</p>
            </div>

            <Link
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <Github className="h-4 w-4 mr-1" />
              View GitHub Profile
            </Link>
          </div>

          <div className="flex-1 space-y-4">
            {user.bio && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Bio</h4>
                <p className="text-gray-700">{user.bio}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{user.email || "Email not public"}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">Joined {formatDate(user.created_at)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{user.public_repos} public repositories</span>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">
                  {user.followers} followers · {user.following} following
                </span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-500 mb-2">GitHub Account Information</h4>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter
        className={`flex ${isMobile ? "flex-col space-y-2" : "flex-row justify-between"} border-t ${isMobile ? "pt-4 px-4" : "pt-6 px-6"} mt-4`}
      >
        <Button variant="outline" className={`${isMobile ? "w-full" : ""}`} asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button
          variant="destructive"
          className={`${isMobile ? "w-full" : ""}`}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </CardFooter>
    </Card>
  )
}
