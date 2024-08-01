'use client'



type MacroInputProps = {
    classNameContainer: string;
    classNameInput: string;
    classNameLabel: string;
    label: string;
    setMacro: Function;
}

export const MacroInput = ({ classNameContainer, classNameInput, classNameLabel, label, setMacro }: MacroInputProps) => {

    const onChangeMacro = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMacro(parseInt(e.target.value))
    }

    return (
        <div className={classNameContainer}>
            <p className={classNameLabel}>{label}</p>
            <input className={classNameInput} type="numeric" defaultValue={''} onChange={onChangeMacro} />
        </div>
    )
}
