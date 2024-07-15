
import '@/styles/MacroColumn.css'

type MacroColumnProps = {
    size: number,
    macro: string,
    numberColor: string,
    label: string,
    labelColor: string
}

export const MacroColumn = ({ size, macro, numberColor, label, labelColor }: MacroColumnProps) => {
    return (
        <div className='macro-column-main-container'>
            <div className='macro-column-number-container'>
                <p className='macro-column-number' style={{ color: numberColor, fontSize: `${size}vw` }}>
                    {macro}
                </p>
                <p className='macro-column-gram' style={{ color: numberColor, fontSize: `${size / 1.25}vw` }}>
                    g
                </p>
            </div>
            <div className='macro-column-label-container'>
                <p className='macro-column-label' style={{ color: labelColor, fontSize: `${size / 1.5}vw` }}>
                    {label}
                </p>
            </div>
        </div>
    )
}
