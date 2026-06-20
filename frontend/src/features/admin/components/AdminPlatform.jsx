// Aba "Plataforma" do admin: submenu com Perguntas (FAQ/solicitações), Tags
// (de atores e eventos) e Sobre (texto institucional da plataforma).
//
// O submenu usa botões com ÍCONE + borda (cartões), visual propositalmente
// diferente do toggle "Solicitações/Publicadas" (pílulas simples) que aparece
// dentro de "Perguntas" — pra não confundir os dois níveis.

import { Flag, HelpCircle, Tag } from 'lucide-react'
import { useState } from 'react'

import { AdminDenuncias } from '@/features/admin/components/AdminDenuncias'
import { AdminHelp } from '@/features/admin/components/AdminHelp'
import { AdminTags } from '@/features/admin/components/AdminTags'
import { cn } from '@/lib/utils'

const SECTIONS = [
    { value: 'perguntas', label: 'Perguntas', icon: HelpCircle },
    { value: 'tags', label: 'Tags', icon: Tag },
    { value: 'denuncias', label: 'Denúncias', icon: Flag },
]

export function AdminPlatform() {
    const [section, setSection] = useState('perguntas')

    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {SECTIONS.map(({ value, label, icon: Icon }) => {
                    const isActive = section === value
                    return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setSection(value)}
                            aria-pressed={isActive}
                            className={cn(
                                'flex flex-col items-center gap-1.5 rounded-2xl border-2 px-3 py-3 text-sm font-semibold transition active:scale-95',
                                isActive
                                    ? 'border-primary bg-primary/10 text-secondary'
                                    : 'border-secondary/15 text-secondary/60 hover:border-secondary/30',
                            )}
                        >
                            <Icon
                                className={cn(
                                    'size-5',
                                    isActive ? 'text-primary' : 'text-secondary/50',
                                )}
                            />
                            {label}
                        </button>
                    )
                })}
            </div>

            {section === 'perguntas' && <AdminHelp />}
            {section === 'tags' && <AdminTags />}
            {section === 'denuncias' && <AdminDenuncias />}
        </div>
    )
}
