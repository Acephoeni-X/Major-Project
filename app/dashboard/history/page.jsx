"use client";
import { QResponse } from "../../Context/QRRes";
import React, { useContext, useEffect, useRef, useState } from "react";

const page = () => {
  const render = useRef(true);
  const { walletAdd } = useContext(QResponse);
  const [transaction, settransaction] = useState();
  const transDate = (timeStamp) => {
    console.log(new Date(Number(timeStamp)).getDate());
    return new Date(Number(timeStamp)).getDate();
  };
  useEffect(() => {
    if (render.current) {
      render.current = false;
      async function getTransaction() {
        const trans = await (
          await fetch(`http://localhost:3000/api/getTransHistory`, {
            method: "POST",
            body: JSON.stringify({
              address: walletAdd,
            }),
          })
        ).json();
        settransaction(trans);
      }
      getTransaction();
    }
  }, []);

  useEffect(() => {
    console.log(transaction);
  }, [transaction]);

  return (
    <div>
      <table className=" border-[1px] w-full text-left">
        <tbody>
          <tr className=" border-b-[1px] even:bg-blue-100">
            <th className=" px-4 py-4 bg-blue-500 text-white font-bold">
              From
            </th>
            <th className=" px-4 py-4 bg-blue-500 text-white font-bold">To</th>
            <th className=" px-4 py-4 bg-blue-500 text-white font-bold">
              Ethereum
            </th>
            <th className=" px-4 py-4 bg-blue-500 text-white font-bold">
              Amount
            </th>
            <th className=" px-4 py-4 bg-blue-500 text-white font-bold">
              Timestemp
            </th>
          </tr>
          {transaction?.data.map((el, index) => {
            return (
              <tr
                key={index}
                className=" hover:shadow hover:shadow-gray-400 border-b-[1px] w-full"
              >
                <td className=" px-4 py-4 ">
                  {Array.from(el.from).splice(0, 6).join("") + "..."}
                </td>
                <td className=" px-4 py-4">
                  {Array.from(el.to).splice(0, 6).join("") + "..."}
                </td>
                <td className=" px-4 pt-4">0.526</td>
                <td className=" px-4 py-4">{el.value}</td>
                <td className=" px-4 py-4">{transDate(el.timeStamp)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default page;
