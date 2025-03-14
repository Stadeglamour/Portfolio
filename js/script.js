(function() {
    "use strict";
  
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
  
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
  
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
  
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
  
    const scrollto = (el) => {
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos,
        behavior: 'smooth'
      })
    }
  
  
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    on('click', '.mobile-nav-toggle', function(e) {
      select('body').classList.toggle('mobile-nav-active')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
  
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let body = select('body')
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
  
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
  
    const typed = select('.typed')
    if (typed) {
      let typed_strings = typed.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  
  
    let skilsContent = select('.skills-content');
    if (skilsContent) {
      new Waypoint({
        element: skilsContent,
        offset: '80%',
        handler: function(direction) {
          let progress = select('.progress .progress-bar', true);
          progress.forEach((el) => {
            el.style.width = el.getAttribute('aria-valuenow') + '%'
          });
        }
      })
    }
  
  
    window.addEventListener('load', () => {
      let portfolioContainers = document.querySelectorAll('.portfolio-container'); // Sélectionnez toutes les sections avec la classe 'portfolio-container'
      portfolioContainers.forEach((portfolioContainer, index) => {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        });
  
        let portfolioFilters = document.querySelectorAll(`#portfolio-flters-${index + 1} li`); // Utilisez l'index pour sélectionner les filtres de chaque section
  
        portfolioFilters.forEach((filter, filterIndex) => {
          filter.addEventListener('click', (e) => {
            e.preventDefault();
            portfolioFilters.forEach((el) => {
              el.classList.remove('filter-active');
            });
            filter.classList.add('filter-active');
  
            portfolioIsotope.arrange({
              filter: filter.getAttribute('data-filter')
            });
            portfolioIsotope.on('arrangeComplete', function() {
              AOS.refresh();
            });
          });
        });
      });
    });
  
  
  
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });
  
  
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  
  
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
  
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  
  
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
  
    new PureCounter();
  
  })()
/*--------------------------------------------------------------
  # projet
  --------------------------------------------------------------*/
// Fonction pour afficher l'image en grand
function showImage(imageSrc) {
  let modal = document.getElementById("imageModal"); 
  let modalImg = document.getElementById("modalImg");

  modalImg.src = imageSrc; // Met l'image correcte
  modal.style.display = "flex"; // Affiche la modale
}

// Fonction pour fermer l'image
function closeImage() {
  document.getElementById("imageModal").style.display = "none"; // Cache la modale
}

function showTitle(element) {
  let title = element.querySelector('.hover-title');
  title.classList.add('show');
}

function hideTitle(element) {
  let title = element.querySelector('.hover-title');
  title.classList.remove('show');
}
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("#portfolio-flters-3 li");  // Boutons de filtrage
  const portfolioItems = document.querySelectorAll(".portfolio-item"); // Les éléments de portfolio

  filterButtons.forEach(button => {
      button.addEventListener("click", function () {
          // Enlever la classe active de tous les boutons
          filterButtons.forEach(btn => btn.classList.remove("filter-active"));

          // Ajouter la classe active au bouton sélectionné
          this.classList.add("filter-active");

          const filter = this.getAttribute("data-filter"); // Récupère le filtre de l'élément cliqué

          portfolioItems.forEach(item => {
              // Si l'élément correspond au filtre ou si le filtre est "*", affiche l'élément
              if (filter === "*" || item.classList.contains(filter.substring(1))) {
                  item.style.display = "block"; // Affiche
              } else {
                  item.style.display = "none"; // Cache
              }
          });
      });
  });

  // En cliquant sur "Tous" par défaut, cela affiche tous les projets
  document.querySelector('[data-filter="*"]').click();
});

