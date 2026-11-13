---

# **UNIVERSIDADE FEDERAL DE SÃO CARLOS**

Centro de Ciências Exatas e de Tecnologia  
Departamento de Computação

**Interação Humano Computador (IHC)**  
Sistema de Vigilância Comunitária para Mulheres em São Carlos  
**Pacote 2:** Lista de requisitos

Carolina da Silva Santos (820606)   
Ivan Fernando Rizzi Villalba (821478)  
Gustavo Amadeu Mancuzo de Sylos (845572)  
Maykon dos Santos Gonçalves (821653)  
Nicolas Queiroz Bertozzo (822070)  
Nicole Correa Ramos (823127)

**São Carlos, SP**  
02 de outubro de 2026

# Introdução:

O presente documento consolida os Requisitos Funcionais (RF) e Requisitos Não Funcionais (RNF) para o desenvolvimento do sistema ***Ajudivas***, uma aplicação móvel de vigilância comunitária, segurança urbana e apoio a mulheres na cidade de São Carlos, com foco prioritário no público universitário e em acessibilidade.

**Este artefato foi produzido por:**  
	Ivan Fernando Rizzi Villalba  
	Maykon dos Santos Gonçalves

## Requisitos Funcionais

**RF01: O sistema deve possuir um mapa interativo de zonas de segurança**

O sistema exibe um mapa interativo com geolocalização em tempo real da usuária, no qual as regiões reportadas como perigosas ou inseguras pela comunidade são sinalizadas visualmente. Cada trecho ou área mostra a quantidade de usuárias que o reportaram como inseguro, e a usuária pode consultar fotos das vias registradas em horários específicos para entender as condições reais do local.

**RF02: O sistema deve sugerir rotas seguras para deslocamento**

A partir de um endereço de destino informado, o sistema calcula, desde a localização atual da usuária, a rota considerada mais segura. O cálculo prioriza critérios de segurança urbana (nível de iluminação, fluxo de pessoas e histórico de relatos da comunidade) em vez do menor tempo ou da menor distância, e o sistema indica alertas e desvios para evitar trechos com incidentes recentes reportados por outras usuárias.

**RF03: O sistema deve permitir a personalização dos fatores de insegurança**

A usuária cadastra no perfil as características ambientais que mais lhe causam medo ou insegurança, como falta de iluminação, vias desertas, mato alto ou aglomeração de homens. O sistema usa essas preferências para ponderar e personalizar o cálculo das rotas sugeridas.

**RF04: O sistema deve disponibilizar contatos de emergência georreferenciados e pontos de acolhimento verificados.**

O sistema identifica a localização atual da usuária e exibe os contatos telefônicos dos serviços de emergência e socorro mais próximos, como Polícia Militar, Delegacia da Mulher, Guarda Municipal, SAMU e a segurança dos campi da UFSCar e da USP.   
O mapa exibe a localização de centros e estabelecimentos verificados como locais de apoio seguro, como portarias e postos de segurança da universidade ou estabelecimentos comerciais parceiros.

**RF05: O sistema deve permitir o registro e envio de denúncias de forma anônima**

O sistema disponibiliza um formulário para o envio de denúncias e relatos sobre assédio, importunação, violência física ou psicológica e vias com infraestrutura precária. O envio é totalmente anônimo: nenhum dado pessoal ou identificador da usuária é divulgado para a comunidade.

**RF06: O sistema deve monitorar e registrar o trajeto em segundo plano**

A usuária pode iniciar o acompanhamento de uma rota a pé e manter o aplicativo em segundo plano durante o deslocamento. O sistema registra o caminho percorrido por meio dos serviços de geolocalização do smartphone até a conclusão do percurso.

**RF07: O sistema deve detectar variações atípicas no ritmo de caminhada**

Durante o trajeto em segundo plano, o sistema monitora os sensores do dispositivo (GPS e acelerômetro) para identificar acelerações bruscas no ritmo dos passos, como corridas provocadas por susto ou perigo. Também registra paradas prolongadas não habituais em trechos percorridos, para posterior verificação de segurança

