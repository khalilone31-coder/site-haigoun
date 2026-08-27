// HAIGOUN — comportements partagés du site
document.addEventListener('DOMContentLoaded', function () {

  // --- Menu mobile ---
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // --- Reveal au scroll ---
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // --- Filtres catalogue ---
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var target = btn.getAttribute('data-target');
        if (target === 'all') {
          document.querySelectorAll('.cat-section').forEach(function (s) { s.style.display = ''; });
        } else {
          document.querySelectorAll('.cat-section').forEach(function (s) {
            s.style.display = (s.id === target) ? '' : 'none';
          });
          var el = document.getElementById(target);
          if (el) { window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }
        }
      });
    });
  }

  // --- Formulaire de contact (statique -> mailto) ---
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var phone = document.getElementById('cf-phone').value.trim();
      var subject = document.getElementById('cf-subject').value;
      var message = document.getElementById('cf-message').value.trim();
      var body = 'Nom: ' + name + '%0D%0ATéléphone: ' + phone + '%0D%0ASujet: ' + subject + '%0D%0A%0D%0A' + encodeURIComponent(message);
      window.location.href = 'mailto:khalilone31@gmail.com?subject=' + encodeURIComponent('Demande de devis — ' + subject) + '&body=' + body;
    });
  }

  // --- Année du footer ---
  document.querySelectorAll('.year-now').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
