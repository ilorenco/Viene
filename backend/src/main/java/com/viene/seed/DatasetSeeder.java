package com.viene.seed;

import com.viene.actor.Actor;
import com.viene.actor.ActorRepository;
import com.viene.actor.ActorType;
import com.viene.common.ModerationStatus;
import com.viene.event.Event;
import com.viene.event.EventCategory;
import com.viene.event.EventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.text.Normalizer;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// Carrega o dataset real (216 atores + 33 eventos) de resources/seed/viene_data.json.
// Roda SO no perfil "prod" (Azure SQL) -- no dev, os atores/eventos vem dos seeders
// mock. Idempotente: so insere se a tabela estiver vazia.
@Component
@Profile("prod")
@RequiredArgsConstructor
@Slf4j
public class DatasetSeeder implements ApplicationRunner {

    private static final String DATASET = "seed/viene_data.json";

    private final ActorRepository actorRepository;
    private final EventRepository eventRepository;
    private final ObjectMapper objectMapper;

    // tipo (texto do dataset, normalizado) -> ActorType. A categoria/area sai sozinha
    // de ActorType.category(). Chaves em ASCII minusculo, sem acento (ver norm()).
    private static final Map<String, ActorType> ACTOR_TYPES = Map.ofEntries(
            Map.entry("empresa consolidada corporacao", ActorType.CORPORACAO),
            Map.entry("startup", ActorType.STARTUP),
            Map.entry("startup spin off corporativa ou academica", ActorType.SPINOFF),
            Map.entry("empresa de servicos tecnologicos software house consultoria", ActorType.SOFTWAREHOUSE),
            Map.entry("mpe micro e pequena empresa", ActorType.MPE),
            Map.entry("hub de inovacao", ActorType.HUB),
            Map.entry("incubadora aceleradora", ActorType.INCUBADORA),
            Map.entry("parque tecnologico", ActorType.PARQUE),
            Map.entry("espaco de coworking", ActorType.COWORKING),
            Map.entry("coworking", ActorType.COWORKING),
            Map.entry("espaco maker fablab", ActorType.MAKER),
            Map.entry("laboratorio de inovacao", ActorType.PD),
            Map.entry("p d centro de pesquisa e desenvolvimento", ActorType.PD),
            Map.entry("ies instituicao de ensino superior", ActorType.IES),
            Map.entry("universidade comunitaria", ActorType.IES),
            Map.entry("instituto federal", ActorType.IES),
            Map.entry("instituicao de ensino tecnico profissionalizante", ActorType.TECNICO),
            Map.entry("entidade de formacao industrial", ActorType.TECNICO),
            Map.entry("orgao governamental", ActorType.GOVERNO),
            Map.entry("orgao publico municipal", ActorType.GOVERNO),
            Map.entry("associacao entidade de classe", ActorType.ASSOCIACAO),
            Map.entry("associacao de inovacao", ActorType.ASSOCIACAO),
            Map.entry("associacao empresarial", ActorType.ASSOCIACAO),
            Map.entry("entidade empresarial", ActorType.ASSOCIACAO),
            Map.entry("federacao industrial", ActorType.ASSOCIACAO),
            Map.entry("agencia de fomento", ActorType.FOMENTO),
            Map.entry("entidade de apoio empresarial", ActorType.FOMENTO),
            Map.entry("fundo de investimento venture capital", ActorType.VC),
            Map.entry("fundo de investimento", ActorType.VC),
            Map.entry("investidor anjo", ActorType.ANJO));

    private static final Map<String, EventCategory> EVENT_CATEGORIES = Map.ofEntries(
            Map.entry("conferencia", EventCategory.CONFERENCIAS),
            Map.entry("conferencia festival", EventCategory.CONFERENCIAS),
            Map.entry("meetup", EventCategory.MEETUPS),
            Map.entry("workshop", EventCategory.WORKSHOPS),
            Map.entry("feira", EventCategory.FEIRAS),
            Map.entry("palestra", EventCategory.PALESTRAS),
            Map.entry("hackathon", EventCategory.HACKATHONS),
            Map.entry("bootcamp", EventCategory.BOOTCAMPS));

    @Override
    public void run(ApplicationArguments args) {
        JsonNode root = readDataset();
        if (root == null) {
            return;
        }
        seedActors(root.path("atores"));
        seedEvents(root.path("eventos"));
    }

    private JsonNode readDataset() {
        try (InputStream in = new ClassPathResource(DATASET).getInputStream()) {
            return objectMapper.readTree(in);
        } catch (Exception ex) {
            log.error("Nao foi possivel ler o dataset {}", DATASET, ex);
            return null;
        }
    }

