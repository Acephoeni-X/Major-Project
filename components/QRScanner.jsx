import React, { useState, useEffect, useRef, useContext } from 'react'
import { QResponse } from '@/app/Context/QRRes';
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode"
// import { resolve } from 'styled-jsx/macro';


const QRScanner = () => {
    const [getCode, setGetCode] = useState(null);
    let isMountedRef = useRef(false);
    const { setQrdata, setscanner } = useContext(QResponse);


    useEffect(() => {
        console.log("out", isMountedRef);
        if (!isMountedRef.current) {
            console.log("true")
            isMountedRef.current = true;


            const scanner = new Html5QrcodeScanner(
                "reader",
                {
                    qrbox: {
                        width: 250,
                        height: 250
                    },
                    fps: 20
                }
            );

            setscanner(scanner);

            scanner.render(success, error);
            function success(result) {
                console.log(result);
                setQrdata(result);
                scanner.clear();
                document.getElementById('reader').remove();
            }

            function error(err) {
                // console.error(err);
                return;
            }

        }
    }, []);



    return (
        <div>
            <div id='canvas-div' className=' '>
                <div id="reader" width="600px"></div>
            </div>
        </div >
    )
}

export default QRScanner