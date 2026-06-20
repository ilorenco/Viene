// Eventos georreferenciados para exibir no mapa (mock). A categoria acompanha
// as categorias de eventos da plataforma (ver mocks/eventCategories).
// As posições são deslocadas das dos atores para os pinos não se sobreporem.
//
// `date` (ISO YYYY-MM-DD) é usado pelo filtro de DATA do mapa (calendário +
// "em até X dias"); `datetime` é só o texto exibido. As datas estão a partir de
// junho/2026 (próximas em relação a "hoje") para o filtro fazer sentido.

export const mockMapEvents = [
    {
        id: 1,
        title: 'Evento Pitch Inovaparq 2025',
        category: 'demoday',
        position: [-26.3541, -48.8386],
        address: 'Inovaparq, Joinville - SC',
        date: '2026-06-15',
        datetime: '15 Jun. 2026 • 13:00',
    },
    {
        id: 2,
        title: 'Hackathon Joinville Tech',
        category: 'hackathons',
        position: [-26.2704, -48.8587],
        address: 'Perini Business Park, Joinville - SC',
        date: '2026-06-22',
        datetime: '22 Jun. 2026 • 09:00',
    },
    {
        id: 3,
        title: 'Workshop UX Design',
        category: 'workshops',
        position: [-26.3026, -48.8463],
        address: 'Tecnoparq, Joinville - SC',
        date: '2026-06-28',
        datetime: '28 Jun. 2026 • 19:00',
    },
    {
        id: 4,
        title: 'Meetup React Brasil',
        category: 'meetups',
        position: [-26.3087, -48.8536],
        address: 'Softville, Joinville - SC',
        date: '2026-07-04',
        datetime: '04 Jul. 2026 • 19:30',
    },
    {
        id: 5,
        title: 'Conferência Startup Day',
        category: 'conferencias',
        position: [-26.287, -48.8441],
        address: 'Cetiq, Joinville - SC',
        date: '2026-07-10',
        datetime: '10 Jul. 2026 • 08:30',
    },
    {
        id: 6,
        title: 'Feira de Inovação Catarinense',
        category: 'feiras',
        position: [-26.3172, -48.8297],
        address: 'Sapiens Parque, Joinville - SC',
        date: '2026-07-18',
        datetime: '18 Jul. 2026 • 10:00',
    },
    {
        id: 7,
        title: 'Palestra: Liderança em Tech',
        category: 'palestras',
        position: [-26.3533, -48.8404],
        address: 'UNIVILLE, Joinville - SC',
        date: '2026-07-24',
        datetime: '24 Jul. 2026 • 19:00',
    },
    {
        id: 8,
        title: 'Bootcamp Cloud Computing',
        category: 'bootcamps',
        position: [-26.2645, -48.8475],
        address: 'Ágora Tech Park, Joinville - SC',
        date: '2026-07-30',
        datetime: '30 Jul. 2026 • 08:00',
    },
]
