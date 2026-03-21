const eushWord = document.getElementById("eushWord");
const eushShadow = document.getElementById("eushShadow");

const fonts = [
  '"Unbounded", sans-serif',
  '"Roboto Serif", serif',
  '"Exo 2", sans-serif',
  '"Oswald", sans-serif',
  '"Literata", serif',
  '"Rubik", sans-serif',
  '"Alegreya", serif',
  '"Manrope", sans-serif'
];

let fontIndex = 0;
let isAnimating = false;

const wrapLetters = node => {
  if (!node) return [];

  const text = node.textContent.trim();
  node.textContent = "";

  return [...text].map((char, index) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = char;
    span.style.transitionDelay = `${index * 70}ms`;
    node.appendChild(span);
    return span;
  });
};

const wordLetters = wrapLetters(eushWord);
const shadowLetters = wrapLetters(eushShadow);

const animateLetters = (letters, phase) => {
  letters.forEach((letter, index) => {
    const direction = index % 2 === 0 ? -1 : 1;

    if (phase === "out") {
      letter.style.opacity = "0.62";
      letter.style.filter = "blur(0.8px)";
      letter.style.transform = `translateY(${2 + index * 0.7}px) rotate(${direction * 1.5}deg) scale(0.992)`;
      return;
    }

    letter.style.opacity = "1";
    letter.style.filter = "blur(0)";
    letter.style.transform = "translateY(0) rotate(0deg) scale(1)";
  });
};

window.setInterval(() => {
  if (isAnimating) return;
  isAnimating = true;
  fontIndex = (fontIndex + 1) % fonts.length;

  eushWord.style.opacity = "0.96";
  eushWord.style.letterSpacing = "0.025em";
  eushWord.style.filter = "blur(0.15px)";
  animateLetters(wordLetters, "out");

  if (eushShadow) {
    eushShadow.style.opacity = "0.84";
    eushShadow.style.letterSpacing = "0.025em";
    eushShadow.style.filter = "blur(0.5px)";
    animateLetters(shadowLetters, "out");
  }

  window.setTimeout(() => {
    eushWord.style.fontFamily = fonts[fontIndex];
    eushWord.style.opacity = "1";
    eushWord.style.letterSpacing = "0.01em";
    eushWord.style.filter = "blur(0)";
    animateLetters(wordLetters, "in");

    if (eushShadow) {
      eushShadow.style.fontFamily = fonts[fontIndex];
      eushShadow.style.opacity = "1";
      eushShadow.style.letterSpacing = "0.01em";
      eushShadow.style.filter = "blur(0)";
      animateLetters(shadowLetters, "in");
    }
  }, 420);

  window.setTimeout(() => {
    isAnimating = false;
  }, 1200);
}, 3000);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach(node => observer.observe(node));

const heroPanel = document.querySelector(".hero-panel");
const heroLine = document.querySelector(".hero-line");
const heroMark = document.querySelector(".hero-mark");
const heroTags = document.querySelector(".hero-tags");

if (heroPanel && heroMark && heroTags) {
  heroPanel.insertBefore(heroTags, heroMark);
}

if (heroLine) {
  heroLine.remove();
}
