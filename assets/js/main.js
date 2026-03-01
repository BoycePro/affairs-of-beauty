// Initialize Lucide icons
lucide.createIcons();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  const logo = document.getElementById('nav-logo');
  if (window.scrollY > 50) {
    navbar.classList.remove('bg-transparent');
    navbar.classList.add('bg-[#111111]/95', 'backdrop-blur-md', 'shadow-lg');
    logo.classList.remove('text-white');
    logo.classList.add('text-[#F2B5C8]');
  } else {
    navbar.classList.add('bg-transparent');
    navbar.classList.remove('bg-[#111111]/95', 'backdrop-blur-md', 'shadow-lg');
    logo.classList.add('text-white');
    logo.classList.remove('text-[#F2B5C8]');
  }
});

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ===== MOBILE MENU =====
let mobileMenuOpen = false;
function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  document.getElementById('mobile-menu').classList.toggle('hidden', !mobileMenuOpen);
  document.getElementById('menu-icon').classList.toggle('hidden', mobileMenuOpen);
  document.getElementById('close-icon').classList.toggle('hidden', !mobileMenuOpen);
}

// ===== GALLERY =====
const galleryImages = [
  // Arranged for visual diversity in "All" view — alternating categories, skin tones, styles
  // Row 1: Strong openers — one from each category
  { id: 23, url: 'assets/images/wig-sleek-straight-long.png', category: 'Wig Styling', title: 'Sleek Straight Install' },
  { id: 9, url: 'assets/images/braiding-cornrows-beads.jpg', category: 'Braiding', title: 'Cornrows with Gold Beads' },
  { id: 12, url: 'assets/images/haircut-pixie-brunette.png', category: 'Hair Cuts', title: 'Textured Pixie Cut' },
  { id: 26, url: 'assets/images/wig-honey-highlight-waves.png', category: 'Wig Styling', title: 'Honey Highlight Waves' },
  // Row 2: Mix of styles — kids, glam, action shots
  { id: 16, url: 'assets/images/braiding-fulani-braids.png', category: 'Braiding', title: 'Fulani Braids' },
  { id: 22, url: 'assets/images/haircut-blonde-bob.png', category: 'Hair Cuts', title: 'Blonde Bob Cut' },
  { id: 1, url: 'assets/images/gallery-5.png', category: 'Wig Styling', title: 'Elegant Lace Front' },
  { id: 15, url: 'assets/images/braiding-kids-cornrows-curls.png', category: 'Braiding', title: 'Kids Cornrows & Curls' },
  // Row 3: Variety continues
  { id: 24, url: 'assets/images/wig-sleek-ponytail.png', category: 'Wig Styling', title: 'Sleek High Ponytail' },
  { id: 18, url: 'assets/images/braiding-faux-locs-updo.png', category: 'Braiding', title: 'Faux Locs Updo' },
  { id: 20, url: 'assets/images/haircut-before-after-pixie.png', category: 'Hair Cuts', title: 'Precision Pixie - Before & After' },
  { id: 10, url: 'assets/images/braiding-passion-twists.jpg', category: 'Braiding', title: 'Passion Twists' },
  // Row 4: More diversity
  { id: 4, url: 'assets/images/gallery-1.jpg', category: 'Wig Styling', title: 'Natural Curls' },
  { id: 19, url: 'assets/images/braiding-braided-ponytail.png', category: 'Braiding', title: 'Braided High Ponytail' },
  { id: 13, url: 'assets/images/haircut-pixie-blonde.png', category: 'Hair Cuts', title: 'Blonde Pixie Style' },
  { id: 25, url: 'assets/images/wig-blonde-ponytail.png', category: 'Wig Styling', title: 'Blonde Glam Ponytail' },
  // Row 5: Beautiful closers
  { id: 17, url: 'assets/images/braiding-stitch-ponytail.png', category: 'Braiding', title: 'Stitch Braid Ponytail' },
  { id: 8, url: 'assets/images/gallery-8.png', category: 'Wig Styling', title: 'Honey Blonde Install' },
  { id: 14, url: 'assets/images/braiding-kids-box-braids.png', category: 'Braiding', title: 'Kids Box Braids' },
  { id: 21, url: 'assets/images/haircut-nape-trim.png', category: 'Hair Cuts', title: 'Nape Trim & Shape Up' },
  // Row 6: Final mix
  { id: 5, url: 'assets/images/gallery-3.jpg', category: 'Wig Styling', title: 'Sleek Body Wave' },
  { id: 11, url: 'assets/images/braiding-boho-braids.jpg', category: 'Braiding', title: 'Boho Goddess Braids' },
  { id: 2, url: 'assets/images/gallery-4.png', category: 'Wig Styling', title: 'Custom Color Wig' },
  { id: 3, url: 'assets/images/gallery-6.png', category: 'Wig Styling', title: 'Natural Wave Install' },
  { id: 6, url: 'assets/images/gallery-7.png', category: 'Wig Styling', title: 'Layered Lace Front' },
  { id: 7, url: 'assets/images/gallery-2.jpg', category: 'Wig Styling', title: 'Sleek Straight' }
];

