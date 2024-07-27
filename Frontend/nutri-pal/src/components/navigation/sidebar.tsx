
import Drawer from '@mui/material/Drawer';
import '@/styles/Sidebar.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { IoJournalOutline } from "react-icons/io5";
import { MdOutlineFastfood } from "react-icons/md";
import { PiGraph } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { NavButton } from './NavButton';
import { ROUTE_DASHBOARD, ROUTE_MEALDIARY, ROUTE_MEAL_PLAN_RECOMMENDATION, ROUTE_MEAL_REGISTRATION } from '@/app/consts';

type SidebarProps = {
    open: boolean;
    toggle: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

export const Sidebar = ({ open, toggle }: SidebarProps) => {

    return (
        <Drawer open={open} onClose={toggle}>
            <div className='sidebar-main-container'>
                <div className='sidebar-top-container'>
                    <p className='sidebar-title'>NutriPal</p>
                </div>
                <div className='sidebar-overview-container'>
                    <p className='sidebar-category-title'>Overview</p>
                    <NavButton label='Dashboard' Icon={LuLayoutDashboard} path={ROUTE_DASHBOARD} />
                    <NavButton label='Meal Diary' Icon={IoJournalOutline} path={ROUTE_MEALDIARY} />
                    <NavButton label='Add Meal' Icon={MdOutlineFastfood} path={ROUTE_MEAL_REGISTRATION} />
                    <NavButton label='Meal Plan' Icon={PiGraph} path={ROUTE_MEAL_PLAN_RECOMMENDATION} />
                </div>
                <div className='sidebar-account-container'>
                    <p className='sidebar-category-title'>Account</p>
                    <NavButton label='Log out' Icon={FiLogOut} path='/' logout />
                </div>
            </div>
        </Drawer>
    )
}
