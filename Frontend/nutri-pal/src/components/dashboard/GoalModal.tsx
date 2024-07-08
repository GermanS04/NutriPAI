'use client'

import { BASE_URL_REST_API } from '@/app/consts'
import '@/styles/GoalModal.css'
import axios from 'axios'
import { useState } from 'react'

interface GoalModal {
    uid: any,
    toggleModal: any
}

export const GoalModal = ({ uid, toggleModal }: GoalModal) => {
    const [kcal, setKcal] = useState(0);

    const postGoal = () => (
        axios.post(BASE_URL_REST_API + 'users/goal', {
            id: uid,
            kcalGoal: kcal
        }).catch((error) => { alert('There was an error trying to post the goal \n' + error) })
    )

    const sendGoal = (e: any) => {
        e.preventDefault()
        postGoal()
        toggleModal()
    }

    return (
        <div className='goal-modal-main-container'>
            <p className='goal-modal-title'>
                What's your new kilocalories goal?
            </p>
            <form className='goal-modal-form-container' onSubmit={sendGoal}>
                <input className='goal-modal-input' name='kcal' type="text" inputMode='numeric' onChange={(e) => { setKcal(parseFloat(e.target.value)) }} value={kcal} />
                <button className='goal-modal-button-submit' type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}
