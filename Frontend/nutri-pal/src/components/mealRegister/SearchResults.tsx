
import '@/styles/SearchResults.css'
import { MacroColumn } from '../macros/MacroColumn';
import { PROTEIN_COLOR, CARBS_COLOR, FATS_COLOR, KCAL_COLOR } from '@/app/consts';


type EdamamSearchNutrients = {
    PROCNT: number;
    CHOCDF: number;
    FAT: number;
    ENERC_KCAL: number;
}

type EdamamSearch = {
    knownAs: string;
    nutrients: EdamamSearchNutrients;
}

type Result = {
    data: EdamamSearch;
    autofill: Function;
}

export const SearchResults = ({ data, autofill }: Result) => {
    const MACRO_SIZE = 1.4;

    // Round numbers from data to one decimal place (131.3403599756207 => 131.3)
    const protein = Math.round(data.nutrients.PROCNT * 10) / 10
    const carbs = Math.round(data.nutrients.CHOCDF * 10) / 10
    const fat = Math.round(data.nutrients.FAT * 10) / 10
    const kcal = Math.round(data.nutrients.ENERC_KCAL * 10) / 10

    // When click on the main container then change the values of the form
    return (
        <div className="search-results-main-container" onClick={() => autofill(data.knownAs, protein, carbs, fat, kcal)}>
            <div className='search-results-name-container'>
                {data.knownAs}
            </div>
            <div className='search-results-info-container'>
                <MacroColumn size={MACRO_SIZE} macro={`${protein}`} numberColor={PROTEIN_COLOR} label='Protein' labelColor={PROTEIN_COLOR} labelBold='normal' />
                <MacroColumn size={MACRO_SIZE} macro={`${carbs}`} numberColor={CARBS_COLOR} label='Carbs' labelColor={CARBS_COLOR} labelBold='normal' />
                <MacroColumn size={MACRO_SIZE} macro={`${fat}`} numberColor={FATS_COLOR} label='Fats' labelColor={FATS_COLOR} labelBold='normal' />
                <MacroColumn size={MACRO_SIZE} macro={`${kcal}`} numberColor={KCAL_COLOR} label='Calories' labelColor={KCAL_COLOR} labelBold='normal' unit='' />
            </div>
        </div>
    )
}
