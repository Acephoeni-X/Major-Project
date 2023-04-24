"use client"
import { useState, useEffect, useContext } from "react";
import { QResponse } from "../Context/QRRes";

export default function RootLayout({ children }) {
  const [walletAdd,setWalletAdd] = useState();
  useEffect(() => {
    setWalletAdd(window.ethereum.selectedAddress);
  }, [])

  const { toggleSidebar, setToggleSidebar } = useContext(QResponse);

  const toggleSidebarFun = () =>{
    console.log("okokok");
    setToggleSidebar(!toggleSidebar);
  }
  console.log(toggleSidebar);
  // const walletAdd = window?.ethereum?.selectedAddress;
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      
      <body>
      <nav className=" lg:hidden sticky top-0 bg-black lg:static px-4 py-2 col-span-2 lg:border-r border-b lg:border-b-0 border-gray-300 flex lg:flex-col justify-between lg:items-center">
      {/* <div className=" sticky top-0 bg-black lg:static px-4 py-2 col-span-2 lg:border-r border-b lg:border-b-0 border-gray-300 flex lg:flex-col justify-between lg:items-center"> */}
            {/* Wallet Name */}
            <div className=" text-white lg:mt-4 font-bold text-3xl">
              <h1 className=" lg:hidden">CryptoTrend</h1>
            </div>

            {/* SVG Hamburger Hidden for lg >= */}
            <div onClick={()=>toggleSidebarFun()} className={` ok lg:hidden`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className=" h-9 w-9 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>
          </div>
          {/* Slide Navbar Hidden for lg >= */}
          <div className={` ${(toggleSidebar)? 'block':'hidden'} lg:hidden w-screen z-0 h-screen fixed top-0 bottom-0 left-0 right-0 backdrop-blur bg-black/30 lg:backdrop-blur-0 lg:bg-black `}>
            <div className=" flex flex-col z-10 absolute top-0 right-0 bottom-0 w-3/4 bg-black">
              <div onClick={()=>toggleSidebarFun()}>
                <div className=" py-3 px-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" w-9 h-9"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </div>
              </div>

              <div className="w-full flex justify-center items-center mt-10">
                <div className=" w-64 flex flex-col items-center bg-black shadow-2xl shadow-purple-600 py-6 px-1 rounded-2xl">
                  <div className=" w-32 h-32 rounded-full overflow-hidden">
                    <img
                      className=" h-full object-cover w-full"
                      src="https://i.imgur.com/pKgABuT.jpeg"
                      alt="profile"
                    />
                  </div>
                  <div className=" my-4 w-fit">
                    <h3 className=" text-lg font-semibold text-white">
                      {walletAdd?.slice(0,5)+'...'+walletAdd?.slice(walletAdd?.length-4,walletAdd?.length)}
                    </h3>
                  </div>
                  <div className=" bg-black px-3 py-1 rounded-lg">
                    <button className=" text-white">Log Out</button>
                  </div>
                </div>
              </div>

              <div className=" mt-10 mb-20 grid gap-4 px-6 text-white">
                <div className=" flex flex-row items-center border border-black rounded p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" mr-2 w-8 h-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Home</span>
                </div>

                <div className=" flex flex-row items-center border border-black rounded p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" mr-2 w-8 h-8"
                  >
                    <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
                  </svg>
                  <span>Predictions</span>
                </div>

                <div className=" flex flex-row items-center border border-black rounded p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" mr-2 w-8 h-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Transactions</span>
                </div>

                <div className=" flex flex-row items-center border border-black rounded p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" mr-2 w-8 h-8"
                  >
                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                  </svg>
                  <span>Profile</span>
                </div>
              </div>
            </div>
          </div>
      </nav>
        {children}
        </body>
    </html>
  );
}
