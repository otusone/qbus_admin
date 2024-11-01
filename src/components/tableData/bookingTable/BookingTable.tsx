import React, { useState } from "react";
import styles from "./BookingTable.module.scss";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaEye } from "react-icons/fa";
import BookingDetailsModal from "../../modal/BookingModel/BookingDetailModel";
// Assuming this is your IBookingTable interface
export interface IBookingTable {
  tableTitle: { id: number; title: string }[];
  tableData: any[];
  loading?: boolean; // Make it optional if you want
}


const BookingTable = ({ tableTitle, tableData }: IBookingTable) => {
  const [openModel, setOpenModel] = useState(false);
  const [selectedViewBookingData, setSelectedViewBookingData] = useState<any>(null);
  const [query, setQuery] = useState("");

  const formattedDate = (idx: any) => {
    const date = new Date(idx);
    return date.toLocaleDateString();
  };

  const handleSelectedViewBookingData = (item: any) => {
    setSelectedViewBookingData(item); 
    setOpenModel(true); 
    console.log("Data selected", item);
  };

  const handleCloseModal = () => {
    setOpenModel(false); 
    setSelectedViewBookingData(null);
  };

  return (
    <Grid className={styles.bookingTableContainer}>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead style={{ backgroundColor: "#3FACE2" }}>
            <TableRow>
              {tableTitle.map((item: any) => (
                <TableCell
                  key={item.title} // Added a key prop
                  style={{ color: "#000000", textAlign: "left", fontSize: 15, fontWeight: 600 }}
                >
                  {item.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData
                .filter((employee: { name: string }) => {
                  return (
                    query === "" ||
                    (employee.name?.toLowerCase().includes(query.toLowerCase()) ?? false)
                  );
                })
                .map((item: any, idx: any) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ textAlign: "left" }}>{item?.passengerDetails?.firstName}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.userId?.email}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>
                      {formattedDate(item?.createdAt)}{" "}
                      <FaEye
                        onClick={() => handleSelectedViewBookingData(item)} // Pass the item directly
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.payment?.advancePayment?.amount?.toFixed(2)}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.payment?.advancePayment?.method}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.payment?.pendingAmount?.amount?.toFixed(2)}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.totalPayableAmount?.toFixed(2)}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.source}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.destination}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.destination?.pincode}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.destination?.state}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{new Date(item?.quotationDetails?.Trip_Start_DateTime)?.toLocaleTimeString()}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{new Date(item?.quotationDetails?.Trip_Start_DateTime)?.toLocaleDateString()}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{new Date(item?.quotationDetails?.Trip_End_DateTime)?.toLocaleTimeString()}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{new Date(item?.quotationDetails?.Trip_End_DateTime)?.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {/* Modal for Booking Details */}
        <BookingDetailsModal
          open={openModel} // Pass open state
          handleClose={handleCloseModal} // Pass close handler
          item={selectedViewBookingData} // Pass the selected item
        />
      </TableContainer>
    </Grid>
  );
};

export default BookingTable;
