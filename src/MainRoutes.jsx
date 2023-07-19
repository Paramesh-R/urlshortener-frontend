import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/RouteRestriction/ProtectedRoute'
import Dashboard from './pages/Dashboard/Dashboard'
import Error404 from './pages/Home/Error404'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import ForgotPassword from './pages/Auth/ForgotPassword'


const MainRoutes = () => {
    return (
        <Routes>
            {/* Authentication Routes */}
            <Route path='/signIn' element={<SignIn />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />

            {/* PrivateRoute */}
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
            </Route>


            {/* Error 404 */}
            <Route path='*' element={<Error404 />} />
        </Routes>
    )
}

export default MainRoutes