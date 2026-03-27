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

document.querySelectorAll(".reveal").forEach((node, index) => {
  node.style.transitionDelay = `${Math.min((index % 6) * 55, 275)}ms`;
  observer.observe(node);
});

const heroLine = document.querySelector(".hero-line");
if (heroLine) {
  heroLine.remove();
}

const marqueeWrappers = document.querySelectorAll(".hero-tags");

function setupMarquee(wrapper) {
  const marquee = wrapper.querySelector(".hero-tags-marquee");
  const seedTrack = marquee?.querySelector(".hero-tags-track");

  if (!marquee || !seedTrack) {
    return;
  }

  const seedItems = Array.from(seedTrack.children).map(node => node.cloneNode(true));

  const rebuild = () => {
    const gapValue = parseFloat(getComputedStyle(wrapper).getPropertyValue("--marquee-gap")) || 12;

    marquee.innerHTML = "";

    const baseTrack = document.createElement("div");
    baseTrack.className = "hero-tags-track";
    seedItems.forEach(item => baseTrack.appendChild(item.cloneNode(true)));
    marquee.appendChild(baseTrack);

    const baseWidth = Math.ceil(baseTrack.getBoundingClientRect().width);
    const containerWidth = Math.ceil(wrapper.getBoundingClientRect().width);

    if (!baseWidth || !containerWidth) {
      return;
    }

    const copiesNeeded = Math.max(3, Math.ceil((containerWidth * 2) / (baseWidth + gapValue)) + 1);

    for (let index = 1; index < copiesNeeded; index += 1) {
      marquee.appendChild(baseTrack.cloneNode(true));
    }

    const travel = baseWidth + gapValue;
    const duration = Math.max(14, Math.round(travel / 42));

    wrapper.style.setProperty("--marquee-distance", `${travel}px`);
    wrapper.style.setProperty("--marquee-duration", `${duration}s`);
  };

  rebuild();

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(rebuild);
    });
    resizeObserver.observe(wrapper);
  } else {
    window.addEventListener("resize", rebuild);
  }
}

marqueeWrappers.forEach(setupMarquee);
