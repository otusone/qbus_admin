import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../../dashboard/Dashboard'
import BookingPage from '../../../pages/BookingPage/BookingPage'
import VehiclesPage from '../../../pages/VehiclesPage/VehiclesPage'
import VendorPage from '../../../pages/VenderPage/VendorPage'
import DashboardPage from '../../../pages/DashboardPage/DashboardPage'

const RoutesPage = () => {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/booking' element={<BookingPage />} />
                <Route path='/vehicles' element={<VehiclesPage />} />
                <Route path='/vendor' element={<VendorPage />} />
            </Routes>
        </Fragment>
    )
}

export default RoutesPage