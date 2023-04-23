"use client";
import getAccountAdd from "@/utils/getAccountAdd";
import getBalance from "@/utils/getBalance";
import React, { useContext, useEffect, useState } from "react";
import GotoDashboard from "@/components/GotoDashboard";
import { useRouter } from "next/navigation";
import { QResponse } from "./Context/QRRes";

const LoginScreen = () => {
  const router = useRouter();
  const [walletAddress, setwalletAddress] = useState();
  const [balance, setbalance] = useState();

  const { setWalletAdd, walletAdd } = useContext(QResponse);

  const handleConnectWallet = async () => {
    if (window.ethereum != undefined) {
      let address = await getAccountAdd();
      setwalletAddress(address);

      setbalance(await getBalance(address));
    }
  };

  useEffect(() => {
    if (walletAddress && balance) {
      console.log(typeof walletAddress);
      setWalletAdd(`${walletAddress}`);
      // console.log(walletAdd);
      router.push(`/dashboard/`);
    }
  }, [walletAddress, balance]);

  useEffect(() => {
    const checkLogin = async () => {
      if (window.ethereum != undefined) {
        if (window.ethereum.selectedAddress) {
          setwalletAddress(window.ethereum.selectedAddress);

          setWalletAdd(window.ethereum.selectedAddress);
          setbalance(await getBalance(window.ethereum.selectedAddress));
        }
      }
    };
    checkLogin();
  }, []);
  return (
    <div>
      {walletAddress && balance ? (
        <></>
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
