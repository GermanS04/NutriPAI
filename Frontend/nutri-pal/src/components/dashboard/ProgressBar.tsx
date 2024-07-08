'use-client'

import '@/styles/ProgressBar.css'
import { useEffect, useState } from 'react';

interface ProgressProps {
    max: number,
    actual: number
}

export const ProgressBar = ({ max, actual }: ProgressProps) => {
    // Constants for the gradient on the progress bar, when it's under max then it's green, when surpasses the max then the progress bar turns red
    const GRADIENT_GREEN = 'linear-gradient(to right, rgb(0, 194, 74) 60%, rgb(0, 149, 67))'
    const GRADIENT_RED = 'linear-gradient(to right, rgb(231, 43, 1) 60%, rgb(198, 1, 1))'

    const [kcal, setKcal] = useState(0)
    const [width, setWidth] = useState(0);
    const [color, setColor] = useState(GRADIENT_GREEN)

    // Start kilocalories with 0 and if it's under the actual calories from the database then keep adding until it's done
    useEffect(() => {
        if (kcal < actual) {
            setTimeout(() => setKcal(n => n + 1), 2);
        }
        if (width <= 100) {
            setWidth((kcal / max) * 100);
        } else {
            setColor(GRADIENT_RED)
        }
    }, [kcal, actual])

    return (
        <div className="progress-bar-container">
            <div className="progress-bar-info">
                <p id='kcal-today' className="progress-bar-progress-number">
                    {kcal}
                </p>
                <p className="progress-bar-goal-number">
                    / {max} kcal
                </p>
            </div>
            <div className='progress-bar-max'>
                <div id='progress-bar' className="progress-bar" style={{ width: `${width}%`, backgroundImage: `${color}` }} />
            </div>
        </div>
    )
}
