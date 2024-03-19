import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import styles from './Dashboard.module.scss'
import Heading from '../Heading/Heading';

export interface IDashboard {
    data: any;
}
const Dashboard = ({ data }: IDashboard) => {
    return (
        <Grid className={styles.dashboardContainer}>
            <Heading heading={'Booking'} />
            <TableContainer className={styles.tableContainer}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#00ADB2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Date</TableCell>
                            <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Clock In</TableCell>
                            <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Clock Out</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Date</TableCell>
                            <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Clock In</TableCell>
                            <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Clock Out</TableCell>
                        </TableRow>

                    </TableBody>

                </Table>
            </TableContainer>
        </Grid>
    )
}

export default Dashboard