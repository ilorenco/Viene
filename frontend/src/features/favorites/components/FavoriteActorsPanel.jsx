// Painel "Atores" da tela de Favoritos. Reaproveita exatamente os filtros do
// catálogo de atores (área + tag), os mesmos cards (ActorList) e a mesma paginação
// por linhas. A busca vem de cima (digitada no banner) por prop `search`. Não traz
// o botão "Cadastrar ator" do catálogo — aqui é uma lista de favoritos, não o
// catálogo de cadastro.

import { LayoutGrid, Tag } from 'lucide-react'
import { useState } from 'react'

import { Pagination } from '@/components/ui/Pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'
import { ActorList } from '@/features/actors/components/ActorList'
import { useFilteredActors } from '@/features/actors/hooks/useFilteredActors'
import { useGridColumns } from '@/hooks/useGridColumns'
import { usePagination } from '@/hooks/usePagination'
import { ATOR_AREA_LABELS, ATOR_AREA_OPTIONS } from '@/lib/atorTypes'

export function FavoriteActorsPanel({ search }) {
    const [area, setArea] = useState('todos')
    const [tag, setTag] = useState('todas')

    const { items, tagOptions } = useFilteredActors(area, tag, search)

    // Paginação por linhas, igual ao catálogo de atores (colunas * 7).
    const columns = useGridColumns()
    const { page, setPage, totalPages, pageItems } = usePagination(items, {
        pageSize: columns * 7,
        resetKey: `${area}|${tag}|${search}`,
    })

    function selectArea(value) {
        setArea(value)
        setTag('todas') // ao trocar de área, volta a tag para "Todas"
    }

    return (
        <>
            {/* Mesmos filtros do catálogo de atores: dropdown de ÁREA + dropdown de TAGS. */}
            <div className="flex flex-wrap items-center gap-2">
                <Select value={area} onValueChange={selectArea}>
                    <SelectTrigger className="text-secondary border-secondary/15 bg-background rounded-full border px-4 py-2 text-sm font-semibold">
                        <LayoutGrid className="text-primary size-4 shrink-0" />
                        <span className="max-w-56 truncate">
                            {area === 'todos' ? 'Todas as áreas' : ATOR_AREA_LABELS[area]}
                        </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                        {ATOR_AREA_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.value === 'todos' ? 'Todas as áreas' : option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={tag} onValueChange={setTag}>
                    <SelectTrigger className="text-secondary border-secondary/15 bg-background rounded-full border px-4 py-2 text-sm font-semibold">
                        <Tag className="text-primary size-4 shrink-0" />
                        <span className="max-w-56 truncate">
                            <SelectValue />
                        </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                        <SelectItem value="todas">Todas as tags</SelectItem>
                        {tagOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.value} ({option.count})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {pageItems.length > 0 ? (
                <ActorList actors={pageItems} />
            ) : (
                <p className="text-secondary/60 rounded-2xl bg-white p-6 text-center text-sm">
                    Nenhum ator favoritado encontrado para esse filtro.
                </p>
            )}
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
    )
}
