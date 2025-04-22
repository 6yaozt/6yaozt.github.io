import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const storedState = request.cookies.get("github_oauth_state")?.value

  // Verify state to prevent CSRF attacks
  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL("/login?error=invalid_state", request.url))
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: "Ov23liMUPrmWtbOPI86q",
        client_secret: "052a91da6eb7c5b3fe21e66eb80397c5fbc3f9d4",
        code,
        redirect_uri: "http://localhost:3000/api/auth/github/callback",
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      console.error("GitHub OAuth error:", tokenData.error)
      return NextResponse.redirect(new URL("/login?error=github_oauth_failed", request.url))
    }

    const accessToken = tokenData.access_token

    // Get user data from GitHub
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })

    const userData = await userResponse.json()

    // Get user email from GitHub
    const emailResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })

    const emailData = await emailResponse.json()
    const primaryEmail = emailData.find((email: any) => email.primary)?.email || ""

    // Create a user object with the data we want to pass to the login page
    const user = {
      id: userData.id,
      login: userData.login,
      name: userData.name,
      email: primaryEmail,
      avatar_url: userData.avatar_url,
      html_url: userData.html_url,
      bio: userData.bio,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
    }

    // Set a cookie with the user data
    const response = NextResponse.redirect(new URL("/login", request.url))

    // Store user data in a cookie (encrypted in a real app)
    response.cookies.set("github_user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return response
  } catch (error) {
    console.error("GitHub OAuth error:", error)
    return NextResponse.redirect(new URL("/login?error=github_oauth_failed", request.url))
  }
}
