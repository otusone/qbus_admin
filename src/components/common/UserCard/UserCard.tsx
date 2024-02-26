import React from 'react'
import styles from './UserCard.module.scss'
import { Grid, Box, Typography, ListItemButton, ListItemText } from '@mui/material'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi';
import CommonButton from '../CommonButton/CommonButton';
import { RxAvatar } from "react-icons/rx";
import { MdDelete } from "react-icons/md";

export interface IUserCard {
    label: string;
    image?: string;
    name: string;
    email: string;
    IsButton: boolean;
    IsLabel: boolean;
    handleClick: any
    actionOpen: boolean;
    handleDelete: any;
    handleProfile: () => void;
}
const UserCard = ({ label, name, email, IsButton, handleClick, actionOpen, handleDelete, handleProfile }: IUserCard) => {

    return (
        <Grid className={styles.userCardContainer}>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginInlineEnd: "auto" }}>
                <Typography variant='h5'>{label}</Typography>
                fdfdf
                <PiDotsThreeOutlineVerticalDuotone fontSize={20} onClick={handleClick} cursor={"pointer"} />
            </Box>
            <Box>
                {actionOpen ? <>
                    <ListItemButton onClick={handleDelete} >
                        <MdDelete fontSize={18} style={{ marginInlineEnd: 2, color: "#FF0000" }} />
                        <ListItemText sx={{ textAlign: "left", }} > Delete</ListItemText>
                    </ListItemButton>
                </> : ""}

            </Box>
            <Box onClick={handleProfile}>
                <Box>
                    <RxAvatar fontSize={90} />
                </Box>
                <Typography variant='h4' align='center'>{name}</Typography>
                <Typography align='center'>{email}</Typography>
                {IsButton ? <CommonButton
                    name={"#EMP00001"} onClick={function (): void {
                        throw new Error('Function not implemented.');
                    }} /> : ""}
            </Box>
        </Grid>
    )
}

export default UserCard;