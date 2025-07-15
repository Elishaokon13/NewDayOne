"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import confetti from "canvas-confetti";
import { WalletConnect } from "./components/WalletConnect";
import Image from "next/image";
import { sdk } from "@farcaster/miniapp-sdk";
import Modal from "./components/Modal";

// Contract address
const CONTRACT_ADDRESS =
  "0xc90Cf316E1A74Ea9da13E87d95Eda3d9281731a1".toLowerCase() as `0x${string}`;

// Contract ABI (simplified to just what we need)
const contractABI = [
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "hasMinted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// Basescan API endpoint
const BASESCAN_API = "https://api.basescan.org/api";
const BASESCAN_API_KEY = process.env.NEXT_PUBLIC_BASESCAN_API_KEY || "";

// Types for Basescan API response
interface BasescanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  isError: string;
  txreceipt_status: string;
  input: string;
}

interface BasescanResponse {
  status: string;
  message: string;
  result: BasescanTransaction[];
}

export default function Home() {
  const { address } = useAccount();
  const [modal, setModal] = useState(false);
  const [hasMinted, setHasMinted] = useState<boolean>(false);
  const [justMinted, setJustMinted] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalMints, setTotalMints] = useState<number>(0);
  const [recentMints, setRecentMints] = useState<
    Array<{ address: string; timestamp: number }>
  >([]);

  // Fetch contract transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${BASESCAN_API}?module=account&action=txlist&address=${CONTRACT_ADDRESS}&startblock=0&endblock=99999999&sort=desc&apikey=${BASESCAN_API_KEY}`
        );
        const data = (await response.json()) as BasescanResponse;

        if (data.status === "1" && data.result) {
          const mintTxs = data.result.filter(
            (tx: BasescanTransaction) =>
              tx.isError === "0" &&
              tx.input.startsWith("0x1249c58b") &&
              tx.txreceipt_status === "1"
          );

          setTotalMints(mintTxs.length);
          const recent = mintTxs.slice(0, 5).map((tx: BasescanTransaction) => ({
            address: tx.from,
            timestamp: parseInt(tx.timeStamp) * 1000,
          }));
          setRecentMints(recent);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 30000);
    return () => clearInterval(interval);
  }, []);

  // Initialize frame and handle loading
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        await sdk.actions.ready();
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Check if user has already minted
  const { data: hasMintedData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: "hasMinted",
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (hasMintedData !== undefined) {
      setHasMinted(!!hasMintedData);
    }
  }, [hasMintedData]);

  // Handle minting
  const { writeContract } = useWriteContract();

  const handleMint = async () => {
    if (!address) return;

    try {
      setIsMinting(true);
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: "mint",
      });
      setJustMinted(true);
      confetti();
    } catch (error) {
      console.error("Error minting:", error);
    } finally {
      setIsMinting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute -bottom-10 md:-bottom-80 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
        <img src="/globe2.svg" alt="" />
      </div>
      {/* <header className="fixed top-0 left-0 right-0 bg-white backdrop-blur-sm border-b border-black/10 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
            />
            <span className="font-medium text-black text-sm sm:text-base truncate">
              Base Challenge
            </span>
          </div>
          <div className="flex-shrink-0">
            <WalletConnect />
          </div>
        </div>
      </header> */}

      <div className="mx-auto w-full h-screen flex flex-col items-center justify-center max-w-3xl">
        <div className="text-center flex flex-col gap-3 w-fit items-left text-black">
          <h1 className="text-[56px] text-left max-w-[250px] leading-[56px] !font-doto font-bold">
            A NEW DAY ONE
          </h1>
          <p className="font-light text-3xl text-left">Base's Next Chapter</p>
          <div className="flex w-fit gap-2 items-center">
            <div className="w-[180px] bg-[#0000ff] h-2"></div>
            <div className="w-[40%] bg-[#f2accc] h-2"></div>
            <div className="w-[20%] bg-[#ffda59] h-2"></div>
          </div>
          {/* <p className="text-md text-left max-w-[340px] font-light">
            Mint your POAP to commemorate participating in the Build on Base
            Challenge by Borderless Workshops!
          </p> */}
          <button
            className="px-7 py-2.5 bg-[#0000FF] font-light text-white w-fit rounded-xl"
            onClick={() => setModal(true)}
          >
            Save a day!
          </button>
        </div>
      </div>
      {modal && <Modal setModal={setModal} />}
    </main>
  );
}
