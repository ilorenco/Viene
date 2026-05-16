import { Outlet } from 'react-router-dom'

import { Footer } from '../components/Footer'

export function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1 flex-col">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
