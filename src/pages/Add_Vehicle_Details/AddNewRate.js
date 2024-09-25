import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const AddNewRate = () => {

    const [ratePerKm, setRatePerKm] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const loginedUserStr = localStorage.getItem("loginedUser");
            const loginedUser = JSON.parse(loginedUserStr);
            const Token = loginedUser?.token;
            const RateonPerKM = {
                "ratePerKm": ratePerKm
            };
            const response = await axios.post(
                "https://qbus.onrender.com/api/v1//admin/add-new-rate-per-km",
                RateonPerKM,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 201 || response.status === 200) {
                toast.success("ratePerKm added successfully!");
            }
        } catch (error) {
            toast.error("Error adding ratePerKm.");
            console.error("Error:", error);
        }
        setLoading(false);
        setRatePerKm("")
    };





    return (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
            <Typography variant="h5" gutterBottom>
                Add Rate Per Km
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Rate /Km"
                    name="ratePerKm"
                    value={ratePerKm}
                    onChange={(e) => setRatePerKm(e.target.value)}
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
                    {loading ? "Adding..." : "Add Rate "}
                </Button>


            </form>

        </Box>
    )
}
export default AddNewRate