let currentGalleryFilter = 'All';
let currentLightboxIndex = 0;
let filteredGalleryImages = [...galleryImages];

function renderGallery() {
  filteredGalleryImages = currentGalleryFilter === 'All' 
    ? [...galleryImages] 
    : galleryImages.filter(img => img.category === currentGalleryFilter);
  
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = filteredGalleryImages.map((image, index) => {
    const spanClass = (index === 0 || index === 5) ? 'md:col-span-2 md:row-span-2' : '';
    return `
      <div onclick="openLightbox(${index})" class="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:-translate-y-1 transition-all duration-300 ${spanClass}">
        <img src="${image.url}" alt="${image.title}" class="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute bottom-4 left-4 right-4">
            <span class="text-[#F2B5C8] text-sm font-medium">${image.category}</span>
            <h3 class="text-white font-semibold text-lg">${image.title}</h3>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterGallery(category) {
  currentGalleryFilter = category;
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.className = 'gallery-filter-btn px-6 py-2.5 rounded-full font-medium transition-all bg-[#2D2D2D] text-white shadow-lg';
    } else {
      btn.className = 'gallery-filter-btn px-6 py-2.5 rounded-full font-medium transition-all bg-white text-[#2D2D2D] hover:bg-[#F4C2C2]/30';
    }
  });
  renderGallery();
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const image = filteredGalleryImages[index];
  document.getElementById('lightbox-img').src = image.url;
  document.getElementById('lightbox-img').alt = image.title;
  document.getElementById('lightbox-category').textContent = image.category;
  document.getElementById('lightbox-title').textContent = image.title;
  document.getElementById('lightbox').classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function lightboxPrev() {
  currentLightboxIndex = currentLightboxIndex === 0 ? filteredGalleryImages.length - 1 : currentLightboxIndex - 1;
  const image = filteredGalleryImages[currentLightboxIndex];
  document.getElementById('lightbox-img').src = image.url;
  document.getElementById('lightbox-img').alt = image.title;
  document.getElementById('lightbox-category').textContent = image.category;
  document.getElementById('lightbox-title').textContent = image.title;
}

function lightboxNext() {
  currentLightboxIndex = currentLightboxIndex === filteredGalleryImages.length - 1 ? 0 : currentLightboxIndex + 1;
  const image = filteredGalleryImages[currentLightboxIndex];
  document.getElementById('lightbox-img').src = image.url;
  document.getElementById('lightbox-img').alt = image.title;
  document.getElementById('lightbox-category').textContent = image.category;
  document.getElementById('lightbox-title').textContent = image.title;
}

// ===== TESTIMONIALS =====
const testimonials = [
  { id: 1, name: 'Aisha Robinson', service: 'Wig Styling', rating: 5, text: 'Janet is absolutely amazing! My lace front looks so natural, people think it\'s my real hair. The attention to detail and care she puts into her work is unmatched. I\'ve been coming here for 3 years and will never go anywhere else!', date: 'January 2026' },
  { id: 2, name: 'Destiny Williams', service: 'Knotless Braids', rating: 5, text: 'My knotless braids are PERFECT! No tension, no pain, and they look absolutely gorgeous. The salon atmosphere is so relaxing and everyone is so friendly. Highly recommend Affairs of Beauty!', date: 'January 2026' },
  { id: 3, name: 'Nicole Carter', service: 'Nail Art', rating: 5, text: 'The nail artistry here is incredible! They brought my Pinterest vision to life and then some. The gel lasted over 3 weeks without chipping. The spa pedicure was so relaxing. This is my new go-to spot!', date: 'December 2025' },
  { id: 4, name: 'Brianna Thomas', service: 'Hair Cut & Color', rating: 5, text: 'I was nervous about getting a big chop but the team made me feel so comfortable. My new cut frames my face perfectly and the color is exactly what I wanted. I feel like a new woman!', date: 'December 2025' },
  { id: 5, name: 'Tiffany Moore', service: 'Bridal Styling', rating: 5, text: 'Affairs of Beauty did my hair and nails for my wedding and I felt like a queen! They were so professional and made sure everything was perfect. All my bridesmaids looked stunning too!', date: 'November 2025' },
  { id: 6, name: 'Crystal Davis', service: 'Box Braids', rating: 5, text: 'Best braiding experience ever! Janet is fast, gentle, and her work is flawless. The braids lasted 8 weeks and still looked fresh. The online booking made everything so easy!', date: 'November 2025' }
];

let testimonialIndex = 0;

function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  const visible = [
    testimonials[testimonialIndex],
    testimonials[(testimonialIndex + 1) % testimonials.length],
    testimonials[(testimonialIndex + 2) % testimonials.length]
  ];
  grid.innerHTML = visible.map((t, i) => {
    const scaleClass = i === 1 ? 'md:scale-105 md:shadow-2xl' : 'md:opacity-80';
    const stars = Array(t.rating).fill('<svg class="w-5 h-5 fill-[#F2B5C8] text-[#F2B5C8]" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>').join('');
    return `
      <div class="bg-white rounded-3xl p-8 shadow-xl transform transition-all duration-500 ${scaleClass}">
        <svg class="w-10 h-10 text-[#F4C2C2] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
        <div class="flex gap-1 mb-4">${stars}</div>
        <p class="text-gray-700 leading-relaxed mb-6">"${t.text}"</p>
        <div class="border-t border-gray-200 pt-4">
          <h4 class="font-semibold text-[#2D2D2D]">${t.name}</h4>
          <div class="flex items-center justify-between">
            <span class="text-[#F2B5C8] text-sm">${t.service}</span>
            <span class="text-gray-400 text-sm">${t.date}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Dots
  const dotsContainer = document.getElementById('testimonial-dots');
  dotsContainer.innerHTML = testimonials.map((_, i) => {
    const active = i === testimonialIndex;
    return `<button onclick="setTestimonialIndex(${i})" class="h-2 rounded-full transition-all ${active ? 'bg-[#F2B5C8] w-6' : 'bg-white/40 w-2'}"></button>`;
  }).join('');
}

function testimonialPrev() {
  testimonialIndex = testimonialIndex === 0 ? testimonials.length - 1 : testimonialIndex - 1;
  renderTestimonials();
}

function testimonialNext() {
  testimonialIndex = testimonialIndex === testimonials.length - 1 ? 0 : testimonialIndex + 1;
  renderTestimonials();
}

function setTestimonialIndex(i) {
  testimonialIndex = i;
  renderTestimonials();
}

// ===== CONTACT FORM =====
function handleContactSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const messageInput = form.querySelector('[name="message"]');
  
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  // Clear previous validation states
  clearValidationErrors();

  // Validate required fields
  let hasError = false;

  if (!name) {
    showFieldError(nameInput, 'Please enter your name');
    hasError = true;
  } else if (name.length < 2) {
    showFieldError(nameInput, 'Name must be at least 2 characters');
    hasError = true;
  }

  if (!email) {
    showFieldError(emailInput, 'Please enter your email address');
    hasError = true;
  } else if (!isValidEmail(email)) {
    showFieldError(emailInput, 'Please enter a valid email address');
    hasError = true;
  }

  // Phone is optional, but validate if provided
  if (phone && !isValidPhoneNumber(phone)) {
    showFieldError(phoneInput, 'Please enter a valid phone number');
    hasError = true;
  }

  if (!message) {
    showFieldError(messageInput, 'Please enter a message');
    hasError = true;
  } else if (message.length < 10) {
    showFieldError(messageInput, 'Message must be at least 10 characters');
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // Show success message
  document.getElementById('contact-form').classList.add('hidden');
  document.getElementById('contact-success').classList.remove('hidden');
  document.getElementById('contact-success').classList.add('flex');

  // Open mailto
  const subject = encodeURIComponent(`Website Inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n${phone ? 'Phone: ' + phone + '\n' : ''}\nMessage:\n${message}`
  );
  window.location.href = `mailto:hello@affairsofbeauty.com?subject=${subject}&body=${body}`;

  // Reset form after 3 seconds
  setTimeout(() => {
    form.reset();
    document.getElementById('contact-form').classList.remove('hidden');
    document.getElementById('contact-success').classList.add('hidden');
    document.getElementById('contact-success').classList.remove('flex');
  }, 3000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhoneNumber(phone) {
  // Accept various formats: (123) 456-7890, 123-456-7890, 1234567890, +1 (123) 456-7890
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

function showFieldError(input, message) {
  input.setAttribute('aria-invalid', 'true');
  input.classList.add('border-red-500', 'bg-red-50');
  
  // Create or update error message
  let errorDiv = input.parentElement.querySelector('.error-message');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-600 text-sm mt-1';
    errorDiv.setAttribute('role', 'alert');
    input.parentElement.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
}

function clearValidationErrors() {
  document.querySelectorAll('[aria-invalid="true"]').forEach(input => {
    input.removeAttribute('aria-invalid');
    input.classList.remove('border-red-500', 'bg-red-50');
  });
  
  document.querySelectorAll('.error-message').forEach(error => {
    error.remove();
  });
}

// ===== NEWSLETTER =====
function handleNewsletterSubmit(e) {
  e.preventDefault();
  document.getElementById('newsletter-email').value = '';
  const msg = document.getElementById('newsletter-success');
  msg.classList.remove('hidden');
  setTimeout(() => msg.classList.add('hidden'), 3000);
}

// ===== BOOKING MODAL =====
let bookingStep = 1;
let selectedTime = '';

function openBookingModal(serviceName, price) {
  bookingStep = 1;
  selectedTime = '';
  document.getElementById('booking-modal').classList.remove('hidden');
  document.body.classList.add('modal-open');
  
  // Reset form
  document.getElementById('booking-service').value = '';
  document.getElementById('booking-stylist').value = '';
  document.getElementById('booking-name').value = '';
  document.getElementById('booking-email').value = '';
  document.getElementById('booking-phone').value = '';
  document.getElementById('booking-notes').value = '';
  document.getElementById('booking-date').value = '';
  
  // Set min/max dates
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('booking-date').min = tomorrow.toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  document.getElementById('booking-date').max = maxDate.toISOString().split('T')[0];

  // Pre-select service if provided
  if (serviceName) {
    const select = document.getElementById('booking-service');
    for (let opt of select.options) {
      if (opt.value.toLowerCase().includes(serviceName.toLowerCase())) {
        select.value = opt.value;
        break;
      }
    }
    updateBookingDuration();
  }

  renderTimeSlots();
  updateBookingStep();
  lucide.createIcons();
}

function closeBookingModal() {
  document.getElementById('booking-modal').classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function renderTimeSlots() {
  const times = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM'];
  const grid = document.getElementById('time-slots-grid');
  grid.innerHTML = times.map(time => {
    const active = selectedTime === time;
    return `<button type="button" onclick="selectTime('${time}')" class="p-2 rounded-lg text-sm font-medium transition-all ${active ? 'bg-[#2D2D2D] text-white' : 'bg-gray-50 text-[#2D2D2D] hover:bg-gray-100'}">${time}</button>`;
  }).join('');
}

function selectTime(time) {
  selectedTime = time;
  renderTimeSlots();
}

function updateBookingDuration() {
  const select = document.getElementById('booking-service');
  const opt = select.options[select.selectedIndex];
  const duration = opt?.dataset?.duration;
  const info = document.getElementById('booking-duration-info');
  if (duration) {
    info.classList.remove('hidden');
    document.getElementById('booking-duration-text').textContent = duration;
  } else {
    info.classList.add('hidden');
  }
}

function updateBookingStep() {
  // Update step label
  document.getElementById('booking-step-label').textContent = `Step ${bookingStep} of 4`;
  
  // Update progress
  const bars = document.getElementById('booking-progress').children;
  for (let i = 0; i < bars.length; i++) {
    bars[i].className = `h-1 flex-1 rounded-full transition-colors ${i < bookingStep ? 'bg-[#F2B5C8]' : 'bg-white/30'}`;
  }

  // Show/hide steps
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`booking-step-${i}`).classList.toggle('hidden', i !== bookingStep);
  }

  // Show/hide buttons
  document.getElementById('booking-back-btn').classList.toggle('hidden', bookingStep === 1);
  document.getElementById('booking-back-spacer').classList.toggle('hidden', bookingStep > 1);
  document.getElementById('booking-next-btn').classList.toggle('hidden', bookingStep === 4);
  document.getElementById('booking-pay-btn').classList.toggle('hidden', bookingStep !== 4);

  // Update pay button text
  if (bookingStep === 4) {
    const select = document.getElementById('booking-service');
    const opt = select.options[select.selectedIndex];
    const price = opt?.dataset?.price || '0';
    document.getElementById('booking-pay-text').textContent = `Pay $${price} & Book`;
    renderBookingSummary();
    document.getElementById('booking-pay-btn').style.display = 'flex';
  }

  document.getElementById('booking-error').classList.add('hidden');
  lucide.createIcons();
}

function showBookingError(msg) {
  const el = document.getElementById('booking-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function bookingNext() {
  const error = document.getElementById('booking-error');
  error.classList.add('hidden');

  if (bookingStep === 1) {
    if (!document.getElementById('booking-service').value || !document.getElementById('booking-stylist').value) {
      showBookingError('Please select a service and stylist');
      return;
    }
  }
  if (bookingStep === 2) {
    if (!document.getElementById('booking-date').value || !selectedTime) {
      showBookingError('Please select a date and time');
      return;
    }
  }
  if (bookingStep === 3) {
    const name = document.getElementById('booking-name').value;
    const email = document.getElementById('booking-email').value;
    const phone = document.getElementById('booking-phone').value;
    if (!name || !email || !phone) {
      showBookingError('Please fill in all required fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showBookingError('Please enter a valid email address');
      return;
    }
  }

  bookingStep++;
  updateBookingStep();
}

function bookingBack() {
  bookingStep--;
  updateBookingStep();
}

function renderBookingSummary() {
  const select = document.getElementById('booking-service');
  const opt = select.options[select.selectedIndex];
  const price = opt?.dataset?.price || '0';
  const duration = opt?.dataset?.duration || '';
  const dateVal = document.getElementById('booking-date').value;
  const dateFormatted = dateVal ? new Date(dateVal + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';

  document.getElementById('booking-summary').innerHTML = `
    <div class="flex justify-between"><span class="text-gray-600">Service:</span><span class="font-medium text-[#2D2D2D]">${select.value}</span></div>
    <div class="flex justify-between"><span class="text-gray-600">Stylist:</span><span class="font-medium text-[#2D2D2D]">${document.getElementById('booking-stylist').value}</span></div>
    <div class="flex justify-between"><span class="text-gray-600">Date:</span><span class="font-medium text-[#2D2D2D]">${dateFormatted}</span></div>
    <div class="flex justify-between"><span class="text-gray-600">Time:</span><span class="font-medium text-[#2D2D2D]">${selectedTime}</span></div>
    <div class="flex justify-between"><span class="text-gray-600">Duration:</span><span class="font-medium text-[#2D2D2D]">${duration}</span></div>
    <div class="border-t border-gray-200 pt-3 mt-3">
      <div class="flex justify-between"><span class="text-gray-600">Name:</span><span class="font-medium text-[#2D2D2D]">${document.getElementById('booking-name').value}</span></div>
      <div class="flex justify-between"><span class="text-gray-600">Email:</span><span class="font-medium text-[#2D2D2D]">${document.getElementById('booking-email').value}</span></div>
      <div class="flex justify-between"><span class="text-gray-600">Phone:</span><span class="font-medium text-[#2D2D2D]">${document.getElementById('booking-phone').value}</span></div>
    </div>
    <div class="border-t border-gray-200 pt-3 mt-3">
      <div class="flex justify-between items-center">
        <span class="text-lg font-semibold text-[#2D2D2D]">Estimated Starting Price:</span>
        <span class="text-2xl font-bold text-[#F2B5C8]">$${price}</span>
      </div>
    </div>
  `;
  // Set the mailto link with booking details
  const emailBtn = document.getElementById('booking-email-btn');
  if (emailBtn) emailBtn.href = buildBookingMailto();
}

let selectedPayment = '';

function selectPayment(method) {
  selectedPayment = method;
  ['zelle', 'cash'].forEach(m => {
    const box = document.getElementById('pay-' + m);
    const radio = document.getElementById('pay-' + m + '-radio');
    const details = document.getElementById('pay-' + m + '-details');
    if (m === method) {
      box.classList.remove('border-gray-200');
      box.classList.add('border-[#F2B5C8]', 'bg-[#F2B5C8]/5');
      radio.innerHTML = '<div class="w-3 h-3 rounded-full bg-[#F2B5C8]"></div>';
      radio.classList.remove('border-gray-300');
      radio.classList.add('border-[#F2B5C8]');
      details.classList.remove('hidden');
    } else {
      box.classList.add('border-gray-200');
      box.classList.remove('border-[#F2B5C8]', 'bg-[#F2B5C8]/5');
      radio.innerHTML = '';
      radio.classList.add('border-gray-300');
      radio.classList.remove('border-[#F2B5C8]');
      details.classList.add('hidden');
    }
  });
}

function confirmBooking() {
  if (!selectedPayment) {
    showBookingError('Please select a payment method');
    return;
  }
  const service = document.getElementById('booking-service').value;
  const name = document.getElementById('booking-name').value;
  const dateVal = document.getElementById('booking-date').value;
  const dateFormatted = dateVal ? new Date(dateVal + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const payLabels = { zelle: 'Zelle', cash: 'Cash' };

  // Build and open mailto with booking details
  const payLabelsEmail = { zelle: 'Zelle to (346) 257-1588', cash: 'Cash (pay in person)' };
  const opt = document.getElementById('booking-service').options[document.getElementById('booking-service').selectedIndex];
  const price = opt?.dataset?.price || '';
  const emailSubject = encodeURIComponent(`Booking Request – ${service} – ${name}`);
  const emailBody = encodeURIComponent(
    `Hi Beauty Affairs!\n\n` +
    `I'd like to book an appointment. Here are my details:\n\n` +
    `Service: ${service}\n` +
    `Preferred Date: ${dateFormatted}\n` +
    `Preferred Time: ${selectedTime}\n` +
    `Payment Method: ${payLabelsEmail[selectedPayment]}\n` +
    `Estimated Price: $${price}+\n\n` +
    `Name: ${name}\n` +
    `Email: ${document.getElementById('booking-email').value}\n` +
    `Phone: ${document.getElementById('booking-phone').value}\n` +
    (document.getElementById('booking-notes').value ? `Notes: ${document.getElementById('booking-notes').value}\n` : '') +
    `\nPlease confirm my appointment. Thank you!`
  );
  // Build plain text email body for copying
  const plainBody = `Hi Beauty Affairs!\n\nI'd like to book an appointment. Here are my details:\n\nService: ${service}\nPreferred Date: ${dateFormatted}\nPreferred Time: ${selectedTime}\nPayment Method: ${payLabelsEmail[selectedPayment]}\nEstimated Price: $${price}+\n\nName: ${name}\nEmail: ${document.getElementById('booking-email').value}\nPhone: ${document.getElementById('booking-phone').value}\n${document.getElementById('booking-notes').value ? 'Notes: ' + document.getElementById('booking-notes').value + '\n' : ''}\nPlease confirm my appointment. Thank you!`;

  // Try mailto - works on mobile, may not on desktop
  const mailtoUrl = `mailto:hello@affairsofbeauty.com?subject=${emailSubject}&body=${emailBody}`;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    window.location.href = mailtoUrl;
  }

  // Show confirmation
  const modal = document.getElementById('booking-step-4');
  modal.innerHTML = `
    <div class="text-center py-4">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h3 class="font-serif text-2xl text-[#2D2D2D] font-bold mb-2">Booking Request Ready! 🎉</h3>
      <p class="text-gray-600 mb-4">Thank you, <strong>${name}</strong>!</p>
      <div class="bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm mb-4">
        <div class="flex justify-between"><span class="text-gray-500">Service:</span><span class="font-medium text-[#2D2D2D]">${service}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Date:</span><span class="font-medium text-[#2D2D2D]">${dateFormatted}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Time:</span><span class="font-medium text-[#2D2D2D]">${selectedTime}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Payment:</span><span class="font-medium text-[#2D2D2D]">${payLabels[selectedPayment]}</span></div>
      </div>
      ${selectedPayment === 'zelle' ? '<div class="bg-pink-50 rounded-xl p-4 text-sm mb-4"><p class="font-medium text-gray-900">Send your $30 deposit via Zelle to:</p><p class="text-xl font-bold text-[#2D2D2D] mt-1">(346) 257-1588</p></div>' : ''}
      ${selectedPayment === 'cash' ? '<div class="bg-yellow-50 rounded-xl p-4 text-sm mb-4"><p class="font-medium text-yellow-900">Full payment in cash is due at your appointment.</p></div>' : ''}
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left mb-3">
        <p class="text-sm font-semibold text-[#2D2D2D] mb-2">📧 Send your booking to: <strong>hello@affairsofbeauty.com</strong></p>
        <div class="flex gap-2">
          <a href="${mailtoUrl}" class="flex-1 flex items-center justify-center gap-2 bg-[#2D2D2D] hover:bg-[#1A1A1A] text-white py-2.5 px-4 rounded-full text-sm font-semibold transition-all">
            Open Email App
          </a>
          <button onclick="copyBookingEmail()" id="copy-booking-btn" class="flex-1 flex items-center justify-center gap-2 bg-[#F2B5C8] hover:bg-[#E09DB5] text-[#2D2D2D] py-2.5 px-4 rounded-full text-sm font-semibold transition-all">
            📋 Copy Email Text
          </button>
        </div>
      </div>
      <p class="text-xs text-gray-400">Paste into Gmail, Outlook, or any email app and send to <strong>hello@affairsofbeauty.com</strong></p>
    </div>
  `;

  // Store plain body for copy function
  window._bookingEmailText = plainBody.replace(/\\n/g, '\n');
  window._bookingEmailSubject = decodeURIComponent(emailSubject);
  // Hide back/confirm, show close
  document.getElementById('booking-back-btn').classList.add('hidden');
  document.getElementById('booking-pay-btn').innerHTML = '<span>Close</span>';
  document.getElementById('booking-pay-btn').onclick = function() { closeBookingModal(); location.reload(); };
}

function copyBookingEmail() {
  const text = `Subject: ${window._bookingEmailSubject}\nTo: hello@affairsofbeauty.com\n\n${window._bookingEmailText}`;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-booking-btn');
    btn.innerHTML = '✅ Copied!';
    setTimeout(() => { btn.innerHTML = '📋 Copy Email Text'; }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const btn = document.getElementById('copy-booking-btn');
    btn.innerHTML = '✅ Copied!';
    setTimeout(() => { btn.innerHTML = '📋 Copy Email Text'; }, 2000);
  });
}

function buildBookingMailto() {
  const service = document.getElementById('booking-service').value;
  const stylist = document.getElementById('booking-stylist').value;
  const dateVal = document.getElementById('booking-date').value;
  const name = document.getElementById('booking-name').value;
  const phone = document.getElementById('booking-phone').value;
  const notes = document.getElementById('booking-notes').value;
  const dateFormatted = dateVal ? new Date(dateVal + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const subject = encodeURIComponent(`Booking Request – ${service}`);
  const body = encodeURIComponent(
    `Hi Beauty Affairs!\n\nI'd like to book an appointment:\n\n` +
    `Service: ${service}\nStylist: ${stylist}\nPreferred Date: ${dateFormatted}\nPreferred Time: ${selectedTime}\n\n` +
    `Name: ${name}\nPhone: ${phone}\n` +
    (notes ? `Notes: ${notes}\n` : '') +
    `\nPlease confirm availability. Thank you!`
  );
  return `mailto:hello@affairsofbeauty.com?subject=${subject}&body=${body}`;
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
    closeBookingModal();
  }
  if (!document.getElementById('lightbox').classList.contains('hidden')) {
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
  }
});

// ===== INITIALIZE =====
renderGallery();
renderTestimonials();