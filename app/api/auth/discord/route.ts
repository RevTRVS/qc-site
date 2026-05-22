import { NextRequest, NextResponse } from "next/server";

const DISCORD_API = "https://discord.com/api/v10";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=discord_no_code", request.url));
  }

  try {
    const tokenResponse = await fetch(`${DISCORD_API}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID || "",
        client_secret: process.env.DISCORD_CLIENT_SECRET || "",
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI || "",
        scope: "identify email",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      const errorReason = JSON.stringify(tokenData || "unknown error");
      console.error("Discord token error:", tokenData);
      return NextResponse.redirect(
        new URL(`/auth/login?error=discord_token_failed&reason=${encodeURIComponent(errorReason)}`, request.url)
      );
    }

    const userResponse = await fetch(`${DISCORD_API}/users/@me`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok || !userData.id) {
      const errorReason = JSON.stringify(userData || "unable to fetch user");
      console.error("Discord user error:", userData);
      return NextResponse.redirect(
        new URL(`/auth/login?error=discord_user_failed&reason=${encodeURIComponent(errorReason)}`, request.url)
      );
    }

    const user = {
      id: userData.id,
      username: userData.username,
      email: userData.email || "",
      avatar: userData.avatar,
      provider: "discord",
    };

    const encodedUser = Buffer.from(JSON.stringify(user)).toString("base64");

    return NextResponse.redirect(
      new URL(`/auth/discord/callback?user=${encodeURIComponent(encodedUser)}`, request.url)
    );
  } catch (error) {
    console.error("Discord auth error:", error);
    return NextResponse.redirect(new URL("/auth/login?error=discord_failed", request.url));
  }
}
