import { createIcons, icons } from 'lucide';

/**
 * Hostlab Business Email Domains Module
 * Dedicated standalone module for domain-level email services, MX routing,
 * storage quota pools, DKIM/SPF alignment, and multi-tenant mail routing.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const emailStats = {
  totalDomains: 624,
  activeDomains: 608,
  pendingDns: 12,
  suspended: 4,
  totalMailboxes: 2840,
  storageUsedTB: '18.4 TB',
  storageTotalTB: '50.0 TB',
  storagePercentage: '36.8%',
  spamBlockRate: '99.92%'
};

export const initialEmailDomains = [
  {
    id: 'eml-dom-101',
    domain: 'techflow-media.com',
    plan: 'Pro Mail (50GB)',
    client: 'Sarah Jenkins',
    clientEmail: 'sarah@techflow.io',
    mailboxesCount: 8,
    mailboxesLimit: 20,
    storageUsedGB: 14.2,
    storageLimitGB: 50,
    mxStatus: 'Aligned (mx1.hostlab.email)',
    dkimStatus: 'Signed (2048-bit)',
    spfStatus: 'Pass',
    webmailUrl: 'webmail.techflow-media.com',
    status: 'active', // active | pending-dns | suspended
    createdAt: '2024-03-12'
  },
  {
    id: 'eml-dom-102',
    domain: 'apexstudios.design',
    plan: 'Enterprise Mail (250GB)',
    client: 'David Vance',
    clientEmail: 'david@apexstudios.design',
    mailboxesCount: 16,
    mailboxesLimit: 50,
    storageUsedGB: 68.5,
    storageLimitGB: 250,
    mxStatus: 'Aligned (mx1.hostlab.email)',
    dkimStatus: 'Signed (2048-bit)',
    spfStatus: 'Pass',
    webmailUrl: 'mail.apexstudios.design',
    status: 'active',
    createdAt: '2024-01-20'
  },
  {
    id: 'eml-dom-103',
    domain: 'greenleaf-organics.co.uk',
    plan: 'Starter Mail (15GB)',
    client: 'Emma Watson',
    clientEmail: 'emma@greenleaforganics.co.uk',
    mailboxesCount: 4,
    mailboxesLimit: 5,
    storageUsedGB: 12.8,
    storageLimitGB: 15,
    mxStatus: 'Aligned (mx1.hostlab.email)',
    dkimStatus: 'Signed (2048-bit)',
    spfStatus: 'Pass',
    webmailUrl: 'webmail.greenleaf-organics.co.uk',
    status: 'active',
    createdAt: '2023-11-04'
  },
  {
    id: 'eml-dom-104',
    domain: 'cryptotrack-api.io',
    plan: 'Pro Mail (50GB)',
    client: 'Alex Rivera',
    clientEmail: 'alex@cryptotrack.net',
    mailboxesCount: 6,
    mailboxesLimit: 20,
    storageUsedGB: 4.8,
    storageLimitGB: 50,
    mxStatus: 'Aligned (mx1.hostlab.email)',
    dkimStatus: 'Signed (2048-bit)',
    spfStatus: 'Pass',
    webmailUrl: 'mail.cryptotrack-api.io',
    status: 'active',
    createdAt: '2024-02-18'
  },
  {
    id: 'eml-dom-105',
    domain: 'pulsecreative.de',
    plan: 'Starter Mail (15GB)',
    client: 'Felix Weber',
    clientEmail: 'felix@pulsecreative.de',
    mailboxesCount: 3,
    mailboxesLimit: 5,
    storageUsedGB: 14.9,
    storageLimitGB: 15,
    mxStatus: 'Aligned (mx1.hostlab.email)',
    dkimStatus: 'Signed (2048-bit)',
    spfStatus: 'Pass',
    webmailUrl: 'webmail.pulsecreative.de',
    status: 'suspended',
    suspendedReason: 'Storage Quota Exceeded (99.3% full)',
    createdAt: '2023-12-01'
  },
  {
    id: 'eml-dom-106',
    domain: 'novatech-solutions.ai',
    plan: 'Enterprise Mail (250GB)',
    client: 'Marcus Brody',
    clientEmail: 'marcus@novatech.ai',
    mailboxesCount: 22,
    mailboxesLimit: 50,
    storageUsedGB: 45.0,
    storageLimitGB: 250,
    mxStatus: 'Aligned (mx1.hostlab.email)',
    dkimStatus: 'Signed (2048-bit)',
    spfStatus: 'Pass',
    webmailUrl: 'webmail.novatech-solutions.ai',
    status: 'active',
    createdAt: '2024-01-14'
  },
  {
    id: 'eml-dom-107',
    domain: 'aurora-fashion.com',
    plan: 'Pro Mail (50GB)',
    client: 'Chloë Dupuis',
    clientEmail: 'chloe@aurorafashion.fr',
    mailboxesCount: 0,
    mailboxesLimit: 20,
    storageUsedGB: 0,
    storageLimitGB: 50,
    mxStatus: 'Pending DNS Verification',
    dkimStatus: 'Pending TXT Record',
    spfStatus: 'Pending',
    webmailUrl: 'webmail.aurora-fashion.com',
    status: 'pending-dns',
    createdAt: '2024-03-24'
  },
  {
    id: 'eml-dom-108',
    domain: 'zenith-consulting.net',
    plan: 'Starter Mail (15GB)',
    client: 'Patrick Stewart',
    clientEmail: 'patrick@zenithgroup.net',
    mailboxesCount: 2,
    mailboxesLimit: 5,
    storageUsedGB: 1.2,
    storageLimitGB: 15,
    mxStatus: 'Aligned (mx1.hostlab.email)',
    dkimStatus: 'Signed (2048-bit)',
    spfStatus: 'Pass',
    webmailUrl: 'webmail.zenith-consulting.net',
    status: 'suspended',
    suspendedReason: 'Account Billing Overdue',
    createdAt: '2023-09-19'
  }
];

// In-memory state
let domainsList = [...initialEmailDomains];
let currentFilter = 'all'; // all | active | pending-dns | suspended
let currentSearch = '';

function getFilteredEmailDomains() {
  return domainsList.filter(d => {
    if (currentFilter !== 'all' && d.status !== currentFilter) return false;
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      return (
        d.domain.toLowerCase().includes(q) ||
        d.client.toLowerCase().includes(q) ||
        d.clientEmail.toLowerCase().includes(q) ||
        d.plan.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

// ==========================================
// 2. VIEW TEMPLATES & COMPONENTS
// ==========================================

function getEmailDomainStatsCardsHTML() {
  const activeCount = domainsList.filter(d => d.status === 'active').length;
  const pendingCount = domainsList.filter(d => d.status === 'pending-dns').length;
  const suspendedCount = domainsList.filter(d => d.status === 'suspended').length;

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Card 1: Total Email Domains -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="mail" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ${activeCount} Active
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Hosted Email Domains
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${emailStats.totalDomains.toLocaleString()}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Domains
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            ${pendingCount} pending DNS • ${suspendedCount} suspended
          </div>
        </div>
      </div>

      <!-- Card 2: Total Mailboxes -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="inbox" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            IMAP / POP3
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Provisioned Inboxes
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${emailStats.totalMailboxes.toLocaleString()}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Mailboxes
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            TLS encryption on port 993 & 465 enforced
          </div>
        </div>
      </div>

      <!-- Card 3: Storage Pool -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="hard-drive" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            ${emailStats.storagePercentage}
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Mail Storage Pool
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${emailStats.storageUsedTB}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              / ${emailStats.storageTotalTB}
            </span>
          </div>
          <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div class="bg-purple-500 h-full rounded-full" style="width: ${emailStats.storagePercentage}"></div>
          </div>
        </div>
      </div>

      <!-- Card 4: Anti-Spam & Deliverability -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Rspamd AI
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Spam Filtering Efficiency
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${emailStats.spamBlockRate}
            </span>
            <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              Zero Phishing
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            ClamAV antivirus + Greylisting active
          </div>
        </div>
      </div>

    </div>
  `;
}

function getEmailDomainsTableHTML(domains, curFilter, curSearch) {
  const allCount = domainsList.length;
  const activeCount = domainsList.filter(d => d.status === 'active').length;
  const pendingCount = domainsList.filter(d => d.status === 'pending-dns').length;
  const suspendedCount = domainsList.filter(d => d.status === 'suspended').length;

  return `
    <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
      
      <!-- Table Controls Bar -->
      <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button 
            type="button" 
            data-eml-filter="all"
            class="eml-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            All Domains (${allCount})
          </button>
          <button 
            type="button" 
            data-eml-filter="active"
            class="eml-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'active' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Active (${activeCount})
          </button>
          <button 
            type="button" 
            data-eml-filter="pending-dns"
            class="eml-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'pending-dns' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            DNS Pending (${pendingCount})
          </button>
          <button 
            type="button" 
            data-eml-filter="suspended"
            class="eml-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'suspended' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Suspended (${suspendedCount})
          </button>
        </div>

        <!-- Search Input -->
        <div class="flex items-center gap-3">
          <div class="relative flex-1 sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="eml-search-input"
              value="${curSearch}"
              placeholder="Search domain, client..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>
        </div>

      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <th class="py-3 px-4 sm:px-6">Domain</th>
              <th class="py-3 px-4">Client / Owner</th>
              <th class="py-3 px-4">Mail Package</th>
              <th class="py-3 px-4">Inboxes Used</th>
              <th class="py-3 px-4">Storage (NVMe)</th>
              <th class="py-3 px-4">MX & Security</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
            ${domains.length === 0 ? `
              <tr>
                <td colspan="8" class="py-12 text-center text-zinc-500">
                  <div class="flex flex-col items-center justify-center">
                    <i data-lucide="mail" class="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-2"></i>
                    <p class="text-sm font-medium text-zinc-900 dark:text-white">No email domains found</p>
                    <p class="text-xs text-zinc-400 mt-1">Try modifying your search or filter options.</p>
                  </div>
                </td>
              </tr>
            ` : domains.map(d => {
              // Status: plain text, colored, no background pill
              let statusText = '';
              if (d.status === 'active') {
                statusText = `<span class="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400">Active</span>`;
              } else if (d.status === 'pending-dns') {
                statusText = `<span class="text-xs font-mono font-semibold text-amber-500 dark:text-amber-400">DNS Pending</span>`;
              } else {
                statusText = `<span class="text-xs font-mono font-semibold text-rose-500 dark:text-rose-400" title="${d.suspendedReason || 'Suspended'}">Suspended</span>`;
              }

              return `
                <tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Domain -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="font-medium text-zinc-900 dark:text-white font-mono">
                      ${d.domain}
                    </div>
                    <div class="text-[11px] text-zinc-400 font-mono mt-0.5">
                      ${d.webmailUrl}
                    </div>
                  </td>

                  <!-- Client / Owner -->
                  <td class="py-3.5 px-4">
                    <div class="font-medium text-zinc-900 dark:text-zinc-100">
                      ${d.client}
                    </div>
                    <div class="text-[11px] text-zinc-400 font-mono mt-0.5 truncate max-w-[150px]">
                      ${d.clientEmail}
                    </div>
                  </td>

                  <!-- Mail Package (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${d.plan}
                  </td>

                  <!-- Inboxes Used (Clean numbers) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    <span class="font-semibold text-zinc-900 dark:text-zinc-100">${d.mailboxesCount}</span><span class="text-zinc-400">/${d.mailboxesLimit}</span>
                  </td>

                  <!-- Storage (Clean numbers) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    <span class="font-semibold text-zinc-900 dark:text-zinc-100">${d.storageUsedGB}GB</span><span class="text-zinc-400">/${d.storageLimitGB}GB</span>
                  </td>

                  <!-- MX & Security (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    <div>DKIM: ${d.dkimStatus.includes('Signed') ? '<span class="text-emerald-500 font-medium">Signed</span>' : '<span class="text-amber-500">Pending</span>'}</div>
                    <div class="text-[10px] text-zinc-400">SPF: ${d.spfStatus}</div>
                  </td>

                  <!-- Status (Text Only, Colored) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${statusText}
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <!-- Manage domain email settings -->
                      <button 
                        type="button" 
                        class="eml-manage-btn px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        data-eml-id="${d.id}"
                        title="Manage Mailbox Routing & DNS Alignment"
                      >
                        Manage
                      </button>

                      <!-- Toggle Status -->
                      <button 
                        type="button" 
                        class="eml-status-btn p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        data-eml-id="${d.id}"
                        title="${d.status === 'active' ? 'Suspend Email Domain' : 'Activate Email Domain'}"
                      >
                        <i data-lucide="${d.status === 'active' ? 'pause-circle' : 'play-circle'}" class="w-4 h-4"></i>
                      </button>

                      <!-- Delete -->
                      <button 
                        type="button" 
                        class="eml-delete-btn p-1.5 rounded hover:bg-rose-500/10 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        data-eml-id="${d.id}"
                        title="Delete Email Domain Service"
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
          Showing <span class="text-zinc-900 dark:text-white font-semibold">${domains.length}</span> of ${allCount} domains
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

function getEmailDomainDrawerHTML() {
  return `
    <div id="eml-domain-drawer" class="fixed inset-0 z-50 overflow-hidden hidden transition-all duration-300">
      <!-- Backdrop -->
      <div id="eml-domain-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div class="w-screen max-w-lg bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto custom-scrollbar">
          
          <div>
            <!-- Drawer Header -->
            <div class="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <div class="flex items-center gap-2">
                  <span id="drawer-eml-status" class="text-xs font-mono font-semibold text-emerald-500">Active</span>
                  <span class="text-zinc-600 dark:text-zinc-700">•</span>
                  <span id="drawer-eml-plan" class="text-xs font-mono text-zinc-400">Pro Mail (50GB)</span>
                </div>
                <h3 id="drawer-eml-domain" class="text-lg font-bold font-display text-zinc-900 dark:text-white mt-1">techflow-media.com</h3>
                <p id="drawer-eml-client" class="text-xs font-mono text-zinc-400 mt-0.5">Sarah Jenkins (sarah@techflow.io)</p>
              </div>
              <button type="button" id="close-eml-drawer-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Specs Grid -->
            <div class="mt-6 space-y-4">
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  MAIL SERVICE ALLOCATION
                </div>
                
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span class="text-zinc-400 block text-[11px]">MAILBOXES USED</span>
                    <span id="drawer-eml-inboxes" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">8 / 20 Inboxes</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">DISK STORAGE USED</span>
                    <span id="drawer-eml-storage" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">14.2 GB / 50 GB</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">WEBMAIL PORTAL</span>
                    <span id="drawer-eml-webmail" class="font-mono text-zinc-800 dark:text-zinc-200 break-all">webmail.techflow-media.com</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">DATE PROVISIONED</span>
                    <span id="drawer-eml-created" class="font-mono text-zinc-800 dark:text-zinc-200">2024-03-12</span>
                  </div>
                </div>

                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <span class="text-zinc-400 block text-[11px]">PRIMARY MX ROUTE</span>
                  <span id="drawer-eml-mx" class="font-mono text-xs text-zinc-800 dark:text-zinc-200">10 mx1.hostlab.email</span>
                </div>
              </div>

              <!-- DNS Alignment Guide -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  AUTHENTICATION & REPUTATION
                </div>
                <div class="space-y-1.5 font-mono text-xs">
                  <div class="flex items-center justify-between">
                    <span class="text-zinc-500">SPF Record (TXT):</span>
                    <span class="text-emerald-500 font-semibold">Pass (include:_spf.hostlab.cloud)</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-zinc-500">DKIM Signing:</span>
                    <span class="text-emerald-500 font-semibold">2048-bit RSA Active</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-zinc-500">DMARC Policy:</span>
                    <span class="text-zinc-800 dark:text-zinc-200">p=reject; rua=mailto:...</span>
                  </div>
                </div>
              </div>

              <!-- Fast Nav to Mailboxes -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
                <div>
                  <div class="text-xs font-medium text-zinc-900 dark:text-zinc-100">Manage Mailboxes for this Domain</div>
                  <div class="text-[11px] text-zinc-400">Create user inboxes, reset passwords, set quotas</div>
                </div>
                <button 
                  type="button" 
                  id="drawer-go-mailboxes-btn"
                  class="px-3 py-1.5 text-xs font-mono font-medium rounded bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  View Inboxes →
                </button>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end">
            <button 
              type="button" 
              id="drawer-eml-done-btn"
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

function getAddEmailDomainModalHTML() {
  return `
    <div id="add-eml-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden transition-opacity duration-200">
      <div class="relative w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-5">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white">
              Add Email Domain Service
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Provision multi-mailbox cloud business email routing with automated DKIM & SPF.
            </p>
          </div>
          <button 
            type="button" 
            id="close-add-eml-modal-btn"
            class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Form Body -->
        <form id="add-eml-form" class="space-y-4">
          
          <!-- Domain Name -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              EMAIL DOMAIN
            </label>
            <input 
              type="text" 
              id="modal-eml-domain-input"
              required
              placeholder="e.g. acmebrand.com"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <!-- Mail Plan -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              MAILBOX PACKAGE / STORAGE TIER
            </label>
            <select 
              id="modal-eml-plan-select"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
            >
              <option value="Starter Mail (15GB)">Starter Mail (Up to 5 inboxes / 15GB Pool)</option>
              <option value="Pro Mail (50GB)">Pro Mail (Up to 20 inboxes / 50GB Pool)</option>
              <option value="Enterprise Mail (250GB)">Enterprise Mail (Up to 50 inboxes / 250GB Pool)</option>
            </select>
          </div>

          <!-- Client Owner -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                CLIENT / ACCOUNT
              </label>
              <input 
                type="text" 
                id="modal-eml-client-name"
                required
                placeholder="Jane Doe"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                BILLING EMAIL
              </label>
              <input 
                type="email" 
                id="modal-eml-client-email"
                required
                placeholder="jane@example.com"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
          </div>

          <!-- Auto-Generate DKIM Checkbox -->
          <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i>
              <div>
                <div class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Generate 2048-bit DKIM Key</div>
                <div class="text-[11px] text-zinc-400">Auto-add to Hostlab DNS zones if hosted locally</div>
              </div>
            </div>
            <input type="checkbox" id="modal-eml-dkim-toggle" checked class="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4 cursor-pointer" />
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-2">
            <button 
              type="button" 
              id="cancel-add-eml-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Provision Email Service
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

export function renderEmailDomainsHTML() {
  const filtered = getFilteredEmailDomains();

  return `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            BUSINESS EMAIL / EMAIL DOMAINS
          </div>
          <h1 class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mt-1">
            Email Domains & Services
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Domain-level email routing, storage quota pools, anti-spam hygiene, and DKIM/SPF alignment.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-add-eml-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-mono font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Add Email Domain</span>
          </button>
        </div>
      </div>

      <!-- 1. Top KPI Metrics -->
      ${getEmailDomainStatsCardsHTML()}

      <!-- 2. Interactive Data Table -->
      <div id="eml-table-container">
        ${getEmailDomainsTableHTML(filtered, currentFilter, currentSearch)}
      </div>

      <!-- 3. Add Domain Modal -->
      ${getAddEmailDomainModalHTML()}

      <!-- 4. Slide-over Details Drawer -->
      ${getEmailDomainDrawerHTML()}

    </div>
  `;
}

// ==========================================
// 4. EVENT BINDINGS & LIFECYCLE
// ==========================================

export function setupEmailDomainsEvents(onNavigate) {
  createIcons({ icons });

  const tableContainer = document.getElementById('eml-table-container');
  const drawer = document.getElementById('eml-domain-drawer');
  const closeDrawerBtn = document.getElementById('close-eml-drawer-btn');
  const drawerDoneBtn = document.getElementById('drawer-eml-done-btn');
  const drawerBackdrop = document.getElementById('eml-domain-backdrop');

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

  const openDrawer = (d) => {
    if (!drawer) return;
    const stEl = document.getElementById('drawer-eml-status');
    const plEl = document.getElementById('drawer-eml-plan');
    const dmEl = document.getElementById('drawer-eml-domain');
    const clEl = document.getElementById('drawer-eml-client');
    const inEl = document.getElementById('drawer-eml-inboxes');
    const stgEl = document.getElementById('drawer-eml-storage');
    const wmEl = document.getElementById('drawer-eml-webmail');
    const crEl = document.getElementById('drawer-eml-created');
    const mxEl = document.getElementById('drawer-eml-mx');
    const goMailboxesBtn = document.getElementById('drawer-go-mailboxes-btn');

    if (stEl) {
      if (d.status === 'active') {
        stEl.textContent = 'Active';
        stEl.className = 'text-xs font-mono font-semibold text-emerald-500';
      } else if (d.status === 'pending-dns') {
        stEl.textContent = 'DNS Pending';
        stEl.className = 'text-xs font-mono font-semibold text-amber-500';
      } else {
        stEl.textContent = 'Suspended';
        stEl.className = 'text-xs font-mono font-semibold text-rose-500';
      }
    }

    if (plEl) plEl.textContent = d.plan;
    if (dmEl) dmEl.textContent = d.domain;
    if (clEl) clEl.textContent = `${d.client} (${d.clientEmail})`;
    if (inEl) inEl.textContent = `${d.mailboxesCount} / ${d.mailboxesLimit} Inboxes`;
    if (stgEl) stgEl.textContent = `${d.storageUsedGB} GB / ${d.storageLimitGB} GB`;
    if (wmEl) wmEl.textContent = d.webmailUrl;
    if (crEl) crEl.textContent = d.createdAt;
    if (mxEl) mxEl.textContent = d.mxStatus;

    if (goMailboxesBtn) {
      goMailboxesBtn.onclick = () => {
        closeDrawer();
        if (onNavigate) {
          onNavigate({
            activeParent: 'email',
            activeSub: 'email-mailboxes',
            openParents: ['email']
          });
        }
      };
    }

    drawer.classList.remove('hidden');
    createIcons({ icons });
  };

  const refreshTable = () => {
    if (tableContainer) {
      const filtered = getFilteredEmailDomains();
      tableContainer.innerHTML = getEmailDomainsTableHTML(filtered, currentFilter, currentSearch);
      createIcons({ icons });
      attachTableEvents();
    }
  };

  const attachTableEvents = () => {
    // Filter Tabs
    const filterBtns = document.querySelectorAll('.eml-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        currentFilter = btn.getAttribute('data-eml-filter') || 'all';
        refreshTable();
      };
    });

    // Search Input
    const searchInput = document.getElementById('eml-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        currentSearch = e.target.value;
        refreshTable();
      };
    }

    // Manage buttons
    const manageBtns = document.querySelectorAll('.eml-manage-btn');
    manageBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-eml-id');
        const dom = domainsList.find(d => d.id === id);
        if (dom) openDrawer(dom);
      };
    });

    // Status toggle (Active / Suspended)
    const statusBtns = document.querySelectorAll('.eml-status-btn');
    statusBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-eml-id');
        const dom = domainsList.find(d => d.id === id);
        if (dom) {
          dom.status = dom.status === 'active' ? 'suspended' : 'active';
          refreshTable();
        }
      };
    });

    // Delete
    const deleteBtns = document.querySelectorAll('.eml-delete-btn');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-eml-id');
        const dom = domainsList.find(d => d.id === id);
        if (dom && confirm(`Permanently remove email service for "${dom.domain}"? All inboxes will be purged.`)) {
          domainsList = domainsList.filter(d => d.id !== id);
          refreshTable();
        }
      };
    });
  };

  attachTableEvents();

  // Add Email Domain Modal logic
  const addModal = document.getElementById('add-eml-modal');
  const openAddBtn = document.getElementById('open-add-eml-btn');
  const closeAddBtn = document.getElementById('close-add-eml-modal-btn');
  const cancelAddBtn = document.getElementById('cancel-add-eml-btn');
  const addForm = document.getElementById('add-eml-form');

  if (openAddBtn && addModal) {
    openAddBtn.onclick = () => addModal.classList.remove('hidden');
  }

  const closeAdd = () => {
    if (addModal) addModal.classList.add('hidden');
    if (addForm) addForm.reset();
  };

  if (closeAddBtn) closeAddBtn.onclick = closeAdd;
  if (cancelAddBtn) cancelAddBtn.onclick = closeAdd;

  if (addForm) {
    addForm.onsubmit = (e) => {
      e.preventDefault();
      const domain = document.getElementById('modal-eml-domain-input')?.value.trim();
      const plan = document.getElementById('modal-eml-plan-select')?.value || 'Pro Mail (50GB)';
      const client = document.getElementById('modal-eml-client-name')?.value.trim();
      const clientEmail = document.getElementById('modal-eml-client-email')?.value.trim();

      if (!domain || !client || !clientEmail) return;

      const isEnt = plan.includes('Enterprise');
      const isPro = plan.includes('Pro');
      const limitInboxes = isEnt ? 50 : isPro ? 20 : 5;
      const limitStorage = isEnt ? 250 : isPro ? 50 : 15;

      const newDom = {
        id: `eml-dom-${Date.now()}`,
        domain,
        plan,
        client,
        clientEmail,
        mailboxesCount: 0,
        mailboxesLimit: limitInboxes,
        storageUsedGB: 0,
        storageLimitGB: limitStorage,
        mxStatus: 'Aligned (mx1.hostlab.email)',
        dkimStatus: 'Signed (2048-bit)',
        spfStatus: 'Pass',
        webmailUrl: `webmail.${domain}`,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };

      domainsList.unshift(newDom);
      closeAdd();
      refreshTable();
    };
  }
}

export function cleanupEmailDomains() {
  currentFilter = 'all';
  currentSearch = '';
}
