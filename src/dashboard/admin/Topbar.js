import { createIcons, icons } from 'lucide';
import { toggleTheme } from '../../components/Navbar.js';

/**
 * Hostlab Admin Topbar Component
 * Always black background, dimmed border lines.
 * Contains Mobile Hamburger Toggle, Search, and Theme Switcher.
 */
export function getTopbarHTML() {
  return `
    <header class="h-20 shrink-0 border-b border-zinc-900 bg-black text-white px-4 sm:px-8 flex items-center justify-between select-none">
      
      <!-- Left: Mobile Sidebar Hamburger Toggle -->
      <div class="flex items-center gap-3">
        <button 
          type="button" 
          id="mobile-sidebar-toggle-btn"
          class="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-zinc-900 cursor-pointer"
          aria-label="Open sidebar"
        >
          <i data-lucide="menu" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Right: Clean Search & Theme Switcher -->
      <div class="flex items-center gap-2 sm:gap-4">
        
        <!-- Search Input -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <i data-lucide="search" class="w-4 h-4"></i>
          </div>
          <input 
            type="text" 
            id="admin-quick-search"
            placeholder="Search" 
            class="w-36 sm:w-64 pl-10 pr-3 sm:pr-4 py-2 text-sm bg-zinc-950 border border-zinc-900 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>

        <!-- Dark / Light Mode Toggle -->
        <button 
          type="button" 
          id="theme-toggle-btn"
          class="p-2 sm:p-2.5 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-zinc-900 cursor-pointer"
          aria-label="Toggle theme"
        >
          <i data-lucide="sun" class="w-5 h-5 hidden dark:block"></i>
          <i data-lucide="moon" class="w-5 h-5 block dark:hidden"></i>
        </button>

      </div>

    </header>
  `;
}

/**
 * Attaches topbar event handlers
 */
export function setupTopbarEvents(onToggleMobile) {
  createIcons({ icons });

  const mobileToggle = document.getElementById('mobile-sidebar-toggle-btn');
  if (mobileToggle && onToggleMobile) {
    mobileToggle.addEventListener('click', () => {
      onToggleMobile();
    });
  }

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }
}
