// Estado e ações de um grupo de tags do editor do admin (criar/remover). As
// tags vêm da API real (GET /admin/tags, filtradas por kind); o id de cada
// uma é guardado à parte (idsByLabel) pra DELETE /admin/tags/{id} funcionar —
// a tela só desenha labels, nunca ids.

import { useEffect, useState } from 'react'

import { createTag, deleteTag, listTags } from '@/features/admin/services/tags'
import { useFeedback } from '@/hooks/useFeedback'
import { countTagUsage } from '@/lib/tagUsage'

export function useTagGroup({ kind }) {
    const [tags, setTags] = useState([])
    const [idsByLabel, setIdsByLabel] = useState(new Map())
    const [draft, setDraft] = useState('')
    const [feedback, setFeedback] = useFeedback()

    useEffect(() => {
        let active = true
        listTags(kind).then((items) => {
            if (!active) return
            setTags(items.map((item) => item.label))
            setIdsByLabel(new Map(items.map((item) => [item.label, item.id])))
        })
        return () => {
            active = false
        }
    }, [kind])

    async function add() {
        const value = draft.trim()
        if (!value || tags.includes(value)) return
        const created = await createTag({ label: value, kind }) // envia ao back-end
        setTags((prev) => [...prev, value])
        setIdsByLabel((prev) => new Map(prev).set(value, created.id))
        setDraft('')
        setFeedback(`Tag "${value}" criada.`)
    }

    async function remove(tag) {
        const used = await countTagUsage(kind, tag)
        await deleteTag({ id: idsByLabel.get(tag), label: tag, kind }) // back-end cascateia p/ atores/eventos
        setTags((prev) => prev.filter((current) => current !== tag))
        setFeedback(
            used > 0
                ? `Tag "${tag}" removida — será retirada de ${used} registro(s) vinculado(s).`
                : `Tag "${tag}" removida.`,
        )
    }

    return { tags, draft, setDraft, feedback, add, remove }
}
