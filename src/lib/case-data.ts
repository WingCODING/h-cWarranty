export const NOC_OPTIONS = [
  { value: "75110", label: "Construção Civil — NOC 75110" },
  { value: "65310", label: "Limpeza — NOC 65310" },
  { value: "75119", label: "Serviços Gerais — NOC 75119" },
] as const;

export const MAX_PAGES = 150;

export type TriageLevel = 1 | 2 | 3;

export type SummaryItem = {
  key: "community" | "time" | "noc" | "school";
  label: string;
  value: string;
  detail: string;
};

/**
 * Documento compatível com coleções NoSQL (MongoDB / Firebase Firestore / DynamoDB)
 * Para adicionar novos casos ou popular via API/NoSQL, basta inserir um novo objeto seguindo este schema.
 */
export type DossierCase = {
  id: string;
  irccNumber: string;
  applicantName: string;
  originCountry: string;
  cityProvince: string;
  noc: "75110" | "65310" | "75119";
  dependents: number;
  submittedAt: string;
  evaluated: boolean;
  initialDecision: "pending" | "approved" | "denied";
  triageLevel: TriageLevel;
  imageUrl: string;
  file: {
    name: string;
    pages: number;
    sizeMb: number;
  };
  summary: SummaryItem[];
};

export const MOCK_CASES: DossierCase[] = [
  {
    id: "case-1",
    irccNumber: "HC-2026-841022-ON",
    applicantName: "Família Silva & Mendes",
    originCountry: "Brasil",
    cityProvince: "Toronto, ON",
    noc: "75119",
    dependents: 3,
    submittedAt: "Avaliado hoje às 08:40",
    evaluated: true,
    initialDecision: "approved",
    triageLevel: 1,
    imageUrl: "/img/MockupsImigrations/case-1.jpg",
    file: { name: "Volume_1_Silva_HC.pdf", pages: 138, sizeMb: 16.2 },
    summary: [
      {
        key: "community",
        label: "Vínculo comunitário",
        value: "Integração comunitária e acompanhamento médico em Toronto",
        detail:
          "6 cartas de recomendação comunitária e suporte de reabilitação local em Ontário.",
      },
      {
        key: "time",
        label: "Tempo no Canadá",
        value: "5 anos e 2 meses",
        detail:
          "Residência fixa comprovada por contratos de locação e declarações NOA da CRA.",
      },
      {
        key: "noc",
        label: "Histórico profissional NOC",
        value: "Serviços Gerais — NOC 75119",
        detail:
          "Atuação contínua em manutenção predial e serviços gerais na Grande Toronto.",
      },
      {
        key: "school",
        label: "Filhos na escola",
        value: "2 filhos matriculados (TDSB)",
        detail:
          "Crianças com 99% de frequência escolar no Toronto District School Board.",
      },
    ],
  },
  {
    id: "case-2",
    irccNumber: "HC-2026-849201-ON",
    applicantName: "Carlos Eduardo Mendes",
    originCountry: "Brasil",
    cityProvince: "Toronto, ON",
    noc: "75110",
    dependents: 2,
    submittedAt: "Recebido há 18 min • Prioridade",
    evaluated: false,
    initialDecision: "pending",
    triageLevel: 2,
    imageUrl: "/img/MockupsImigrations/case-2.jpg",
    file: { name: "Volume_1_HC.pdf", pages: 142, sizeMb: 18.4 },
    summary: [
      {
        key: "community",
        label: "Vínculo comunitário",
        value: "Forte integração local",
        detail:
          "6 cartas de recomendação (associação de bairro, voluntariado, igreja).",
      },
      {
        key: "time",
        label: "Tempo no Canadá",
        value: "4 anos e 8 meses",
        detail:
          "Residência contínua comprovada por aluguel e declarações CRA.",
      },
      {
        key: "noc",
        label: "Histórico profissional NOC",
        value: "Construção Civil — NOC 75110",
        detail:
          "Atuação em infraestrutura urbana e obras residenciais em Ontário.",
      },
      {
        key: "school",
        label: "Filhos na escola",
        value: "2 dependentes matriculados",
        detail: "Frequência de 98% no Toronto District School Board.",
      },
    ],
  },
  {
    id: "case-3",
    irccNumber: "HC-2026-843190-QC",
    applicantName: "Jean-Baptiste Toussaint",
    originCountry: "Haiti",
    cityProvince: "Montréal, QC",
    noc: "75110",
    dependents: 2,
    submittedAt: "Aguardando verificação",
    evaluated: false,
    initialDecision: "pending",
    triageLevel: 2,
    imageUrl: "/img/MockupsImigrations/case-3.jpg",
    file: { name: "Volume_1_Toussaint_HC.pdf", pages: 148, sizeMb: 19.7 },
    summary: [
      {
        key: "community",
        label: "Vínculo comunitário",
        value: "Associação comunitária de Montréal",
        detail:
          "5 cartas de apoio de vizinhos, empregador da construção e paróquia local.",
      },
      {
        key: "time",
        label: "Tempo no Canadá",
        value: "4 anos e 4 meses",
        detail:
          "Histórico contínuo em Québec com declarações fiscais Revenu Québec / CRA.",
      },
      {
        key: "noc",
        label: "Histórico profissional NOC",
        value: "Construção Civil — NOC 75110",
        detail:
          "Operador e montador estrutural certificado com oferta de emprego ativa.",
      },
      {
        key: "school",
        label: "Filhos na escola",
        value: "2 dependentes matriculados",
        detail: "Crianças integradas ao ensino público francófono em Montréal.",
      },
    ],
  },
  {
    id: "case-4",
    irccNumber: "HC-2026-845512-AB",
    applicantName: "Roberto & Família Alencar",
    originCountry: "Colômbia",
    cityProvince: "Calgary, AB",
    noc: "75119",
    dependents: 4,
    submittedAt: "Avaliado ontem às 17:15",
    evaluated: true,
    initialDecision: "approved",
    triageLevel: 1,
    imageUrl: "/img/MockupsImigrations/case-4.jpg",
    file: { name: "Volume_1_Alencar_HC.pdf", pages: 146, sizeMb: 17.8 },
    summary: [
      {
        key: "community",
        label: "Vínculo comunitário",
        value: "Comunidade escolar e esportiva de Calgary",
        detail:
          "7 cartas autenticadas de diretores escolares e líderes comunitários em Alberta.",
      },
      {
        key: "time",
        label: "Tempo no Canadá",
        value: "5 anos e 9 meses",
        detail:
          "Entrada regular seguida de estabelecimento familiar completo em Calgary.",
      },
      {
        key: "noc",
        label: "Histórico profissional NOC",
        value: "Serviços Gerais — NOC 75119",
        detail:
          "Supervisor de manutenção comercial com histórico fiscal T4 ininterrupto.",
      },
      {
        key: "school",
        label: "Filhos na escola",
        value: "4 dependentes matriculados",
        detail:
          "Relatórios pedagógicos de excelência no Calgary Board of Education.",
      },
    ],
  },
  {
    id: "case-5",
    irccNumber: "HC-2026-851408-ON",
    applicantName: "Grace & Família Okafor",
    originCountry: "Nigéria",
    cityProvince: "Ottawa, ON",
    noc: "65310",
    dependents: 5,
    submittedAt: "Aguardando verificação",
    evaluated: false,
    initialDecision: "pending",
    triageLevel: 2,
    imageUrl: "/img/MockupsImigrations/case-5.jpg",
    file: { name: "Volume_1_Okafor_HC.pdf", pages: 149, sizeMb: 20.1 },
    summary: [
      {
        key: "community",
        label: "Vínculo comunitário",
        value: "Rede de acolhimento familiar em Ottawa",
        detail:
          "Cartas de apoio de organizações humanitárias e conselho tutelar escolar.",
      },
      {
        key: "time",
        label: "Tempo no Canadá",
        value: "3 anos e 6 meses",
        detail:
          "Comprovantes residenciais e vínculos laborais formais em Ontário.",
      },
      {
        key: "noc",
        label: "Histórico profissional NOC",
        value: "Limpeza — NOC 65310",
        detail:
          "Atuação essencial em higienização hospitalar e centros comunitários.",
      },
      {
        key: "school",
        label: "Filhos na escola",
        value: "5 dependentes sob proteção BIOC",
        detail:
          "Prioridade máxima pelo critério de Melhor Interesse da Criança (BIOC).",
      },
    ],
  },
  {
    id: "case-6",
    irccNumber: "HC-2026-850114-MB",
    applicantName: "Olena Kovalenko",
    originCountry: "Ucrânia",
    cityProvince: "Winnipeg, MB",
    noc: "65310",
    dependents: 2,
    submittedAt: "Aguardando verificação",
    evaluated: false,
    initialDecision: "pending",
    triageLevel: 2,
    imageUrl: "/img/MockupsImigrations/case-6.jpg",
    file: { name: "Volume_1_Kovalenko_HC.pdf", pages: 144, sizeMb: 17.5 },
    summary: [
      {
        key: "community",
        label: "Vínculo comunitário",
        value: "Centro Comunitário Ucraniano-Canadense",
        detail:
          "5 cartas de recomendação comunitária e atuação voluntária em Manitoba.",
      },
      {
        key: "time",
        label: "Tempo no Canadá",
        value: "3 anos e 11 meses",
        detail:
          "Comprovantes residenciais e declarações fiscais T4/NOA regulares.",
      },
      {
        key: "noc",
        label: "Histórico profissional NOC",
        value: "Limpeza — NOC 65310",
        detail: "Equipe técnica de hotelaria e higienização comercial.",
      },
      {
        key: "school",
        label: "Filhos na escola",
        value: "2 filhos matriculados",
        detail:
          "Laudo BIOC altamente favorável emitido pela Winnipeg School Division.",
      },
    ],
  },
];

