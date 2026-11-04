// Navegação entre slides: setas, PageUp/PageDown, espaço, Home/End e #número na URL.
// No slide com vídeo, o espaço toca/pausa e as setas continuam navegando.
// No celular: deslize para os lados ou use os botões; o layout é o de desktop reduzido (viewport 1280).
// Celular: o layout é pensado para telas grandes. Em paisagem, a viewport vira "900 px de altura × largura
// proporcional à tela" e o navegador reduz tudo para caber; em pé, mostra só o pedido para girar o aparelho.
const LAYOUT_HEIGHT = 900;
const viewportMeta = document.querySelector('meta[name="viewport"]');
function fitViewport() {
  if (!matchMedia("(pointer: coarse)").matches) return;
  const long = Math.max(screen.width, screen.height);
  const short = Math.min(screen.width, screen.height);
  const portrait = matchMedia("(orientation: portrait)").matches;
  viewportMeta.content = portrait ? "width=device-width, initial-scale=1" : `width=${Math.round((LAYOUT_HEIGHT * long) / short)}`;
}
fitViewport();
addEventListener("orientationchange", fitViewport);
addEventListener("resize", fitViewport);

const deck = document.querySelector(".deck");
const slides = [...deck.querySelectorAll(".slide")];
let current = 0;

function go(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
  slides.forEach((slide, i) => i !== current && slide.querySelectorAll("video").forEach((v) => v.pause()));
  history.replaceState(null, "", `#${current + 1}`);
  document.dispatchEvent(new CustomEvent("slidechange", { detail: { slide: slides[current] } }));
}

document.addEventListener("keydown", (event) => {
  const next = ["ArrowRight", "ArrowDown", "PageDown", " "];
  const video = slides[current].querySelector("video");
  if (video && event.key === " ") {
    video.paused ? video.play() : video.pause(); // no slide de vídeo o espaço toca/pausa
    event.preventDefault();
    return;
  }
  const prev = ["ArrowLeft", "ArrowUp", "PageUp"];
  if (next.includes(event.key)) go(current + 1);
  else if (prev.includes(event.key)) go(current - 1);
  else if (event.key === "Home") go(0);
  else if (event.key === "End") go(slides.length - 1);
  else if (event.key === "f") document.documentElement.requestFullscreen?.();
  else return;
  event.preventDefault();
});

// Celular e tablet: deslizar para os lados troca de slide; botões na tela como alternativa
let touch = null;
document.addEventListener("touchstart", (event) => {
  const t = event.touches[0];
  const ignore = event.target.closest("video, a, .deck__nav, input");
  touch = event.touches.length === 1 && !ignore ? { x: t.clientX, y: t.clientY } : null;
}, { passive: true });
document.addEventListener("touchend", (event) => {
  if (!touch) return;
  const t = event.changedTouches[0];
  const dx = t.clientX - touch.x;
  const dy = t.clientY - touch.y;
  touch = null;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(current + (dx < 0 ? 1 : -1));
}, { passive: true });

const nav = document.createElement("nav");
nav.className = "deck__nav";
nav.setAttribute("aria-label", "Navegação dos slides");
nav.innerHTML = '<button type="button" data-dir="-1" aria-label="Slide anterior">&lsaquo;</button><span class="deck__count"></span><button type="button" data-dir="1" aria-label="Próximo slide">&rsaquo;</button><p class="deck__rotate">Gire o celular para ver os slides</p>';
nav.addEventListener("click", (event) => {
  const dir = event.target.closest("button")?.dataset.dir;
  if (dir) go(current + Number(dir));
});
document.body.append(nav);
document.addEventListener("slidechange", () => {
  nav.querySelector(".deck__count").textContent = `${current + 1}/${slides.length}`;
});

deck.classList.add("is-ready");
go((parseInt(location.hash.slice(1), 10) || 1) - 1);
