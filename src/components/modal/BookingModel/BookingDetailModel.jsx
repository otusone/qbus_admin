import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';



const BookingDetailsModal = ({ open, handleClose, item }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
    <DialogTitle>
      <Typography variant="h6" fontWeight="bold">
        Booking Details
      </Typography>
    </DialogTitle>
    <DialogContent dividers>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left"><strong>Field</strong></TableCell>
              <TableCell align="left"><strong>Value</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Basic Booking Information */}
            <TableRow>
              <TableCell><strong>Source</strong></TableCell>
              <TableCell>{item?.source || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Destination</strong></TableCell>
              <TableCell>{item?.destination || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Pickup Date</strong></TableCell>
              <TableCell>{item?.pickupDate ? new Date(item.pickupDate).toLocaleDateString() : 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Dropoff Date</strong></TableCell>
              <TableCell>{item?.dropoffDate ? new Date(item.dropoffDate).toLocaleDateString() : 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Passenger Name</strong></TableCell>
              <TableCell>{`${item?.passengerDetails?.firstName || ''} ${item?.passengerDetails?.middleName || ''} ${item?.passengerDetails?.lastName || ''}`.trim() || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Mobile Number</strong></TableCell>
              <TableCell>{item?.passengerDetails?.mobileNumber || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Total Payable Amount</strong></TableCell>
              <TableCell>{item?.totalPayableAmount?.toFixed(2) || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Advance Payment</strong></TableCell>
              <TableCell>{item?.payment?.advancePayment?.amount?.toFixed(2) || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Pending Amount</strong></TableCell>
              <TableCell>{item?.payment?.pendingAmount?.amount?.toFixed(2) || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Quotation (without GST)</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Quotation_without_GST || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Total Seats</strong></TableCell>
              <TableCell>{item?.totalSeat || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Vehicle Model</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Model || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Trip Start DateTime</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Trip_Start_DateTime ? new Date(item.quotationDetails.Trip_Start_DateTime).toLocaleString() : 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Trip End DateTime</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Trip_End_DateTime ? new Date(item.quotationDetails.Trip_End_DateTime).toLocaleString() : 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>In-Between Cities</strong></TableCell>
              <TableCell>
                {item?.inBetweenCities?.length > 0 ? (
                  <ul>
                    {item.inBetweenCities.map((city, index) => (
                      <li key={index}>{city.address}</li>
                    ))}
                  </ul>
                ) : (
                  'No cities in between.'
                )}
              </TableCell>
            </TableRow>

            {/* Quotation Details */}
            <TableRow>
              <TableCell><strong>Booking Advance</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Booking_Advance || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Distance Rate</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Distance_Rate || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Driver Allowance</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Driver_Allowance || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Driver Charge</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Driver_Charge || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>GST</strong></TableCell>
              <TableCell>{item?.quotationDetails?.GST || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Manual Distance</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Manual_Distance || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Max Distance</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Max_Distance || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Minimum Run</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Minimum_Run || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Net Payable</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Net_Payable?.toFixed(2) || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Rate Km</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Rate_Km || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Toll Tax</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Toll_Tax || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Trip Days</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Trip_Days || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Trip Distance</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Trip_Distance || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Vehicle Type</strong></TableCell>
              <TableCell>{item?.quotationDetails?.Vehicle_Type || 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  );
};

export default BookingDetailsModal;
