"use client";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const history = () => {
  const [address, setAddress] = useState();
  useEffect(() => {
    async function getHistory() {
      let data = (
        await fetch(`http://localhost:3000/api/getTransHistory`, {
          method: "POST",
          body: JSON.stringify({ address: window.ethereum.selectedAddress }),
        })
      ).json();
      console.log(await data);
    }
    getHistory();
  }, []);
  return <div>history</div>;
};
export default history;
