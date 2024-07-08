import { GiMeat } from "react-icons/gi";
import { PiBreadFill } from "react-icons/pi";
import { FaDroplet } from "react-icons/fa6";
import '@/styles/MacroCards.css'

interface MacroCards {
    macroNum: number,
    macroType: string,
}

export const MacroCards = ({ macroNum, macroType }: MacroCards) => {
    const ICON_MACRO_SIZE = 80

    let icon
    let type

    // Assign the icon and type depending if its a protein (p), calorie (c), fat (f)
    if (macroType === 'p') {
        icon = <GiMeat size={ICON_MACRO_SIZE} />
        type = 'Protein'
    } else if (macroType === 'c') {
        icon = <PiBreadFill size={ICON_MACRO_SIZE} />
        type = 'Carbs'
    } else if (macroType === 'f') {
        icon = <FaDroplet size={ICON_MACRO_SIZE} />
        type = 'Fats'
    }

    return (
        <div className='macro-cards-main-container'>
            <div>
                {icon}
            </div>
            <div className='macro-cards-info-container'>
                <div className='macro-cards-info-numbers'>
                    <p className='macro-cards-number'>
                        {macroNum}
                    </p>
                    <p className='macro-cards-gram-text'>
                        g
                    </p>
                </div>
                <p className='macro-cards-type-text'>
                    {type}
                </p>
            </div>
        </div>
    )
}
