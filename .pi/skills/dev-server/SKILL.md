---
name: dev-server
description: Start a local development server for the Affairs of Beauty static website. Use when the user wants to preview, test, or develop the site locally in a browser.
---

# Dev Server

Serves the Affairs of Beauty static site locally using Python's built-in HTTP server.

## Project

- **Root**: `/Users/bpj/Projects/affairs-of-beauty`
- **Entry**: `index.html`
- **Default port**: `6699`

## Start the Server

Run this from the project root:

```bash
cd /Users/bpj/Projects/affairs-of-beauty && python3 -m http.server 6699
```

Then open **http://localhost:6699** in the browser.

## Usage Instructions

When the user asks to start the dev server:

1. Check if port 6699 is already in use:
   ```bash
   lsof -ti:6699
   ```
   If occupied, use port 8081 or 3000 instead.

2. Open a new external Terminal window so the server runs in the background and does NOT block the pi agent terminal. Use `open` with AppleScript to launch a detached terminal:
   ```bash
   osascript -e 'tell application "Terminal" to do script "cd /Users/bpj/Projects/affairs-of-beauty && python3 -m http.server 6699"'
   ```
   This opens a new Terminal window, starts the server inside it, and returns immediately — keeping the pi agent terminal free.

3. Tell the user:
   - URL: **http://localhost:6699**
   - To stop it: close the Terminal window that opened, or press **Ctrl+C** inside it
   - The SPA router uses `history.pushState`, so deep links like `/services` won't work when navigating directly — always start from `/` and use the nav
   - Alternatively they can use the VS Code task **"Start Dev Server"** (`Terminal → Run Task…`) which opens the server in a dedicated VS Code terminal panel

## Notes

- No build step needed — pure static files
- Tailwind CSS and Lucide icons load from CDN, so an internet connection is required for full styling
- The `router.js` client-side router intercepts clicks and handles navigation; the server just serves files
- Tests can be run separately with `npm test` (Jest, no server needed)
