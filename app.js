// Shreyash Gupta Bioinformatics Portfolio JavaScript
// ===================================================
// All functionality: navigation, theme toggle, typewriter, skills chart, projects filtering, timeline accordion, contact form, code carousel.

// ------------------ Data ------------------
const portfolioData = {
  skills: [
    { name: 'Python', level: 90 },
    { name: 'R', level: 70 },
    { name: 'Bash / *nix', level: 65 },
    { name: 'SQL', level: 60 },
    { name: 'Deep Learning (PyTorch)', level: 75 },
    { name: 'Data Visualization (RShiny/Dash)', level: 80 },
    { name: 'Statistical Genomics', level: 85 }
  ],
  projects: [
    {
      name: 'Con-Fine',
      description: 'Python package for condtional analysis and fine-mapping of causal variants', 
      technologies: ['Python', 'FINEMAP', 'GCTA-COJO'],
      demo: 'https://github.com/Justice-Genetics-Lab/ConFine/blob/main/CON_FINE_demo.ipynb', 
      code: 'https://github.com/Justice-Genetics-Lab/ConFine.git'
    },
    {
      name: 'Google Search Symptom Trends Analysis',
      description: 'Exploratory analysis linking Google symptom searches with COVID-19 trends using correlation, clustering, and forecasting.',
      technologies: ['Python', 'Unsupervised Clustering', 'Epidemiological Forecasting'],
      demo: 'https://ritusinha128.github.io/CS8803_EPI/',
      code: 'https://github.com/Hanuphant/EPI-GoogleSymptom-Trends'
    },
    {
      name: 'RanCh RShiny App',
      description: 'Web tool for identifying transcription factor targets by integrating RNA-Seq and ChIP-Seq data.',
      technologies: ['R', 'Shiny', 'REST API'],
      demo: 'https://genapp2022.biosci.gatech.edu/team5/',
      code: 'https://github.com/Hanuphant/RanCh'
    },
    {
      name: 'Functional Annotation Pipeline',
      description: 'Automated genome assembly, gene prediction, and functional annotation for Salmonella isolates with Django webserver.',
      technologies: ['Python', 'Django', 'Bioinformatics'],
      demo: '#',
      code: 'https://github.com/Hanuphant/Functional_Annotation_Pipeline'
    }
  ]
};

// Palette from strict instructions
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// ------------------ Elements ------------------
let navbar, navbarLinks, mobileMenuToggle, navbarMenu, themeToggleBtn, typewriterEl, skillsChartCtx, projectsContainer, filterBtns, contactForm, successMsg, errorMsg;

// ------------- Initialize After DOM Ready -------------
document.addEventListener('DOMContentLoaded', () => {
  initializeElements();
  initTheme();
  initNavigation();
  initTypewriter();
  initSkillsChart();
  initProjectsGrid();
  initTimelineAccordion();
  initContactForm();
  initCodeCarousel();
  initScrollAnimations();
  initResume();
  initProfileImage();
});

// ---------------- Initialize Elements ----------------
function initializeElements() {
  navbar = document.getElementById('navbar');
  navbarLinks = document.querySelectorAll('.navbar-link');
  mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  navbarMenu = document.getElementById('navbar-menu');
  themeToggleBtn = document.getElementById('theme-toggle');
  typewriterEl = document.getElementById('typewriter');
  skillsChartCtx = document.getElementById('skillsChart');
  projectsContainer = document.getElementById('projects-container');
  filterBtns = document.querySelectorAll('.filter-btn');
  contactForm = document.getElementById('contact-form');
  successMsg = document.getElementById('form-success');
  errorMsg = document.getElementById('form-error');
}

// ---------------- Theme Toggle ----------------
function initTheme() {
  if (!themeToggleBtn) return;
  
  const html = document.documentElement;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply initial mode if not explicitly set
  if (!html.hasAttribute('data-color-scheme')) {
    html.setAttribute('data-color-scheme', systemPrefersDark ? 'dark' : 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-color-scheme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-color-scheme', newTheme);
    
    // Update theme toggle icon
    updateThemeToggleIcon(newTheme);
  });
  
  // Set initial icon
  updateThemeToggleIcon(html.getAttribute('data-color-scheme'));
}

