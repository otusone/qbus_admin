import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const VendorModal = ({ open, handleClose, fetchData }) => {
    const [formData, setFormData] = useState({
        latitude: "",
        longitude: "",
        vehicleNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Parse latitude and longitude to numbers
        if (name === "latitude" || name === "longitude") {
            setFormData({ ...formData, [name]: parseFloat(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginedUserStr = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserStr);
        const Token = loginedUser.token;

        try {
            const response = await axios.patch(
                "https://qbus-71fd8e240bea.herokuapp.com/api/v1/admin/update-vendor-location",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                }
            );

            if (response.status === 201 || response.status === 200) {
                toast.success("Vendor added successfully!");
                fetchData(); // Refresh vendor list
                handleClose(); // Close modal after successful submission
            }
        } catch (error) {
            console.error("Error adding vendor:", error);
            toast.error("Error adding vendor.");
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    boxShadow: 3,
                    width: '300px',
                    margin: 'auto',
                    marginTop: '100px',
                }}
            >
                <h2>Add Vendor</h2>
                <TextField
                    label="Latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Vehicle Number"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Submit
                </Button>
                <ToastContainer />
            </Box>
        </Modal>
    );
};

export default VendorModal;
