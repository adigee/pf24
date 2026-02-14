/* ===================================
   PORTFOLIO JAVASCRIPT
   Interactive functionality
   =================================== */

// === THEME MANAGEMENT ===

/**
 * Get the system's preferred color scheme
 * @returns {string} 'light' or 'dark'
 */
function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

/**
 * Get the saved theme from localStorage
 * @returns {string|null} 'light', 'dark', or null if not set
 */
function getSavedTheme() {
  return localStorage.getItem('theme');
}

/**
 * Set the theme on the html element and save to localStorage
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

/**
 * Initialize the theme on page load
 */
function initializeTheme() {
  // Get saved theme or fall back to system preference
  const savedTheme = getSavedTheme();
  const initialTheme = savedTheme || getSystemTheme();

  // Apply theme immediately (before page renders to prevent flash)
  setTheme(initialTheme);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

/**
 * Setup theme toggle button
 */
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

/**
 * Listen for system theme changes
 */
function setupSystemThemeListener() {
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    // Only update if user hasn't manually set a preference
    mediaQuery.addEventListener('change', (e) => {
      if (!getSavedTheme()) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
}

// === EMAIL COPY FUNCTIONALITY ===

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text) {
  // Try modern clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy using Clipboard API:', err);
    }
  }

  // Fallback for older browsers
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy using fallback:', err);
    return false;
  }
}

/**
 * Show visual feedback when email is copied
 * @param {HTMLElement} button - The button element
 */
function showCopyFeedback(button) {
  const originalText = button.textContent;
  button.textContent = 'Copied! ✓';
  button.style.backgroundColor = 'var(--color-accent-green)';
  button.style.color = 'var(--color-bg-primary)';

  // Reset after 2 seconds
  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = '';
    button.style.color = '';
  }, 2000);
}

/**
 * Setup email copy button
 */
function setupEmailButton() {
  const emailButton = document.getElementById('email-button');

  if (emailButton) {
    emailButton.addEventListener('click', async () => {
      const email = 'aditya.gujaran@gmail.com';
      const success = await copyToClipboard(email);

      if (success) {
        showCopyFeedback(emailButton);
      } else {
        alert('Failed to copy email. Please copy manually: ' + email);
      }
    });
  }
}

// === SCROLL TO TOP FUNCTIONALITY ===

/**
 * Smooth scroll to top of page
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * Setup scroll to top button
 */
function setupScrollButton() {
  const scrollButton = document.getElementById('scroll-top');

  if (scrollButton) {
    scrollButton.addEventListener('click', scrollToTop);
  }
}

/**
 * Optional: Show/hide scroll button based on scroll position
 * Uncomment if you want this functionality
 */
/*
function toggleScrollButtonVisibility() {
  const scrollButton = document.getElementById('scroll-top');

  if (scrollButton) {
    if (window.scrollY > 500) {
      scrollButton.style.display = 'flex';
    } else {
      scrollButton.style.display = 'none';
    }
  }
}

function setupScrollVisibility() {
  // Initial check
  toggleScrollButtonVisibility();

  // Check on scroll (with passive listener for better performance)
  window.addEventListener('scroll', toggleScrollButtonVisibility, { passive: true });
}
*/

// === SHARED FOOTER ===

/**
 * Load the shared footer from components/footer.html and inject into #footer-container.
 * Base path is detected so it works from root and from projects/ subfolder.
 * @returns {Promise<void>}
 */
function loadFooter() {
  const container = document.getElementById('footer-container');
  if (!container) return Promise.resolve();

  const base = window.location.pathname.indexOf('/projects/') !== -1 ? '../' : '';
  const url = base + 'components/footer.html';

  return fetch(url)
    .then(function (res) { return res.text(); })
    .then(function (html) {
      container.innerHTML = html;
    })
    .catch(function () {
      container.innerHTML = '<footer class="footer"><div class="container"><p class="copyright">©2025 Aditya Gujaran</p></div></footer>';
    });
}

// === INITIALIZATION ===

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
  // Initialize theme first (before page fully renders)
  initializeTheme();

  // Load shared footer, then setup interactive features (scroll button lives in footer)
  loadFooter().then(function () {
    setupThemeToggle();
    setupSystemThemeListener();
    setupEmailButton();
    setupScrollButton();

    // Optional: Setup scroll button visibility
    // setupScrollVisibility();

    console.log('Portfolio initialized successfully');
  });
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM is already ready
  init();
}

// === PERFORMANCE OPTIMIZATION ===

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Example usage for scroll events:
// window.addEventListener('scroll', debounce(yourScrollHandler, 100), { passive: true });
