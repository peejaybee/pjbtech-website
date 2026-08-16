document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileNavToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link (especially useful for hash links or during transition)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active Navigation Link Highlight
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === pageName || (pageName === 'index.html' && linkPage === './') || (pageName === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Intersection Observer for Scroll Animations
  const animatableElements = document.querySelectorAll('.fade-in-scroll');
  if ('IntersectionObserver' in window && animatableElements.length > 0) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once animated, no need to track it anymore
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null, // viewport
      rootMargin: '0px 0px -50px 0px', // trigger slightly before entering viewport
      threshold: 0.1
    });

    animatableElements.forEach(element => {
      animationObserver.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    animatableElements.forEach(element => {
      element.classList.add('visible');
    });
  }

  // Contact Form Submission Handling
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success');
  const successCloseBtn = document.getElementById('success-close-btn');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation check
      let isValid = true;
      const requiredInputs = contactForm.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });

      if (isValid) {
        // Collect form data
        const formData = new FormData(contactForm);
        const dataObj = {};
        formData.forEach((value, key) => {
          dataObj[key] = value;
        });
        
        console.log('Form submission received:', dataObj);
        
        // Show animated success overlay
        formSuccess.classList.add('show');
        
        // Reset form
        contactForm.reset();
      }
    });

    if (successCloseBtn) {
      successCloseBtn.addEventListener('click', () => {
        formSuccess.classList.remove('show');
      });
    }

    // Autofill service from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const serviceSelect = document.getElementById('service-select');
    if (serviceParam && serviceSelect) {
      serviceSelect.value = serviceParam;
    }
  }

  // FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // Services Filter (All / Residential / Commercial)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceGroups = document.querySelectorAll('.services-group');

  if (filterButtons.length > 0 && serviceGroups.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        serviceGroups.forEach(group => {
          if (filterValue === 'all') {
            group.style.display = 'block';
            // Trigger animation for layout shift
            setTimeout(() => {
              group.style.opacity = '1';
              group.style.transform = 'translateY(0)';
            }, 50);
          } else {
            const groupId = group.getAttribute('id');
            if (groupId === filterValue) {
              group.style.display = 'block';
              setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
              }, 50);
            } else {
              group.style.opacity = '0';
              group.style.transform = 'translateY(15px)';
              group.style.display = 'none';
            }
          }
        });
      });
    });
  }
});
