import { Modal } from "../modal/Modal"
import { IoIosCheckmarkCircle } from "react-icons/io"

import '@/styles/MealRegistrationModalSubmitted.css'
import { useRouter } from "next/navigation";
import { ROUTE_DASHBOARD } from "@/app/consts";

export const MealRegistrationModalSubmitted = () => {
    const router = useRouter();
    const CHECKMARK_ICON_SIZE = 170

    const goDashboard = () => {
        router.push(ROUTE_DASHBOARD)
    }

    const anotherMeal = () => {
        window.location.reload()
    }

    return (
        <Modal width={30} height={50}>
            <div className="meal-submitted-main-container">
                <div className="meal-submitted-icon-title-container">
                    <IoIosCheckmarkCircle className="meal-submitted-check-icon" size={CHECKMARK_ICON_SIZE} />
                    <p className="meal-submitted-text">
                        Submitted Successfully
                    </p>
                </div>
                <div className="meal-submitted-option-container">
                    <button className="meal-submitted-dashboard-option" onClick={goDashboard}>
                        Go to Dashboard
                    </button>
                    <button className="meal-submitted-again-option" onClick={anotherMeal}>
                        Submit another meal
                    </button>
                </div>
            </div>
        </Modal>
    )
}
