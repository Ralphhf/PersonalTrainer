// script.js

/* =====================
   Loader Fade Out
===================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 500);
});

/* =====================
   Navbar Scroll Shadow
===================== */
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =====================
   Mobile Menu Toggle
===================== */
const mobileToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      mobileToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

/* =====================
   Stats Counter
===================== */
const counters = document.querySelectorAll(".stat-number");
const speed = 200; // lower = faster

function runCounter(counter) {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = Math.ceil(target / speed);

    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
}

// Run counters when in view
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => {
  observer.observe(counter);
});

/* =====================
   Testimonials Slider
===================== */
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".testimonial-prev");
const nextBtn = document.querySelector(".testimonial-next");

let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });
}

if (prevBtn && nextBtn && testimonials.length > 0) {
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  });

  // Auto slide every 8s
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 8000);

  // Show first testimonial initially
  showTestimonial(currentIndex);
}

/* =====================
   Contact Form (Demo)
===================== */
const consultationForm = document.getElementById("consultationForm");

if (consultationForm) {
  consultationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Thank you! Your free consultation request has been received.");
    consultationForm.reset();
  });
}
