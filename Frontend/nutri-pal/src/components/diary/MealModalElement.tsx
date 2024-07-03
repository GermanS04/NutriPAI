
import '@/styles/MealModalElement.css'

interface MealModalElementProps {
    data: any
}

export const MealModalElement = ({ data }: MealModalElementProps) => {

    const descriptionLength = data.description.length;

    return (
        <div className="meal-modal-element-main-container">
            <div className={'meal-modal-element-name-container'}>
                <p className='meal-modal-element-name'>{data.name}</p>
            </div>
            <div className={`meal-modal-element-description-container ${descriptionLength === 0 ? 'meal-modal-no-description' : ''}`}>
                {descriptionLength === 0 && <p>No description was given</p>}
                {descriptionLength !== 0 && <p> {data.description} </p>}
            </div>
            <div className='meal-modal-element-nutrients-container'>
                <div className='meal-modal-element-nutrient-container meal-modal-element-nutrient-protein'>
                    <p className='meal-modal-element-nutrient-details'>
                        Protein
                    </p>
                    <p className='meal-modal-element-nutrient'>
                        {data.proteins} g
                    </p>
                </div>
                <div className='meal-modal-element-nutrient-container meal-modal-element-nutrient-fats'>
                    <p className='meal-modal-element-nutrient-details'>
                        Fats
                    </p>
                    <p className='meal-modal-element-nutrient'>
                        {data.fats} g
                    </p>
                </div>
                <div className='meal-modal-element-nutrient-container meal-modal-element-nutrient-carbs'>
                    <p className='meal-modal-element-nutrient-details'>
                        Carbs
                    </p>
                    <p className='meal-modal-element-nutrient'>
                        {data.carbs} g
                    </p>
                </div>
                <div className='meal-modal-element-nutrient-container meal-modal-element-nutrient-kcal'>
                    <p className='meal-modal-element-nutrient-details'>
                        Calories
                    </p>
                    <p className='meal-modal-element-nutrient'>
                        {data.calories}
                    </p>
                </div>
            </div>
        </div>
    )
}
