import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthLayout } from '@/layouts/AuthLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { Actors } from '@/pages/Actors'
import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'
import { EventDetails } from '@/pages/EventDetails'
import { Events } from '@/pages/Events'
import { Favorites } from '@/pages/Favorites'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { Profile } from '@/pages/Profile'
import { Tickets } from '@/pages/Tickets'

// Carrega o mapa (Leaflet) sob demanda, fora do bundle inicial.
const Map = lazy(() => import('@/pages/Map').then((m) => ({ default: m.Map })))

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
                element: <Favorites />,
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
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/map',
                element: (
                    <Suspense fallback={<div className="flex flex-1" />}>
                        <Map />
                    </Suspense>
                ),
            },
            {
                path: '*',
                element: <NotFound />,
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
