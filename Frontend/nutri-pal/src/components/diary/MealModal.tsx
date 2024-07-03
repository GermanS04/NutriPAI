
import { MdNoMeals } from "react-icons/md";

interface MealModalProps {
    data: any
}

export const MealModal = ({ data }: MealModalProps) => {

    const dataLength = data?.length

    return (
        <div>
            {dataLength === 0 &&
                <div>
                    <MdNoMeals />
                    <p>There is no register of a meal</p>
                </div>
            }
            {dataLength >= 1 &&
                <div>
                    <p>Theres a meal registered</p>
                </div>
            }
        </div>
    )
}
