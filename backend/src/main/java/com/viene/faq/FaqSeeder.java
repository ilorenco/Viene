package com.viene.faq;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

// Perguntas frequentes iniciais. Conteudo REAL (nao mock), entao roda em dev e prod.
// Insere so se a tabela estiver vazia -> nao sobrescreve o que os admins editarem
// depois pelo painel (Plataforma > Perguntas).
@Component
@RequiredArgsConstructor
@Slf4j
public class FaqSeeder implements ApplicationRunner {

    private final FaqRepository faqRepository;

    @Override
    public void run(ApplicationArguments args) {
        if (faqRepository.count() > 0) {
            return;
        }
        faqRepository.saveAll(initialFaqs());
        log.info("FAQ inicial semeada ({} perguntas).", faqRepository.count());
    }

    private List<Faq> initialFaqs() {
        return List.of(
                // ----- GERAL -----
                Faq.builder()
                        .category(FaqCategory.GERAL)
                        .question("O que é o Viene?")
                        .answer("O Viene é uma plataforma que mapeia o ecossistema de inovação da "
                                + "região de Joinville. Num só lugar você encontra atores (startups, "
                                + "universidades, parques tecnológicos, investidores, órgãos públicos) "
                                + "e eventos, e vê como tudo se conecta.")
                        .build(),
                Faq.builder()
                        .category(FaqCategory.GERAL)
                        .question("Usar o Viene é gratuito?")
                        .answer("Sim. Navegar pelo mapa e pelos catálogos de atores e eventos é "
                                + "totalmente gratuito. Alguns eventos podem ter ingresso pago, mas "
                                + "isso é definido por quem organiza o evento.")
                        .build(),
                Faq.builder()
                        .category(FaqCategory.GERAL)
                        .question("De onde vêm as informações da plataforma?")
                        .answer("Os dados são organizados pela equipe do Viene e enriquecidos com "
                                + "sugestões da comunidade. Toda sugestão passa por moderação antes "
                                + "de aparecer publicamente.")
                        .build(),

                // ----- MAPA -----
                Faq.builder()
                        .category(FaqCategory.MAPA)
                        .question("Como funciona o mapa?")
                        .answer("Cada marcador no mapa é um ator ou evento do ecossistema. Clique "
                                + "num marcador para ver os detalhes. Quando vários ficam no mesmo "
                                + "ponto, eles viram um agrupamento que você pode abrir.")
                        .build(),
                Faq.builder()
                        .category(FaqCategory.MAPA)
                        .question("O que significam as cores dos marcadores?")
                        .answer("Cada cor representa uma área do ecossistema: Ambientes de Inovação, "
                                + "Setor Privado, Setor Público e Educação. Assim dá para identificar "
                                + "rapidamente o tipo de cada ponto no mapa.")
                        .build(),
                Faq.builder()
                        .category(FaqCategory.MAPA)
                        .question("Posso sugerir um novo ponto no mapa?")
                        .answer("Pode! Use a opção de sugerir um ponto. Sua sugestão passa por "
                                + "moderação da equipe antes de ser publicada no mapa.")
                        .build(),

                // ----- ATORES -----
                Faq.builder()
                        .category(FaqCategory.ATORES)
                        .question("O que é um \"ator\" de inovação?")
                        .answer("É qualquer organização que participa do ecossistema: startups, "
                                + "empresas, universidades e escolas técnicas, incubadoras, parques "
                                + "tecnológicos, investidores, órgãos públicos e entidades de fomento.")
                        .build(),
                Faq.builder()
                        .category(FaqCategory.ATORES)
                        .question("Como encontro um ator específico?")
                        .answer("No catálogo de atores você pode buscar pelo nome e filtrar por área, "
                                + "tipo e tags. Também dá para chegar a um ator clicando no marcador "
                                + "dele no mapa.")
                        .build(),
                Faq.builder()
                        .category(FaqCategory.ATORES)
                        .question("Represento uma empresa ou instituição. Como apareço no Viene?")
                        .answer("Você pode sugerir o cadastro do seu ator pela plataforma. Depois de "
                                + "passar pela moderação, ele aparece no mapa e no catálogo.")
                        .build(),

                // ----- EVENTOS -----
                Faq.builder()
                        .category(FaqCategory.EVENTOS)
                        .question("Como vejo os eventos?")
                        .answer("No catálogo de eventos você encontra a lista de eventos do "
                                + "ecossistema, com filtros por categoria, período e busca por nome.")
                        .build(),
                Faq.builder()
                        .category(FaqCategory.EVENTOS)
                        .question("Como me inscrevo em um evento?")
                        .answer("Abra os detalhes do evento: quando houver inscrição ou venda de "
                                + "ingresso, o link para participar fica disponível ali.")
                        .build(),

                // ----- CONTA -----
                Faq.builder()
                        .category(FaqCategory.CONTA)
                        .question("Preciso de uma conta para usar o Viene?")
                        .answer("Para explorar o mapa e os catálogos, não. A conta é necessária "
                                + "apenas para recursos pessoais, como salvar favoritos e gerenciar "
                                + "seus ingressos.")
                        .build(),
                Faq.builder()
                        .category(FaqCategory.CONTA)
                        .question("Como crio uma conta?")
                        .answer("Clique em Entrar e depois em Cadastre-se. Basta informar nome, "
                                + "e-mail e uma senha para criar sua conta gratuitamente.")
                        .build(),
                Faq.builder()
                        .category(FaqCategory.CONTA)
                        .question("Esqueci minha senha. E agora?")
                        .answer("Na tela de login, use a opção \"Esqueci minha senha\" e siga as "
                                + "instruções enviadas para o seu e-mail.")
                        .build(),

                // ----- FAVORITOS -----
                Faq.builder()
                        .category(FaqCategory.FAVORITOS)
                        .question("Como salvo um ator ou evento como favorito?")
                        .answer("Clique no ícone de coração no card ou na página do ator/evento. É "
                                + "preciso estar logado; depois você acessa tudo em Favoritos.")
                        .build(),

                // ----- ACESSIBILIDADE -----
                Faq.builder()
                        .category(FaqCategory.ACESSIBILIDADE)
                        .question("O Viene tem recursos de acessibilidade?")
                        .answer("Sim. Pelo botão de acessibilidade você ativa modo noturno, filtros "
                                + "para daltonismo, leitura do conteúdo em voz alta e ajuste do "
                                + "tamanho da fonte. Suas preferências ficam salvas no navegador.")
                        .build(),
                Faq.builder()
                        .category(FaqCategory.ACESSIBILIDADE)
                        .question("Como ativo a leitura em voz alta ou o modo noturno?")
                        .answer("Abra o widget de acessibilidade (o botão flutuante) e escolha a "
                                + "opção desejada. Você pode ligar e desligar cada recurso quando "
                                + "quiser.")
                        .build());
    }
}
