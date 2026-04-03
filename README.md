# 🌿 Last Meadow Online — Automation Script

> **⚠️ FOR EDUCATIONAL PURPOSES ONLY** — Use at your own risk. This script is not affiliated with Discord or Last Meadow Online.

A browser DevTools automation script for [Last Meadow Online](https://discord.com/), the Discord-based idle RPG activity. It automates gathering, crafting, and combat cycles with a sleek floating UI panel.

## 🚀 How to Use

1. **Open Discord** in your browser (not the desktop app) at [discord.com](https://discord.com)
2. **Open DevTools** — Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
3. **Go to the Console tab**
4. **Copy the entire script** from [`last-meadow-online-automation.js`](last-meadow-online-automation.js)
5. **Paste it into the console** and press `Enter`
6. A floating panel will appear in the top-right corner

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
- **Resize** from the bottom-right corner (min 320×380, max 600×800)
- **Minimize** with the `─` button (header-only mode, activity dots still visible)
- **Close** with `✕` (cleanly restores all intercepted functions)

## 🛠️ Technical Details

- **Shadow DOM** for complete style/event isolation from Discord's UI
- **XHR prototype interception** for reliable header sniffing (Discord caches fetch at load)
- **Fetch interception** as backup capture method
- **Button-based controls** (Discord's capture-phase keyboard listeners block text inputs)
- **Rate-limit aware** scheduling with priority-based request ordering

## ⚠️ Disclaimer

This script is provided **for educational purposes only** to demonstrate browser automation techniques including Shadow DOM injection, XHR/Fetch interception, and rate-limit aware scheduling. The author is not responsible for any consequences of using this script. Use at your own risk.

## 📝 License

MIT — [@dodoflix](https://github.com/dodoflix)
