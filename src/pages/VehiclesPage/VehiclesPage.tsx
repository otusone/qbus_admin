import React, { Fragment, useEffect, useState } from "react";
import styles from "./VehiclesPage.module.scss";
import { Box, Grid, ListItemButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Link } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import EmployeeTable from "../../components/tableData/bookingTable/BookingTable";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonButton from "../../components/common/CommonButton/CommonButton";
import Heading from "../../components/Heading/Heading";
import { FaRegEdit } from "react-icons/fa";
import ActionModal from "../../components/modal/ActionModal/ActionModal";
import bus from '../../asserst/images/bus-3.png'
import travller from '../../asserst/images/travller.png'
import { MdDelete } from "react-icons/md";
import { manageTypes } from "../../data/Admin_Paths";



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
    const Token = loginedUser.token;
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
    const Token = loginedUser.token;
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

  };
  const handleDelete = async (idx: any) => {
    console.log(idx, "idx..delete")
    const loginedUserStr: any = localStorage.getItem("loginedUser");
    const loginedUser = JSON.parse(loginedUserStr);
    const Token = loginedUser.token;
    try {
      const response = await axios.delete(`https://qbus.onrender.com/api/v1/vehicles/delete/by-id/${idx}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        })
      if (response.status === 200) {
        toast.success(response.data.message)
        await fetchData();
        await fetchavailableData();
      }
    }
    catch (err) {
      console.log(err)
    }

  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://qbus.onrender.com/api/v1/vehicles/all/listed/list`)
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
      const response = await axios.get(`https://qbus.onrender.com/api/v1/vehicles/available/list?available=true`)
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
      <Stack direction="row" spacing={2}>
            {manageTypes.map((type) => (
                <Link key={type.id} href={type.link} underline="hover" color="inherit"
                sx={{
                  backgroundColor: '#00AB8E', 
                  padding: '8px 16px',        
                  borderRadius: '4px',        
                  color: '#fff',             
                  textDecoration: 'none',    
                  '&:hover': {
                    backgroundColor: '#007B5E', 
                  },
                }}
                >
                    <Typography>{type.title}</Typography>
                </Link>
            ))}
        </Stack>
       <Outlet/>
    
        {/* <ToastContainer /> */}
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
