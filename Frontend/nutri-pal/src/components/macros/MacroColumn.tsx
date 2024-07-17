
import '@/styles/MacroColumn.css'

type MacroColumnProps = {
    size: number;
    unit?: string;
    macro: string;
    numberColor: string;
    label: string;
    labelColor: string;
    labelBold?: string;
}

export const MacroColumn = ({ size, unit = 'g', macro, numberColor, label, labelColor, labelBold = 'bold' }: MacroColumnProps) => {
    return (
        <div className='macro-column-main-container'>
            <div className='macro-column-number-container'>
                <p className='macro-column-number' style={{ color: numberColor, fontSize: `${size}vw` }}>
                    {macro}
                </p>
                <p className='macro-column-gram' style={{ color: numberColor, fontSize: `${size / 1.25}vw` }}>
                    {unit}
                </p>
            </div>
            <div className='macro-column-label-container'>
                <p className='macro-column-label' style={{ color: labelColor, fontSize: `${size / 1.5}vw`, fontWeight: labelBold }}>
                    {label}
                </p>
            </div>
        </div>
    )
}
