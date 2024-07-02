'use client'

import '@/styles/mealRegistration.css'
import { BsArrowRight } from "react-icons/bs";
import { TopBarMain } from '@/components/navigation/TopBarMain';
import { useRouter } from 'next/navigation';


export default function mealregistration() {
    const router = useRouter();
    const ARROW_SIZE = 45;

    const sendSearchRegistration = () => {
        router.push('/mealregistration/search')
    }

    const sendManualRegistration = () => {
        router.push('/mealregistration/manual')
    }

    return (
        <>
            <TopBarMain />
            <main className='meal-register-main-container'>
                <div className='meal-register-title'>
                    How do you want to register this meal?
                </div>
                <div className='meal-register-option-container'>
                    <button className='meal-register-option' onClick={sendSearchRegistration}>
                        <div className='meal-register-option-text'>
                            Search
                        </div>
                        <div className='meal-register-option-icon'>
                            <BsArrowRight size={ARROW_SIZE} />
                        </div>
                    </button>
                    <button className='meal-register-option' onClick={sendManualRegistration}>
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
