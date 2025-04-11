// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  const navMenu = document.querySelector('.header__nav');
  
  if (mobileToggle && navMenu) {
    // Ensure the mobile toggle is properly initialized
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle navigation menu visibility
      navMenu.classList.toggle('active');
      
      // Toggle hamburger menu animation
      this.classList.toggle('active');
      
      // Update aria attributes
      const expanded = this.classList.contains('active');
      this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Set default to light mode on mobile
  function setLightModeOnMobile() {
    if (window.innerWidth <= 768) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      
      // If there's a toggle checkbox, uncheck it
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.checked = false;
      }
    }
  }
  
  // Set default to light mode on desktop too
  function setLightModeDefault() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    
    // If there's a toggle checkbox, uncheck it
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.checked = false;
    }
  }
  
  // Run on page load
  setLightModeOnMobile();
  setLightModeDefault();
  
  // Run on resize
  window.addEventListener('resize', setLightModeOnMobile);
});
