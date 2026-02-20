# shumi

Crypto trade intelligence from your terminal. Powered by [Shumi AI](https://shumi.ai).

## Install

```bash
npm install -g shumi
```

## Quick Start

```bash
# Try one query free — no account needed
shumi coin BTC

# Authenticate for unlimited access
shumi login

# Market overview
shumi market

# Sentiment analysis
shumi sentiment --coin ETH

# Trend scanner
shumi trends --aligned

# Delta-neutral funding rate opportunities
shumi delta-neutral --exchange Hyperliquid

# Free-form question
shumi ask "Why is HYPE pumping?"
```

## Commands

| Command | Description |
|---------|-------------|
| `shumi coin <symbol>` | Coin analysis (trend, streak, bands, sentiment) |
| `shumi market` | Market health overview (UP/HODL/DOWN distribution) |
| `shumi sentiment` | Market or coin sentiment analysis |
| `shumi trends` | Fresh, stale, or aligned trend scanner |
| `shumi scan` | Filter coins by trend, category, market cap, exchange |
| `shumi category [name]` | Category trend breakdown |
| `shumi narratives [name]` | Emerging narrative sentiment |
| `shumi delta-neutral` | Funding rate arbitrage opportunities |
| `shumi tweets <handle>` | Recent tweets from a Twitter account |
| `shumi search <query>` | Web search for crypto information |
| `shumi ask <question>` | Free-form question to Shumi AI |
| `shumi login` | Authenticate via browser (Dynamic.xyz wallet) |
| `shumi logout` | Clear stored credentials |
| `shumi whoami` | Show current auth status |
| `shumi health` | Check service connectivity |

## Common Options

| Flag | Description |
|------|-------------|
| `--raw` | Output raw JSON instead of formatted markdown |
| `--interval <1d\|1w>` | Select time interval |
| `--limit <n>` | Limit number of results |

## Authentication

Shumi uses browser-based wallet authentication via [Dynamic.xyz](https://dynamic.xyz).

1. Run `shumi login`
2. Your browser opens to authenticate
3. Connect your wallet
4. Return to the terminal — you're authenticated

Credentials are stored locally in `~/.shumi/config.json` with restrictive file permissions (owner-only read/write). Tokens expire automatically and you'll be prompted to re-authenticate.

## How It Works

The CLI is a thin client. All intelligence (query classification, data fetching, AI response generation) runs server-side. The CLI translates your commands into natural language queries, sends them to the Shumi API over HTTPS, and renders the markdown response in your terminal.

No API keys, model configurations, or proprietary code are included in this package.

## Requirements

- Node.js 18 or later
- A modern terminal with Unicode support

## License

MIT
