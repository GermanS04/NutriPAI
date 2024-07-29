
type TimeCookDropdownProps = {
    setTimeCook: Function;
}

export const TimeCookDropdown = ({ setTimeCook }: TimeCookDropdownProps) => {

    const onChangeTimecook = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeCook(e.target.value)
    }

    return (
        <div className="recipeform-timecook-container">
            <p className='recipeform-filter-title'>Time Cook</p>
            <select className="recipeform-timecook-select" onChange={onChangeTimecook}>
                <option>
                    Fast
                </option>
                <option>
                    Normal
                </option>
                <option>
                    Long
                </option>
            </select>
        </div>
    )
}
