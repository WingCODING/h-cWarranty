export const NOC_OPTIONS = [
  { value: "75110", label: "Construção Civil — NOC 75110" },
  { value: "65310", label: "Limpeza — NOC 65310" },
  { value: "75119", label: "Serviços Gerais — NOC 75119" },
] as const;

export const MAX_PAGES = 150;

export const initialCase = {
  irccNumber: "HC-2026-849201-ON",
  applicantName: "Carlos Eduardo Mendes",
  noc: "75110",
  dependents: 2,
  file: { name: "Volume_1_HC.pdf", pages: 142, sizeMb: 18.4 },
};

export type TriageLevel = 1 | 2 | 3;

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

export const AI_SUMMARY = [
  {
    key: "community",
    label: "Vínculo comunitário",
    value: "Forte integração local",
    detail: "6 cartas de recomendação (associação de bairro, voluntariado, igreja).",
  },
  {
    key: "time",
    label: "Tempo no Canadá",
    value: "4 anos e 8 meses",
    detail: "Residência contínua comprovada por aluguel e declarações CRA.",
  },
  {
    key: "noc",
    label: "Histórico profissional NOC",
    value: "Construção Civil — NOC 75110",
    detail: "Atuação contínua em Ontário, setor com escassez de mão de obra.",
  },
  {
    key: "school",
    label: "Filhos na escola",
    value: "2 dependentes matriculados",
    detail: "Frequência de 98% no Toronto District School Board.",
  },
] as const;

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
