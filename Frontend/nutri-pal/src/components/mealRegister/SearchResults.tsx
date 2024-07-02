
import '@/styles/SearchResults.css'

interface Result {
    data?: any,
    autofill?: any
}

export const SearchResults = ({ data, autofill }: Result) => {

    // Values of the data into variables
    const name = data.knownAs
    const protein = Math.round(data.nutrients.PROCNT * 10) / 10
    const carbs = Math.round(data.nutrients.CHOCDF * 10) / 10
    const fat = Math.round(data.nutrients.FAT * 10) / 10
    const kcal = Math.round(data.nutrients.ENERC_KCAL * 10) / 10

    // When click on the main container then change the values of the form
    return (
        <div className="search-results-main-container" onClick={() => autofill(name, protein, carbs, fat, kcal)}>
            <div className='search-results-name-container'>
                {name}
            </div>
            <div className='search-results-info-container'>
                <div className='search-results-info search-results-info-protein'>
                    <p className='search-results-info-grams'>{protein}</p>
                    <p className='search-results-info-category'>Proteins (g)</p>
                </div>
                <div className='search-results-info search-results-info-carbs'>
                    <p className='search-results-info-grams'>{carbs}</p>
                    <p className='search-results-info-category'>Carbs (g)</p>
                </div>
                <div className='search-results-info search-results-info-fats'>
                    <p className='search-results-info-grams'>{fat}</p>
                    <p className='search-results-info-category'>Fats (g)</p>
                </div>
                <div className='search-results-info search-results-info-kcal'>
                    <p className='search-results-info-grams'>{kcal}</p>
                    <p className='search-results-info-category'>Kcal</p>
                </div>
            </div>
        </div>
    )
}
