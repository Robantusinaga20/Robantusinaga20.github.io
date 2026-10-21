(function () {
  var sections = document.querySelectorAll('main section');

  // 1. Bagian muncul pelan saat di-scroll
  if ('IntersectionObserver' in window) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          reveal.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach(function (s) { reveal.observe(s); });
  } else {
    sections.forEach(function (s) { s.classList.add('in'); });
  }

  // 2. Menandai menu sesuai bagian yang sedang dibaca
  var links = document.querySelectorAll('.top nav a[href^="#"]:not(.cv)');
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('active'); });
        if (byId[e.target.id]) byId[e.target.id].classList.add('active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();