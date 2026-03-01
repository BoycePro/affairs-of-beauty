/**
 * Hero Carousel - AFOB-12
 * Accessible, performant image carousel for Affairs of Beauty landing page
 */

class HeroCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = [];
    this.autoAdvanceInterval = null;
    this.autoAdvanceDelay = 4500; // 4.5 seconds
    this.isTransitioning = false;
    this.isPaused = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    // Hero images with alt text for accessibility
    this.heroImages = [
      {
        src: 'assets/images/wig-sleek-straight-long.png',
        alt: 'Luxurious long sleek wig installation with perfect straight styling',
        category: 'Wig Styling'
      },
      {
        src: 'assets/images/braiding-fulani-braids.png',
        alt: 'Beautiful Fulani braids with intricate patterns and beads',
        category: 'Braiding'
      },
      {
        src: 'assets/images/haircut-blonde-bob.png',
        alt: 'Precision blonde bob haircut with modern styling',
        category: 'Hair Cuts'
      },
      {
        src: 'assets/images/braiding-stitch-ponytail.png',
        alt: 'Sleek stitch braids styled in elegant high ponytail',
        category: 'Braiding'
      },
      {
        src: 'assets/images/hero-background.png',
        alt: 'Affairs of Beauty salon - Premium beauty services in Florida',
        category: 'Salon'
      }
    ];
    
    this.init();
  }
  
  init() {
    this.createCarouselStructure();
    this.preloadImages();
    this.attachEventListeners();
    this.startAutoAdvance();
    
    // Announce to screen readers
    this.announce('Hero carousel loaded with ' + this.heroImages.length + ' slides');
  }
  
  createCarouselStructure() {
    const heroSection = document.querySelector('.hero-carousel-container');
    if (!heroSection) {
      console.error('Hero carousel container not found');
      return;
    }
    
    // Create slides container
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'hero-slides';
    slidesContainer.setAttribute('aria-live', 'polite');
    slidesContainer.setAttribute('aria-atomic', 'false');
    
    // Create slides
    this.heroImages.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
      slide.setAttribute('data-slide-index', index);
      slide.setAttribute('aria-hidden', index !== 0);
      
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.className = 'hero-slide-img';
      img.loading = index === 0 ? 'eager' : 'lazy'; // Eager load first, lazy load others
      
      // Add gradient overlays
      const gradientOverlay1 = document.createElement('div');
      gradientOverlay1.className = 'absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/65 to-transparent';
      
      const gradientOverlay2 = document.createElement('div');
      gradientOverlay2.className = 'absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-gray-900/30';
      
      slide.appendChild(img);
      slide.appendChild(gradientOverlay1);
      slide.appendChild(gradientOverlay2);
      
      slidesContainer.appendChild(slide);
      this.slides.push(slide);
    });
    
    heroSection.appendChild(slidesContainer);
    
    // Create navigation controls
    this.createControls(heroSection);
  }
  
  createControls(container) {
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'hero-carousel-btn hero-carousel-prev';
    prevBtn.setAttribute('aria-label', 'Previous slide');
    prevBtn.innerHTML = '<i data-lucide="chevron-left" class="w-8 h-8"></i>';
    prevBtn.onclick = () => this.previousSlide();
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'hero-carousel-btn hero-carousel-next';
    nextBtn.setAttribute('aria-label', 'Next slide');
    nextBtn.innerHTML = '<i data-lucide="chevron-right" class="w-8 h-8"></i>';
    nextBtn.onclick = () => this.nextSlide();
    
    // Dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'hero-carousel-dots';
    dotsContainer.setAttribute('role', 'tablist');
    dotsContainer.setAttribute('aria-label', 'Carousel navigation');
    
    this.heroImages.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `hero-carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.setAttribute('aria-selected', index === 0);
      dot.setAttribute('data-slide', index);
      dot.onclick = () => this.goToSlide(index);
      dotsContainer.appendChild(dot);
    });
    
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
    container.appendChild(dotsContainer);
    
    // Re-initialize Lucide icons for the new buttons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
  
  preloadImages() {
    // Preload next 2 images for smooth transitions
    this.heroImages.forEach((image, index) => {
      if (index < 3) { // Preload first 3 images
        const img = new Image();
        img.src = image.src;
      }
    });
  }
  
  attachEventListeners() {
    const slidesContainer = document.querySelector('.hero-slides');
    if (!slidesContainer) return;
    
    // Mouse events for pause on hover
    slidesContainer.addEventListener('mouseenter', () => this.pauseAutoAdvance());
    slidesContainer.addEventListener('mouseleave', () => this.resumeAutoAdvance());
    
    // Touch events for swipe
    slidesContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    slidesContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    
    // Visibility API - pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoAdvance();
      } else if (!this.isPaused) {
        this.resumeAutoAdvance();
      }
    });
  }
  
  handleTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
  }
  
  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }
  
  handleSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) < swipeThreshold) return;
    
    if (diff > 0) {
      // Swiped left - go to next slide
      this.nextSlide();
    } else {
      // Swiped right - go to previous slide
      this.previousSlide();
    }
  }
  
  handleKeyDown(e) {
    // Only handle if carousel is in focus or focused element is a carousel control
    const activeElement = document.activeElement;
    const isCarouselControl = activeElement.classList.contains('hero-carousel-btn') || 
                              activeElement.classList.contains('hero-carousel-dot');
    
    if (!isCarouselControl) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.nextSlide();
        break;
      case 'Home':
        e.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        this.goToSlide(this.heroImages.length - 1);
        break;
    }
  }
  
  goToSlide(index, userInitiated = true) {
    if (this.isTransitioning || index === this.currentSlide) return;
    
    if (userInitiated) {
      this.pauseAutoAdvance();
      this.isPaused = true;
      // Resume after 10 seconds of user inactivity
      setTimeout(() => {
        this.isPaused = false;
        this.resumeAutoAdvance();
      }, 10000);
    }
    
    this.isTransitioning = true;
    const previousSlide = this.currentSlide;
    this.currentSlide = index;
    
    // Update slides
    this.slides[previousSlide].classList.remove('active');
    this.slides[previousSlide].setAttribute('aria-hidden', 'true');
    
    this.slides[index].classList.add('active');
    this.slides[index].setAttribute('aria-hidden', 'false');
    
    // Update dots
    const dots = document.querySelectorAll('.hero-carousel-dot');
    dots[previousSlide]?.classList.remove('active');
    dots[previousSlide]?.setAttribute('aria-selected', 'false');
    dots[index]?.classList.add('active');
    dots[index]?.setAttribute('aria-selected', 'true');
    
    // Announce to screen readers
    this.announce(`Slide ${index + 1} of ${this.heroImages.length}: ${this.heroImages[index].alt}`);
    
    // Preload next image
    const nextIndex = (index + 1) % this.heroImages.length;
    const nextImg = new Image();
    nextImg.src = this.heroImages[nextIndex].src;
    
    // Reset transition lock after animation
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600); // Match CSS transition duration
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.heroImages.length;
    this.goToSlide(nextIndex);
  }
  
  previousSlide() {
    const prevIndex = (this.currentSlide - 1 + this.heroImages.length) % this.heroImages.length;
    this.goToSlide(prevIndex);
  }
  
  startAutoAdvance() {
    this.autoAdvanceInterval = setInterval(() => {
      if (!this.isPaused) {
        this.goToSlide((this.currentSlide + 1) % this.heroImages.length, false);
      }
    }, this.autoAdvanceDelay);
  }
  
  pauseAutoAdvance() {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
      this.autoAdvanceInterval = null;
    }
  }
  
  resumeAutoAdvance() {
    if (!this.autoAdvanceInterval && !this.isPaused) {
      this.startAutoAdvance();
    }
  }
  
  announce(message) {
    // Create or update screen reader announcement
    let announcer = document.getElementById('carousel-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'carousel-announcer';
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }
    announcer.textContent = message;
  }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
  });
} else {
  new HeroCarousel();
}
