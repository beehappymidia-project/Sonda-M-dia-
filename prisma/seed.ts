import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Idempotent upserts — safe to run on every deploy
  const sheymen = await prisma.author.upsert({
    where: { slug: 'sheymen-abdurremane' },
    update: {},
    create: {
      slug: 'sheymen-abdurremane',
      name: 'Sheymen Abdurremane',
      role: 'Directora-Geral',
      bio: 'Sheymen Abdurremane é jornalista investigativa com mais de 15 anos de experiência cobrindo política e direitos humanos em Moçambique. Fundou a SONDA MÍDIA com a missão de aprofundar o jornalismo digital no país. Formada em Jornalismo pela Universidade Eduardo Mondlane, tem mestrado em Comunicação Política pela Universidade de Lisboa.',
      email: 'sheymen@sondamidia.co.mz',
      twitter: '@sheymen_a',
      linkedin: 'sheymen-abdurremane',
    },
  })

  const jorge = await prisma.author.upsert({
    where: { slug: 'jorge-ribeiro' },
    update: {},
    create: {
      slug: 'jorge-ribeiro',
      name: 'Jorge Ribeiro',
      role: 'Editor de Economia',
      bio: 'Jorge Ribeiro cobre economia, finanças e mercados desde 2010. Especialista em recursos naturais e desenvolvimento sustentável em África, já colaborou com a Reuters e o Financial Times Africa. Doutor em Economia pela Universidade de Coimbra.',
      email: 'jorge@sondamidia.co.mz',
      twitter: '@jorgeribeiro_ec',
      linkedin: 'jorge-ribeiro-economia',
    },
  })

  const ines = await prisma.author.upsert({
    where: { slug: 'ines-tembe' },
    update: {},
    create: {
      slug: 'ines-tembe',
      name: 'Inês Tembe',
      role: 'Editora Internacional',
      bio: 'Inês Tembe é correspondente internacional com base em Maputo, cobrindo a região da SADC e a geopolítica africana. Ex-correspondente da RFI em Moçambique, tem vasta experiência em conflitos, diplomacia e relações internacionais. Formada em Relações Internacionais pela FLCS-UEM.',
      email: 'ines@sondamidia.co.mz',
      twitter: '@ines_tembe',
      linkedin: 'ines-tembe-jornalista',
    },
  })

  const elias = await prisma.author.upsert({
    where: { slug: 'elias-mucavel' },
    update: {},
    create: {
      slug: 'elias-mucavel',
      name: 'Elias Mucavel',
      role: 'Diretor de Fotografia',
      bio: 'Elias Mucavel é fotojornalista premiado com mais de 20 anos de trabalho de campo em Moçambique e na África Austral. O seu trabalho foi publicado no New York Times, The Guardian e Le Monde. Especialista em narrativa visual e documentário fotográfico.',
      email: 'elias@sondamidia.co.mz',
      twitter: '@elias_foto',
      linkedin: 'elias-mucavel-foto',
    },
  })

  const articles = [
    {
      slug: 'eleicoes-2024-mozambique-tensao-pos-eleitoral',
      title: 'Eleições 2024: A Tensão que Moldou o Futuro de Moçambique',
      lead: 'O processo eleitoral de 2024 deixou profundas marcas no tecido social e político do país. Uma análise aprofundada dos acontecimentos que abalaram as instituições democráticas.',
      body: `## O Momento Decisivo\n\nAs eleições gerais de outubro de 2024 ficaram marcadas como um dos momentos mais tensos da história democrática de Moçambique. Meses após a votação, o país ainda sente os ecos de uma crise que expôs fragilidades estruturais do sistema político nacional.\n\n## A Crise nas Urnas\n\nOs resultados anunciados pela Comissão Nacional de Eleições (CNE) foram contestados por múltiplos partidos e pela sociedade civil. Protestos eclodiram em Maputo, Nampula e Sofala, com manifestantes a exigir transparência no processo de apuramento.\n\n## As Consequências Institucionais\n\nO Conselho Constitucional foi chamado a arbitrar disputas sem precedente. A tensão entre os poderes do Estado agravou-se consideravelmente.\n\n## Vozes da Sociedade Civil\n\n"Precisamos de reformas profundas no sistema eleitoral", afirma Amélia Nhangue, directora do Centro de Democracia e Desenvolvimento.\n\n## O Caminho à Frente\n\nEspecialistas apontam para a necessidade de um diálogo nacional inclusivo que vá além das elites políticas.`,
      section: 'Política', format: 'REPORTAGEM', readTime: 12, photoStyle: 'protest',
      authorId: sheymen.id, featured: true, isLongForm: false,
      tags: 'eleições,política,democracia,2024',
    },
    {
      slug: 'gas-natural-cabo-delgado-impacto-comunidades',
      title: 'Gás Natural em Cabo Delgado: Riqueza que Não Chega às Comunidades',
      lead: 'Com reservas que colocam Moçambique entre os maiores produtores de gás da África, as comunidades locais de Cabo Delgado continuam à margem dos benefícios.',
      body: `## A Promessa do Gás\n\nQuando as primeiras reservas de gás natural foram descobertas ao largo de Cabo Delgado em 2010, o governo celebrou o que chamou de "a maior descoberta de recursos naturais da história do país".\n\n## Deslocamento e Promessas Quebradas\n\nMais de 50.000 pessoas foram deslocadas para dar lugar às infraestruturas de exploração de gás. Os acordos de compensação, quando existiram, ficaram muito aquém do prometido.\n\n## Os Números que Revelam a Desigualdade\n\nSegundo dados a que a SONDA MÍDIA teve acesso, menos de 3% dos postos de trabalho directos nas operações de gás são ocupados por naturais de Cabo Delgado.\n\n## O Conflito e o Gás\n\nInvestigadores da Universidade Eduardo Mondlane estabelecem uma correlação directa entre o avanço da exploração de gás e a intensificação do conflito armado na região.\n\n## O Futuro em Suspenso\n\nCom o projecto do consórcio TotalEnergies retomado após anos de suspensão, as expectativas voltam a aumentar.`,
      section: 'Investigação', format: 'INVESTIGAÇÃO', readTime: 18, photoStyle: 'warm',
      authorId: jorge.id, featured: true, isLongForm: true,
      tags: 'gás natural,Cabo Delgado,investigação,recursos naturais',
    },
    {
      slug: 'documentario-mares-de-mocambique',
      title: 'Mares de Moçambique: A Pesca Artesanal em Perigo',
      lead: 'Um documentário que mergulha na crise da pesca artesanal ao longo da costa moçambicana, onde tradições seculares colidem com a pesca industrial ilegal e as mudanças climáticas.',
      body: `## A Costa em Crise\n\nAo longo dos 2.470 quilómetros de costa moçambicana, milhares de pescadores artesanais enfrentam uma ameaça existencial.\n\n## A Pesca Ilegal\n\nBarcos estrangeiros operam ilegalmente nas águas territoriais moçambicanas, esgotando recursos de que dependem gerações de pescadores locais.\n\n## Vozes do Mar\n\nAhmed Suleimane, 67 anos, pesca na baía de Angoche há cinco décadas. "Quando eu era jovem, voltávamos sempre com o barco cheio."\n\n## Mudanças Climáticas e o Mar\n\nO aquecimento das águas do Oceano Índico está a alterar os padrões migratórios dos peixes, com impacto directo nas capturas.\n\n## O Futuro da Pesca Artesanal\n\nOrganizações da sociedade civil trabalham com comunidades para desenvolver modelos de gestão sustentável dos recursos marinhos.`,
      section: 'Multimédia', format: 'VÍDEO', readTime: 45, photoStyle: 'city',
      authorId: elias.id, featured: true, isVideo: true,
      tags: 'documentário,pesca,oceano,comunidades,meio ambiente',
    },
    {
      slug: 'assembleia-da-republica-reforma-constitucional',
      title: 'Assembleia da República Debate Proposta de Reforma Constitucional',
      lead: 'O parlamento moçambicano iniciou esta semana um processo de consulta pública sobre propostas de emenda à Constituição, num momento de profunda tensão política no país.',
      body: `## O Debate Constitucional\n\nA Assembleia da República abriu esta semana um processo histórico de debate sobre reformas constitucionais propostas por um grupo multipartidário de deputados.\n\n## As Principais Propostas\n\nEntre as emendas propostas destacam-se: a limitação de mandatos presidenciais, a autonomia reforçada dos órgãos eleitorais e a criação de um mecanismo de controlo parlamentar.\n\n## Reacções dos Partidos\n\nO partido no poder recebeu as propostas com cautela, enquanto a oposição as acolheu como um "passo na direcção certa".\n\n## O Contexto Político\n\nAs reformas surgem num momento em que a confiança nas instituições está em mínimos históricos, segundo sondagens recentes.`,
      section: 'Política', format: 'REPORTAGEM', readTime: 8, photoStyle: 'dark',
      authorId: sheymen.id, featured: false,
      tags: 'constituição,parlamento,reforma,política',
    },
    {
      slug: 'autarcas-prestam-contas-primeiro-ano',
      title: 'Autarcas Prestam Contas: O Balanço do Primeiro Ano de Mandato',
      lead: 'Os presidentes dos conselhos municipais eleitos em 2023 prestaram contas públicas do primeiro ano de mandato. Os resultados são mistos.',
      body: `## Um Ano no Poder Local\n\nDoze meses após tomarem posse, os autarcas moçambicanos enfrentaram pela primeira vez a prova dos resultados.\n\n## Os Casos de Sucesso\n\nMaputo registou progressos na digitalização dos serviços municipais e na gestão de resíduos sólidos. Nampula investiu significativamente na reabilitação de estradas urbanas.\n\n## As Falhas Mais Graves\n\nEm contrapartida, vários municípios enfrentaram escândalos de má gestão financeira. Três autarcas estão sob investigação por alegadas irregularidades.\n\n## O Que Dizem os Cidadãos\n\nUma sondagem realizada pela SONDA MÍDIA junto de residentes de seis cidades revelou que apenas 34% dos inquiridos estão satisfeitos com o desempenho do seu autarca.`,
      section: 'Política', format: 'ANÁLISE', readTime: 10, photoStyle: 'market',
      authorId: sheymen.id, featured: false,
      tags: 'autarquias,poder local,gestão pública,municípios',
    },
    {
      slug: 'inflacao-metical-pressao-familiar',
      title: 'Inflação e Metical: A Pressão sobre as Famílias Moçambicanas',
      lead: 'A taxa de inflação em Moçambique atingiu 13,2% no último trimestre, corroendo o poder de compra das famílias.',
      body: `## A Crise do Custo de Vida\n\nMaputo, Nampula e Beira registam subidas de preços que estrangulam os orçamentos familiares. O cabaz básico de bens alimentares aumentou mais de 18% face ao ano anterior.\n\n## As Causas Estruturais\n\nA desvalorização do metical face ao dólar americano tem um impacto directo num país altamente dependente de importações.\n\n## O Impacto nas Famílias\n\nUma família urbana de rendimento médio-baixo gasta hoje cerca de 65% do seu orçamento em alimentação, face aos 48% de há três anos.\n\n## O Que Fazem as Autoridades\n\nO Banco de Moçambique manteve a taxa de juro de referência elevada para conter a inflação, mas os efeitos sobre a economia real são limitados.\n\n## Perspectivas para 2025\n\nOs economistas contactados pela SONDA MÍDIA divergem sobre as perspectivas.`,
      section: 'Economia', format: 'ANÁLISE', readTime: 10, photoStyle: 'market',
      authorId: jorge.id, featured: false,
      tags: 'inflação,metical,economia,família,custo de vida',
    },
    {
      slug: 'investimento-estrangeiro-mozambique-2024',
      title: 'Investimento Estrangeiro em Moçambique: Quem Investe e Porquê',
      lead: 'Apesar da instabilidade política, Moçambique atraiu 4,2 mil milhões de dólares em investimento directo estrangeiro em 2024.',
      body: `## O Paradoxo do Investimento\n\nNum país a braços com uma crise política e um conflito armado no norte, os números do investimento estrangeiro surpreendem pela sua magnitude.\n\n## Quem Investe\n\nA China mantém-se como o maior investidor individual, com posições dominantes nas infraestruturas e na extracção mineira.\n\n## Os Sectores em Destaque\n\nO sector extractivo — gás, carvão e minerais — absorve cerca de 70% do investimento total.\n\n## As Condições e os Riscos\n\nO quadro regulatório complexo, a corrupção endémica e a instabilidade política são os principais obstáculos citados pelos investidores.`,
      section: 'Economia', format: 'REPORTAGEM', readTime: 9, photoStyle: 'city',
      authorId: jorge.id, featured: false,
      tags: 'investimento,economia,gás,mineração,desenvolvimento',
    },
    {
      slug: 'podcast-economia-mocambicana-perspectivas',
      title: 'Podcast: A Economia Moçambicana em Debate — Perspectivas para 2025',
      lead: 'No mais recente episódio do nosso podcast de economia, debatemos com três especialistas as perspectivas da economia moçambicana para o ano que se avizinha.',
      body: `## Episódio 47: O Ano Económico em Perspectiva\n\nNeste episódio do podcast "Pulso Económico" da SONDA MÍDIA, o editor Jorge Ribeiro conversa com três economistas de referência.\n\n## Os Convidados\n\n- **Dr. Carlos Nhamirre**, economista sénior do Banco de Moçambique\n- **Professora Amélia Sitoe**, investigadora do Centro de Estudos Africanos da UEM\n- **Roberto Funzamo**, analista financeiro independente\n\n## Capítulos\n\n- 00:00 - Introdução\n- 08:30 - Balanço do ano económico\n- 22:15 - O gás e a distribuição de receitas\n- 38:40 - Inflação e política monetária\n- 52:10 - Mercado de trabalho e informalidade\n- 1:08:20 - Perspectivas e recomendações`,
      section: 'Economia', format: 'PODCAST', readTime: 68, photoStyle: 'dark',
      authorId: jorge.id, featured: false, isPodcast: true,
      tags: 'podcast,economia,análise,2025,perspectivas',
    },
    {
      slug: 'saude-publica-hospitais-cronica',
      title: 'Hospitais Públicos: A Crónica de um Sistema à Beira do Colapso',
      lead: 'Longas filas de espera, falta de medicamentos e infraestruturas degradadas: uma reportagem sobre o estado do sistema de saúde pública em Moçambique.',
      body: `## Dentro dos Hospitais Públicos\n\nAs seis da manhã no Hospital Central de Maputo. Centenas de pessoas já aguardam nas filas, muitas delas desde a véspera.\n\n## A Falta de Medicamentos\n\nA ruptura de stock de medicamentos essenciais é um problema crónico. Em três hospitais visitados pela SONDA MÍDIA, encontrámos doentes com prescrição médica mas sem acesso ao tratamento.\n\n## Os Profissionais de Saúde\n\nOs médicos e enfermeiros operam em condições de enorme pressão. Um médico no Hospital Central de Nampula descreve um rácio de 1 médico para 8.000 habitantes.\n\n## A Fuga de Cérebros\n\nMoçambique perde anualmente dezenas de profissionais de saúde qualificados para países vizinhos e para o sector privado.\n\n## O Que Pode Mudar\n\nEspecialistas em saúde pública apontam para soluções que combinam mais financiamento público, melhor gestão hospitalar e uma estratégia séria de retenção de recursos humanos.`,
      section: 'Sociedade', format: 'REPORTAGEM', readTime: 14, photoStyle: 'city',
      authorId: ines.id, featured: false,
      tags: 'saúde,hospitais,sistema público,crise',
    },
    {
      slug: 'educacao-distancia-mocambique-rural',
      title: 'Educação à Distância nas Zonas Rurais: Promessas e Limitações',
      lead: 'O programa governamental de educação digital para zonas rurais chegou a 500 escolas, mas enfrenta obstáculos estruturais que limitam o seu impacto real.',
      body: `## A Escola Digital no Campo\n\nO Ministério da Educação lançou em 2022 um ambicioso programa de digitalização do ensino para zonas rurais, com tablets, kits solares e conectividade por satélite.\n\n## O Que Funciona\n\nEm algumas escolas, o programa trouxe mudanças visíveis. Professores com formação adequada usam os tablets criativamente.\n\n## O Que Falha\n\nEm muitas outras, os equipamentos estão embalados nos armazéns ou inutilizados por falta de energia. A formação de professores foi insuficiente.\n\n## Vozes da Escola\n\n"Recebemos os tablets mas não nos ensinaram a usá-los como ferramenta pedagógica", diz a professora Esperança Chidamoyo, de Moatize.\n\n## O Debate Sobre Prioridades\n\nCríticos questionam se a prioridade deveria ser a digitalização quando muitas escolas rurais ainda não têm electricidade.`,
      section: 'Sociedade', format: 'REPORTAGEM', readTime: 11, photoStyle: 'green',
      authorId: ines.id, featured: false,
      tags: 'educação,digital,rural,escola,programa',
    },
    {
      slug: 'sadc-cimeira-seguranca-regiao',
      title: 'Cimeira da SADC: Segurança Regional no Centro do Debate',
      lead: 'Os líderes da Comunidade de Desenvolvimento da África Austral reuniram-se em Harare para debater os crescentes desafios de segurança na região.',
      body: `## A Cimeira de Harare\n\nA 44ª cimeira ordinária da SADC decorreu em Harare num momento de tensão regional elevada.\n\n## O Dossiê Moçambique\n\nA missão da SADC em Moçambique — SAMIM — continua operacional no norte do país.\n\n## O Factor Congo\n\nA situação a leste da RDC continuou a deteriorar-se, com o M23 a controlar vastos territórios.\n\n## As Tensões Internas\n\nA cimeira revelou também tensões internas entre estados-membros sobre questões económicas.\n\n## O Comunicado Final\n\nO comunicado adoptado no fim da cimeira manteve as posições habituais: apelos ao diálogo, compromissos de apoio às missões de paz.`,
      section: 'Internacional', format: 'REPORTAGEM', readTime: 9, photoStyle: 'dark',
      authorId: ines.id, featured: false,
      tags: 'SADC,segurança,África Austral,geopolítica,diplomacia',
    },
    {
      slug: 'mudancas-climaticas-africa-austral-impacto',
      title: 'Alterações Climáticas na África Austral: O Continente que Mais Sofre',
      lead: 'A África Austral é uma das regiões do mundo mais vulneráveis às alterações climáticas. Seca, cheias extremas e perda de biodiversidade ameaçam a segurança alimentar.',
      body: `## O Clima que Muda\n\nOs dados científicos são inequívocos: a África Austral está a aquecer a uma taxa superior à média global.\n\n## Extremos Climáticos\n\nO padrão de alternância entre secas severas e cheias catastróficas intensificou-se. O ciclone Freddy, em 2023, deixou mais de 1.000 mortos em Moçambique e Malawi.\n\n## Segurança Alimentar e Hídrica\n\nA variabilidade das chuvas ameaça directamente a produção agrícola de que dependem a maioria das populações rurais.\n\n## As Comunidades na Linha da Frente\n\nNa província de Gaza, as comunidades de agricultores de sequeiro descrevem mudanças radicais nos padrões das estações ao longo das últimas décadas.\n\n## Respostas e Adaptação\n\nMoçambique avançou com planos de adaptação climática, mas os recursos são escassos.`,
      section: 'Internacional', format: 'ANÁLISE', readTime: 13, photoStyle: 'green',
      authorId: ines.id, featured: false,
      tags: 'clima,África Austral,ciclone,segurança alimentar,adaptação',
    },
    {
      slug: 'corrupcao-contratos-obras-publicas',
      title: 'Investigação: O Esquema de Corrupção nas Obras Públicas',
      lead: 'Uma investigação de seis meses da SONDA MÍDIA revela como um esquema sistemático de subfacturação e pagamentos ilegais contaminou dezenas de contratos de obras públicas.',
      body: `## O Esquema\n\nDocumentos obtidos pela SONDA MÍDIA, cruzados com testemunhos de ex-funcionários e análise de contratos públicos, revelam um esquema organizado de corrupção.\n\n## Como Funcionava\n\nO mecanismo tinha três pilares: empresas fantasma criadas especificamente para concorrer a concursos públicos; comissões pagas a funcionários; e subfacturação sistemática.\n\n## Os Contratos Identificados\n\nA nossa investigação identificou 23 contratos suspeitos, com valores que vão de 15 a 120 milhões de meticais.\n\n## As Empresas Envolvidas\n\nRastreámos a propriedade efectiva de empresas que receberam contratos milionários e descobrimos ligações a pessoas politicamente expostas.\n\n## O Impacto nas Comunidades\n\nEm Sofala, uma escola construída com fundos públicos contratados de forma irregular está já a necessitar de obras de manutenção, dois anos após a inauguração.`,
      section: 'Investigação', format: 'INVESTIGAÇÃO', readTime: 20, photoStyle: 'dark',
      authorId: sheymen.id, featured: true, isLongForm: true,
      tags: 'corrupção,obras públicas,investigação,contratos,Estado',
    },
    {
      slug: 'pesca-ilegal-aguas-mozambicanas-redes',
      title: 'Redes no Mar: A Pesca Ilegal que Esvazia os Oceanos de Moçambique',
      lead: 'Navios estrangeiros operam ilegalmente nas águas territoriais moçambicanas, saqueando recursos marinhos e prejudicando comunidades pesqueiras.',
      body: `## O Saque dos Mares\n\nAs águas territoriais de Moçambique abrigam uma das mais ricas biodiversidades marinhas do mundo. Também abrigam, de forma ilegal, dezenas de navios de pesca estrangeiros.\n\n## Dados Satélite Revelam a Extensão\n\nAnálise de dados AIS e imagens de satélite obtidas pela SONDA MÍDIA revelam padrões sistemáticos de pesca ilegal.\n\n## As Redes de Cumplicidade\n\nFontes dentro do sector das pescas descrevem um sistema em que licenças de pesca são emitidas a preços abaixo do mercado.\n\n## O Impacto nas Comunidades\n\nOs pescadores artesanais da costa norte e centro de Moçambique são os mais afectados. As suas capturas diminuíram drasticamente na última década.\n\n## Resposta do Estado\n\nA marinha moçambicana tem capacidade muito limitada de patrulha das suas extensas águas territoriais.`,
      section: 'Investigação', format: 'INVESTIGAÇÃO', readTime: 16, photoStyle: 'city',
      authorId: elias.id, featured: false, isLongForm: true,
      tags: 'pesca ilegal,oceano,investigação,recursos marinhos,fiscalização',
    },
    {
      slug: 'galeria-maputo-cidade-contrastes',
      title: 'Galeria: Maputo — A Cidade dos Contrastes',
      lead: 'Elias Mucavel percorreu Maputo durante um mês para capturar a dualidade da capital moçambicana: a modernidade dos novos edifícios e a realidade dos bairros periféricos.',
      body: `## A Cidade em Imagens\n\nMaputo é uma cidade de contrastes profundos. Num raio de cinco quilómetros, coexistem edifícios de escritórios de vidro e aço e bairros sem saneamento básico.\n\n## O Projecto Fotográfico\n\nDurante quatro semanas, o fotojornalista Elias Mucavel percorreu todos os bairros da capital, do Sommerschield ao Hulene.\n\n## As Histórias por Trás das Imagens\n\nCada fotografia tem uma história. O vendedor de jornais da Avenida 24 de Julho que se mantém no mesmo ponto há 30 anos.\n\n## Técnica e Olhar\n\nMucavel trabalhou com luz natural e equipamento mínimo, privilegiando a aproximação humana ao distanciamento técnico.\n\n## Onde Ver a Exposição\n\nA série fotográfica será exposta no Centro Cultural Franco-Moçambicano em Maputo a partir de março de 2025.`,
      section: 'Multimédia', format: 'GALERIA', readTime: 8, photoStyle: 'city',
      authorId: elias.id, featured: false, isGallery: true,
      tags: 'galeria,fotografia,Maputo,cidade,contrastes',
    },
    {
      slug: 'podcast-mocambique-25-anos',
      title: 'Podcast: Moçambique 25 Anos Depois — O Que Mudou, O Que Ficou Igual',
      lead: 'Um episódio especial do podcast SONDA MÍDIA com jornalistas veteranos que cobriram Moçambique desde os anos 90.',
      body: `## Episódio Especial: A Memória do País\n\nNeste episódio especial, a directora-geral Sheymen Abdurremane reúne três jornalistas veteranos que cobriram Moçambique durante décadas.\n\n## Os Convidados\n\n- **António Machungo**, jornalista, ex-director do Notícias\n- **Rosa Mucavele**, correspondente internacional, 30 anos de carreira\n- **Paulo Nguenha**, investigador de história contemporânea\n\n## Capítulos\n\n- 00:00 - Abertura\n- 12:30 - Os anos 90: entre a guerra e a esperança\n- 35:15 - O crescimento e as suas contradições\n- 58:40 - O norte em chamas: o conflito de Cabo Delgado\n- 1:22:10 - O que somos e o que queremos ser`,
      section: 'Multimédia', format: 'PODCAST', readTime: 82, photoStyle: 'dark',
      authorId: sheymen.id, featured: false, isPodcast: true,
      tags: 'podcast,história,Moçambique,memória,jornalismo',
    },
    {
      slug: 'opiniao-democracia-jovens-mocambique',
      title: 'A Democracia que os Jovens Querem',
      lead: 'A geração que cresceu na era digital tem uma relação diferente com a política e a democracia. Uma reflexão sobre o que os jovens moçambicanos esperam das instituições.',
      body: `## Uma Geração Diferente\n\nOs jovens moçambicanos nascidos depois dos acordos de paz de 1992 cresceram num país formalmente democrático. Para eles, a democracia não é uma conquista — é uma promessa que ainda não foi cumprida.\n\n## O Desencanto\n\nOs dados das sondagens são consistentes: a confiança dos jovens nas instituições democráticas está em queda.\n\n## Mas Não É Apatia\n\nO que surpreende os analistas é que este desencanto não se traduz em apatia. Pelo contrário: as redes sociais estão cheias de debate político.\n\n## O Que Querem\n\nQuerem transparência. Querem prestação de contas. Querem que a meritocracia funcione.\n\n## O Que Devemos Fazer\n\nAs instituições democráticas têm de se reinventar para servir esta geração.`,
      section: 'Opinião', format: 'OPINIÃO', readTime: 7, photoStyle: 'protest',
      authorId: sheymen.id, featured: false, isOpinion: true,
      tags: 'opinião,democracia,jovens,política,participação',
    },
    {
      slug: 'opiniao-gas-riqueza-maldicao',
      title: 'O Gás: Riqueza ou Maldição?',
      lead: 'Uma análise do paradoxo moçambicano: um país com enormes reservas de gás natural e uma das taxas de pobreza mais elevadas do mundo.',
      body: `## O Paradoxo dos Recursos\n\nExiste na teoria económica um conceito perturbador: a "maldição dos recursos". Países com enormes riquezas naturais tendem, paradoxalmente, a ter pior desempenho económico e social.\n\n## Moçambique no Cruzamento\n\nCom as descobertas de gás natural em Cabo Delgado, Moçambique está agora no cruzamento. A decisão do que fazer com esta riqueza é a mais importante que o país terá de tomar.\n\n## Os Mecanismos da Maldição\n\nA maldição funciona através de vários mecanismos: a apreciação da moeda, a criação de uma elite rentista, o enfraquecimento das instituições pela corrupção.\n\n## O Que Pode Ser Diferente\n\nNão é inevitável. Alguns países — Botswana, Noruega, Chile — conseguiram transformar recursos naturais em desenvolvimento sustentável.\n\n## A Nossa Responsabilidade\n\nComo cidadãos e como jornalistas, temos a responsabilidade de acompanhar de perto a gestão desta riqueza.`,
      section: 'Opinião', format: 'OPINIÃO', readTime: 8, photoStyle: 'warm',
      authorId: jorge.id, featured: false, isOpinion: true,
      tags: 'opinião,gás natural,economia,desenvolvimento,recursos',
    },
    {
      slug: 'opiniao-imprensa-livre-democracia',
      title: 'Imprensa Livre, Democracia Viva',
      lead: 'Num momento em que a liberdade de imprensa em Moçambique enfrenta pressões crescentes, uma defesa do papel insubstituível do jornalismo independente.',
      body: `## O Estado da Imprensa\n\nO Índice Mundial de Liberdade de Imprensa da Repórteres Sem Fronteiras coloca Moçambique na 95ª posição entre 180 países.\n\n## As Pressões Reais\n\nNão estamos numa ditadura. Mas as pressões sobre a imprensa livre são reais e múltiplas: pressão económica, pressão legal e pressão física.\n\n## O Papel do Jornalismo\n\nNuma democracia, a imprensa livre não é um luxo — é uma condição de funcionamento.\n\n## O Que Ameaça o Futuro\n\nO maior risco não é a censura directa — é o colapso económico do jornalismo independente.\n\n## A Nossa Aposta\n\nNa SONDA MÍDIA, apostamos num modelo de negócio baseado nos leitores — não no poder.`,
      section: 'Opinião', format: 'OPINIÃO', readTime: 7, photoStyle: 'dark',
      authorId: sheymen.id, featured: false, isOpinion: true,
      tags: 'opinião,liberdade de imprensa,democracia,jornalismo,independência',
    },
    {
      slug: 'cabo-delgado-retorno-deslocados',
      title: 'Cabo Delgado: O Difícil Retorno dos Deslocados',
      lead: 'Mais de 900.000 pessoas foram deslocadas pelo conflito armado em Cabo Delgado. Agora, com as operações militares a avançar, começam os primeiros retornos.',
      body: `## O Regresso\n\nDepois de anos em campos de deslocados, algumas famílias começam a regressar às suas aldeias de origem no norte de Cabo Delgado.\n\n## A Situação no Terreno\n\nAs organizações humanitárias que acompanham os retornos descrevem uma situação complexa. A segurança melhorou em algumas zonas, mas permanece precária noutras.\n\n## As Necessidades Imediatas\n\nAs famílias que regressam precisam de abrigo, de sementes para plantar, de acesso a cuidados de saúde e de educação para as crianças.\n\n## O Trauma\n\nPara além das necessidades materiais, o trauma psicológico é profundo. Muitas crianças passaram anos sem escola, viram violência, perderam entes queridos.\n\n## Perspectivas de Paz\n\nOs analistas são cautelosos sobre as perspectivas. A situação militar melhorou, mas as causas profundas do conflito não foram resolvidas.`,
      section: 'Sociedade', format: 'REPORTAGEM', readTime: 11, photoStyle: 'warm',
      authorId: ines.id, featured: false,
      tags: 'Cabo Delgado,deslocados,conflito,retorno,humanitário',
    },
    {
      slug: 'galeria-cheias-mocambique-2024',
      title: 'Galeria: As Cheias de 2024 em Imagens',
      lead: 'As cheias de fevereiro de 2024 devastaram vastas áreas do centro e sul de Moçambique. Elias Mucavel documentou a catástrofe e a resiliência das comunidades afectadas.',
      body: `## Documentar a Catástrofe\n\nEm fevereiro de 2024, as cheias provocadas pelo ciclone Filipe causaram morte e destruição em Sofala, Manica, Gaza e Inhambane.\n\n## As Imagens que Ficam\n\nSão 38 fotografias que contam uma história de perda e de esperança. As casas submersas de Buzi. As famílias amontoadas em escolas improvisadas como centros de acolhimento.\n\n## Técnica ao Serviço da Humanidade\n\nMucavel fotografou em condições extremas — humidade, lama, riscos de saúde.\n\n## O Impacto do Trabalho\n\nA série foi publicada em vários meios internacionais e contribuiu para mobilizar donativos de resposta humanitária.\n\n## A Exposição\n\nA série completa pode ser vista na galeria digital da SONDA MÍDIA.`,
      section: 'Multimédia', format: 'GALERIA', readTime: 6, photoStyle: 'city',
      authorId: elias.id, featured: false, isGallery: true,
      tags: 'galeria,cheias,desastre,Moçambique,fotografia',
    },
    {
      slug: 'economia-informal-maputo-retrato',
      title: 'Economia Informal: O Motor Silencioso de Maputo',
      lead: 'Com mais de 85% da força de trabalho no sector informal, a economia informal é a espinha dorsal da sobrevivência em Moçambique.',
      body: `## O Dia Começa Antes do Sol Nascer\n\nÀs quatro da manhã, os mercados de Maputo já fervilham. Vendedores atacadistas chegam com produtos das províncias.\n\n## Os Números da Informalidade\n\nSegundo dados do Instituto Nacional de Estatística, cerca de 87% da força de trabalho moçambicana opera no sector informal.\n\n## Histórias de Sobrevivência\n\nDina Muiambo, 38 anos, vende capulanas e produtos cosméticos no mercado do Xipamanine há 15 anos. O negócio sustenta uma família de seis pessoas.\n\n## A Complexidade da Formalização\n\nOs economistas divergem sobre a melhor abordagem à formalização.\n\n## O Futuro\n\nA digitalização está a penetrar mesmo no sector informal, com pagamentos móveis e redes sociais a transformar as formas de fazer negócio.`,
      section: 'Economia', format: 'REPORTAGEM', readTime: 12, photoStyle: 'market',
      authorId: jorge.id, featured: false,
      tags: 'economia informal,mercado,trabalho,Maputo,sobrevivência',
    },
  ]

  for (const { authorId, ...data } of articles) {
    await prisma.article.upsert({
      where: { slug: data.slug },
      update: {},
      create: { ...data, author: { connect: { id: authorId } } },
    })
  }

  console.log(`✓ Seed completo: 4 autores, ${articles.length} artigos.`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
