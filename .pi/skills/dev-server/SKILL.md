---
name: dev-server
description: Start a local development server for the Affairs of Beauty static website. Use when the user wants to preview, test, or develop the site locally in a browser.
---

# Dev Server

Serves the Affairs of Beauty static site locally using Python's built-in HTTP server.

## Project

- **Root**: `/Users/bpj/Projects/affairs-of-beauty`
- **Entry**: `index.html`
- **Default port**: `8080`

## Start the Server

Run this from the project root:

```bash
cd /Users/bpj/Projects/affairs-of-beauty && python3 -m http.server 8080
```

Then open **http://localhost:8080** in the browser.

## Usage Instructions

When the user asks to start the dev server:

1. Check if port 8080 is already in use:
   ```bash
   lsof -ti:8080
   ```
   If occupied, use port 8081 or 3000 instead.

2. Start the server with bash (it will run in the foreground and print output):
   ```bash
   cd /Users/bpj/Projects/affairs-of-beauty && python3 -m http.server 8080
   ```

3. Tell the user:
   - URL: **http://localhost:8080**
   - To stop it: press **Ctrl+C** in that terminal
   - The SPA router uses `history.pushState`, so deep links like `/services` won't work when navigating directly — always start from `/` and use the nav

## Notes

- No build step needed — pure static files
- Tailwind CSS and Lucide icons load from CDN, so an internet connection is required for full styling
- The `router.js` client-side router intercepts clicks and handles navigation; the server just serves files
- Tests can be run separately with `npm test` (Jest, no server needed)
