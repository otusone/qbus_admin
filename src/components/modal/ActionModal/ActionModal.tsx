import React, { useState } from 'react'
import styles from './ActionModal.module.scss'
import { Modal, Grid, Typography, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Box } from '@mui/system';
import { MdOutlineClose } from "react-icons/md";
import CommonButton from '../../common/CommonButton/CommonButton';
import InputField from '../../inputField/InputField';


export interface IActionModal {
    open: boolean;
    handleClose: () => void;
    handleClick: () => void;
    handleChangeAvailability: any;
    inputVal: any;
    handleChangeUpdate: any;
    handleUpdate: any;
}
const ActionModal = ({ open, handleClose, handleClick, handleChangeAvailability, inputVal, handleChangeUpdate, handleUpdate }: IActionModal) => {
    const [editTo, setEditTo] = useState()
    const handleChengeMode = (e: any) => {
        setEditTo(e.target.value)
    }
    return (
        <Modal
            open={open}
            className={styles.actionModal}
        >
            <Grid className={styles.approveReq}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Edit Vehicles Details </Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid className={styles.vehiclesInfo}>
                    <Box>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="available"
                                onChange={handleChengeMode}
                            >
                                <Box>
                                    <FormControlLabel value="availability" control={<Radio />} label="Availability" />
                                </Box>
                                <FormControlLabel value="vehicle" control={<Radio />} label="Vehicles Update" />
                            </RadioGroup>
                        </FormControl>
                        <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                    </Box>
                    {editTo === "availability" ?
                        <>
                            <Grid>
                                <Box display={'flex'}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="available"
                                            onChange={handleChangeAvailability}
                                        >
                                            <FormControlLabel value="true" control={<Radio />} label="Available" />
                                            <FormControlLabel value="false" control={<Radio />} label="Not Available" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid className={styles.acton}>
                                <CommonButton name={"Cancel"} onClick={handleClose} />
                                <CommonButton name={"Update"} onClick={handleClick} />
                            </Grid>
                        </>
                        :
                        <>
                            <Grid>
                                <Box display={'flex'}>
                                    <InputField
                                        label={'Rate Per Km'}
                                        name={'ratePerKm'}
                                        placeholder={'Enter rate per km'}
                                        value={inputVal.ratePerKm}
                                        handleChange={handleChangeUpdate}
                                        type={undefined}
                                    />
                                    <InputField
                                        label={'No Of Seats'}
                                        name={'noOfSeats'}
                                        placeholder={'Enter no of seats'}
                                        value={inputVal.noOfSeats}
                                        handleChange={handleChangeUpdate}
                                        type={"number"}
                                    />
                                </Box>
                                <Box display={'flex'}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="available"
                                            value={inputVal.available}
                                            onChange={handleChangeUpdate}
                                        >
                                            <FormControlLabel value="true" control={<Radio />} label="Available" />
                                            <FormControlLabel value="false" control={<Radio />} label="Not Available" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid className={styles.acton}>
                                <CommonButton name={"Cancel"} onClick={handleClose} />
                                <CommonButton name={"Update"} onClick={handleUpdate} />
                            </Grid>
                        </>
                    }
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ActionModal