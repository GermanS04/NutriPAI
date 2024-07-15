
import { MealPlanFormInput } from "./MealPlanFormInput"
import '@/styles/MealPlanForm.css'

type MealPlanFormProps = {
    setProtein: Function,
    setCarbs: Function,
    setFats: Function
}

export const MealPlanForm = ({ setProtein, setCarbs, setFats }: MealPlanFormProps) => {


    return (
        <form className="meal-plan-form-main-container">
            <MealPlanFormInput label="Protein" changeMacro={setProtein} />
            <MealPlanFormInput label="Carbs" changeMacro={setCarbs} />
            <MealPlanFormInput label="Fats" changeMacro={setFats} />
            <button className="meal-plan-form-submit" type="submit">
                Submit
            </button>
        </form>
    )
}
