import React, { Fragment, useEffect, useState } from "react";
import styles from "./BookingPage.module.scss";
import { Box, Grid } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import BookingTable from "../../components/tableData/bookingTable/BookingTable";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BookingPage = () => {
  const navigation = useNavigate()
  const handleClose = () => { };
  const [employeeData, setEmployeeData] = useState<any>([]);
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const loginedUserStr: any = localStorage.getItem("loginedUser");
    const loginedUser = JSON.parse(loginedUserStr);
    const Token = loginedUser.tokens[loginedUser.tokens.length - 1].token;
    console.log(Token, "Token")

    try {
      setLoading(true);
      const response = await axios.get(`https://qbus-traveler.onrender.com/api/v1/booking/get/all/booking/list`,
        {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        })
      const data = response.data.booking
      console.log(response, "response..")
      setEmployeeData(data);

    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Fragment>
      <Grid className={styles.employeePageContainer}>
        <CommonHeading
          heading={""}
          IsHeadingAction={false}
        />
        <BookingTable
          tableTitle={data.tableTitle}
          tableData={employeeData}
        />
        <ToastContainer />
      </Grid>
    </Fragment>
  );
};

export default BookingPage;