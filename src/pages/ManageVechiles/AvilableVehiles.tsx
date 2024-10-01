import React,{useState,useEffect} from "react";
import { Box, Grid, ListItemButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import styles from "./VehiclesPage.module.scss";
import EmployeeTable from "../../components/tableData/bookingTable/BookingTable";
import { useNavigate } from "react-router-dom";
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
const AvailableVechiles=()=>{
  const [actionModal, setActionModal] = useState(false)
    const [loading, setLoading] = useState(false);
  const [vehiclesData, setVehiclesData] = useState<any>();
  const [availvehiclesData, setAvailVehiclesData] = useState<any>();

  const [vehiclesId, setVehiclesId] = useState()
  const [avai, setAvai] = useState({ available: "available" })
  const [inputVal, setInputVal] = useState({ ratePerKm: "", noOfSeats: "", available: "available" })


    const handleAction = (idx: any) => {
        setActionModal(!actionModal)
        setVehiclesId(idx)
      }

    const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`https://qbus-71fd8e240bea.herokuapp.com/api/v1/vehicles/all/listed/list`)
          console.log(response.data.vehicleTypes, "response lis")
          setVehiclesData(response.data.vehicleTypes)
    
        } catch (error) {
          console.error("Error fetching employee data:", error);
        } finally {
          setLoading(false)
        }
      };

      const handleDelete = async (idx: any) => {
        console.log(idx, "idx..delete")
        const loginedUserStr: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const Token = loginedUser.token;
        try {
          const response = await axios.delete(`https://qbus-71fd8e240bea.herokuapp.com/api/v1/vehicles/delete/by-id/${idx}`,
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

      function removeSpaces(inputString:string) {
        return inputString.replace(/\s+/g, '');
    }
     
      
      
  useEffect(() => {
    fetchData();
   
  }, []);

    
    return(
        <Box>
        <Heading heading="All Listed Vehicles" />
        <TableContainer className={styles.tableContainer}>
          <Table>
            <TableHead sx={{ backgroundColor: '#3FACE2' }}>
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
                      {item.name === "Bus" ?
                        <img src={bus} width={120} height={80} />
                        :
                        <img src={travller} width={120} height={80} />}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>      {removeSpaces(item?.vehicleNumber)}
    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.noOfSeats}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.ratePerKm}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.available === true ? "Available" : "Not Available"}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {/* <FaRegEdit fontSize={25} style={{ cursor: "pointer" }} onClick={(() => handleAction(item._id))} /> */}
                      <MdDelete fontSize={25} style={{ cursor: "pointer", color: "red" }} onClick={(() => handleDelete(item._id))} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
}
export default AvailableVechiles;