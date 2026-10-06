import { renderUserOverview } from './overview.js';
import { renderUserHosting, setupHostingEvents } from './hosting.js';
import { renderUserVPS, setupVPSEvents } from './vps.js';
import { renderUserDomains, setupDomainsEvents } from './domains.js';
import { renderUserEmail, setupEmailEvents } from './email.js';
import { renderUserBilling, setupBillingEvents } from './billing.js';
import { renderUserTickets, setupTicketsEvents } from './tickets.js';
import { renderUserSettings, setupSettingsEvents } from './settings.js';
import { renderUserProfile, setupProfileEvents } from './profile.js';
import { createIcons, icons } from 'lucide';

/**
 * Customer Module Router
 * Dispatches to individual customer modules one-by-one.
 */
export function renderModuleContent(activeParent = 'overview', activeSub = null) {
  switch (activeParent) {
    case 'overview':
      return renderUserOverview();

    case 'hosting':
      return renderUserHosting();

    case 'vps':
      return renderUserVPS();

    case 'domains':
      return renderUserDomains();

    case 'email':
      return renderUserEmail();

    case 'billing':
      return renderUserBilling();

    case 'tickets':
      return renderUserTickets();

    case 'settings':
      return renderUserSettings();

    case 'profile':
      return renderUserProfile();

    default:
      // Clean placeholder for modules queued in sequence
      return `
        <div class="max-w-2xl mx-auto py-8 px-4">
          <div class="p-6 rounded-lg bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
            <div class="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center mx-auto">
              <i data-lucide="layers" class="w-6 h-6"></i>
            </div>
            <h2 class="text-xl font-bold font-display text-zinc-900 dark:text-white capitalize">
              ${activeParent.replace('-', ' ')} Module
            </h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
              This module is next in our implementation sequence. The database and route bindings are prepared and ready to be built.
            </p>
            <div class="pt-4 flex items-center justify-center gap-3">
              <button 
                type="button" 
                data-route-parent="overview"
                class="px-4 py-2 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                ← Back to Overview
              </button>
            </div>
          </div>
        </div>
      `;
  }
}

export function setupModuleEvents(navState, onNavigate, onRerender) {
  const contentRoot = document.getElementById('user-content-root');
  if (!contentRoot) return;

  // Handle in-content route buttons (e.g. data-route-parent="hosting")
  const routeButtons = contentRoot.querySelectorAll('[data-route-parent]');
  routeButtons.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const parent = btn.getAttribute('data-route-parent');
      const sub = btn.getAttribute('data-route-sub') || null;

      onNavigate({
        ...navState,
        activeParent: parent,
        activeSub: sub,
        isMobileOpen: false
      });
    };
  });

  // Setup module-specific events
  if (navState.activeParent === 'hosting') {
    setupHostingEvents(onRerender);
  } else if (navState.activeParent === 'vps') {
    setupVPSEvents(onRerender);
  } else if (navState.activeParent === 'domains') {
    setupDomainsEvents(onRerender);
  } else if (navState.activeParent === 'email') {
    setupEmailEvents(onRerender);
  } else if (navState.activeParent === 'billing') {
    setupBillingEvents(onRerender);
  } else if (navState.activeParent === 'tickets') {
    setupTicketsEvents(onRerender);
  } else if (navState.activeParent === 'settings') {
    setupSettingsEvents(onRerender);
  } else if (navState.activeParent === 'profile') {
    setupProfileEvents(onRerender);
  }

  createIcons({ icons });
}
