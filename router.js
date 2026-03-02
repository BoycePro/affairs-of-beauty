// Simple Client-Side Router for Affairs of Beauty
(function() {
  'use strict';

  const Router = {
    routes: {
      '/': 'home',
      '/services': 'services',
      '/about': 'about',
      '/gallery': 'gallery',
      '/team': 'team',
      '/testimonials': 'testimonials',
      '/contact': 'contact'
    },

    currentRoute: null,

    init() {
      // Handle initial page load
      this.handleRoute();

      // Listen for browser back/forward
      window.addEventListener('popstate', () => {
        this.handleRoute();
      });

      // Intercept all navigation
      this.interceptLinks();
    },

    handleRoute() {
      const path = window.location.pathname;
      const route = this.routes[path];

      if (!route) {
        // 404 - redirect to home
        this.navigate('/', false);
        return;
      }

      this.currentRoute = route;
      this.showSection(route);
      this.updateNav();
      this.updateMetaTags(route);
      
      // Scroll to top
      window.scrollTo(0, 0);
    },

    navigate(path, pushState = true) {
      if (pushState) {
        window.history.pushState({}, '', path);
      } else {
        window.history.replaceState({}, '', path);
      }
      this.handleRoute();
    },

    showSection(section) {
      const allSections = document.querySelectorAll('[data-page]');

      if (section === 'home') {
        // Homepage: show every section for the full scrolling storytelling experience
        allSections.forEach(el => {
          el.style.display = 'block';
          el.setAttribute('aria-hidden', 'false');
        });
      } else {
        // Sub-page: hide everything, then show only the requested section (no hero)
        allSections.forEach(el => {
          el.style.display = 'none';
          el.setAttribute('aria-hidden', 'true');
        });

        const targetSection = document.querySelector(`[data-page="${section}"]`);
        if (targetSection) {
          targetSection.style.display = 'block';
          targetSection.setAttribute('aria-hidden', 'false');
        }
      }

      // Footer is always visible
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = 'block';
      }
    },

    updateNav() {
      // Update active state on nav links
      const navLinks = document.querySelectorAll('[data-nav-link]');
      navLinks.forEach(link => {
        const route = link.getAttribute('data-nav-link');
        if (route === this.currentRoute) {
          link.classList.add('active-route');
        } else {
          link.classList.remove('active-route');
        }
      });
    },

    updateMetaTags(route) {
      const metaData = {
        home: {
          title: 'Affairs of Beauty | Wig Styling, Braiding, Haircuts & Nails in Florida',
          description: 'Affairs of Beauty — Florida\'s premier beauty destination for custom wig styling, braiding, precision haircuts, and nail services. Where elegance meets expertise. Book your appointment today!'
        },
        services: {
          title: 'Our Services | Affairs of Beauty',
          description: 'Experience transformative beauty services including custom wig styling, professional braiding, precision haircuts, and luxurious nail artistry. Expert care by certified professionals.'
        },
        about: {
          title: 'About Us | Affairs of Beauty',
          description: 'Founded in 2016, Affairs of Beauty is Florida\'s premier destination for transformative beauty services. Learn about our mission to help every woman feel confident and beautiful.'
        },
        gallery: {
          title: 'Style Gallery | Affairs of Beauty',
          description: 'Browse our portfolio of stunning hair and beauty transformations. Find inspiration for your next look from our expert stylists.'
        },
        team: {
          title: 'Our Team | Affairs of Beauty',
          description: 'Meet our passionate team of certified beauty professionals with years of expertise in wig styling, braiding, haircuts, and nail services.'
        },
        testimonials: {
          title: 'Client Testimonials | Affairs of Beauty',
          description: 'See what our clients are saying about Affairs of Beauty. Real reviews from real clients who love our wig styling, braiding, haircuts, and nail services.'
        },
        contact: {
          title: 'Contact Us | Affairs of Beauty',
          description: 'Get in touch with Affairs of Beauty. Book your appointment or send us a message. We\'re here to help you achieve your beauty goals.'
        }
      };

      const meta = metaData[route] || metaData.home;
      
      // Update title
      document.title = meta.title;
      
      // Update meta description
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', meta.description);
      }

      // Update OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', meta.title);
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', meta.description);
      }

      // Update canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        const baseUrl = canonical.getAttribute('href').replace(/\/$/, '');
        const path = Object.keys(this.routes).find(key => this.routes[key] === route);
        canonical.setAttribute('href', baseUrl + path);
      }
    },

    interceptLinks() {
      // scrollToSection: scroll in-place on the homepage, navigate on sub-pages
      window.scrollToSection = (section) => {
        if (this.currentRoute === 'home') {
          const el = document.getElementById(section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          const path = section === 'hero' ? '/' : `/${section}`;
          this.navigate(path);
        }
      };

      // Add click handlers to nav links
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="/"]');
        if (link && link.hostname === window.location.hostname) {
          e.preventDefault();
          this.navigate(link.pathname);
        }
      });
    }
  };

  // Initialize router when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Router.init());
  } else {
    Router.init();
  }

  // Export for testing
  window.Router = Router;
})();
