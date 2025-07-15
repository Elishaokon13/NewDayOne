// WalletConnect.jsx
import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletConnect() {
  const { isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);

  const walletNames: Record<string, string> = {
    coinbaseWallet: "Coinbase Wallet",
    metaMask: "MetaMask",
    farcasterMiniApp: "Farcaster Mini App",
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
        className="px-4 py-2 bg-[#0000ff] text-]whitefont-medium rounded-lg hover:bg-gray-400 transition-all duration-200"
      >
        Connect Wallet
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              type="button"
              onClick={() => {
                connect({ connector });
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 transition-all duration-200"
            >
              {connector.id in walletNames ? walletNames[connector.id] : connector.name}
            </button>
          ))}
        </div>
      )}
      {error && <p className="mt-2 text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}