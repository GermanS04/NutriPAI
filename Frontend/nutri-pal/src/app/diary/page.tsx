'use client'

import { DayMeals } from "@/components/diary/DayMeals"
import { TopBarMain } from "@/components/navigation/TopBarMain"
import { Modal } from '@/components/modal/Modal'
import { MealModal } from "@/components/diary/MealModal"
import '@/styles/diary.css'
import { useEffect, useLayoutEffect, useState } from "react"
import axios from "axios"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config"
import { BASE_URL_REST_API, userData } from "../consts"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from "@mui/material"
import { Loading } from "@/components/loading/Loading"
import { YearDropDown } from "@/components/diary/YearDropDown"
import { MonthDropDown } from "@/components/diary/MonthDropDown"

type registeredDatesData = {
    date: string;
}

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

// Function tu turn the ISO date into "January 01, 2024" style
const isoToDate = (iso: string) => {
    const [year, month, day] = iso.split('-')
    return (`${months_dictionary[parseInt(month)]} ${day.slice(0, 2)}, ${year}`)
}

export default function Diary() {
    const [user, setUser] = useState<userData>()
    const [getFlag, setGetFlag] = useState(false)
    const [dates, setDates] = useState<registeredDatesData[]>()
    const [loading, setLoading] = useState(true)

    const [openModal, setOpenModal] = useState(false)
    const [modalMeal, setModalMeal] = useState(null);

    const [maxDate, setMaxDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [rangeYear, setRangeYear] = useState<number[]>([]);

    const [filterDate, setFilterDate] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [monthFlag, setMonthFlag] = useState(false);

    useEffect(() => {
        // Setting the user that was authenticated by Firebase to a variable
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setGetFlag(true);
            }
        })
    }, [])

    // Do a GET request for the registered days that the user has with or without the query params
    const getDates = (year = '', month = '', day = '') => {
        const HISTORY_DAYS = BASE_URL_REST_API + 'history/registered_days/' + user?.uid + `?year=${year}&month=${month}&day=${day}`;
        axios.get(HISTORY_DAYS)
            .then((response) => { setDates(response.data) })
            .catch((error) => { alert('There has been an error trying to get the dates of the user \n' + error) })
    }

    // Do a GET request to get the maximum and minimum registered days the user has
    const getLimitDates = () => {
        const MAX_MIN_DATES = BASE_URL_REST_API + 'history/maxmindate/' + user?.uid;
        axios.get(MAX_MIN_DATES)
            .then((response) => { setMaxDate(response.data._max.date.slice(0, 4)); setMinDate(response.data._min.date.slice(0, 4)) })
            .catch((error) => { alert('There has been an error trying to get the maximum and minimum dates of the user \n' + error) })
    }

    // After auth make the GET requests to display the cards
    useEffect(() => {
        if (getFlag) {
            getDates()
            getLimitDates()
            setLoading(false)
        }
    }, [getFlag])

    // Function to open and closing the modal
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    // When the input calendar date is changed then reset the values of the selected year and month filter, and then separate the string into year month and date for the GET request
    useEffect(() => {
        setFilterYear('')
        setFilterMonth('')
        if (filterDate.length > 0) {
            const [year, month, day] = filterDate.split('-');
            getDates(year, month, day);
        } else {
            getDates()
        }
    }, [filterDate])

    // When the a year is selected from the filter option then able the month filter option and do the GET request with the query params of just the year
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

    // When the month is selected from the filter option then do a GET request with they query params of the year and the month
    useEffect(() => {
        if (monthFlag) {
            getDates(filterYear, filterMonth)
        }
    }, [filterMonth])

    // When the minDate is received from the GET request when loading the page, then create a array to get all the years from the least to the greatest
    useEffect(() => {
        if (minDate.length > 0) {
            const newRangeYear: number[] = []
            for (let minYear = parseInt(minDate); minYear <= parseInt(maxDate); minYear++) {
                newRangeYear.push(minYear)
            }
            setRangeYear(newRangeYear)
        }
    }, [minDate])

    return (
        <>
            {loading && <Loading />}
            <TopBarMain />
            <main className="diary-main-container">
                <div className="diary-days-container-container">
                    <div className="diary-days-container">
                        {dates?.map((date: registeredDatesData) => {
                            return (
                                <DayMeals key={date.date} isoDate={date.date} date={isoToDate(date.date)} toggle={toggleModal} setModalMeal={setModalMeal} userId={user?.uid} />
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
                        <YearDropDown filterYear={filterYear} setFilterYear={setFilterYear} rangeYear={rangeYear} />
                    </div>
                    <div className="diary-filter-container">
                        <MonthDropDown filterMonth={filterMonth} setFilterMonth={setFilterMonth} monthFlag={monthFlag} />
                    </div>
                </div>
            </main>
            {openModal && <Modal content={<MealModal data={modalMeal} />} modalToggle={toggleModal} />}
        </>
    )
}
