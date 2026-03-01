// ===== ENHANCED GALLERY SYSTEM =====

const galleryImages = [
  // Wigs (4 images available)
  { 
    id: 1, 
    url: 'assets/images/wig-sleek-straight-long.png', 
    category: 'Wigs', 
    title: 'Sleek Straight Install',
    alt: 'Beautiful sleek straight long black hair wig installation - Affairs of Beauty wig styling service in Florida',
    description: 'Premium straight texture lace front wig with natural hairline'
  },
  { 
    id: 2, 
    url: 'assets/images/wig-honey-highlight-waves.png', 
    category: 'Wigs', 
    title: 'Honey Highlight Waves',
    alt: 'Honey blonde highlighted wavy wig with gorgeous color blend - custom wig coloring and styling Florida',
    description: 'Custom colored wig with honey highlights and soft waves'
  },
  { 
    id: 3, 
    url: 'assets/images/wig-sleek-ponytail.png', 
    category: 'Wigs', 
    title: 'Sleek High Ponytail',
    alt: 'Sleek high ponytail wig installation - elegant updo wig styling for special occasions Florida',
    description: 'High ponytail wig install perfect for formal events'
  },
  { 
    id: 4, 
    url: 'assets/images/wig-blonde-ponytail.png', 
    category: 'Wigs', 
    title: 'Blonde Glam Ponytail',
    alt: 'Blonde glamorous high ponytail wig - luxury blonde wig installation Florida beauty salon',
    description: 'Glamorous blonde ponytail wig with sleek finish'
  },

  // Braids (9 images available)
  { 
    id: 5, 
    url: 'assets/images/braiding-cornrows-beads.jpg', 
    category: 'Braids', 
    title: 'Cornrows with Gold Beads',
    alt: 'Beautiful cornrows with gold beads - African braiding styles with decorative beads Florida',
    description: 'Intricate cornrow pattern adorned with gold bead accents'
  },
  { 
    id: 6, 
    url: 'assets/images/braiding-fulani-braids.png', 
    category: 'Braids', 
    title: 'Fulani Braids',
    alt: 'Fulani braids with beads and tribal patterns - traditional African protective hairstyle Florida',
    description: 'Traditional Fulani braiding with center part and beads'
  },
  { 
    id: 7, 
    url: 'assets/images/braiding-kids-cornrows-curls.png', 
    category: 'Braids', 
    title: 'Kids Cornrows & Curls',
    alt: 'Kids cornrows with curly ends - gentle protective braiding for children Florida braiding salon',
    description: 'Gentle kids cornrows with playful curly ends'
  },
  { 
    id: 8, 
    url: 'assets/images/braiding-faux-locs-updo.png', 
    category: 'Braids', 
    title: 'Faux Locs Updo',
    alt: 'Elegant faux locs updo hairstyle - goddess locs protective style Florida hair salon',
    description: 'Sophisticated faux locs styled in elegant updo'
  },
  { 
    id: 9, 
    url: 'assets/images/braiding-passion-twists.jpg', 
    category: 'Braids', 
    title: 'Passion Twists',
    alt: 'Passion twists protective hairstyle - bohemian braiding style Florida braiding specialist',
    description: 'Bohemian passion twists with beautiful texture'
  },
  { 
    id: 10, 
    url: 'assets/images/braiding-braided-ponytail.png', 
    category: 'Braids', 
    title: 'Braided High Ponytail',
    alt: 'High braided ponytail - sleek cornrow ponytail hairstyle Florida professional braiding',
    description: 'Sleek braided ponytail with cornrow base'
  },
  { 
    id: 11, 
    url: 'assets/images/braiding-stitch-ponytail.png', 
    category: 'Braids', 
    title: 'Stitch Braid Ponytail',
    alt: 'Stitch braids ponytail - trendy feed-in braids hairstyle Florida knotless braiding',
    description: 'Trendy stitch braids flowing into high ponytail'
  },
  { 
    id: 12, 
    url: 'assets/images/braiding-kids-box-braids.png', 
    category: 'Braids', 
    title: 'Kids Box Braids',
    alt: 'Kids box braids protective hairstyle - gentle box braiding for children Florida salon',
    description: 'Protective box braids perfect for young girls'
  },
  { 
    id: 13, 
    url: 'assets/images/braiding-boho-braids.jpg', 
    category: 'Braids', 
    title: 'Boho Goddess Braids',
    alt: 'Boho goddess braids - bohemian knotless braids with curly ends Florida braiding expert',
    description: 'Boho goddess braids with loose curly texture'
  },

  // Cuts (5 images available)
  { 
    id: 14, 
    url: 'assets/images/haircut-before-after-pixie.png', 
    category: 'Cuts', 
    title: 'Precision Pixie - Before & After',
    alt: 'Before and after pixie cut transformation - precision short haircut Florida hair salon',
    description: 'Dramatic transformation from long to chic pixie cut',
    beforeAfter: true
  },
  { 
    id: 15, 
    url: 'assets/images/haircut-blonde-bob.png', 
    category: 'Cuts', 
    title: 'Blonde Bob Cut',
    alt: 'Blonde bob haircut - precision bob cut with blonde color Florida hair stylist',
    description: 'Classic blonde bob with precise lines'
  },
  { 
    id: 16, 
    url: 'assets/images/haircut-pixie-brunette.png', 
    category: 'Cuts', 
    title: 'Textured Pixie Cut',
    alt: 'Textured pixie cut for natural hair - short haircut Florida precision cutting',
    description: 'Textured pixie with natural volume and movement'
  },
  { 
    id: 17, 
    url: 'assets/images/haircut-pixie-blonde.png', 
    category: 'Cuts', 
    title: 'Blonde Pixie Style',
    alt: 'Blonde pixie haircut - short blonde precision cut Florida professional stylist',
    description: 'Edgy blonde pixie with modern styling'
  },
  { 
    id: 18, 
    url: 'assets/images/haircut-nape-trim.png', 
    category: 'Cuts', 
    title: 'Nape Trim & Shape Up',
    alt: 'Nape trim and shape up - precision hairline edging Florida barber services',
    description: 'Clean nape trim with sharp hairline definition'
  },

  // Gallery images (using for Wigs category to fill out the collection)
  { 
    id: 19, 
    url: 'assets/images/gallery-1.jpg', 
    category: 'Wigs', 
    title: 'Natural Curls',
    alt: 'Natural curly hair wig installation - kinky curly wig styling Florida beauty services',
    description: 'Beautiful natural curly texture wig install'
  },
  { 
    id: 20, 
    url: 'assets/images/gallery-2.jpg', 
    category: 'Wigs', 
    title: 'Sleek Straight',
    alt: 'Sleek straight hair wig - smooth straight texture wig installation Florida',
    description: 'Ultra-sleek straight wig with natural shine'
  },
  { 
    id: 21, 
    url: 'assets/images/gallery-3.jpg', 
    category: 'Wigs', 
    title: 'Sleek Body Wave',
    alt: 'Body wave wig installation - wavy texture lace front wig Florida wig specialist',
    description: 'Flowing body wave wig with natural movement'
  },
  { 
    id: 22, 
    url: 'assets/images/gallery-4.png', 
    category: 'Wigs', 
    title: 'Custom Color Wig',
    alt: 'Custom colored wig - professional wig coloring and styling Florida beauty salon',
    description: 'Stunning custom colored wig installation'
  },
  { 
    id: 23, 
    url: 'assets/images/gallery-5.png', 
    category: 'Wigs', 
    title: 'Elegant Lace Front',
    alt: 'Elegant lace front wig - natural hairline wig installation Florida wig styling',
    description: 'Elegant lace front with flawless hairline'
  },
  { 
    id: 24, 
    url: 'assets/images/gallery-6.png', 
    category: 'Wigs', 
    title: 'Natural Wave Install',
    alt: 'Natural wave wig installation - textured wavy wig Florida premium wig services',
    description: 'Natural wave texture wig with bounce'
  },
  { 
    id: 25, 
    url: 'assets/images/gallery-7.png', 
    category: 'Wigs', 
    title: 'Layered Lace Front',
    alt: 'Layered lace front wig - dimensional layered wig styling Florida beauty expert',
    description: 'Beautifully layered lace front wig'
  },
  { 
    id: 26, 
    url: 'assets/images/gallery-8.png', 
    category: 'Wigs', 
    title: 'Honey Blonde Install',
    alt: 'Honey blonde wig installation - blonde lace front wig Florida custom coloring',
    description: 'Gorgeous honey blonde wig with natural shine'
  }
];

