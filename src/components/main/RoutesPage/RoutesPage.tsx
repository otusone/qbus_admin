import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../../dashboard/Dashboard'
import UserPage from '../../../pages/UserPage/UserPage'
import BookingPage from '../../../pages/BookingPage/BookingPage'
import VehiclesPage from '../../../pages/VehiclesPage/VehiclesPage'
import VendorPage from '../../../pages/VenderPage/VendorPage'

const RoutesPage = () => {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<Dashboard data={undefined} />} />
                <Route path='/user' element={<UserPage />} />
                <Route path='/booking' element={<BookingPage />} />
                <Route path='/vehicles' element={<VehiclesPage />} />
                <Route path='/vendor' element={<VendorPage />} />
            </Routes>
        </Fragment>
    )
}

export default RoutesPage