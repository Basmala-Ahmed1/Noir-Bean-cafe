import { animate, spring } from "motion";
import { createIcons, icons } from "lucide";

// Initialize Lucide Icons
createIcons({ icons });

// Custom Cursor Logic
const cursorOuter = document.getElementById('cursor-outer');
const cursorInner = document.getElementById('cursor-inner');

if (cursorOuter && cursorInner) {
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    // Smooth outer cursor with spring physics
    animate(cursorOuter, {
      x: clientX - 16,
      y: clientY - 16
    }, {
      type: "spring",
      damping: 30,
      stiffness: 200,
      mass: 0.5
    });

    // Faster inner cursor
    animate(cursorInner, {
      x: clientX - 2,
      y: clientY - 2
    }, {
      type: "spring",
      damping: 20,
      stiffness: 400,
      mass: 0.1
    });
  });
}

// Reveal Animations on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0', 'translate-y-10', 'translate-y-8', 'translate-y-5', '-translate-x-12', 'translate-x-12');
      entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Hero and Navbar Entrance
window.addEventListener('load', () => {
  const navbar = document.getElementById('navbar');
  const heroContent = document.getElementById('hero-content');

  if (navbar) {
    navbar.classList.remove('opacity-0', '-translate-y-full');
    navbar.classList.add('opacity-100', 'translate-y-0');
  }

  if (heroContent) {
    heroContent.classList.remove('opacity-0', 'translate-y-[30px]');
    heroContent.classList.add('opacity-100', 'translate-y-0');
  }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