export const initialCase = MOCK_CASES[1];

/**
 * Entrada da Fila Geral (processos com amparo preliminar negado).
 * Compatível com coleções NoSQL — basta persistir objetos neste formato.
 */
export type QueueEntry = {
  id: string;
  applicantName: string;
  irccNumber: string;
  originCountry: string;
  cityProvince: string;
  noc: DossierCase["noc"];
  imageUrl?: string;
  queuedAt: string;
  reason: string;
};

/** Processos que já estavam empilhados na Fila Geral antes desta sessão. */
export const GENERAL_QUEUE_SEED: QueueEntry[] = [
  {
    id: "queue-seed-1",
    applicantName: "Amina El-Mansouri",
    irccNumber: "HC-2026-838761-BC",
    originCountry: "Marrocos",
    cityProvince: "Vancouver, BC",
    noc: "65310",
    queuedAt: "Ontem às 16:05",
    reason: "Tempo de residência inferior ao mínimo recomendado.",
  },
  {
    id: "queue-seed-2",
    applicantName: "Diego Ramírez",
    irccNumber: "HC-2026-836420-ON",
    originCountry: "México",
    cityProvince: "Hamilton, ON",
    noc: "75110",
    queuedAt: "Há 2 dias",
    reason: "Documentação comunitária incompleta.",
  },
  {
    id: "queue-seed-3",
    applicantName: "Thi Lan Nguyen",
    irccNumber: "HC-2026-834118-QC",
    originCountry: "Vietnã",
    cityProvince: "Québec, QC",
    noc: "75119",
    queuedAt: "Há 3 dias",
    reason: "Histórico NOC sem comprovação fiscal contínua.",
  },
];

