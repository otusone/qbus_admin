import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../../dashboard/Dashboard'
import BookingPage from '../../../pages/BookingPage/BookingPage'
import VehiclesPage from '../../../pages/VehiclesPage/VehiclesPage'
import VendorPage from '../../../pages/VenderPage/VendorPage'
import DashboardPage from '../../../pages/DashboardPage/DashboardPage'
import AvailableVechiles from '../../../pages/DashboardPage/AvilableVehiles'
import VechileType from '../../../pages/ManageVechiles/Vehicle_Type'

const RoutesPage = () => {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/booking' element={<BookingPage />} />
                <Route path='/manage' element={<VehiclesPage/>}>
                <Route path='all-listed-vehicle-types' element={<AvailableVechiles />} />
                <Route path='all-vehicle-types' element={<VechileType/>}></Route>
                </Route>
                <Route path='/vendor' element={<VendorPage />} />
            </Routes>
        </Fragment>
    )
}

export default RoutesPage