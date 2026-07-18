@echo off
REM ============================================
REM SITEMAP GENERATOR - WDA (Windows Batch)
REM Usage: scripts\generate-sitemap.bat [domain]
REM Default domain: https://wda.com
REM Example: scripts\generate-sitemap.bat https://example.com
REM ============================================

setlocal enabledelayedexpansion

REM Set domain (default or from argument)
set "DOMAIN=https://wda.com"
if not "%1"=="" set "DOMAIN=%1"

echo =============================================
echo  WDA - Sitemap Generator
echo =============================================
echo  Domain: %DOMAIN%
echo  Date: %DATE% %TIME%
echo =============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python is not installed. Please install Python 3.x first.
    echo [INFO] Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Get the directory where this script is located
set "SCRIPT_DIR=%~dp0"
set "PROJECT_DIR=%SCRIPT_DIR%.."

REM Change to project directory
cd /d "%PROJECT_DIR%"

echo [1/4] Generating sitemap.xml...
python scripts/generate-sitemap.py --domain %DOMAIN% --output sitemap.xml
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to generate sitemap.xml
    pause
    exit /b 1
)

echo.
echo [2/4] Validating sitemap.xml...
python -c "
import xml.etree.ElementTree as ET
import sys
try:
    tree = ET.parse('sitemap.xml')
    root = tree.getroot()
    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = root.findall('.//sm:url', ns)
    print(f'  [OK] Parsed successfully - {len(urls)} URLs found')
    for url in urls:
        loc = url.find('sm:loc', ns)
        if loc is not None and loc.text:
            print(f'       {loc.text}')
    print(f'\n  [OK] Sitemap validation PASSED')
except Exception as e:
    print(f'  [ERROR] Sitemap validation FAILED: {e}')
    sys.exit(1)
"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Sitemap validation failed
    pause
    exit /b 1
)

echo.
echo [3/4] Checking robots.txt...
if exist robots.txt (
    echo  [OK] robots.txt exists
    findstr /I "Sitemap:" robots.txt >nul
    if !ERRORLEVEL! EQU 0 (
        echo  [OK] Sitemap reference found in robots.txt
    ) else (
        echo  [WARN] No Sitemap reference found in robots.txt
    )
) else (
    echo  [WARN] robots.txt not found
)

echo.
echo [4/4] Committing to Git (optional)...
if exist .git (
    echo  [INFO] Git repository detected
    git add sitemap.xml robots.txt
    git diff --cached --quiet
    if !ERRORLEVEL! NEQ 0 (
        git commit -m "chore: auto-generate sitemap and robots.txt [%DATE%]"
        git push origin main 2>nul
        if !ERRORLEVEL! EQU 0 (
            echo  [OK] Changes pushed to remote
        ) else (
            echo  [WARN] Could not push changes (no remote or no changes)
        )
    ) else (
        echo  [OK] No changes to commit
    )
) else (
    echo  [INFO] No Git repository detected, skipping commit
)

echo.
echo =============================================
echo  ✅ SITEMAP GENERATION COMPLETE
echo =============================================
echo  Files generated:
echo    - sitemap.xml
echo    - robots.txt
echo.
echo  Next steps:
echo    1. Deploy files to your web server
echo    2. Submit sitemap to Google Search Console
echo    3. Verify robots.txt is accessible
echo =============================================

endlocal