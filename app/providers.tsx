// providers.tsx
"use client";

import React, { type ReactNode, useState, useEffect } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { WagmiConfig } from "wagmi";
import { config } from "../lib/wagmi";

export function Providers(props: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const projectName = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "BUILD ON BASE CHALLENGE - BORDERLESS WORKSHOPS";
  const iconUrl = process.env.NEXT_PUBLIC_ICON_URL || "/icon.png";

  // Prevent rendering during hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering during SSR/hydration
  }

  return (
    <WagmiConfig config={config}>
      <MiniKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ""}
        chain={base}
        config={{
          appearance: {
            mode: "auto",
            theme: "mini-app-theme",
            name: projectName,
            logo: iconUrl,
          },
        }}
      >
        {props.children}
      </MiniKitProvider>
    </WagmiConfig>
  );
}