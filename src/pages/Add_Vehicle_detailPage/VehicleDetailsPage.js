import React, { Fragment, useEffect, useState } from "react";
import styles from "./Add_Vehicle_detail.module.scss";
import { Box, Grid, ListItemButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom"
import { AddVehicleDetail } from "../../data/Admin_Paths";
const AddVehicleDetails = () => {
    return (
        <Fragment>
            <Grid className={styles.employeePageContainer}>
                <Stack direction="row" spacing={3}>
                    {AddVehicleDetail.map((type) => (
                        <Link key={type.id} href={type.link} underline="hover" color="inherit"
                            sx={{
                                backgroundColor: '#3FACE2',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                color: '#fff',
                                textDecoration: 'none',
                                '&:hover': {
                                    backgroundColor: '#3FACEE',
                                    underline:"none"
                                },
                            }}
                        >
                            <Typography>{type.title}</Typography>
                        </Link>
                    ))}
                </Stack>
                <Outlet />

            </Grid>

        </Fragment>
    );
};

export default AddVehicleDetails;