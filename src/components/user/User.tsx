import React from 'react'
import styles from './User.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import UserCard from '../common/UserCard/UserCard'
import CustomLoader from '../CustomLoader/CustomLoader'
import HeadingText from '../HeadingText/HeadingText'


export interface IUser {
    _id: string,
    role: string,
    image?: string,
    name: string,
    email: string,
}
export interface IUserDataType {
    handleClick: () => void;
    handleAction: any;
    data: any;
    loading: boolean;
    actionOpen: boolean | any;
    handleEdit: any;
    handleProfile: any
    handleDelete: any;
}
const User = ({ handleClick, data, handleAction, loading, actionOpen, handleProfile, handleDelete }: IUserDataType) => {
    console.log(data, "data")
    return (
        <Grid className={styles.userContainer}>
            <HeadingText
                heading={'Manage User'}
                IsAction={true}
                name='Add User'
                handleClick={handleClick}
            />
            {/* {loading ? <CustomLoader /> :
                <Grid container spacing={2} >
                    <Grid item sm={3}>
                        {data && data.length > 0 && data.map((item: any) => {
                            return (
                                <UserCard
                                    label={item.role}
                                    image={item.image}
                                    name={item.name}
                                    email={item.email}
                                    IsButton={false}
                                    IsLabel={true}
                                    actionOpen={actionOpen[item._id]}
                                    handleClick={(() => handleAction(item._id))}
                                    handleDelete={() => handleDelete(item._id)}
                                    handleProfile={() => handleProfile(item._id)}
                                />
                            )
                        })}
                    </Grid>


                </Grid>} */}

        </Grid>
    )
}

export default User