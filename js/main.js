/**
 * ============================================
 * MAIN JAVASCRIPT - MyONG Platform
 * Funcionalidades gerais da plataforma
 * ============================================
 */

(function() {
  'use strict';

  // ===== MOBILE MENU TOGGLE =====
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  const body = document.body;

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Toggle aria-expanded
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle navigation
      nav.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (!isExpanded) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close menu when clicking nav links (except dropdown toggles)
    const navLinks = nav.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });

    // Handle dropdown toggle in mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        // Only toggle dropdown on mobile
        if (window.innerWidth <= 1023) {
          e.preventDefault();
          const parentItem = this.closest('.nav-item.has-dropdown');
          parentItem.classList.toggle('active');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = nav.contains(event.target) || mobileMenuToggle.contains(event.target);
      
      if (!isClickInside && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow when scrolled
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });

  // ===== REGISTRATION TYPE SELECTOR =====
  const selectorBtns = document.querySelectorAll('.selector-btn');
  const registrationForms = document.querySelectorAll('.registration-form');

  if (selectorBtns.length > 0) {
    selectorBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        
        // Update active button
        selectorBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding form
        registrationForms.forEach(form => {
          if (form.getAttribute('data-form') === type) {
            form.classList.add('active');
          } else {
            form.classList.remove('active');
          }
        });
      });
    });
  }

  // ===== PROJECTS FILTER =====
  const filterBtn = document.getElementById('filterBtn');
  const searchInput = document.getElementById('search');
  const categorySelect = document.getElementById('category');
  const locationSelect = document.getElementById('location');

  if (filterBtn) {
    filterBtn.addEventListener('click', function() {
      filterProjects();
    });
  }

  // Filter on Enter key in search input
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        filterProjects();
      }
    });
  }

  function filterProjects() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const categoryValue = categorySelect ? categorySelect.value : '';
    const locationValue = locationSelect ? locationSelect.value : '';
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
      const ong = card.querySelector('.project-ong')?.textContent.toLowerCase() || '';
      const badge = card.querySelector('.project-badge')?.textContent.toLowerCase() || '';
      const location = card.querySelector('.project-location')?.textContent.toLowerCase() || '';
      
      const matchesSearch = searchTerm === '' || title.includes(searchTerm) || ong.includes(searchTerm);
      const matchesCategory = categoryValue === '' || badge.includes(categoryValue.replace('-', ' '));
      const matchesLocation = locationValue === '' || location.includes(locationValue);
      
      if (matchesSearch && matchesCategory && matchesLocation) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ===== ANIMATE STATS ON SCROLL =====
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  if (statNumbers.length > 0) {
    const statsSection = document.querySelector('.statistics');
    
    const observerOptions = {
      threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          animateStats();
          statsAnimated = true;
        }
      });
    }, observerOptions);
    
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  function animateStats() {
    statNumbers.forEach(stat => {
      const finalValue = stat.textContent;
      const numericValue = parseInt(finalValue.replace(/\D/g, ''));
      
      if (!isNaN(numericValue)) {
        let currentValue = 0;
        const increment = numericValue / 50;
        const suffix = finalValue.replace(/[\d,]/g, '').trim();
        
        const counter = setInterval(() => {
          currentValue += increment;
          
          if (currentValue >= numericValue) {
            stat.textContent = finalValue;
            clearInterval(counter);
          } else {
            const displayValue = Math.floor(currentValue);
            stat.textContent = displayValue.toLocaleString('pt-BR') + suffix;
          }
        }, 30);
      }
    });
  }

  // ===== LAZY LOADING IMAGES =====
  const images = document.querySelectorAll('img[data-src]');
  
  if (images.length > 0 && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // ===== ANIMATE ELEMENTS ON SCROLL =====
  const animateElements = document.querySelectorAll('.feature-card, .project-card');
  
  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    const animateObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            entry.target.style.transition = 'all 0.6s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
          
          animateObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    animateElements.forEach(element => animateObserver.observe(element));
  }

  // ===== ALERT CLOSE FUNCTIONALITY =====
  const alertCloseButtons = document.querySelectorAll('.alert-close');
  
  alertCloseButtons.forEach(button => {
    button.addEventListener('click', function() {
      const alert = this.closest('.alert');
      if (alert) {
        alert.style.transition = 'all 0.3s ease';
        alert.style.opacity = '0';
        alert.style.transform = 'translateX(20px)';
        setTimeout(() => {
          alert.remove();
        }, 300);
      }
    });
  });

  // ===== TOAST NOTIFICATION SYSTEM =====
  window.showToast = function(title, message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">×</button>
    `;

    toastContainer.appendChild(toast);

    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  };

  // Add slideOutRight animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ===== TAG CLOSE FUNCTIONALITY =====
  const tagCloseButtons = document.querySelectorAll('.tag-close');
  
  tagCloseButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const tag = this.closest('.tag');
      if (tag) {
        tag.style.transition = 'all 0.3s ease';
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        setTimeout(() => {
          tag.remove();
        }, 300);
      }
    });
  });

  // ===== CONSOLE MESSAGE =====
  console.log('%cMyONG Platform', 'color: #2E8B57; font-size: 24px; font-weight: bold;');
  console.log('%cTransformando vidas através da solidariedade', 'color: #FF6B35; font-size: 14px;');
  console.log('%cVersão 1.0.0', 'color: #666; font-size: 12px;');

})();
