import { createIcons, icons } from 'lucide';

/**
 * Hostlab Mailboxes Module
 * Dedicated standalone module for individual user inboxes, IMAP/SMTP credentials,
 * per-mailbox storage quotas, password management, and webmail session routing.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const mailboxStats = {
  totalMailboxes: 2840,
  activeMailboxes: 2816,
  quotaWarnings: 18,
  totalMessages: '14.2M',
  storageUsedTB: '18.4 TB',
  avgSpamScore: '0.04'
};

export const initialMailboxes = [
  {
    id: 'mbx-301',
    email: 'sarah@techflow-media.com',
    domain: 'techflow-media.com',
    displayName: 'Sarah Jenkins',
    storageUsedMB: 4200,
    storageLimitMB: 10000,
    messagesCount: 8420,
    autoResponder: false,
    lastLogin: '12 minutes ago',
    status: 'active' // active | warning | suspended
  },
  {
    id: 'mbx-302',
    email: 'info@techflow-media.com',
    domain: 'techflow-media.com',
    displayName: 'TechFlow General Info',
    storageUsedMB: 8900,
    storageLimitMB: 10000,
    messagesCount: 19400,
    autoResponder: true,
    lastLogin: '1 hour ago',
    status: 'warning'
  },
  {
    id: 'mbx-303',
    email: 'david@apexstudios.design',
    domain: 'apexstudios.design',
    displayName: 'David Vance',
    storageUsedMB: 18400,
    storageLimitMB: 25000,
    messagesCount: 14200,
    autoResponder: false,
    lastLogin: 'Just now',
    status: 'active'
  },
  {
    id: 'mbx-304',
    email: 'billing@apexstudios.design',
    domain: 'apexstudios.design',
    displayName: 'Apex Studios Finance',
    storageUsedMB: 6200,
    storageLimitMB: 15000,
    messagesCount: 4100,
    autoResponder: false,
    lastLogin: '3 hours ago',
    status: 'active'
  },
  {
    id: 'mbx-305',
    email: 'emma@greenleaf-organics.co.uk',
    domain: 'greenleaf-organics.co.uk',
    displayName: 'Emma Watson',
    storageUsedMB: 4800,
    storageLimitMB: 5000,
    messagesCount: 6800,
    autoResponder: false,
    lastLogin: 'Yesterday',
    status: 'warning'
  },
  {
    id: 'mbx-306',
    email: 'alex@cryptotrack-api.io',
    domain: 'cryptotrack-api.io',
    displayName: 'Alex Rivera',
    storageUsedMB: 1400,
    storageLimitMB: 10000,
    messagesCount: 2200,
    autoResponder: false,
    lastLogin: '4 days ago',
    status: 'active'
  },
  {
    id: 'mbx-307',
    email: 'marcus@novatech-solutions.ai',
    domain: 'novatech-solutions.ai',
    displayName: 'Marcus Brody',
    storageUsedMB: 9400,
    storageLimitMB: 25000,
    messagesCount: 11800,
    autoResponder: true,
    lastLogin: '32 minutes ago',
    status: 'active'
  },
  {
    id: 'mbx-308',
    email: 'felix@pulsecreative.de',
    domain: 'pulsecreative.de',
    displayName: 'Felix Weber',
    storageUsedMB: 5000,
    storageLimitMB: 5000,
    messagesCount: 8900,
    autoResponder: false,
    lastLogin: '14 days ago',
    status: 'suspended',
    suspendedReason: 'Mailbox Quota Full (100%)'
  }
];

// In-memory state
let mailboxesList = [...initialMailboxes];
let currentFilter = 'all'; // all | active | warning | suspended
let currentSearch = '';
let currentDomainFilter = 'all';

function getFilteredMailboxes() {
  return mailboxesList.filter(m => {
    if (currentFilter !== 'all' && m.status !== currentFilter) return false;
    if (currentDomainFilter !== 'all' && m.domain !== currentDomainFilter) return false;
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      return (
        m.email.toLowerCase().includes(q) ||
        m.displayName.toLowerCase().includes(q) ||
        m.domain.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

// ==========================================
// 2. VIEW TEMPLATES & COMPONENTS
// ==========================================

function getMailboxStatsCardsHTML() {
  const activeCount = mailboxesList.filter(m => m.status === 'active').length;
  const warningCount = mailboxesList.filter(m => m.status === 'warning').length;
  const suspendedCount = mailboxesList.filter(m => m.status === 'suspended').length;

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Card 1: Active Inboxes -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="inbox" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ${activeCount} Active
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Provisioned Inboxes
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${mailboxStats.totalMailboxes.toLocaleString()}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              User Accounts
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            ${warningCount} near quota • ${suspendedCount} suspended
          </div>
        </div>
      </div>

      <!-- Card 2: Messages Hosted -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="mail" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Indexed
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Indexed Messages
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${mailboxStats.totalMessages}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Emails
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Full-text search index active (Apache Solr)
          </div>
        </div>
      </div>

      <!-- Card 3: Mail Storage Pool -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="hard-drive" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            NVMe Maildir
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Storage Usage
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${mailboxStats.storageUsedTB}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Used
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Dovecot zlib gzip compression enabled
          </div>
        </div>
      </div>

      <!-- Card 4: Antispam Quality -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Rspamd Score
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Inbound Cleanliness
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              99.9%
            </span>
            <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              Spam-Free
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Bayesian neural network filter trained
          </div>
        </div>
      </div>

    </div>
  `;
}

function getMailboxesTableHTML(mailboxes, curFilter, curSearch, curDomain) {
  const allCount = mailboxesList.length;
  const activeCount = mailboxesList.filter(m => m.status === 'active').length;
  const warningCount = mailboxesList.filter(m => m.status === 'warning').length;
  const suspendedCount = mailboxesList.filter(m => m.status === 'suspended').length;

  // Extract unique domains for select filter
  const uniqueDomains = Array.from(new Set(mailboxesList.map(m => m.domain)));

  return `
    <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
      
      <!-- Table Controls Bar -->
      <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button 
            type="button" 
            data-mbx-filter="all"
            class="mbx-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            All Inboxes (${allCount})
          </button>
          <button 
            type="button" 
            data-mbx-filter="active"
            class="mbx-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'active' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Active (${activeCount})
          </button>
          <button 
            type="button" 
            data-mbx-filter="warning"
            class="mbx-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'warning' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Near Quota (${warningCount})
          </button>
          <button 
            type="button" 
            data-mbx-filter="suspended"
            class="mbx-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'suspended' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Suspended (${suspendedCount})
          </button>
        </div>

        <!-- Search & Domain Filter -->
        <div class="flex items-center gap-3">
          <div class="relative flex-1 sm:w-60">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="mbx-search-input"
              value="${curSearch}"
              placeholder="Search email, name..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <select 
            id="mbx-domain-select"
            class="px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-zinc-500 font-mono"
          >
            <option value="all" ${curDomain === 'all' ? 'selected' : ''}>All Domains</option>
            ${uniqueDomains.map(d => `
              <option value="${d}" ${curDomain === d ? 'selected' : ''}>${d}</option>
            `).join('')}
          </select>
        </div>

      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <th class="py-3 px-4 sm:px-6">Mailbox Email</th>
              <th class="py-3 px-4">Display Name</th>
              <th class="py-3 px-4">Domain</th>
              <th class="py-3 px-4">Storage (NVMe)</th>
              <th class="py-3 px-4">Messages</th>
              <th class="py-3 px-4">Auto-Responder</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
            ${mailboxes.length === 0 ? `
              <tr>
                <td colspan="8" class="py-12 text-center text-zinc-500">
                  <div class="flex flex-col items-center justify-center">
                    <i data-lucide="inbox" class="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-2"></i>
                    <p class="text-sm font-medium text-zinc-900 dark:text-white">No mailboxes found</p>
                    <p class="text-xs text-zinc-400 mt-1">Try modifying your filter or search query.</p>
                  </div>
                </td>
              </tr>
            ` : mailboxes.map(m => {
              // Status: plain text, colored, no background pill
              let statusText = '';
              if (m.status === 'active') {
                statusText = `<span class="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400">Active</span>`;
              } else if (m.status === 'warning') {
                statusText = `<span class="text-xs font-mono font-semibold text-amber-500 dark:text-amber-400">Near Quota</span>`;
              } else {
                statusText = `<span class="text-xs font-mono font-semibold text-rose-500 dark:text-rose-400" title="${m.suspendedReason || 'Suspended'}">Suspended</span>`;
              }

              const usedGB = (m.storageUsedMB / 1024).toFixed(1);
              const limitGB = (m.storageLimitMB / 1024).toFixed(0);

              return `
                <tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Email Address -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="font-medium text-zinc-900 dark:text-white font-mono">
                      ${m.email}
                    </div>
                    <div class="text-[11px] text-zinc-400 font-mono mt-0.5">
                      Last access: ${m.lastLogin}
                    </div>
                  </td>

                  <!-- Display Name -->
                  <td class="py-3.5 px-4">
                    <div class="font-medium text-zinc-900 dark:text-zinc-100">
                      ${m.displayName}
                    </div>
                  </td>

                  <!-- Domain (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${m.domain}
                  </td>

                  <!-- Storage (Clean numbers) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    <span class="font-semibold text-zinc-900 dark:text-zinc-100">${usedGB}GB</span><span class="text-zinc-400">/${limitGB}GB</span>
                  </td>

                  <!-- Messages (Clean numbers) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${m.messagesCount.toLocaleString()}
                  </td>

                  <!-- Auto-Responder (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    ${m.autoResponder ? '<span class="text-blue-500 font-medium">Enabled</span>' : '<span class="text-zinc-400">Disabled</span>'}
                  </td>

                  <!-- Status (Text Only, Colored) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${statusText}
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <!-- Manage button -->
                      <button 
                        type="button" 
                        class="mbx-manage-btn px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        data-mbx-id="${m.id}"
                        title="Manage Mailbox Quotas & Passwords"
                      >
                        Manage
                      </button>

                      <!-- Webmail SSO button -->
                      <button 
                        type="button" 
                        class="mbx-webmail-btn p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        data-mbx-id="${m.id}"
                        title="Open Webmail Client"
                      >
                        <i data-lucide="external-link" class="w-4 h-4"></i>
                      </button>

                      <!-- Delete -->
                      <button 
                        type="button" 
                        class="mbx-delete-btn p-1.5 rounded hover:bg-rose-500/10 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        data-mbx-id="${m.id}"
                        title="Delete Mailbox Account"
                      >
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- Pagination / Footer Bar -->
      <div class="p-4 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-500">
        <div>
          Showing <span class="text-zinc-900 dark:text-white font-semibold">${mailboxes.length}</span> of ${allCount} mailboxes
        </div>
        <div class="flex items-center gap-1.5">
          <button type="button" class="px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-400 hover:text-white disabled:opacity-40" disabled>
            Prev
          </button>
          <button type="button" class="px-2.5 py-1 rounded border border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-black font-bold">
            1
          </button>
          <button type="button" class="px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800">
            2
          </button>
          <button type="button" class="px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800">
            Next
          </button>
        </div>
      </div>

    </div>
  `;
}

function getMailboxDetailsDrawerHTML() {
  return `
    <div id="mbx-details-drawer" class="fixed inset-0 z-50 overflow-hidden hidden transition-all duration-300">
      <!-- Backdrop -->
      <div id="mbx-details-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div class="w-screen max-w-lg bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto custom-scrollbar">
          
          <div>
            <!-- Drawer Header -->
            <div class="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <div class="flex items-center gap-2">
                  <span id="drawer-mbx-status" class="text-xs font-mono font-semibold text-emerald-500">Active</span>
                  <span class="text-zinc-600 dark:text-zinc-700">•</span>
                  <span id="drawer-mbx-domain" class="text-xs font-mono text-zinc-400">techflow-media.com</span>
                </div>
                <h3 id="drawer-mbx-email" class="text-lg font-bold font-display text-zinc-900 dark:text-white mt-1">sarah@techflow-media.com</h3>
                <p id="drawer-mbx-name" class="text-xs font-mono text-zinc-400 mt-0.5">Sarah Jenkins</p>
              </div>
              <button type="button" id="close-mbx-drawer-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Specs Grid -->
            <div class="mt-6 space-y-4">
              
              <!-- Storage & Messages Info -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  INBOX RESOURCE UTILIZATION
                </div>
                
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span class="text-zinc-400 block text-[11px]">STORAGE QUOTA</span>
                    <span id="drawer-mbx-storage" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">4.2 GB / 10 GB</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">STORED MESSAGES</span>
                    <span id="drawer-mbx-messages" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">8,420 emails</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">LAST LOGIN</span>
                    <span id="drawer-mbx-login" class="font-mono text-zinc-800 dark:text-zinc-200">12 minutes ago</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">AUTO-RESPONDER</span>
                    <span id="drawer-mbx-responder" class="font-mono text-zinc-800 dark:text-zinc-200">Disabled</span>
                  </div>
                </div>
              </div>

              <!-- Client Connection Settings (IMAP / SMTP) -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  CLIENT CONNECTION CONFIGURATION
                </div>
                <div class="space-y-1.5 font-mono text-xs">
                  <div class="flex items-center justify-between">
                    <span class="text-zinc-500">Incoming IMAP:</span>
                    <span class="text-zinc-800 dark:text-zinc-200">mail.hostlab.email : 993 (SSL)</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-zinc-500">Outgoing SMTP:</span>
                    <span class="text-zinc-800 dark:text-zinc-200">mail.hostlab.email : 465 (SSL)</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-zinc-500">Username:</span>
                    <span id="drawer-mbx-username" class="text-zinc-800 dark:text-zinc-200">sarah@techflow-media.com</span>
                  </div>
                </div>
              </div>

              <!-- Quick Password Reset Form -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  RESET INBOX PASSWORD
                </div>
                <form id="drawer-reset-pwd-form" class="flex items-center gap-2">
                  <input 
                    type="password" 
                    id="drawer-new-pwd-input" 
                    placeholder="New password (min 8 chars)" 
                    class="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded font-mono text-zinc-900 dark:text-white focus:outline-none"
                    required
                  />
                  <button 
                    type="submit" 
                    id="drawer-update-pwd-btn"
                    class="px-3 py-1.5 text-xs font-mono font-medium rounded bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Update
                  </button>
                </form>
              </div>

            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end">
            <button 
              type="button" 
              id="drawer-mbx-done-btn"
              class="px-4 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  `;
}

function getCreateMailboxModalHTML() {
  const uniqueDomains = Array.from(new Set(mailboxesList.map(m => m.domain)));

  return `
    <div id="create-mbx-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden transition-opacity duration-200">
      <div class="relative w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-5">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white">
              Create New Mailbox
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Set up a secure IMAP/POP3 user inbox with dedicated storage quota.
            </p>
          </div>
          <button 
            type="button" 
            id="close-create-mbx-modal-btn"
            class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Form Body -->
        <form id="create-mbx-form" class="space-y-4">
          
          <!-- Domain & Username -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                USERNAME (BEFORE @)
              </label>
              <input 
                type="text" 
                id="modal-mbx-user-input"
                required
                placeholder="e.g. contact"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                DOMAIN
              </label>
              <select 
                id="modal-mbx-domain-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                ${uniqueDomains.map(d => `<option value="${d}">${d}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Display Name -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              FULL / DISPLAY NAME
            </label>
            <input 
              type="text" 
              id="modal-mbx-name-input"
              required
              placeholder="e.g. Sarah Jenkins"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <!-- Password & Quota -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                INITIAL PASSWORD
              </label>
              <input 
                type="password" 
                id="modal-mbx-pwd-input"
                required
                placeholder="••••••••••••"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                STORAGE QUOTA
              </label>
              <select 
                id="modal-mbx-quota-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                <option value="5120">5 GB Storage</option>
                <option value="10240" selected>10 GB Storage</option>
                <option value="25600">25 GB Storage</option>
                <option value="51200">50 GB Storage</option>
              </select>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-2">
            <button 
              type="button" 
              id="cancel-create-mbx-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Create Mailbox
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}

// ==========================================
// 3. MAIN MODULE RENDERER
// ==========================================

export function renderMailboxesHTML() {
  const filtered = getFilteredMailboxes();

  return `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            BUSINESS EMAIL / MAILBOXES
          </div>
          <h1 class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mt-1">
            Email Mailboxes
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Individual user mailboxes, quota allocation, password management, and webmail access.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-create-mbx-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-mono font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Create Mailbox</span>
          </button>
        </div>
      </div>

      <!-- 1. Top KPI Metrics -->
      ${getMailboxStatsCardsHTML()}

      <!-- 2. Interactive Data Table -->
      <div id="mbx-table-container">
        ${getMailboxesTableHTML(filtered, currentFilter, currentSearch, currentDomainFilter)}
      </div>

      <!-- 3. Create Mailbox Modal -->
      ${getCreateMailboxModalHTML()}

      <!-- 4. Slide-over Details Drawer -->
      ${getMailboxDetailsDrawerHTML()}

    </div>
  `;
}

// ==========================================
// 4. EVENT BINDINGS & LIFECYCLE
// ==========================================

export function setupMailboxesEvents(onNavigate) {
  createIcons({ icons });

  const tableContainer = document.getElementById('mbx-table-container');
  const drawer = document.getElementById('mbx-details-drawer');
  const closeDrawerBtn = document.getElementById('close-mbx-drawer-btn');
  const drawerDoneBtn = document.getElementById('drawer-mbx-done-btn');
  const drawerBackdrop = document.getElementById('mbx-details-backdrop');

  const closeDrawer = () => {
    if (drawer) drawer.classList.add('hidden');
  };

  if (closeDrawerBtn) closeDrawerBtn.onclick = closeDrawer;
  if (drawerDoneBtn) drawerDoneBtn.onclick = closeDrawer;
  if (drawerBackdrop) drawerBackdrop.onclick = closeDrawer;
  if (drawer) {
    drawer.onclick = (e) => {
      const panel = drawer.querySelector('.w-screen');
      if (panel && !panel.contains(e.target)) closeDrawer();
    };
  }

  const openDrawer = (m) => {
    if (!drawer) return;
    const stEl = document.getElementById('drawer-mbx-status');
    const dmEl = document.getElementById('drawer-mbx-domain');
    const emEl = document.getElementById('drawer-mbx-email');
    const nmEl = document.getElementById('drawer-mbx-name');
    const stgEl = document.getElementById('drawer-mbx-storage');
    const msgEl = document.getElementById('drawer-mbx-messages');
    const lgnEl = document.getElementById('drawer-mbx-login');
    const rspEl = document.getElementById('drawer-mbx-responder');
    const usrEl = document.getElementById('drawer-mbx-username');
    const resetForm = document.getElementById('drawer-reset-pwd-form');

    if (stEl) {
      if (m.status === 'active') {
        stEl.textContent = 'Active';
        stEl.className = 'text-xs font-mono font-semibold text-emerald-500';
      } else if (m.status === 'warning') {
        stEl.textContent = 'Near Quota';
        stEl.className = 'text-xs font-mono font-semibold text-amber-500';
      } else {
        stEl.textContent = 'Suspended';
        stEl.className = 'text-xs font-mono font-semibold text-rose-500';
      }
    }

    if (dmEl) dmEl.textContent = m.domain;
    if (emEl) emEl.textContent = m.email;
    if (nmEl) nmEl.textContent = m.displayName;
    if (stgEl) stgEl.textContent = `${(m.storageUsedMB / 1024).toFixed(1)} GB / ${(m.storageLimitMB / 1024).toFixed(0)} GB`;
    if (msgEl) msgEl.textContent = `${m.messagesCount.toLocaleString()} emails`;
    if (lgnEl) lgnEl.textContent = m.lastLogin;
    if (rspEl) rspEl.textContent = m.autoResponder ? 'Enabled (Active)' : 'Disabled';
    if (usrEl) usrEl.textContent = m.email;

    if (resetForm) {
      resetForm.onsubmit = (e) => {
        e.preventDefault();
        const updateBtn = document.getElementById('drawer-update-pwd-btn');
        if (updateBtn) {
          updateBtn.textContent = 'Updated!';
          setTimeout(() => {
            updateBtn.textContent = 'Update';
            resetForm.reset();
          }, 1200);
        }
      };
    }

    drawer.classList.remove('hidden');
    createIcons({ icons });
  };

  const refreshTable = () => {
    if (tableContainer) {
      const filtered = getFilteredMailboxes();
      tableContainer.innerHTML = getMailboxesTableHTML(filtered, currentFilter, currentSearch, currentDomainFilter);
      createIcons({ icons });
      attachTableEvents();
    }
  };

  const attachTableEvents = () => {
    // Filter Tabs
    const filterBtns = document.querySelectorAll('.mbx-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        currentFilter = btn.getAttribute('data-mbx-filter') || 'all';
        refreshTable();
      };
    });

    // Search Input
    const searchInput = document.getElementById('mbx-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        currentSearch = e.target.value;
        refreshTable();
      };
    }

    // Domain Select
    const domainSelect = document.getElementById('mbx-domain-select');
    if (domainSelect) {
      domainSelect.onchange = (e) => {
        currentDomainFilter = e.target.value;
        refreshTable();
      };
    }

    // Manage buttons
    const manageBtns = document.querySelectorAll('.mbx-manage-btn');
    manageBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-mbx-id');
        const m = mailboxesList.find(item => item.id === id);
        if (m) openDrawer(m);
      };
    });

    // Webmail SSO buttons
    const ssoBtns = document.querySelectorAll('.mbx-webmail-btn');
    ssoBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-mbx-id');
        const m = mailboxesList.find(item => item.id === id);
        if (m) {
          window.open(`https://webmail.${m.domain}`, '_blank');
        }
      };
    });

    // Delete
    const deleteBtns = document.querySelectorAll('.mbx-delete-btn');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-mbx-id');
        const m = mailboxesList.find(item => item.id === id);
        if (m && confirm(`Permanently delete mailbox "${m.email}"? All emails will be erased.`)) {
          mailboxesList = mailboxesList.filter(item => item.id !== id);
          refreshTable();
        }
      };
    });
  };

  attachTableEvents();

  // Create Mailbox Modal logic
  const createModal = document.getElementById('create-mbx-modal');
  const openCreateBtn = document.getElementById('open-create-mbx-btn');
  const closeCreateBtn = document.getElementById('close-create-mbx-modal-btn');
  const cancelCreateBtn = document.getElementById('cancel-create-mbx-btn');
  const createForm = document.getElementById('create-mbx-form');

  if (openCreateBtn && createModal) {
    openCreateBtn.onclick = () => createModal.classList.remove('hidden');
  }

  const closeCreate = () => {
    if (createModal) createModal.classList.add('hidden');
    if (createForm) createForm.reset();
  };

  if (closeCreateBtn) closeCreateBtn.onclick = closeCreate;
  if (cancelCreateBtn) cancelCreateBtn.onclick = closeCreate;

  if (createForm) {
    createForm.onsubmit = (e) => {
      e.preventDefault();
      const user = document.getElementById('modal-mbx-user-input')?.value.trim();
      const domain = document.getElementById('modal-mbx-domain-select')?.value || 'techflow-media.com';
      const displayName = document.getElementById('modal-mbx-name-input')?.value.trim();
      const quota = parseInt(document.getElementById('modal-mbx-quota-select')?.value || '10240');

      if (!user || !displayName) return;

      const newMbx = {
        id: `mbx-${Date.now()}`,
        email: `${user}@${domain}`,
        domain,
        displayName,
        storageUsedMB: 0,
        storageLimitMB: quota,
        messagesCount: 0,
        autoResponder: false,
        lastLogin: 'Never',
        status: 'active'
      };

      mailboxesList.unshift(newMbx);
      closeCreate();
      refreshTable();
    };
  }
}

export function cleanupMailboxes() {
  currentFilter = 'all';
  currentSearch = '';
  currentDomainFilter = 'all';
}
