import { createIcons, icons } from 'lucide';

/**
 * Hostlab Email Aliases & Routing Module
 * Dedicated standalone module for virtual mail aliases, forwarders, catch-all rules,
 * group distribution routing, and sender rewriting schemes (SRS).
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const aliasStats = {
  totalAliases: 1428,
  activeRoutes: 1392,
  catchAllEnabled: 38,
  forwarded24h: '184.6K',
  avgLatencyMs: '42ms',
  spamDiscarded24h: '3.8K'
};

export const initialAliases = [
  {
    id: 'als-501',
    source: 'support@techflow-media.com',
    sourcePrefix: 'support',
    domain: 'techflow-media.com',
    type: 'Group Distribution',
    targets: ['sarah@techflow-media.com', 'helpdesk@zendesk.techflow.io', 'alex@techflow-media.com'],
    srsEnabled: true,
    delivered30d: 48920,
    status: 'active', // active | paused | error
    created: '2024-02-14',
    notes: 'Primary customer support inbound pipeline with SRS enabled'
  },
  {
    id: 'als-502',
    source: 'jobs@techflow-media.com',
    sourcePrefix: 'jobs',
    domain: 'techflow-media.com',
    type: 'Forwarder',
    targets: ['hr-inbox@lever-recruitment.com'],
    srsEnabled: true,
    delivered30d: 3410,
    status: 'active',
    created: '2024-03-01',
    notes: 'Direct forward to ATS recruiting software'
  },
  {
    id: 'als-503',
    source: '*@techflow-media.com',
    sourcePrefix: '*',
    domain: 'techflow-media.com',
    type: 'Catch-All',
    targets: ['info@techflow-media.com'],
    srsEnabled: false,
    delivered30d: 12400,
    status: 'active',
    created: '2024-01-10',
    notes: 'Default domain catch-all for unmatched recipient mailboxes'
  },
  {
    id: 'als-504',
    source: 'press@apexstudios.design',
    sourcePrefix: 'press',
    domain: 'apexstudios.design',
    type: 'Forwarder',
    targets: ['david@apexstudios.design', 'media-agency@pr-global.com'],
    srsEnabled: true,
    delivered30d: 6120,
    status: 'active',
    created: '2024-02-18',
    notes: 'Media and press kit inquiries forwarder'
  },
  {
    id: 'als-505',
    source: 'invoices@apexstudios.design',
    sourcePrefix: 'invoices',
    domain: 'apexstudios.design',
    type: 'Group Distribution',
    targets: ['billing@apexstudios.design', 'accounting@quickbooks-online.com'],
    srsEnabled: true,
    delivered30d: 19800,
    status: 'active',
    created: '2024-01-25',
    notes: 'Automated ingestion pipeline for accounts payable'
  },
  {
    id: 'als-506',
    source: '*@apexstudios.design',
    sourcePrefix: '*',
    domain: 'apexstudios.design',
    type: 'Catch-All',
    targets: ['david@apexstudios.design'],
    srsEnabled: false,
    delivered30d: 8750,
    status: 'paused',
    created: '2024-02-05',
    notes: 'Temporarily disabled catch-all due to spam harvesting attack'
  },
  {
    id: 'als-507',
    source: 'security@cloudscale-saas.net',
    sourcePrefix: 'security',
    domain: 'cloudscale-saas.net',
    type: 'Group Distribution',
    targets: ['secops@cloudscale-saas.net', 'pagerduty-mail@pagerduty.com'],
    srsEnabled: true,
    delivered30d: 1540,
    status: 'active',
    created: '2024-04-02',
    notes: 'High-priority RFC 9116 security contact inbox'
  },
  {
    id: 'als-508',
    source: 'postmaster@cloudscale-saas.net',
    sourcePrefix: 'postmaster',
    domain: 'cloudscale-saas.net',
    type: 'Forwarder',
    targets: ['admin@cloudscale-saas.net'],
    srsEnabled: true,
    delivered30d: 820,
    status: 'active',
    created: '2024-04-02',
    notes: 'Standard RFC compliant postmaster router'
  },
  {
    id: 'als-509',
    source: 'contact@urbanbistro.io',
    sourcePrefix: 'contact',
    domain: 'urbanbistro.io',
    type: 'Forwarder',
    targets: ['gm-urbanbistro@gmail.com'],
    srsEnabled: true,
    delivered30d: 4210,
    status: 'active',
    created: '2024-03-22',
    notes: 'Forward direct to owner private mobile Gmail'
  },
  {
    id: 'als-510',
    source: 'reservations@urbanbistro.io',
    sourcePrefix: 'reservations',
    domain: 'urbanbistro.io',
    type: 'Group Distribution',
    targets: ['opentable-sync@urbanbistro.io', 'hostess-stand@urbanbistro.io'],
    srsEnabled: true,
    delivered30d: 9140,
    status: 'active',
    created: '2024-03-24',
    notes: 'Table booking notifications split forwarder'
  },
  {
    id: 'als-511',
    source: 'webhooks@hypervault-fintech.com',
    sourcePrefix: 'webhooks',
    domain: 'hypervault-fintech.com',
    type: 'Pipe to Script',
    targets: ['/var/scripts/mail-webhook-parser.py'],
    srsEnabled: false,
    delivered30d: 84300,
    status: 'active',
    created: '2024-05-10',
    notes: 'Piped inbound transaction alerts into internal ingestion consumer'
  },
  {
    id: 'als-512',
    source: 'compliance@hypervault-fintech.com',
    sourcePrefix: 'compliance',
    domain: 'hypervault-fintech.com',
    type: 'Group Distribution',
    targets: ['legal@hypervault-fintech.com', 'audit-archive@s3-mail-vault.internal'],
    srsEnabled: true,
    delivered30d: 7300,
    status: 'active',
    created: '2024-05-12',
    notes: 'Dual delivery with immutable SEC compliant cold archive'
  }
];

let aliasesList = [...initialAliases];
let currentFilter = 'all'; // all | forwarder | catchall | group
let currentSearch = '';
let currentDomainFilter = 'all';
let selectedAliasId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderAliasesHTML() {
  const domains = Array.from(new Set(aliasesList.map(a => a.domain))).sort();

  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
            <span>Business Email</span>
            <span>/</span>
            <span class="text-zinc-900 dark:text-zinc-100 font-semibold">Aliases & Routing</span>
          </div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Email Aliases & Routing
          </h1>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Manage virtual inbound addresses, catch-all domains, multi-recipient distribution groups, and SRS forwarding.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-create-alias-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Create Alias / Rule</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
          <div class="flex items-center justify-between text-zinc-500 text-xs font-mono mb-2">
            <span>TOTAL ALIASES</span>
            <i data-lucide="arrow-left-right" class="w-4 h-4 text-zinc-400"></i>
          </div>
          <div class="text-2xl font-bold text-zinc-900 dark:text-white font-display">
            ${aliasStats.totalAliases.toLocaleString()}
          </div>
          <div class="text-[11px] text-zinc-500 mt-1">
            Across registered mail domains
          </div>
        </div>

        <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
          <div class="flex items-center justify-between text-zinc-500 text-xs font-mono mb-2">
            <span>ACTIVE ROUTES</span>
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500"></i>
          </div>
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-display">
            ${aliasStats.activeRoutes.toLocaleString()}
          </div>
          <div class="text-[11px] text-zinc-500 mt-1">
            ${((aliasStats.activeRoutes / aliasStats.totalAliases) * 100).toFixed(1)}% operational delivery
          </div>
        </div>

        <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
          <div class="flex items-center justify-between text-zinc-500 text-xs font-mono mb-2">
            <span>CATCH-ALL DOMAINS</span>
            <i data-lucide="inbox" class="w-4 h-4 text-blue-500"></i>
          </div>
          <div class="text-2xl font-bold text-zinc-900 dark:text-white font-display">
            ${aliasStats.catchAllEnabled}
          </div>
          <div class="text-[11px] text-zinc-500 mt-1">
            Capturing unmatched addresses
          </div>
        </div>

        <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
          <div class="flex items-center justify-between text-zinc-500 text-xs font-mono mb-2">
            <span>FORWARDED (24H)</span>
            <i data-lucide="send" class="w-4 h-4 text-zinc-400"></i>
          </div>
          <div class="text-2xl font-bold text-zinc-900 dark:text-white font-display">
            ${aliasStats.forwarded24h}
          </div>
          <div class="text-[11px] text-zinc-500 mt-1">
            Avg relay latency ${aliasStats.avgLatencyMs}
          </div>
        </div>

      </div>

      <!-- Controls & Tabs -->
      <div class="space-y-4">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2" id="alias-filter-tabs">
          <button 
            type="button" 
            data-filter="all" 
            class="alias-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            All Rules (<span id="count-all">0</span>)
          </button>
          
          <button 
            type="button" 
            data-filter="forwarder" 
            class="alias-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'forwarder' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Direct Forwarders (<span id="count-forwarder">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="group" 
            class="alias-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'group' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Group Distribution (<span id="count-group">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="catchall" 
            class="alias-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'catchall' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Catch-All Rules (<span id="count-catchall">0</span>)
          </button>
        </div>

        <!-- Filter Search & Domain Selector -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="alias-search-input"
              value="${currentSearch}"
              placeholder="Search by alias, domain, or target destination..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <select 
              id="alias-domain-select" 
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Domains</option>
              ${domains.map(d => `<option value="${d}" ${currentDomainFilter === d ? 'selected' : ''}>${d}</option>`).join('')}
            </select>
          </div>
        </div>

      </div>

      <!-- Main Data Table -->
      <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900/40 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
                <th class="py-3 px-4 font-medium">Source Alias</th>
                <th class="py-3 px-4 font-medium">Routing Type</th>
                <th class="py-3 px-4 font-medium">Destination Targets</th>
                <th class="py-3 px-4 font-medium">SRS Rewriting</th>
                <th class="py-3 px-4 font-medium text-right">Delivered (30D)</th>
                <th class="py-3 px-4 font-medium text-center">Status</th>
                <th class="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="alias-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <!-- Empty state container -->
        <div id="alias-empty-state" class="hidden p-12 text-center">
          <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
            <i data-lucide="arrow-left-right" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No email aliases found</h3>
          <p class="text-xs text-zinc-500 max-w-sm mx-auto">
            No alias rules match the selected filter criteria or search query.
          </p>
        </div>
      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="alias-drawer-container"></div>

      <!-- Create Alias Modal -->
      <div id="create-alias-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="plus-circle" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold font-display text-zinc-900 dark:text-white text-base">Create Routing Rule</h3>
            </div>
            <button type="button" id="close-create-alias-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="create-alias-form" class="p-6 space-y-4">
            
            <!-- Source Address -->
            <div>
              <label class="block text-xs font-mono uppercase text-zinc-500 mb-1.5">Source Address</label>
              <div class="flex items-center">
                <input 
                  type="text" 
                  id="modal-alias-prefix-input" 
                  placeholder="support or * (for catch-all)" 
                  required
                  class="flex-1 px-3 py-2 text-xs rounded-l-md border border-r-0 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
                />
                <span class="px-2 py-2 text-xs bg-zinc-100 dark:bg-zinc-800 border-y border-zinc-200 dark:border-zinc-800 text-zinc-500 font-mono">@</span>
                <select 
                  id="modal-alias-domain-select" 
                  class="px-3 py-2 text-xs rounded-r-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
                >
                  ${domains.map(d => `<option value="${d}">${d}</option>`).join('')}
                </select>
              </div>
              <p class="text-[11px] text-zinc-500 mt-1">Use <span class="font-mono text-zinc-700 dark:text-zinc-300">*</span> to create a domain-wide catch-all rule.</p>
            </div>

            <!-- Routing Type -->
            <div>
              <label class="block text-xs font-mono uppercase text-zinc-500 mb-1.5">Rule Type</label>
              <select 
                id="modal-alias-type-select" 
                class="w-full px-3 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
              >
                <option value="Forwarder">Direct Forwarder (Single or external inbox)</option>
                <option value="Group Distribution">Group Distribution (Multiple internal/external inboxes)</option>
                <option value="Catch-All">Catch-All (Fallback for unrouted addresses)</option>
                <option value="Pipe to Script">Pipe to Script (CLI stdin processor)</option>
              </select>
            </div>

            <!-- Destination Targets -->
            <div>
              <label class="block text-xs font-mono uppercase text-zinc-500 mb-1.5">Destination Targets (comma separated)</label>
              <textarea 
                id="modal-alias-targets-input" 
                rows="3" 
                placeholder="sarah@techflow-media.com, help@zendesk.io" 
                required
                class="w-full px-3 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none placeholder-zinc-400 font-mono"
              ></textarea>
              <p class="text-[11px] text-zinc-500 mt-1">For pipe to script, enter absolute executable path (e.g. /var/scripts/hook.py).</p>
            </div>

            <!-- SRS Option -->
            <div class="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
              <div>
                <div class="text-xs font-medium text-zinc-900 dark:text-white">Enable SRS (Sender Rewriting Scheme)</div>
                <div class="text-[11px] text-zinc-500">Rewrites MAIL FROM envelope to preserve SPF compliance on forwarded mail</div>
              </div>
              <input type="checkbox" id="modal-alias-srs-checkbox" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-0 w-4 h-4 cursor-pointer" />
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-create-alias-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Create Rule
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  `;
}

// ==========================================
// 3. TABLE ROWS GENERATOR
// ==========================================

function getFilteredAliases() {
  return aliasesList.filter(item => {
    // 1. Tab filter
    if (currentFilter === 'forwarder' && item.type !== 'Forwarder') return false;
    if (currentFilter === 'catchall' && item.type !== 'Catch-All') return false;
    if (currentFilter === 'group' && item.type !== 'Group Distribution' && item.type !== 'Pipe to Script') return false;

    // 2. Domain filter
    if (currentDomainFilter !== 'all' && item.domain !== currentDomainFilter) return false;

    // 3. Search query
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchSource = item.source.toLowerCase().includes(q);
      const matchDomain = item.domain.toLowerCase().includes(q);
      const matchTargets = item.targets.some(t => t.toLowerCase().includes(q));
      if (!matchSource && !matchDomain && !matchTargets) return false;
    }

    return true;
  });
}

function updateTabCounts() {
  const countAll = document.getElementById('count-all');
  const countForwarder = document.getElementById('count-forwarder');
  const countCatchall = document.getElementById('count-catchall');
  const countGroup = document.getElementById('count-group');

  if (countAll) countAll.textContent = aliasesList.length;
  if (countForwarder) countForwarder.textContent = aliasesList.filter(a => a.type === 'Forwarder').length;
  if (countCatchall) countCatchall.textContent = aliasesList.filter(a => a.type === 'Catch-All').length;
  if (countGroup) countGroup.textContent = aliasesList.filter(a => a.type === 'Group Distribution' || a.type === 'Pipe to Script').length;
}

function renderTableRows() {
  const tbody = document.getElementById('alias-table-body');
  const emptyState = document.getElementById('alias-empty-state');
  if (!tbody) return;

  const filtered = getFilteredAliases();

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(item => {
    // Status text formatting: plain text with color, NO background pill
    let statusClass = 'text-emerald-500';
    let statusLabel = 'Active';
    if (item.status === 'paused') {
      statusClass = 'text-zinc-500';
      statusLabel = 'Paused';
    } else if (item.status === 'error') {
      statusClass = 'text-rose-500';
      statusLabel = 'Error';
    }

    // Destinations preview
    let targetsDisplay = '';
    if (item.targets.length === 1) {
      targetsDisplay = `<span class="font-mono text-zinc-900 dark:text-zinc-100">${item.targets[0]}</span>`;
    } else {
      targetsDisplay = `
        <div class="flex items-center gap-1.5">
          <span class="font-mono text-zinc-900 dark:text-zinc-100">${item.targets[0]}</span>
          <span class="text-[11px] text-zinc-500 font-mono">+${item.targets.length - 1} more</span>
        </div>
      `;
    }

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Source Alias -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          <div class="flex items-center gap-2">
            ${item.sourcePrefix === '*' 
              ? `<i data-lucide="sparkles" class="w-3.5 h-3.5 text-blue-500 shrink-0"></i>` 
              : `<i data-lucide="at-sign" class="w-3.5 h-3.5 text-zinc-400 shrink-0"></i>`}
            <span>${item.source}</span>
          </div>
        </td>

        <!-- Routing Type (plain text, no pill) -->
        <td class="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-300">
          ${item.type}
        </td>

        <!-- Destination Targets -->
        <td class="py-3 px-4">
          ${targetsDisplay}
        </td>

        <!-- SRS Rewriting -->
        <td class="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-300">
          ${item.srsEnabled ? 'Enabled (SRS-1)' : 'Disabled'}
        </td>

        <!-- Delivered (30D) (clean numbers) -->
        <td class="py-3 px-4 font-mono text-right text-zinc-900 dark:text-zinc-100">
          ${item.delivered30d.toLocaleString()} msgs
        </td>

        <!-- Status (plain text with color, NO background pill) -->
        <td class="py-3 px-4 text-center font-mono font-medium ${statusClass}">
          ${statusLabel}
        </td>

        <!-- Actions -->
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1">
            <button 
              type="button" 
              data-view-alias="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Inspect Routing Details"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-toggle-alias="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="${item.status === 'active' ? 'Pause Rule' : 'Resume Rule'}"
            >
              <i data-lucide="${item.status === 'active' ? 'pause' : 'play'}" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-delete-alias="${item.id}"
              class="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Delete Rule"
            >
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  createIcons({ icons });
}

// ==========================================
// 4. SLIDE-OVER DRAWER (DETAILS & LOGS)
// ==========================================

function renderAliasDrawer(aliasId) {
  const container = document.getElementById('alias-drawer-container');
  if (!container) return;

  const item = aliasesList.find(a => a.id === aliasId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let statusClass = 'text-emerald-500';
  let statusLabel = 'Active';
  if (item.status === 'paused') {
    statusClass = 'text-zinc-500';
    statusLabel = 'Paused';
  } else if (item.status === 'error') {
    statusClass = 'text-rose-500';
    statusLabel = 'Error';
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-xl h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>Routing Inspector</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${statusLabel}</span>
            </div>
            <h2 class="text-xl font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2">
              <i data-lucide="arrow-left-right" class="w-5 h-5 text-zinc-400"></i>
              <span>${item.source}</span>
            </h2>
          </div>
          <button 
            type="button" 
            id="close-alias-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700 dark:text-zinc-300">
          
          <!-- Routing Architecture Flow Diagram -->
          <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 space-y-3">
            <div class="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Pipeline Routing Topology</div>
            <div class="flex items-center justify-between gap-2 text-xs font-mono">
              <div class="p-2.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center flex-1">
                <div class="text-zinc-500 text-[10px]">INBOUND</div>
                <div class="font-bold text-zinc-900 dark:text-white truncate">${item.source}</div>
              </div>
              <i data-lucide="arrow-right" class="w-4 h-4 text-zinc-400 shrink-0"></i>
              <div class="p-2.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center flex-1">
                <div class="text-zinc-500 text-[10px]">FILTER / SRS</div>
                <div class="font-bold text-emerald-500">${item.srsEnabled ? 'SRS Active' : 'Passthrough'}</div>
              </div>
              <i data-lucide="arrow-right" class="w-4 h-4 text-zinc-400 shrink-0"></i>
              <div class="p-2.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center flex-1">
                <div class="text-zinc-500 text-[10px]">TARGETS</div>
                <div class="font-bold text-zinc-900 dark:text-white">${item.targets.length} dest</div>
              </div>
            </div>
          </div>

          <!-- Destinations List -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono uppercase text-zinc-500">Configured Destinations (${item.targets.length})</span>
              <button 
                type="button" 
                id="copy-targets-btn"
                class="text-[11px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                <span>Copy Targets</span>
              </button>
            </div>
            <div class="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              ${item.targets.map((t, idx) => `
                <div class="p-3 bg-white dark:bg-zinc-900/50 flex items-center justify-between">
                  <div class="flex items-center gap-2 font-mono text-xs">
                    <span class="text-zinc-400 text-[11px]">${idx + 1}.</span>
                    <span class="font-medium text-zinc-900 dark:text-white">${t}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[11px] font-mono text-emerald-500">Delivery Ready</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Technical Attributes -->
          <div class="space-y-3">
            <div class="text-xs font-mono uppercase text-zinc-500">Routing Specifications</div>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">RULE TYPE</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.type}</div>
              </div>
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">SENDER REWRITING (SRS)</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.srsEnabled ? 'RFC 5321 Rewriting' : 'Disabled'}</div>
              </div>
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">DOMAIN PARENT</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.domain}</div>
              </div>
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">CREATED ON</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.created}</div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <div class="text-xs font-mono uppercase text-zinc-500 mb-1.5">Rule Purpose & Notes</div>
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 font-mono text-zinc-600 dark:text-zinc-400 text-xs">
              ${item.notes || 'No administrative notes added.'}
            </div>
          </div>

          <!-- Recent Forwarding Activity Log -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-zinc-500">Recent Inbound Relay Activity</span>
              <span class="text-[11px] font-mono text-emerald-500 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live MTA Ingestion
              </span>
            </div>
            <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-xs">
              <table class="w-full text-left font-mono">
                <thead class="bg-zinc-50 dark:bg-zinc-800/60 text-[10px] text-zinc-500 uppercase border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th class="py-2 px-3">Sender</th>
                    <th class="py-2 px-3">Relay Status</th>
                    <th class="py-2 px-3 text-right">Time</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                  <tr>
                    <td class="py-2 px-3 truncate max-w-[150px]">alerts@github.com</td>
                    <td class="py-2 px-3 text-emerald-500">Delivered (250 OK)</td>
                    <td class="py-2 px-3 text-right text-zinc-400">4m ago</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 truncate max-w-[150px]">contact@stripe.com</td>
                    <td class="py-2 px-3 text-emerald-500">Delivered (250 OK)</td>
                    <td class="py-2 px-3 text-right text-zinc-400">18m ago</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 truncate max-w-[150px]">newsletter@substack.com</td>
                    <td class="py-2 px-3 text-emerald-500">Delivered (250 OK)</td>
                    <td class="py-2 px-3 text-right text-zinc-400">1h ago</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 truncate max-w-[150px]">spammer@bad-actor.biz</td>
                    <td class="py-2 px-3 text-rose-500">Discarded (RSPAMD)</td>
                    <td class="py-2 px-3 text-right text-zinc-400">2h ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
          <button 
            type="button" 
            id="drawer-delete-alias-btn"
            class="px-3 py-2 text-xs font-medium rounded-md text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            Delete Rule
          </button>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="drawer-toggle-status-btn"
              class="px-3.5 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              ${item.status === 'active' ? 'Pause Routing' : 'Resume Routing'}
            </button>
            <button 
              type="button" 
              id="drawer-done-btn"
              class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  `;

  createIcons({ icons });

  // Drawer event bindings
  const closeBtn = document.getElementById('close-alias-drawer-btn');
  const doneBtn = document.getElementById('drawer-done-btn');
  const toggleBtn = document.getElementById('drawer-toggle-status-btn');
  const deleteBtn = document.getElementById('drawer-delete-alias-btn');
  const copyBtn = document.getElementById('copy-targets-btn');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedAliasId = null;
  };

  if (closeBtn) closeBtn.onclick = closeDrawer;
  if (doneBtn) doneBtn.onclick = closeDrawer;

  const backdrop = container.firstElementChild;
  if (backdrop) {
    backdrop.onclick = (e) => {
      const panel = backdrop.firstElementChild;
      if (panel && !panel.contains(e.target)) closeDrawer();
    };
  }

  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(item.targets.join(', '));
      const span = copyBtn.querySelector('span');
      if (span) {
        span.textContent = 'Copied!';
        setTimeout(() => { span.textContent = 'Copy Targets'; }, 1500);
      }
    };
  }

  if (toggleBtn) {
    toggleBtn.onclick = () => {
      item.status = item.status === 'active' ? 'paused' : 'active';
      renderAliasDrawer(item.id);
      renderTableRows();
    };
  }

  if (deleteBtn) {
    deleteBtn.onclick = () => {
      aliasesList = aliasesList.filter(a => a.id !== item.id);
      closeDrawer();
      updateTabCounts();
      renderTableRows();
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupAliasesEvents(onNavigate) {
  createIcons({ icons });
  updateTabCounts();
  renderTableRows();

  // Tab Filtering
  const tabs = document.querySelectorAll('.alias-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => {
        t.className = 'alias-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white';
      });
      tab.className = 'alias-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900';

      currentFilter = tab.getAttribute('data-filter') || 'all';
      renderTableRows();
    };
  });

  // Search input
  const searchInput = document.getElementById('alias-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Domain selector
  const domainSelect = document.getElementById('alias-domain-select');
  if (domainSelect) {
    domainSelect.onchange = (e) => {
      currentDomainFilter = e.target.value;
      renderTableRows();
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('alias-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-alias]');
      const toggleBtn = e.target.closest('[data-toggle-alias]');
      const deleteBtn = e.target.closest('[data-delete-alias]');

      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-alias');
        selectedAliasId = id;
        renderAliasDrawer(id);
      } else if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-toggle-alias');
        const item = aliasesList.find(a => a.id === id);
        if (item) {
          item.status = item.status === 'active' ? 'paused' : 'active';
          renderTableRows();
        }
      } else if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-delete-alias');
        aliasesList = aliasesList.filter(a => a.id !== id);
        updateTabCounts();
        renderTableRows();
      }
    };
  }

  // Create Modal Handlers
  const openCreateBtn = document.getElementById('open-create-alias-btn');
  const createModal = document.getElementById('create-alias-modal');
  const closeCreateBtn = document.getElementById('close-create-alias-modal-btn');
  const cancelCreateBtn = document.getElementById('cancel-create-alias-btn');
  const createForm = document.getElementById('create-alias-form');

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
      const prefix = document.getElementById('modal-alias-prefix-input')?.value.trim();
      const domain = document.getElementById('modal-alias-domain-select')?.value || 'techflow-media.com';
      const type = document.getElementById('modal-alias-type-select')?.value || 'Forwarder';
      const rawTargets = document.getElementById('modal-alias-targets-input')?.value.trim() || '';
      const srs = document.getElementById('modal-alias-srs-checkbox')?.checked ?? true;

      if (!prefix || !rawTargets) return;

      const targets = rawTargets.split(/[\n,]+/).map(t => t.trim()).filter(Boolean);
      const source = prefix === '*' ? `*@${domain}` : `${prefix}@${domain}`;

      const newRule = {
        id: `als-${Date.now()}`,
        source,
        sourcePrefix: prefix,
        domain,
        type,
        targets,
        srsEnabled: srs,
        delivered30d: 0,
        status: 'active',
        created: new Date().toISOString().split('T')[0],
        notes: `Custom created routing rule for ${source}`
      };

      aliasesList.unshift(newRule);
      closeCreate();
      updateTabCounts();
      renderTableRows();
    };
  }
}

export function cleanupAliases() {
  currentFilter = 'all';
  currentSearch = '';
  currentDomainFilter = 'all';
  selectedAliasId = null;
}
