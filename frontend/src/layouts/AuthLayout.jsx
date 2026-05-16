import { Outlet, useMatches } from 'react-router-dom'

import background from '@/assets/auth/background.png'

export function AuthLayout() {
    const title = useMatches().at(-1)?.handle?.title

    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-primary relative flex h-48 items-end justify-center overflow-hidden px-6 pb-10">
                <img
                    src={background}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
                />
                {title && (
                    <h1 className="text-foreground relative pb-5 text-6xl font-extrabold">
                        {title}
                    </h1>
                )}
            </header>
            <main className="bg-background relative -mt-6 flex flex-1 flex-col gap-4 rounded-t-4xl p-7">
                <Outlet />
            </main>
        </div>
    )
}
