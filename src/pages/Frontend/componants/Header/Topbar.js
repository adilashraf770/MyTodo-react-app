import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs';
export default function Topbar() {
    const [currentDateAndTime, setCurrentDateAndTime] = useState(" ");
    useEffect(() => {
        const dateTime = dayjs().format("dddd DD MMMM YYYY hh:mm:ss a")
        setCurrentDateAndTime(dateTime)
    }, [])
    return (
        <div className='bg-primary py-1'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="mb-0 text-center text-white">
                            {currentDateAndTime}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
