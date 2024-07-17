
type MealRegistrationFormNutrientInputProps = {
    label: string;
    name: string;
    nutrient?: number;
}

export const MealRegistrationFormNutrientInput = ({ label, name, nutrient }: MealRegistrationFormNutrientInputProps) => {

    const changeNutrientValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        nutrient = parseFloat(e.target.value)
    }

    return (
        <div>
            {label}
            <input name={`${name}`} type="text" inputMode='numeric' onChange={changeNutrientValue} value={nutrient} />
        </div>
    )
}