**RF8: O sistema deve disponibilizar avaliação retrospectiva e estruturada pós-trajeto**

Ao identificar a chegada segura ou a conclusão do deslocamento, o sistema deve convidar a usuária a avaliar o percurso por meio de um questionário simples e objetivo (abordando iluminação pública, presença de mato alto, conservação da via e sensação de segurança). O sistema deve priorizar trechos com poucas avaliações, e incluir a opção "Não me recordo" em todas as perguntas para evitar respostas imprecisas.

**RF9: O sistema deve disponibilizar um feed de relatos e alertas comunitários**

O sistema exibe uma linha do tempo (feed) com os incidentes e avisos recentes reportados por outras usuárias. Os relatos podem ser filtrados por bairro de São Carlos, tipo de ocorrência e proximidade geográfica da usuária. O feed deve exibir a data das postagens. 

1. O recurso de curtidas está presente para representar apoio à postagem.  
2. A postagem deve exibir a avaliação do local, e o nível de gravidade da ocorrência (leve, grave ou moderado).  
3. Para os usuários serem verificados e serem habilitados a fazerem postagens, é necessário Documento de Identificação e leitura facial. Usuários não verificados ainda podem curtir as postagens.

**RF10: O sistema deve permitir o compartilhamento de rota com contatos de confiança**

A usuária pode enviar rapidamente a contatos selecionados (amigas, familiares ou colegas de moradia) uma mensagem predefinida ou um link com a rota em tempo real. O sistema também permite enviar, com apenas um toque, um aviso de confirmação de chegada segura ao destino.

## Requisitos Não Funcionais

**RNF01: O sistema deve ser operável com apenas uma mão (One-Handed Use)**

A interface posiciona os botões primários de navegação, emergência e denúncia na metade inferior da tela. Todas as tarefas críticas podem ser executadas com o uso de uma única mão, sem exigir o uso de ambas.

**RNF02: O sistema deve seguir padrões de acessibilidade digital (WCAG 2.1 AA)**

O aplicativo mantém contraste mínimo de 4.5:1 entre texto e fundo para garantir a legibilidade. Ele é totalmente compatível com os leitores de tela nativos (TalkBack no Android e VoiceOver no iOS) e permite o redimensionamento das fontes conforme as configurações do sistema operacional.

**RNF03: O sistema deve assegurar a privacidade dos dados das usuárias conforme a LGPD**

Os relatos públicos e os dados estatísticos são dissociados de qualquer dado de identificação civil ou cadastral da usuária. O mapa nunca exibe publicamente pontos exatos de residência ou moradia estudantil, preservando a segurança domiciliar das usuárias.

**RNF04: O sistema deve apresentar tempo de resposta imediato para emergências**

A tela de contatos e canais de emergência carrega e fica pronta para uso em no máximo 1,5 segundo após o toque da usuária. Ao tocar em um contato, o sistema abre o discador do telefone com o número já preenchido, e a usuária inicia a chamada pelo botão verde, sem outras etapas de confirmação dentro do aplicativo.

**RNF05: O sistema deve possuir alta disponibilidade operacional**

A infraestrutura dos servidores mantém disponibilidade de pelo menos 99,8% do tempo. O sistema opera com alta estabilidade durante os períodos noturnos e de saída dos turnos universitários.

**RNF06: O sistema deve ser compatível com as principais plataformas móveis**

O aplicativo é desenvolvido para smartphones e é compatível com Android 9.0 ou superior e com iOS 15.0 ou superior, funcionando de maneira consistente em diferentes tamanhos de tela.

**RNF07: O sistema deve garantir segurança da informação e tráfego criptografado**

Todas as trocas de mensagens e dados entre o aplicativo móvel e o backend utilizam criptografia em trânsito, por meio do protocolo TLS 1.3 / HTTPS. Os dados sensíveis armazenados na base de dados são protegidos com criptografia em repouso AES-256.

**RNF08: O sistema deve possuir integridade e mecanismos anti-spam para colaborações**

