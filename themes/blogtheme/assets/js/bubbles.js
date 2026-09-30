function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function lerp(start, end, t) {
  return start + t * (end - start);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Bubble {
  constructor(parent) {
    this.parent = parent;

    this.element = document.createElement("div");
    this.element.className = "bubble";

    this.parent.appendChild(this.element);
  }

  async loop() {
    while (true) {
      const width = this.parent.clientWidth;
      const height = this.parent.clientHeight;

      const x1 = randint(50, Math.max(50, width - 100));
      const y1 = randint(50, Math.max(50, height));

      const x2 = x1 + randint(-150, 150);
      const y2 = y1 - randint(200, 500);

      const steps = randint(800, 900);
      const delay = randint(10, 15);

      for (let i = 0; i < steps; i++) {
        const progress = i / steps;

        const x = lerp(x1, x2, progress);
        const y = lerp(y1, y2, progress);

        const size = Math.sin(progress * Math.PI) * 100;

        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;

        await sleep(delay);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const background = document.querySelector(".aero-background");

  if (!background) {
    return;
  }

  for (let i = 0; i < 10; i++) {
    const bubble = new Bubble(background);
    bubble.loop();
  }
});