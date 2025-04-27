// JavaScript for TheBestPhonePlans.com

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if(this.getAttribute('href') !== "#") {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Form validation for contact form
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      if (!contactForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      contactForm.classList.add('was-validated');
    });
  }

  // Add active class to current navigation item
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Check if the current path matches the nav link or starts with the nav link path for sub-pages
    if (currentLocation.endsWith(linkPath) || 
        (linkPath !== 'index.html' && currentLocation.includes(linkPath.replace('.html', '')))) {
      link.classList.add('active');
    } else if (link.classList.contains('active') && !currentLocation.endsWith('index.html') && linkPath !== 'index.html') {
      link.classList.remove('active');
    }
  });

  // Add animation to cards on scroll
  const animateOnScroll = function() {
    const cards = document.querySelectorAll('.carrier-card, .plan-card');
    
    cards.forEach(card => {
      const cardPosition = card.getBoundingClientRect();
      
      // Check if card is in viewport
      if(cardPosition.top < window.innerHeight && cardPosition.bottom >= 0) {
        card.classList.add('fade-in');
      }
    });
  };

  // Run animation check on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // Mobile carrier comparison functionality
  const compareButtons = document.querySelectorAll('.compare-btn');
  if (compareButtons.length > 0) {
    compareButtons.forEach(button => {
      button.addEventListener('click', function() {
        const carrierId = this.getAttribute('data-carrier');
        const isSelected = this.classList.contains('btn-primary');
        
        if (isSelected) {
          this.classList.replace('btn-primary', 'btn-outline-primary');
          this.textContent = 'Compare';
        } else {
          this.classList.replace('btn-outline-primary', 'btn-primary');
          this.textContent = 'Selected';
        }
        
        // Count selected carriers
        const selectedCount = document.querySelectorAll('.compare-btn.btn-primary').length;
        const compareNowBtn = document.getElementById('compareNowBtn');
        
        if (selectedCount >= 2) {
          compareNowBtn.classList.remove('disabled');
        } else {
          compareNowBtn.classList.add('disabled');
        }
      });
    });
  }
});