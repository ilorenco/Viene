package com.viene.tag;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class TagSeeder implements ApplicationRunner {

    private static final List<String> ATOR_TAG_LABELS = List.of(
            "Indústria 4.0 & Manufatura Avançada",
            "Internet das Coisas (IoT)",
            "Inteligência Artificial & Big Data",
            "Biotecnologia & Nanotecnologia",
            "Realidade Virtual/Aumentada (AR/VR)",
            "Blockchain / Web3",
            "Cybersecurity",
            "Computação Quântica",
            "Impressão 3D & Manufatura Aditiva",
            "LogTech (Logística & Supply Chain)",
            "HardTech & Metal-Mecânica",
            "PlastTech & Química",
            "AutoTech & Mobilidade",
            "HealthTech",
            "FinTech",
            "GovTech",
            "EdTech",
            "Sustentabilidade & ESG (GreenTech)",
            "RetailTech",
            "HRTech",
            "Creator Economy & MídiaTech",
            "PropertyTech / PropTech",
            "InsureTech",
            "FoodTech",
            "TravelTech (Turismo)",
            "MarTech (Marketing)",
            "Smart Cities",
            "AgriTech");

    private static final List<String> EVENTO_TAG_LABELS = List.of(
            "Workshops",
            "Hackathons",
            "Meetups",
            "Palestras",
            "Conferências",
            "Bootcamps",
            "Feiras",
            "Demo Day");

    private final TagRepository tagRepository;

    @Override
    public void run(ApplicationArguments args) {
        if (tagRepository.count() > 0) {
            return;
        }

        List<Tag> tags = Stream.concat(
                        ATOR_TAG_LABELS.stream().map(label -> tag(label, TagKind.ATOR)),
                        EVENTO_TAG_LABELS.stream().map(label -> tag(label, TagKind.EVENTO)))
                .toList();

        tagRepository.saveAll(tags);
    }

    private Tag tag(String label, TagKind kind) {
        return Tag.builder().label(label).kind(kind).build();
    }
}
