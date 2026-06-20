import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { StopReadingOnNavigate } from '@/components/accessibility/StopReadingOnNavigate'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
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

// Layout raiz (sem path): envolve todas as rotas para que o ScrollToTop e o
// StopReadingOnNavigate rodem em qualquer navegação, inclusive no /map (que fica
// fora do MainLayout).
function RootLayout() {
    return (
        <>
            <ScrollToTop />
            <StopReadingOnNavigate />
            <Outlet />
        </>
    )
}

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
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
                        path: '*',
                        element: <NotFound />,
                    },
                ],
            },
            {
                // Mapa: tela cheia com Header próprio, fora do MainLayout (sem Footer/padding).
                path: '/map',
                element: (
                    <Suspense fallback={<div className="h-[100dvh]" />}>
                        <Map />
                    </Suspense>
                ),
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
        ],
    },
])

export function AppRoutes() {
    return <RouterProvider router={router} />
}
