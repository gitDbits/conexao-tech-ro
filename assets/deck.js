// Navegação entre slides: setas, PageUp/PageDown, espaço, Home/End e #número na URL.
// No slide com vídeo, o espaço toca/pausa e as setas continuam navegando.
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

deck.classList.add("is-ready");
go((parseInt(location.hash.slice(1), 10) || 1) - 1);
