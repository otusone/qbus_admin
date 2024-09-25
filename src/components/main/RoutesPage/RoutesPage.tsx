import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../../dashboard/Dashboard'
import BookingPage from '../../../pages/BookingPage/BookingPage'
import VehiclesPage from '../../../pages/VehiclesPage/VehiclesPage'
import VendorPage from '../../../pages/VenderPage/VendorPage'
import DashboardPage from '../../../pages/DashboardPage/DashboardPage'
import AvailableVechiles from '../../../pages/ManageVechiles/AvilableVehiles'
import VechileType from '../../../pages/ManageVechiles/Vehicle_Type'
import VehiclesModalList from '../../../pages/ManageVechiles/VehiclesModal'
import VehiclesSeatingList from '../../../pages/ManageVechiles/Vehicle_Seating'
import VehiclesRateList from '../../../pages/ManageVechiles/VehiclesRateList'
import AddVehicleDetails from '../../../pages/Add_Vehicle_detailPage/VehicleDetailsPage'
import NewOnboardVehicle from '../../../pages/Add_Vehicle_Details/NewOnboardVehicle'
import AddNewVehicleRental from '../../../pages/Add_Vehicle_Details/AddNewVehicle'
import AddVehicleModel from '../../../pages/Add_Vehicle_Details/AddVehicleModel'
import AddVehicleTpe from '../../../pages/Add_Vehicle_Details/AddVehicleType'
import AddNewRate from '../../../pages/Add_Vehicle_Details/AddNewRate'
import AddVehicleSeats from '../../../pages/Add_Vehicle_Details/AddVehicleSeats'
const RoutesPage = () => {  
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/booking' element={<BookingPage />} />
                <Route path='/manage/' element={<VehiclesPage/>}>
                 <Route path='all-listed-vehicle-types' element={<AvailableVechiles />} />
                 <Route path='all-vehicle-types' element={<VechileType/>}></Route>
                 <Route path='all-vehicle-modal' element={<VehiclesModalList/>}></Route>
                 <Route path='all-seating-type-list' element={<VehiclesSeatingList/>}></Route>
                 <Route path='rental-vehicle-rate-list' element={<VehiclesRateList/>}></Route>
                </Route>
                <Route path='/add-detail/vehicles/add/' element={<AddVehicleDetails/>}>
                 <Route path='new-rental-vehicle' element={<AddNewVehicleRental/>}></Route>
                 <Route path='new-onboard-vehicle' element={<NewOnboardVehicle/>}></Route>
                 <Route path='new-vehicle-Model' element={<AddVehicleModel/>}></Route>
                 <Route path='new-Vehicle-Type' element={<AddVehicleTpe/>}></Route>
                 <Route path='new-Rate' element={<AddNewRate/>}></Route>
                <Route path='new-seats' element={<AddVehicleSeats/>}></Route>
                </Route>
                <Route path='/vendor' element={<VendorPage />} />
            </Routes>
        </Fragment>
    )
}
export default RoutesPage
