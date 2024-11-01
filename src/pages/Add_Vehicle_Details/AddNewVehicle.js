import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddNewVehicleRental = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [seatingTypes, setSeatingTypes] = useState([]);
  const [vehicleRates, setVehicleRates] = useState([]);

  const [formData, setFormData] = useState({
    vehicleType: "",
    model: "",
    seating: "",
    ratePerKm: "",
    driverChargePerDayOrNight: "",
    minimumRunPerDay: "",
    img: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch vehicle types
  const fetchVehicleTypes = async () => {
    try {
      const response = await axios.get(
        "https://qbus-71fd8e240bea.herokuapp.com/api/v1/get-all-vehicle-types"
      );
      setVehicleTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
    }
  };

  // Fetch vehicle models
  const fetchVehicleModels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://qbus-71fd8e240bea.herokuapp.com/api/v1/get-all-vehicle-modal`);
      setVehicleModels(response.data); // Assuming the API returns an array of vehicles
    } catch (error) {
      console.error("Error fetching vehicles data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch seating types
  const fetchSeatingTypes = async () => {
    try {
      const response = await axios.get(
        "https://qbus-71fd8e240bea.herokuapp.com/api/v1/get-all-seating-type-list"
      );
      console.log("data from req", response.data)

      setSeatingTypes(response.data);
    } catch (error) {
      console.error("Error fetching seating types:", error);
    }
  };

  // Fetch rates per kilometer
  const fetchVehicleRates = async () => {
    try {
      const response = await axios.get(
        "https://qbus-71fd8e240bea.herokuapp.com/api/v1/get-all-rates-per-km-list"
      );
      setVehicleRates(response.data);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  };

  // Fetch all required data on component mount
  useEffect(() => {
    fetchVehicleTypes();
    fetchVehicleModels();
    fetchSeatingTypes();
    fetchVehicleRates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginedUserStr = localStorage.getItem("loginedUser");
      const loginedUser = JSON.parse(loginedUserStr);
      const Token = loginedUser?.token;

      const response = await axios.post(
        "https://qbus-71fd8e240bea.herokuapp.com/api/v1/admin/add-new-rental-vehicle-rate",
        formData,
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

    setFormData({
      vehicleType: "",
      model: "",
      seating: "",
      ratePerKm: "",
      driverChargePerDayOrNight: "",
      minimumRunPerDay: "",
      img: "",
    }
    )
  };


  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Vehicle
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Vehicle Type"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {vehicleTypes?.map((type) => (
            <MenuItem key={type._id} value={type._id}>
              {type.vehicleType}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Vehicle Model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {vehicleModels?.map((model) => (
            <MenuItem key={model._id} value={model._id}>
              {model.vehicleModel}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Seating Type"
          name="seating"
          value={formData.seating}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {seatingTypes?.map((seat) => (
            <MenuItem key={seat._id} value={seat._id}>
              {seat.vehicleSeating}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Rate Per Km"
          name="ratePerKm"
          value={formData.ratePerKm}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {vehicleRates?.map((rate) => (
            <MenuItem key={rate._id} value={rate._id}>
              {rate.ratePerKm}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Driver Charge Per Day/Night"
          name="driverChargePerDayOrNight"
          value={formData.driverChargePerDayOrNight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Minimum Run Per Day (Km)"
          name="minimumRunPerDay"
          value={formData.minimumRunPerDay}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Image URL"
          name="img"
          value={formData.img}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            backgroundColor: "#3FACE2",
            "&:hover": {
              backgroundColor: "#35b7cc", // optional hover color
            },
          }}
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </Button>
      </form>

      <ToastContainer />
    </Box>
  );
};

export default AddNewVehicleRental;
