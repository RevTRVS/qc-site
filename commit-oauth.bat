@echo off
cd /d C:\Users\alexa\qc-site

REM Add all changes
git add -A

REM Create commit
git commit -m "feat: Complete rebranding to NexaFinds with OAuth integration

✨ Rebranding Changes:
- Changed all 'RepMania' references to 'NexaFinds' across site
- Updated Navbar logo to 'NexaFinds'
- Updated Footer branding to 'NexaFinds'
- Updated package.json project name to 'nexafinds'

🔐 OAuth Integration:
- Added Google OAuth Sign-In support
- Added Discord OAuth Sign-In support
- Implemented OAuth buttons in login and signup pages
- Created .env.local with OAuth configuration
- Updated AuthContext to support Google and Discord login
- Integrated Google Sign-In SDK for seamless authentication
- Added Discord OAuth redirect handling

📝 Login Page Enhancements:
- Added Google Sign-In button using official Google SDK
- Added Discord OAuth button
- Maintained email/password authentication as fallback
- Improved UI with OAuth options prominently displayed
- Better error handling for OAuth flows

🛠️ Technical Details:
- package.json: Added next-auth, @react-oauth/google, discord-oauth2
- app/auth/login/page.tsx: Full OAuth implementation
- app/context/AuthContext.tsx: Updated with OAuth methods
- app/components/LoginModal.tsx: OAuth support for tool access
- .env.local: OAuth credentials configuration template

⚠️ Setup Required:
- Users need to add Google OAuth credentials to .env.local
- Users need to add Discord OAuth credentials to .env.local
- Set NEXTAUTH_SECRET for session management
- Set NEXTAUTH_URL to deployment URL

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo.
echo ✅ Commit completed successfully!
echo.
git log --oneline -1
