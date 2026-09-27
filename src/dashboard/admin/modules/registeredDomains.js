import { createIcons, icons } from 'lucide';

/**
 * Hostlab Registered Domains Module
 * Dedicated standalone module for ICANN domain registrations, registrar endpoints,
 * WHOIS privacy, EPP transfer authorization, and automated lifecycle renewals.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const domainStats = {
  totalDomains: 1420,
  activeDomains: 1388,
  expiringIn30Days: 24,
  transfersPending: 8,
  whoisPrivacyProtected: '99.4%'
};

export const initialDomains = [
  {
    id: 'dom-101',
    domain: 'techflow-media.com',
    tld: '.com',
    registrar: 'OpenSRS / Tucows',
    client: 'Sarah Jenkins',
    clientEmail: 'sarah@techflow.io',
    registeredDate: '2021-04-12',
    expiryDate: '2025-04-12',
    daysLeft: 198,
    renewalPrice: '$13.99/yr',
    autoRenew: true,
    transferLock: true,
    whoisPrivacy: true,
    dnssec: true,
    nameservers: ['ns1.hostlab.cloud', 'ns2.hostlab.cloud'],
    status: 'active' // active | expiring | pending-transfer | expired
  },
  {
    id: 'dom-102',
    domain: 'apexstudios.design',
    tld: '.design',
    registrar: 'Namecheap API',
    client: 'David Vance',
    clientEmail: 'david@apexstudios.design',
    registeredDate: '2023-01-20',
    expiryDate: '2025-01-20',
    daysLeft: 116,
    renewalPrice: '$38.50/yr',
    autoRenew: true,
    transferLock: true,
    whoisPrivacy: true,
    dnssec: false,
    nameservers: ['ns1.cloudflare.com', 'ns2.cloudflare.com'],
    status: 'active'
  },
  {
    id: 'dom-103',
    domain: 'greenleaf-organics.co.uk',
    tld: '.co.uk',
    registrar: 'Nominet UK',
    client: 'Emma Watson',
    clientEmail: 'emma@greenleaforganics.co.uk',
    registeredDate: '2022-11-04',
    expiryDate: '2024-11-04',
    daysLeft: 39,
    renewalPrice: '$9.99/yr',
    autoRenew: true,
    transferLock: false,
    whoisPrivacy: true,
    dnssec: true,
    nameservers: ['ns1.hostlab.cloud', 'ns2.hostlab.cloud'],
    status: 'active'
  },
  {
    id: 'dom-104',
    domain: 'cryptotrack-api.io',
    tld: '.io',
    registrar: 'Cloudflare Registrar',
    client: 'Alex Rivera',
    clientEmail: 'alex@cryptotrack.net',
    registeredDate: '2023-02-18',
    expiryDate: '2024-04-02',
    daysLeft: 7,
    renewalPrice: '$39.00/yr',
    autoRenew: false,
    transferLock: true,
    whoisPrivacy: true,
    dnssec: true,
    nameservers: ['dina.ns.cloudflare.com', 'leif.ns.cloudflare.com'],
    status: 'expiring'
  },
  {
    id: 'dom-105',
    domain: 'pulsecreative.de',
    tld: '.de',
    registrar: 'DENIC Direct',
    client: 'Felix Weber',
    clientEmail: 'felix@pulsecreative.de',
    registeredDate: '2020-05-19',
    expiryDate: '2024-05-19',
    daysLeft: 54,
    renewalPrice: '$8.50/yr',
    autoRenew: true,
    transferLock: true,
    whoisPrivacy: false,
    dnssec: false,
    nameservers: ['ns1.hostlab.cloud', 'ns2.hostlab.cloud'],
    status: 'active'
  },
  {
    id: 'dom-106',
    domain: 'novatech-solutions.ai',
    tld: '.ai',
    registrar: 'OpenSRS / Tucows',
    client: 'Marcus Brody',
    clientEmail: 'marcus@novatech.ai',
    registeredDate: '2024-01-14',
    expiryDate: '2026-01-14',
    daysLeft: 476,
    renewalPrice: '$79.00/yr',
    autoRenew: true,
    transferLock: true,
    whoisPrivacy: true,
    dnssec: true,
    nameservers: ['ns1.hostlab.cloud', 'ns2.hostlab.cloud'],
    status: 'active'
  },
  {
    id: 'dom-107',
    domain: 'aurora-fashion.com',
    tld: '.com',
    registrar: 'GoDaddy Inbound',
    client: 'Chloë Dupuis',
    clientEmail: 'chloe@aurorafashion.fr',
    registeredDate: '2024-03-24',
    expiryDate: '2025-03-24',
    daysLeft: 364,
    renewalPrice: '$13.99/yr',
    autoRenew: true,
    transferLock: false,
    whoisPrivacy: true,
    dnssec: false,
    nameservers: ['ns1.hostlab.cloud', 'ns2.hostlab.cloud'],
    status: 'pending-transfer'
  },
  {
    id: 'dom-108',
    domain: 'zenith-consulting.net',
    tld: '.net',
    registrar: 'ResellerClub API',
    client: 'Patrick Stewart',
    clientEmail: 'patrick@zenithgroup.net',
    registeredDate: '2022-09-19',
    expiryDate: '2024-03-19',
    daysLeft: -6,
    renewalPrice: '$14.99/yr',
    autoRenew: false,
    transferLock: true,
    whoisPrivacy: true,
    dnssec: false,
    nameservers: ['ns1.hostlab.cloud', 'ns2.hostlab.cloud'],
    status: 'expired'
  }
];

// In-memory state
let domainsList = [...initialDomains];
let currentFilter = 'all'; // all | active | expiring | pending-transfer | expired
let currentSearch = '';
let currentTldFilter = 'all';

function getFilteredDomains() {
  return domainsList.filter(d => {
    if (currentFilter !== 'all' && d.status !== currentFilter) return false;
    if (currentTldFilter !== 'all' && d.tld !== currentTldFilter) return false;
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      return (
        d.domain.toLowerCase().includes(q) ||
        d.client.toLowerCase().includes(q) ||
        d.clientEmail.toLowerCase().includes(q) ||
        d.registrar.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

// ==========================================
// 2. VIEW TEMPLATES & COMPONENTS
// ==========================================

function getDomainStatsCardsHTML() {
  const activeCount = domainsList.filter(d => d.status === 'active').length;
  const expiringCount = domainsList.filter(d => d.status === 'expiring').length;
  const transferCount = domainsList.filter(d => d.status === 'pending-transfer').length;

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Card 1: Total Registered Domains -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="globe" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ICANN Verified
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Registered Domains
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${domainStats.totalDomains.toLocaleString()}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Across 4 Registrars
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            ${activeCount} fully propagated & serving traffic
          </div>
        </div>
      </div>

      <!-- Card 2: Auto-Renew Coverage -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="refresh-cw" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Auto-Billing
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Automated Renewals
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              96.2%
            </span>
            <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              Zero Expiry Gap
            </span>
          </div>
          <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div class="bg-blue-500 h-full rounded-full" style="width: 96.2%"></div>
          </div>
        </div>
      </div>

      <!-- Card 3: Expiring Soon (<30 Days) -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="clock" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Action Ready
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Expiring &lt; 30 Days
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${expiringCount}
            </span>
            <span class="text-xs font-mono text-amber-600 dark:text-amber-400">
              Needs Payment
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Automated customer renewal reminders sent
          </div>
        </div>
      </div>

      <!-- Card 4: Pending Inbound Transfers -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="arrow-left-right" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            EPP Auth
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Inbound Transfers
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${transferCount}
            </span>
            <span class="text-xs font-mono text-purple-600 dark:text-purple-400">
              In Progress
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Awaiting losing registrar 5-day release
          </div>
        </div>
      </div>

    </div>
  `;
}

function getDomainsTableHTML(domains, curFilter, curSearch, curTld) {
  const allCount = domainsList.length;
  const activeCount = domainsList.filter(d => d.status === 'active').length;
  const expiringCount = domainsList.filter(d => d.status === 'expiring').length;
  const transferCount = domainsList.filter(d => d.status === 'pending-transfer').length;

  return `
    <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
      
      <!-- Table Controls Bar -->
      <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button 
            type="button" 
            data-domain-filter="all"
            class="domain-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            All Domains (${allCount})
          </button>
          <button 
            type="button" 
            data-domain-filter="active"
            class="domain-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'active' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Active (${activeCount})
          </button>
          <button 
            type="button" 
            data-domain-filter="expiring"
            class="domain-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'expiring' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Expiring (${expiringCount})
          </button>
          <button 
            type="button" 
            data-domain-filter="pending-transfer"
            class="domain-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'pending-transfer' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Transfers (${transferCount})
          </button>
        </div>

        <!-- Search & TLD Filter -->
        <div class="flex items-center gap-3">
          <div class="relative flex-1 sm:w-60">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="domain-search-input"
              value="${curSearch}"
              placeholder="Search domain, client..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <select 
            id="domain-tld-select"
            class="px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-zinc-500 font-mono"
          >
            <option value="all" ${curTld === 'all' ? 'selected' : ''}>All TLDs</option>
            <option value=".com" ${curTld === '.com' ? 'selected' : ''}>.com</option>
            <option value=".io" ${curTld === '.io' ? 'selected' : ''}>.io</option>
            <option value=".ai" ${curTld === '.ai' ? 'selected' : ''}>.ai</option>
            <option value=".design" ${curTld === '.design' ? 'selected' : ''}>.design</option>
            <option value=".co.uk" ${curTld === '.co.uk' ? 'selected' : ''}>.co.uk</option>
            <option value=".de" ${curTld === '.de' ? 'selected' : ''}>.de</option>
            <option value=".net" ${curTld === '.net' ? 'selected' : ''}>.net</option>
          </select>
        </div>

      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <th class="py-3 px-4 sm:px-6">Domain</th>
              <th class="py-3 px-4">Client / Registrant</th>
              <th class="py-3 px-4">Registrar Backend</th>
              <th class="py-3 px-4">Expires In</th>
              <th class="py-3 px-4">Auto-Renew</th>
              <th class="py-3 px-4">Transfer Lock</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
            ${domains.length === 0 ? `
              <tr>
                <td colspan="8" class="py-12 text-center text-zinc-500">
                  <div class="flex flex-col items-center justify-center">
                    <i data-lucide="globe" class="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-2"></i>
                    <p class="text-sm font-medium text-zinc-900 dark:text-white">No registered domains found</p>
                    <p class="text-xs text-zinc-400 mt-1">Try modifying your search or filter parameters.</p>
                  </div>
                </td>
              </tr>
            ` : domains.map(dom => {
              // Status: plain text, colored, no background pill
              let statusText = '';
              if (dom.status === 'active') {
                statusText = `<span class="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400">Active</span>`;
              } else if (dom.status === 'expiring') {
                statusText = `<span class="text-xs font-mono font-semibold text-amber-500 dark:text-amber-400">Expiring Soon</span>`;
              } else if (dom.status === 'pending-transfer') {
                statusText = `<span class="text-xs font-mono font-semibold text-blue-500 dark:text-blue-400">Transferring</span>`;
              } else {
                statusText = `<span class="text-xs font-mono font-semibold text-rose-500 dark:text-rose-400">Expired</span>`;
              }

              // Days Left (Numbers only)
              let daysText = '';
              if (dom.daysLeft > 0) {
                daysText = `<span class="font-mono text-xs ${dom.daysLeft <= 30 ? 'text-amber-500 font-semibold' : 'text-zinc-900 dark:text-zinc-100'}">${dom.daysLeft} days</span>`;
              } else {
                daysText = `<span class="font-mono text-xs text-rose-500 font-semibold">Expired ${Math.abs(dom.daysLeft)}d ago</span>`;
              }

              return `
                <tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Domain Name -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="font-medium text-zinc-900 dark:text-white font-mono flex items-center gap-1.5">
                      <span>${dom.domain}</span>
                    </div>
                  </td>

                  <!-- Client / Registrant -->
                  <td class="py-3.5 px-4">
                    <div class="font-medium text-zinc-900 dark:text-zinc-100">
                      ${dom.client}
                    </div>
                    <div class="text-[11px] text-zinc-400 font-mono mt-0.5 truncate max-w-[150px]">
                      ${dom.clientEmail}
                    </div>
                  </td>

                  <!-- Registrar Backend (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${dom.registrar}
                  </td>

                  <!-- Expires In (Clean numbers) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${daysText}
                    <div class="text-[10px] font-mono text-zinc-400 mt-0.5">
                      ${dom.expiryDate}
                    </div>
                  </td>

                  <!-- Auto-Renew (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    ${dom.autoRenew ? '<span class="text-zinc-800 dark:text-zinc-200">Enabled</span>' : '<span class="text-zinc-400">Manual</span>'}
                  </td>

                  <!-- Transfer Lock (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    ${dom.transferLock ? '<span class="text-zinc-800 dark:text-zinc-200">Locked</span>' : '<span class="text-amber-500">Unlocked</span>'}
                  </td>

                  <!-- Status (Text Only, Colored) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${statusText}
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <!-- Manage details -->
                      <button 
                        type="button" 
                        class="domain-manage-btn px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        data-dom-id="${dom.id}"
                        title="Manage Nameservers, DNSSEC & EPP Auth"
                      >
                        Manage
                      </button>

                      <!-- Quick renew -->
                      <button 
                        type="button" 
                        class="domain-renew-btn p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        data-dom-id="${dom.id}"
                        title="Renew Domain (+1 Year)"
                      >
                        <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                      </button>

                      <!-- Lock toggle -->
                      <button 
                        type="button" 
                        class="domain-lock-btn p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        data-dom-id="${dom.id}"
                        title="${dom.transferLock ? 'Unlock for Transfer' : 'Enable Transfer Lock'}"
                      >
                        <i data-lucide="${dom.transferLock ? 'lock' : 'unlock'}" class="w-4 h-4"></i>
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

function getDomainDetailsDrawerHTML() {
  return `
    <div id="domain-details-drawer" class="fixed inset-0 z-50 overflow-hidden hidden transition-all duration-300">
      <!-- Backdrop -->
      <div id="domain-details-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-lg bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto custom-scrollbar">
          
          <div>
            <!-- Drawer Header -->
            <div class="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <div class="flex items-center gap-2">
                  <span id="drawer-domain-status" class="text-xs font-mono font-semibold text-emerald-500">Active</span>
                  <span class="text-zinc-600 dark:text-zinc-700">•</span>
                  <span id="drawer-domain-registrar" class="text-xs font-mono text-zinc-400">OpenSRS / Tucows</span>
                </div>
                <h3 id="drawer-domain-name" class="text-lg font-bold font-display text-zinc-900 dark:text-white mt-1">techflow-media.com</h3>
                <p id="drawer-domain-client" class="text-xs font-mono text-zinc-400 mt-0.5">Sarah Jenkins (sarah@techflow.io)</p>
              </div>
              <button type="button" id="close-domain-drawer-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Specs Grid -->
            <div class="mt-6 space-y-4">
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  REGISTRATION & LIFECYCLE
                </div>
                
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span class="text-zinc-400 block text-[11px]">DAYS REMAINING</span>
                    <span id="drawer-domain-days" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">198 days</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">RENEWAL PRICE</span>
                    <span id="drawer-domain-price" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">$13.99/yr</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">REGISTERED ON</span>
                    <span id="drawer-domain-registered" class="font-mono text-zinc-800 dark:text-zinc-200">2021-04-12</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">EXPIRATION DATE</span>
                    <span id="drawer-domain-expires" class="font-mono text-zinc-800 dark:text-zinc-200">2025-04-12</span>
                  </div>
                </div>

                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
                  <span class="text-zinc-400 text-[11px]">WHOIS PRIVACY PROTECTION</span>
                  <span id="drawer-domain-whois" class="font-mono font-medium text-emerald-500">Enabled (Masked)</span>
                </div>

                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
                  <span class="text-zinc-400 text-[11px]">DNSSEC SIGNING</span>
                  <span id="drawer-domain-dnssec" class="font-mono font-medium text-emerald-500">Active (DS Record Synced)</span>
                </div>
              </div>

              <!-- Nameservers Configuration -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  DELEGATED NAMESERVERS
                </div>
                <div id="drawer-domain-ns-list" class="space-y-1 font-mono text-xs text-zinc-800 dark:text-zinc-200">
                  <!-- Injected via JS -->
                </div>
              </div>

              <!-- EPP / Auth Code Box -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                    EPP / TRANSFER AUTH CODE
                  </span>
                  <button 
                    type="button" 
                    id="drawer-copy-epp-btn"
                    class="text-xs font-mono text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                    <span id="drawer-epp-copy-label">Copy Code</span>
                  </button>
                </div>
                <div class="p-2.5 rounded bg-zinc-100 dark:bg-zinc-950 font-mono text-xs text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                  <span id="drawer-domain-epp-text">EPP-7aB9#Hostlab!2024</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Footer Actions -->
          <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
            <button 
              type="button" 
              id="drawer-renew-domain-btn"
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Extend Renewal (+1 Yr)
            </button>
            <button 
              type="button" 
              id="drawer-domain-done-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  `;
}

function getRegisterDomainModalHTML() {
  return `
    <div id="register-domain-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden transition-opacity duration-200">
      <div class="relative w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-5">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white">
              Register / Transfer Domain
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Submit an ICANN registration request or initiate an inbound EPP transfer.
            </p>
          </div>
          <button 
            type="button" 
            id="close-register-domain-modal-btn"
            class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Form Body -->
        <form id="register-domain-form" class="space-y-4">
          
          <!-- Domain Name -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              DOMAIN NAME
            </label>
            <input 
              type="text" 
              id="modal-domain-name-input"
              required
              placeholder="e.g. yourbrand.com"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <!-- Registrar & Operation Type -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                REGISTRATION ACTION
              </label>
              <select 
                id="modal-domain-action-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                <option value="new">New Registration (1 Year)</option>
                <option value="transfer">Inbound Transfer (with EPP)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                REGISTRAR BACKEND
              </label>
              <select 
                id="modal-domain-registrar-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                <option value="OpenSRS / Tucows">OpenSRS / Tucows API</option>
                <option value="Namecheap API">Namecheap API</option>
                <option value="Cloudflare Registrar">Cloudflare Registrar</option>
                <option value="Nominet UK">Nominet Direct (.uk)</option>
              </select>
            </div>
          </div>

          <!-- Client Registrant Contact -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                REGISTRANT CLIENT
              </label>
              <input 
                type="text" 
                id="modal-domain-client-name"
                required
                placeholder="Jane Doe"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                REGISTRANT EMAIL
              </label>
              <input 
                type="email" 
                id="modal-domain-client-email"
                required
                placeholder="jane@example.com"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
          </div>

          <!-- Auto-renew & Privacy Toggles -->
          <div class="space-y-2 pt-1">
            <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <i data-lucide="shield" class="w-4 h-4 text-emerald-500"></i>
                <div class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Free WHOIS Privacy Protection</div>
              </div>
              <input type="checkbox" id="modal-domain-whois-toggle" checked class="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4 cursor-pointer" />
            </div>

            <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <i data-lucide="refresh-cw" class="w-4 h-4 text-emerald-500"></i>
                <div class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Enable Auto-Renewal</div>
              </div>
              <input type="checkbox" id="modal-domain-renew-toggle" checked class="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4 cursor-pointer" />
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-2">
            <button 
              type="button" 
              id="cancel-register-domain-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Submit Registration
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

export function renderRegisteredDomainsHTML() {
  const filtered = getFilteredDomains();

  return `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            DOMAINS & DNS / REGISTERED DOMAINS
          </div>
          <h1 class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mt-1">
            Registered Domains
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            ICANN registration management, WHOIS privacy protection, EPP transfer authorization, and automated lifecycles.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-register-domain-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-mono font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Register Domain</span>
          </button>
        </div>
      </div>

      <!-- 1. Top KPI Metrics -->
      ${getDomainStatsCardsHTML()}

      <!-- 2. Interactive Data Table -->
      <div id="domains-table-container">
        ${getDomainsTableHTML(filtered, currentFilter, currentSearch, currentTldFilter)}
      </div>

      <!-- 3. Register / Transfer Modal -->
      ${getRegisterDomainModalHTML()}

      <!-- 4. Slide-over Details Drawer -->
      ${getDomainDetailsDrawerHTML()}

    </div>
  `;
}

// ==========================================
// 4. EVENT BINDINGS & LIFECYCLE
// ==========================================

export function setupRegisteredDomainsEvents(onNavigate) {
  createIcons({ icons });

  const tableContainer = document.getElementById('domains-table-container');
  const drawer = document.getElementById('domain-details-drawer');
  const closeDrawerBtn = document.getElementById('close-domain-drawer-btn');
  const drawerDoneBtn = document.getElementById('drawer-domain-done-btn');
  const drawerBackdrop = document.getElementById('domain-details-backdrop');

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

  const openDrawer = (dom) => {
    if (!drawer) return;
    const stEl = document.getElementById('drawer-domain-status');
    const rgEl = document.getElementById('drawer-domain-registrar');
    const nmEl = document.getElementById('drawer-domain-name');
    const clEl = document.getElementById('drawer-domain-client');
    const dyEl = document.getElementById('drawer-domain-days');
    const prEl = document.getElementById('drawer-domain-price');
    const regEl = document.getElementById('drawer-domain-registered');
    const expEl = document.getElementById('drawer-domain-expires');
    const whoisEl = document.getElementById('drawer-domain-whois');
    const dnssecEl = document.getElementById('drawer-domain-dnssec');
    const nsContainer = document.getElementById('drawer-domain-ns-list');
    const copyEppBtn = document.getElementById('drawer-copy-epp-btn');
    const copyEppLabel = document.getElementById('drawer-epp-copy-label');
    const eppText = document.getElementById('drawer-domain-epp-text');
    const renewBtn = document.getElementById('drawer-renew-domain-btn');

    if (stEl) {
      if (dom.status === 'active') {
        stEl.textContent = 'Active';
        stEl.className = 'text-xs font-mono font-semibold text-emerald-500';
      } else if (dom.status === 'expiring') {
        stEl.textContent = 'Expiring Soon';
        stEl.className = 'text-xs font-mono font-semibold text-amber-500';
      } else if (dom.status === 'pending-transfer') {
        stEl.textContent = 'Transferring';
        stEl.className = 'text-xs font-mono font-semibold text-blue-500';
      } else {
        stEl.textContent = 'Expired';
        stEl.className = 'text-xs font-mono font-semibold text-rose-500';
      }
    }

    if (rgEl) rgEl.textContent = dom.registrar;
    if (nmEl) nmEl.textContent = dom.domain;
    if (clEl) clEl.textContent = `${dom.client} (${dom.clientEmail})`;
    if (dyEl) {
      dyEl.textContent = dom.daysLeft > 0 ? `${dom.daysLeft} days` : `Expired ${Math.abs(dom.daysLeft)}d ago`;
    }
    if (prEl) prEl.textContent = dom.renewalPrice;
    if (regEl) regEl.textContent = dom.registeredDate;
    if (expEl) expEl.textContent = dom.expiryDate;
    if (whoisEl) {
      whoisEl.textContent = dom.whoisPrivacy ? 'Enabled (Masked)' : 'Disabled (Public)';
      whoisEl.className = `font-mono font-medium ${dom.whoisPrivacy ? 'text-emerald-500' : 'text-zinc-400'}`;
    }
    if (dnssecEl) {
      dnssecEl.textContent = dom.dnssec ? 'Active (DS Record Synced)' : 'Inactive';
      dnssecEl.className = `font-mono font-medium ${dom.dnssec ? 'text-emerald-500' : 'text-zinc-400'}`;
    }

    if (nsContainer) {
      nsContainer.innerHTML = dom.nameservers.map(ns => `
        <div class="flex items-center gap-1.5 py-0.5">
          <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i>
          <span>${ns}</span>
        </div>
      `).join('');
    }

    if (copyEppBtn && copyEppLabel && eppText) {
      copyEppBtn.onclick = () => {
        navigator.clipboard.writeText(eppText.textContent).then(() => {
          copyEppLabel.textContent = 'Copied!';
          setTimeout(() => {
            copyEppLabel.textContent = 'Copy Code';
          }, 1500);
        });
      };
    }

    if (renewBtn) {
      renewBtn.onclick = () => {
        dom.status = 'active';
        dom.daysLeft += 365;
        const nextYear = parseInt(dom.expiryDate.split('-')[0]) + 1;
        dom.expiryDate = `${nextYear}${dom.expiryDate.slice(4)}`;
        renewBtn.textContent = 'Renewed for +1 Year!';
        refreshTable();
        setTimeout(() => {
          openDrawer(dom);
        }, 500);
      };
    }

    drawer.classList.remove('hidden');
    createIcons({ icons });
  };

  const refreshTable = () => {
    if (tableContainer) {
      const filtered = getFilteredDomains();
      tableContainer.innerHTML = getDomainsTableHTML(filtered, currentFilter, currentSearch, currentTldFilter);
      createIcons({ icons });
      attachTableEvents();
    }
  };

  const attachTableEvents = () => {
    // Filter Tabs
    const filterBtns = document.querySelectorAll('.domain-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        currentFilter = btn.getAttribute('data-domain-filter') || 'all';
        refreshTable();
      };
    });

    // Search Input
    const searchInput = document.getElementById('domain-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        currentSearch = e.target.value;
        refreshTable();
      };
    }

    // TLD Select
    const tldSelect = document.getElementById('domain-tld-select');
    if (tldSelect) {
      tldSelect.onchange = (e) => {
        currentTldFilter = e.target.value;
        refreshTable();
      };
    }

    // Manage buttons
    const manageBtns = document.querySelectorAll('.domain-manage-btn');
    manageBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-dom-id');
        const dom = domainsList.find(d => d.id === id);
        if (dom) openDrawer(dom);
      };
    });

    // Quick Renew
    const renewBtns = document.querySelectorAll('.domain-renew-btn');
    renewBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-dom-id');
        const dom = domainsList.find(d => d.id === id);
        if (dom) {
          dom.status = 'active';
          dom.daysLeft += 365;
          const nextYear = parseInt(dom.expiryDate.split('-')[0]) + 1;
          dom.expiryDate = `${nextYear}${dom.expiryDate.slice(4)}`;
          refreshTable();
        }
      };
    });

    // Quick Lock Toggle
    const lockBtns = document.querySelectorAll('.domain-lock-btn');
    lockBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-dom-id');
        const dom = domainsList.find(d => d.id === id);
        if (dom) {
          dom.transferLock = !dom.transferLock;
          refreshTable();
        }
      };
    });
  };

  attachTableEvents();

  // Register Modal logic
  const regModal = document.getElementById('register-domain-modal');
  const openRegBtn = document.getElementById('open-register-domain-btn');
  const closeRegBtn = document.getElementById('close-register-domain-modal-btn');
  const cancelRegBtn = document.getElementById('cancel-register-domain-btn');
  const regForm = document.getElementById('register-domain-form');

  if (openRegBtn && regModal) {
    openRegBtn.onclick = () => regModal.classList.remove('hidden');
  }

  const closeReg = () => {
    if (regModal) regModal.classList.add('hidden');
    if (regForm) regForm.reset();
  };

  if (closeRegBtn) closeRegBtn.onclick = closeReg;
  if (cancelRegBtn) cancelRegBtn.onclick = closeReg;

  if (regForm) {
    regForm.onsubmit = (e) => {
      e.preventDefault();
      const domainName = document.getElementById('modal-domain-name-input')?.value.trim();
      const action = document.getElementById('modal-domain-action-select')?.value || 'new';
      const registrar = document.getElementById('modal-domain-registrar-select')?.value || 'OpenSRS / Tucows';
      const client = document.getElementById('modal-domain-client-name')?.value.trim();
      const clientEmail = document.getElementById('modal-domain-client-email')?.value.trim();
      const whois = document.getElementById('modal-domain-whois-toggle')?.checked ?? true;
      const autoRenew = document.getElementById('modal-domain-renew-toggle')?.checked ?? true;

      if (!domainName || !client || !clientEmail) return;

      const tldMatch = domainName.match(/\.[a-z.]+$/i);
      const tld = tldMatch ? tldMatch[0].toLowerCase() : '.com';

      const newDom = {
        id: `dom-${Date.now()}`,
        domain: domainName,
        tld,
        registrar,
        client,
        clientEmail,
        registeredDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
        daysLeft: 365,
        renewalPrice: '$13.99/yr',
        autoRenew,
        transferLock: true,
        whoisPrivacy: whois,
        dnssec: false,
        nameservers: ['ns1.hostlab.cloud', 'ns2.hostlab.cloud'],
        status: action === 'transfer' ? 'pending-transfer' : 'active'
      };

      domainsList.unshift(newDom);
      closeReg();
      refreshTable();
    };
  }
}

export function cleanupRegisteredDomains() {
  currentFilter = 'all';
  currentSearch = '';
  currentTldFilter = 'all';
}
