'use client'

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { Box, FormControl, MenuItem } from '@mui/material';
import { HEALTH_LABELS } from '@/app/consts';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type HealthLabelsProps = {
    healthLabels: string[];
    setHealthLabels: Function;
}

export const HealthLabels = ({ healthLabels, setHealthLabels }: HealthLabelsProps) => {

    const handleChange = (event: SelectChangeEvent<typeof healthLabels>) => {
        const {
            target: { value },
        } = event;
        setHealthLabels(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    return (
        <div>
            <p className='recipeform-filter-title'>Health Labels</p>
            <FormControl sx={{ m: 1, width: '100%' }}>
                <Select
                    sx={{
                        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                            border: 1,
                        },
                        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                            border: 1,
                        },
                        backgroundColor: 'white',
                        borderRadius: '1rem'
                    }}
                    multiple
                    value={healthLabels}
                    onChange={handleChange}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {HEALTH_LABELS.map((health) => (
                        <MenuItem
                            key={health}
                            value={health}
                        >
                            {health}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div >
    )
}
