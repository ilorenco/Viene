// Placeholder mostrado pelo <Suspense> enquanto uma lista do admin carrega
// (busca/filtros + algumas linhas). Mantém a tela "viva" no padrão React Query.

export function AdminSkeleton() {
    return (
        <div className="flex animate-pulse flex-col gap-4">
            <div className="bg-secondary/10 h-10 w-full rounded-full" />
            <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-secondary/10 h-16 rounded-2xl" />
                ))}
            </div>
        </div>
    )
}
