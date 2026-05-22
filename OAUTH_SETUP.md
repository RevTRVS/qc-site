# OAuth Setup Guide - NexaFinds

## 🔐 Google OAuth Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., "NexaFinds")
3. Enable the Google+ API

### 2. Create OAuth 2.0 Credentials
1. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
2. Choose **Web Application**
3. Add Authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (development)
   - `https://yourdomain.com/auth/google/callback` (production)
4. Copy your **Client ID** and **Client Secret**

### 3. Add to .env.local
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

---

## 🎮 Discord OAuth Setup

### 1. Create Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**
3. Name it (e.g., "NexaFinds")
4. Go to **OAuth2** → **General**

### 2. Configure OAuth2
1. Under **REDIRECT URLS**, add:
   - `http://localhost:3000/auth/login` (development)
   - `https://yourdomain.com/auth/login` (production)
2. Copy your **Client ID** and **Client Secret**

### 3. Add to .env.local
```env
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
```

---

## 📋 NextAuth Configuration

### 1. Generate Secret
Run this command to generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 2. Add to .env.local
```env
NEXTAUTH_SECRET=generated_secret_here
NEXTAUTH_URL=http://localhost:3000
```

---

## ✅ Complete .env.local Template

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Discord OAuth
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

# NextAuth
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 🚀 Testing OAuth Flows

### Google Sign-In
1. Navigate to `/auth/login`
2. Click **"Continue with Google"** button
3. Select your Google account
4. You should be redirected to home page with user data in localStorage

### Discord Sign-In
1. Navigate to `/auth/login`
2. Click **"Continue with Discord"** button
3. Authorize the application
4. You should be redirected to home page with user data in localStorage

---

## 🔒 Security Notes

- **Never commit .env.local** to git (it's in .gitignore)
- **Secrets in localStorage** are for demo purposes only
- For production, implement a proper backend session management with NextAuth
- Always use HTTPS in production
- Validate tokens on the backend before granting access to tools

---

## 📱 Accessing Protected Tools

1. Users can now access tools at `/tools`
2. Click on any tool card
3. If not logged in, a LoginModal appears
4. Login with email/password, Google, or Discord
5. After authentication, tool access is granted

---

## 🐛 Troubleshooting

### Google Button Not Appearing
- Check that `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set correctly
- Ensure Google SDK script loaded: `https://accounts.google.com/gsi/client`
- Check browser console for CORS errors

### Discord Redirect Not Working
- Verify redirect URI matches exactly in Discord Developer Portal
- Check that `NEXT_PUBLIC_DISCORD_CLIENT_ID` is correct
- Ensure environment variables are loaded (restart `npm run dev`)

### User Not Staying Logged In
- Check browser localStorage for 'user' key
- Verify cookies are not being blocked
- Clear localStorage and try again

---

## 📝 Next Steps

1. Get Google and Discord OAuth credentials from respective platforms
2. Add credentials to `.env.local`
3. Generate `NEXTAUTH_SECRET` and add to `.env.local`
4. Restart development server: `npm run dev`
5. Test OAuth flows at `/auth/login`
6. Deploy with production credentials when ready
