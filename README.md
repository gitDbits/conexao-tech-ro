# Do Caos ao Pipeline: Desenvolvimento Guiado por IA em Produção

Material da oficina apresentada no **Conexão Tech.RO** pela Gerência de Estudos Analíticos (GEA), da Secretaria de Estado do Planejamento e Coordenação Geral (SEPOG) do Governo de Rondônia.

## Sobre a oficina

Toda equipe de desenvolvimento já viveu o mesmo caos: retrabalho, padrões inconsistentes, código que funciona mas ninguém sabe explicar por quê. A IA generativa prometia resolver isso, mas, sem processo, ela só acelera o caos.

Esta oficina apresenta o método que padronizou o uso de IA generativa no fluxo de desenvolvimento de software da equipe da GEA. Usando o Claude como assistente, aplicamos **SDD (Spec-Driven Development)** para transformar demandas em especificações, planos e tarefas rastreáveis antes de qualquer linha de código. O trabalho é dividido entre **agentes de IA especializados** e **skills personalizadas**, cada um com responsabilidade única, do mesmo jeito que se organiza um time.

O foco é o **método**, não um projeto específico. Ele é replicável para qualquer stack e qualquer equipe.

## O que será abordado

### Spec-Driven Development (SDD)
Demanda → especificação → plano → tarefas rastreáveis, tudo antes do código.

### Agentes especializados por camada
Cada parte do código nasce no padrão certo:

| Camada | Responsabilidade |
|---|---|
| Models | Um agente cuida só de models |
| Controllers | Um agente cuida só de controllers |
| Migrations | Um agente cuida só de migrations |
| Autorização | Um agente cuida só das regras de autorização |

### Agentes de UI
Componentes reutilizáveis, estilo e interatividade, mantendo a experiência visual consistente sem depender de frameworks JavaScript pesados, tudo dentro do padrão Ruby on Rails.

### Testes como parte do ciclo
Nenhuma entrega é considerada pronta sem passar por agentes e skills de teste, que geram testes unitários e de integração automaticamente. A cobertura existe desde o primeiro commit, não como etapa posterior.

### O ciclo completo
1. Criação e pontuação automatizada de cards no Jira
2. Implementação padronizada por agentes especializados (back-end, UI e testes)
3. Abertura e revisão de pull requests guiadas por IA

A oficina inclui **demonstração ao vivo**.

## Palestrante

**Diego Noronha** é engenheiro de software sênior e líder técnico de sistemas estratégicos do Governo de Rondônia. Professor, mentor e palestrante, atua em projetos nacionais e internacionais e tem mais de 10 anos de experiência em tecnologia e inteligência artificial.
