"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const Logino = () => {

    const router = useRouter();

    const checkOnceCookie = useRef(false);

    useEffect(() => {
        if (!checkOnceCookie.current) {
            checkOnceCookie.current = true;
            (async () => {
                await fetch('http://localhost:3000/check')
                    .then((res) => {
                        if (res.status == 200) {
                            router.push(`/dashboard/`);
                        }
                    })
            })();
        }
    }, []);

    return (

        <div className=' max-w-screen-2xl  h-screen'>
            <div className=' h-screen'>
                <div className=' h-full grid grid-rows-5 sm:grid-rows-none sm:grid-cols-12'>
                    <div className=' relative row-span-1 sm:col-span-4 flex  flex-col items-center justify-center'>
                        <img className=' object-cover w-full sm:w-fit h-full' src="https://i.imgur.com/DJNhBap.jpg" alt="background" />
                        <div className=' absolute top-0 mt-10 flex flex-col items-center'>
                            <h1 className=' text-white font-extrabold text-5xl mb-2'>CryptoTrend</h1>
                            <p className=' text-white font-light'>A smart crypto wallet</p>
                        </div>
                        <img className=' hidden sm:block absolute h-60' src="https://i.imgur.com/bOchCKa.png" alt="" />
                    </div>
                    <div className=' flex justify-center items-center row-span-4 sm:row-auto sm:col-span-8'>
                        <div className=' w-fit h-fit border border-gray-200 bg-white p-4 rounded-2xl'>
                            <div className=' text-2xl font-semibold text-blue-900 mb-6'>Welcome Back</div>
                            <div className=' flex flex-col'>
                                <div className=' flex flex-col mb-4'>
                                    <label className=' text-sm text-gray-700 font-light mb-1' htmlFor="username">Username</label>
                                    <input id='username' placeholder='Username' className=' text-black focus:border focus:border-blue-500 focus:outline focus:outline-blue-300 focus:outline-offset-2 bg-gray-100 rounded outline-none px-3 py-2' name='username' type="text" />
                                </div>
                                <div className=' flex flex-col'>
                                    <label className=' text-sm text-gray-700 font-light mb-1' htmlFor="password">Password</label>
                                    <input id='password' placeholder='Password' className=' text-black focus:border focus:border-blue-500 focus:outline focus:outline-blue-300 focus:outline-offset-2 bg-gray-100 rounded outline-none px-3 py-2' name='password' type="password" />
                                </div>
                                <div className=' mt-2'>
                                    <p className=' text-xs text-gray-700'>
                                        Not have an account? <u><a className=' text-blue-500' href="/">Sign Up</a></u>
                                    </p>
                                </div>
                            </div>
                            <div className=' flex justify-end items-center mt-6'>
                                <button className=' px-2 py-2 rounded-xl w-full bg-blue-900 text-white'>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logino;