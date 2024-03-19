import React from 'react'
import styles from './Heading.module.scss'
import { Grid, Typography } from '@mui/material'
import CommonButton from '../common/CommonButton/CommonButton'

export interface IHeading {
    heading: string;
    IsAction?: boolean;
    handleClick?:()=>void;

}
const Heading = ({ heading, IsAction, handleClick }: IHeading) => {
    return (
        <Grid className={styles.headingContainer}>
            <Typography variant='h4' fontSize={25} fontWeight={600}>{heading}</Typography>
            {IsAction ? <CommonButton name="Add Vahicles" onClick={handleClick}/> : ""}

        </Grid>
    )
}

export default Heading