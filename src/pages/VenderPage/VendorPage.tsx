import React, { Fragment, useEffect, useState } from "react";
import styles from "./VendorPage.module.scss";
import { Box, Grid, ListItemButton, Typography } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import EmployeeTable from "../../components/tableData/bookingTable/BookingTable";
// import data from "./data.json";
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

    const fetchData = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const Token = loginedUser.tokens[loginedUser.tokens.length - 1].token;
        console.log(Token, "Token")

        try {

            const response = await axios.get(`https://qbus.onrender.com/api/v1/user/vendor/list`,
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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Fragment>
            <Grid className={styles.employeePageContainer}>
                <Heading heading="Vendors"/>
                <VendorTable data={venders} />
                <ToastContainer />
            </Grid>
        </Fragment>
    );
};

export default VendorPage;
