import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const AddVehicleModel = () => {

    const [vehicleModel, setVehicleModel] = useState('');
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const loginedUserStr = localStorage.getItem("loginedUser");
            const loginedUser = JSON.parse(loginedUserStr);
            const Token = loginedUser?.token;
            console.log("vechiModel", vehicleModel)
            const vehicleModelData = {
                "vehicleModel": vehicleModel };

            const response = await axios.post(
                "https://qbus.onrender.com/api/v1/admin/add-new-vehicle-modal",
                vehicleModelData,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201 || response.status === 200) {
                toast.success("Vehicle added successfully!");
            }
        } catch (error) {
            toast.error("Error adding vehicle.");
            console.error("Error:", error);
        }
        setLoading(false);
        setVehicleModel("")

    };





    return (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
            <Typography variant="h5" gutterBottom>
                Add Vehicle Model
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Vehicle Model"
                    name="vehicleModel"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
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
                    {loading ? "Adding..." : "Add Vehicle"}
                </Button>


            </form>

        </Box>
    )
}
export default AddVehicleModel