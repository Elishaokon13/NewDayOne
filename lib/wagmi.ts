
import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';
import { coinbaseWallet, metaMask } from 'wagmi/connectors';

// Create wagmi config with Base chain and multiple connectors
export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    coinbaseWallet({
      appName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'BUILD ON BASE CHALLENGE - BORDERLESS WORKSHOPS',
      preference: 'smartWalletOnly',
    }),
    metaMask({
      dappMetadata: {
        name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'BUILD ON BASE CHALLENGE - BORDERLESS WORKSHOPS',
      },
    }),
    farcasterMiniApp(),
  ],
  ssr: true, // Enable SSR support for Next.js
});