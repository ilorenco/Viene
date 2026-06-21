// Seção do Perfil: perguntas que o usuário enviou e as respostas do administrador.
// Migrada do useApi antigo: busca via useMyQuestions (<Suspense>). Enquanto carrega
// não mostra nada (fallback null) e, se não houver perguntas, a seção some — mesmo
// comportamento de antes.

import { MessageCircle } from 'lucide-react'
import { Suspense } from 'react'

import { Badge } from '@/components/ui/Badge'
import { useMyQuestions } from '@/features/profile/hooks/useMyQuestions'

function MyQuestionsContent() {
    const questions = useMyQuestions()

    if (questions.length === 0) {
        return null
    }

    return (
        <section>
            <header className="text-primary mb-3 flex items-center gap-2">
                <MessageCircle className="size-5" />
                <h2 className="text-secondary font-montserrat text-xl font-extrabold">
                    Minhas perguntas
                </h2>
            </header>

            <ul className="flex flex-col gap-2">
                {questions.map((item) => (
                    <li
                        key={item.id}
                        className="border-secondary/10 rounded-2xl border bg-white p-4"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <p className="text-secondary font-semibold">{item.question}</p>
                            <Badge variant={item.status === 'respondida' ? 'success' : 'neutral'}>
                                {item.status === 'respondida' ? 'Respondida' : 'Aguardando'}
                            </Badge>
                        </div>
                        {item.answer ? (
                            <p className="text-secondary/70 mt-2 text-sm">
                                <span className="text-primary font-semibold">Resposta: </span>
                                {item.answer}
                            </p>
                        ) : (
                            <p className="text-secondary/50 mt-2 text-sm">
                                Sua pergunta foi enviada e está aguardando resposta.
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export function MyQuestions() {
    return (
        <Suspense fallback={null}>
            <MyQuestionsContent />
        </Suspense>
    )
}
