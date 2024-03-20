import React, { Fragment, useEffect, useState } from "react";
import styles from "./VehiclesPage.module.scss";
import { Box, Grid, ListItemButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import EmployeeTable from "../../components/tableData/bookingTable/BookingTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonButton from "../../components/common/CommonButton/CommonButton";
import Heading from "../../components/Heading/Heading";

import { FaRegEdit } from "react-icons/fa";
import ActionModal from "../../components/modal/ActionModal/ActionModal";


const VehiclesPage = () => {
  const [actionModal, setActionModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [vehiclesData, setVehiclesData] = useState<any>();
  const [availvehiclesData, setAvailVehiclesData] = useState<any>();

  const [vehiclesId, setVehiclesId] = useState()
  const [avai, setAvai] = useState({ available: "available" })
  const [inputVal, setInputVal] = useState({ ratePerKm: "", noOfSeats: "", available: "available" })

  const handleClose = () => setActionModal(false)
  const handleAction = (idx: any) => {
    setActionModal(!actionModal)
    setVehiclesId(idx)
  }
  const handleChangeAvailability = (e: any) => {
    const { name, value } = e.target;
    setAvai({ ...avai, [name]: value })
  }

  const handleavAilability = async () => {
    const loginedUserStr: any = localStorage.getItem("loginedUser");
    const loginedUser = JSON.parse(loginedUserStr);
    const Token = loginedUser.tokens[loginedUser.tokens.length - 1].token;
    try {
      const response = await axios.patch(`https://qbus.onrender.com/api/v1/vehicles/update/vehicles/availability/${vehiclesId}`, avai,
        {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        })
      if (response.status === 200) {
        fetchData();
        toast.success(response.data.message)
        setActionModal(false)
      }

    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  }
  const handleChangeUpdate = (e: any) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value })
  };
  const handleUpdate = async () => {
    const loginedUserStr: any = localStorage.getItem("loginedUser");
    const loginedUser = JSON.parse(loginedUserStr);
    const Token = loginedUser.tokens[loginedUser.tokens.length - 1].token;
    try {
      const response = await axios.patch(`https://qbus.onrender.com/api/v1/vehicles/partial/vehicles-update/${vehiclesId}`, inputVal,
        {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        })
      if (response.status === 200) {
        fetchData();
        toast.success(response.data.message)
        setActionModal(false)
      }

    } catch (error) {
      console.error("Error fetching employee data:", error);
    }

  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://qbus-traveler.onrender.com/api/v1/vehicles/all/listed/list`)
      console.log(response.data.vehicleTypes, "response lis")
      setVehiclesData(response.data.vehicleTypes)

    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false)
    }
  };
  const fetchavailableData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://qbus-traveler.onrender.com/api/v1/vehicles/available/list?available=true`)
      console.log(response.data.vehicleTypes, "response ava")
      setAvailVehiclesData(response.data.vehicleTypes)

    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
    fetchavailableData()
  }, []);


  return (
    <Fragment>
      <Grid className={styles.employeePageContainer}>
        <Box>
          <Heading heading="Vehicles" />
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#00ACB2' }}>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Vendor Name</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Vendor Email</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Vendor Phone</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Image</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Categories</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Vehicle Number</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>No of Seats</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Rate Per Km</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Action</TableCell>
              </TableHead>
              <TableBody>
                {vehiclesData && vehiclesData.map((item: any) => {
                  return (
                    <TableRow>
                      <TableCell sx={{ textAlign: "center" }}>{item?.venderId?.name}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item?.venderId?.email}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item?.venderId?.mobileNumber}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <img src={item.img} width={100} height={80} />
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item.vehicleNumber}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item.noOfSeats}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item.ratePerKm}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item.available === true ? "Available" : "Not Available"}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <FaRegEdit fontSize={25} style={{ cursor: "pointer" }} onClick={(() => handleAction(item._id))} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Heading heading="Available Vehicles" />
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#00ACB2' }}>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Vendor Name</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Vendor Email</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Vendor Phone</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Image</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Categories</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Vehicle Number</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>No of Seats</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Rate Per Km</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Action</TableCell>
              </TableHead>
              <TableBody>
                {availvehiclesData && availvehiclesData.map((item: any) => {
                  return (
                    <TableRow>
                      <TableCell sx={{ textAlign: "center" }}>{item?.venderId?.name}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item?.venderId?.email}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item?.venderId?.mobileNumber}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <img src={item.img} width={100} height={80} />
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item.vehicleNumber}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item.noOfSeats}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item.ratePerKm}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{item.available === true ? "Available" : "Not Available"}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <FaRegEdit fontSize={25} style={{ cursor: "pointer" }} onClick={(() => handleAction(item._id))} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <ToastContainer />
      </Grid>
      <ActionModal
        open={actionModal}
        handleClose={handleClose}
        handleClick={handleavAilability}
        inputVal={inputVal}
        handleChangeUpdate={handleChangeUpdate}
        handleUpdate={handleUpdate}
        handleChangeAvailability={handleChangeAvailability}
      />
    </Fragment>
  );
};

export default VehiclesPage;