// Gallery state
let currentGalleryFilter = 'All';
let currentLightboxIndex = 0;
let filteredGalleryImages = [...galleryImages];
let touchStartX = 0;
let touchEndX = 0;

// ===== LAZY LOADING =====
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        img.src = dataSrc;
        img.removeAttribute('data-src');
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
      }
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px' // Start loading 50px before entering viewport
});

// ===== RENDER GALLERY =====
function renderGallery() {
  filteredGalleryImages = currentGalleryFilter === 'All' 
    ? [...galleryImages] 
    : galleryImages.filter(img => img.category === currentGalleryFilter);
  
  const grid = document.getElementById('gallery-grid');
  
  // Add fade-out animation
  grid.style.opacity = '0';
  
  setTimeout(() => {
    grid.innerHTML = filteredGalleryImages.map((image, index) => {
      // Create varied grid layout with featured items
      const spanClass = (index % 7 === 0 || index % 11 === 0) ? 'md:col-span-2 md:row-span-2' : '';
      
      return `
        <div 
          onclick="openLightbox(${index})" 
          class="gallery-item group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${spanClass}"
          style="animation: fadeInUp 0.5s ease-out ${index * 0.05}s both;"
        >
          <img 
            data-src="${image.url}" 
            alt="${image.alt}" 
            class="lazy-loading w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700" 
            style="background: linear-gradient(135deg, #F4C2C2 0%, #E09DB5 100%);"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/90 via-[#2D2D2D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[#F2B5C8] text-xs font-semibold uppercase tracking-wider">${image.category}</span>
                ${image.beforeAfter ? '<span class="text-[#F2B5C8] text-xs bg-[#F2B5C8]/20 px-2 py-0.5 rounded-full">Before & After</span>' : ''}
              </div>
              <h3 class="text-white font-bold text-lg mb-1">${image.title}</h3>
              <p class="text-white/80 text-sm">${image.description}</p>
            </div>
          </div>
          <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="bg-white/90 backdrop-blur-sm p-2 rounded-full">
              <svg class="w-5 h-5 text-[#2D2D2D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
              </svg>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    // Fade in
    grid.style.opacity = '1';
    
    // Apply lazy loading to images
    const lazyImages = grid.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
    
  }, 150);
}

// ===== FILTER GALLERY =====
function filterGallery(category) {
  currentGalleryFilter = category;
  
  // Update filter buttons with smooth animation
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.className = 'gallery-filter-btn px-6 py-2.5 rounded-full font-medium transition-all bg-[#2D2D2D] text-white shadow-lg transform scale-105';
    } else {
      btn.className = 'gallery-filter-btn px-6 py-2.5 rounded-full font-medium transition-all bg-white text-[#2D2D2D] hover:bg-[#F4C2C2]/30 hover:scale-105';
    }
  });
  
  renderGallery();
}

// ===== LIGHTBOX FUNCTIONS =====
function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  document.getElementById('lightbox').classList.remove('hidden');
  document.body.classList.add('modal-open');
  
  // Setup touch listeners for swipe
  const lightbox = document.getElementById('lightbox');
  lightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
  lightbox.addEventListener('touchend', handleTouchEnd, { passive: true });
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.classList.remove('modal-open');
  
  // Remove touch listeners
  const lightbox = document.getElementById('lightbox');
  lightbox.removeEventListener('touchstart', handleTouchStart);
  lightbox.removeEventListener('touchend', handleTouchEnd);
}

function updateLightboxContent() {
  const image = filteredGalleryImages[currentLightboxIndex];
  const lightboxImg = document.getElementById('lightbox-img');
  
  // Fade out
  lightboxImg.style.opacity = '0';
  
  setTimeout(() => {
    lightboxImg.src = image.url;
    lightboxImg.alt = image.alt;
    document.getElementById('lightbox-category').textContent = image.category;
    document.getElementById('lightbox-title').textContent = image.title;
    document.getElementById('lightbox-description').textContent = image.description || '';
    
    // Show before/after badge if applicable
    const beforeAfterBadge = document.getElementById('lightbox-before-after');
    if (beforeAfterBadge) {
      beforeAfterBadge.classList.toggle('hidden', !image.beforeAfter);
    }
    
    // Update counter
    document.getElementById('lightbox-counter').textContent = `${currentLightboxIndex + 1} / ${filteredGalleryImages.length}`;
    
    // Fade in
    lightboxImg.style.opacity = '1';
  }, 150);
}

function lightboxPrev() {
  currentLightboxIndex = currentLightboxIndex === 0 
    ? filteredGalleryImages.length - 1 
    : currentLightboxIndex - 1;
  updateLightboxContent();
}

function lightboxNext() {
  currentLightboxIndex = currentLightboxIndex === filteredGalleryImages.length - 1 
    ? 0 
    : currentLightboxIndex + 1;
  updateLightboxContent();
}

// ===== TOUCH/SWIPE SUPPORT =====
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next image
      lightboxNext();
    } else {
      // Swipe right - previous image
      lightboxPrev();
    }
  }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
  const lightbox = document.getElementById('lightbox');
  
  if (!lightbox.classList.contains('hidden')) {
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        lightboxPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        lightboxNext();
        break;
      case 'Home':
        e.preventDefault();
        currentLightboxIndex = 0;
        updateLightboxContent();
        break;
      case 'End':
        e.preventDefault();
        currentLightboxIndex = filteredGalleryImages.length - 1;
        updateLightboxContent();
        break;
    }
  }
});

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .lazy-loading {
    filter: blur(10px);
    transition: filter 0.3s;
  }
  
  .lazy-loaded {
    filter: blur(0);
  }
  
  #gallery-grid {
    transition: opacity 0.3s ease-in-out;
  }
  
  #lightbox-img {
    transition: opacity 0.3s ease-in-out;
  }
  
  .gallery-item {
    will-change: transform;
  }
`;
document.head.appendChild(style);

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
  renderGallery();
});

// Export for use in main.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderGallery,
    filterGallery,
    openLightbox,
    closeLightbox
  };
}
