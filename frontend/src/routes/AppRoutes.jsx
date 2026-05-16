import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthLayout } from '@/layouts/AuthLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'
import { Home } from '@/pages/Home'

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
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
])

export function AppRoutes() {
    return <RouterProvider router={router} />
}
