@echo off
title GLASS TABLES - dev server
cd /d "C:\claude code\glass-tables"
echo.
echo   GLASS TABLES starting...
echo   Your browser will open at http://localhost:3005 in a few seconds.
echo   KEEP THIS BLACK WINDOW OPEN while you use the site.
echo   Close this window (or press Ctrl+C) to stop the site.
echo.
start "" cmd /c "timeout /t 6 >nul & start http://localhost:3005"
npm run dev
