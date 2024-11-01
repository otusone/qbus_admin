import React, { useEffect, useState } from 'react'
import { Grid, Box, MenuList, MenuItem, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import logo from '../../asserst/logo.jpg'
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbPoint } from "react-icons/tb";
import { menuData } from './menuData'

export interface ISidebar {
    handleResponsiveMenu?: any;
}

const Sidebar = ({ handleResponsiveMenu }: ISidebar) => {
    const [show, setShow] = useState(false);
    const [role, setRole] = useState<string | null>('')
    const [userRole, setUserRole] = useState("HR");

    const navigation = useNavigate()
    const location = useLocation()
    const path = location.pathname
    const handleMenu = async () => {
        console.log("menu")
        try {
            if (path === '/pay-slip-form' || path === '/salary-calculation') {
                setShow(true);
            } else {
                setShow(!show);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const userRole = localStorage.getItem("userRole")
        setRole(userRole)

    }, [])
    return (
        <Grid className={styles.sidebarContainer}>
       <Box sx={{ width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
  <img
    src={logo}
    alt="logo"
    style={{
      width: "119px", 
      height: "95px", 
      objectFit: "cover",
      maxWidth: "100%",
      maxHeight: "100%",
    }}
  />
</Box>            <Grid>
                {menuData?.map((item: any) => {
                    return (
                        <Grid key={item.id} className={styles.sidebarMenu}>
                            <MenuList onClick={handleResponsiveMenu}>
                                <MenuList onClick={item.subMenu && item.subMenu.length > 0 ? handleMenu : () => navigation(item.link)} className={path == item.link ? styles.activeMenu : styles.inActiveMenu}>
                                    <MenuItem>  {item.icon}{item.title} {item.subMenu && item.subMenu.length > 0 ? <MdKeyboardArrowDown style={{ backgroundColor: "transparent", boxShadow: "unset" }} /> : ""}</MenuItem>
                                    {show && <>
                                        {item.subMenu?.map((item: any) => {
                                            return (
                                                <MenuList onClick={() => navigation(item.link)} className={path == item.link ? styles.activeMenu : styles.inActiveMenu}>
                                                    <MenuItem className={styles.subMenu}> <TbPoint /> {item.title}</MenuItem>
                                                </MenuList>
                                            )
                                        })}
                                    </>}
                                </MenuList>
                            </MenuList>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid className={styles.logout}>
                <Box display={"flex"} sx={{ paddingInline: 2, paddingBlockEnd: 1 }} >
                    <Typography fontSize={14} sx={{ cursor: "pointer", "&:hover": { color: "#3FACE" } }} onClick={(() => navigation('/company-policy'))}>*Company policy</Typography>
                    <Typography fontSize={14} sx={{ cursor: "pointer", "&:hover": { color: "#3FACE" } }} paddingInlineStart={1}
                        onClick={(() => navigation('/leave-policy'))}>*Leave policy</Typography>
                </Box>
                {/* <MenuList onClick={handleLogout}>
                    <MenuItem>Version: 3.0.3</MenuItem>
                </MenuList> */}
            </Grid>
        </Grid>
    )
}

export default Sidebar;