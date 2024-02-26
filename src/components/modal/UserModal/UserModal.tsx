import React from 'react'
import styles from './UserModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';
import SelectField from '../../SelectField/SelectField';

export interface IUserModal {
    open: boolean;
    inputVal: {
        name: string;
        email: string;
        mobileNumber: string;
        password: string;
        role: string;
    };
    handleChange: any;
    handleCreateUser: () => void;
    handleClose: () => void;
}
const UserModal = ({ open, inputVal, handleChange, handleCreateUser, handleClose }: IUserModal) => {
    const data = ["VENDOR"]

    return (
        <Modal
            open={open}
            className={styles.userModalContainer}
        >
            <Grid className={styles.userModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={25} fontWeight={500}>Add New User</Typography>
                    <IoMdClose fontSize={25} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.useDetails}>
                    <Grid>
                        <InputField
                            label={'Name'}
                            name={'name'}
                            placeholder={'Enter user name'}
                            value={inputVal.name}
                            handleChange={handleChange}
                            type={"text"}
                        />
                        <InputField
                            label={'Email'}
                            name={'email'}
                            placeholder={'Enter user email'}
                            value={inputVal.email}
                            handleChange={handleChange}
                            type={"email"}
                        />

                        <SelectField
                            title={'Role'}
                            data={data}
                            option={inputVal.role}
                            name={'role'}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.userDetails}>
                        <InputField
                            label={'Mobile'}
                            name={'mobileNumber'}
                            placeholder={'Enter user mobile'}
                            value={inputVal.mobileNumber}
                            handleChange={handleChange}
                            type={"number"}
                        />
                        <InputField
                            label={'Password'}
                            name={'password'}
                            placeholder={'Enter user password'}
                            value={inputVal.password}
                            handleChange={handleChange}
                            type={"password"}
                        />
                    </Grid>
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={"Submit"} onClick={handleCreateUser} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default UserModal