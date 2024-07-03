
import { MdNoMeals } from "react-icons/md";
import '@/styles/MealModal.css'
import { MealModalElement } from "./MealModalElement";

interface MealModalProps {
    data: any
}

export const MealModal = ({ data }: MealModalProps) => {
    const NO_MEAL_ICON_SIZE = 120;
    const dataLength = data?.length

    return (
        <div className="meal-modal-main-container">
            {dataLength === 0 &&
                <div className="meal-modal-empty-container">
                    <MdNoMeals className="meal-modal-empty-icon" size={NO_MEAL_ICON_SIZE} />
                    <p>There is no register of a meal</p>
                </div>
            }
            {dataLength >= 1 &&
                <div className="meal-modal-not-emtpy-container">
                    <div className="meal-modal-title-container">
                        <p className="meal-modal-title">For {data[0].category} You Had</p>
                    </div>
                    <div className="meal-modal-content-container">
                        {data.map((meal: any) => {
                            return (
                                <MealModalElement key={meal.id} data={meal} />
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}
