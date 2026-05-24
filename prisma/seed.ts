import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.newsletter.deleteMany()
  await prisma.article.deleteMany()
  await prisma.author.deleteMany()

  // Create Authors
  const sheymen = await prisma.author.create({
    data: {
      slug: 'sheymen-abdurremane',
      name: 'Sheymen Abdurremane',
      role: 'Directora-Geral',
      bio: 'Sheymen Abdurremane é jornalista investigativa com mais de 15 anos de experiência cobrindo política e direitos humanos em Moçambique. Fundou a SONDA MÍDIA com a missão de aprofundar o jornalismo digital no país. Formada em Jornalismo pela Universidade Eduardo Mondlane, tem mestrado em Comunicação Política pela Universidade de Lisboa.',
      email: 'sheymen@sondamidia.co.mz',
      twitter: '@sheymen_a',
      linkedin: 'sheymen-abdurremane',
    },
  })

  const jorge = await prisma.author.create({
    data: {
      slug: 'jorge-ribeiro',
      name: 'Jorge Ribeiro',
      role: 'Editor de Economia',
      bio: 'Jorge Ribeiro cobre economia, finanças e mercados desde 2010. Especialista em recursos naturais e desenvolvimento sustentável em África, já colaborou com a Reuters e o Financial Times Africa. Doutor em Economia pela Universidade de Coimbra.',
      email: 'jorge@sondamidia.co.mz',
      twitter: '@jorgeribeiro_ec',
      linkedin: 'jorge-ribeiro-economia',
    },
  })

  const ines = await prisma.author.create({
    data: {
      slug: 'ines-tembe',
      name: 'Inês Tembe',
      role: 'Editora Internacional',
      bio: 'Inês Tembe é correspondente internacional com base em Maputo, cobrindo a região da SADC e a geopolítica africana. Ex-correspondente da RFI em Moçambique, tem vasta experiência em conflitos, diplomacia e relações internacionais. Formada em Relações Internacionais pela FLCS-UEM.',
      email: 'ines@sondamidia.co.mz',
      twitter: '@ines_tembe',
      linkedin: 'ines-tembe-jornalista',
    },
  })

  const elias = await prisma.author.create({
    data: {
      slug: 'elias-mucavel',
      name: 'Elias Mucavel',
      role: 'Diretor de Fotografia',
      bio: 'Elias Mucavel é fotojornalista premiado com mais de 20 anos de trabalho de campo em Moçambique e na África Austral. O seu trabalho foi publicado no New York Times, The Guardian e Le Monde. Especialista em narrativa visual e documentário fotográfico.',
      email: 'elias@sondamidia.co.mz',
      twitter: '@elias_foto',
      linkedin: 'elias-mucavel-foto',
    },
  })

  // Create Articles
  const articles = [
    // Featured/Homepage articles
    {
      slug: 'eleicoes-2024-mozambique-tensao-pos-eleitoral',
      title: 'Eleições 2024: A Tensão que Moldou o Futuro de Moçambique',
      lead: 'O processo eleitoral de 2024 deixou profundas marcas no tecido social e político do país. Uma análise aprofundada dos acontecimentos que abalaram as instituições democráticas.',
      body: `## O Momento Decisivo

As eleições gerais de outubro de 2024 ficaram marcadas como um dos momentos mais tensos da história democrática de Moçambique. Meses após a votação, o país ainda sente os ecos de uma crise que expôs fragilidades estruturais do sistema político nacional.

## A Crise nas Urnas

Os resultados anunciados pela Comissão Nacional de Eleições (CNE) foram contestados por múltiplos partidos e pela sociedade civil. Protestos eclodiram em Maputo, Nampula e Sofala, com manifestantes a exigir transparência no processo de apuramento. A resposta das autoridades gerou críticas de organizações de direitos humanos nacionais e internacionais.

## As Consequências Institucionais

O Conselho Constitucional foi chamado a arbitrar disputas sem precedente. A tensão entre os poderes do Estado, já frágil antes do processo eleitoral, agravou-se consideravelmente. Fontes dentro das próprias instituições confirmam à SONDA MÍDIA que o consenso interno está longe de ser restaurado.

## Vozes da Sociedade Civil

"Precisamos de reformas profundas no sistema eleitoral", afirma Amélia Nhangue, directora do Centro de Democracia e Desenvolvimento. "Não basta contar os votos — é preciso que os cidadãos confiem no processo."

## O Caminho à Frente

Especialistas apontam para a necessidade de um diálogo nacional inclusivo que vá além das elites políticas. A reconciliação, dizem, tem de passar pela base — pelas comunidades que viveram a violência e o medo nas semanas que se seguiram ao anúncio dos resultados.`,
      section: 'Política',
      format: 'REPORTAGEM',
      readTime: 12,
      photoStyle: 'protest',
      authorId: sheymen.id,
      featured: true,
      isLongForm: false,
      tags: 'eleições,política,democracia,2024',
    },
    {
      slug: 'gas-natural-cabo-delgado-impacto-comunidades',
      title: 'Gás Natural em Cabo Delgado: Riqueza que Não Chega às Comunidades',
      lead: 'Com reservas que colocam Moçambique entre os maiores produtores de gás da África, as comunidades locais de Cabo Delgado continuam à margem dos benefícios. Uma investigação sobre a distribuição de riqueza e o deslocamento forçado.',
      body: `## A Promessa do Gás

Quando as primeiras reservas de gás natural foram descobertas ao largo de Cabo Delgado em 2010, o governo celebrou o que chamou de "a maior descoberta de recursos naturais da história do país". Mais de uma década depois, a realidade para as comunidades locais é bem mais complexa.

## Deslocamento e Promessas Quebradas

Mais de 50.000 pessoas foram deslocadas para dar lugar às infraestruturas de exploração de gás. Os acordos de compensação, quando existiram, ficaram muito aquém do prometido. Aldeias inteiras foram relocalizadas para zonas sem infraestruturas básicas de saúde, educação ou água potável.

## Os Números que Revelam a Desigualdade

Segundo dados a que a SONDA MÍDIA teve acesso, menos de 3% dos postos de trabalho directos nas operações de gás são ocupados por naturais de Cabo Delgado. As empresas de subcontratação, maioritariamente estrangeiras, dominam a cadeia de valor.

## O Conflito e o Gás

Investigadores da Universidade Eduardo Mondlane estabelecem uma correlação directa entre o avanço da exploração de gás e a intensificação do conflito armado na região. "A exclusão económica das populações locais cria condições para o recrutamento por parte de grupos radicais", explica o Professor Augusto Macuane.

## O Futuro em Suspenso

Com o projecto do consórcio TotalEnergies retomado após anos de suspensão, as expectativas voltam a aumentar. Mas para as comunidades de Afungi e arredores, o ceticismo prevalece. "Já ouvimos muitas promessas", diz Fátima Assane, líder comunitária de Quitupo. "Queremos ver os benefícios chegar de verdade às nossas famílias."`,
      section: 'Investigação',
      format: 'INVESTIGAÇÃO',
      readTime: 18,
      photoStyle: 'warm',
      authorId: jorge.id,
      featured: true,
      isLongForm: true,
      tags: 'gás natural,Cabo Delgado,investigação,recursos naturais',
    },
    {
      slug: 'documentario-mares-de-mocambique',
      title: 'Mares de Moçambique: A Pesca Artesanal em Perigo',
      lead: 'Um documentário que mergulha na crise da pesca artesanal ao longo da costa moçambicana, onde tradições seculares colidem com a pesca industrial ilegal e as mudanças climáticas.',
      body: `## A Costa em Crise

Ao longo dos 2.470 quilómetros de costa moçambicana, milhares de pescadores artesanais enfrentam uma ameaça existencial. Este documentário acompanhou durante seis meses comunidades pesqueiras de Angoche a Inhambane.

## A Pesca Ilegal

Barcos estrangeiros operam ilegalmente nas águas territoriais moçambicanas, esgotando recursos de que dependem gerações de pescadores locais. A capacidade de fiscalização do Estado é limitada e as denúncias raramente resultam em acções concretas.

## Vozes do Mar

Ahmed Suleimane, 67 anos, pesca na baía de Angoche há cinco décadas. "Quando eu era jovem, voltávamos sempre com o barco cheio. Agora há dias que não apanhamos nada." A sua história é partilhada por milhares ao longo da costa.

## Mudanças Climáticas e o Mar

O aquecimento das águas do Oceano Índico está a alterar os padrões migratórios dos peixes, com impacto directo nas capturas. As tempestades tropicais tornaram-se mais frequentes e mais intensas, destruindo barcos e redes que representam o capital de vida de famílias inteiras.

## O Futuro da Pesca Artesanal

Organizações da sociedade civil trabalham com comunidades para desenvolver modelos de gestão sustentável dos recursos marinhos. Mas sem uma acção firme do Estado contra a pesca ilegal, dizem os especialistas, as perspectivas são sombrias.`,
      section: 'Multimédia',
      format: 'VÍDEO',
      readTime: 45,
      photoStyle: 'city',
      authorId: elias.id,
      featured: true,
      isVideo: true,
      tags: 'documentário,pesca,oceano,comunidades,meio ambiente',
    },
    // Política articles
    {
      slug: 'assembleia-da-republica-reforma-constitucional',
      title: 'Assembleia da República Debate Proposta de Reforma Constitucional',
      lead: 'O parlamento moçambicano iniciou esta semana um processo de consulta pública sobre propostas de emenda à Constituição, num momento de profunda tensão política no país.',
      body: `## O Debate Constitucional

A Assembleia da República abriu esta semana um processo histórico de debate sobre reformas constitucionais propostas por um grupo multipartidário de deputados. As propostas tocam em pontos sensíveis da arquitectura do poder no país.

## As Principais Propostas

Entre as emendas propostas destacam-se: a limitação de mandatos presidenciais, a autonomia reforçada dos órgãos eleitorais e a criação de um mecanismo de controlo parlamentar sobre nomeações para cargos superiores do Estado.

## Reacções dos Partidos

O partido no poder recebeu as propostas com cautela, enquanto a oposição as acolheu como um "passo na direcção certa". A sociedade civil organizada apela a um processo de consulta genuinamente inclusivo.

## O Contexto Político

As reformas surgem num momento em que a confiança nas instituições está em mínimos históricos, segundo sondagens recentes. A pressão da comunidade internacional para reformas democráticas também pesou na decisão de abrir este debate.`,
      section: 'Política',
      format: 'REPORTAGEM',
      readTime: 8,
      photoStyle: 'dark',
      authorId: sheymen.id,
      featured: false,
      tags: 'constituição,parlamento,reforma,política',
    },
    {
      slug: 'autarcas-prestam-contas-primeiro-ano',
      title: 'Autarcas Prestam Contas: O Balanço do Primeiro Ano de Mandato',
      lead: 'Os presidentes dos conselhos municipais eleitos em 2023 prestaram contas públicas do primeiro ano de mandato. Os resultados são mistos, com avanços notáveis em algumas áreas e falhas graves noutras.',
      body: `## Um Ano no Poder Local

Doze meses após tomarem posse, os autarcas moçambicanos enfrentaram pela primeira vez a prova dos resultados. Os relatórios de gestão revelam um quadro heterogéneo: alguns municípios avançaram em infraestruturas e serviços; outros ficaram muito aquém das expectativas.

## Os Casos de Sucesso

Maputo registou progressos na digitalização dos serviços municipais e na gestão de resíduos sólidos. Nampula investiu significativamente na reabilitação de estradas urbanas. Quelimane destacou-se no combate às cheias urbanas com soluções inovadoras de drenagem.

## As Falhas Mais Graves

Em contrapartida, vários municípios enfrentaram escândalos de má gestão financeira. Três autarcas estão sob investigação por alegadas irregularidades na adjudicação de contratos públicos.

## O Que Dizem os Cidadãos

Uma sondagem realizada pela SONDA MÍDIA junto de residentes de seis cidades revelou que apenas 34% dos inquiridos estão satisfeitos com o desempenho do seu autarca. O saneamento básico e a segurança pública surgem como as principais preocupações.`,
      section: 'Política',
      format: 'ANÁLISE',
      readTime: 10,
      photoStyle: 'market',
      authorId: sheymen.id,
      featured: false,
      tags: 'autarquias,poder local,gestão pública,municípios',
    },
    // Economia articles
    {
      slug: 'inflacao-metical-pressao-familiar',
      title: 'Inflação e Metical: A Pressão sobre as Famílias Moçambicanas',
      lead: 'A taxa de inflação em Moçambique atingiu 13,2% no último trimestre, corroendo o poder de compra das famílias. Uma análise das causas estruturais e do impacto nos agregados mais vulneráveis.',
      body: `## A Crise do Custo de Vida

Maputo, Nampula e Beira registam subidas de preços que estrangulam os orçamentos familiares. O cabaz básico de bens alimentares aumentou mais de 18% face ao ano anterior, segundo dados do Instituto Nacional de Estatística.

## As Causas Estruturais

A desvalorização do metical face ao dólar americano tem um impacto directo num país altamente dependente de importações. A instabilidade política, os efeitos das alterações climáticas sobre a produção agrícola e os choques externos contribuem para este cenário.

## O Impacto nas Famílias

Uma família urbana de rendimento médio-baixo gasta hoje cerca de 65% do seu orçamento em alimentação, face aos 48% de há três anos. As famílias rurais, dependentes da agricultura de subsistência, enfrentam riscos ainda maiores em anos de seca ou cheias.

## O Que Fazem as Autoridades

O Banco de Moçambique manteve a taxa de juro de referência elevada para conter a inflação, mas os efeitos sobre a economia real são limitados. O Governo anunciou um pacote de apoio às famílias mais vulneráveis, mas especialistas questionam a sua dimensão e alcance.

## Perspectivas para 2025

Os economistas contactados pela SONDA MÍDIA divergem sobre as perspectivas. Alguns prevêem uma estabilização gradual com a entrada de receitas do gás; outros alertam para riscos de espiral inflacionária caso as condições internacionais se deteriorem.`,
      section: 'Economia',
      format: 'ANÁLISE',
      readTime: 10,
      photoStyle: 'market',
      authorId: jorge.id,
      featured: false,
      tags: 'inflação,metical,economia,família,custo de vida',
    },
    {
      slug: 'investimento-estrangeiro-mozambique-2024',
      title: 'Investimento Estrangeiro em Moçambique: Quem Investe e Porquê',
      lead: 'Apesar da instabilidade política, Moçambique atraiu 4,2 mil milhões de dólares em investimento directo estrangeiro em 2024. Um olhar sobre os sectores, as origens e as condições que moldam estes fluxos.',
      body: `## O Paradoxo do Investimento

Num país a braços com uma crise política e um conflito armado no norte, os números do investimento estrangeiro surpreendem pela sua magnitude. A explicação está, em grande medida, nos recursos naturais — e nas apostas de longo prazo de grandes corporações.

## Quem Investe

A China mantém-se como o maior investidor individual, com posições dominantes nas infraestruturas e na extracção mineira. A Europa, liderada por Portugal e pelo Reino Unido, concentra-se nas telecomunicações, banca e serviços. Os Estados Unidos investem sobretudo no sector do gás natural.

## Os Sectores em Destaque

O sector extractivo — gás, carvão e minerais — absorve cerca de 70% do investimento total. As energias renováveis emergem como um sector em crescimento, com vários projectos de energia solar em pipeline. O turismo de luxo, concentrado na zona costeira e no arquipélago de Quirimbas, atrai investidores especializados.

## As Condições e os Riscos

O quadro regulatório complexo, a corrupção endémica e a instabilidade política são os principais obstáculos citados pelos investidores. Os que avançam fazem-no calculando o prémio de risco e apostando em retornos de longo prazo ancorados em recursos naturais escassos.`,
      section: 'Economia',
      format: 'REPORTAGEM',
      readTime: 9,
      photoStyle: 'city',
      authorId: jorge.id,
      featured: false,
      tags: 'investimento,economia,gás,mineração,desenvolvimento',
    },
    {
      slug: 'podcast-economia-moçambicana-perspectivas',
      title: 'Podcast: A Economia Moçambicana em Debate — Perspectivas para 2025',
      lead: 'No mais recente episódio do nosso podcast de economia, debatemos com três especialistas as perspectivas da economia moçambicana para o ano que se avizinha. Inflação, gás, investimento e emprego em análise.',
      body: `## Episódio 47: O Ano Económico em Perspectiva

Neste episódio do podcast "Pulso Económico" da SONDA MÍDIA, o editor Jorge Ribeiro conversa com três economistas de referência sobre o estado da economia moçambicana e as perspectivas para o futuro próximo.

## Os Convidados

- **Dr. Carlos Nhamirre**, economista sénior do Banco de Moçambique
- **Professora Amélia Sitoe**, investigadora do Centro de Estudos Africanos da UEM
- **Roberto Funzamo**, analista financeiro independente

## Os Temas em Debate

**O impacto do gás**: Quando e como chegam os benefícios às famílias? Os três especialistas concordam que os mecanismos de distribuição de receitas são fundamentais, mas divergem sobre o calendário.

**A inflação persistente**: Quais são as causas estruturais e o que pode o Governo fazer? Dr. Nhamirre defende uma abordagem monetária restritiva; Funzamo argumenta que a solução passa pelo lado da oferta.

**O mercado de trabalho**: A criação de emprego formal continua a ser o grande desafio. A informalidade económica abrange mais de 85% da força de trabalho.

## Capítulos

- 00:00 - Introdução
- 08:30 - Balanço do ano económico
- 22:15 - O gás e a distribuição de receitas
- 38:40 - Inflação e política monetária
- 52:10 - Mercado de trabalho e informalidade
- 1:08:20 - Perspectivas e recomendações`,
      section: 'Economia',
      format: 'PODCAST',
      readTime: 68,
      photoStyle: 'dark',
      authorId: jorge.id,
      featured: false,
      isPodcast: true,
      tags: 'podcast,economia,análise,2025,perspectivas',
    },
    // Sociedade articles
    {
      slug: 'saude-publica-hospitais-cronica',
      title: 'Hospitais Públicos: A Crónica de um Sistema à Beira do Colapso',
      lead: 'Longas filas de espera, falta de medicamentos e infraestruturas degradadas: uma reportagem sobre o estado do sistema de saúde pública em Moçambique, ouvindo doentes, médicos e gestores hospitalares.',
      body: `## Dentro dos Hospitais Públicos

As seis da manhã no Hospital Central de Maputo. Centenas de pessoas já aguardam nas filas, muitas delas desde a véspera. Esta é a realidade diária de um sistema de saúde que serve 34 milhões de moçambicanos com recursos muito limitados.

## A Falta de Medicamentos

A ruptura de stock de medicamentos essenciais é um problema crónico. Em três hospitais visitados pela SONDA MÍDIA no mês passado, encontrámos doentes com prescrição médica mas sem acesso ao tratamento por indisponibilidade de fármacos nas farmácias hospitalares.

## Os Profissionais de Saúde

Os médicos e enfermeiros operam em condições de enorme pressão. Um médico no Hospital Central de Nampula descreve um rácio de 1 médico para 8.000 habitantes — muito abaixo dos padrões internacionais recomendados pela OMS.

## A Fuga de Cérebros

Moçambique perde anualmente dezenas de profissionais de saúde qualificados para países vizinhos e para o sector privado. A diferença salarial é o factor determinante. O país investe na formação de médicos que depois não consegue reter.

## Histórias de Doentes

Maria Machava, 43 anos, de Matola, partilha a sua experiência: "Vim três vezes ao hospital para uma consulta de especialidade. Na terceira vez consegui, depois de seis meses de espera." A sua história é excepcional — na positiva. Muitos desistem.

## O Que Pode Mudar

Especialistas em saúde pública apontam para soluções que combinam mais financiamento público, melhor gestão hospitalar e uma estratégia séria de retenção de recursos humanos. O caminho é longo, mas, dizem, não é impossível.`,
      section: 'Sociedade',
      format: 'REPORTAGEM',
      readTime: 14,
      photoStyle: 'city',
      authorId: ines.id,
      featured: false,
      tags: 'saúde,hospitais,sistema público,crise',
    },
    {
      slug: 'educacao-distancia-mocambique-rural',
      title: 'Educação à Distância nas Zonas Rurais: Promessas e Limitações',
      lead: 'O programa governamental de educação digital para zonas rurais chegou a 500 escolas, mas enfrenta obstáculos estruturais que limitam o seu impacto real. Uma visita a três províncias revela um quadro complexo.',
      body: `## A Escola Digital no Campo

O Ministério da Educação lançou em 2022 um ambicioso programa de digitalização do ensino para zonas rurais, com tablets, kits solares e conectividade por satélite. Dois anos depois, a SONDA MÍDIA visitou escolas em Tete, Niassa e Sofala para avaliar o impacto real.

## O Que Funciona

Em algumas escolas, o programa trouxe mudanças visíveis. Professores com formação adequada usam os tablets criativamente, e os alunos demonstram entusiasmo com os novos recursos. O conteúdo curricular digitalizado é apreciado.

## O Que Falha

Em muitas outras, os equipamentos estão embalados nos armazéns ou inutilizados por falta de energia. A formação de professores foi insuficiente. A conectividade falha regularmente. A manutenção é praticamente inexistente.

## Vozes da Escola

"Recebemos os tablets mas não nos ensinaram a usá-los como ferramenta pedagógica", diz a professora Esperança Chidamoyo, de Moatize. "São máquinas, não são professores. Precisamos de saber o que fazer com elas."

## O Debate Sobre Prioridades

Críticos questionam se a prioridade deveria ser a digitalização quando muitas escolas rurais ainda não têm electricidade, água potável ou carteiras suficientes. Defensores do programa argumentam que o digital e o básico podem e devem avançar em paralelo.`,
      section: 'Sociedade',
      format: 'REPORTAGEM',
      readTime: 11,
      photoStyle: 'green',
      authorId: ines.id,
      featured: false,
      tags: 'educação,digital,rural,escola,programa',
    },
    // Internacional articles
    {
      slug: 'sadc-cimeira-seguranca-regiao',
      title: 'Cimeira da SADC: Segurança Regional no Centro do Debate',
      lead: 'Os líderes da Comunidade de Desenvolvimento da África Austral reuniram-se em Harare para debater os crescentes desafios de segurança na região, com o conflito em Moçambique e a situação no Congo a dominarem a agenda.',
      body: `## A Cimeira de Harare

A 44ª cimeira ordinária da SADC decorreu em Harare num momento de tensão regional elevada. A agenda foi dominada pelos conflitos activos que afectam dois estados-membros: Moçambique e a República Democrática do Congo.

## O Dossiê Moçambique

A missão da SADC em Moçambique — SAMIM — continua operacional no norte do país. Os líderes regionais avaliaram os progressos no terreno e debateram a eventual extensão do mandato da missão. Há divergências sobre a eficácia da intervenção.

## O Factor Congo

A situação a leste da RDC continuou a deteriorar-se, com o M23 a controlar vastos territórios e a população civil a pagar um preço devastador. A SADC debate se deve aprofundar o seu envolvimento militar ou privilegiar uma abordagem diplomática.

## As Tensões Internas

A cimeira revelou também tensões internas entre estados-membros sobre questões económicas, nomeadamente o acordo de livre comércio continental e as políticas cambiais. A Africa do Sul, maior economia regional, defende uma posição que nem todos os parceiros partilham.

## O Comunicado Final

O comunicado adoptado no fim da cimeira manteve as posições habituais: apelos ao diálogo, compromissos de apoio às missões de paz, e promessas de maior integração económica. Os críticos lamentam a falta de medidas concretas.`,
      section: 'Internacional',
      format: 'REPORTAGEM',
      readTime: 9,
      photoStyle: 'dark',
      authorId: ines.id,
      featured: false,
      tags: 'SADC,segurança,África Austral,geopolítica,diplomacia',
    },
    {
      slug: 'mudancas-climaticas-africa-austral-impacto',
      title: 'Alterações Climáticas na África Austral: O Continente que Mais Sofre',
      lead: 'A África Austral é uma das regiões do mundo mais vulneráveis às alterações climáticas. Seca, cheias extremas e perda de biodiversidade ameaçam a segurança alimentar e hídrica de milhões de pessoas.',
      body: `## O Clima que Muda

Os dados científicos são inequívocos: a África Austral está a aquecer a uma taxa superior à média global. As consequências já são visíveis e devastadoras — e prometem agravar-se nas próximas décadas.

## Extremos Climáticos

O padrão de alternância entre secas severas e cheias catastróficas intensificou-se. O ciclone Freddy, em 2023, deixou mais de 1.000 mortos em Moçambique e Malawi e deslocou centenas de milhar de pessoas. Foi o ciclone tropical mais longo já registado.

## Segurança Alimentar e Hídrica

A variabilidade das chuvas ameaça directamente a produção agrícola de que dependem a maioria das populações rurais. As bacias hidrográficas partilhadas — Zambeze, Limpopo, Save — estão sob pressão crescente, com potencial de conflito entre estados.

## As Comunidades na Linha da Frente

Na província de Gaza, as comunidades de agricultores de sequeiro descrevem mudanças radicais nos padrões das estações ao longo das últimas décadas. "Os nossos avós sabiam quando plantar olhando para o céu", diz David Sithole, de Guijá. "Agora, ninguém sabe."

## Respostas e Adaptação

Moçambique avançou com planos de adaptação climática, mas os recursos são escassos. A comunidade internacional prometeu apoio financeiro no âmbito dos acordos de Paris, mas a sua canalização efectiva para as comunidades mais vulneráveis é lenta e burocrática.`,
      section: 'Internacional',
      format: 'ANÁLISE',
      readTime: 13,
      photoStyle: 'green',
      authorId: ines.id,
      featured: false,
      tags: 'clima,África Austral,ciclone,segurança alimentar,adaptação',
    },
    // Investigação articles
    {
      slug: 'corrupcao-contratos-obras-publicas',
      title: 'Investigação: O Esquema de Corrupção nas Obras Públicas',
      lead: 'Uma investigação de seis meses da SONDA MÍDIA revela como um esquema sistemático de subfacturação e pagamentos ilegais contaminou dezenas de contratos de obras públicas avaliados em mais de 500 milhões de meticais.',
      body: `## O Esquema

Documentos obtidos pela SONDA MÍDIA, cruzados com testemunhos de ex-funcionários e análise de contratos públicos, revelam um esquema organizado de corrupção em contratos de obras públicas que funcionou durante pelo menos cinco anos.

## Como Funcionava

O mecanismo tinha três pilares: empresas fantasma criadas especificamente para concorrer a concursos públicos; comissões pagas a funcionários responsáveis pelas adjudicações; e subfacturação sistemática que resultava em obras de qualidade inferior ao contratado.

## Os Contratos Identificados

A nossa investigação identificou 23 contratos suspeitos, com valores que vão de 15 a 120 milhões de meticais. As obras incluem estradas, escolas e infraestruturas sanitárias em quatro províncias.

## As Empresas Envolvidas

Rastreámos a propriedade efectiva de empresas que receberam contratos milionários e descobrimos ligações a pessoas politicamente expostas. Em vários casos, as empresas foram criadas dias antes de concorrerem a concursos públicos.

## O Que Dizem as Autoridades

O Ministério das Obras Públicas diz desconhecer as irregularidades identificadas e anunciou que vai abrir uma investigação interna. O Gabinete Central de Combate à Corrupção não respondeu aos nossos pedidos de esclarecimento.

## O Impacto nas Comunidades

Em Sofala, uma escola construída com fundos públicos contratados de forma irregular está já a necessitar de obras de manutenção, dois anos após a inauguração. O custo da corrupção não é apenas financeiro — é humano.`,
      section: 'Investigação',
      format: 'INVESTIGAÇÃO',
      readTime: 20,
      photoStyle: 'dark',
      authorId: sheymen.id,
      featured: true,
      isLongForm: true,
      tags: 'corrupção,obras públicas,investigação,contratos,Estado',
    },
    {
      slug: 'pesca-ilegal-aguas-mozambicanas-redes',
      title: 'Redes no Mar: A Pesca Ilegal que Esvazia os Oceanos de Moçambique',
      lead: 'Navios estrangeiros operam ilegalmente nas águas territoriais moçambicanas, saqueando recursos marinhos e prejudicando comunidades pesqueiras. Uma investigação sobre um sistema de cumplicidades que vai do mar aos gabinetes.',
      body: `## O Saque dos Mares

As águas territoriais de Moçambique abrigam uma das mais ricas biodiversidades marinhas do mundo. Também abrigam, de forma ilegal, dezenas de navios de pesca estrangeiros que operam fora de qualquer controlo — e com a cumplicidade de alguns dos que deveriam fiscalizá-los.

## Dados Satélite Revelam a Extensão

Análise de dados AIS (Automatic Identification System) de embarcações e imagens de satélite obtidas pela SONDA MÍDIA com o apoio de uma organização internacional de investigação ambiental revelam padrões sistemáticos de pesca ilegal.

## As Redes de Cumplicidade

Fontes dentro do sector das pescas descrevem um sistema em que licenças de pesca são emitidas a preços abaixo do mercado, e os compradores são frequentemente empresas-fantoche que depois subcontratam a operação real a navios estrangeiros sem documentação válida.

## O Impacto nas Comunidades

Os pescadores artesanais da costa norte e centro de Moçambique são os mais afectados. As suas capturas diminuíram drasticamente na última década. A concorrência predatória da pesca industrial ilegal é um factor determinante.

## Resposta do Estado

A marinha moçambicana tem capacidade muito limitada de patrulha das suas extensas águas territoriais. Os fundos atribuídos à fiscalização são insuficientes. E quando as infracções são detectadas, os processos legais raramente chegam a conclusão.`,
      section: 'Investigação',
      format: 'INVESTIGAÇÃO',
      readTime: 16,
      photoStyle: 'city',
      authorId: elias.id,
      featured: false,
      isLongForm: true,
      tags: 'pesca ilegal,oceano,investigação,recursos marinhos,fiscalização',
    },
    // Multimédia articles
    {
      slug: 'galeria-maputo-cidade-contrastes',
      title: 'Galeria: Maputo — A Cidade dos Contrastes',
      lead: 'Elias Mucavel percorreu Maputo durante um mês para capturar a dualidade da capital moçambicana: a modernidade dos novos edifícios e a realidade dos bairros periféricos, as cores dos mercados e o cinza do betão.',
      body: `## A Cidade em Imagens

Maputo é uma cidade de contrastes profundos. Num raio de cinco quilómetros, coexistem edifícios de escritórios de vidro e aço e bairros sem saneamento básico. Avenidas com boutiques de luxo e mercados informais onde se vende tudo.

## O Projecto Fotográfico

Durante quatro semanas, o fotojornalista Elias Mucavel percorreu todos os bairros da capital, do Sommerschield ao Hulene, do Baixa à Costa do Sol. O resultado é uma série de 47 fotografias que procuram capturar a essência contraditória de uma cidade em transformação.

## As Histórias por Trás das Imagens

Cada fotografia tem uma história. O vendedor de jornais da Avenida 24 de Julho que se mantém no mesmo ponto há 30 anos. A jovem arquitecta que projeta edifícios sustentáveis num bairro que ainda espera pela electrificação. O grupo de jovens que joga futebol no mesmo descampote onde os seus pais jogaram.

## Técnica e Olhar

Mucavel trabalhou com luz natural e equipamento mínimo, privilegiando a aproximação humana ao distanciamento técnico. "Queria que as pessoas se vissem nas fotos, não que olhassem para as fotos como se fossem de outro mundo", explica.

## Onde Ver a Exposição

A série fotográfica será exposta no Centro Cultural Franco-Moçambicano em Maputo a partir de março de 2025. Todas as 47 fotografias estarão disponíveis em alta resolução na galeria digital da SONDA MÍDIA.`,
      section: 'Multimédia',
      format: 'GALERIA',
      readTime: 8,
      photoStyle: 'city',
      authorId: elias.id,
      featured: false,
      isGallery: true,
      tags: 'galeria,fotografia,Maputo,cidade,contrastes',
    },
    {
      slug: 'podcast-mocambique-25-anos',
      title: 'Podcast: Moçambique 25 Anos Depois — O Que Mudou, O Que Ficou Igual',
      lead: 'Um episódio especial do podcast SONDA MÍDIA com jornalistas veteranos que cobriram Moçambique desde os anos 90. Uma viagem pela memória de um país em busca de si mesmo.',
      body: `## Episódio Especial: A Memória do País

Neste episódio especial, a directora-geral Sheymen Abdurremane reúne três jornalistas veteranos que cobriram Moçambique durante décadas para uma conversa sobre mudança, permanência e identidade.

## Os Convidados

- **António Machungo**, jornalista, ex-director do Notícias
- **Rosa Mucavele**, correspondente internacional, 30 anos de carreira
- **Paulo Nguenha**, investigador de história contemporânea

## Os Temas

A conversa percorreu a história recente do país: os acordos de paz de Roma em 1992, a democratização, os períodos de crescimento económico, as crises, o ressurgimento do conflito armado no norte.

## O Que Mudou

A liberdade de imprensa, dizem os convidados, é maior do que em 1994, mas frágil. A economia cresceu mas a desigualdade também. A classe média urbana emergiu, mas a pobreza rural persistente.

## O Que Ficou Igual

"A concentração de poder. A cultura de impunidade. A distância entre o Estado e os cidadãos", diz Machungo. "Estas coisas são teimosas."

## Escutar Também em

Spotify, Apple Podcasts, Google Podcasts

## Capítulos

- 00:00 - Abertura
- 12:30 - Os anos 90: entre a guerra e a esperança
- 35:15 - O crescimento e as suas contradições
- 58:40 - O norte em chamas: o conflito de Cabo Delgado
- 1:22:10 - O que somos e o que queremos ser`,
      section: 'Multimédia',
      format: 'PODCAST',
      readTime: 82,
      photoStyle: 'dark',
      authorId: sheymen.id,
      featured: false,
      isPodcast: true,
      tags: 'podcast,história,Moçambique,memória,jornalismo',
    },
    // Opinião articles
    {
      slug: 'opiniao-democracia-jovens-mocambique',
      title: 'A Democracia que os Jovens Querem',
      lead: 'A geração que cresceu na era digital tem uma relação diferente com a política e a democracia. Sheymen Abdurremane reflete sobre o que os jovens moçambicanos esperam das instituições e o que as instituições lhes devem.',
      body: `## Uma Geração Diferente

Os jovens moçambicanos nascidos depois dos acordos de paz de 1992 cresceram num país formalmente democrático. Para eles, a democracia não é uma conquista — é uma promessa que ainda não foi cumprida.

## O Desencanto

Os dados das sondagens são consistentes: a confiança dos jovens nas instituições democráticas está em queda. O parlamento, os partidos políticos, a justiça — todas as instituições de referência de uma democracia sofrem de um défice de confiança acentuado junto das camadas mais jovens da população.

## Mas Não É Apatia

O que surpreende os analistas é que este desencanto não se traduz em apatia. Pelo contrário: as redes sociais estão cheias de debate político, os movimentos cívicos crescem, os jovens participam em manifestações e iniciativas comunitárias.

## O Que Querem

Querem transparência. Querem prestação de contas. Querem que a meritocracia funcione. Querem que as regras se apliquem a todos — ricos e pobres, poderosos e comuns.

## O Que Devemos Fazer

As instituições democráticas têm de se reinventar para servir esta geração. Não basta adaptar a linguagem — é preciso mudar os processos, abrir a participação, criar mecanismos genuínos de responsabilização. A democracia que os jovens querem está mais próxima do original do que muitos políticos confortavelmente instalados gostariam.

A alternativa é perder uma geração inteira para o cinismo. E isso nenhuma democracia suporta.`,
      section: 'Opinião',
      format: 'OPINIÃO',
      readTime: 7,
      photoStyle: 'protest',
      authorId: sheymen.id,
      featured: false,
      isOpinion: true,
      tags: 'opinião,democracia,jovens,política,participação',
    },
    {
      slug: 'opiniao-gas-riqueza-maldição',
      title: 'O Gás: Riqueza ou Maldição?',
      lead: 'Jorge Ribeiro analisa o paradoxo moçambicano: um país com enormes reservas de gás natural e uma das taxas de pobreza mais elevadas do mundo. Como evitar a "maldição dos recursos"?',
      body: `## O Paradoxo dos Recursos

Existe na teoria económica um conceito perturbador: a "maldição dos recursos". Países com enormes riquezas naturais tendem, paradoxalmente, a ter pior desempenho económico e social do que os seus vizinhos sem recursos. Angola e a Nigéria são exemplos estudados na literatura académica.

## Moçambique no Cruzamento

Com as descobertas de gás natural em Cabo Delgado, Moçambique está agora no cruzamento. A decisão do que fazer com esta riqueza — e como evitar a maldição — é a mais importante que o país terá de tomar nas próximas décadas.

## Os Mecanismos da Maldição

A maldição funciona através de vários mecanismos: a apreciação da moeda que prejudica outros sectores exportadores (o "efeito holandês"); a criação de uma elite rentista que captura a riqueza e bloqueia a diversificação; o enfraquecimento das instituições pela corrupção.

## O Que Pode Ser Diferente

Não é inevitável. Alguns países — Botswana, Noruega, Chile — conseguiram transformar recursos naturais em desenvolvimento sustentável. O que fizeram de diferente? Instituições fortes, mecanismos de transparência e fundos soberanos com regras claras.

## A Nossa Responsabilidade

Como cidadãos e como jornalistas, temos a responsabilidade de acompanhar de perto a gestão desta riqueza. De exigir transparência nos contratos. De questionar a distribuição de benefícios. O gás pode ser uma bênção ou uma maldição. A diferença está nas escolhas que fazemos agora.`,
      section: 'Opinião',
      format: 'OPINIÃO',
      readTime: 8,
      photoStyle: 'warm',
      authorId: jorge.id,
      featured: false,
      isOpinion: true,
      tags: 'opinião,gás natural,economia,desenvolvimento,recursos',
    },
    {
      slug: 'opiniao-imprensa-livre-democracia',
      title: 'Imprensa Livre, Democracia Viva',
      lead: 'Num momento em que a liberdade de imprensa em Moçambique enfrenta pressões crescentes, Sheymen Abdurremane defende o papel insubstituível do jornalismo independente na saúde democrática do país.',
      body: `## O Estado da Imprensa

O Índice Mundial de Liberdade de Imprensa da Repórteres Sem Fronteiras coloca Moçambique na 95ª posição entre 180 países. É uma posição mediana, mas a tendência é preocupante: descemos 12 lugares em três anos.

## As Pressões Reais

Não estamos numa ditadura. Mas as pressões sobre a imprensa livre são reais e múltiplas. Há a pressão económica: os anunciantes que retiram publicidade quando as notícias desagradam ao poder. Há a pressão legal: processos judiciais usados como intimidação. E há a pressão física: jornalistas ameaçados, no caso extremo agredidos.

## O Papel do Jornalismo

Numa democracia, a imprensa livre não é um luxo — é uma condição de funcionamento. É o mecanismo que torna possível a prestação de contas, que revela o que o poder preferia esconder, que dá voz ao que não tem acesso às câmaras.

## O Que Ameaça o Futuro

O maior risco não é a censura directa — é o colapso económico do jornalismo independente. Se as redacções não conseguirem ser financeiramente sustentáveis, o espaço será preenchido por conteúdo patrocinado, por propaganda disfarçada de informação, por redes de desinformação.

## A Nossa Aposta

Na SONDA MÍDIA, apostamos num modelo de negócio baseado nos leitores — não no poder. É a única forma de mantermos a independência real. E a independência é o que nos torna úteis para a democracia.`,
      section: 'Opinião',
      format: 'OPINIÃO',
      readTime: 7,
      photoStyle: 'dark',
      authorId: sheymen.id,
      featured: false,
      isOpinion: true,
      tags: 'opinião,liberdade de imprensa,democracia,jornalismo,independência',
    },
    // Additional articles for variety
    {
      slug: 'cabo-delgado-retorno-deslocados',
      title: 'Cabo Delgado: O Difícil Retorno dos Deslocados',
      lead: 'Mais de 900.000 pessoas foram deslocadas pelo conflito armado em Cabo Delgado. Agora, com as operações militares a avançar, começam os primeiros retornos — mas regressam a quê?',
      body: `## O Regresso

Depois de anos em campos de deslocados, algumas famílias começam a regressar às suas aldeias de origem no norte de Cabo Delgado. Mas o que encontram muitas vezes é devastação: casas destruídas, campos agrícolas abandonados, infraestruturas inexistentes.

## A Situação no Terreno

As organizações humanitárias que acompanham os retornos descrevem uma situação complexa. A segurança melhorou em algumas zonas, mas permanece precária noutras. O processo de retorno, dizem, está a avançar mais rápido do que as condições o permitiriam.

## As Necessidades Imediatas

As famílias que regressam precisam de abrigo, de sementes para plantar, de acesso a cuidados de saúde e de educação para as crianças. A capacidade de resposta do Estado e das organizações humanitárias está aquém das necessidades.

## O Trauma

Para além das necessidades materiais, o trauma psicológico é profundo. Muitas crianças passaram anos sem escola, viram violência, perderam entes queridos. O apoio psicossocial é escasso.

## Perspectivas de Paz

Os analistas são cautelosos sobre as perspectivas. A situação militar melhorou, mas as causas profundas do conflito — exclusão económica, governação fraca, radicalismo — não foram resolvidas. Uma paz duradoura exige muito mais do que operações militares.`,
      section: 'Sociedade',
      format: 'REPORTAGEM',
      readTime: 11,
      photoStyle: 'warm',
      authorId: ines.id,
      featured: false,
      tags: 'Cabo Delgado,deslocados,conflito,retorno,humanitário',
    },
    {
      slug: 'galeria-cheias-mocambique-2024',
      title: 'Galeria: As Cheias de 2024 em Imagens',
      lead: 'As cheias de fevereiro de 2024 devastaram vastas áreas do centro e sul de Moçambique. Elias Mucavel documentou a catástrofe e a resiliência das comunidades afectadas.',
      body: `## Documentar a Catástrofe

Em fevereiro de 2024, as cheias provocadas pelo ciclone Filipe causaram morte e destruição em Sofala, Manica, Gaza e Inhambane. O fotojornalista Elias Mucavel esteve no terreno durante três semanas, documentando a catástrofe e os seus sobreviventes.

## As Imagens que Ficam

São 38 fotografias que contam uma história de perda e de esperança. As casas submersas de Buzi. As famílias amontoadas em escolas improvisadas como centros de acolhimento. E também: os vizinhos que ajudam a resgatar pertences. As equipas de saúde a vacinar crianças no meio da lama. Os voluntários que chegam de todo o país.

## Técnica ao Serviço da Humanidade

Mucavel fotografou em condições extremas — humidade, lama, riscos de saúde. "Nestas situações, o fotojornalista tem de ser antes de tudo humano", diz. "Não posso ficar atrás da câmara quando alguém precisa de ajuda imediata. Mas posso usar a câmara para que o mundo veja o que acontece aqui."

## O Impacto do Trabalho

A série foi publicada em vários meios internacionais e contribuiu para mobilizar donativos de resposta humanitária. "Isso é o que a fotografia pode fazer", diz Mucavel. "Não apenas documentar, mas mobilizar."

## A Exposição

A série completa pode ser vista na galeria digital da SONDA MÍDIA e estará em exposição presencial no Centro Cultural Franco-Moçambicano entre maio e junho de 2025.`,
      section: 'Multimédia',
      format: 'GALERIA',
      readTime: 6,
      photoStyle: 'city',
      authorId: elias.id,
      featured: false,
      isGallery: true,
      tags: 'galeria,cheias,desastre,Moçambique,fotografia',
    },
    {
      slug: 'economia-informal-maputo-retrato',
      title: 'Economia Informal: O Motor Silencioso de Maputo',
      lead: 'Com mais de 85% da força de trabalho no sector informal, a economia informal é a espinha dorsal da sobrevivência em Moçambique. Uma reportagem sobre os homens e mulheres que fazem mover a cidade.',
      body: `## O Dia Começa Antes do Sol Nascer

Às quatro da manhã, os mercados de Maputo já fervilham. Vendedores atacadistas chegam com produtos das províncias. Os grossistas distribuem. E os retalhistas instalam-se nos seus pontos de venda pelas ruas da cidade — prontos para um dia de doze, catorze horas.

## Os Números da Informalidade

Segundo dados do Instituto Nacional de Estatística, cerca de 87% da força de trabalho moçambicana opera no sector informal. A percentagem é ainda maior nas zonas rurais, mas também nas cidades a informalidade domina.

## Histórias de Sobrevivência

Dina Muiambo, 38 anos, vende capulanas e produtos cosméticos no mercado do Xipamanine há 15 anos. O negócio sustenta uma família de seis pessoas. Não tem contabilidade formal, não paga IVA, não tem segurança social. Mas paga propinas, impostos informais aos "reguladores" do mercado, e contribui para associações de socorro mútuo.

## A Complexidade da Formalização

Os economistas divergem sobre a melhor abordagem à formalização. A abordagem tradicional — simplificar o registo de empresas, reduzir a burocracia — tem limites porque os trabalhadores informais muitas vezes escolhem a informalidade por razões racionais: flexibilidade, evitar regulação excessiva, acesso a mercados específicos.

## O Futuro

A digitalização está a penetrar mesmo no sector informal, com pagamentos móveis e redes sociais a transformar as formas de fazer negócio. Mas a transição para a formalidade plena exige muito mais do que tecnologia — exige um contrato social diferente entre o Estado e os trabalhadores.`,
      section: 'Economia',
      format: 'REPORTAGEM',
      readTime: 12,
      photoStyle: 'market',
      authorId: jorge.id,
      featured: false,
      tags: 'economia informal,mercado,trabalho,Maputo,sobrevivência',
    },
  ]

  for (const articleData of articles) {
    const { authorId, ...rest } = articleData
    await prisma.article.create({
      data: {
        ...rest,
        author: { connect: { id: authorId } },
      },
    })
  }

  console.log('✓ Seed completo: 4 autores, ' + articles.length + ' artigos criados.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
