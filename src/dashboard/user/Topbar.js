import { customerUser } from './db.js';
import { toggleTheme } from '../../components/Navbar.js';
import { createIcons, icons } from 'lucide';

/**
 * Hostlab Customer Topbar Component
 * Exact Admin styling: h-20 height, black background, zinc-900 borders, matching typography.
 */
export function getTopbarHTML() {
  return `
    <header class="h-20 shrink-0 border-b border-zinc-900 bg-black text-white px-4 sm:px-8 flex items-center justify-between select-none">
      
      <!-- Left: Mobile Sidebar Hamburger Toggle & Company Name -->
      <div class="flex items-center gap-4">
        <button 
          type="button" 
          id="mobile-sidebar-toggle-btn"
          class="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-zinc-900 cursor-pointer"
          aria-label="Open sidebar"
        >
          <i data-lucide="menu" class="w-5 h-5"></i>
        </button>

        <div class="flex items-center gap-2">
          <span class="text-base font-semibold text-white font-display tracking-tight">
            ${customerUser.company}
          </span>
        </div>
      </div>

      <!-- Right: Credits & Theme Switcher -->
      <div class="flex items-center gap-2 sm:gap-4">

        <!-- Account Balance -->
        <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-900 text-xs font-mono">
          <span class="text-zinc-500">Balance:</span>
          <span class="font-bold text-white">${customerUser.balance}</span>
        </div>

        <!-- User Profile Quick Chip -->
        <button 
          type="button" 
          id="topbar-profile-btn"
          class="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-zinc-800"
          title="My Profile"
        >
          <div class="w-6 h-6 rounded-full bg-white text-black font-bold text-[10px] font-mono flex items-center justify-center shrink-0">
            AT
          </div>
          <span class="hidden md:inline font-medium text-xs">${customerUser.name}</span>
        </button>

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

export function setupTopbarEvents(state, onToggleMobile, onNavigate) {
  createIcons({ icons });

  const toggleBtn = document.getElementById('mobile-sidebar-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (onToggleMobile) {
        onToggleMobile();
      }
    });
  }

  const profileBtn = document.getElementById('topbar-profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      if (onNavigate) {
        onNavigate({
          ...state,
          activeParent: 'profile',
          activeSub: null,
          isMobileOpen: false
        });
      }
    });
  }

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }
}
