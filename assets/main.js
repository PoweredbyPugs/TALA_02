// Main JavaScript for TALA Shopify Theme

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  const nav = document.querySelector('.header__nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
  
  // Dark mode toggle
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark-mode');
      themeToggle.checked = true;
    }
    
    // Toggle theme when switch is clicked
    themeToggle.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (nav && nav.classList.contains('active')) {
          mobileToggle.classList.remove('active');
          nav.classList.remove('active');
        }
      }
    });
  });
});
