// TALA Landing Page - Main JavaScript
// Implements Apple/Tesla-like smooth behaviors and animations

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Initialize header behavior
  initHeaderBehavior();
  
  // Initialize waitlist popup
  initWaitlistPopup();
});

// Animation on scroll
function initAnimations() {
  const animatedElements = document.querySelectorAll('.section-header, .feature-card, .climate-control__content, .safety__content, .portability__content, .cta__content');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('section-header')) {
          entry.target.classList.add('fade-in');
        } else if (entry.target.classList.contains('feature-card')) {
          entry.target.classList.add('slide-up');
          // Add delay for staggered animation
          entry.target.style.animationDelay = `${0.1 * Array.from(entry.target.parentNode.children).indexOf(entry.target)}s`;
        } else if (entry.target.classList.contains('climate-control__content')) {
          entry.target.querySelector('.climate-control__image').classList.add('slide-in-left');
          entry.target.querySelector('.climate-control__text').classList.add('slide-in-right');
        } else if (entry.target.classList.contains('safety__content')) {
          entry.target.querySelector('.safety__image').classList.add('slide-in-right');
          entry.target.querySelector('.safety__text').classList.add('slide-in-left');
        } else if (entry.target.classList.contains('portability__content')) {
          entry.target.querySelector('.portability__image').classList.add('slide-in-left');
          entry.target.querySelector('.portability__text').classList.add('slide-in-right');
        } else if (entry.target.classList.contains('cta__content')) {
          entry.target.classList.add('fade-in');
        }
        
        // Unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// Header behavior (transparent to solid on scroll)
function initHeaderBehavior() {
  const header = document.querySelector('.header');
  const heroSection = document.querySelector('.hero');
  
  if (!header || !heroSection) return;
  
  const heroHeight = heroSection.offsetHeight;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      header.style.boxShadow = 'none';
    }
  });
}

// Waitlist popup functionality
function initWaitlistPopup() {
  const popup = document.getElementById('waitlist-popup');
  const triggers = document.querySelectorAll('.waitlist-trigger');
  const closeBtn = document.querySelector('.popup__close');
  const overlay = document.querySelector('.popup__overlay');
  const form = document.getElementById('waitlist-form');
  const success = document.getElementById('waitlist-success');
  
  if (!popup || !triggers.length || !closeBtn || !overlay || !form || !success) return;
  
  // Open popup
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      popup.classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });
  
  // Close popup
  function closePopup() {
    popup.classList.remove('active');
    document.body.classList.remove('no-scroll');
    
    // Reset form after closing
    setTimeout(() => {
      if (form.style.display === 'none') {
        form.style.display = 'block';
        success.style.display = 'none';
      }
    }, 300);
  }
  
  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
      closePopup();
    }
  });
  
  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission with loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(function() {
      form.style.display = 'none';
      success.style.display = 'block';
      
      // Reset form for future use
      setTimeout(function() {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
      
      // Auto close after success (optional)
      setTimeout(closePopup, 3000);
    }, 1500);
  });
}
