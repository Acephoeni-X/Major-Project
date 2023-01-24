import sendTransaction from "@/utils/sendTransaction";
import React, { useState } from "react";
const { Network, Alchemy } = require("alchemy-sdk");

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const SendEth = () => {
  const alchemy = new Alchemy(settings);
  const [toAddress, settoAddress] = useState();
  const [amount, setamount] = useState();

  const handleSend = async (e) => {
    e.preventDefault();
    let txhash = await sendTransaction(toAddress, amount);
    let data = await alchemy.core.getTransaction(txhash);
    // if()//start from here
  };
  return (
    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div className="lg:w-2/6 md:w-1/2 bg-black-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 className="text-white-900 text-lg font-medium title-font mb-5 underline">
          Send Ether
        </h2>
        <div className="relative mb-4">
          <label
            htmlFor="full-name"
            className="leading-7 text-sm text-white-600"
          >
            Address
          </label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            onChange={(e) => {
              settoAddress(e.target.value);
            }}
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-white-600">
            Amount (in Eth)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            onChange={(e) => {
              setamount(e.target.value);
            }}
          />
        </div>
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendEth;