export const TRIAGE_LEVELS: {
  level: TriageLevel;
  title: string;
  description: string;
  tone: "success" | "warning" | "danger";
}[] = [
  {
    level: 1,
    title: "Muito Provável de Aprovação",
    description:
      "Requisitos atingidos. Amparo Provisório liberado automaticamente.",
    tone: "success",
  },
  {
    level: 2,
    title: "Razoável / Verificação Rápida",
    description: "Requer auxílio humano rápido para liberar a 1ª etapa.",
    tone: "warning",
  },
  {
    level: 3,
    title: "Requisitos Insuficientes",
    description: "Tendência de negativa. Encaminhado para auditoria completa.",
    tone: "danger",
  },
];

export const AI_SUMMARY = initialCase.summary;

export const GRANTED_RIGHTS = [
  {
    key: "work",
    title: "Permissão de Trabalho por Proficiência (NOC)",
    description: "Setor de Construção Civil / Serviços Gerais liberado.",
  },
  {
    key: "residence",
    title: "Direito de Residência Temporária",
    description: "Proteção legal de permanência até avaliação final do agente.",
  },
  {
    key: "services",
    title: "Acesso à Educação e Saúde (Pagos)",
    description:
      "Direito de matrícula escolar e cobertura de saúde para o titular e dependentes.",
  },
] as const;
