import React, { useState, useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VehiclesModalList = () => {
  const [actionModal, setActionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehiclesModelData, setVehiclesModelData] = useState([]); // Removed `any`
  const [vehiclesId, setVehiclesId] = useState(null);

  const handleAction = (id) => {
    setActionModal(!actionModal);
    setVehiclesId(id);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://qbus.onrender.com/api/v1/get-all-vehicle-modal`);
      console.log("data from req", response.data)
      setVehiclesModelData(response.data); // Assuming the API returns an array of vehicles
    } catch (error) {
      console.error("Error fetching vehicles data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const loginedUserStr = localStorage.getItem("loginedUser");
    const loginedUser = JSON.parse(loginedUserStr);
    const Token = loginedUser.token;
    try {
      const response = await axios.delete(`https://qbus.onrender.com/api/v1/admin/delete-particular-vehicle-madal/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        await fetchData();
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Failed to delete vehicle.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box>
      <Typography variant="h5"> Vehicles Modal</Typography>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#3FACE2' }}>
            <TableRow>
              <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Vehicle Type</TableCell>
              <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Modal</TableCell>
              <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehiclesModelData?.map((item) => (
              <TableRow key={item._id}>
                <TableCell sx={{ textAlign: "center" }}>{item._id}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{item.vehicleModel}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <FaRegEdit fontSize={25} style={{ cursor: "pointer" }} onClick={() => handleAction(item._id)} />
                  <MdDelete fontSize={25} style={{ cursor: "pointer", color: "red" }} onClick={() => handleDelete(item._id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Box>
  );
};

export default VehiclesModalList;
