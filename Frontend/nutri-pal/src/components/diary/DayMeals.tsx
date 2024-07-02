
import '@/styles/DayMeals.css'

interface meals {
    toggle: any
}

export const DayMeals = ({ toggle }: meals) => {
    return (
        <div className="day-meal-main-container">
            <div className="day-meal-date-container">
                <p className="day-meal-date">June 24, 2024</p>
            </div>
            <div className='day-meal-meals-container'>
                <div className='day-meal-meals' onClick={() => toggle()}>
                    Breakfast
                </div>
                <div className='day-meal-meals' onClick={() => toggle()}>
                    Lunch
                </div>
                <div className='day-meal-meals' onClick={() => toggle()}>
                    Dinner
                </div>
            </div>
        </div>
    )
}
