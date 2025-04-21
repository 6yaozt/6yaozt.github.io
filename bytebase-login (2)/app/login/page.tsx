import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UserProfile from "@/components/user-profile"

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Check for error in search params
  const error = searchParams.error as string | undefined

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Login Error</h1>
          <p className="text-gray-700">
            {error === "invalid_state"
              ? "Invalid state parameter. Please try again."
              : "Failed to authenticate with GitHub. Please try again."}
          </p>
          <a href="/" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  // Get user data from cookies
  const cookieStore = cookies()
  const userCookie = cookieStore.get("github_user")

  if (!userCookie?.value) {
    // No user data found, redirect to home
    redirect("/")
  }

  // Parse user data from cookie
  const userData = JSON.parse(userCookie.value)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <UserProfile user={userData} />
    </div>
  )
}
