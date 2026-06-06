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
    { id: 1, title: 'Evento Pitch Inovaparq 2025', category: 'demoday', ...defaults },
    { id: 2, title: 'Hackathon Joinville Tech', category: 'hackathons', ...defaults },
    { id: 3, title: 'Workshop UX Design', category: 'workshops', ...defaults },
    { id: 4, title: 'Meetup React Brasil', category: 'meetups', ...defaults },
    { id: 5, title: 'Conferência Startup Day', category: 'conferencias', ...defaults },
    { id: 6, title: 'Bootcamp Cloud Computing', category: 'bootcamps', ...defaults },
    { id: 7, title: 'Festival de Inovação Catarinense', category: 'feiras', ...defaults },
    { id: 8, title: 'Demo Day Aceleradoras', category: 'demoday', ...defaults },
    { id: 9, title: 'Talk: Liderança em Tech', category: 'palestras', ...defaults },
    { id: 10, title: 'Encontro de Mulheres na Tecnologia', category: 'meetups', ...defaults },
    { id: 11, title: 'Imersão em Produto Digital', category: 'workshops', ...defaults },
    { id: 12, title: 'Open Day Universidades de SC', category: 'feiras', ...defaults },
]
