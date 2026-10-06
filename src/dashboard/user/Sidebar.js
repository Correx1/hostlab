import { customerUser } from './db.js';
import { createIcons, icons } from 'lucide';

export const userNavItems = [
  { id: 'overview', label: 'Overview', icon: 'layout-dashboard' },
  { id: 'hosting', label: 'Web Hosting', icon: 'layers' },
  { id: 'vps', label: 'Cloud VPS', icon: 'server' },
  { id: 'domains', label: 'Domains & DNS', icon: 'globe' },
  { id: 'email', label: 'Business Email', icon: 'mail' },
  { id: 'billing', label: 'Billing & Invoices', icon: 'credit-card' },
  { id: 'tickets', label: 'Support Tickets', icon: 'life-buoy' },
  { id: 'profile', label: 'My Profile', icon: 'user' },
  { id: 'settings', label: 'Account Settings', icon: 'settings' }
];

export function getSidebarHTML(activeParent = 'overview') {
  return `
    <aside class="w-72 max-w-[85vw] h-full shrink-0 border-r border-zinc-900 bg-black text-white flex flex-col justify-between select-none">
      
      <!-- Top Section -->
      <div class="flex-1 flex flex-col min-h-0">
        
        <!-- Brand Header (Exact Admin Style) -->
        <div class="h-20 px-6 border-b border-zinc-900 flex items-center justify-between shrink-0">
          <a href="/dashboard.html" class="flex items-center gap-3 text-white group">
            <svg class="w-7 h-7 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span class="font-bold text-base font-display tracking-tight text-white">
              HOSTLAB
            </span>
          </a>

          <!-- Mobile Close Button -->
          <button 
            type="button" 
            id="sidebar-mobile-close-btn"
            class="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Navigation Area (16px text-base) -->
        <div class="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          ${userNavItems.map(item => {
            const isActive = activeParent === item.id;
            return `
              <div 
                data-parent-id="${item.id}"
                class="flex items-center justify-between px-3.5 py-2.5 rounded-md text-base font-medium transition-all duration-150 cursor-pointer ${
                  isActive 
                    ? 'bg-zinc-900 text-white font-semibold' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }"
              >
                <div class="flex items-center gap-3.5 min-w-0">
                  <i data-lucide="${item.icon}" class="w-[18px] h-[18px] shrink-0 text-zinc-400"></i>
                  <span class="truncate">${item.label}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </div>

      <!-- Bottom Profile: Exact Admin Style -->
      <div class="p-5 border-t border-zinc-900 shrink-0">
        <div class="flex items-center justify-between gap-3 px-1 py-1">
          <div 
            data-parent-id="profile" 
            class="flex items-center gap-3 min-w-0 cursor-pointer p-1.5 -m-1.5 rounded-md hover:bg-zinc-900/80 transition-colors ${activeParent === 'profile' ? 'bg-zinc-900 text-white' : ''}"
            title="View My Profile"
          >
            <div class="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs font-mono shrink-0">
              AT
            </div>
            <div class="min-w-0">
              <div class="text-xs font-semibold text-white leading-tight truncate">
                ${customerUser.name}
              </div>
              <div class="text-[11px] font-mono text-zinc-500 truncate">
                ${customerUser.tier}
              </div>
            </div>
          </div>
          <a href="/admin.html" title="Switch to Admin Console" class="p-1 text-zinc-500 hover:text-white transition-colors shrink-0">
            <i data-lucide="shield" class="w-4 h-4"></i>
          </a>
        </div>
      </div>

    </aside>
  `;
}

export function setupSidebarEvents(state, onStateChange) {
  createIcons({ icons });

  // Mobile Close Button
  const closeBtn = document.getElementById('sidebar-mobile-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (onStateChange) {
        onStateChange({
          ...state,
          isMobileOpen: false
        });
      }
    });
  }

  // Backdrop click
  const backdrop = document.getElementById('user-sidebar-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      if (onStateChange) {
        onStateChange({
          ...state,
          isMobileOpen: false
        });
      }
    });
  }

  // Navigation Items click
  const navItems = document.querySelectorAll('[data-parent-id]');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const parentId = item.getAttribute('data-parent-id');
      if (onStateChange) {
        onStateChange({
          ...state,
          activeParent: parentId,
          activeSub: null,
          isMobileOpen: false
        });
      }
    });
  });
}
