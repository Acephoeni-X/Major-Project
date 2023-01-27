import React, { useState, useEffect, useRef, useContext } from 'react'
import QrScanner from 'qr-scanner'
import { QResponse } from '@/app/Context/QRRes';


const QRScanner = () => {
    const [getCode, setGetCode] = useState(null);
    const isMountedRef = useRef(false);
    const { setQrdata } = useContext(QResponse);

    useEffect(() => {

        const videoElem = document.getElementById('qr-video');
        let qrScanner = new QrScanner(
            videoElem,
            result => setGetCode(result),
        );
        // videoElem.parentNode.insertBefore(qrScanner.$canvas);

        if (getCode != null) {
            // qrScanner.stop();
            qrScanner.destroy();
            // qrScanner = null;
            setQrdata(getCode);
            console.log("end");
            // qrScanner.$canvas.style.display = 'none';
            console.log(getCode);
        }
        else {
            // isMountedRef.current = false;
            qrScanner.start();
            console.log("start");
            // qrScanner.$canvas.style.display = 'block';
        }

        if (!isMountedRef.current) {
            isMountedRef.current = true;
            // if (qrScanner) {
            document.getElementById('canvas-div').insertAdjacentElement('afterend', qrScanner.$canvas);
            // }
            document.getElementsByTagName('canvas')[0].classList.add('h-72', 'w-72', 'rounded-md');
            document.getElementsByTagName('canvas')[1]?.classList.add('hidden');
        }


    }, [getCode]);


    return (
        <div>
            <div id='canvas-div' className='  bg-blue-500'>
                <video className='hidden' id='qr-video'></video>
            </div>
        </div >
    )
}

export default QRScanner