package com.viene.event;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

// Dados mock de eventos: roda SO no perfil "dev" (H2 local). Em producao (Azure SQL)
// os eventos vem do dataset real, carregado pelo seeder do JSON.
@Component
@Profile("dev")
@RequiredArgsConstructor
public class EventSeeder implements ApplicationRunner {

    private static final String DEFAULT_ADDRESS =
            "Rua Joinville, Zona Industrial Norte, Joinville - SC, 89239-220";
    private static final String DEFAULT_DESCRIPTION =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae tellus nec metus feugiat varius. Morbi at nisi a risus lacinia hendrerit. Vivamus ac sapien sed enim finibus eleifend. Sed at justo nec ipsum lobortis feugiat. Nulla facilisi.";
    private static final String DEFAULT_POLICIES = DEFAULT_DESCRIPTION;

    private final EventRepository eventRepository;

    @Override
    public void run(ApplicationArguments args) {
        if (eventRepository.count() > 0) {
            return;
        }
        eventRepository.saveAll(sampleEvents());
    }

    // Posição (lat/lng) só pros eventos cujo título bate exatamente com um dos
    // pontos georreferenciados do mapa (ver mapEvents.js do front) — os demais
    // ficam sem posição, o que é normal (nem todo evento aparece no mapa).
    private List<Event> sampleEvents() {
        return List.of(
                event("Evento Pitch Inovaparq 2025", "2026-06-05", "13:00", "19:00", EventCategory.DEMODAY, -26.3541, -48.8386),
                event("Hackathon Joinville Tech", "2026-06-08", "09:00", "18:00", EventCategory.HACKATHONS, -26.2704, -48.8587),
                event("Workshop UX Design", "2026-06-12", "19:00", "22:00", EventCategory.WORKSHOPS, -26.3026, -48.8463),
                event("Meetup React Brasil", "2026-06-12", "19:30", "21:30", EventCategory.MEETUPS, -26.3087, -48.8536),
                event("Conferência Startup Day", "2026-06-18", "08:30", "17:00", EventCategory.CONFERENCIAS, -26.287, -48.8441),
                event("Bootcamp Cloud Computing", "2026-06-22", "08:00", "12:00", EventCategory.BOOTCAMPS, -26.2645, -48.8475),
                event("Festival de Inovação Catarinense", "2026-06-25", "10:00", "20:00", EventCategory.FEIRAS, null, null),
                event("Demo Day Aceleradoras", "2026-07-02", "14:00", "18:00", EventCategory.DEMODAY, null, null),
                event("Talk: Liderança em Tech", "2026-07-09", "19:00", "21:00", EventCategory.PALESTRAS, null, null),
                event("Encontro de Mulheres na Tecnologia", "2026-07-15", "18:30", "21:00", EventCategory.MEETUPS, null, null),
                event("Imersão em Produto Digital", "2026-07-20", "09:00", "17:00", EventCategory.WORKSHOPS, null, null),
                event("Open Day Universidades de SC", "2026-07-28", "10:00", "16:00", EventCategory.FEIRAS, null, null));
    }

    private Event event(
            String title, String date, String start, String end, EventCategory category,
            Double latitude, Double longitude) {
        return Event.builder()
                .title(title)
                .date(LocalDate.parse(date))
                .start(LocalTime.parse(start))
                .end(LocalTime.parse(end))
                .category(category)
                .address(DEFAULT_ADDRESS)
                .description(DEFAULT_DESCRIPTION)
                .policies(DEFAULT_POLICIES)
                .ticketUrl(null)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
