import React, { useState, useEffect } from "react";
import styles from "./BookingTable.module.scss";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import HeadingText from "../../HeadingText/HeadingText";

export interface IBookingTable {
  tableTitle: any;
  tableData: any;
}

const BookingTable = ({ tableTitle, tableData }: IBookingTable) => {
  const [query, setQuery] = useState("")

  const formattedDate = (idx: any) => {
    const date = new Date(idx)
    return date.toLocaleDateString()
  };
  return (
    <Grid className={styles.bookingTableContainer}>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead style={{ backgroundColor: "#00ACB2" }}>
            <TableRow>
              {tableTitle.map((item: any) => {
                return (
                  <TableCell style={{ color: "#000000", textAlign: "left", fontSize: 15, fontWeight: 600 }}>{item.title}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData && tableData.filter((employee: { name: string }) => {
              return (
                query === "" ||
                (employee.name
                  ?.toLowerCase()
                  ?.includes(query.toLowerCase()) ??
                  false)
              );
            })
              .map((item: any, idx: any) => {
                return (
                  <TableRow key={idx}>
                    <TableCell sx={{ textAlign: "left" }}>{item?.userId?.name}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.userId?.email}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{formattedDate(item?.createdAt)}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.payment?.advancePayment?.amount.toFixed(2)}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.payment?.advancePayment?.method}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.payment?.pendingAmount?.amount.toFixed(2)}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.totalPayableAmount.toFixed(2)}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.destination?.cityName}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.destination?.pincode}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.destination?.state}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.pickupDate?.from}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.pickupDate?.date}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.dropoffDate?.from}</TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{item?.dropoffDate?.date}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default BookingTable;
