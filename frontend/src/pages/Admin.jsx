// Tela do módulo de Administração (/admin). Agora dentro do MainLayout, então usa
// a NAVBAR padrão das demais telas. Banner full-bleed "Administrador" (lado a
// lado, -mt-4 cancela o pt do main) + sub-guias: Painel / Aprovações / Usuários /
// Plataforma.
//
// Observação: a proteção real por perfil (RBAC) — só o Administrador acessa —
// será aplicada quando a autenticação do back-end estiver conectada.

import { Suspense, useState } from 'react'

import { FullBleed } from '@/components/layout/FullBleed'
import { AdminPanel } from '@/features/admin/components/AdminPanel'
import { AdminPlatform } from '@/features/admin/components/AdminPlatform'
import { AdminSkeleton } from '@/features/admin/components/AdminSkeleton'
import { ApprovalList } from '@/features/admin/components/ApprovalList'
import { UserList } from '@/features/admin/components/UserList'
import { cn } from '@/lib/utils'

const TABS = [
    { value: 'painel', label: 'Painel' },
    { value: 'aprovacoes', label: 'Aprovações' },
    { value: 'usuarios', label: 'Usuários' },
    { value: 'plataforma', label: 'Plataforma' },
]

export function Admin() {
    const [tab, setTab] = useState('painel')

    return (
        <>
            {/* Banner: só o título "Administrador", lado a lado, um pouco menor que
                os banners das outras telas (py-5). -mt-4 cancela o pt do <main>. */}
            <FullBleed className="bg-secondary -mt-4">
                <div className="px-4 py-5 lg:px-[10%]">
                    <h1 className="font-montserrat text-2xl font-extrabold text-white">
                        Área Administradores
                    </h1>
                </div>
            </FullBleed>

            {/* Sub-guias */}
            <div role="tablist" className="border-secondary/10 -mt-1 flex border-b">
                {TABS.map((option) => {
                    const isActive = tab === option.value
                    return (
                        <button
                            key={option.value}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setTab(option.value)}
                            className={cn(
                                'relative flex-1 px-2 py-3 text-center text-xs font-semibold transition sm:text-sm',
                                isActive
                                    ? 'text-primary'
                                    : 'text-secondary/60 hover:text-secondary',
                            )}
                        >
                            {option.label}
                            {isActive && (
                                <span className="bg-primary absolute inset-x-2 -bottom-px h-0.5 rounded-full" />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Cada aba que busca dados suspende; o erro é tratado de forma central
                (router). A Plataforma trata o Suspense das perguntas internamente. */}
            {tab === 'painel' && (
                <Suspense fallback={<AdminSkeleton />}>
                    <AdminPanel onNavigateTab={setTab} />
                </Suspense>
            )}
            {tab === 'aprovacoes' && (
                <Suspense fallback={<AdminSkeleton />}>
                    <ApprovalList />
                </Suspense>
            )}
            {tab === 'usuarios' && (
                <Suspense fallback={<AdminSkeleton />}>
                    <UserList />
                </Suspense>
            )}
            {tab === 'plataforma' && <AdminPlatform />}
        </>
    )
}
