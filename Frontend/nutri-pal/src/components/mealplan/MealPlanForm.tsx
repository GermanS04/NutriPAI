
import { MealPlanFormInput } from "./MealPlanFormInput"
import '@/styles/MealPlanForm.css'

type MealPlanFormProps = {
    setProtein: Function,
    setCarbs: Function,
    setFats: Function,
    submit: Function
}

export const MealPlanForm = ({ setProtein, setCarbs, setFats, submit }: MealPlanFormProps) => {

    const submitMacros = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        submit()
    }

    return (
        <form className="meal-plan-form-main-container" onSubmit={submitMacros}>
            <MealPlanFormInput label="Protein" changeMacro={setProtein} />
            <MealPlanFormInput label="Carbs" changeMacro={setCarbs} />
            <MealPlanFormInput label="Fats" changeMacro={setFats} />
            <button className="meal-plan-form-submit" type="submit">
                Submit
            </button>
        </form>
    )
}
