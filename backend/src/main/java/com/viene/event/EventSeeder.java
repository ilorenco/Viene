package com.viene.event;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
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

    private List<Event> sampleEvents() {
        return List.of(
                event("Evento Pitch Inovaparq 2025", "2026-06-05", "13:00", "19:00", EventCategory.DEMODAY),
                event("Hackathon Joinville Tech", "2026-06-08", "09:00", "18:00", EventCategory.HACKATHONS),
                event("Workshop UX Design", "2026-06-12", "19:00", "22:00", EventCategory.WORKSHOPS),
                event("Meetup React Brasil", "2026-06-12", "19:30", "21:30", EventCategory.MEETUPS),
                event("Conferência Startup Day", "2026-06-18", "08:30", "17:00", EventCategory.CONFERENCIAS),
                event("Bootcamp Cloud Computing", "2026-06-22", "08:00", "12:00", EventCategory.BOOTCAMPS),
                event("Festival de Inovação Catarinense", "2026-06-25", "10:00", "20:00", EventCategory.FEIRAS),
                event("Demo Day Aceleradoras", "2026-07-02", "14:00", "18:00", EventCategory.DEMODAY),
                event("Talk: Liderança em Tech", "2026-07-09", "19:00", "21:00", EventCategory.PALESTRAS),
                event("Encontro de Mulheres na Tecnologia", "2026-07-15", "18:30", "21:00", EventCategory.MEETUPS),
                event("Imersão em Produto Digital", "2026-07-20", "09:00", "17:00", EventCategory.WORKSHOPS),
                event("Open Day Universidades de SC", "2026-07-28", "10:00", "16:00", EventCategory.FEIRAS));
    }

    private Event event(String title, String date, String start, String end, EventCategory category) {
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
                .build();
    }
}
