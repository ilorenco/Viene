import { Route, Routes } from 'react-router-dom'

import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}
