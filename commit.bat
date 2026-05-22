@echo off
cd /d C:\Users\alexa\qc-site
git add -A
git commit -m "feat: Add OAuth authentication and auth-gated tools

- Implement Google and Discord OAuth login in AuthContext
- Remove Tools section from homepage (dedicated /tools page exists)
- Create LoginModal component with email/password and OAuth options
- Protect tools with authentication check (show login modal on click)
- Display 'Login required' badge on tool cards for non-authenticated users
- Update tools page to handle auth state and tool selection
- Add loginWithGoogle and loginWithDiscord methods to AuthContext
- Navbar already shows user info and logout button when authenticated

Changes:
- app/context/AuthContext.tsx: Added OAuth methods and User provider field
- app/page.tsx: Removed Tools import and component
- app/components/LoginModal.tsx: New component for auth modal
- app/tools/page.tsx: Integrated auth check and LoginModal

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
