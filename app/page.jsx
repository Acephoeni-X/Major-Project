"use client"
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();

  const checkOnceCookie = useRef(false);

  const inputRef = useRef({
    username: "",
    email: "",
    password: ""
  });

  function createUser() {
    console.log(inputRef.current);
  }

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
  }, [])

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
              <div className=' text-2xl font-semibold text-blue-900 mb-6'>Create Account</div>
              <div className=' flex flex-col'>
                <div className=' flex flex-col'>
                  <label className=' text-xs text-gray-700 font-light mb-1' htmlFor="username">Username</label>
                  <input onChange={e => inputRef.current.username = e.target.value.trim()} id='username' placeholder='Username' className=' text-black focus:border focus:border-blue-500 focus:outline focus:outline-blue-300 focus:outline-offset-2 bg-gray-100 rounded-lg outline-none px-3 py-2' name='username' type="text" />
                </div>
                <div className=' flex flex-col py-5'>
                  <label className=' text-xs text-gray-700 font-light mb-1' htmlFor="email">Email</label>
                  <input onChange={e => inputRef.current.email = e.target.value.trim()} id='email' placeholder='E-mail' className=' text-black focus:border focus:border-blue-500 focus:outline focus:outline-blue-300 focus:outline-offset-2 bg-gray-100 rounded-lg outline-none px-3 py-2' name='email' type="text" />
                </div>
                <div className=' flex flex-col'>
                  <label className=' text-xs text-gray-700 font-light mb-1' htmlFor="password">Password</label>
                  <input onChange={e => inputRef.current.password = e.target.value.trim()} id='password' placeholder='Password' className=' text-black focus:border focus:border-blue-500 focus:outline focus:outline-blue-300 focus:outline-offset-2 bg-gray-100 rounded-lg outline-none px-3 py-2' name='password' type="password" />
                </div>
                <div className=' mt-2'>
                  <p className=' text-xs text-gray-700'>
                    Already have an account? <u><a className=' text-blue-500' href="/login">Login</a></u>
                  </p>
                </div>

              </div>
              <div className=' flex justify-end items-center mt-6'>
                <button onClick={() => createUser()} className=' px-2 py-2 rounded-xl w-full bg-blue-900 text-white'>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
