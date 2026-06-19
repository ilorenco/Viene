// Widget flutuante de acessibilidade: botão fixo no canto direito da tela que
// abre um painel com as opções (modo noturno, daltonismo, realce, leitura).
//
// É renderizado via portal no <body> para ficar por cima de tudo e funcionar
// em qualquer página.

import { Accessibility, X } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { AccessibilityControls } from './AccessibilityControls'

export function AccessibilityWidget() {
    const [open, setOpen] = useState(false)

    return createPortal(
        <>
            <button
                type="button"
                aria-label="Opções de acessibilidade"
                onClick={() => setOpen((value) => !value)}
                className="bg-primary text-secondary fixed top-[30%] right-0 z-[1500] -translate-y-1/2 rounded-l-2xl p-3 shadow-lg transition active:scale-95 lg:top-1/2"
            >
                <Accessibility className="size-7" />
            </button>

            {open && (
                <>
                    <div
                        className="animate-fade-in fixed inset-0 z-[1500] bg-black/30"
                        onClick={() => setOpen(false)}
                    />
                    <aside className="bg-background animate-slide-in-right fixed top-0 right-0 z-[1500] flex h-full w-80 max-w-[85vw] flex-col gap-4 overflow-y-auto p-5 shadow-xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-secondary font-montserrat text-lg font-extrabold">
                                Acessibilidade
                            </h2>
                            <button
                                type="button"
                                aria-label="Fechar"
                                onClick={() => setOpen(false)}
                                className="text-secondary cursor-pointer transition active:scale-90"
                            >
                                <X className="size-6" />
                            </button>
                        </div>
                        <p className="text-secondary/60 text-sm">
                            Ajuste a plataforma para a sua melhor experiência.
                        </p>
                        <AccessibilityControls />
                    </aside>
                </>
            )}
        </>,
        document.body,
    )
}
