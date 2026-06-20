// Item de pergunta (acordeão): abre/fecha a resposta ao tocar.

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

export function FaqItem({ question, answer }) {
    const [open, setOpen] = useState(false)

    return (
        <li className="border-secondary/10 overflow-hidden rounded-2xl border bg-white">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                className="text-secondary flex w-full items-center justify-between gap-3 p-4 text-left font-semibold"
            >
                {question}
                <ChevronDown
                    className={cn(
                        'text-primary size-5 shrink-0 transition-transform',
                        open && 'rotate-180',
                    )}
                />
            </button>
            {open && (
                <p className="text-secondary/70 animate-fade-in px-4 pb-4 text-sm">{answer}</p>
            )}
        </li>
    )
}
