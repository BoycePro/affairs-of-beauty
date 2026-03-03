/**
 * Routing Tests for Affairs of Beauty
 * Tests client-side routing, navigation, and meta tags
 */

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Load HTML file
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const router = fs.readFileSync(path.join(__dirname, '../router.js'), 'utf8');
const main = fs.readFileSync(path.join(__dirname, '../assets/js/main.js'), 'utf8');

describe('Affairs of Beauty - Routing Tests', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, {
      url: 'http://localhost/',
      runScripts: 'outside-only'
    });
    window = dom.window;
    document = window.document;

    // Mock browser APIs not implemented by jsdom
    window.scrollTo = () => {};

    // Execute router in jsdom context
    window.eval(router);
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('Route Configuration', () => {
    test('should have all required routes defined', () => {
      const Router = window.Router;
      expect(Router.routes).toBeDefined();
      expect(Router.routes['/']).toBe('home');
      expect(Router.routes['/services']).toBe('services');
      expect(Router.routes['/about']).toBe('about');
      expect(Router.routes['/gallery']).toBe('gallery');
      expect(Router.routes['/team']).toBe('team');
      expect(Router.routes['/testimonials']).toBe('testimonials');
      expect(Router.routes['/contact']).toBe('contact');
    });
  });

  describe('Page Content', () => {
    test('each route should load unique content', (done) => {
      const Router = window.Router;
      const routes = ['/', '/services', '/about', '/gallery', '/team', '/testimonials', '/contact'];
      const contentSnapshots = {};

      routes.forEach((route, index) => {
        setTimeout(() => {
          Router.navigate(route, false);
          
          // Get visible content
          const visibleSections = document.querySelectorAll('[data-page]:not([style*="display: none"])');
          const content = Array.from(visibleSections)
            .map(el => el.textContent.trim().substring(0, 100))
            .join('|');
          
          contentSnapshots[route] = content;

          // On last iteration, verify all content is unique
          if (index === routes.length - 1) {
            const uniqueContent = new Set(Object.values(contentSnapshots));
            expect(uniqueContent.size).toBe(routes.length);
            done();
          }
        }, index * 100);
      });
    });

    test('home page should show hero and testimonials', () => {
      const Router = window.Router;
      Router.navigate('/', false);

      const hero = document.querySelector('[data-page="hero"]');
      const testimonials = document.querySelector('[data-page="testimonials"]');
      
      expect(hero.style.display).not.toBe('none');
      expect(testimonials.style.display).not.toBe('none');
    });

    test('services page should show services section only', () => {
      const Router = window.Router;
      Router.navigate('/services', false);

      const services = document.querySelector('[data-page="services"]');
      const hero = document.querySelector('[data-page="hero"]');
      
      expect(services.style.display).not.toBe('none');
      expect(hero.style.display).toBe('none');
    });

    test('about page should show about section only', () => {
      const Router = window.Router;
      Router.navigate('/about', false);

      const about = document.querySelector('[data-page="about"]');
      const services = document.querySelector('[data-page="services"]');
      
      expect(about.style.display).not.toBe('none');
      expect(services.style.display).toBe('none');
    });

    test('gallery page should show gallery section only', () => {
      const Router = window.Router;
      Router.navigate('/gallery', false);

      const gallery = document.querySelector('[data-page="gallery"]');
      const about = document.querySelector('[data-page="about"]');
      
      expect(gallery.style.display).not.toBe('none');
      expect(about.style.display).toBe('none');
    });

    test('team page should show team section only', () => {
      const Router = window.Router;
      Router.navigate('/team', false);

      const team = document.querySelector('[data-page="team"]');
      const gallery = document.querySelector('[data-page="gallery"]');
      
      expect(team.style.display).not.toBe('none');
      expect(gallery.style.display).toBe('none');
    });

    test('contact page should show contact section only', () => {
      const Router = window.Router;
      Router.navigate('/contact', false);

      const contact = document.querySelector('[data-page="contact"]');
      const team = document.querySelector('[data-page="team"]');
      
      expect(contact.style.display).not.toBe('none');
      expect(team.style.display).toBe('none');
    });
  });

  describe('Navigation', () => {
    test('navigation links should work correctly', (done) => {
      const servicesLink = document.querySelector('[data-nav-link="services"]');
      
      servicesLink.click();
      
      setTimeout(() => {
        expect(window.location.pathname).toBe('/services');
        const services = document.querySelector('[data-page="services"]');
        expect(services.style.display).not.toBe('none');
        done();
      }, 100);
    });

    test('clicking multiple links should navigate correctly', (done) => {
      const links = [
        document.querySelector('[data-nav-link="about"]'),
        document.querySelector('[data-nav-link="gallery"]'),
        document.querySelector('[data-nav-link="team"]')
      ];

      links[0].click();
      setTimeout(() => {
        expect(window.location.pathname).toBe('/about');
        
        links[1].click();
        setTimeout(() => {
          expect(window.location.pathname).toBe('/gallery');
          
          links[2].click();
          setTimeout(() => {
            expect(window.location.pathname).toBe('/team');
            done();
          }, 100);
        }, 100);
      }, 100);
    });

    test('logo should link to home', () => {
      const Router = window.Router;
      Router.navigate('/services', false);
      
      const logo = document.querySelector('[data-nav-link="home"]');
      logo.click();
      
      expect(window.location.pathname).toBe('/');
    });
  });

  describe('Browser History', () => {
    test('should update browser history on navigation', () => {
      const Router = window.Router;
      const initialHistoryLength = window.history.length;
      
      Router.navigate('/services');
      expect(window.history.length).toBeGreaterThan(initialHistoryLength);
    });

    test('should handle back button', (done) => {
      const Router = window.Router;
      
      Router.navigate('/services');
      Router.navigate('/about');
      
      setTimeout(() => {
        window.history.back();
        
        setTimeout(() => {
          expect(window.location.pathname).toBe('/services');
          done();
        }, 100);
      }, 100);
    });

    test('should handle forward button', (done) => {
      const Router = window.Router;
      
      Router.navigate('/services');
      Router.navigate('/about');
      
      setTimeout(() => {
        window.history.back();
        
        setTimeout(() => {
          window.history.forward();
          
          setTimeout(() => {
            expect(window.location.pathname).toBe('/about');
            done();
          }, 100);
        }, 100);
      }, 100);
    });
  });

  describe('Deep Linking', () => {
    test('should handle direct navigation to /services', () => {
      const newDom = new JSDOM(html, {
        url: 'http://localhost/services',
        runScripts: 'outside-only'
      });
      newDom.window.scrollTo = () => {};
      newDom.window.eval(router);

      const services = newDom.window.document.querySelector('[data-page="services"]');
      expect(services.style.display).not.toBe('none');
      newDom.window.close();
    });

    test('should handle direct navigation to /about', () => {
      const newDom = new JSDOM(html, {
        url: 'http://localhost/about',
        runScripts: 'outside-only'
      });
      newDom.window.scrollTo = () => {};
      newDom.window.eval(router);

      const about = newDom.window.document.querySelector('[data-page="about"]');
      expect(about.style.display).not.toBe('none');
      newDom.window.close();
    });

    test('should handle direct navigation to all routes', () => {
      const routes = ['/services', '/about', '/gallery', '/team', '/testimonials', '/contact'];

      routes.forEach(route => {
        const newDom = new JSDOM(html, {
          url: `http://localhost${route}`,
          runScripts: 'outside-only'
        });
        newDom.window.scrollTo = () => {};
        newDom.window.eval(router);

        const section = newDom.window.document.querySelector(`[data-page="${route.substring(1)}"]`);
        expect(section).not.toBeNull();
        expect(section.style.display).not.toBe('none');
        newDom.window.close();
      });
    });
  });

  describe('Meta Tags', () => {
    test('should have unique title for home page', () => {
      const Router = window.Router;
      Router.navigate('/', false);
      
      expect(document.title).toContain('Affairs of Beauty');
      expect(document.title).toContain('Wig Styling, Braiding, Haircuts');
    });

    test('should have unique title for services page', () => {
      const Router = window.Router;
      Router.navigate('/services', false);
      
      expect(document.title).toBe('Our Services | Affairs of Beauty');
    });

    test('should have unique title for about page', () => {
      const Router = window.Router;
      Router.navigate('/about', false);
      
      expect(document.title).toBe('About Us | Affairs of Beauty');
    });

    test('should have unique title for gallery page', () => {
      const Router = window.Router;
      Router.navigate('/gallery', false);
      
      expect(document.title).toBe('Style Gallery | Affairs of Beauty');
    });

    test('should have unique title for team page', () => {
      const Router = window.Router;
      Router.navigate('/team', false);
      
      expect(document.title).toBe('Our Team | Affairs of Beauty');
    });

    test('should have unique title for contact page', () => {
      const Router = window.Router;
      Router.navigate('/contact', false);
      
      expect(document.title).toBe('Contact Us | Affairs of Beauty');
    });

    test('should update meta description for each page', () => {
      const Router = window.Router;
      const routes = ['/', '/services', '/about', '/gallery', '/team', '/testimonials', '/contact'];
      const descriptions = {};

      routes.forEach(route => {
        Router.navigate(route, false);
        const meta = document.querySelector('meta[name="description"]');
        descriptions[route] = meta.getAttribute('content');
      });

      // Verify all descriptions are unique
      const uniqueDescriptions = new Set(Object.values(descriptions));
      expect(uniqueDescriptions.size).toBe(routes.length);
    });

    test('should update canonical URL for each page', () => {
      const Router = window.Router;
      
      Router.navigate('/services', false);
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical.getAttribute('href')).toContain('/services');
    });

    test('should update OG tags for each page', () => {
      const Router = window.Router;
      const routes = ['/', '/services', '/about'];

      routes.forEach(route => {
        Router.navigate(route, false);
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        
        expect(ogTitle.getAttribute('content')).toBeTruthy();
        expect(ogDesc.getAttribute('content')).toBeTruthy();
      });
    });
  });

  describe('404 Handling', () => {
    test('should redirect to home for invalid routes', () => {
      const Router = window.Router;
      Router.navigate('/invalid-route', false);
      
      expect(window.location.pathname).toBe('/');
    });
  });

  describe('Accessibility', () => {
    test('should set aria-hidden correctly', () => {
      const Router = window.Router;
      Router.navigate('/services', false);
      
      const services = document.querySelector('[data-page="services"]');
      const about = document.querySelector('[data-page="about"]');
      
      expect(services.getAttribute('aria-hidden')).toBe('false');
      expect(about.getAttribute('aria-hidden')).toBe('true');
    });

    test('should update active navigation state', () => {
      const Router = window.Router;
      Router.navigate('/services', false);
      
      const servicesLink = document.querySelector('[data-nav-link="services"]');
      const aboutLink = document.querySelector('[data-nav-link="about"]');
      
      expect(servicesLink.classList.contains('active-route')).toBe(true);
      expect(aboutLink.classList.contains('active-route')).toBe(false);
    });
  });

  describe('Scroll Behavior', () => {
    test('should scroll to top on navigation', () => {
      const Router = window.Router;
      window.scrollTo(0, 500);
      
      Router.navigate('/services');
      
      setTimeout(() => {
        expect(window.scrollY).toBe(0);
      }, 100);
    });
  });

  describe('Canonical URL', () => {
    test('should not accumulate path segments across multiple navigations', () => {
      const Router = window.Router;
      const canonical = document.querySelector('link[rel="canonical"]');

      Router.navigate('/services', false);
      expect(canonical.getAttribute('href')).toBe('http://localhost/services');

      Router.navigate('/about', false);
      expect(canonical.getAttribute('href')).toBe('http://localhost/about');

      Router.navigate('/', false);
      expect(canonical.getAttribute('href')).toBe('http://localhost/');

      Router.navigate('/gallery', false);
      expect(canonical.getAttribute('href')).toBe('http://localhost/gallery');
    });

    test('should produce a clean absolute URL for every route', () => {
      const Router = window.Router;
      const canonical = document.querySelector('link[rel="canonical"]');
      const routes = ['/', '/services', '/about', '/gallery', '/team', '/testimonials', '/contact'];

      routes.forEach(routePath => {
        Router.navigate(routePath, false);
        expect(canonical.getAttribute('href')).toBe(`http://localhost${routePath}`);
      });
    });
  });
});

