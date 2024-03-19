import React from 'react'
import styles from './VahiclesModal.module.scss'
import { Box, Divider, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, Typography } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import CommonButton from '../../common/CommonButton/CommonButton';
import InputField from '../../inputField/InputField';
import SelectField from '../../SelectField/SelectField';

export interface IVahiclesModal {
    open: boolean;
    inputVal: any;
    venders: any;
    categories: any;
    handleClose: () => void;
    handleChange: any;
    handleCreate: any;
}
const VahiclesModal = ({ open, venders, categories, inputVal, handleClose, handleChange, handleCreate }: IVahiclesModal) => {
    return (
        <Modal
            open={open}
            className={styles.vahiclesModalContainer}
        >
            <Grid className={styles.vahiclesModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Add Vehicles</Typography>
                    <IoMdClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.vehiclesDetails}>
                    <Box>
                        <SelectField
                            title={'Vendor Name'}
                            data={venders}
                            option={inputVal.venderName}
                            name={'venderName'}
                            handleChange={handleChange}
                        />
                        <SelectField
                            title={'Vehicle Type'}
                            data={categories}
                            option={inputVal.name}
                            name={'name'}
                            handleChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Available" />
                                <FormControlLabel value="false" control={<Radio />} label="Not Available" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <InputField
                            label={'Vehicle Number'}
                            name={'vehicleNumber'}
                            placeholder={""}
                            value={inputVal.vehicleNumber}
                            handleChange={handleChange}
                            type={"text"}
                        />
                        <InputField
                            label={'No Of Seats'}
                            name={'noOfSeats'}
                            placeholder={''}
                            value={inputVal.noOfSeats}
                            handleChange={handleChange}
                            type={"number"}
                        />

                    </Box>
                    <Box>
                        <InputField
                            label={'Rate Per Km'}
                            name={'ratePerKm'}
                            placeholder={''}
                            value={inputVal.ratePerKm}
                            handleChange={handleChange}
                            type={"number"}
                        />
                        <InputField
                            label={'Image'}
                            name={'img'}
                            placeholder={''}
                            value={inputVal.img}
                            handleChange={handleChange}
                            type={"file"}
                        />
                    </Box>
                    <Box>
                        <InputField
                            label={'Description'}
                            name={'desc'}
                            placeholder={''}
                            value={inputVal.desc}
                            handleChange={handleChange}
                            type={"text"}
                        />
                    </Box>
                </Grid>
                <Grid className={styles.acton}>
                    <CommonButton name={"Cancel"} onClick={handleClose} />
                    <CommonButton name={"Submit"} onClick={handleCreate} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default VahiclesModal