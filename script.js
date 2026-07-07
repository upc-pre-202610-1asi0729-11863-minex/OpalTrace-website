// Mobile menu
const menuToggle = document.getElementById("menu-toggle");
const menuClose  = document.getElementById("menu-close");
const navLinks   = document.getElementById("nav-links");

function openMenu() {
  if (!navLinks) return;
  navLinks.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (!navLinks) return;
  navLinks.classList.remove("open");
  document.body.style.overflow = "";
}

if (menuToggle) menuToggle.addEventListener("click", openMenu);
if (menuClose)  menuClose.addEventListener("click", closeMenu);

// Close when clicking a nav link (but NOT a select element)
if (navLinks) {
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!link.closest(".nav-mobile-bottom .social-icon") || link.getAttribute("href") !== "#") {
        closeMenu();
      }
    });
  });
}

// Hero carousel
const heroTrack     = document.getElementById("hero-track");
const heroArrowNext = document.getElementById("hero-arrow");
const heroArrowPrev = document.getElementById("hero-arrow-prev");
const heroDots      = document.querySelectorAll("#hero-dots .hero-dot");

if (heroTrack && heroArrowNext && heroArrowPrev && heroDots.length) {
  let heroIndex = 0;
  const heroSlideCount = heroDots.length;

  function goToHeroSlide(index) {
    heroIndex = (index + heroSlideCount) % heroSlideCount;
    heroTrack.style.transform = `translateX(-${heroIndex * (100 / heroSlideCount)}%)`;
    heroDots.forEach((dot, i) => dot.classList.toggle("active", i === heroIndex));
    heroArrowPrev.hidden = heroIndex === 0;
  }

  heroArrowNext.addEventListener("click", () => goToHeroSlide(heroIndex + 1));
  heroArrowPrev.addEventListener("click", () => goToHeroSlide(heroIndex - 1));
  heroDots.forEach((dot, i) => dot.addEventListener("click", () => goToHeroSlide(i)));

  goToHeroSlide(0);
}

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealElements.forEach((el) => revealObserver.observe(el));
