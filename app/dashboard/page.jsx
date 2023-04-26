"use client";
import SendEth from "@/app/dashboard/SendEth";
import getBalance from "@/utils/getBalance";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import QrCode from "@/utils/qrCode";
import Image from "next/image";
import { ethers } from "ethers";
import Chart from "./Chart";

const Dashboard = () => {
  const [balance, setbalance] = useState();
  const [converted, setconverted] = useState();
  const [sendEther, setSendEther] = useState(false);
  const [genQR, setgenQR] = useState(false);
  const [miniTransaction, setminiTransaction] = useState();
  const [walletAdd, setWalletAdd] = useState();

  // const { walletAdd, setWalletEth, setWalletAdd, scanner } =
  //   useContext(QResponse);
  const router = useRouter();
  const renderOnce = useRef(true);
  const renderTwo = useRef(true);
  const renderThree = useRef(true);
  function weiToEth(value) {
    return ethers.utils.formatEther(value);
  }

  function timeStampToDay(x) {
    const myDate = new Date(x * 1000);
    return myDate;
  }

  useEffect(() => {
    if (renderTwo.current) {
      renderTwo.current = false;
      setWalletAdd(window.ethereum.selectedAddress);
      async function bal() {
        let balance = await getBalance(window.ethereum.selectedAddress);
        setbalance(balance);
      }

      async function getTransaction() {
        let add = window?.ethereum?.selectedAddress;
        let data = await (
          await fetch(`http://localhost:3000/api/getTransHistory`, {
            method: "POST",
            body: JSON.stringify({
              address: add,
            }),
          })
        ).json();
        setminiTransaction(data);
      }

      bal();
      if (window.ethereum.selectedAddress != null) {
        getTransaction();
      }
    }
  }, []);

  useEffect(() => {
    if (renderThree.current) {
      renderThree.current = false;
      async function convert(balance) {
        let data = await (
          await fetch(`http://localhost:3000/api/eth-price?balance=${0.2}`)
        ).json();
        setconverted(data.price);
      }
      convert();
    }
  }, [balance]);

  // useEffect(() => {
  //   if (window.ethereum.selectedAddress == null) {
  //     router.push("/");
  //   }
  // });

  function shut() {
    setSendEther(false);
    setgenQR(false);
    // scanner.clear();
  }

  return (
    <div className=" flex justify-center h-screen w-screen">
      <div className=" h-full w-full max-w-screen-2xl">
        <div className=" flex flex-col lg:grid lg:grid-cols-12 w-full min-h-screen bg-black">
          {/* NAVBAR  */}
          <div className=" hidden sticky top-0 bg-black lg:static px-4 py-2 col-span-2 lg:border-r border-b lg:border-b-0 border-gray-300 lg:flex lg:flex-col justify-between lg:items-center">
            {/* Wallet Name */}
            <div className=" text-white lg:mt-4 font-bold text-3xl  hidden lg:block">
              <h1 className="">
                Crypto <br />
                Trend
              </h1>
            </div>

            {/* Option Hidden for small i.e < lg */}
            <div>
              <div className=" text-white hidden  lg:grid lg:gap-4">
                <div className=" flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" mr-2 w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Home</span>
                </div>

                {/* <div className=" flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" mr-2 w-5 h-5"
                  >
                    <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
                  </svg>
                  <span>Predictions</span>
                </div> */}

                <div className=" flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" mr-2 w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Transactions</span>
                </div>

                <div className=" flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" mr-2 w-5 h-5"
                  >
                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                  </svg>
                  <span>Profile</span>
                </div>
              </div>
            </div>

            {/* Hidden Profile Card < lg */}
            <div className=" mb-4 hidden lg:block">
              <div className=" flex flex-col items-center bg-black shadow-2xl shadow-purple-600 py-6 px-10 rounded-2xl">
                <div className=" w-full h-16 rounded-full overflow-hidden">
                  <Image
                    className=" h-full object-cover w-full"
                    src="https://i.imgur.com/pKgABuT.jpeg"
                    alt="profile"
                    width={200}
                    height={200}
                  />
                </div>
                <div className=" mt-1 mb-4 w-fit">
                  <h3 className=" font-semibold text-white">
                    {walletAdd?.slice(0, 5) +
                      "..." +
                      walletAdd?.slice(
                        walletAdd?.length - 4,
                        walletAdd?.length
                      )}
                  </h3>
                </div>
                <div className=" bg-black px-3 py-1 rounded-lg">
                  <button className=" text-sm text-white">Profile</button>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard */}
          <div className=" col-span-7 grid lg:grid-rows-5">
            <div className=" lg:row-span-1 flex flex-col justify-between py-8 lg:py-6 px-4 lg:px-8 border-b border-gray-300 ">
              <div className=" text-white text-lg lg:text-2xl font-bold lg:mb-0 mb-8">
                <h2>Dashboard</h2>
              </div>
              <div className=" w-full flex justify-start">
                <button
                  className=" bg-blue-700 hover:shadow hover:shadow-blue-500 hover:bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white lg:text-white px-3 py-1 rounded-md mr-16 flex flex-col lg:flex-row items-center"
                  onClick={() => setSendEther(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" lg:mr-2 w-6 h-6 lg:w-5 lg:h-5"
                  >
                    <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                  <span className=" text-xs font-light lg:text-base mt-1 lg:mt-0">
                    Send Eth.
                  </span>
                </button>
                <button
                  className=" bg-blue-700 hover:shadow hover:shadow-blue-500 hover:bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white lg:text-white px-3 py-1 rounded-md lg:mr-16 flex flex-col lg:flex-row items-center"
                  onClick={() => setgenQR(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" lg:mr-2 w-6 h-6 lg:w-5 lg:h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.75 2A1.75 1.75 0 002 3.75v3.5C2 8.216 2.784 9 3.75 9h3.5A1.75 1.75 0 009 7.25v-3.5A1.75 1.75 0 007.25 2h-3.5zM3.5 3.75a.25.25 0 01.25-.25h3.5a.25.25 0 01.25.25v3.5a.25.25 0 01-.25.25h-3.5a.25.25 0 01-.25-.25v-3.5zM3.75 11A1.75 1.75 0 002 12.75v3.5c0 .966.784 1.75 1.75 1.75h3.5A1.75 1.75 0 009 16.25v-3.5A1.75 1.75 0 007.25 11h-3.5zm-.25 1.75a.25.25 0 01.25-.25h3.5a.25.25 0 01.25.25v3.5a.25.25 0 01-.25.25h-3.5a.25.25 0 01-.25-.25v-3.5zm7.5-9c0-.966.784-1.75 1.75-1.75h3.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0116.25 9h-3.5A1.75 1.75 0 0111 7.25v-3.5zm1.75-.25a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h3.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25h-3.5zm-7.26 1a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V5.5a1 1 0 00-1-1h-.01zm9 0a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V5.5a1 1 0 00-1-1h-.01zm-9 9a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1v-.01a1 1 0 00-1-1h-.01zm9 0a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1v-.01a1 1 0 00-1-1h-.01zm-3.5-1.5a1 1 0 011-1H12a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V12zm6-1a1 1 0 00-1 1v.01a1 1 0 001 1H17a1 1 0 001-1V12a1 1 0 00-1-1h-.01zm-1 6a1 1 0 011-1H17a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V17zm-4-1a1 1 0 00-1 1v.01a1 1 0 001 1H12a1 1 0 001-1V17a1 1 0 00-1-1h-.01z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className=" text-xs font-light lg:text-base mt-1 lg:mt-0">
                    QR
                  </span>
                </button>
              </div>
            </div>

            {/* Prediction and Char Hidden for small */}
            <div className=" hidden lg:row-span-4 lg:flex flex-col justify-between py-6 px-8 flex-wrap m-2">
              <div>
                <div className=" text-white text-2xl font-semibold m-4">
                  <h2>Prediction</h2>
                </div>
                <div className="mt-8">
                  <Chart />
                </div>
              </div>
            </div>
          </div>

          {/* Predictions Chart */}
          <div className=" lg:hidden order-last flex flex-col justify-between py-2 px-4 lg:py-6 lg:px-8">
            <div>
              <div className=" text-white text-2xl font-semibold">
                <h2>Prediction</h2>
              </div>
              {/* <div>CharrrrtJSS</div> */}
            </div>
          </div>

          {/* Summary and transactions */}
          <div className=" lg:border-l border-gray-300 col-span-3 py-8 px-4 lg:py-6 lg:px-8">
            <div className="grid gap-8">
              {/* Summary Card */}
              <div className=" flex flex-col justify-center">
                <div className="text-white text-lg lg:text-2xl font-bold">
                  <h2>Summary</h2>
                </div>
                <div className=" text-white border border-black bg-black shadow-2xl shadow-blue-600 rounded-md p-5 mt-8">
                  <div>
                    <div className="">
                      <span>Your Wallet</span>
                    </div>
                    <div className=" flex justify-between items-center my-4">
                      <div className=" text-2xl font-bold">
                        <h1>{Number(balance).toFixed(2)} Eth.</h1>
                      </div>
                      <div className=" flex text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span> 11.57%</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>₹ {Number(converted).toFixed(2)}/-</span>
                        <br />
                        <span className=" font-semibold">Current Value</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Some Transactions */}
              <div className=" ">
                <div className="text-white flex justify-between items-center border-b border-gray-300 py-2">
                  <h2 className=" text-lg lg:text-2xl font-bold">
                    Transactions
                  </h2>
                  <button
                    className=" text-sm flex flex-row items-center "
                    onClick={() => router.push(`dashboard/history`)}
                  >
                    <span>View all</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className=" ">
                  <div className=" rounded-md overflow-hidden my-8 p-4">
                    {miniTransaction &&
                      miniTransaction.data.slice(0, 5).map((e, index) => (
                        <div
                          className=" flex items-center mb-3 border border-blue-300 rounded-md shadow-md shadow-blue-500"
                          key={index}
                        >
                          <div className=" bg-black flex justify-center items-center p-3 rounded-md">
                            {/* <TransactionIcon /> */}
                            {e.from != window.ethereum.selectedAddress ? (
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </span>
                            ) : (
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                          <div className=" h-full w-full flex flex-col justify-between text-white px-4 py-1">
                            <span className=" text-xs font-light">
                              {timeStampToDay(e.timeStamp).toGMTString()}
                            </span>
                            <br />
                            <span className=" lg:mt-1 text-sm font-bold">
                              {weiToEth(e.value) + "  eth"}
                            </span>
                            <span className=" lg:mt-1 text-sm font-bold">
                              {e.from != window.ethereum.selectedAddress
                                ? "From: " +
                                  e.from?.slice(0, 5) +
                                  "..." +
                                  e.from?.slice(
                                    e.to?.length - 4,
                                    e.from?.length
                                  )
                                : "To: " +
                                  e.to?.slice(0, 5) +
                                  "..." +
                                  e.to?.slice(e.to?.length - 4, e.to?.length)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sendEther ? (
        <div
          className=" bg-black fixed top-0 left-0 right-0 bottom-0 px-5 py-24 mx-auto flex flex-wrap justify-center items-center"
          onClick={() => shut()}
        >
          <div
            className="shadow-2xl shadow-blue-700"
            onClick={(event) => event.stopPropagation()}
          >
            <SendEth />
          </div>
        </div>
      ) : (
        <></>
      )}
      {genQR ? (
        <div
          className="  bg-black fixed top-0 left-0 right-0 bottom-0 px-5 py-24 mx-auto flex flex-wrap justify-center items-center"
          onClick={() => shut()}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <QrCode text={walletAdd} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
