
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

type MonthDropDownProps = {
    filterMonth: string;
    setFilterMonth: Function;
    monthFlag: boolean;
}

// Array to display the months on the Select for filtering
const monthsOptions = [
    { value: '', label: 'Filter by Month' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
]

export const MonthDropDown = ({ filterMonth, setFilterMonth, monthFlag }: MonthDropDownProps) => {
    return (
        <FormControl fullWidth>
            <InputLabel sx={{ zIndex: 0 }}> Filter by Month </InputLabel>
            <Select
                variant="outlined"
                value={filterMonth}
                label="Filter by Month"
                onChange={(e) => setFilterMonth(e.target.value)}
                sx={{
                    color: "black",
                }}
                {...(monthFlag ? {} : { disabled: true })}
            >
                {monthsOptions.map((month) => {
                    return (
                        <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}
