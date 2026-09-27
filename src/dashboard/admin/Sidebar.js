import { createIcons, icons } from 'lucide';

/**
 * Hostlab Admin Sidebar Component
 * Complete Cloud Infrastructure Console navigation with single-accordion toggle.
 * When one menu opens, others close. No badge numbers.
 */
export function getSidebarHTML(activeParent = 'overview', activeSub = null, openParents = ['instances']) {
  const navStructure = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'layout-dashboard',
      submenus: []
    },
    {
      id: 'hosting',
      label: 'Hosting',
      icon: 'layers',
      submenus: [
        { id: 'hosting-sites', label: 'Web Hosting' },
        { id: 'hosting-apps', label: 'Applications' },
        { id: 'hosting-ssl', label: 'SSL Certificates' },
      ]
    },
    {
      id: 'instances',
      label: 'VPS Instances',
      icon: 'server',
      submenus: [
        { id: 'vps-all', label: 'All Instances' },
        { id: 'vps-snapshots', label: 'Snapshots & Images' },
        { id: 'vps-ssh', label: 'SSH Keys' },
      ]
    },
    {
      id: 'domains',
      label: 'Domains & DNS',
      icon: 'globe',
      submenus: [
        { id: 'domains-registered', label: 'Registered Domains' },
        { id: 'domains-zones', label: 'DNS Zones' },
      ]
    },
    {
      id: 'email',
      label: 'Business Email',
      icon: 'mail',
      submenus: [
        { id: 'email-domains', label: 'Email Domains' },
        { id: 'email-mailboxes', label: 'Mailboxes' },
        { id: 'email-aliases', label: 'Aliases & Routing' },
        { id: 'email-deliverability', label: 'Deliverability' },
      ]
    },
    {
      id: 'migrations',
      label: 'Migrations',
      icon: 'arrow-left-right',
      submenus: [
        { id: 'migrations-queue', label: 'Migration Queue' },
        { id: 'migrations-cutover', label: 'DNS Cutover' },
      ]
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: 'users',
      submenus: []
    },
    {
      id: 'billing',
      label: 'Billing & Invoices',
      icon: 'credit-card',
      submenus: [
        { id: 'billing-invoices', label: 'Invoices' },
        { id: 'billing-subs', label: 'Subscriptions' },
        { id: 'billing-coupons', label: 'Coupons & Credits' },
        { id: 'billing-plans', label: 'Plans & Pricing' },
      ]
    },
    {
      id: 'tickets',
      label: 'Support Tickets',
      icon: 'life-buoy',
      submenus: []
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: 'megaphone',
      submenus: []
    },
    {
      id: 'logs',
      label: 'Activity Logs',
      icon: 'file-text',
      submenus: []
    },
    {
      id: 'system',
      label: 'System',
      icon: 'settings',
      submenus: [
        { id: 'system-roles', label: 'Staff & Roles' },
        { id: 'system-settings', label: 'Settings' },
      ]
    }
  ];

  return `
    <aside class="w-72 max-w-[85vw] h-full shrink-0 border-r border-zinc-900 bg-black text-white flex flex-col justify-between select-none">
      
      <!-- Top Section -->
      <div class="flex-1 flex flex-col min-h-0">
        
        <!-- Brand Header -->
        <div class="h-20 px-6 border-b border-zinc-900 flex items-center justify-between shrink-0">
          <a href="/admin.html" class="flex items-center gap-3 text-white group">
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

        <!-- Scrollable Navigation Area -->
        <div class="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          ${navStructure.map(item => {
            const hasSub = item.submenus.length > 0;
            const isParentActive = item.id === activeParent;
            const isOpen = (openParents || []).includes(item.id);

            return `
              <div class="space-y-1.5">
                <!-- Parent Nav Item (16px text-base) -->
                <div 
                  data-parent-id="${item.id}"
                  class="admin-parent-link flex items-center justify-between px-3.5 py-2.5 rounded-md text-base font-medium transition-all duration-150 cursor-pointer ${
                    isParentActive && !hasSub
                      ? 'bg-zinc-900 text-white font-semibold' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }"
                >
                  <div class="flex items-center gap-3.5 min-w-0">
                    <i data-lucide="${item.icon}" class="w-[18px] h-[18px] shrink-0 text-zinc-400"></i>
                    <span class="truncate">${item.label}</span>
                  </div>

                  ${hasSub ? `
                    <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-90 text-white' : ''}"></i>
                  ` : ''}
                </div>

                <!-- Submenu Accordion (14.5px) -->
                ${hasSub ? `
                  <div 
                    id="submenu-${item.id}" 
                    class="space-y-1 pl-4 ml-4 border-l border-zinc-900 ${isOpen ? 'block' : 'hidden'}"
                  >
                    ${item.submenus.map(sub => {
                      const isSubActive = sub.id === activeSub;
                      return `
                        <a 
                          href="#${sub.id}" 
                          data-sub-id="${sub.id}"
                          data-parent-id="${item.id}"
                          class="admin-sub-link flex items-center px-3 py-2 rounded text-[14.5px] transition-colors duration-150 ${
                            isSubActive 
                              ? 'text-white font-semibold bg-zinc-900/80' 
                              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                          }"
                        >
                          ${sub.label}
                        </a>
                      `;
                    }).join('')}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>

      </div>

      <!-- Bottom Profile: Name & Role -->
      <div class="p-5 border-t border-zinc-900 shrink-0">
        <div class="flex items-center gap-3 px-1 py-1">
          <div class="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs font-mono shrink-0">
            RC
          </div>
          <div class="min-w-0">
            <div class="text-xs font-semibold text-white leading-tight truncate">
              Raphael C.
            </div>
            <div class="text-[11px] font-mono text-zinc-500 truncate">
              Superadmin
            </div>
          </div>
        </div>
      </div>

    </aside>
  `;
}

/**
 * Attaches sidebar navigation click handlers with single-expand accordion
 */
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

  const parentLinks = document.querySelectorAll('.admin-parent-link');
  parentLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const parentId = link.getAttribute('data-parent-id');
      if (!parentId) return;

      const submenu = document.getElementById(`submenu-${parentId}`);
      if (submenu) {
        // When one is toggled open, close all others!
        const isCurrentlyOpen = (state.openParents || []).includes(parentId);
        const newOpen = isCurrentlyOpen ? [] : [parentId];

        if (onStateChange) {
          onStateChange({
            ...state,
            openParents: newOpen
          });
        }
      } else {
        // Direct link without submenu (e.g. Overview, Settings)
        if (onStateChange) {
          onStateChange({
            ...state,
            activeParent: parentId,
            activeSub: null,
            openParents: [],
            isMobileOpen: false
          });
        }
      }
    });
  });

  const subLinks = document.querySelectorAll('.admin-sub-link');
  subLinks.forEach(sub => {
    sub.addEventListener('click', (e) => {
      e.preventDefault();
      const parentId = sub.getAttribute('data-parent-id');
      const subId = sub.getAttribute('data-sub-id');

      if (onStateChange) {
        onStateChange({
          ...state,
          activeParent: parentId,
          activeSub: subId,
          openParents: [parentId],
          isMobileOpen: false
        });
      }
    });
  });
}
