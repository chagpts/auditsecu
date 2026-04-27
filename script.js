const root = document.documentElement;

// 1. 마우스 위치에 따른 배경 그라디언트 효과
window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--x", event.clientX + "px");
  root.style.setProperty("--y", event.clientY + "px");
});

// 2. 스크롤 시 카드 등장 효과 (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".card").forEach((card) => {
  revealObserver.observe(card);
});

// 3. 숫자 카운트업 애니메이션
const counted = new WeakSet();

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || counted.has(entry.target)) return;

    counted.add(entry.target);

    const target = Number(entry.target.dataset.target);
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Cubic Ease Out
      entry.target.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        entry.target.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
}, { threshold: 0.5 });

document.querySelectorAll(".count").forEach((count) => {
  countObserver.observe(count);
});
