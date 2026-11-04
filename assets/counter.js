// Conta de zero até o valor de cada [data-count] quando o slide fica ativo.
// data-decimals define as casas decimais e data-suffix um sufixo (ex.: "+").
// Cada número começa quando a sua caixa aparece (--i do reveal); sai do slide, volta a zero.
const COUNT_MS = 2200;
const REVEAL_STEP_MS = 350;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

const format = (el, value) => {
  const decimals = Number(el.dataset.decimals) || 0;
  const text = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
  return text + (el.dataset.suffix || "");
};

const counters = [...document.querySelectorAll("[data-count]")].map((el) => ({ el, target: Number(el.dataset.count), frame: 0, timer: 0 }));

function stop(counter) {
  clearTimeout(counter.timer);
  cancelAnimationFrame(counter.frame);
}

function start(counter) {
  const { el, target } = counter;
  stop(counter);
  if (reduceMotion.matches) {
    el.textContent = format(el, target);
    return;
  }
  el.textContent = format(el, 0);
  const box = el.closest(".reveal");
  const delay = (Number(box?.style.getPropertyValue("--i")) || 0) * REVEAL_STEP_MS;
  counter.timer = setTimeout(() => {
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / COUNT_MS);
      el.textContent = format(el, target * (1 - Math.pow(1 - p, 3))); // desacelera no fim
      if (p < 1) counter.frame = requestAnimationFrame(tick);
    };
    counter.frame = requestAnimationFrame(tick);
  }, delay);
}

document.addEventListener("slidechange", (event) => {
  counters.forEach((counter) => {
    if (event.detail.slide.contains(counter.el)) start(counter);
    else {
      stop(counter);
      counter.el.textContent = format(counter.el, 0);
    }
  });
});

// A página pode abrir direto neste slide (#número), antes de o listener existir
const active = document.querySelector(".slide.is-active");
if (active) counters.forEach((counter) => active.contains(counter.el) && start(counter));
