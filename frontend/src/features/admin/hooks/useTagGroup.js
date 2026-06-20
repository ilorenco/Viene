// Estado e ações de um grupo de tags do editor do admin (criar/remover), fora do
// componente. As tags são uma lista LOCAL (semente via `initial`) editada na
// sessão; createTag/deleteTag são os stubs do back-end. Ao remover, o feedback
// informa quantos registros usavam a tag (countTagUsage).

import { useState } from 'react'

import { createTag, deleteTag } from '@/features/admin/services/tags'
import { useFeedback } from '@/hooks/useFeedback'
import { countTagUsage } from '@/lib/tagUsage'

export function useTagGroup({ kind, initial }) {
    const [tags, setTags] = useState(initial)
    const [draft, setDraft] = useState('')
    const [feedback, setFeedback] = useFeedback()

    async function add() {
        const value = draft.trim()
        if (!value || tags.includes(value)) return
        await createTag({ label: value, kind }) // envia ao back-end (stub no modo real)
        setTags((prev) => [...prev, value])
        setDraft('')
        setFeedback(`Tag "${value}" criada.`)
    }

    async function remove(tag) {
        const used = countTagUsage(kind, tag)
        await deleteTag({ label: tag, kind }) // back-end cascateia p/ atores/eventos
        setTags((prev) => prev.filter((current) => current !== tag))
        setFeedback(
            used > 0
                ? `Tag "${tag}" removida — será retirada de ${used} registro(s) vinculado(s).`
                : `Tag "${tag}" removida.`,
        )
    }

    return { tags, draft, setDraft, feedback, add, remove }
}