    private void seedActors(JsonNode nodes) {
        if (actorRepository.count() > 0 || !nodes.isArray()) {
            return;
        }
        List<Actor> actors = new ArrayList<>();
        for (JsonNode n : nodes) {
            ActorType type = ACTOR_TYPES.get(norm(text(n, "tipo")));
            if (type == null) {
                log.warn("Tipo de ator nao mapeado: '{}' ({}). Usando CORPORACAO.",
                        text(n, "tipo"), text(n, "instituicao"));
                type = ActorType.CORPORACAO;
            }
            actors.add(Actor.builder()
                    .name(text(n, "instituicao"))
                    .description(text(n, "descricao"))
                    .type(type)
                    .category(type.category())
                    .city(text(n, "cidade"))
                    .neighborhood(text(n, "bairro"))
                    .latitude(getDouble(n, "latitude"))
                    .longitude(getDouble(n, "longitude"))
                    .address(buildAddress(n))
                    .cep(clean(text(n, "cep")))
                    .founded(clean(text(n, "data_abertura")))
                    .tags(text(n, "tags"))
                    .website(clean(text(n, "website")))
                    .phone(clean(text(n, "telefone")))
                    .email(clean(text(n, "email")))
                    .linkedin(clean(text(n, "linkedin")))
                    .instagram(clean(text(n, "instagram")))
                    .youtube(clean(text(n, "youtube")))
                    .status(ModerationStatus.APROVADO)
                    .build());
        }
        actorRepository.saveAll(actors);
        log.info("Dataset: {} atores semeados.", actors.size());
    }

    private void seedEvents(JsonNode nodes) {
        if (eventRepository.count() > 0 || !nodes.isArray()) {
            return;
        }
        List<Event> events = new ArrayList<>();
        for (JsonNode n : nodes) {
            EventCategory category = EVENT_CATEGORIES.get(norm(text(n, "tipo")));
            if (category == null) {
                log.warn("Tipo de evento nao mapeado: '{}' ({}). Usando MEETUPS.",
                        text(n, "tipo"), text(n, "nome"));
                category = EventCategory.MEETUPS;
            }
            events.add(Event.builder()
                    .title(text(n, "nome"))
                    .date(parseDate(clean(text(n, "data"))))
                    .start(parseTime(clean(text(n, "inicio"))))
                    .end(parseTime(clean(text(n, "fim"))))
                    .category(category)
                    .address(buildAddress(n))
                    .description(text(n, "descricao"))
                    .price(clean(text(n, "preco")))
                    .capacity(clean(text(n, "capacidade")))
                    .ticketUrl(clean(text(n, "link_sympla")))
                    .latitude(getDouble(n, "latitude"))
                    .longitude(getDouble(n, "longitude"))
                    .status(ModerationStatus.APROVADO)
                    .build());
        }
        eventRepository.saveAll(events);
        log.info("Dataset: {} eventos semeados.", events.size());
    }

    // ----- helpers -----

    // Normaliza p/ casar tipos: tira acento, minuscula, troca nao-alfanumerico por
    // espaco e colapsa. Ex.: "Parque Tecnologico" -> "parque tecnologico".
    private static String norm(String s) {
        if (s == null) {
            return "";
        }
        String n = Normalizer.normalize(s, Normalizer.Form.NFD).replaceAll("\\p{M}", "");
        return n.toLowerCase().replaceAll("[^a-z0-9]+", " ").trim();
    }

    private static String text(JsonNode node, String field) {
        JsonNode v = node.get(field);
        if (v == null || v.isNull()) {
            return null;
        }
        String s = v.asText().trim();
        return s.isEmpty() ? null : s;
    }

    // Devolve null quando o valor e' um placeholder do dataset ("Nao informado" etc.).
    private static String clean(String s) {
        if (s == null) {
            return null;
        }
        String n = norm(s);
        if (n.isEmpty() || n.equals("nao informado") || n.equals("na") || n.equals("nd")) {
            return null;
        }
        return s;
    }

    private static Double getDouble(JsonNode node, String field) {
        JsonNode v = node.get(field);
        return (v == null || v.isNull() || !v.isNumber()) ? null : v.asDouble();
    }

    private static String buildAddress(JsonNode node) {
        String joined = Stream.of(text(node, "rua_numero"), text(node, "bairro"), text(node, "cidade"))
                .filter(s -> s != null && !norm(s).equals("nao informado"))
                .collect(Collectors.joining(", "));
        return joined.isEmpty() ? null : joined;
    }

    private LocalDate parseDate(String s) {
        if (s == null) {
            return null;
        }
        try {
            return LocalDate.parse(s);
        } catch (Exception ex) {
            log.warn("Data invalida no dataset: '{}'", s);
            return null;
        }
    }

    private LocalTime parseTime(String s) {
        if (s == null) {
            return null;
        }
        try {
            return LocalTime.parse(s);
        } catch (Exception ex) {
            return null;
        }
    }
}
