'use client'

import '@/styles/GoalModal.css'
import { Modal } from '@mui/material'
import { useState } from 'react'

export const GoalModal = () => {
    const [kcal, setKcal] = useState(0);

    return (
        <div className='goal-modal-main-container'>
            <p className='goal-modal-title'>
                What's your new kilocalories goal?
            </p>
            <form className='goal-modal-form-container'>
                <input className='goal-modal-input' name='kcal' type="text" inputMode='numeric' onChange={(e) => { setKcal(parseFloat(e.target.value)) }} value={kcal} />
                <button className='goal-modal-button-submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}
