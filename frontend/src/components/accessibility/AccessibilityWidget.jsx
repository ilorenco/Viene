// Widget flutuante de acessibilidade: aba fixa na borda direita que abre um drawer
// (reusa o Sheet do menu — ganha Esc, foco preso/restaurado e role=dialog de graça)
// com as opções: modo noturno, daltonismo, realce e leitura de página.

import { Accessibility } from 'lucide-react'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'

import { AccessibilityControls } from './AccessibilityControls'

export function AccessibilityWidget() {
    return (
        <Sheet>
            <SheetTrigger
                aria-label="Opções de acessibilidade"
                className="bg-primary text-secondary fixed top-[30%] right-0 z-40 -translate-y-1/2 cursor-pointer rounded-l-2xl p-3 shadow-lg transition active:scale-95 lg:top-1/2"
            >
                <Accessibility className="size-7" />
            </SheetTrigger>

            <SheetContent className="overflow-y-auto">
                <SheetTitle className="text-secondary font-montserrat text-lg font-extrabold">
                    Acessibilidade
                </SheetTitle>
                <p className="text-secondary/60 text-sm">
                    Ajuste a plataforma para a sua melhor experiência.
                </p>
                <AccessibilityControls />
            </SheetContent>
        </Sheet>
    )
}
