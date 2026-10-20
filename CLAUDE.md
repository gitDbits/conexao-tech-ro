# Apresentação: Do Caos ao Pipeline (Conexão Tech.RO)

Este repositório guarda a apresentação da oficina descrita no `README.md`. As regras abaixo valem para todo o material criado aqui.

## Regras

1. **Estilo visual:** estilo retrô 8-bit baseado no [NES.css](https://nostalgic-css.github.io/NES.css/), sempre em **modo escuro** (variantes `is-dark` e fundo escuro).
2. **Conteúdo prático:** a apresentação segue o **fluxo real** da equipe de desenvolvimento da Gerência de Estudos e Análises Socioeconômicas da SEPOG. Não trazer apenas conceitos: mostrar como cada etapa é aplicada na prática (exemplos, telas, artefatos reais).
3. **Paleta:** cyberpunk, com neons sobre noite roxa. Usar sempre as variáveis CSS de `assets/style.css`, sem cores soltas. Ver a seção "Paleta de cores" abaixo.
4. **Tempo disponível:** 04/11/2026, das 19:00 às 21:45 (2h45). O conteúdo, as pausas e a demonstração ao vivo devem caber nessa janela.
5. **Idioma:** português do Brasil.

## Paleta de cores

| Variável | Cor | Uso |
|---|---|---|
| `--bg` | `#150f26` | fundo da página e dos containers |
| `--surface` | `#2b2957` | superfícies e brilho do gradiente de fundo |
| `--fg` | `#e8e6ff` | texto principal |
| `--muted` | `#a79bd6` | texto secundário |
| `--accent` | `#22e5ff` | destaque principal (neon ciano), títulos |
| `--pink` | `#ff2e97` | prompt `>` e brilho dos containers |
| `--green` | `#39ff88` | cursor e verde de terminal |
| `--orange` | `#ff6a3d` | alertas e letreiros |
| `--purple` | `#9b4dff` | brilho secundário |
| `--skin` | `#ffcf9f` | pele dos sprites pixel art dos players |
| `--gold` | `#ffd23f` | coroas e detalhes dos sprites dos players |

Diretrizes:
- Destaques levam brilho neon (`text-shadow` ou `drop-shadow`) na cor do próprio elemento.
- Fonte: Press Start 2P, com NES.css em modo escuro (`is-dark`).
- Qualquer cor nova entra primeiro como variável em `:root` e nesta tabela.

## Pendente (o usuário vai detalhar)

- Roteiro e estrutura da apresentação.
- Origem das referências de pipeline (de onde extrair os exemplos reais).
