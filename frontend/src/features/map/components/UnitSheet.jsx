import { Funnel } from 'lucide-react'

export function UnitSheet({ unit }) {
    return (
        <section className="relative z-1000 -mt-6 rounded-t-3xl bg-white px-6 pt-4 pb-8">
            <button
                type="button"
                aria-label="Filtros"
                className="bg-primary absolute -top-20 right-7 cursor-pointer rounded-full p-3"
            >
                <Funnel className="size-8" strokeWidth={2} />
            </button>

            <div aria-hidden className="bg-primary mx-auto mb-4 h-1.5 w-20 rounded-full" />

            <h2 className="text-secondary text-2xl font-extrabold">
                {unit ? unit.name : 'Mapeamento'}
            </h2>
            <p className="text-secondary text-xs">
                {unit
                    ? unit.description
                    : 'Escolha uma unidade de inovação para ver mais informações'}
            </p>
        </section>
    )
}
