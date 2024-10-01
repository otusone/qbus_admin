import React, { Fragment, useEffect, useState } from "react";
import styles from "./BookingPage.module.scss";
import { Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import BookingTable from "../../components/tableData/bookingTable/BookingTable";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Heading from "../../components/Heading/Heading"; 
import 'react-toastify/dist/ReactToastify.css';

const BookingPage = () => {
  const navigation = useNavigate();
  const [bookings, setBookings] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [tripStatus, setTripStatus] = useState('Scheduled');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async () => {
    const loginedUserStr: any = localStorage.getItem("loginedUser");
    const loginedUser = JSON.parse(loginedUserStr);
    const Token = loginedUser.token;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://qbus.onrender.com/api/v1/booking/filter-booking-list?tripStatus=${tripStatus}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const data = response.data.bookings;
  
      if (data.length === 0) {
      
        // toast.info("No bookings found for the selected filters.");
      }
  
      setBookings(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setBookings(null);
          // toast.error("No bookings found.");
        } else {
          // toast.error("Failed to fetch bookings.");
          setBookings(null);
        }
        console.error(
          "Error fetching bookings data:",
          error?.response?.data?.error || error.message
        );
      } else {
        setBookings(null);
        // For non-Axios errors, you can handle them differently or just log them
        console.error("An unexpected error occurred:", error);
        // toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(); // Fetch data with current filter values
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  return (
    <Fragment>
      <Grid container className={styles.employeePageContainer} spacing={2} alignItems="center">
        {/* Booking Heading */}
        <Grid item xs={12}>
          <Heading heading="Bookings" />
        </Grid>

        {/* Form to Filter Bookings */}
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Box display="flex" alignItems="center"> 
              <Box marginRight={2} flexGrow={1}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="trip-status-label">Trip Status</InputLabel>
                  <Select
                    sx={{ height: "3.5rem" }}
                    labelId="trip-status-label"
                    value={tripStatus}
                    onChange={(e) => setTripStatus(e.target.value)}
                    label="Trip Status"
                  >
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box marginRight={2} flexGrow={1}>
                <TextField
                  sx={{ height: "3.5rem" }} 
                  variant="outlined"
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Box>
              <Box marginRight={2} flexGrow={1}>
                <TextField
                  sx={{ height: "3.5rem" }} 
                  variant="outlined"
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Box>
              <Button
              disabled={loading?true:false}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ height: "3.5rem" }} 
              >
               {loading?"Loading...":" Search"}
              </Button>
            </Box>
          </form>
        </Grid>
        
        {/* Bookings Table */}
        <Grid item xs={12}>
          <BookingTable
            tableTitle={data.tableTitle}
            tableData={bookings}
            loading={loading}
          />
        </Grid>

        <ToastContainer />
      </Grid>
    </Fragment>
  );
};

export default BookingPage;
