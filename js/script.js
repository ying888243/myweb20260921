document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar');
  const links = document.querySelectorAll('.nav-link');
  const navMenu = document.querySelector('#mainNav');
  const collapse = bootstrap.Collapse.getOrCreateInstance(navMenu, { toggle: false });

  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && navMenu.classList.contains('show')) collapse.hide();
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const sections = document.querySelectorAll('main section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
});