function updateThemeToggleIcon(theme) {
  if (!themeToggleBtn) return;
  
  const sunIcon = `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
  </svg>`;
  
  const moonIcon = `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
  </svg>`;
  
  themeToggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
}

// ---------------- Navigation ----------------
function initNavigation() {
  if (!navbar) return;
  
  // Sticky style
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Smooth scrolling
  navbarLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const section = document.querySelector(targetId);
      if (section) {
        const offsetTop = section.offsetTop - 80; // account for fixed navbar
        window.scrollTo({ 
          top: Math.max(0, offsetTop), 
          behavior: 'smooth' 
        });
        // close mobile menu on selection
        if (navbarMenu && navbarMenu.classList.contains('show')) {
          toggleMobileMenu();
        }
      }
    });
  });

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarMenu && navbarMenu.classList.contains('show')) {
      toggleMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  if (!mobileMenuToggle || !navbarMenu) return;
  
  const expanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
  mobileMenuToggle.setAttribute('aria-expanded', !expanded);
  navbarMenu.classList.toggle('show');
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120; // offset for navbar height
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navbarLinks.forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

// ---------------- Typewriter ----------------
function initTypewriter() {
  if (!typewriterEl) return;
  
  const words = ['Statistical Genomics', 'Multi-Omics', 'Data Science'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const speed = 100;
  
  function type() {
    const currentWord = words[wordIndex];
    const visibleText = isDeleting 
      ? currentWord.substring(0, charIndex--) 
      : currentWord.substring(0, charIndex++);
    
    typewriterEl.textContent = visibleText;
    
    if (!isDeleting && charIndex === currentWord.length + 1) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    }
    
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    
    setTimeout(type, isDeleting ? speed / 2 : speed);
  }
  
  type();
}

// ---------------- Skills Chart ----------------
function initSkillsChart() {
  if (!skillsChartCtx) return;
  
  const labels = portfolioData.skills.map(s => s.name);
  const dataVals = portfolioData.skills.map(s => s.level);

  new Chart(skillsChartCtx.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: dataVals,
        backgroundColor: chartColors.slice(0, labels.length),
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { 
            label: ctx => `${ctx.label}: ${ctx.parsed.x}%` 
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: val => val + '%',
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim()
          },
          grid: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
          }
        },
        y: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
          },
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// ---------------- Projects Grid & Filtering ----------------
function initProjectsGrid() {
  if (!projectsContainer) return;
  
  renderProjects(portfolioData.projects);
  
  // Initialize MixItUp if available
  if (typeof mixitup !== 'undefined') {
    const mixer = mixitup(projectsContainer, {
      selectors: { target: '.mix' },
      animation: { duration: 400 }
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        mixer.filter(filter === 'all' ? 'all' : '.' + filter);
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  } else {
    // Fallback filtering without MixItUp
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterProjects(filter);
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
}

function renderProjects(projects) {
  if (!projectsContainer) return;
  
  projectsContainer.innerHTML = '';
  projects.forEach(project => {
    // Determine classes for filtering
    const classes = ['mix', 'bioinformatics'];
    project.technologies.forEach(tech => {
      const key = tech.toLowerCase().replace(/[^a-z0-9]/g, '');
      classes.push(key);
    });
    
    // Create card
    // <h3 class="project-title">${project.name}</h3>
    const card = document.createElement('div');
    card.className = classes.join(' ');
    card.innerHTML = `
      <div class="project-card">
        <div class="project-image">
          <div class="project-placeholder">${project.name}</div>
        </div>
        <div class="project-content">
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.code}" class="project-link" target="_blank" rel="noopener">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
          </div>
        </div>
      </div>
    `;
    projectsContainer.appendChild(card);
  });
}

function filterProjects(filter) {
  const projects = document.querySelectorAll('.mix');
  projects.forEach(project => {
    if (filter === 'all' || project.classList.contains(filter)) {
      project.style.display = 'block';
      project.style.opacity = '1';
      project.style.transform = 'scale(1)';
    } else {
      project.style.display = 'none';
      project.style.opacity = '0';
      project.style.transform = 'scale(0.8)';
    }
  });
}

// ---------------- Timeline Accordion ----------------
function initTimelineAccordion() {
  const toggles = document.querySelectorAll('.timeline-toggle');
  toggles.forEach(toggle => {
    const controlsId = toggle.getAttribute('aria-controls');
    const details = document.getElementById(controlsId);
    
    if (details) {
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        const newExpanded = !expanded;
        
        toggle.setAttribute('aria-expanded', newExpanded);
        details.setAttribute('aria-hidden', !newExpanded);
        
        if (newExpanded) {
          details.classList.add('expanded');
        } else {
          details.classList.remove('expanded');
        }
      });
    }
  });
}

// ---------------- Contact Form ----------------
function initContactForm() {
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFormErrors();
    
    // Copy email to hidden _replyto field for Formspree
    const emailField = document.getElementById('email');
    const hiddenReplyTo = document.getElementById('hidden-replyto');
    if (emailField && hiddenReplyTo) {
      hiddenReplyTo.value = emailField.value;
    }
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    if (!validateForm(data)) return;

    // Disable button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    try {
      // Submit to Formspree
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        contactForm.reset();
        if (successMsg) {
          successMsg.classList.remove('hidden');
        }
        if (errorMsg) {
          errorMsg.classList.add('hidden');
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      if (successMsg) {
        successMsg.classList.add('hidden');
      }
      if (errorMsg) {
        errorMsg.classList.remove('hidden');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
      
      // Hide messages after 5 seconds
      setTimeout(() => {
        if (successMsg) successMsg.classList.add('hidden');
        if (errorMsg) errorMsg.classList.add('hidden');
      }, 5000);
    }
  });
}

