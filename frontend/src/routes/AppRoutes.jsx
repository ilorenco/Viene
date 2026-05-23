import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthLayout } from '@/layouts/AuthLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { Actors } from '@/pages/Actors'
import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'
import { EventDetails } from '@/pages/EventDetails'
import { Events } from '@/pages/Events'
import { Home } from '@/pages/Home'
import { MyFavorites } from '@/pages/MyFavorites'
import { Tickets } from '@/pages/Tickets'

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/favorites',
                element: <MyFavorites />,
            },
            {
                path: '/tickets',
                element: <Tickets />,
            },
            {
                path: '/actors',
                element: <Actors />,
            },
            {
                path: '/events',
                element: <Events />,
            },
            {
                path: '/events/:id',
                element: <EventDetails />,
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
