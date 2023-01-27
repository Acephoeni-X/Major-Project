'use client'
import React, { createContext, useState } from 'react'

export const QResponse = createContext();

const QRRes = ({ children }) => {
    const [qrdata, setQrdata] = useState();

    return (
        <QResponse.Provider value={{ qrdata, setQrdata }} >{children}</QResponse.Provider>
    )
}

export default QRRes