describe('Mobile Menu', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, {
      url: 'http://localhost/',
      runScripts: 'outside-only'
    });
    window = dom.window;
    document = dom.window.document;

    window.scrollTo = () => {};
    // Mock lucide so main.js can load without the CDN
    window.lucide = { createIcons: () => {} };

    window.eval(router);
    window.eval(main);
  });

  afterEach(() => {
    dom.window.close();
  });

  test('mobile menu should be closed by default', () => {
    const menu = document.getElementById('mobile-menu');
    expect(menu.classList.contains('hidden')).toBe(true);
  });

  test('should open and close via toggleMobileMenu', () => {
    window.toggleMobileMenu();
    expect(document.getElementById('mobile-menu').classList.contains('hidden')).toBe(false);

    window.toggleMobileMenu();
    expect(document.getElementById('mobile-menu').classList.contains('hidden')).toBe(true);
  });

  test('should close mobile menu on route change', () => {
    // Open the menu
    window.toggleMobileMenu();
    expect(document.getElementById('mobile-menu').classList.contains('hidden')).toBe(false);

    // Navigate — dispatches routechange which should trigger closeMobileMenu
    window.Router.navigate('/services', false);

    expect(document.getElementById('mobile-menu').classList.contains('hidden')).toBe(true);
  });

  test('should reset hamburger icon state when closed via routechange', () => {
    window.toggleMobileMenu();
    // Close icon should be visible, menu icon hidden
    expect(document.getElementById('close-icon').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('menu-icon').classList.contains('hidden')).toBe(true);

    window.Router.navigate('/about', false);

    // Should be back to default: menu icon visible, close icon hidden
    expect(document.getElementById('close-icon').classList.contains('hidden')).toBe(true);
    expect(document.getElementById('menu-icon').classList.contains('hidden')).toBe(false);
  });
});

module.exports = { 
  testRouting: () => console.log('Routing tests configured') 
};
