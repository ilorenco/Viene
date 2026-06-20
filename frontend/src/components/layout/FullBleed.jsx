import { cn } from '@/lib/utils'

export function FullBleed({ className, ...props }) {
    // Técnica "full-bleed": ocupa 100% da largura da janela (canto a canto),
    // ignorando o padding/margem da página. O conteúdo interno mantém o seu
    // próprio espaçamento.
    return <div className={cn('relative left-1/2 -ml-[50vw] w-screen', className)} {...props} />
}
