import React, { Fragment, useEffect, useState } from "react";
import styles from "./VendorPage.module.scss";
import { Box, Grid, ListItemButton, Typography,Stack,Button } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import EmployeeTable from "../../components/tableData/bookingTable/BookingTable";
// import data from "./data.json";
import VendorModal from "../../components/modal/venderModel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonButton from "../../components/common/CommonButton/CommonButton";
import SearchBox from "../../components/common/searchBox/SearchBox";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import VendorTable from "../../components/tableData/VendorTable/VendorTable";
import Heading from "../../components/Heading/Heading";


const VendorPage = () => {
    const [venders, setVenders] = useState()
    const [modalOpen, setModalOpen] = useState(false);
    const fetchData = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const Token = loginedUser.token;
        console.log(Token, "Token")

        try {

            const response = await axios.get(`https://qbus-71fd8e240bea.herokuapp.com/api/v1/user/vendor/list`,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })
            const data = response.data.vendorData
            setVenders(data)
            console.log(data, "response..")

        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };
    const handleDelete = async (idx: any) => {
        console.log(idx, "idx...")
        console.log(idx, "idx..delete")
        const loginedUserStr: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const Token = loginedUser.token;
        try {
            const response = await axios.delete(`https://qbus-71fd8e240bea.herokuapp.com/api/v1/user/delete/by-id/${idx}`,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })
            if (response.status === 200) {
                toast.success(response.data.message)
                await fetchData();
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Fragment>
            <Grid className={styles.employeePageContainer}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Heading heading="Vendors" />
                    <Button onClick={() => setModalOpen(true)} variant="contained">
                        Add Vendor lat & Long
                    </Button>
                </Stack>
                <VendorTable
                    data={venders}
                    handleDelete={handleDelete}
                />
                <ToastContainer />
                <VendorModal open={modalOpen} handleClose={() => setModalOpen(false)} fetchData={fetchData} />

            </Grid>
        </Fragment>
    );
};

export default VendorPage;
