const defaultAddress = 'Rua Joinville, Zona Industrial Norte, Joinville - SC, 89239-220'
const defaultDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae tellus nec metus feugiat varius. Morbi at nisi a risus lacinia hendrerit. Vivamus ac sapien sed enim finibus eleifend. Sed at justo nec ipsum lobortis feugiat. Nulla facilisi.'
const defaultPolicies =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae tellus nec metus feugiat varius. Morbi at nisi a risus lacinia hendrerit. Vivamus ac sapien sed enim finibus eleifend. Sed at justo nec ipsum lobortis feugiat. Nulla facilisi.'

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

// Constrói o texto de exibição a partir de uma data ISO (YYYY-MM-DD).
function displayDate(date) {
    const [year, month, day] = date.split('-')
    return `${day} ${MONTHS[Number(month) - 1]}. ${year}`
}

// `date` (ISO) é usado pelo calendário para destacar os dias com eventos;
// `category` é usado pelo filtro de tipos de evento;
// `datetime` é o texto exibido nos cards;
// `start`/`end` são os horários (usados na página de especificações do evento);
// `ticketUrl` é o link do ingresso (mock; ver nota sobre a API do Sympla).
function makeEvent(id, title, date, start, end, category) {
    return {
        id,
        title,
        date,
        category,
        start,
        end,
        datetime: `${start} - ${displayDate(date)} > ${end} - ${displayDate(date)}`,
        address: defaultAddress,
        description: defaultDescription,
        policies: defaultPolicies,
        ticketUrl: `https://www.sympla.com.br/evento/${id}`,
    }
}

export const mockEvents = [
    makeEvent(1, 'Evento Pitch Inovaparq 2025', '2026-06-05', '13:00', '19:00', 'demoday'),
    makeEvent(2, 'Hackathon Joinville Tech', '2026-06-08', '09:00', '18:00', 'hackathons'),
    makeEvent(3, 'Workshop UX Design', '2026-06-12', '19:00', '22:00', 'workshops'),
    makeEvent(4, 'Meetup React Brasil', '2026-06-12', '19:30', '21:30', 'meetups'),
    makeEvent(5, 'Conferência Startup Day', '2026-06-18', '08:30', '17:00', 'conferencias'),
    makeEvent(6, 'Bootcamp Cloud Computing', '2026-06-22', '08:00', '12:00', 'bootcamps'),
    makeEvent(7, 'Festival de Inovação Catarinense', '2026-06-25', '10:00', '20:00', 'feiras'),
    makeEvent(8, 'Demo Day Aceleradoras', '2026-07-02', '14:00', '18:00', 'demoday'),
    makeEvent(9, 'Talk: Liderança em Tech', '2026-07-09', '19:00', '21:00', 'palestras'),
    makeEvent(10, 'Encontro de Mulheres na Tecnologia', '2026-07-15', '18:30', '21:00', 'meetups'),
    makeEvent(11, 'Imersão em Produto Digital', '2026-07-20', '09:00', '17:00', 'workshops'),
    makeEvent(12, 'Open Day Universidades de SC', '2026-07-28', '10:00', '16:00', 'feiras'),
]
