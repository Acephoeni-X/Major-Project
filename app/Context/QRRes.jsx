'use client'
import React, { createContext, useState } from 'react'

export const QResponse = createContext();

const QRRes = ({ children }) => {
    const [qrdata, setQrdata] = useState();
    const [walletEth, setWalletEth] = useState();
    const [walletAdd, setWalletAdd] = useState();
    const [scanner, setscanner] = useState();

    return (
        <QResponse.Provider value={{ qrdata, walletEth, walletAdd, scanner, setscanner, setWalletAdd, setWalletEth, setQrdata }} >{children}</QResponse.Provider>
    )
}

export default QRRes