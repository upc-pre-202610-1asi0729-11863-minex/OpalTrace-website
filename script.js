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
