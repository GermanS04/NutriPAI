'use client'

import { useState } from "react";
import { TopBarMain } from "../navigation/TopBarMain"
import { Sidebar } from "../navigation/Sidebar";

export const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [openSideBar, setOpenSideBar] = useState(false)

    const toggleSideBar = () => {
        setOpenSideBar(!openSideBar)
    }

    return (
        <>
            <TopBarMain toggleSideBar={toggleSideBar} />
            <Sidebar open={openSideBar} toggle={toggleSideBar} />
            {children}
        </>
    )
}
