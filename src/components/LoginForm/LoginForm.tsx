import React, { useEffect, useState } from 'react'
import styles from './LoginForm.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import InputField from '../inputField/InputField'
import CommonButton from '../common/CommonButton/CommonButton'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

export interface ILoginForm {
    inputData: any,
    handleChange: any;
    handleClick: any;

}



const LoginForm = ({inputData, handleChange, handleClick }: ILoginForm) => {


    const navigate = useNavigate();

    // useEffect(() => {
    //     if (localStorage.getItem("loginedUser")) {
    //         navigate("/manage");
    //     }
    // }, [navigate]);

    return (
        <Grid className={styles.loginFormContainer}>
            <Typography marginBlockEnd={4} variant='h4' fontSize={29} fontWeight={600}>Welcome
                <span style={{ color: "#3FACE2", paddingInlineStart: 10 }}>
                    to login!
                </span>
            </Typography>
            <Box>
                <InputField
                    label={'Email'}
                    name={'email'}
                    placeholder={'example@gmail.com'}
                    value={inputData.email}
                    handleChange={handleChange}
                    type={"email"}
                />
                <InputField
                    label={'Password'}
                    name={'password'}
                    placeholder={'*****'}
                    value={inputData.password}
                    handleChange={handleChange}
                    type={"password"}
                />
            </Box>
            <CommonButton
                name={"Login"}
                onClick={handleClick}
            />
            <Typography style={{ color: "#3FACE2", cursor: "pointer" }}> Kindly contact to HR, if you forgot your Password?</Typography>
        </Grid>
    )
}

export default LoginForm