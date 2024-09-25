import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import axios, { Axios } from "axios";
import { ToastContainer, toast } from "react-toastify";

const NewOnboardVehicle = () => {
  const [vehiclesTypesData, setVehiclesTypesData] = useState([]);
  const [vehiclesRateData, setVehiclesRateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendorDataList, setVendorDataList] = useState([])

  const [formData, setFormData] = useState({
    vendor: "",
    vehicleNumber: "",
    desc: "",
    vehicleRate: "",
    vehicle: "",
    available: true,
    img: "",
    aminities: [],
    contactNumber: "",
  });


  const fetchVendorList = async () => {
    try {
      const loginedUserStr = localStorage.getItem("loginedUser");
      const loginedUser = JSON.parse(loginedUserStr);
      const Token = loginedUser?.token;
      const response = await axios.get("https://qbus.onrender.com/api/v1/user/vendor/list",
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        }
      )
      console.log("vendor data ", response.data)
      setVendorDataList(response.data.vendorData)
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }

  // Fetch vehicle rates
  const fetchVehicleRates = async () => {
    try {
      const response = await axios.get(
        "https://qbus.onrender.com/api/v1//get-all-rental-vehicle-rate-list"
      );
      console.log("ggg", response.data)
      setVehiclesRateData(response.data.rentalVehicleRates);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  };


  const fetchVehicleTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://qbus.onrender.com/api/v1/get-all-vehicle-types`);
      console.log(response.data.data, "Available vehicles response");
      setVehiclesTypesData(response.data.data); // Assuming the API returns an array of vehicles
    } catch (error) {
      console.error("Error fetching vehicles data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add new vehicle function
  const AddNewVehicle = async (data) => {
    setLoading(true);
    try {
      const loginedUserStr = localStorage.getItem("loginedUser");
      const loginedUser = JSON.parse(loginedUserStr);
      const Token = loginedUser?.token;
      console.log(data)

      const response = await axios.post(
        `https://qbus.onrender.com/api/v1/vehicles/add/new-vehicle/${formData.vendor}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Vehicle added successfully:", response.data);
        toast.success("Vehicle added successfully!");
      }
    } catch (error) {
      console.error("Error adding new vehicle:", error);
      toast.error("Error adding vehicle.");
    }
    setLoading(false);
  };


  useEffect(() => {
    fetchVehicleTypes();
    fetchVehicleRates();
    fetchVendorList();
    fetchVehicleTypes()
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAminitiesChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const aminities = prevFormData.aminities.includes(value)
        ? prevFormData.aminities.filter((aminity) => aminity !== value)
        : [...prevFormData.aminities, value];
      return { ...prevFormData, aminities };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddNewVehicle(formData); // Pass the form data as payload
    } catch (error) {
      toast.error("Error adding vehicle.");
    }
    setFormData({
      vendor: "",
      vehicleNumber: "",
      desc: "",
      vehicleRate: "",
      vehicle: "",
      available: true,
      img: "",
      aminities: [],
      contactNumber: "",
    })
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Onboard Vehicle
      </Typography>

      <form onSubmit={handleSubmit}>

        <TextField
          select
          label="vendor "
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {vendorDataList?.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name}{"  ("}{item.mobileNumber}{")"}
            </MenuItem>
          ))}
        </TextField>


        <TextField
          label="Vehicle Number"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Description"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          select
          label="Vehicle Rate"
          name="vehicleRate"
          value={formData.vehicleRate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >

          {vehiclesRateData?.map((v) => (
            <MenuItem key={v._id} value={v._id}>
              {v.vehicleType.vehicleType}{"-- Model--("}{v?.model?.vehicleModel}{")--seats("}{v.seating.vehicleSeating}{")--rate/km("}{v.ratePerKm.ratePerKm}{")--chargeDy/Night("}{v?.driverChargePerDayOrNight}{")--min-Run/Day("}{v?.minimumRunPerDay}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Vehicle Types"
          name="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {vehiclesTypesData?.map((v) => (
            <MenuItem key={v._id} value={v.vehicleType}>
              {v.vehicleType}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
          }
          label="Available"
        />

        <TextField
          label="Image URL"
          name="img"
          value={formData.img}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Typography variant="subtitle1" gutterBottom>
          Aminities:
        </Typography>
        {["AC", "Music", "Pushback Seats", "GPS"].map((aminity) => (
          <FormControlLabel
            key={aminity}
            control={
              <Checkbox
                value={aminity}
                checked={formData.aminities.includes(aminity)}
                onChange={handleAminitiesChange}
              />
            }
            label={aminity}
          />
        ))}

        <TextField
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
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
              backgroundColor: "#35b7cc",
            },
          }}
        >
          {loading ? "Adding..." : "Add Onboard Vehicle"}
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default NewOnboardVehicle;
