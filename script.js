// Mobile navigation, active section link, email copy, and current year.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window && sections.length && navItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => observer.observe(section));
}

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const copyButton = document.getElementById("copyEmail");
const copyFeedback = document.getElementById("copyFeedback");
const emailAddress = "senojhonmrk21@gmail.com";

if (copyButton && copyFeedback) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      copyFeedback.textContent = "Email address copied!";
    } catch {
      copyFeedback.textContent = `Email: ${emailAddress}`;
    }
  });
}

// Scroll-reveal transitions with staggered groups.
document.querySelectorAll("[data-reveal-group]").forEach((group) => {
  group.querySelectorAll("[data-reveal]").forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${index * 90}ms`);
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (revealItems.length) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}

// Running highlight: scroll progress bar.
const scrollProgress = document.getElementById("scrollProgress");
if (scrollProgress) {
  const updateScrollProgress = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? doc.scrollTop / max : 0;
    scrollProgress.style.transform = `scaleX(${ratio})`;
  };

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);
}

// Faded transition when navigating between sections.
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target || prefersReducedMotion) return;

    event.preventDefault();
    if (document.body.classList.contains("is-fading")) return;

    document.body.classList.add("is-fading");
    window.setTimeout(() => {
      target.scrollIntoView({ block: "start" });
      window.requestAnimationFrame(() => {
        document.body.classList.remove("is-fading");
      });
    }, 320);
  });
});
