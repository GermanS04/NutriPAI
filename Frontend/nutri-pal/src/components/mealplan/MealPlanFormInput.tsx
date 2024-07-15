
import '@/styles/MealPlanFormInput.css'

type MealPlanFormInputProps = {
    label: string,
    changeMacro: Function
}

export const MealPlanFormInput = ({ label, changeMacro }: MealPlanFormInputProps) => {

    const onChangeMacro = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeMacro(e.target.value)
    }

    return (
        <div className='meal-plan-form-input-main-container'>
            <p className='meal-plan-form-input-label'>{label}</p>
            <input className='meal-plan-form-input' type="numeric" onChange={onChangeMacro} />
        </div>
    )
}
