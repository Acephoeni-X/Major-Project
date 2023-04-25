import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import copy from "copy-to-clipboard";

const QrCode = ({ text }) => {
  const [imgSrc, setimgSrc] = useState();
  //   const generateQR = async (text) => {
  //     try {
  //       //   console.log(await QRCode.toDataURL(text));
  //       setimgSrc(await QRCode.toDataURL(text));
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   generateQR(text);

  useEffect(() => {
    async function setSRC() {
      setimgSrc(await QRCode.toDataURL(text));
    }
    setSRC();
  }, []);

  return (
    <div className=" flex flex-col items-center bg-blue-400">
      <Image
        src={imgSrc}
        alt="Qr Code of below address"
        width={300}
        height={300}
      />
      <div className=" flex rounded-md overflow-hidden mt-4">
        <h1 className=" bg-blue-800 text-white p-2">{text}</h1>

        <button className="p-2 bg-blue-500 text-white" onClick={() => copy(text)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QrCode;
