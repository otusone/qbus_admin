import React, { useState } from 'react'
import styles from './DashboardPage.module.scss'
import { Grid, Typography } from '@mui/material'
import Heading from '../../components/Heading/Heading'

const DashboardPage = () => {
    const [open, setOpen] = useState();
    const handleAddModal = () => {

    }
    return (
        <Grid className={styles.dashboardPageContainer}>
            <Heading
                heading='Dashboard'
                IsAction={true}
                handleClick={handleAddModal} />
        </Grid>
    )
}

export default DashboardPage