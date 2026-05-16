import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthLayout } from '../layouts/AuthLayout'
import { RootLayout } from '../layouts/RootLayout'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: '/login',
                        element: <Login />,
                        handle: { title: 'Login' },
                    },
                    {
                        path: '/register',
                        element: <Register />,
                        handle: { title: 'Cadastro' },
                    },
                ],
            },
        ],
    },
])

export function AppRoutes() {
    return <RouterProvider router={router} />
}
