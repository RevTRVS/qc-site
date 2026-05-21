# Discord OAuth Setup Guide - NexaFinds

## Overview

This guide explains how to set up Discord login/signup for NexaFinds.

## Current Implementation

Currently, the authentication system uses:
- Email/Password login (localStorage-based for demo)
- Discord button that redirects to Discord server invite

## Implementing Discord OAuth2

### Step 1: Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Name it "NexaFinds"
4. Go to "OAuth2" → "General"
5. Copy your **Client ID** and **Client Secret**
6. Keep these secure (use `.env.local`)

### Step 2: Configure OAuth2 Redirect

1. In Discord Developer Portal, go to "OAuth2" → "Redirects"
2. Add redirect URI:
   ```
   http://localhost:3000/api/auth/discord/callback
   Production: https://yourdomain.com/api/auth/discord/callback
   ```

### Step 3: Add Environment Variables

Create `.env.local` file in project root:

```env
DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/discord/callback
```

### Step 4: Install Discord.js or Discord OAuth2 Library

```bash
npm install discord-oauth2
# or
npm install @discordjs/oauth2
```

### Step 5: Create Discord OAuth Handler

Create file: `/app/api/auth/discord/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

const DISCORD_API = "https://discord.com/api/v10";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(`${DISCORD_API}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID || "",
        client_secret: process.env.DISCORD_CLIENT_SECRET || "",
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.DISCORD_REDIRECT_URI || "",
        scope: "identify email",
      }),
    });

    const tokenData = await tokenResponse.json();

    // Get user info
    const userResponse = await fetch(`${DISCORD_API}/users/@me`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    // Create user session or update existing
    const user = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      avatar: userData.avatar,
      provider: "discord",
    };

    // Store in session/database
    // For now, store in localStorage via redirect
    const encodedUser = btoa(JSON.stringify(user));

    return NextResponse.redirect(
      new URL(`/auth/discord/callback?user=${encodedUser}`, request.url)
    );
  } catch (error) {
    console.error("Discord auth error:", error);
    return NextResponse.redirect(new URL("/auth/login?error=discord_failed", request.url));
  }
}
```

### Step 6: Create Callback Handler

Create file: `/app/auth/discord/callback/page.tsx`

```typescript
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function DiscordCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      router.push(`/auth/login?error=${error}`);
      return;
    }

    if (userParam) {
      try {
        const user = JSON.parse(atob(userParam));
        // Auto-login with Discord user
        login(user.email, user.id);
        router.push("/");
      } catch (e) {
        router.push("/auth/login?error=invalid_user");
      }
    }
  }, [searchParams, router, login]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Connecting to Discord...</p>
      </div>
    </div>
  );
}
```

### Step 7: Update Login Page with Discord Button

The Discord button should redirect to:

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/api/auth/discord/callback&response_type=code&scope=identify%20email
```

Or use a library like `discord-oauth2`.

## Update LoginPage Component

In `/app/auth/login/page.tsx`, add Discord OAuth button:

```typescript
const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || "")}&response_type=code&scope=identify%20email`;

<a href={discordAuthUrl} className="...discord auth button...">
  Login with Discord
</a>
```

## Environment Variables Setup

Add to `.env.local`:

```env
# Discord OAuth
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_client_id
NEXT_PUBLIC_DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/discord/callback
```

## Testing

1. Start dev server: `npm run dev`
2. Go to `/auth/login`
3. Click "Login with Discord"
4. Authorize on Discord
5. Should redirect back to homepage logged in

## Production Setup

1. Add production Discord app callback URI
2. Update environment variables on production
3. Use secure secrets management (not in code)
4. Test thoroughly on staging

## Troubleshooting

- **Redirect URI mismatch**: Ensure exact match in Discord app settings
- **Invalid client_id**: Check environment variables
- **CORS errors**: May need backend proxy for some requests
- **User data missing**: Check Discord scope permissions

## Security Best Practices

1. Never expose `DISCORD_CLIENT_SECRET` in client code
2. Always use HTTPS in production
3. Validate all data from Discord
4. Store tokens securely (httpOnly cookies recommended)
5. Refresh tokens before expiry

## Alternative: Use Auth.js (Next.js Auth)

For production, consider using `next-auth`:

```bash
npm install next-auth
```

This handles Discord OAuth automatically with better security.

See: https://next-auth.js.org/providers/discord
