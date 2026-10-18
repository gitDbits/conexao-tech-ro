// Digita os [data-typewriter] em sequência como num terminal, com cursor piscando.
// Depois de uma pausa apaga tudo (de trás para frente) e recomeça.
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
  return { typed, rest, text };
}

function show(line, length) {
  line.typed.textContent = line.text.slice(0, length);
  line.rest.textContent = line.text.slice(length);
}

async function loop(lines) {
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.setAttribute("aria-hidden", "true");

  await sleep(START_DELAY_MS);
  while (true) {
    for (const line of lines) {
      line.typed.after(cursor);
      for (let i = 1; i <= line.text.length; i++) {
        show(line, i);
        await sleep(TYPE_DELAY_MS);
      }
    }
    await sleep(HOLD_MS);
    for (const line of [...lines].reverse()) {
      line.typed.after(cursor);
      for (let i = line.text.length - 1; i >= 0; i--) {
        show(line, i);
        await sleep(ERASE_DELAY_MS);
      }
    }
    await sleep(RESTART_MS);
  }
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const lines = [...document.querySelectorAll("[data-typewriter]")].map(prepare);
  lines.forEach((line) => show(line, 0));
  loop(lines);
}
