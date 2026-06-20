// Botão de filtro reutilizável do admin: pílula com ícone + valor + chevron que
// abre um dropdown (Radix Select). O ícone mostrado é o da OPÇÃO SELECIONADA
// (cada option pode ter seu `icon`), então ele muda conforme o filtro escolhido
// — ex.: símbolo de bloqueio ao filtrar por "Bloqueados". `icon` é o fallback.

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'
import { cn } from '@/lib/utils'

export function FilterSelect({ value, onChange, options, icon: FallbackIcon, className }) {
    const selected = options.find((option) => option.value === value)
    const Icon = selected?.icon ?? FallbackIcon

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger
                className={cn(
                    'border-secondary/20 text-secondary bg-background shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold lg:text-sm',
                    className,
                )}
            >
                {Icon && <Icon className="text-primary size-4 shrink-0" />}
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
