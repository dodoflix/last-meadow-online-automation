# 🌿 Last Meadow Online — Automation

Automates adventure, crafting, and battle cycles for [Last Meadow Online](https://discord.com/) on Discord. Available as a **browser extension** or **console script**.

## Installation

### Browser Extension (Recommended)

Download from the [Releases page](https://github.com/dodoflix/last-meadow-online-automation/releases):

**Chrome / Edge / Brave:**
1. Download `chrome-extension.zip` and unzip it
2. Go to `chrome://extensions` → enable **Developer mode**
3. Click **Load unpacked** → select the folder

**Firefox:**
1. Download `firefox-extension.zip`
2. Go to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on** → select the zip

The extension auto-updates — it fetches the latest script from GitHub Releases on each page load (cached for 1 hour).

### Console Script

1. Open [discord.com](https://discord.com) and press `F12` to open DevTools
2. Go to the **Console** tab
3. Paste the contents of [`src/content.js`](src/content.js) or `console-script.min.js` from [Releases](https://github.com/dodoflix/last-meadow-online-automation/releases)

Paste again to remove, or click ✕.

## How It Works

Once injected, a floating panel appears with 4 tabs:

| Tab | Activity | Cooldown |
|-----|----------|----------|
| 🌾 Adventure | Gathering | Instant |
| ⚒️ Craft | Crafting | 2 min |
| ⚔️ Battle | Combat | 3 min |
| 📊 Stats | Profile & server counters | 60s auto-refresh |

Credentials are captured automatically — just switch a channel or open a DM after the panel loads.

Each tab has **Loop**, **Once**, **Stop** controls with configurable retry delay and max runs. Craft & Battle auto-check materials before attempting and pause Adventure during their requests.

## Building

```bash
git clone https://github.com/dodoflix/last-meadow-online-automation.git
cd last-meadow-online-automation
npm install
npm run build
```

Outputs to `dist/`: `console-script.min.js`, `chrome-extension.zip`, `firefox-extension.zip`

Releases are automated with [release-please](https://github.com/googleapis/release-please) — conventional commits on `main` trigger version bumps and artifact builds.

## License

MIT — [Dogukan Metan](https://github.com/dodoflix)
