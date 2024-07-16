'use client'

import '@/styles/mealRegistration.css'
import { BsArrowRight } from "react-icons/bs";
import { TopBarMain } from '@/components/navigation/TopBarMain';
import { useRouter } from 'next/navigation';
import { ROUTE_MEAL_REGISTRATION_MANUAL, ROUTE_MEAL_REGISTRATION_SEARCH } from '../consts';


export default function mealregistration() {
    const router = useRouter();
    const ARROW_SIZE = 45;

    const sendSearchRegistration = () => {
        router.push(ROUTE_MEAL_REGISTRATION_SEARCH)
    }

    const sendManualRegistration = () => {
        router.push(ROUTE_MEAL_REGISTRATION_MANUAL)
    }

    const searchButton = (
        <button className='meal-register-option' onClick={sendSearchRegistration}>
            <div className='meal-register-option-text'>
                Search
            </div>
            <div className='meal-register-option-icon'>
                <BsArrowRight size={ARROW_SIZE} />
            </div>
        </button>
    )

    const manualButton = (
        <button className='meal-register-option' onClick={sendManualRegistration}>
            <div className='meal-register-option-text'>
                Manual
            </div>
            <div className='meal-register-option-icon'>
                <BsArrowRight size={ARROW_SIZE} />
            </div>
        </button>
    )

    return (
        <>
            <TopBarMain />
            <main className='meal-register-main-container'>
                <div className='meal-register-title'>
                    How do you want to register this meal?
                </div>
                <div className='meal-register-option-container'>
                    {searchButton}
                    {manualButton}
                </div>
            </main>
        </>
    )
}
