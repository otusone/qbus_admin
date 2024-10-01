import React from 'react'
import styles from './VendorTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { MdDelete } from "react-icons/md";
import { useLocation } from 'react-router-dom';


export interface IVendorTable {
    data: any
    handleDelete: any;
}
const VendorTable = ({ data, handleDelete }: IVendorTable) => {

    const location=useLocation();
    return (
        <Grid>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: "#3FACE2",width:"100%" }} >
                       
                           
    
                          
                                <TableRow>
                                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Name</TableCell>
                                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Phone</TableCell>
                                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Address</TableCell>
                                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>GST Number</TableCell>
                                <TableCell sx={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>Action</TableCell>
                                </TableRow> 
                            
                          
                    </TableHead>
                    <TableBody>
                        {data && data.map((item: any) => {
                            return (
                                <TableRow>
                                    <TableCell sx={{ textAlign: "center" }}>{item?.name}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item?.email}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item?.mobileNumber}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item?.address}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item?.gstNo}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <MdDelete onClick={(() => handleDelete(item._id))} fontSize={21} cursor={"pointer"} style={{ color: "red" }} />
                                    </TableCell>
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