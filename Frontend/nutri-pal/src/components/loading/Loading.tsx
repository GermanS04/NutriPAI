'use client'
import '@/styles/Loading.css'
import { useEffect, useState } from 'react';

export const Loading = () => {

    const [dots, setDots] = useState(3);

    // Use effect when rendering the component, increment the dots and do a remainder of 4 (cause it can only be 0 1 2 or 3) and do that every 500 milliseconds
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots + 1) % 4);
        }, 250);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='loading-container'>
            <div className='loading-overlay' />
            <div className='loading-text-container'>
                <p className='loading-text'>Loading{Array(dots).fill('.').join('')}</p> {/* Make an array of X amount of dots and join them with empty string */}
            </div>
        </div>
    )
}
