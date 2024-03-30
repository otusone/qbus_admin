import React from 'react'
import styles from './VendorTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export interface IVendorTable {
    data: any
}
const VendorTable = ({ data }: IVendorTable) => {
    return (
        <Grid>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: "#00AB8E" }}>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Email</TableCell>
                            <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Phone</TableCell>
                            <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Address</TableCell>
                            <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>GST Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((item: any) => {
                            return (
                                <TableRow>
                                    <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.email}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.mobileNumber}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.address}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.gstNo}</TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default VendorTable