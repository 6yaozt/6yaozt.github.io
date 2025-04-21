import { NextResponse } from "next/server"

//这是一个 GitHub OAuth 初始化端点
export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID || "Ov23liMUPrmWtbOPI86q"
  const redirectUri = "http://localhost:3000/api/auth/github/callback"
  const scope = "user:email read:user"
  const state = Math.random().toString(36).substring(2)

  // Store state in a cookie for verification later
  const response = NextResponse.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`,
  )

  response.cookies.set("github_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  })

  return response
}
