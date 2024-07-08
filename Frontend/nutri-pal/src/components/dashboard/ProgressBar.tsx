
import '@/styles/ProgressBar.css'
import { useEffect } from 'react';

function move(max: number, actual: number) {
    const barElem = document.getElementById("progress-bar");
    const kcalElem = document.getElementById("kcal-today")
    var width = 0;
    var kcal = 0;
    const id = setInterval(frame, 5);
    console.log((actual / max) * 100)
    function frame() {
        if (kcal >= actual) {
            clearInterval(id);
        } else {
            kcal++;
            width = (kcal / max) * 100
            barElem.style.width = width + '%';
            kcalElem.innerHTML = kcal;
        }
    }
}

export const ProgressBar = () => {

    useEffect(() => {
        move(1500, 1000)
    }, [])

    return (
        <div className="progress-bar-container">
            <div className="progress-bar-info">
                <p id='kcal-today' className="progress-bar-progress-number">
                    1000
                </p>
                <p className="progress-bar-goal-number">
                    / 1500 kcal
                </p>
            </div>
            <div className='progress-bar-max'>
                <div id='progress-bar' className="progress-bar" />
            </div>
        </div>
    )
}
