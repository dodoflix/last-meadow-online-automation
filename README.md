# 🌿 Last Meadow Online — Automation Script

> **⚠️ FOR EDUCATIONAL PURPOSES ONLY** — Use at your own risk. This script is not affiliated with Discord or Last Meadow Online.

A browser automation tool for [Last Meadow Online](https://discord.com/), the Discord-based idle RPG activity. Available as a **browser extension** (Chrome + Firefox) or a **console script**. It automates gathering, crafting, and combat cycles with a sleek floating UI panel.

## 📦 Installation

### Option 1: Browser Extension (Recommended)

Download the latest release from the [Releases page](https://github.com/dodoflix/last-meadow-online-automation/releases):

**Chrome / Edge / Brave:**
1. Download `chrome-extension.zip` from the latest release
2. Unzip the file to a folder
3. Go to `chrome://extensions` → enable **Developer mode**
4. Click **Load unpacked** → select the unzipped folder
5. Navigate to [discord.com](https://discord.com) — the panel appears automatically

**Firefox:**
1. Download `firefox-extension.zip` from the latest release
2. Go to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on** → select the zip file
4. Navigate to [discord.com](https://discord.com) — the panel appears automatically

### Option 2: Console Script

1. **Open Discord** in your browser at [discord.com](https://discord.com)
2. **Open DevTools** — Press `F12` or `Ctrl+Shift+I` / `Cmd+Option+I`
3. **Go to the Console tab**
4. **Copy the script** from [`src/content.js`](src/content.js) (or download `console-script.min.js` from [Releases](https://github.com/dodoflix/last-meadow-online-automation/releases))
5. **Paste it into the console** and press `Enter`

> 💡 **Tip:** To remove the panel, paste the script again or click the ✕ button.

## 🔐 Credential Capture

The script needs Discord's auth headers to make API requests. It captures them automatically:

1. When the script starts, the **🔍 Sniff** button activates and shows `⏳ Listening...`
2. **Do anything on Discord** that triggers an API call (switch channels, open a DM, etc.)
3. The button turns green `✅ Ready` — credentials are captured!
4. If your session expires (401 error), the script automatically pauses everything, re-enters sniff mode, and resumes once new credentials are captured

## 🎮 Features

### Tabs

| Tab | What it does | Success Cooldown |
|-----|-------------|-----------------|
| 🌾 **Adventure** | Calls `gathering/start` → `gathering/complete` | Instant (as fast as possible) |
| ⚒️ **Craft** | Calls `crafting/start` → `crafting/complete` | 2 minutes |
| ⚔️ **Battle** | Calls `combat/start` → `combat/complete` | 3 minutes |
| 📊 **Stats** | Shows your profile + global server counters | Auto-refreshes every 60s |

### Controls (per tab)

- **▶ Once** — Run a single start→complete cycle
- **⏩ Loop** — Continuously loop with auto-retry
- **⏹ Stop** — Stop the loop
- **🗑** — Clear the log
- **↺** — Reset settings and stats to defaults

### Settings

- **Retry Delay** — How long to wait after a failed request (non-2xx). Use ± buttons (hold to accelerate)
- **Max Runs** — Stop after N runs (0 = unlimited)

### Smart Behaviors

- **Material Check**: Craft & Battle learn what materials they need from the first successful request. Before each attempt, they check global counters — if materials are unavailable, they wait and re-check every 30s
- **Gather Priority**: When Craft or Battle needs to send a request, Adventure automatically pauses for 1s to avoid conflicts, then resumes
- **401 Auto Re-auth**: If any request gets a 401, all loops pause, the script re-enters sniff mode, and resumes automatically after new credentials are captured
- **Log Auto-Pruning**: Logs are capped at 50 lines per tab to prevent browser slowdown

### Resource Bar

The bar below the header shows your live resource totals (updates with every API response):

```
Lv.100 │ 🪵 2008 ⚙️ 1936 🧶 1956 │ 🛡️ 17 💥 7
```

### 📊 Stats Tab

- **Your Profile**: Level, XP, classes
- **Your Activities**: Total adventure/craft/battle completions, resources produced & consumed
- **Global Resources**: Server-wide totals with recent deltas (e.g., `🪵 436.1M +116.6K`)
- **Global Professions**: Activity counts per profession across all players

## 🖱️ UI Features

- **Drag** the header to move the panel
- **Resize** from the bottom-right corner (min 380×460, max 600×800)
- **Minimize** with the `─` button or press `Esc` (header-only mode, activity dots still visible)
- **Close** with `✕` (cleanly restores all intercepted functions)

### New in Latest Version

- 🎯 **Progress bars** — Animated countdown bars for retry/cooldown timers
- ✨ **Loot popups** — Float-up RPG-style text on loot drops
- 📊 **XP bar** — Level progress bar in the resource bar
- 💰 **Session tracker** — Running total of all resources gained this session
- 🔔 **Sound pings** — Toggle audio feedback for events (🔇 button)
- 📋 **Export logs** — Copy tab logs to clipboard
- ⌨️ **Keyboard shortcut** — Press `Esc` to minimize/expand
- 🔢 **Tab badges** — Red notification count on inactive tabs

## 🛠️ Technical Details

- **Shadow DOM** for complete style/event isolation from Discord's UI
- **XHR prototype interception** for reliable header sniffing (Discord caches fetch at load)
- **Fetch interception** as backup capture method
- **Button-based controls** (Discord's capture-phase keyboard listeners block text inputs)
- **Rate-limit aware** scheduling with priority-based request ordering
- **Manifest V3** browser extension compatible with Chrome and Firefox

## 🏗️ Building from Source

```bash
git clone https://github.com/dodoflix/last-meadow-online-automation.git
cd last-meadow-online-automation
npm install
npm run build
```

Build artifacts are output to `dist/`:
- `console-script.min.js` — Minified console script
- `chrome-extension.zip` — Chrome/Edge/Brave extension
- `firefox-extension.zip` — Firefox extension

### CI/CD

Releases are automated via [release-please](https://github.com/googleapis/release-please). Push conventional commits (`feat:`, `fix:`, `perf:`, etc.) to `main` and a release PR is created automatically. Merging the PR triggers a build and publishes a new GitHub Release with all artifacts.

### Auto-Update

The browser extension uses a lightweight loader that fetches the latest `console-script.min.js` from GitHub Releases at runtime. This means:
- **No extension updates needed** — you always get the latest script automatically
- Scripts are cached locally for 1 hour for instant page loads
- The panel footer shows your current version and notifies when updates are available

## ⚠️ Disclaimer

This script is provided **for educational purposes only** to demonstrate browser automation techniques including Shadow DOM injection, XHR/Fetch interception, and rate-limit aware scheduling. The author is not responsible for any consequences of using this script. Use at your own risk.

## 📝 License

MIT — [Dogukan Metan](https://github.com/dodoflix)
