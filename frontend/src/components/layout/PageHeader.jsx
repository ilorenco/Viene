import { cn } from '@/lib/utils'

// `rule`: liga/desliga a linha pontilhada abaixo do título. TEMPORÁRIO — hoje só a
// página de Atores desativa. Quando o time decidir se as demais páginas mantêm (ou
// não) a linha, essa prop pode ser removida ou virar o novo padrão.
export function PageHeader({ overline, title, rule = true, className }) {
    return (
        <header className={cn('flex flex-col gap-2', className)}>
            <h1 className="flex flex-col">
                {overline && <span className="text-2xl">{overline}</span>}
                <span className={cn('text-3xl font-extrabold', overline && '-mt-1')}>{title}</span>
            </h1>

            {rule && (
                <div aria-hidden="true" className="-mt-2 flex items-center gap-1">
                    <div className="border-primary flex-1 border-t-4 border-dashed" />
                    <div className="bg-primary h-4 w-4 shrink-0 rounded-full" />
                </div>
            )}
        </header>
    )
}
