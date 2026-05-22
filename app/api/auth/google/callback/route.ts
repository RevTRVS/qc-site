import { NextRequest, NextResponse } from "next/server";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=google_no_code", request.url));
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: GOOGLE_REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Google token error:", tokenData);
      return NextResponse.redirect(new URL("/auth/login?error=google_token_failed", request.url));
    }

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok || !userData.id) {
      console.error("Google user error:", userData);
      return NextResponse.redirect(new URL("/auth/login?error=google_user_failed", request.url));
    }

    const user = {
      id: userData.id,
      username: userData.name || userData.email.split("@")[0],
      email: userData.email,
      avatar: userData.picture || "",
      provider: "google",
    };

    const encodedUser = Buffer.from(JSON.stringify(user)).toString("base64");

    return NextResponse.redirect(
      new URL(`/auth/google/callback?user=${encodeURIComponent(encodedUser)}`, request.url)
    );
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.redirect(new URL("/auth/login?error=google_failed", request.url));
  }
}
