import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Select(props) {
    return <SelectPrimitive.Root {...props} />
}

export function SelectValue(props) {
    return <SelectPrimitive.Value {...props} />
}

export function SelectTrigger({ className, children, ...props }) {
    return (
        <SelectPrimitive.Trigger
            className={cn('flex cursor-pointer items-center gap-1 leading-none', className)}
            {...props}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <ChevronDown className="size-5" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    )
}

export function SelectContent({ className, children, ...props }) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                position="popper"
                sideOffset={6}
                className={cn(
                    'bg-background data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out z-50 min-w-(--radix-select-trigger-width) overflow-hidden rounded-lg shadow-lg',
                    className,
                )}
                {...props}
            >
                {/* Mostra ~5 opções e rola para ver as demais; o limite acompanha a
                    altura disponível (calculada pelo Radix), então nunca passa da
                    borda da tela. */}
                <SelectPrimitive.Viewport
                    className="viene-scrollbar overflow-y-auto p-1"
                    style={{
                        maxHeight:
                            'min(13rem, var(--radix-select-content-available-height, 13rem))',
                    }}
                >
                    {children}
                </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    )
}

export function SelectItem({ className, children, ...props }) {
    return (
        <SelectPrimitive.Item
            className={cn(
                'data-highlighted:bg-primary/15 flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 outline-none',
                className,
            )}
            {...props}
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator>
                <Check className="size-4" />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    )
}
