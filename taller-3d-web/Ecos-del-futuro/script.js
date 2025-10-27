// Cambiar de sección con botones
const buttons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    sections.forEach(sec => {
      sec.classList.toggle("active", sec.id === target);
    });
  });
});

// Efecto inicial
window.addEventListener("load", () => {
  document.body.style.opacity = 1;
});
