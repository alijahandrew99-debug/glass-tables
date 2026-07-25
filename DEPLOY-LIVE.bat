@echo off
title GLASS TABLES - publish to the internet
cd /d "C:\claude code\glass-tables"
echo.
echo  ============================================================
echo   GLASS TABLES  -  going live
echo  ============================================================
echo.
echo  A browser window will open. Sign up for Vercel (it is FREE)
echo   - click "Continue with Google" (easiest), or use email.
echo  Then come straight back to THIS black window.
echo.
pause
echo.
echo  Opening Vercel sign-in...
call npx --yes vercel@latest login
echo.
echo  Publishing your site (this takes about 2 minutes)...
call npx --yes vercel@latest --prod --yes
echo.
echo  ============================================================
echo   DONE. Look above for a line like:
echo     Production: https://glass-tables-xxxx.vercel.app
echo   That link is your LIVE site. Open it to check.
echo   (Next step: connect glasstables.net - ask Claude.)
echo  ============================================================
echo.
pause
