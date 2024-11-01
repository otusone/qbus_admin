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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const NewOnboardVehicle = () => {
  const [vehiclesTypesData, setVehiclesTypesData] = useState([]);
  const [vehiclesRateData, setVehiclesRateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendorDataList, setVendorDataList] = useState([]);

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
    lat: "", // Added lat
    long: "", // Added long
  });

  const fetchVendorList = async () => {
    try {
      const loginedUserStr = localStorage.getItem("loginedUser");
      const loginedUser = JSON.parse(loginedUserStr);
      const Token = loginedUser?.token;
      const response = await axios.get("https://qbus-71fd8e240bea.herokuapp.com/api/v1/user/vendor/list", {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("vendor data ", response.data);
      setVendorDataList(response.data.vendorData);
    } catch (error) {
      console.error("Error fetching vendor list:", error);
    }
  };

  const fetchVehicleRates = async () => {
    try {
      const response = await axios.get("https://qbus-71fd8e240bea.herokuapp.com/api/v1/get-all-rental-vehicle-rate-list");
      console.log("Vehicle rates:", response.data);
      setVehiclesRateData(response.data.rentalVehicleRates);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  };

  const fetchVehicleTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://qbus-71fd8e240bea.herokuapp.com/api/v1/get-all-vehicle-types");
      console.log("Available vehicles response:", response.data.data);
      setVehiclesTypesData(response.data.data); // Assuming the API returns an array of vehicles
    } catch (error) {
      console.error("Error fetching vehicles data:", error);
    } finally {
      setLoading(false);
    }
  };

  const AddNewVehicle = async (data) => {
    setLoading(true); // Show loading state
    try {
      const loginedUserStr = localStorage.getItem("loginedUser");
      const loginedUser = JSON.parse(loginedUserStr);
      const Token = loginedUser?.token;
      console.log("Data to add:", data);

      const response = await axios.post(
        `https://qbus-71fd8e240bea.herokuapp.com/api/v1/vehicles/add/new-vehicle/${formData.vendor}`,
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
      } else {
        const errorMessage = response?.data?.message || "Already used number";
        toast.error(errorMessage); // Show appropriate error message
      }
    } catch (error) {
      console.error("Error adding new vehicle:", error);
      if (error.response?.data?.message === "Already used number") {
        toast.error("Already used number");
      } else {
        toast.error("Error adding vehicle.");
      }
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  useEffect(() => {
    fetchVehicleTypes();
    fetchVehicleRates();
    fetchVendorList();
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
      lat: "", // Reset lat
      long: "", // Reset long
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Onboard Vehicle
      </Typography>

      <form onSubmit={handleSubmit}>

        <TextField
          select
          label="Vendor"
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
          Amenities:
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

        {/* Added Latitude Field */}
        <TextField
          label="Latitude"
          name="lat"
          value={formData.lat}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number" // Optional: enforce number input
        />

        {/* Added Longitude Field */}
        <TextField
          label="Longitude"
          name="long"
          value={formData.long}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number" // Optional: enforce number input
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