function validateForm(data) {
  let valid = true;
  
  const showError = (id, msg) => {
    const input = document.getElementById(id);
    const err = document.getElementById(id + '-error');
    if (input && err) {
      err.textContent = msg;
      err.classList.add('show');
      input.classList.add('error');
    }
    valid = false;
  };
  
  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    showError('name', 'Please enter your name (at least 2 characters)');
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    showError('email', 'Please enter a valid email address');
  }
  
  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    showError('message', 'Message must be at least 10 characters long');
  }
  
  return valid;
}

function clearFormErrors() {
  document.querySelectorAll('.error-message').forEach(el => { 
    el.textContent = ''; 
    el.classList.remove('show'); 
  });
  document.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
}

// ---------------- Code Carousel ----------------
function initCodeCarousel() {
  // Initialize tiny-slider if available
  if (typeof tns !== 'undefined') {
    try {
      const slider = tns({
        container: '#code-slider',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        autoplayTimeout: 5000,
        controls: true,
        nav: true,
        navPosition: 'bottom',
        autoplayButtonOutput: false,
        mouseDrag: true,
        speed: 500,
        responsive: {
          640: {
            controls: false
          }
        }
      });
    } catch (error) {
      console.log('Tiny slider initialization failed:', error);
    }
  }
}

// ---------------- Scroll Animations ----------------
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Observe elements for animation
  const elementsToObserve = document.querySelectorAll('[data-aos="fade-up"], .stat, .project-card, .publication-item, .timeline-item');
  elementsToObserve.forEach(el => observer.observe(el));
}

// ---------------- Resume PDF Handling ----------------
function initResume() {
  // Simple function to handle any resume interactions if needed in the future
  console.log('Resume section initialized - simple download approach');
}

// ---------------- Profile Image Handling ----------------
function initProfileImage() {
  const profileImage = document.querySelector('.profile-image');
  const profileContainer = document.querySelector('.profile-image-container');
  
  if (profileImage && profileContainer) {
    profileImage.onerror = function() {
      console.log('Profile image failed to load, showing fallback');
      // Create fallback content
      profileContainer.innerHTML = `
        <div class="profile-fallback">
          <svg width="120" height="120" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      `;
      // Apply fallback styles
      profileContainer.style.display = 'flex';
      profileContainer.style.alignItems = 'center';
      profileContainer.style.justifyContent = 'center';
      profileContainer.style.color = 'var(--color-btn-primary-text)';
    };
    
    profileImage.onload = function() {
      console.log('Profile image loaded successfully');
    };
  }
}

// ---------------- Utility ----------------
// Debounce helper for performance
function debounce(fn, wait = 100) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('An error occurred:', e.error);
});

// Performance optimization for scroll events
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 10);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);