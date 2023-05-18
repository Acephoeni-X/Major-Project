"use client";
import { QResponse } from "../../Context/QRRes";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
const page = () => {
  const render = useRef(true);
  const router = useRouter();
  const { walletAdd } = useContext(QResponse);
  const [transaction, settransaction] = useState();
  const transDate = (timeStamp) => {
    console.log(new Date(Number(timeStamp)).getDate());
    return new Date(Number(timeStamp)).getDate();
  };

  function timeStampToDay(x) {
    const myDate = new Date(x * 1000);
    return myDate;
  }

  function weiToEth(value) {
    return ethers.utils.formatEther(value);
  }

  useEffect(() => {
    if (render.current) {
      render.current = false;
      async function getTransaction() {
        // const trans = await (
        //   await fetch(`http://localhost:3000/api/getTransHistory`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //       address: window?.ethereum.selectedAddress,
        //     }),
        //   })
        // ).json();
        let trans = await (
          await fetch(
            `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${window.ethereum.selectedAddress}&startblock=0&endblock=99999999&offset=10&sort=asc&apikey=VJGHHZAPIQJCBP757YE4P5DWFQPA88UKSC`
          )
        ).json();
        trans = trans["result"].reverse();
        settransaction(trans);
      }
      getTransaction();
    }
  }, []);

  return (
    <div className=" p-10 sm:p-20">
      <div className=" containe mx-auto px-5 lg:px-10 mb-6">
        <button
          onClick={() => router.back()}
          className=" bg-indigo-500 px-2 py-1 rounded-lg text-center flex justify-center items-center mb-8 text-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </button>
        <h1 className=" text-3xl">Transaction History</h1>
      </div>
      <div className=" containe mx-auto px-5 lg:px-10">
        <div className=" rounded-md overflow-x-scroll">
          <table className=" w-full text-left">
            <tbody className=" [&>*:nth-child(odd)]:bg-indigo-300 [&>*:nth-child(odd)]:text-indigo-900">
              <tr className=" ">
                <th className=" px-4 py-4 bg-indigo-500 text-white font-bold">
                  From
                </th>
                <th className=" px-4 py-4 bg-indigo-500 text-white font-bold">
                  To
                </th>
                {/* <th className=" px-4 py-4 bg-indigo-500 text-white font-bold">
                  Ethereum
                </th> */}
                <th className=" px-4 py-4 bg-indigo-500 text-white font-bold">
                  Amount
                </th>
                <th className=" px-4 py-4 bg-indigo-500 text-white font-bold">
                  Timestemp
                </th>
              </tr>
              {transaction?.map((el, index) => {
                return (
                  <tr
                    key={index}
                    className="   hover:shadow hover:shadow-gray-400 w-full"
                  >
                    <td className=" px-4 py-4 ">
                      {Array.from(el.from).splice(0, 6).join("") + "..."}
                    </td>
                    <td className=" px-4 py-4">
                      {Array.from(el.to).splice(0, 6).join("") + "..."}
                    </td>
                    {/* <td className=" px-4 pt-4">0.526</td> */}
                    <td className=" px-4 py-4">
                      {weiToEth(el.value) + "  eth"}
                    </td>
                    <td className=" px-4 py-4">
                      {timeStampToDay(el.timeStamp).toGMTString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
