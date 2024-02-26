import React, { Fragment, useEffect, useState } from "react";
import styles from "./VehiclesPage.module.scss";
import { Box, Grid, ListItemButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import EmployeeTable from "../../components/tableData/bookingTable/BookingTable";
// import data from "./data.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeModal from "../../components/modal/EmployeeModal/EmployeeModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePayrollModal from "../../components/modal/CreatePayrollModal/CreatePayrollModal";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import SearchBox from "../../components/common/searchBox/SearchBox";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';


const VehiclesPage = () => {
  const [loading, setLoading] = useState(false);
  const [vehiclesData, setVehiclesData] = useState<any>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://qbus-traveler.onrender.com/api/v1/vehicles/available/list?available=true`)
      console.log(response.data.vehicleTypes, "response")
      setVehiclesData(response.data.vehicleTypes)

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
          heading={"Vehicles"}
          IsHeadingAction={false}
        />
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#00ACB2' }}>
              <TableCell sx={{ textAlign: "center" }}>Image</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
              <TableCell sx={{ textAlign: "center" }}>No of Seats</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Rate Per Km</TableCell>
            </TableHead>
            <TableBody>
              {vehiclesData && vehiclesData.map((item: any) => {
                return (
                  <TableRow>
                    <TableCell sx={{ textAlign: "center" }}>
                      <img src={item.img} width={100} height={80} />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.noOfSeats}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.ratePerKm}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <ToastContainer />
      </Grid>
    </Fragment>
  );
};

export default VehiclesPage;
