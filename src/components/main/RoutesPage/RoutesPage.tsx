import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../../../pages/DashboardPage/DashboardPage'
import StaffPage from '../../../pages/StaffPage/StaffPage'
import EmployeePage from '../../../pages/EmployeePage/EmployeePage'
import EmployeeProfile from '../../staff/employeeProfile/EmployeeProfile'
import CompanyPolicy from '../../../pages/CompanyPolicy/CompanyPolicy'
import LeavePolicy from '../../LeavePolicy/LeavePolicy'

const RoutesPage = () => {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/staff' element={<StaffPage />} />
                <Route path='/employee-profile' element={<EmployeeProfile />} />
                <Route path='/employee' element={<EmployeePage />} />
                <Route path='/leave-policy' element={<LeavePolicy />} />
                <Route path='/company-policy' element={<CompanyPolicy />} />
            </Routes>
        </Fragment>
    )
}

export default RoutesPage