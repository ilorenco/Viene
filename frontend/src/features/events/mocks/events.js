const defaultAddress = 'Rua Joinville, Zona Industrial Norte, Joinville - SC, 89239-220'
const defaultDatetime = '13:00 - 15 Abr. 2025 > 19:00 - 15 Abr. 2025'
const defaultDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae tellus nec metus feugiat varius. Morbi at nisi a risus lacinia hendrerit. Vivamus ac sapien sed enim finibus eleifend. Sed at justo nec ipsum lobortis feugiat. Nulla facilisi.'
const defaultPolicies =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae tellus nec metus feugiat varius. Morbi at nisi a risus lacinia hendrerit. Vivamus ac sapien sed enim finibus eleifend. Sed at justo nec ipsum lobortis feugiat. Nulla facilisi.'

const defaults = {
    address: defaultAddress,
    datetime: defaultDatetime,
    description: defaultDescription,
    policies: defaultPolicies,
}

export const mockEvents = [
    { id: 1, title: 'Evento Pitch Inovaparq 2025', ...defaults },
    { id: 2, title: 'Hackathon Joinville Tech', ...defaults },
    { id: 3, title: 'Workshop UX Design', ...defaults },
    { id: 4, title: 'Meetup React Brasil', ...defaults },
    { id: 5, title: 'Conferência Startup Day', ...defaults },
    { id: 6, title: 'Bootcamp Cloud Computing', ...defaults },
    { id: 7, title: 'Festival de Inovação Catarinense', ...defaults },
    { id: 8, title: 'Demo Day Aceleradoras', ...defaults },
    { id: 9, title: 'Talk: Liderança em Tech', ...defaults },
    { id: 10, title: 'Encontro de Mulheres na Tecnologia', ...defaults },
    { id: 11, title: 'Imersão em Produto Digital', ...defaults },
    { id: 12, title: 'Open Day Universidades de SC', ...defaults },
]
