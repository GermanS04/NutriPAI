'use-client'

import '@/styles/ProgressBar.css'
import { useEffect, useState } from 'react';

export const ProgressBar = () => {
    const max = 1500;
    const actual = 1000;

    const [kcal, setKcal] = useState(0);

    useEffect(() => {
        if (kcal < actual) {
            setTimeout(() => setKcal(n => n + 1), 2);

        }
    }, [kcal])



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
                <div id='progress-bar' className="progress-bar" style={{ width: `${(kcal / max) * 100}%` }} />
            </div>
        </div>
    )
}
