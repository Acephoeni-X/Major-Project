import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Team from "@/app/Team";
import Navbar from "./Navbar";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="text-gray-200 body-font">
          <div className="container px-5 py-12 mx-auto">
            <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="inline-block w-8 h-8 text-gray-200 mb-8"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
              </svg>
              <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-3xl text-3xl font-medium title-font mb-4 text-green-300">
                  Crypto-Trend
                </h1>
                <h1 className="text-xl">
                  A Blockchain-based Cryptocurrency Wallet and Value Tracking
                  Application
                </h1>
              </div>
              <p className="leading-relaxed text-base">
                The Ethereum management dashboard provides a user-friendly way
                to manage transactions and assets, including transfer
                functionality, current balance display, transaction history, QR
                code functionality and prediction column for price of ether. The
                project is designed to make Ethereum transactions more efficient
                and user-friendly by providing an easy-to-use interface.
              </p>
            </div>
          </div>
        </section>
      </main>
      <span className="flex flex-wrap">
        <button className="flex mx-auto my-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          <a href="/assets/pdfs/" download={true}>
            Download Report (*.pdf)
          </a>
        </button>
        <button className="flex mx-auto my-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Download Report (*.zip)
        </button>
        <button className="flex mx-auto my-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Download Research Paper (*.pdf)
        </button>
        <button className="flex mx-auto my-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Download PPT(*.ppt)
        </button>
      </span>
      <Team />
      <span className="mt-8">
        <Footer />
      </span>
    </>
  );
}