O sistema implementa validações automatizadas para identificar e descartar envios abusivos ou repetitivos de denúncias em curtos intervalos. Regras de ponderação dos dados impedem que informações falsas alterem indevidamente as pontuações de segurança de uma rua.

**RNF09: O sistema deve manter baixa carga cognitiva e interface limpa**

O design das telas é minimalista, evitando excesso de elementos visuais ou notificações que possam gerar ansiedade em momentos de tensão. A sinalização dos níveis de segurança das vias segue uma convenção cromática intuitiva e acessível, com tons diferenciados para seguro, atenção e perigo.

**RNF10: O sistema deve atender a diretrizes de design ético e consentimento transparente**

O sistema solicita as permissões de acesso ao GPS e aos sensores de movimento de forma transparente e no momento exato em que a funcionalidade é utilizada (just-in-time). Enquanto o trajeto é monitorado, o aplicativo exibe uma indicação visual clara na tela e disponibiliza um botão acessível para interromper o registro ou descartar os dados a qualquer instante.

# 

# **Tabela de Rastreabilidade \- Ajudivas**

## **Requisitos Funcionais (RF)**

| ID | Nome do Requisito | Rastreabilidade / Origem |
| :---- | :---- | :---- |
| RF01 | Visualização de Mapa Interativo de Zonas de Risco | Cenário 2 (Rosângela); Benchmark (My Safetipin) |
| RF02 | Traçado de Rotas Mais Seguras (Safe Routing) | Cenário 2 (Rosângela); Benchmark (Mulheres Positivas \- Caminho Delas) |
| RF03 | Personalização de Fatores de Insegurança | Cenário 2 (Rosângela); Persona 1 (Katarina); Persona 3 (Luciana) |
| RF04 | Acesso Rápido a Contatos de Emergência Georreferenciados | Cenário 1 (Katarina); Persona 1 e 3; Benchmark (Mulheres Positivas) |
| RF05 | Registro e Envio Anônimo de Incidentes e Denúncias | Cenários 1 e 2; Pesquisas Rosa Valls (2006-2008) e Instituto Avon (2015) |
| RF06 | Registro de Trajeto em Segundo Plano | Cenário 3 (Luciana) |
| RF07 | Detecção de Variações Comportamentais de Ritmo | Cenário 3 (Luciana) |
| RF08 | Notificação e Avaliação Retrospectiva Pós-Trajeto | Cenário 3 (Luciana); Benchmark (FixMyStreet) |
| RF09 | Feed Comunitário de Relatos Recentes | Cenário 2 (Rosângela); Benchmark (FixMyStreet) |
| RF10 | Compartilhamento Rápido de Rota e Alerta com Rede de Confiança | Persona 1 (Katarina); Cenário 3 (Luciana) |

## **Requisitos Não Funcionais (RNF)**

| ID | Nome do Requisito | Rastreabilidade / Origem |
| :---- | :---- | :---- |
| RNF01 | Operabilidade com Uma Mão (One-Handed Use) | Persona 2 (Rosângela) |
| RNF02 | Acessibilidade Digital (WCAG 2.1 Nível AA) | Benchmark (ODS 11.7); Persona 2 (Rosângela) |
| RNF03 | Privacidade e Anonimização de Dados (LGPD) | Cenários 2 e 3; LGPD (Lei 13.709/2018) |
| RNF04 | Tempo de Resposta para Acionamento de Emergência | Cenário 1 (Katarina) |
| RNF05 | Alta Disponibilidade do Serviço | Contexto geral e Cenários (deslocamentos noturnos) |
| RNF06 | Multiplataforma Móvel | Benchmark (decisão pelo formato aplicativo móvel) |
| RNF07 | Criptografia e Segurança da Informação | Padrões de Engenharia de Software e ODS 5 |
| RNF08 | Confiabilidade e Moderação de Dados Colaborativos | Benchmark (FixMyStreet, My Safetipin) |
| RNF09 | Baixa Carga Cognitiva e Clareza Visual | Personas 1, 2 e 3 (usuárias em tensão/cansaço) |
| RNF10 | Consentimento Transparente e Design Ético | Cenário 3 (Luciana); |

Acho que foi