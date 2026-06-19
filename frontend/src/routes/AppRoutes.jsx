import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { StopReadingOnNavigate } from '@/features/accessibility/components/StopReadingOnNavigate'
import { AuthLayout } from '@/layouts/AuthLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { ActorProfile } from '@/pages/ActorProfile'
import { Actors } from '@/pages/Actors'
import { Admin } from '@/pages/Admin'
import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'
import { EventDetails } from '@/pages/EventDetails'
import { Events } from '@/pages/Events'
import { Faq } from '@/pages/Faq'
import { Favorites } from '@/pages/Favorites'
import { Home } from '@/pages/Home'
import { Map } from '@/pages/Map'
import { NotFound } from '@/pages/NotFound'
import { Profile } from '@/pages/Profile'
import { Settings } from '@/pages/Settings'
import { Sobre } from '@/pages/Sobre'
import { Tickets } from '@/pages/Tickets'

// Layout raiz (sem path): envolve todas as rotas para que o StopReadingOnNavigate
// rode em qualquer navegação. O <Outlet /> renderiza a rota atual.
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
                        path: '/actors/:id',
                        element: <ActorProfile />,
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
                        path: '/sobre',
                        element: <Sobre />,
                    },
                    {
                        path: '/configuracoes',
                        element: <Settings />,
                    },
                    {
                        path: '/ajuda',
                        element: <Faq />,
                    },
                    {
                        path: '/admin',
                        element: <Admin />,
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
            {
                path: '/map',
                element: <Map />,
            },
        ],
    },
])

export function AppRoutes() {
    return <RouterProvider router={router} />
}
