# AmparoCA — H&C FastTrack (IRCC GovTech SaaS)

Interface de aplicação web Desktop (SaaS / GovTech) para o **AmparoCA — H&C FastTrack**, um sistema de triagem imigratória Humanitária e Compaixão (H&C) do Canadá com Inteligência Artificial.

## Arquitetura da Interface (3 Seções)

1. **Seção 1: Mesa de Triagem do Agente e Upload de Dossiê (IA)**
   - Barra superior com logo `AmparoCA | IRCC FastTrack`, seletor de idioma (`PT`/`EN`/`FR`) e perfil do Agente de Imigração.
   - Grid de duas colunas:
     - **Esquerda**: Formulário com `Número da Aplicação IRCC`, `Nome do Imigrante`, dropdown de `Ocupação NOC (Construção Civil, Limpeza, Serviços Gerais)` e `Número de Dependentes`, área Drag-and-Drop tracejada para `Anexar Dossiê H&C em PDF` com barra de progresso `Volume_1_HC.pdf (142/150 páginas - Validado)` e botão primário azul `Executar Triagem via OpenAI API`.
     - **Direita**: Card de aviso técnico em destaque amarelo/azul (`Limite Técnico da API: Máximo de 150 Páginas por PDF`).
2. **Seção 2: Painel de Diagnóstico da IA (3 Níveis) e Verificação Rápida Humana**
   - 3 cards de status lado a lado (Nível 1 Verde, Nível 2 Amarelo, Nível 3 Vermelho).
   - Painel `Mesa de Verificação Rápida do Agente (Foco Nível 2)` com `Resumo Executivo Gerado pela IA` (vínculo comunitário, tempo no Canadá, histórico profissional NOC e filhos na escola) e os botões `Aprovar Amparo Provisório (1ª Parte)` e `Negar Amparo Preliminar e Enviar para Fila Geral`.
3. **Seção 3: Portal do Imigrante — Carteira de Direitos Provisórios Concedidos**
   - Banner verde de sucesso confirmando o Amparo Provisório Ativo.
   - Grid com os 3 cards de benefícios liberados com selo `ATIVO`:
     - `Permissão de Trabalho por Proficiência (NOC)`
     - `Direito de Residência Temporária`
     - `Acesso à Educação e Saúde (Pagos)`

## Como executar

```bash
npm install
npm run dev
```
