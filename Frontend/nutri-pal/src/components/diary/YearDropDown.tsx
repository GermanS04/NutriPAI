
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

type YearDropDownProps = {
    filterYear: string;
    setFilterYear: Function;
    rangeYear: number[]
}

export const YearDropDown = ({ filterYear, setFilterYear, rangeYear }: YearDropDownProps) => {
    return (
        <FormControl fullWidth>
            <InputLabel sx={{ zIndex: 0 }}>Filter by Year</InputLabel>
            <Select
                variant="outlined"
                value={filterYear}
                label="Filter by Year"
                onChange={(e) => setFilterYear(e.target.value)}
                sx={{
                    color: "black",
                }}
            >
                <MenuItem value={''}>Filter by Year</MenuItem>
                {rangeYear?.map((year: number) => {
                    return (
                        <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}
