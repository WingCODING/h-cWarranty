<div align="center">

# 🇨🇦 H&C WARRANTY — IRCC Fast Track
### Plataforma Web Citizen Tech com Agentes de IA para Triagem de Processos H&C

**FIAP Global Solution 2026**

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-v14-yellow?style=for-the-badge&logo=framer)](https://motion.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📌 1. Identificação da Solução e Conceito Citizen Tech

O **H&C Warranty** é uma solução **Citizen Tech / GovTech** concebida para simplificar, agilizar e auditar o processo de triagem e análise de pedidos de residência permanente no Canadá sob a modalidade **H&C (*Humanitarian and Compassionate Considerations* — Considerações Humanitárias e de Compaixão)** perante a **IRCC (*Immigration, Refugees and Citizenship Canada*)**.

O sistema atua como uma ponte tecnológica equipada com **Inteligência Artificial (OpenAI API)** para transformar uma burocracia exaustiva em uma esteira ágil e transparente, acelerando a concessão de um **Amparo Provisório Governamental** aos solicitantes que já possuem raízes econômicas e comunitárias consolidadas no país.

---

## 🛑 2. O Problema e a Oportunidade

### O Cenário Real
Estudos demográficos e relatórios parlamentares estimam que entre **200.000 e 500.000 pessoas** residem atualmente no Canadá em situação sem status regular ou com status precário. A esmagadora maioria ingressou no país por vias legais (trabalhadores temporários e estudantes internacionais), fixou residência comunitária e sustenta setores vitais com escassez crítica de mão de obra — especialmente **Construção Civil (NOC 75110)**, **Limpeza (NOC 65310)** e **Serviços Gerais (NOC 75119)**.

### Os Dois Grandes Gargalos
1. **O Gargalo Humano dos Dossiês de 300+ Páginas:** Comprovar enraizamento social (*establishment*), histórico fiscal (CRA), vínculo comunitário e o Melhor Interesse da Criança (*Best Interests of the Child - BIOC*) gera processos extensos que sobrecarregam os agentes públicos do IRCC.
2. **O Limbo Jurídico de 24 a 36 Meses:** A fila de leitura manual impõe aos imigrantes anos de espera sem permissão formal para trabalhar em sua ocupação qualificada, insegurança jurídica quanto a ordens de deportação e impedimento ao pleno acesso à saúde e matrícula escolar dos filhos.

### A Oportunidade Citizen Tech
Ao integrar uma interface moderna desktop à API de Inteligência Artificial para ler e cruzar evidências documentais em lotes auditáveis (**limite técnico de até 150 páginas por PDF**), a plataforma categoriza a viabilidade da solicitação em **3 níveis instantâneos**, permitindo conceder o **Amparo Provisório (Stage 1)** com segurança jurídica e auditoria humana (*Human-in-the-Loop*).

---

## 🎯 3. Arquitetura da Solução e Regra de Negócio dos 3 Níveis

A aplicação foi desenhada em **3 Telas / Módulos Integrados**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       H&C WARRANTY — IRCC FAST TRACK                        │
├──────────────────────────┬──────────────────────────┬───────────────────────┤
│  1. MESA DE TRIAGEM      │  2. DIAGNÓSTICO DA IA    │  3. PORTAL DO         │
│     E UPLOAD DE DOSSIÊ   │     E MESA HUMANA        │     IMIGRANTE         │
├──────────────────────────┼──────────────────────────┼───────────────────────┤
│ • Dados do Processo      │ • 3 Níveis de Diagnóstico│ • Banner Ativo Oficial│
│ • Ocupação NOC           │ • Resumo IA em 4 Pilares │ • Permissão Trabalho  │
│ • Validador ≤ 150 págs   │ • Verificação em 2 min   │ • Residência Legal    │
│ • Aviso Técnico OpenAI   │ • Decisão: Aprovar/Negar │ • Educação & Saúde    │
└──────────────────────────┴──────────────────────────┴───────────────────────┘
```

### 3.1. Formas de Resposta e Níveis de Triagem

| Nível | Classificação | Critérios de Avaliação da IA | Encaminhamento Governamental |
| :---: | :--- | :--- | :--- |
| **Nível 1** | 🟢 **Alta Viabilidade** | Documentação completa, comprovado enraizamento comunitário, histórico laboral formal sólido e melhor interesse da criança demonstrado. | **Concessão imediata do Amparo Provisório** e prioridade na fila de análise definitiva. |
| **Nível 2** | 🟡 **Viabilidade Média / Incompleto** | Evidências parciais de enraizamento ou lacunas documentais sanáveis identificadas pelos agentes de IA. | **Mesa de Verificação Rápida do Agente:** revisão humana orientada com parecer sintético da IA para liberação da 1ª etapa ou diligência. |
| **Nível 3** | 🔴 **Baixa Viabilidade / Inconsistente** | Inconsistências severas nos dados fornecidos ou ausência de provas mínimas de enraizamento social/laboral. | **Encaminhamento para auditoria manual detalhada** pelos agentes do IRCC (sem amparo automático). |

### 3.2. Mesa de Verificação Humana (Foco Nível 2)
A IA consolida e apresenta ao oficial um **Resumo Executivo** estruturado em 4 pilares:
- **Vínculo Comunitário:** Cartas de recomendação, associações de bairro e voluntariado.
- **Tempo no Canadá:** Comprovantes de residência contínua e declarações fiscais CRA (*T4/NOA*).
- **Histórico Profissional NOC:** Experiência formal nos setores prioritários (NOC 75110, 65310, 75119).
- **Filhos na Escola:** Matrícula e frequência escolar ativa (ex: *Toronto District School Board*).

### 3.3. Carteira de Direitos do Amparo Provisório (Visão do Imigrante)
Ao ser deferido o amparo (Stage 1), o imigrante tem acesso a uma carteira digital com selo **ATIVO**:
1. **Permissão de Trabalho por Proficiência (NOC):** *Open Work Permit* liberado para exercer atividade profissional formal.
2. **Direito de Residência Temporária:** Proteção legal contra ordens de remoção (*Stay of Removal*) até a decisão final.
3. **Acesso à Educação e Saúde:** Autorização para matrícula regular de dependentes e custeio de cobertura médica provincial.

---

## 🤖 4. Aplicação de Inteligência Artificial Contextualizada

A arquitetura de IA foi dimensionada para alta eficiência operacional e governança ética:

* **Limite Técnico de 150 Páginas por PDF:** Processos com mais de 300 páginas devem ser fracionados em volumes de até 150 páginas. Essa diretriz evita o truncamento de contexto na OpenAI API, dispensa bancos vetoriais pesados para triagem rápida e garante 100% de precisão na extração dos dados probatórios.
* **Agentes Especializados:**
  1. *Agente de Extração e Validação Documental:* OCR e leitura de formulários oficiais (IMM-5283), recibos de aluguel e certidões civis.
  2. *Agente de Cruzamento de Dados e Consistência:* Confronto automatizado entre os dados declarados e os documentos anexos.
  3. *Agente de Classificação e Triagem:* Ponderação das métricas de enraizamento e emissão da recomendação preliminar.
* **Governança, Ética e Human-in-the-Loop:** A IA não substitui a decisão jurídica do oficial do IRCC; ela atua como suporte à decisão rápida, oferecendo pareceres auditáveis e rastreabilidade total.

---

## 🌍 5. Alinhamento com os Objetivos de Desenvolvimento Sustentável (ODS da ONU)

| ODS da ONU | Descrição do Impacto Social | Indicadores de Sucesso |
| :--- | :--- | :--- |
| **ODS 10: Redução das Desigualdades** | Promove a inclusão social e jurídica de migrantes em situação de vulnerabilidade ou status precário. | Redução do tempo em limbo jurídico (de 36 para menos de 1 mês no Stage 1) e maior regularização de famílias integradas. |
| **ODS 8: Trabalho Decente e Crescimento Econômico** | Garante autorização formal de trabalho (*Open Work Permit*) em setores com carência de mão de obra. | Aumento da inserção no mercado formal em ocupações NOC prioritárias e arrecadação tributária via CRA. |
| **ODS 11: Cidades e Comunidades Sustentáveis** | Fortalece a integração comunitária, reduz a marginalização urbana e traz segurança para bairros locais. | Engajamento comprovado por cartas de apoio comunitário e estabilidade de moradia. |
| **ODS 3 & ODS 4: Saúde, Bem-Estar e Educação de Qualidade** | Assegura matrícula escolar imediata e cobertura de saúde para crianças e dependentes. | 100% de dependentes em idade escolar matriculados e redução da sobrecarga emergencial em saúde pública. |
| **Eficiência da Gestão Pública (IRCC)** | Automação inteligente da leitura documental com SLA de segundos por volume. | Redução drástica do acervo pendente e alocação do tempo do oficial em casos de alta complexidade. |

---

## 💻 6. Stack Tecnológica e Design System

- **Framework Web:** [Next.js 16.4](https://nextjs.org/) (App Router, React Server Components)
- **Biblioteca Base:** [React 19.2](https://react.dev/) + [TypeScript 5.7](https://www.typescriptlang.org/)
- **Estilização e Design System:** [Tailwind CSS v4](https://tailwindcss.com/) + [@base-ui/react](https://base-ui.com/) (shadcn/ui base-nova)
- **Animações Fluidas:** [Motion (`motion/react` v14)](https://motion.dev/) com integração oficial `motion-ai`
- **Tipografia:** Google Sans Regular
- **Suporte a Temas:** [next-themes](https://github.com/pacocoursey/next-themes) (Modo Claro `#F1EEED` / `#6B1F33` e Modo Escuro `#262626` / `#33131D`)
- **Ícones:** [lucide-react](https://lucide.dev/)

---

## 🚀 7. Instalação e Execução Local

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18+ (recomendado 20 ou superior)
- npm ou pnpm

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/WingCODING/h-cWarranty.git
   cd h-cWarranty
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   * No Windows (atalho direto sem bloqueio de PowerShell):
     ```powershell
     .\dev.bat
     ```
   * Ou via npm:
     ```bash
     npm run dev
     ```

4. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000)

### Comandos Úteis
* **Verificação de Tipos TypeScript:**
  ```bash
  npx tsc --noEmit
  ```
* **Build de Produção:**
  ```bash
  npm run build
  ```
* **Iniciar Servidor de Produção:**
  ```bash
  npm start
  ```

---

## 👥 Equipe & Projeto Acadêmico

* **Instituição:** FIAP — Faculdade de Informática e Administração Paulista
* **Desafio:** FIAP Global Solution 2026
* **Projeto:** H&C Warranty (Citizen Tech para Triagem Imigratória IRCC)

---

<div align="center">
Desenvolvido com foco em impacto social, transparência governamental e inteligência artificial aplicada.
</div>
