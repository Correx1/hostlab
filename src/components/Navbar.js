import { createIcons, icons } from 'lucide';

/**
 * Initializes and handles theme switching (Dark/Light mode)
 */
export function initTheme() {
  const savedTheme = localStorage.getItem('hostlab-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
}

/**
 * Toggles dark/light mode and persists preference
 */
export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('hostlab-theme', isDark ? 'dark' : 'light');
  createIcons({ icons });
}

/**
 * Generates the Clean Reusable Navbar HTML Template - Spacious & Professional
 */
export function getNavbarHTML() {
  return `
    <header class="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-150">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="flex items-center justify-between h-24">
          
          <!-- Left: Logo & Nav Links -->
          <div class="flex items-center gap-10 lg:gap-14">
            <!-- Brand Logo Mark -->
            <a href="/" class="flex items-center gap-3.5 text-zinc-900 dark:text-white group" aria-label="Hostlab Home">
              <svg class="w-8 h-8 text-zinc-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </a>

            <!-- Navigation Links -->
            <nav class="hidden lg:flex items-center gap-8 xl:gap-10 text-base font-semibold text-zinc-800 dark:text-zinc-200">
              <a href="/hosting.html" class="hover:text-black dark:hover:text-white transition-colors">
                Hosting
              </a>
              <a href="/vps-hosting.html" class="hover:text-black dark:hover:text-white transition-colors">
                VPS Hosting
              </a>
              <a href="/domains.html" class="hover:text-black dark:hover:text-white transition-colors">
                Domains
              </a>
              <a href="/business-email.html" class="hover:text-black dark:hover:text-white transition-colors">
                Business Email
              </a>
            </nav>
          </div>

          <!-- Right Action Items -->
          <div class="flex items-center gap-6">
            
            <!-- Dark / Light Mode Toggle Button -->
            <button 
              type="button" 
              id="theme-toggle-btn"
              class="p-2 text-zinc-700 hover:text-black dark:text-white dark:hover:text-zinc-300 transition-colors"
              aria-label="Toggle theme"
            >
              <i data-lucide="sun" class="w-6 h-6 hidden dark:block"></i>
              <i data-lucide="moon" class="w-6 h-6 block dark:hidden"></i>
            </button>

            <!-- CTA: Get started Button with Arrow Icon -->
            <a 
              href="/admin.html" 
              class="btn-primary"
            >
              <span>Get started</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>

            <!-- Mobile Hamburger Button -->
            <button 
              type="button" 
              id="mobile-menu-btn"
              class="lg:hidden p-2 text-zinc-800 dark:text-white hover:text-black dark:hover:text-zinc-300"
              aria-label="Toggle mobile menu"
            >
              <i data-lucide="menu" id="menu-icon-open" class="w-7 h-7 block"></i>
              <i data-lucide="x" id="menu-icon-close" class="w-7 h-7 hidden"></i>
            </button>

          </div>

        </div>
      </div>

      <!-- Mobile Menu Panel -->
      <div 
        id="mobile-menu-panel" 
        class="hidden lg:hidden border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black px-6 py-4 space-y-3 text-base"
      >
        <a href="/hosting.html" class="block py-2 text-zinc-800 dark:text-white hover:text-black dark:hover:text-zinc-300">Hosting</a>
        <a href="/vps-hosting.html" class="block py-2 text-zinc-800 dark:text-white hover:text-black dark:hover:text-zinc-300">VPS Hosting</a>
        <a href="/domains.html" class="block py-2 text-zinc-800 dark:text-white hover:text-black dark:hover:text-zinc-300">Domains</a>
        <a href="/business-email.html" class="block py-2 text-zinc-800 dark:text-white hover:text-black dark:hover:text-zinc-300">Business Email</a>
      </div>
    </header>
  `;
}

/**
 * Attaches event handlers for the Navbar
 */
export function setupNavbarEvents() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }

  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobilePanel = document.getElementById('mobile-menu-panel');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileBtn && mobilePanel) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobilePanel.classList.toggle('hidden');
      if (menuIconOpen && menuIconClose) {
        menuIconOpen.classList.toggle('hidden', !isHidden);
        menuIconClose.classList.toggle('hidden', isHidden);
      }
    });

    const mobileLinks = mobilePanel.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobilePanel.classList.add('hidden');
        if (menuIconOpen && menuIconClose) {
          menuIconOpen.classList.remove('hidden');
          menuIconClose.classList.add('hidden');
        }
      });
    });
  }

  createIcons({ icons });
}

/**
 * Helper to mount Navbar into any container
 */
export function mountNavbar(containerId = '#navbar-root') {
  const container = typeof containerId === 'string' 
    ? document.querySelector(containerId) 
    : containerId;
    
  if (!container) return;
  container.innerHTML = getNavbarHTML();
  setupNavbarEvents();
}
