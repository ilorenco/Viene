# Definições do Back-End – VIV IV

**Integrantes:**  
Deivid, Felipe Dalçoqui, Igor Henrique, José Willian, João Vitor, Lucas Zultanski, Lucas Duarte, Rhuan Jose, Thiago Oliveira  
**Universidade da Região de Joinville (UNIVILLE)**  
Joinville – SC – Brazil

---

## 📄 Descrição

Aqui iremos manter o relatório para organização de cada membro e tema documentado para melhor controle sobre as entregas de cada subequipe e suas datas.

---

## 🛠 Plano de Trabalho – Time de Back-End

**Projeto:** Desenvolvimento de Site para Empresa  
**Data de Entrega:** 18 de junho  
**Responsável pelo Back-End:** João Vitor Ferreira Buhring de Oliveira  
**Total de Integrantes:** 9  
**Divisão em 3 subequipes por tema**

---

### 🔐 Subequipe 1 – Autenticação, Usuários e Dashboard

**Nível de dificuldade:** 🟡 Médio-alto  
**Integrantes:** José, Lucas Zultanski, Deivid

#### Responsabilidades

- Login, cadastro e autenticação com JWT  
- Controle de acesso por tipo de usuário (admin, moderador, comum)  
- Middleware de autenticação/autorização  
- Dashboard pessoal do usuário  
- Modelos: Usuário e Role

#### Endpoints

##### Autenticação e Sessão
- `POST /login` – Autenticar usuário  
- `POST /register` – Criar conta  
- `POST /recuperar-senha` – Recuperar senha  
- `POST /login/social` – Login com conta de e-mail  
- `GET /me` – Dados do usuário logado

##### Usuário e Dashboard
- `GET /dashboard` – Ver dashboard  
- `PUT /usuarios/{id}` – Atualizar conta  
- `DELETE /usuarios/{id}` – Deletar conta

##### Notificações
- `GET /notificacoes` – Listar  
- `PUT /notificacoes/{id}/ler` – Marcar como lida

---

### 📁 Subequipe 2 – Perfis, Eventos e Categorias

**Nível de dificuldade:** 🟢 Médio  
**Integrantes:** Rhuan, Thiago, Lucas Duarte

#### Responsabilidades

- CRUD de Perfis e Eventos  
- Filtros por categoria e palavras-chave  
- Reaproveitamento de componentes  
- Relacionamento entre criadores e recursos  
- Modelos: Perfil, Evento, Categoria

#### Endpoints

##### Perfis
- `GET /perfis`  
- `GET /perfis/{id}`  
- `PUT /perfis/{id}`  
- `POST /perfis/{id}/denunciar`  
- `POST /perfis/{id}/favoritar`

##### Eventos
- `GET /eventos`  
- `GET /eventos/{id}`  
- `POST /eventos`  
- `PUT /eventos/{id}`  
- `DELETE /eventos/{id}`  
- `GET /eventos/rascunhos`  
- `GET /eventos/historico`

##### Inscrições
- `POST /eventos/{id}/inscricoes`  
- `DELETE /inscricoes/{id}`  
- `GET /usuarios/{id}/inscricoes`  
- `GET /eventos/{id}/ticket`

##### Categorias
- `GET /categorias/atores`  
- `GET /categorias/eventos`

---

### 🗺️ Subequipe 3 – Mapa, Busca e Administração

**Nível de dificuldade:** 🔴 Alto  
**Integrantes:** Igor, Felipe, João

#### Responsabilidades

- API de mapa com dados georreferenciados  
- Busca unificada (eventos e perfis)  
- Painel administrativo (aprovações, estatísticas)  
- Endpoints institucionais  
- Controle de acesso (admin/moderador)

#### Endpoints

##### Mapa Interativo
- `GET /mapa`  
- `POST /mapa`  
- `PUT /mapa/{id}`  
- `DELETE /mapa/{id}`

##### Atores e Contatos
- `GET /atores`  
- `GET /atores/{id}`  
- `POST /atores`  
- `PUT /atores/{id}`  
- `DELETE /atores/{id}`  
- `POST /atores/{id}/contatos`  
- `DELETE /contatos/{id}`

##### Busca
- `GET /busca?q=palavra-chave`

##### Administração
- `GET /admin/aprovacoes`  
- `PUT /admin/eventos/{id}`  
- `PUT /admin/atores/{id}`  
- `GET /admin/estatisticas`  
- `GET /admin/usuarios`  
- `POST /admin/comentarios`

##### Institucional (opcional)
- `GET /ajuda`  
- `GET /contato`  
- `GET /termos`

---

## 📌 Itens Transversais

- Tratamento de erros com mensagens claras e status HTTP corretos  
- Redirecionamentos com base no perfil do usuário  
- Reutilização de código (componentização)  
- Integração com APIs externas (principalmente mapas)  
- Criação de diagramas UML (casos de uso, classes etc.)
"""








