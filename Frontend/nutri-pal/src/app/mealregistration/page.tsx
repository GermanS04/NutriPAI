'use client'

import '@/styles/mealRegistration.css'
import { BsArrowRight } from "react-icons/bs";
import { TopBarMain } from '@/components/navigation/TopBarMain';

export default function mealregistration() {
    const ARROW_SIZE = 45;

    return (
        <>
            <TopBarMain />
            <main className='meal-register-main-container'>
                <div className='meal-register-title'>
                    How do you want to register this meal?
                </div>
                <div className='meal-register-option-container'>
                    <button className='meal-register-option'>
                        <div className='meal-register-option-text'>
                            Search
                        </div>
                        <div className='meal-register-option-icon'>
                            <BsArrowRight size={ARROW_SIZE} />
                        </div>
                    </button>
                    <button className='meal-register-option'>
                        <div className='meal-register-option-text'>
                            Manual
                        </div>
                        <div className='meal-register-option-icon'>
                            <BsArrowRight size={ARROW_SIZE} />
                        </div>
                    </button>
                </div>
            </main>
        </>
    )
}
