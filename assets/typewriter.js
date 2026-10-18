// Digita os [data-typewriter] de um slide em sequência como num terminal, com cursor piscando.
// Depois de uma pausa apaga tudo (de trás para frente) e recomeça. Só o slide ativo anima.
// Com data-typewriter="once" o texto é digitado uma vez e permanece na tela.
const TYPE_DELAY_MS = 80;
const ERASE_DELAY_MS = 35;
const START_DELAY_MS = 600;
const HOLD_MS = 3500;
const RESTART_MS = 800;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function prepare(el) {
  const prompt = el.querySelector(".prompt");
  const text = el.textContent.replace(prompt ? prompt.textContent : "", "").trim();

  const typed = document.createElement("span");
  const rest = document.createElement("span"); // mantém o espaço do texto para o layout não pular
  rest.style.visibility = "hidden";
  rest.textContent = text;

  el.setAttribute("aria-label", text);
  el.replaceChildren(...(prompt ? [prompt, " "] : []), typed, rest);
  return { typed, rest, text, once: el.dataset.typewriter === "once" };
}

function show(line, length) {
  line.typed.textContent = line.text.slice(0, length);
  line.rest.textContent = line.text.slice(length);
}

const SLIDE_STATES = ["is-typing", "is-revealed"];

const cursor = document.createElement("span");
cursor.className = "cursor";
cursor.setAttribute("aria-hidden", "true");

let run = 0; // identifica a execução vigente; trocar de slide invalida a anterior

async function loop(lines, slide) {
  const id = ++run;
  const alive = () => id === run;
  const once = lines.every((line) => line.once);

  // Em "once", o resto do slide só aparece depois que a digitação termina (classes is-typing/is-revealed).
  slide.classList.remove(...SLIDE_STATES);
  if (once) slide.classList.add("is-typing");
  lines.forEach((line) => show(line, 0));
  await sleep(START_DELAY_MS);
  while (alive()) {
    for (const line of lines) {
      line.typed.after(cursor);
      for (let i = 1; i <= line.text.length && alive(); i++) {
        show(line, i);
        await sleep(TYPE_DELAY_MS);
      }
    }
    if (once) {
      if (alive()) slide.classList.replace("is-typing", "is-revealed");
      return;
    }
    await sleep(HOLD_MS);
    for (const line of [...lines].reverse()) {
      line.typed.after(cursor);
      for (let i = line.text.length - 1; i >= 0 && alive(); i--) {
        show(line, i);
        await sleep(ERASE_DELAY_MS);
      }
    }
    await sleep(RESTART_MS);
  }
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const groups = new Map();
  document.querySelectorAll(".slide").forEach((slide) => {
    const els = slide.querySelectorAll("[data-typewriter]");
    if (els.length) groups.set(slide, [...els].map(prepare));
  });

  const start = (slide) => {
    const lines = groups.get(slide);
    if (lines) loop(lines, slide);
    else run++; // slide sem digitação: cancela a animação anterior
  };

  document.addEventListener("slidechange", (event) => start(event.detail.slide));
  start(document.querySelector(".slide.is-active"));
}
