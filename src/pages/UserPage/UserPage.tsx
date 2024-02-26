import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import styles from './UserPage.module.scss'
import { Grid, Typography } from '@mui/material'
import User from '../../components/user/User'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import UserModal from '../../components/modal/UserModal/UserModal'

const UserPage = () => {
    const navigation = useNavigate();
    const [open, setOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false)
    const handleAddUserModal = () => setOpen(!open);
    const handleClose = () => setOpen(false)

    const [inputVal, setInputVal] = useState<any>({ name: "", email: "", password: "", mobileNumber: "", role: "", deviceToken: "vendordevicetokenabc" })

    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false);

    const handleGlobalModal = () => {

        const values = Object.values(actionOpen);

        if (values.includes(true)) {
            setActionOpen(false);
        }
    };
    const getUserData = async () => {
        try {
            // const response = await axios.get(``)

        }
        catch (err) {
            console.log(err)
        }

    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputVal({ ...inputVal, [name]: value })
    };
    const handleCreateUser = async () => {
        if (inputVal.name === "" || inputVal.email === "" || inputVal.mobileNumber === "" || inputVal.role === "" || inputVal.password === "") {
            toast.error("Plase fill all the input field!")
        }
        try {
            const response = await axios.post(`https://qbus-traveler.onrender.com/api/v1/user/signup`, inputVal)
            console.log(response, "response..")
            if (response.status === 201) {
                toast.success(response.data.message);
                setOpen(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);



    return (
        <Grid onClick={handleGlobalModal} className={styles.staffPageContainer}>
            <User
                data={userData}
                handleClick={handleAddUserModal}
                handleAction={undefined}
                loading={loading}
                actionOpen={actionOpen}
                handleEdit={undefined}
                handleProfile={undefined}
                handleDelete={undefined}
            />
            <UserModal
                open={open}
                inputVal={inputVal}
                handleClose={handleClose}
                handleCreateUser={handleCreateUser}
                handleChange={handleChange}
            />

            <ToastContainer />
        </Grid>
    )
}

export default UserPage
