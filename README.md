# A New Day One – POAP Miniapp

<p align="center">
  <img src="public/Logo.svg" alt="Project Logo" width="120" />
</p>

A sleek, interactive POAP (Proof of Attendance Protocol) miniapp for the "A New Day One" event, built on Base using Next.js, OnchainKit, and Farcaster Mini App SDK. Users can connect their wallet, mint a commemorative NFT, and view recent mints—all in a modern, mobile-friendly UI.

---

## Features

- **Wallet Connection:** Supports Coinbase Wallet, MetaMask, and Farcaster Mini App
- **POAP Minting:** Mint a commemorative NFT on the Base chain
- **Recent Mints:** View the latest mints in real time (via Basescan API)
- **Notifications:** Farcaster frame notifications and webhook support
- **Confetti & Modals:** Fun, interactive UI feedback
- **Responsive Design:** Works on desktop and mobile
- **SVG/PNG Export:** (Planned) Export your POAP as an image

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Blockchain:** Base chain, OnchainKit, Wagmi, Farcaster Mini App SDK
- **Wallets:** Coinbase Wallet, MetaMask, Farcaster Mini App
- **Backend:** MongoDB (Mongoose), Redis (Upstash), API routes
- **Other:** Cloudinary, html-to-image, TypeScript

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Yarn or npm

### Installation

```bash
git clone https://github.com/Elishaokon13/NewDayOne
cd NewDayOne
npm install # or yarn install
```

### Environment Variables
Create a `.env` file in the root directory and set the following variables:

```
# MongoDB
NEXT_MONGODB_URI=your_mongodb_connection_string

# Redis (for notifications/webhooks)
REDIS_URL=your_upstash_redis_url
REDIS_TOKEN=your_upstash_redis_token

# OnchainKit / App Metadata
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME="A New Day One POAP Miniapp"
NEXT_PUBLIC_ICON_URL="/icon.png" # or your logo path
NEXT_PUBLIC_URL=https://your-deployed-url.com

# Basescan API
NEXT_PUBLIC_BASESCAN_API_KEY=your_basescan_api_key

# Farcaster / Frame Metadata
FARCASTER_HEADER=...
FARCASTER_PAYLOAD=...
FARCASTER_SIGNATURE=...
NEXT_PUBLIC_APP_SUBTITLE=...
NEXT_PUBLIC_APP_DESCRIPTION=...
NEXT_PUBLIC_APP_ICON=...
NEXT_PUBLIC_APP_SPLASH_IMAGE=...
NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR=...
NEXT_PUBLIC_APP_PRIMARY_CATEGORY=...
NEXT_PUBLIC_APP_HERO_IMAGE=...
NEXT_PUBLIC_APP_TAGLINE=...
NEXT_PUBLIC_APP_OG_TITLE=...
NEXT_PUBLIC_APP_OG_DESCRIPTION=...
NEXT_PUBLIC_APP_OG_IMAGE=...
NEXT_PUBLIC_IMAGE_URL=...
NEXT_PUBLIC_VERSION=1
```

> **Note:** Not all variables are required for local development, but are needed for full Farcaster/notification support and production deployment.

### Running Locally

```bash
npm run dev # or yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

#

## Project Structure
- `app/` – Next.js app directory (pages, components, API routes)
- `lib/` – Utility libraries (models, db, notifications)
- `public/` – Static assets (logo, images)

## Customization
- Update event branding, SVG templates, and UI in `app/components/`
- Adjust contract address and ABI in `app/page.tsx` as needed

## License