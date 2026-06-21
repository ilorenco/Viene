// Sub-seção "Tags" da Plataforma: cadastrar/remover as tags usadas para
// classificar atores e eventos.
//
// Criar/remover passam pelo serviço (src/services/tags.js). A REGRA (estado das
// tags, add/remove, contagem de uso) fica no hook useTagGroup; aqui o TagGroup só
// desenha. Ao remover, o feedback informa quantos registros usavam a tag (a
// remoção real CASCATEIA para esses registros — feito pelo back-end).

import { Plus, X } from 'lucide-react'

import { useTagGroup } from '@/features/admin/hooks/useTagGroup'

function TagGroup({ title, kind }) {
    const { tags, draft, setDraft, feedback, add, remove } = useTagGroup({ kind })

    return (
        <div className="border-secondary/10 flex flex-col gap-3 rounded-2xl border bg-white p-4">
            <h3 className="font-montserrat text-secondary text-sm font-extrabold">
                {title} ({tags.length})
            </h3>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-secondary/5 text-secondary flex items-center gap-1.5 rounded-full px-3 py-1 text-sm"
                    >
                        {tag}
                        <button
                            type="button"
                            aria-label={`Remover ${tag}`}
                            onClick={() => remove(tag)}
                            className="text-secondary/50 hover:text-danger transition"
                        >
                            <X className="size-3.5" />
                        </button>
                    </span>
                ))}
            </div>

            {feedback && (
                <p className="animate-fade-in rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                    {feedback}
                </p>
            )}

            <div className="flex items-center gap-2">
                <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()
                            add()
                        }
                    }}
                    placeholder="Nova tag"
                    className="border-secondary/20 text-secondary placeholder:text-secondary/40 flex-1 rounded-full border px-3 py-1.5 text-sm outline-none"
                />
                <button
                    type="button"
                    onClick={add}
                    className="bg-primary text-secondary flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold transition active:scale-95"
                >
                    <Plus className="size-4" />
                    Adicionar
                </button>
            </div>
        </div>
    )
}

export function AdminTags() {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-secondary/60 text-sm">
                Cadastre e remova as tags usadas para classificar atores e eventos. Remover uma tag
                a retira de todos os registros vinculados (feito pelo back-end ao conectar).
            </p>
            <TagGroup title="Tags de Atores" kind="ator" />
            <TagGroup title="Tags de Eventos" kind="evento" />
        </div>
    )
}
