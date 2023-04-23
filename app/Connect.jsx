"use client";
import getAccountAdd from "@/utils/getAccountAdd";
import getBalance from "@/utils/getBalance";
import React, { useContext, useEffect, useState } from "react";
<<<<<<< HEAD
=======
import GotoDashboard from "@/components/GotoDashboard";
>>>>>>> tushar-ui-update
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
<<<<<<< HEAD
=======

>>>>>>> tushar-ui-update
      setbalance(await getBalance(address));
    }
  };

  useEffect(() => {
    if (walletAddress && balance) {
<<<<<<< HEAD
      setWalletAdd(`${walletAddress}`);
=======
      console.log(typeof walletAddress);
      setWalletAdd(`${walletAddress}`);
      // console.log(walletAdd);
>>>>>>> tushar-ui-update
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
<<<<<<< HEAD
        <>
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Redirecting...
          </button>
        </>
      ) : (
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
=======
        <></>
      ) : (
        <button
>>>>>>> tushar-ui-update
          onClick={() => {
            handleConnectWallet();
          }}
        >
<<<<<<< HEAD
          {"Connect Metamask"}
=======
          Connect MetaMask
>>>>>>> tushar-ui-update
        </button>
      )}
    </div>
  );
};

export default LoginScreen;
