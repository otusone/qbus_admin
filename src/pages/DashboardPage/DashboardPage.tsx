import React, { useEffect, useState } from 'react'
import styles from './DashboardPage.module.scss'
import { Grid, Typography } from '@mui/material'
import Heading from '../../components/Heading/Heading'
import VahiclesModal from '../../components/modal/VahiclesModal/VahiclesModal'
import axios from 'axios'
import { toast } from 'react-toastify'

const DashboardPage = () => {
    const [open, setOpen] = useState(false);
    const handleAddModal = () => setOpen(!open)
    const handleClose = () => setOpen(false)
    const [inputVal, setInputVal] = useState<any>({ venderName: "", name: "", vehicleNumber: "", img: "", desc: "", ratePerKm: "", noOfSeats: "", available: false })
    const [venders, setVenders] = useState<any>()
    const [vendersDetails, setVendersDetails] = useState<any>()
    const [venderId, setVenderId] = useState()
    const [categories, setCategories] = useState();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputVal({ ...inputVal, [name]: value });
        const { email }: any = value;
        const selectedVender = vendersDetails.find((item: any) => item.email === email);
        if (selectedVender) {
            const { _id } = selectedVender;
            setVenderId(_id);
        } else {
            console.error("Selected vendor not found");
        }
    };

    const fetchVerndors = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const Token = loginedUser.token;

        try {
            const response = await axios.get(`https://qbus-71fd8e240bea.herokuapp.com/api/v1/user/vendor/list`,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })
            const data = response.data.vendorData;
            setVendersDetails(data)
            const venderList = data.map((item: any) => ({ name: item.name, email: item.email }))
            setVenders(venderList);

        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };
    const fetchCategories = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const Token = loginedUser.token;
        console.log(Token, "Token")

        try {
            const response = await axios.get(`https://qbus-71fd8e240bea.herokuapp.com/api/v1/vehicles/distinct/vehicles-category/list`,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })
            const data = response.data.categories
            console.log(response, "response..")
            setCategories(data);

        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };


    const handleCreate = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const Token = loginedUser.tokens[loginedUser.tokens.length - 1].token;
        console.log(Token, "Token")
        try {
            const response = await axios.post(`https://qbus-71fd8e240bea.herokuapp.com/api/v1/vehicles/add/new/${venderId}`, inputVal,

                {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })
            if (response.status === 201) {
                setOpen(false)
                toast.success(response.data.message)
                setInputVal({ venderName: "", name: "", vehicleNumber: "", img: "", desc: "", ratePerKm: "", noOfSeats: "", available: false })
            }
        }
        catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchVerndors();
        fetchCategories();
    }, []);
    return (
        <Grid className={styles.dashboardPageContainer}>
            <Heading
                heading='Dashboard'
                IsAction={true}
                handleClick={handleAddModal}
            />
            <VahiclesModal
                open={open}
                venders={venders}
                categories={categories}
                inputVal={inputVal}
                handleChange={handleChange}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </Grid>
    )
}

export default DashboardPage