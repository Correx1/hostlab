import './style.css';
import { initTheme, mountNavbar } from './components/Navbar.js';
import { mountFooter } from './components/Footer.js';
import { createIcons, icons } from 'lucide';

// 1. Initialize Theme (Dark/Light mode)
initTheme();

// 2. Mount Reusable Header Navbar
mountNavbar('#navbar-root');

// 3. Mount Reusable Footer
mountFooter('#footer-root');

// 4. Setup Interactive Features Across All Pages
function setupSiteInteractions() {
  // --- A. Domain Search (Hero on index) ---
  const heroDomainForm = document.getElementById('hero-domain-form');
  const heroDomainInput = document.getElementById('hero-domain-input');
  const heroDomainResult = document.getElementById('hero-domain-result');
  if (heroDomainForm && heroDomainInput && heroDomainResult) {
    heroDomainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = heroDomainInput.value.trim();
      if (!val) return;
      heroDomainResult.classList.remove('hidden');
      heroDomainResult.className = 'block mt-4 p-3 rounded-sm text-xs font-mono border bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white';
      heroDomainResult.innerHTML = `✓ Domain <span class="font-bold underline">${val}</span> is available! <a href="/domains.html" class="ml-2 font-semibold underline">Register now →</a>`;
    });
  }

  // --- B. Domain Search (Section on index) ---
  const sectionDomainForm = document.getElementById('section-domain-form');
  const sectionDomainInput = document.getElementById('section-domain-input');
  const sectionDomainResult = document.getElementById('section-domain-result');
  if (sectionDomainForm && sectionDomainInput && sectionDomainResult) {
    sectionDomainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = sectionDomainInput.value.trim();
      if (!val) return;
      sectionDomainResult.classList.remove('hidden');
      sectionDomainResult.className = 'block mt-4 p-3.5 rounded-md text-xs sm:text-sm font-mono border bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white';
      sectionDomainResult.innerHTML = `✓ Domain <span class="font-bold underline">${val}</span> is available! <a href="/domains.html" class="ml-2 font-semibold underline">Claim now →</a>`;
    });
  }

  // --- C. Domain Search (Page on domains.html) ---
  const pageDomainForm = document.getElementById('domains-page-form');
  const pageDomainInput = document.getElementById('domains-page-input');
  const pageDomainResult = document.getElementById('domains-page-result');
  if (pageDomainForm && pageDomainInput && pageDomainResult) {
    pageDomainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = pageDomainInput.value.trim();
      if (!val) return;
      pageDomainResult.classList.remove('hidden');
      pageDomainResult.className = 'block mt-4 p-3.5 rounded-md text-xs sm:text-sm font-mono border bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white';
      pageDomainResult.innerHTML = `✓ Domain <span class="font-bold underline">${val}</span> is available! <a href="#plans" class="ml-2 font-semibold underline">Register now →</a>`;
    });
  }

  // --- D. Interactive Tabs (on index.html) ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        tabButtons.forEach(btn => {
          btn.classList.remove('bg-black', 'text-white', 'dark:bg-white', 'dark:text-black', 'shadow-sm');
          btn.classList.add('text-zinc-600', 'dark:text-zinc-400');
        });
        button.classList.add('bg-black', 'text-white', 'dark:bg-white', 'dark:text-black', 'shadow-sm');
        button.classList.remove('text-zinc-600', 'dark:text-zinc-400');

        tabPanes.forEach(pane => {
          if (pane.id === `tab-${targetTab}`) {
            pane.classList.remove('hidden');
          } else {
            pane.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- E. Contact Form Submission (on contact.html) ---
  const contactForm = document.getElementById('contact-form');
  const contactContainer = document.getElementById('contact-form-container');
  if (contactForm && contactContainer) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      const btnText = document.getElementById('btn-text');

      if (submitBtn && btnText) {
        submitBtn.setAttribute('disabled', 'true');
        btnText.textContent = 'Sending...';
      }

      setTimeout(() => {
        contactContainer.innerHTML = `
          <div class="py-12 px-8 border border-zinc-200 dark:border-zinc-800 rounded-md bg-zinc-50 dark:bg-zinc-950/60 space-y-4">
            <div class="w-10 h-10 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black flex items-center justify-center">
              <i data-lucide="check" class="w-5 h-5"></i>
            </div>
            <h3 class="text-xl font-bold font-display text-zinc-900 dark:text-white">
              Message sent
            </h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Thanks for reaching out. We have received your note and will get back to you shortly.
            </p>
          </div>
        `;
        createIcons({ icons });
      }, 400);
    });
  }

  // Render all Lucide Icons
  createIcons({ icons });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupSiteInteractions);
} else {
  setupSiteInteractions();
}
