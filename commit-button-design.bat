@echo off
cd /d C:\Users\alexa\qc-site

REM Add all changes
git add -A

REM Create commit
git commit -m "style: Enhance OAuth button design with professional styling

✨ Visual Improvements:
- Redesigned Google Sign-In button with official SDK styling
- Enhanced Discord button with vibrant gradient (#5865F2 -> #7289DA)
- Added smooth hover effects and color transitions
- Implemented icon scaling animations on hover
- Added glow shadow effects for depth

🎨 Design Features:
- Rounded corners (16px radius) for modern look
- Professional padding and spacing
- Brand-accurate colors and gradients
- Smooth 300ms transitions for all interactions
- Full-width responsive design

🏗️ Technical Changes:
- Created new GoogleSignInButton component
- Separated concerns for better maintainability
- Added CSS customization for Google button styling
- Enhanced globals.css with button-specific styles
- Improved component structure in LoginModal and LoginPage

📱 User Experience:
- Better visual hierarchy and button prominence
- Smooth interactions with immediate feedback
- Touch-friendly sizing (44px+ minimum height)
- Accessible contrast ratios
- Professional appearance on all devices

📝 Files Modified:
- app/auth/login/page.tsx: New GoogleSignInButton component integration
- app/components/LoginModal.tsx: Enhanced styling and new component usage
- app/components/GoogleSignInButton.tsx: NEW - Dedicated Google Sign-In component
- app/globals.css: Added custom Google button styling

✅ Quality Assurance:
- Tested on mobile and desktop
- Verified hover animations are smooth
- Checked responsive behavior
- Validated accessibility standards
- Confirmed no console errors

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo.
echo ✅ OAuth button design improvements committed!
echo.
git log --oneline -1
