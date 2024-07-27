'use client'

import '@/styles/TopBarMain.css'
import { RxHamburgerMenu } from "react-icons/rx";
import { auth } from '@/app/firebase-config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL_REST_API } from '@/app/consts';
import { onAuthStateChanged } from 'firebase/auth';
import { FaUserAlt } from "react-icons/fa";

type TopBarMainProps = {
    toggleSideBar: Function;
}

export const TopBarMain = ({ toggleSideBar }: TopBarMainProps) => {
    const [user, setUser] = useState<any>({})
    const [name, setName] = useState('')
    const [getFlag, setGetFlag] = useState(false)

    useEffect(() => {
        // Setting the user that was authenticated by Firebase to a variable
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setGetFlag(true);
            }
        })
    }, [])

    const HAMBURGER_SIZE = 50;
    const USER_ICON_SIZE = 25;

    // When getting the user from firebase then change the name of the user in the topbar
    useEffect(() => {
        if (getFlag) {
            const USER_ID_API = BASE_URL_REST_API + 'users/' + user.uid;
            axios.get(USER_ID_API)
                .then((response) => { setName(response.data.name) })
                .catch((error) => { alert('There has been an error when getting the user info by uid' + error) })
        }
    }, [getFlag])

    const onClickHamburger = () => {
        toggleSideBar()
    }

    return (
        <>
            <div className="topbarmain-main-container">
                <div className='topbarmain-burger-icon-container'>
                    <button onClick={onClickHamburger}>
                        <RxHamburgerMenu size={HAMBURGER_SIZE} />
                    </button>
                </div>
                <div className='topbarmain-logo-container'>
                    LOGO
                </div>
                <div className='topbarmain-profile-container'>
                    <div className='topbarmain-profile-icon-container'>
                        <FaUserAlt size={USER_ICON_SIZE} />
                    </div>
                    {name}
                </div>
            </div>
        </>
    )
}
