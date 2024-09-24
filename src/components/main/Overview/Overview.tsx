import React, { useEffect, useState } from 'react'
import styles from './Overview.module.scss'
import { Grid } from '@mui/material'
import RoutesPage from '../RoutesPage/RoutesPage'
import Sidebar from '../../sidebar/Sidebar'
import { menuData } from '../../sidebar/menuData'
import NewHeading from '../../NewHeading/NewHeading'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IOverview {
    open: any;  
    menu: any;
    handleSidebarMemu: any;
    handleLogout: () => void;
    handleClick: any;
    handleResponsiveMenu?: any
}
const Overview = ({ open, menu, handleSidebarMemu, handleLogout, handleClick, handleResponsiveMenu }: IOverview) => {
    const [userRole, seUserRole] = useState()
    console.log(userRole, "userRole//")

    const getUserData = async () => {
        try {
            const loginedUserStr: any = localStorage.getItem("loginedUser")
            const loginedUser = JSON.parse(loginedUserStr)
            const { role } = loginedUser;
            seUserRole(role)
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        getUserData();

    }, []);
    return (
        <Grid className={styles.overviewContainer}>
            <Grid container className={styles.overview}>
                <Grid className={styles.overviewSidebar}>
                    <Sidebar />
                </Grid>
                <Grid className={styles.overviewRoutesPage}>
                    <NewHeading
                        open={open}
                        handleClickLogout={handleClick}
                        handleLogout={handleLogout}
                        menu={menu}
                        menuData={menuData}
                        handleSidebarMemu={handleSidebarMemu}
                        handleResponsiveMenu={handleResponsiveMenu} />
                    <RoutesPage />
                </Grid>
            </Grid>
            <ToastContainer />
        </Grid>
    )
}

export default Overview;