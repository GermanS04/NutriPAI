'use client'

import { DayMeals } from "@/components/diary/DayMeals"
import { TopBarMain } from "@/components/navigation/TopBarMain"
import { Modal } from '@/components/modal/Modal'
import { MealModal } from "@/components/diary/MealModal"
import '@/styles/diary.css'
import { useEffect, useState } from "react"
import axios from "axios"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config"
import { BASE_URL_REST_API } from "../consts"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from "@mui/material"

export default function Diary() {
    const [user, setUser] = useState<any>({})
    const [getFlag, setGetFlag] = useState(false)
    const [dates, setDates] = useState<any>(null)

    const [openModal, setOpenModal] = useState(false)
    const [modalMeal, setModalMeal] = useState<any>(null);

    const [maxDate, setMaxDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [rangeYear, setRangeYear] = useState<any>([]);

    const [filterDate, setFilterDate] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [monthFlag, setMonthFlag] = useState(false);

    // Dictionary to get months by its number
    const months_dictionary: { [key: number]: string } = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "June",
        7: "July",
        8: "Aug",
        9: "Sept",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    };

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

    // Function tu turn the ISO date into "January 01, 2024" style
    const isoToDate = (iso: string) => {
        const dateArray = iso.split('-')

        return (`${months_dictionary[parseInt(dateArray[1])]} ${dateArray[2].slice(0, 2)}, ${dateArray[0]}`)
    }

    // Setting the user that was authenticated by Firebase to a variable and declare the flag to start making request to true
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
            setGetFlag(true)
        }
    })

    // Do a GET request for the registered days that the user has with or without the query params
    const getDates = (year = '', month = '', day = '') => {
        const HISTORY_DAYS = BASE_URL_REST_API + 'history/registered_days/' + user.uid + `?year=${year}&month=${month}&day=${day}`;
        axios.get(HISTORY_DAYS)
            .then((response) => { setDates(response.data) })
            .catch((error) => { alert('There has been an error trying to get the dates of the user \n' + error) })
    }

    // Do a GET request to get the maximum and minimum registered days the user has
    const getLimitDates = () => {
        const MAX_MIN_DATES = BASE_URL_REST_API + 'history/maxmindate/' + user.uid;
        axios.get(MAX_MIN_DATES)
            .then((response) => { setMaxDate(response.data._max.date.slice(0, 4)); setMinDate(response.data._min.date.slice(0, 4)) })
            .catch((error) => { alert('There has been an error trying to get the maximum and minimum dates of the user \n' + error) })
    }

    // After auth make the GET requests to display the cards
    useEffect(() => {
        if (getFlag) {
            getDates()
            getLimitDates()
        }
    }, [getFlag])

    const toggleModal = () => {
        if (openModal) {
            setOpenModal(false)
        } else {
            setOpenModal(true)
        }
    }

    useEffect(() => {
        setFilterYear('')
        setFilterMonth('')
        if (filterDate.length > 0) {
            const temp = filterDate.split('-');
            getDates(temp[0], temp[1], temp[2]);
        } else {
            getDates()
        }
    }, [filterDate])

    useEffect(() => {
        if (filterYear.length > 0) {
            setMonthFlag(true)
            getDates(filterYear)
        } else {
            setMonthFlag(false)
            setFilterMonth('')
            getDates()
        }
    }, [filterYear])

    useEffect(() => {
        if (monthFlag) {
            getDates(filterYear, filterMonth)
        }
    }, [filterMonth])

    useEffect(() => {
        if (minDate.length > 0) {
            const newRangeYear: any = []
            for (let minYear = parseInt(minDate); minYear <= parseInt(maxDate); minYear++) {
                newRangeYear.push(minYear)
            }
            setRangeYear(newRangeYear)
        }
    }, [minDate])

    return (
        <>
            <TopBarMain />
            <main className="diary-main-container">
                <div className="diary-days-container-container">
                    <div className="diary-days-container">
                        {dates?.map((date: any) => {
                            return (
                                <DayMeals key={date.date} isoDate={date.date} date={isoToDate(date.date)} toggle={toggleModal} setModalMeal={setModalMeal} userId={user.uid} />
                            )
                        })}
                    </div>
                </div>
                <div className="diary-filters-container">
                    <div className="diary-filter-container">
                        <p>Filters</p>
                        <input className="diary-filter-calendar" type="date" onChange={(e) => setFilterDate(e.target.value)} />
                    </div>
                    <div className="diary-filter-container">
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
                                {rangeYear?.map((year: any) => {
                                    return (
                                        <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="diary-filter-container">
                        <FormControl fullWidth>
                            <InputLabel sx={{ zIndex: 0 }}>Filter by Month</InputLabel>
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
                    </div>
                </div>
            </main>
            {openModal && <Modal content={<MealModal data={modalMeal} />} modalToggle={toggleModal} />}
        </>
    )
}
