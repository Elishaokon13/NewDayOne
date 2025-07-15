// components/WalletConnect.jsx
import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletConnect() {
  const { isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isFarcasterFrames = typeof window !== 'undefined' && window.location.href.includes('frames');

  const availableConnectors = isFarcasterFrames
    ? connectors.filter((c) => c.id === 'farcasterMiniApp')
    : connectors.filter((c) => c.id === 'coinbaseWallet' || c.id === 'metaMask');

  const walletNames = {
    coinbaseWallet: 'Coinbase Wallet',
    metaMask: 'MetaMask',
    farcasterMiniApp: 'Farcaster Mini App',
  };

  if (!isMounted) {
    return null;
  }

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
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-[#0052FF] font-medium rounded-lg hover:bg-white/90 transition-all duration-200 text-xs sm:text-sm"
      >
        Connect Wallet
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsOpen(false)}
          style={{ backdropFilter: 'blur(5px)' }} // Optional blur effect
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md max-h-[90vh] overflow-y-auto transform translate-y-0"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} // Explicit centering
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 text-center">
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
                className="w-full px-4 py-2 mb-2 text-sm sm:text-base text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-200 flex items-center justify-center"
              >
                {walletNames[connector.id] || connector.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 text-sm sm:text-base text-gray-500 hover:text-gray-700 mt-2"
              aria-label="Close modal"
            >
              Cancel
            </button>
            {error && (
              <p className="mt-2 text-red-500 text-xs sm:text-sm text-center">{error.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}