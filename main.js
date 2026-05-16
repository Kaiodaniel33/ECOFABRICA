document.addEventListener("DOMContentLoaded", () => {
    const Helpers = {
        formatCurrency: (value) => {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);
        },
        clamp: (value, min, max) => { return Math.max(min, Math.min(value, max)); },
        getRandomItem: (arr) => {
            if (!arr || arr.length === 0) return null;
            return arr[Math.floor(Math.random() * arr.length)];
        }
    };

    const SABIA_KNOWLEDGE_BASE = {
        gameTips: [
            { condition: (s) => s.budget < 500, tip: "Seu orçamento está perigosamente baixo! Evite gastos grandes e foque em ações que gerem receita ou reduzam custos, como 'Otimizar Logística'." },
            { condition: (s) => s.waste > 60, tip: "O nível de desperdício está altíssimo! Isso gera custos e afeta sua reputação. Invista em 'Reciclagem Básica' ou 'Treinamento de Eficiência' urgente!" },
            { condition: (s) => s.morale < 40, tip: "A moral da equipe está em queda. Funcionários infelizes produzem menos. Considere 'Melhorar refeitório' ou uma Política de 'Lanches Grátis'." },
            { condition: (s) => s.sustainability < 20, tip: "Sua operação não é nada sustentável. A fiscalização pode bater na sua porta. 'Investir em Energia Solar' é caro, mas resolve isso a longo prazo." },
            { condition: (s) => s.researchPoints > 15, tip: "Você acumulou muitos Pontos de P&D! Não os deixe parados. Pesquise novas tecnologias para desbloquear ações mais poderosas." },
            { condition: (s) => s.marketPriceModifier > 1.3, tip: `O mercado está pagando ${((s.marketPriceModifier-1)*100).toFixed(0)}% a mais! Sua produção vale ouro! Excelente hora para focar em 'Produção'.` },
            { condition: (s) => s.marketPriceModifier < 0.9, tip: "O mercado está em baixa... Estamos recebendo menos pelos produtos. Talvez seja hora de focar em cortar custos e desperdício, em vez de expandir a produção." },
            { condition: (s) => s.currentMonth === 1, tip: "Primeiro mês! Analise seu perfil de gestor. Se você é 'Visionário Verde', sua prioridade é Sustentabilidade, não apenas lucro." },
            { condition: (s) => s.currentMonth === 6, tip: "Estamos no meio do ano. É um bom momento para checar o Relatório de Desempenho e ver sua evolução. Ajuste sua estratégia!" },
            { condition: (s) => s.currentMonth === 11, tip: "Reta final! Se você está longe da sua meta, talvez precise de uma ação de 'alto risco, alta recompensa'. Boa sorte!" }
        ],
        quizQuestions: [
            { area: "HTML", question: "Qual tag HTML é usada para o *conteúdo principal* de uma página, ajudando na semântica e acessibilidade?", options: ["<div class='main'>", "<main>", "<content>", "<body-content>"], answer: "<main>", explanation: "<main> é a tag semântica correta. Leitores de tela usam ela para pular direto ao conteúdo principal." },
            { area: "HTML", question: "Para que serve o atributo 'for' em uma tag <label>?", options: ["Para criar um loop 'for'", "Para conectar o label a um 'id' de um <input>", "Para definir a fonte do texto", "Para uso em formulários de 'for'necedores"], answer: "Para conectar o label a um 'id' de um <input>", explanation: "O 'for' no <label> é vinculado ao 'id' do <input>, melhorando a acessibilidade e a usabilidade (clicar no label foca o input)." },
            { area: "HTML", question: "O que significa o atributo 'data-profile' que usamos nos botões de perfil?", options: ["Define o CSS do perfil", "É um atributo de dados ('data attribute') para guardar informações customizadas", "É um link para o perfil do usuário", "Não tem função, é apenas um comentário"], answer: "É um atributo de dados ('data attribute') para guardar informações customizadas", explanation: "Data attributes (começam com 'data-') são uma forma padrão de armazenar dados no HTML para serem lidos pelo JavaScript." },
            { area: "CSS", question: "O que 'box-sizing: border-box;' faz?", options: ["Coloca uma borda em todas as caixas", "Calcula o tamanho da caixa incluindo padding e border na largura/altura total", "Calcula o tamanho da caixa somando padding e border à largura/altura", "Centraliza a caixa na página"], answer: "Calcula o tamanho da caixa incluindo padding e border na largura/altura total", explanation: "Por padrão, 'width' + 'padding' + 'border' = largura real. Com 'border-box', 'width' = largura real (incluindo padding/border). Isso facilita layouts!" },
            { area: "CSS", question: "Qual a *vantagem* de usar Variáveis CSS (ex: '--color-primary')?", options: ["Deixa o CSS mais rápido", "É a única forma de usar cores", "Permite mudar um valor (ex: uma cor) em um só lugar e atualizar o site inteiro", "Funciona em navegadores antigos como o IE6"], answer: "Permite mudar um valor (ex: uma cor) em um só lugar e atualizar o site inteiro", explanation: "Variáveis centralizam seus valores de design ('tokens'). Mude a variável '--color-primary' e todos os elementos que a usam mudam instantaneamente." },
            { area: "CSS", question: "No CSS Grid, o que 'repeat(auto-fit, minmax(200px, 1fr))' significa?", options: ["Cria 200 colunas", "Repete o layout 1 vez", "Cria colunas de 200px que não crescem", "Cria o máximo de colunas que couberem, com no mínimo 200px, e distribui o espaço extra (1fr)"], answer: "Cria o máximo de colunas que couberem, com no mínimo 200px, e distribui o espaço extra (1fr)", explanation: "É uma das regras mais poderosas do CSS Grid para criar layouts responsivos automaticamente, sem precisar de media queries!" },
            { area: "JS", question: "O que o 'document.addEventListener(\"DOMContentLoaded\", ...)' faz?", options: ["Inicia o download do HTML", "Espera o DOM (HTML) estar totalmente carregado antes de rodar o JS", "Carrega as fontes do documento", "Cria um evento de clique"], answer: "Espera o DOM (HTML) estar totalmente carregado antes de rodar o JS", explanation: "Isso previne erros! Se o JS rodar antes do HTML, ele pode tentar achar um botão (ex: 'start-button') que *ainda não existe* e quebrar." },
            { area: "JS", question: "Qual a diferença entre 'let' e 'const'?", options: ["'let' é para números, 'const' é para texto", "'let' pode ter seu valor reatribuído, 'const' não pode", "'const' é mais rápido que 'let'", "Não há diferença, são a mesma coisa"], answer: "'let' pode ter seu valor reatribuído, 'const' não pode", explanation: "'const' (constante) cria uma variável que não pode ser reatribuída. 'let' cria uma variável que pode. Regra de ouro: use 'const' sempre, a menos que você *precise* mudar o valor, aí use 'let'." },
            { area: "JS", question: "Para que serve a 'Intl.NumberFormat('pt-BR', ...)' que usamos?", options: ["Para formatar números internacionais", "Para formatar números e moedas no padrão correto de uma língua (ex: R$ 1.234,56)", "Para traduzir a página", "Para calcular impostos"], answer: "Para formatar números e moedas no padrão correto de uma língua (ex: R$ 1.234,56)", explanation: "'Intl' (Internationalization) é a API nativa do JS para lidar com formatos de data, hora e números em diferentes locais do mundo." },
            { area: "JS", question: "O que é uma 'Classe' (como 'class Game' que usamos)?", options: ["Um arquivo de CSS", "Uma 'planta' ou 'molde' para criar objetos com as mesmas propriedades e métodos", "Uma função que roda sozinha", "Um tipo de comentário"], answer: "Uma 'planta' ou 'molde' para criar objetos com as mesmas propriedades e métodos", explanation: "A 'class Game' é o molde. Quando fazemos 'new Game()', criamos um *objeto* (uma 'instância') daquele molde, que já vem com 'state', 'ui', 'sabia', e os métodos 'advanceMonth()', etc." },
            { area: "JS", question: "Por que separamos o código em classes como 'Game', 'State' e 'UI'?", options: ["Porque é obrigatório pelo navegador", "Para o código ficar mais longo", "Chama-se 'Separação de Preocupações' (SoC). Cada classe tem UMA responsabilidade, facilitando a manutenção.", "Para confundir quem está lendo"], answer: "Chama-se 'Separação de Preocupações' (SoC). Cada classe tem UMA responsabilidade, facilitando a manutenção.", explanation: "A 'UI' só mexe no HTML. A 'State' só guarda dados. O 'Game' orquestra tudo. Se o layout quebrar, mexemos só na 'UI'. Se o cálculo de lucro estiver errado, mexemos só na 'State'. Isso é arquitetura sólida!" }
        ]
    };

    const GAME_DATA = {
        totalMonths: 12,
        initialState: { budget: 1500, production: 50, waste: 40, sustainability: 20, morale: 60, reputation: 30, researchPoints: 5, land: 10, marketPriceModifier: 1.0 },
        statDisplayNames: { budget: "Orçamento", production: "Produção/mês", waste: "Desperdício/mês", sustainability: "Sustentabilidade", morale: "Moral da Equipe", reputation: "Reputação", researchPoints: "Pontos P&D", land: "Área Agrícola (ha)", marketPriceModifier: "Preço de Mercado" },
        profiles: {
            visionario: { name: "Visionário Verde 🌎", description: "Sua gestão foi um exemplo para o Paraná! Você provou que é possível prosperar cuidando do planeta.", winCondition: (s) => s.sustainability >= 100 && s.reputation >= 90, getWinMessage: (s) => `PARABÉNS! Você atingiu ${s.sustainability} de Sustentabilidade e ${s.reputation} de Reputação!` },
            capitalista: { name: "Capitalista Consciente 💰", description: "Resultados financeiros impressionantes! Você soube aliar lucro com responsabilidade.", winCondition: (s) => s.budget >= 5000 && s.sustainability >= 60, getWinMessage: (s) => `PARABÉNS! Você atingiu ${Helpers.formatCurrency(s.budget)} em caixa e ${s.sustainability} de Sustentabilidade!` },
            lider: { name: "Líder Comunitário 👨‍👩‍👧‍👦", description: "Sua fábrica é o orgulho da comunidade! Sua gestão focada em pessoas e reputação criou um ambiente exemplar.", winCondition: (s) => s.morale >= 100 && s.reputation >= 95, getWinMessage: (s) => `PARABÉNS! Você atingiu ${s.morale} de Moral e ${s.reputation} de Reputação!` }
        },
        researchTree: {
            t1_basic_recycling: { id: 't1_basic_recycling', label: "P&D: Reciclagem Básica", costRP: 5, description: "Estuda métodos simples de separação e reuso de resíduos.", effects: { sustainability: 5 }, unlocksActions: ['action_implement_basic_recycling', 'action_policy_preventive_maintenance'], requiredTech: [] },
            t1_efficiency_studies: { id: 't1_efficiency_studies', label: "P&D: Estudos de Eficiência", costRP: 5, description: "Analisa o fluxo de trabalho para reduzir desperdício de tempo e material.", effects: { production: 5 }, unlocksActions: ['action_team_training_efficiency', 'action_policy_overtime'], requiredTech: [] },
            t1_local_marketing: { id: 't1_local_marketing', label: "P&D: Marketing Comunitário", costRP: 3, description: "Entende como melhorar a imagem da fábrica na comunidade local.", effects: { reputation: 5 }, unlocksActions: ['action_sponsor_local_team', 'action_community_open_day'], requiredTech: [] },
            t2_water_optimization: { id: 't2_water_optimization', label: "P&D: Otimização de Água", costRP: 10, description: "Pesquisa sobre reuso de água e sistemas de irrigação eficientes.", effects: { sustainability: 5 }, unlocksActions: ['action_install_water_reuse_system'], requiredTech: ['t1_basic_recycling'] },
            t2_green_energy: { id: 't2_green_energy', label: "P&D: Estudo de Energia Limpa", costRP: 12, description: "Analisa a viabilidade de painéis solares e outras fontes limpas.", effects: {}, unlocksActions: ['action_install_solar_panels'], requiredTech: ['t1_efficiency_studies'] },
            t2_hr_development: { id: 't2_hr_development', label: "P&D: Desenvolvimento de RH", costRP: 8, description: "Estuda políticas de bônus, saúde e bem-estar para a equipe.", effects: { morale: 5 }, unlocksActions: ['action_profit_sharing_plan', 'action_health_plan'], requiredTech: ['t1_local_marketing'] },
            t2_supply_chain: { id: 't2_supply_chain', label: "P&D: Logística de Suprimentos", costRP: 10, description: "Otimiza a compra de matéria-prima e logística de entrada.", effects: {}, unlocksActions: ['action_local_suppliers'], requiredTech: ['t1_efficiency_studies'] },
            t3_advanced_recycling: { id: 't3_advanced_recycling', label: "P&D: Reciclagem Avançada", costRP: 20, description: "Desenvolve tecnologia para 'lixo zero', transformando resíduos em sub-produtos.", effects: { sustainability: 10 }, unlocksActions: ['action_zero_waste_plant'], requiredTech: ['t2_water_optimization'] },
            t3_automation: { id: 't3_automation', label: "P&D: Automação de Linha", costRP: 25, description: "Implementa robôs para acelerar a produção (cuidado com a moral!).", effects: { production: 10 }, unlocksActions: ['action_automate_production_line'], requiredTech: ['t2_green_energy'] },
            t3_brand_strategy: { id: 't3_brand_strategy', label: "P&D: Estratégia de Marca", costRP: 15, description: "Cria uma marca forte e reconhecida nacionalmente.", effects: { reputation: 10 }, unlocksActions: ['action_national_marketing_campaign'], requiredTech: ['t2_hr_development'] },
            t4_carbon_capture: { id: 't4_carbon_capture', label: "P&D: Captura de Carbono", costRP: 40, description: "Tecnologia experimental para tornar a fábrica carbono-negativo.", effects: { sustainability: 20 }, unlocksActions: ['action_carbon_capture_filters'], requiredTech: ['t3_advanced_recycling'] },
            t4_ai_optimization: { id: 't4_ai_optimization', label: "P&D: Otimização por IA", costRP: 35, description: "Usa IA para prever demanda de mercado e otimizar a produção em tempo real.", effects: { production: 10 }, unlocksActions: ['action_ai_logistics'], requiredTech: ['t3_automation'] }
        },
        actions: {
            action_optimize_logistics: { id: 'action_optimize_logistics', category: 'Operações', label: "Otimizar Logística de Entrega", cost: 200, description: "Revisar rotas de entrega para economizar combustível e tempo.", effects: {}, isMonthlyEffect: true, monthlyEffects: { budget_income: 50, sustainability: 1 }, requiredTech: [] },
            action_implement_basic_recycling: { id: 'action_implement_basic_recycling', category: 'Operações', label: "Implementar Reciclagem Básica", cost: 300, description: "Instala lixeiras de separação e processos de reuso.", effects: { waste: -15, sustainability: 15, morale: 5 }, requiredTech: ['t1_basic_recycling'] },
            action_install_water_reuse_system: { id: 'action_install_water_reuse_system', category: 'Operações', label: "Instalar Reuso de Água", cost: 600, description: "Sistema de ciclo fechado que economiza milhares de litros.", effects: { waste: -10, sustainability: 20 }, requiredTech: ['t2_water_optimization'] },
            action_install_solar_panels: { id: 'action_install_solar_panels', category: 'Operações', label: "Instalar Energia Solar (Pequena)", cost: 1000, description: "Cobre 30% da demanda de energia com painéis solares.", effects: { sustainability: 30, reputation: 10, waste: -5 }, monthlyEffects: { budget_income: 100 }, requiredTech: ['t2_green_energy'] },
            action_local_suppliers: { id: 'action_local_suppliers', category: 'Operações', label: "Priorizar Fornecedores Locais", cost: 250, description: "Reduz custo de frete e melhora a reputação local.", effects: { reputation: 10, sustainability: 5 }, monthlyEffects: { budget_income: 25 }, requiredTech: ['t2_supply_chain'] },
            action_zero_waste_plant: { id: 'action_zero_waste_plant', category: 'Operações', label: "Converter para 'Lixo Zero'", cost: 2500, description: "Investimento massivo para eliminar 100% do desperdício.", effects: { waste: -50, sustainability: 40, reputation: 20 }, requiredTech: ['t3_advanced_recycling'] },
            action_automate_production_line: { id: 'action_automate_production_line', category: 'Operações', label: "Automatizar Linha de Produção", cost: 2000, description: "Aumenta drasticamente a produção, mas pode reduzir a moral.", effects: { production: 50, morale: -20, waste: 5 }, requiredTech: ['t3_automation'] },
            action_carbon_capture_filters: { id: 'action_carbon_capture_filters', category: 'Operações', label: "Instalar Filtros de Captura de Carbono", cost: 3000, description: "Torna a fábrica carbono-negativo, um feito de RP e sustentabilidade.", effects: { sustainability: 50, reputation: 30 }, monthlyEffects: { budget_expense: 100 }, requiredTech: ['t4_carbon_capture'] },
            action_ai_logistics: { id: 'action_ai_logistics', category: 'Operações', label: "Implementar Logística por IA", cost: 1500, description: "IA otimiza toda a cadeia de suprimentos, reduzindo custos.", effects: { production: 10 }, monthlyEffects: { budget_income: 150, waste: -5 }, requiredTech: ['t4_ai_optimization'] },
            action_improve_breakroom: { id: 'action_improve_breakroom', category: 'Recursos Humanos', label: "Melhorar Refeitório", cost: 150, description: "Café de melhor qualidade e um espaço mais confortável.", effects: { morale: 10, waste: 1 }, requiredTech: [] },
            action_team_training_efficiency: { id: 'action_team_training_efficiency', category: 'Recursos Humanos', label: "Capacitar Equipe (Eficiência)", cost: 250, description: "Treinamento para reduzir desperdício na linha de produção.", effects: { production: 10, morale: 10, waste: -5 }, requiredTech: ['t1_efficiency_studies'] },
            action_profit_sharing_plan: { id: 'action_profit_sharing_plan', category: 'Recursos Humanos', label: "Plano de Participação nos Lucros", cost: 500, description: "Divide uma pequena parte dos lucros com a equipe.", effects: { morale: 25, production: 5 }, monthlyEffects: { budget_expense: 150 }, requiredTech: ['t2_hr_development'] },
            action_health_plan: { id: 'action_health_plan', category: 'Recursos Humanos', label: "Oferecer Plano de Saúde Básico", cost: 300, description: "Plano de saúde para todos os funcionários.", effects: { morale: 20 }, monthlyEffects: { budget_expense: 75 }, requiredTech: ['t2_hr_development'] },
            action_buy_more_land: { id: 'action_buy_more_land', category: 'Agrícola', label: "Comprar Mais Terra (5ha)", cost: 300, description: "Expande a área agrícola, aumentando o potencial de produção.", effects: { land: 5, production: 5, waste: 2 }, requiredTech: [] },
            action_protect_from_frost: { id: 'action_protect_from_frost', category: 'Agrícola', label: "Instalar Estufas Protetoras", cost: 400, description: "Protege a plantação de geadas, reduzindo perdas.", effects: { sustainability: 5 }, unlocksFlag: 'frostProtection', requiredTech: [] },
            action_sponsor_local_team: { id: 'action_sponsor_local_team', category: 'Comunidade', label: "Patrocinar Time Local", cost: 200, description: "Coloca o logo da fábrica na camiseta do time de futebol da cidade.", effects: { morale: 5, reputation: 15 }, requiredTech: ['t1_local_marketing'] },
            action_community_open_day: { id: 'action_community_open_day', category: 'Comunidade', label: "Dia de Fábrica Aberta", cost: 100, description: "Convida a comunidade para visitar a fábrica.", effects: { reputation: 10 }, requiredTech: ['t1_local_marketing'] },
            action_national_marketing_campaign: { id: 'action_national_marketing_campaign', category: 'Comunidade', label: "Campanha de Marketing Nacional", cost: 1500, description: "Torna a 'EcoFábrica' uma marca reconhecida no Brasil.", effects: { reputation: 30 }, monthlyEffects: { marketPriceModifier: 0.2 }, requiredTech: ['t3_brand_strategy'] },
            action_policy_snacks: { id: 'action_policy_snacks', category: 'Políticas', label: "Política: Lanches Grátis", cost: 100, description: "Implementa lanches. Custo recorrente de $50/mês.", effects: { morale: 5 }, monthlyEffects: { budget_expense: 50 }, requiredTech: [] },
            action_policy_overtime: { id: 'action_policy_overtime', category: 'Políticas', label: "Política: Horas Extras Pagas", cost: 0, description: "Aumenta a produção. Custo recorrente de $100/mês.", effects: { production: 10, morale: -5 }, monthlyEffects: { budget_expense: 100, production: 5, morale: -2 }, requiredTech: ['t1_efficiency_studies'] },
            action_policy_preventive_maintenance: { id: 'action_policy_preventive_maintenance', category: 'Políticas', label: "Política: Manutenção Preventiva", cost: 200, description: "Reduz o desperdício. Custo recorrente de $75/mês.", effects: { waste: -5 }, monthlyEffects: { budget_expense: 75, waste: -3 }, requiredTech: ['t1_basic_recycling'] }
        },
        events: [
            { id: "GEADA", title: "Alerta de Geada Severa!", condition: (s) => (s.currentMonth === 6 || s.currentMonth === 7) && !s.unlockedFlags.frostProtection && Math.random() < 0.6, message: "Uma frente fria intensa vinda do Sul ameaça congelar sua produção agrícola. Suas plantações estão vulneráveis!", choices: [ { text: "Sofrer o impacto total", effects: { production: -20, budget: -150 }, log: "A geada foi devastadora. Perdemos parte da produção." }, { text: "Tentar salvar parte (Gastar $100)", cost: 100, effects: { production: -10, budget: -50 }, log: "Conseguimos salvar parte da colheita, mas tivemos custos emergenciais." } ] },
            { id: "ESTIAGEM", title: "Estiagem Severa!", condition: (s) => (s.currentMonth === 1 || s.currentMonth === 2 || s.currentMonth === 11 || s.currentMonth === 12) && !s.unlockedTech.includes('t2_water_optimization') && Math.random() < 0.4, message: "A falta de chuva no Paraná está crítica, afetando o nível dos reservatórios e sua produção.", choices: [ { text: "Aceitar consequências", effects: { production: -15, waste: 5, budget: -100 }, log: "A estiagem impactou a produção e aumentou os custos." } ] },
            { id: "FISCALIZACAO", title: "Fiscalização Ambiental!", condition: (s) => s.waste > 50 && s.sustainability < 30 && Math.random() < 0.3, message: "Fiscais do Instituto Água e Terra (IAT) estão na fábrica. Eles encontraram irregularidades no descarte de resíduos.", choices: [ { text: "Pagar multa e se adequar ($300)", cost: 300, effects: { reputation: -10, sustainability: -5 }, log: "Multa paga. Tivemos que nos adequar às pressas." }, { text: "Negociar um Termo de Ajuste ($100)", cost: 100, effects: { reputation: -5 }, log: "Negociamos um TAC. A multa foi baixa, mas a reputação sofreu um pouco." } ] },
            { id: "EQUIPE_DOENTE", title: "Surto de Gripe na Equipe", condition: (s) => s.morale < 50 && !s.unlockedActions.includes('action_health_plan') && Math.random() < 0.3, message: "Com a moral baixa e o inverno chegando, um surto de gripe afastou 15% da sua equipe.", choices: [ { text: "Contratar temporários ($200)", cost: 200, effects: { production: -5, morale: -5 }, log: "Contratamos temporários, mas a produção caiu e a equipe ficou sobrecarregada." }, { text: "Absorver a perda", effects: { production: -15, morale: -10, budget: -50 }, log: "Não fizemos nada e a produção do mês foi muito prejudicada." } ] },
            { id: "PRAGA_LAVOURA", title: "Praga na Lavoura!", condition: (s) => s.land > 10 && Math.random() < 0.25, message: "Uma praga de gafanhotos atingiu parte da sua área agrícola!", choices: [ { text: "Contratar controle de pragas ($250)", cost: 250, effects: { production: -5, sustainability: -5 }, log: "O controle de pragas (com agrotóxicos) resolveu, mas afetou nossa sustentabilidade." }, { text: "Usar controle biológico ($400)", cost: 400, effects: { production: -5, sustainability: 5, reputation: 5 }, log: "O controle biológico foi caro, mas efetivo e melhorou nossa imagem." }, { text: "Ignorar e esperar", effects: { production: -25, budget: -100, land: -5 }, log: "A praga foi um desastre e perdemos 5 hectares de terra produtiva." } ] },
            { id: "MAQUINARIO_QUEBRADO", title: "Maquinário Essencial Quebrou!", condition: (s) => s.production > 70 && !s.unlockedActions.includes('action_policy_preventive_maintenance') && Math.random() < 0.3, message: "A principal linha de produção parou por falta de manutenção! Precisamos de um reparo emergencial.", choices: [ { text: "Reparo de Emergência ($500)", cost: 500, effects: { production: -10, morale: -5 }, log: "O reparo foi caro e atrasou a produção do mês." }, ] },
            { id: "FORNECEDOR_FALHA", title: "Fornecedor de Matéria-Prima Faliu!", condition: (s) => s.currentMonth > 4 && !s.unlockedActions.includes('action_local_suppliers') && Math.random() < 0.2, message: "Nosso principal fornecedor de matéria-prima fechou as portas! Teremos que achar um substituto mais caro às pressas.", choices: [ { text: "Pagar mais caro este mês ($300)", cost: 300, effects: { production: -5 }, log: "Achamos um substituto, mas o custo impactou o orçamento." } ] },
            { id: "MIDIA_POSITIVA", title: "Reportagem Local Positiva!", condition: (s) => s.reputation > 60 && s.sustainability > 50 && Math.random() < 0.25, message: "Um jornal local fez uma reportagem elogiando as práticas sustentáveis da EcoFábrica! O público adorou.", choices: [ { text: "Agradecer e continuar", effects: { reputation: 15, morale: 10, marketPriceModifier: 0.1 }, log: "A reportagem positiva aumentou nossa reputação e o preço dos produtos!" } ] },
            { id: "INOVACAO_INTERNA", title: "Ideia Brilhante da Equipe!", condition: (s) => s.morale > 75 && Math.random() < 0.2, message: "Com a equipe motivada, um funcionário sugeriu uma pequena mudança no processo que pode economizar muito!", choices: [ { text: "Implementar e dar bônus ($100)", cost: 100, effects: { morale: 10, researchPoints: 5, waste: -10 }, log: "A ideia foi um sucesso e a equipe se sente valorizada!" }, { text: "Implementar e ignorar o funcionário", effects: { morale: -15, researchPoints: 5, waste: -10 }, log: "A ideia funcionou, mas a equipe ficou desmotivada por não ser reconhecida." } ] },
            { id: "SAFRA_RECORDE", title: "Safra Recorde!", condition: (s) => (s.currentMonth === 3 || s.currentMonth === 4) && s.land > 10 && Math.random() < 0.2, message: "O clima foi perfeito! Tivemos uma safra recorde, muito acima do esperado.", choices: [ { text: "Vender o excedente (+$400)", cost: -400, effects: { production: 10, waste: 5 }, log: "Safra recorde! Ganhamos um bônus de $400, mas parte se perdeu no armazenamento." } ] },
            { id: "FUNCIONARIO_DESTAQUE", title: "Funcionário Destaque", condition: (s) => s.morale > 70 && s.unlockedActions.includes('action_team_training_efficiency') && Math.random() < 0.15, message: "Um funcionário treinado se destacou, otimizando sozinho uma pequena área da fábrica.", choices: [ { text: "Promovê-lo a supervisor ($150)", cost: 150, effects: { morale: 10, production: 10 }, monthlyEffects: { budget_expense: 50 }, log: "Novo supervisor! A equipe está motivada e a produção melhorou." }, { text: "Dar um bônus único ($100)", cost: 100, effects: { morale: 5, production: 5 }, log: "O funcionário ficou feliz com o bônus." } ] },
            { id: "VISITA_ESCOLA", title: "Escola Local Pede Visita", condition: (s) => s.reputation > 40 && s.unlockedActions.includes('action_community_open_day') && Math.random() < 0.3, message: "Uma escola local quer trazer os alunos para conhecerem a 'fábrica ecológica' da cidade.", choices: [ { text: "Aceitar e preparar tour ($50)", cost: 50, effects: { reputation: 10, morale: 5 }, log: "A visita foi um sucesso e os pais dos alunos elogiaram a iniciativa." }, { text: "Recusar (sem custo)", effects: { reputation: -5 }, log: "Recusamos a visita, o que gerou comentários negativos na comunidade." } ] }
        ]
    };

    class GameState {
        constructor() {
            this.currentState = { ...GAME_DATA.initialState };
            this.playerName = "Gestor(a)";
            this.managerProfile = null;
            this.currentMonth = 0;
            this.isEventActive = false;
            this.unlockedTech = []; 
            this.unlockedActions = [];
            this.unlockedFlags = {};
            this.triggeredEvents = [];
            this.monthlyEffects = { budget_income: 0, budget_expense: 0, marketPriceModifier: 0.0, production: 0, morale: 0, waste: 0 };
            this.history = { budget: [], sustainability: [], waste: [] };
        }
        
        get() { return { ...this.currentState, playerName: this.playerName, managerProfile: this.managerProfile, currentMonth: this.currentMonth, unlockedTech: this.unlockedTech, unlockedActions: this.unlockedActions, unlockedFlags: this.unlockedFlags }; }
        
        initialize(playerName, profileId) {
            this.playerName = playerName || "Gestor(a) Consciente";
            this.managerProfile = profileId;
            this.currentState = { ...GAME_DATA.initialState };
            this.currentMonth = 0; this.isEventActive = false; this.unlockedTech = []; this.unlockedActions = []; this.unlockedFlags = {}; this.triggeredEvents = []; 
            this.monthlyEffects = { budget_income: 0, budget_expense: 0, marketPriceModifier: 0.0, production: 0, morale: 0, waste: 0 };
            this.history = { budget: [], sustainability: [], waste: [] };

            if (profileId === 'visionario') { this.currentState.sustainability += 10; this.currentState.researchPoints += 3; } 
            else if (profileId === 'capitalista') { this.currentState.budget += 300; } 
            else if (profileId === 'lider') { this.currentState.morale += 10; this.currentState.reputation += 5; }
        }
        
        triggerEvent(eventId) { if (eventId && !this.triggeredEvents.includes(eventId)) { this.triggeredEvents.push(eventId); } }
        
        applyItemEffects(item) {
            const s = this.currentState;
            if (item.cost) s.budget -= item.cost;
            if (item.costRP) s.researchPoints -= item.costRP;
            if (item.effects) { for (const key in item.effects) { s[key] = (s[key] || 0) + item.effects[key]; } }
            if (item.monthlyEffects) { for (const key in item.monthlyEffects) { this.monthlyEffects[key] = (this.monthlyEffects[key] || 0) + item.monthlyEffects[key]; } }
            if (item.id) { if (item.costRP) this.unlockedTech.push(item.id); else this.unlockedActions.push(item.id); }
            if (item.unlocksFlag) { this.unlockedFlags[item.unlocksFlag] = true; }
            this.clampStats();
        }
        
        applyEventChoice(choice) {
            const s = this.currentState;
            if (choice.cost) s.budget -= choice.cost;
            if (choice.effects) { for (const key in choice.effects) { s[key] = (s[key] || 0) + choice.effects[key]; } }
            if (choice.monthlyEffects) { for (const key in choice.monthlyEffects) { this.monthlyEffects[key] = (this.monthlyEffects[key] || 0) + choice.monthlyEffects[key]; } }
            this.clampStats();
        }

        processMonthlyTurn() {
            this.currentMonth++;
            const s = this.currentState;
            this.history.budget.push(s.budget); this.history.sustainability.push(s.sustainability); this.history.waste.push(s.waste);
            s.production += this.monthlyEffects.production; s.morale += this.monthlyEffects.morale; s.waste += this.monthlyEffects.waste;
            const basePrice = 15;
            s.marketPriceModifier = Helpers.clamp(s.marketPriceModifier + (Math.random() * 0.2 - 0.1), 0.7, 1.5);
            const marketMod = s.marketPriceModifier + this.monthlyEffects.marketPriceModifier;
            const premiumMod = 1 + (s.reputation / 200) + (s.sustainability / 250);
            const income = s.production * basePrice * marketMod * premiumMod;
            const wasteCost = s.waste * 5; const productionCost = s.production * 3; const landCost = s.land * 5; const moraleCost = Math.max(0, (100 - s.morale) * 2);
            const expenses = wasteCost + productionCost + landCost + moraleCost;
            const netMonthlyEffects = this.monthlyEffects.budget_income - this.monthlyEffects.budget_expense;
            const profit = income - expenses + netMonthlyEffects;
            s.budget += profit;
            s.researchPoints += (s.morale > 75 ? 3 : (s.morale > 50 ? 2 : 1)); s.morale += (Math.random() * 4 - 2); s.reputation -= 1; 
            this.clampStats();
            return { income, expenses, netMonthlyEffects, profit };
        }
        
        checkForRandomEvent() {
            const s = this.get();
            const potentialEvents = GAME_DATA.events.filter(event => { return event.condition(s) && !this.triggeredEvents.includes(event.id); });
            if (potentialEvents.length > 0) { return Helpers.getRandomItem(potentialEvents); }
            return null;
        }
        
        clampStats() {
            const s = this.currentState;
            s.sustainability = Helpers.clamp(s.sustainability, 0, 100); s.morale = Helpers.clamp(s.morale, 0, 100); s.reputation = Helpers.clamp(s.reputation, 0, 100);
            s.waste = Math.max(0, s.waste); s.production = Math.max(0, s.production); s.researchPoints = Math.max(0, s.researchPoints);
            s.marketPriceModifier = Helpers.clamp(s.marketPriceModifier, 0.5, 2.0); s.budget = Math.round(s.budget);
        }
        
        checkWinCondition() { const profile = GAME_DATA.profiles[this.managerProfile]; if (!profile) return false; return profile.winCondition(this.currentState); }
        
        getFinalMessage(isBankruptcy) {
            if (isBankruptcy) { return `Que pena... A ECOFÁBRICA faliu no Mês ${this.currentMonth}. Mas não desanime, toda jornada tem seus tropeços. Tente novamente!`; }
            const profile = GAME_DATA.profiles[this.managerProfile]; const didWin = this.checkWinCondition();
            if (didWin) { const winMsg = profile.getWinMessage(this.currentState); return `PARABÉNS, ${this.playerName}! Você atingiu sua meta como ${profile.name}! ${winMsg} ${profile.description}`; } 
            else { return `A gestão foi um grande aprendizado, ${this.playerName}. Você não atingiu a meta de ${profile.name}, mas cada desafio ensina. Tente novamente!`; }
        }
    }

    class GameUI {
        constructor() {
            this.dom = {
                startScreen: document.getElementById('start-screen'), gameScreen: document.getElementById('game-screen'), endScreen: document.getElementById('end-screen'),
                gameHeader: document.getElementById('game-header'), playerNameInput: document.getElementById('player-name-input'), profileButtons: document.querySelectorAll('.c-btn--profile'),
                startButton: document.getElementById('start-button'), statsGrid: document.getElementById('stats-grid'), decisionsColumn: document.getElementById('decisions-column'),
                researchColumn: document.getElementById('research-column'), nextMonthButton: document.getElementById('next-month-button'), showReportButton: document.getElementById('show-report-button'),
                gameLog: document.getElementById('game-log'), sabiaMentorBox: document.getElementById('sabia-mentor-ui'), sabiaTipTitle: document.getElementById('sabia-tip-title'),
                sabiaTipText: document.getElementById('sabia-tip-text'), finalStatsGrid: document.getElementById('final-stats-grid'), finalMessage: document.getElementById('final-message'),
                restartButton: document.getElementById('restart-button'), reportModal: document.getElementById('report-modal'), eventModal: document.getElementById('event-modal'),
                sabiaQuizModal: document.getElementById('sabia-quiz-modal'), closeModalButtons: document.querySelectorAll('.c-modal__close-btn'), chartContainer: document.getElementById('chart-container'),
                eventModalTitle: document.getElementById('event-modal-title'), eventModalMessage: document.getElementById('event-modal-message'), eventModalChoices: document.getElementById('event-modal-choices'),
                sabiaQuizQuestion: document.getElementById('sabia-quiz-question'), sabiaQuizChoices: document.getElementById('sabia-quiz-choices'), sabiaQuizFeedback: document.getElementById('sabia-quiz-feedback'),
                music: { audio: document.getElementById('background-music'), toggleBtn: document.getElementById('music-toggle') }
            };
            this.isMusicPlaying = false;
        }
        
        bindEvents(gameInstance) {
            this.dom.profileButtons.forEach(button => {
                button.addEventListener('click', () => { this.dom.profileButtons.forEach(btn => btn.classList.remove('is-selected')); button.classList.add('is-selected'); this.dom.startButton.disabled = false; });
            });
            this.dom.startButton.addEventListener('click', () => {
                const name = this.dom.playerNameInput.value; const profile = document.querySelector('.c-btn--profile.is-selected')?.dataset.profile;
                if (profile) { gameInstance.startGame(name, profile); }
            });
            this.dom.nextMonthButton.addEventListener('click', () => gameInstance.advanceMonth());
            this.dom.showReportButton.addEventListener('click', () => gameInstance.showReport());
            this.dom.restartButton.addEventListener('click', () => window.location.reload());
            
            this.dom.decisionsColumn.addEventListener('click', (e) => { const button = e.target.closest('button[data-action-id]'); if (button && !button.disabled) { gameInstance.handleAction(button.dataset.actionId); } });
            this.dom.researchColumn.addEventListener('click', (e) => { const button = e.target.closest('button[data-research-id]'); if (button && !button.disabled) { gameInstance.handleResearch(button.dataset.researchId); } });

            this.dom.closeModalButtons.forEach(btn => { btn.addEventListener('click', () => { const modalId = btn.dataset.modalId; if (modalId) { this.showModal(modalId, false); } }); });
            window.addEventListener('click', (event) => { if (event.target.classList.contains('c-modal')) { const modalId = event.target.id; if (modalId !== 'event-modal') { this.showModal(modalId, false); } } });
            this.dom.music.toggleBtn.addEventListener('click', () => this.toggleMusic());
        }

        switchScreen(screenName) {
            this.dom.startScreen.classList.add('u-hidden'); this.dom.gameScreen.classList.add('u-hidden'); this.dom.endScreen.classList.add('u-hidden');
            if (screenName === 'game') { this.dom.gameScreen.classList.remove('u-hidden'); } else if (screenName === 'end') { this.dom.endScreen.classList.remove('u-hidden'); } else { this.dom.startScreen.classList.remove('u-hidden'); }
        }
        
        toggleMusic(forcePlay = false) {
            if (forcePlay && !this.isMusicPlaying) { this.dom.music.audio.volume = 0.2; this.dom.music.audio.play().catch(e => console.warn("Música aguardando interação do usuário.")); this.dom.music.toggleBtn.textContent = '🎵'; this.isMusicPlaying = true; } 
            else if (!forcePlay) { if (this.dom.music.audio.paused) { this.dom.music.audio.play(); this.dom.music.toggleBtn.textContent = '🎵'; this.isMusicPlaying = true; } else { this.dom.music.audio.pause(); this.dom.music.toggleBtn.textContent = '🔇'; this.isMusicPlaying = false; } }
        }

        render(state, history, isEventActive) {
            this.dom.gameHeader.innerHTML = `Gestor(a) <strong>${state.playerName}</strong> - Mês: <strong>${state.currentMonth}</strong> / ${GAME_DATA.totalMonths}`;
            this.renderStats(state, this.dom.statsGrid); this.renderActions(state); this.renderResearch(state); this.updateButtonStates(state, isEventActive);
        }
        
        renderStats(state, targetElement) {
            targetElement.innerHTML = ''; const displayNames = GAME_DATA.statDisplayNames;
            Object.keys(displayNames).forEach(key => {
                if (state.hasOwnProperty(key)) {
                    const name = displayNames[key]; const value = state[key]; let valueStr = ""; let modifierClass = `c-stats-grid__value--${key}`;
                    if (key === 'budget') { valueStr = Helpers.formatCurrency(value); } 
                    else if (key === 'marketPriceModifier') { valueStr = `${(value * 100).toFixed(0)}%`; if(value > 1.1) modifierClass += ' is-good'; if(value < 0.9) modifierClass += ' is-bad'; } 
                    else if (key.match(/sustainability|morale|reputation/)) { valueStr = `${value.toFixed(0)} / 100`; } else { valueStr = value.toFixed(0); }
                    
                    const statItem = document.createElement('div'); statItem.className = 'c-stats-grid__item';
                    statItem.innerHTML = `<span class="c-stats-grid__label">${name}</span><span class="c-stats-grid__value ${modifierClass}">${valueStr}</span>`; targetElement.appendChild(statItem);
                }
            });
        }
        
        renderActions(state) {
            this.dom.decisionsColumn.innerHTML = ''; const categories = {};
            Object.values(GAME_DATA.actions).forEach(action => {
                if (!action.isMonthlyEffect && state.unlockedActions.includes(action.id)) return;
                const hasTech = action.requiredTech.every(techId => state.unlockedTech.includes(techId)); if (!hasTech) return; 
                const cat = action.category || 'Outras'; if (!categories[cat]) categories[cat] = []; categories[cat].push(action);
            });
            const categoryOrder = ['Operações', 'Recursos Humanos', 'Agrícola', 'Comunidade', 'Políticas', 'Outras'];
            categoryOrder.forEach(catName => {
                if (categories[catName]) {
                    const h4 = document.createElement('h4'); h4.textContent = catName; this.dom.decisionsColumn.appendChild(h4);
                    categories[catName].forEach(action => { this.dom.decisionsColumn.appendChild(this.createActionButton(action, 'action', state)); });
                }
            });
        }
        
        renderResearch(state) {
            this.dom.researchColumn.innerHTML = '<h4>Pesquisa & Desenvolvimento (P&D)</h4>';
            Object.values(GAME_DATA.researchTree).forEach(tech => {
                if (state.unlockedTech.includes(tech.id)) return;
                const hasRequiredTech = tech.requiredTech.every(reqId => state.unlockedTech.includes(reqId)); if (!hasRequiredTech) return;
                this.dom.researchColumn.appendChild(this.createActionButton(tech, 'research', state));
            });
        }
        
        createActionButton(item, type, state) {
            const button = document.createElement('button'); const isResearch = type === 'research';
            button.dataset[isResearch ? 'researchId' : 'actionId'] = item.id; button.className = `c-btn c-btn--action ${isResearch ? 'c-btn--research' : 'c-btn--decision'}`;
            const cost = item.cost || 0; const costRP = item.costRP || 0; let reason = "";
            if (state.budget < cost) reason = "Orçamento insuficiente"; else if (state.researchPoints < costRP) reason = "P&D insuficiente";
            button.disabled = reason !== ""; button.title = reason || item.description;
            let costStr = ''; if(cost > 0) costStr += `<span class="cost">${Helpers.formatCurrency(cost)}</span>`; if(costRP > 0) costStr += ` / <span class="rp">${costRP} P&D</span>`; if(costStr === '') costStr = 'Grátis';
            let monthlyCostStr = ''; if(item.monthlyEffects && item.monthlyEffects.budget_expense > 0) { monthlyCostStr = ` (Recorrente: ${Helpers.formatCurrency(item.monthlyEffects.budget_expense)}/mês)`; }
            button.innerHTML = `<strong>${item.label}</strong><small>${item.description}<br>Custo: ${costStr}${monthlyCostStr}</small>`; return button;
        }
        
        updateButtonStates(state, isEventActive) {
            this.dom.nextMonthButton.disabled = isEventActive; this.dom.showReportButton.disabled = isEventActive;
            this.dom.decisionsColumn.querySelectorAll('button').forEach(b => { if (isEventActive) b.disabled = true; });
            this.dom.researchColumn.querySelectorAll('button').forEach(b => { if (isEventActive) b.disabled = true; });
        }

        addLog(message, type = 'neutral') { const p = document.createElement('p'); p.innerHTML = message; p.className = `c-game-log__entry c-game-log__entry--${type}`; this.dom.gameLog.prepend(p); }
        
        updateSabiaTip(title, text) { this.dom.sabiaTipTitle.textContent = title; this.dom.sabiaTipText.textContent = text; this.dom.sabiaMentorBox.style.animation = 'none'; void this.dom.sabiaMentorBox.offsetWidth; this.dom.sabiaMentorBox.style.animation = 'fadeIn 0.5s'; }

        showModal(modalId, show = true) { const modal = this.dom[modalId]; if (modal) { modal.style.display = show ? 'block' : 'none'; } }
        
        showEventModal(event, choiceCallback) {
            this.dom.eventModalTitle.textContent = event.title; this.dom.eventModalMessage.textContent = event.message; this.dom.eventModalChoices.innerHTML = '';
            event.choices.forEach((choice, index) => {
                const button = document.createElement('button'); button.className = 'c-btn c-btn--event c-btn--full-width'; button.textContent = choice.text;
                button.onclick = () => { choiceCallback(index); this.showModal('eventModal', false); }; this.dom.eventModalChoices.appendChild(button);
            });
            this.showModal('eventModal', true);
        }
        
        showSabiaQuizModal(quiz, answerCallback) {
            this.dom.sabiaQuizQuestion.textContent = quiz.question; this.dom.sabiaQuizChoices.innerHTML = ''; this.dom.sabiaQuizFeedback.innerHTML = '';
            const options = [...quiz.options].sort(() => Math.random() - 0.5);
            options.forEach(optionText => {
                const button = document.createElement('button'); button.className = 'c-btn c-btn--decision c-btn--full-width'; button.textContent = optionText;
                button.onclick = () => {
                    const isCorrect = (optionText === quiz.answer);
                    this.dom.sabiaQuizFeedback.innerHTML = isCorrect ? `<span class="u-text-success"><strong>Correto!</strong> ${quiz.explanation}</span>` : `<span class="u-text-danger"><strong>Quase!</strong> A resposta correta é <strong>${quiz.answer}</strong>. ${quiz.explanation}</span>`;
                    this.dom.sabiaQuizChoices.querySelectorAll('button').forEach(b => b.disabled = true); answerCallback(isCorrect);
                };
                this.dom.sabiaQuizChoices.appendChild(button);
            });
            this.showModal('sabiaQuizModal', true);
        }

        renderReportChart(history) {
            this.dom.chartContainer.innerHTML = '';
            if (history.budget.length === 0) { this.dom.chartContainer.innerHTML = "<p>Nenhum dado para exibir. Avance pelo menos um mês.</p>"; return; }
            const maxBudget = Math.max(...history.budget, 1); const maxWaste = Math.max(...history.waste, 50); const maxSustain = 100;
            for (let i = 0; i < history.budget.length; i++) {
                const monthWrapper = document.createElement('div'); monthWrapper.className = 'c-chart-bar-wrapper';
                const createBar = (className, value, maxValue, label) => {
                    const bar = document.createElement('div'); bar.className = `c-chart-bar c-chart-bar--${className}`; bar.style.height = `${Helpers.clamp((value / maxValue) * 100, 5, 100)}%`; bar.title = `${label}: ${value.toFixed(0)}`; bar.innerHTML = `<span class="c-chart-bar__value">${value.toFixed(0)}</span>`; return bar;
                };
                monthWrapper.appendChild(createBar('budget', history.budget[i], maxBudget, 'Orçamento')); monthWrapper.appendChild(createBar('sustainability', history.sustainability[i], maxSustain, 'Sustentabilidade')); monthWrapper.appendChild(createBar('waste', history.waste[i], maxWaste, 'Desperdício'));
                const label = document.createElement('span'); label.className = 'c-chart-bar__label'; label.textContent = `Mês ${i + 1}`; monthWrapper.appendChild(label); this.dom.chartContainer.appendChild(monthWrapper);
            }
        }
        
        renderEndScreen(state, finalMessage, isWin) { this.renderStats(state, this.dom.finalStatsGrid); this.dom.finalMessage.textContent = finalMessage; this.dom.finalMessage.className = ''; this.dom.finalMessage.classList.add(isWin ? 'u-text-success' : 'u-text-danger'); this.switchScreen('end'); this.toggleMusic(false); }
    }
    
    class ProfessorSabia {
        constructor(ui) { this.ui = ui; this.lastQuizMonth = -1; }
        log(message, type = 'sabia') { const s = `<strong>Professor Sabiá:</strong> "${message}"`; this.ui.addLog(s, type); }
        greet(playerName, profileName) { this.log(`Olá, ${playerName}! Um ${profileName}, hein? Uma escolha audaciosa! Sua jornada na EcoFábrica começa agora. Estou aqui para ajudar!`); }
        giveContextualTip(state) {
            let tipToShow = "As coisas parecem estáveis. Continue com o bom planejamento!"; let tipTitle = "Relatório do Professor Sabiá";
            const problemTip = SABIA_KNOWLEDGE_BASE.gameTips.find(tip => { return tip.condition(state); });
            if (problemTip) { tipToShow = problemTip.tip; tipTitle = "🦉 Alerta do Professor Sabiá!"; } 
            else {
                const genericTips = ["Não se esqueça de investir em P&D! O conhecimento de hoje é o lucro de amanhã.", "Manter a Moral da Equipe alta resulta em mais Pontos de P&D passivos.", "Reputação alta pode aumentar o preço dos seus produtos. Fique de olho!", "Desperdício não é só ruim para o planeta, ele gera custos diretos todo mês!"];
                tipToShow = Helpers.getRandomItem(genericTips); tipTitle = "🦉 Dica do Professor Sabiá";
            }
            this.ui.updateSabiaTip(tipTitle, tipToShow);
        }
        attemptToAskQuiz(state, gameInstance) {
            if (state.currentMonth <= 1 || state.isEventActive) return;
            if (state.currentMonth > this.lastQuizMonth + 1 && Math.random() < 0.3) {
                this.lastQuizMonth = state.currentMonth;
                const question = Helpers.getRandomItem(SABIA_KNOWLEDGE_BASE.quizQuestions);
                if (question) { this.log("Vamos fazer uma pausa rápida para testar seu conhecimento de código!"); this.ui.showSabiaQuizModal(question, (isCorrect) => { gameInstance.handleQuizResult(isCorrect); }); }
            }
        }
        logQuizResult(isCorrect) { if (isCorrect) { this.log("Parabéns, resposta correta! Você ganhou +3 Pontos de P&D como bônus!", 'good'); } else { this.log("Quase! Mas não se preocupe, o importante é aprender. Continue estudando o código!", 'bad'); } }
    }

    class Game {
        constructor() { this.state = new GameState(); this.ui = new GameUI(); this.sabia = new ProfessorSabia(this.ui); this.isEventActive = false; }
        init() { this.ui.bindEvents(this); this.ui.switchScreen('start'); }
        startGame(playerName, profileId) { this.state.initialize(playerName, profileId); const s = this.state.get(); const profileName = GAME_DATA.profiles[s.managerProfile].name; this.ui.switchScreen('game'); this.ui.toggleMusic(true); this.sabia.greet(s.playerName, profileName); this.advanceMonth(true); }
        advanceMonth(isFirstMonth = false) {
            if (this.isEventActive) return;
            if (!isFirstMonth) { const summary = this.state.processMonthlyTurn(); this.ui.addLog(`Mês fechado. Receita: ${Helpers.formatCurrency(summary.income)}, Custos: ${Helpers.formatCurrency(summary.expenses)}. Lucro/Prejuízo: ${Helpers.formatCurrency(summary.profit)}.`, 'neutral'); } else { this.state.currentMonth = 1; }
            const s = this.state.get();
            if (s.budget <= 0) { this.endGame(true); return; }
            if (s.currentMonth > GAME_DATA.totalMonths) { this.endGame(false); return; }
            const event = this.state.checkForRandomEvent();
            if (event) { this.isEventActive = true; this.ui.showEventModal(event, (choiceIndex) => { this.handleEventChoice(event, choiceIndex); }); this.ui.addLog(`EVENTO: ${event.title}`, 'bad'); }
            this.ui.render(s, this.state.history, this.isEventActive); this.sabia.giveContextualTip(s);
            if (!this.isEventActive) { this.sabia.attemptToAskQuiz(s, this); }
        }
        handleAction(actionId) { if (this.isEventActive) return; const action = GAME_DATA.actions[actionId]; if (!action) return; this.state.applyItemEffects(action); this.ui.addLog(`Ação realizada: ${action.label} (Custo: ${Helpers.formatCurrency(action.cost || 0)})`, 'good'); this.ui.render(this.state.get(), this.state.history, this.isEventActive); }
        handleResearch(techId) { if (this.isEventActive) return; const tech = GAME_DATA.researchTree[techId]; if (!tech) return; this.state.applyItemEffects(tech); this.ui.addLog(`Pesquisa concluída: ${tech.label} (Custo: ${tech.costRP} P&D)`, 'good'); this.ui.render(this.state.get(), this.state.history, this.isEventActive); }
        handleEventChoice(event, choiceIndex) { const choice = event.choices[choiceIndex]; if (!choice) return; this.state.applyEventChoice(choice); this.state.triggerEvent(event.id); this.ui.addLog(`Resultado do Evento: ${choice.log}`, 'neutral'); this.isEventActive = false; this.ui.render(this.state.get(), this.state.history, this.isEventActive); this.sabia.attemptToAskQuiz(this.state.get(), this); }
        handleQuizResult(isCorrect) { if (isCorrect) { this.state.currentState.researchPoints += 3; this.sabia.logQuizResult(true); this.ui.renderStats(this.state.get(), this.ui.dom.statsGrid); } else { this.sabia.logQuizResult(false); } }
        showReport() { if (this.isEventActive) return; this.ui.renderReportChart(this.state.history); this.ui.showModal('reportModal', true); }
        endGame(isBankruptcy) { const finalMessage = this.state.getFinalMessage(isBankruptcy); const didWin = !isBankruptcy && this.state.checkWinCondition(); this.ui.renderEndScreen(this.state.get(), finalMessage, didWin); }
    }

    const ecoGame = new Game();
    ecoGame.init();
});
