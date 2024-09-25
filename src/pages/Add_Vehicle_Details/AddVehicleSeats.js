


import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const AddVehicleSeats = () => {

    const [vehicleSeats, setVehicleSeats] = useState('');
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const loginedUserStr = localStorage.getItem("loginedUser");
            const loginedUser = JSON.parse(loginedUserStr);
            const Token = loginedUser?.token;
            const vehicleSeatsData = {
                "vehicleSeating": vehicleSeats };

            const response = await axios.post(
                "https://qbus.onrender.com/api/v1/admin/add-new-seating-type",
                vehicleSeatsData,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201 || response.status === 200) {
                toast.success("vehicleSeating added successfully!");
            }
        } catch (error) {
            toast.error("Error adding vehicleSeating.");
            console.error("Error:", error);
        }
        setLoading(false);
        setVehicleSeats("")

    };





    return (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
            <Typography variant="h5" gutterBottom>
                Add Vehicle Model
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Vehicle Seats"
                    name="vehicleSeats"
                    value={vehicleSeats}
                    onChange={(e) => setVehicleSeats(e.target.value)}
                    fullWidth
                    margin="normal"

                ></TextField>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                        backgroundColor: "#3FACE2",
                        "&:hover": {
                            backgroundColor: "#35b7cc",
                        },
                    }}
                >
                    {loading ? "Adding..." : "Add vehicleSeats"}
                </Button>


            </form>

        </Box>
    )
}
export default AddVehicleSeats