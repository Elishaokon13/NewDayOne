// WalletConnect.jsx
import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletConnect() {
  const { isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);

  // Detect if running in Farcaster Frames context
  const isFarcasterFrames = typeof window !== 'undefined' && window.location.href.includes('frames');

  // Filter connectors based on context
  const availableConnectors = isFarcasterFrames
    ? connectors.filter((c) => c.id === 'farcasterMiniApp')
    : connectors.filter((c) => c.id === 'coinbaseWallet' || c.id === 'metaMask');

  const walletNames = {
    coinbaseWallet: 'Coinbase Wallet',
    metaMask: 'MetaMask',
    farcasterMiniApp: 'Farcaster Mini App',
  };

  if (isConnected) {
    return (
      <button
        type="button"
        onClick={() => disconnect()}
        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-all duration-200"
      >
        Disconnect
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white text-[#0052FF] font-medium rounded-lg hover:bg-white/90 transition-all duration-200"
      >
        Connect Wallet
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {isFarcasterFrames ? 'Connect with Farcaster' : 'Choose a Wallet'}
            </h3>
            {availableConnectors.map((connector) => (
              <button
                key={connector.id}
                type="button"
                onClick={() => {
                  connect({ connector });
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 mb-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-200"
              >
                {walletNames[connector.id] || connector.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            {error && (
              <p className="mt-2 text-red-500 text-sm">{error.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}