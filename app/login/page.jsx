"use client";
import getAccountAdd from "@/utils/getAccountAdd";
import getBalance from "@/utils/getBalance";
import React, { useEffect, useState } from "react";
import GotoDashboard from "@/components/GotoDashboard";

const LoginScreen = () => {
  const [walletAddress, setwalletAddress] = useState();
  const [balance, setbalance] = useState();

  const handleConnectWallet = async () => {
    if (window.ethereum != undefined) {
      let address = await getAccountAdd();
      setwalletAddress(address);
      setbalance(await getBalance(address));
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      if (window.ethereum != undefined) {
        if (window.ethereum.selectedAddress) {
          setwalletAddress(window.ethereum.selectedAddress);
          setbalance(await getBalance(window.ethereum.selectedAddress));
        }
      }
    };
    checkLogin();
  }, []);
  return (
    <div>
      {walletAddress && balance ? (
        <GotoDashboard address={walletAddress} balance={balance} />
      ) : (
        <button
          onClick={() => {
            handleConnectWallet();
          }}
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default LoginScreen;
