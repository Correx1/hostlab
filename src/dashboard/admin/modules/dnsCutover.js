import { createIcons, icons } from 'lucide';

/**
 * Hostlab DNS Cutover Module
 * Dedicated standalone module for orchestrating the final traffic switch,
 * registrar nameserver/A-record updates, global TTL countdowns, and rollback safety.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const cutoverStats = {
  readyForCutover: 3,
  inPropagation: 2,
  completed30d: 142,
  avgPropagationMins: '18m',
  verifiedHealthRate: '100%',
  rollbackIncidents: 0
};

export const initialCutovers = [
  {
    id: 'cut-901',
    domain: 'devstudio-agency.net',
    client: 'DevStudio Digital',
    registrar: 'Namecheap API',
    oldHost: 'DigitalOcean Droplet',
    oldIp: '104.248.55.9',
    newHost: 'vps-lon-01',
    newIp: '185.193.64.12',
    currentTtl: '300s',
    propagationPercent: 100,
    nodesResolved: '18/18',
    status: 'completed', // completed | propagating | ready | rollback
    cutoverDate: '1 hour ago',
    sslReady: true,
    dataSynced: true,
    dnsNodes: [
      { location: 'London, UK (Cloudflare)', ip: '185.193.64.12', status: 'resolved' },
      { location: 'Frankfurt, DE (Google 8.8.8.8)', ip: '185.193.64.12', status: 'resolved' },
      { location: 'New York, US (Quad9)', ip: '185.193.64.12', status: 'resolved' },
      { location: 'Singapore, SG (OpenDNS)', ip: '185.193.64.12', status: 'resolved' }
    ]
  },
  {
    id: 'cut-902',
    domain: 'urbanbarista.coffee',
    client: 'Urban Barista Ltd',
    registrar: 'Cloudflare Registrar',
    oldHost: 'Linode Nanode',
    oldIp: '178.62.204.11',
    newHost: 'app-fra-02',
    newIp: '185.193.64.14',
    currentTtl: '120s',
    propagationPercent: 100,
    nodesResolved: '18/18',
    status: 'completed',
    cutoverDate: '2 hours ago',
    sslReady: true,
    dataSynced: true,
    dnsNodes: [
      { location: 'London, UK (Cloudflare)', ip: '185.193.64.14', status: 'resolved' },
      { location: 'Frankfurt, DE (Google 8.8.8.8)', ip: '185.193.64.14', status: 'resolved' },
      { location: 'New York, US (Quad9)', ip: '185.193.64.14', status: 'resolved' },
      { location: 'Tokyo, JP (Level3)', ip: '185.193.64.14', status: 'resolved' }
    ]
  },
  {
    id: 'cut-903',
    domain: 'apexmedia.co',
    client: 'Apex Media Group',
    registrar: 'GoDaddy API',
    oldHost: 'HostGator Dedicated',
    oldIp: '198.51.100.42',
    newHost: 'vps-lon-01',
    newIp: '185.193.64.12',
    currentTtl: '300s',
    propagationPercent: 78,
    nodesResolved: '14/18',
    status: 'propagating',
    cutoverDate: '8 minutes ago',
    sslReady: true,
    dataSynced: true,
    dnsNodes: [
      { location: 'London, UK (Cloudflare)', ip: '185.193.64.12', status: 'resolved' },
      { location: 'Frankfurt, DE (Google 8.8.8.8)', ip: '185.193.64.12', status: 'resolved' },
      { location: 'New York, US (Quad9)', ip: '198.51.100.42', status: 'propagating' },
      { location: 'Sydney, AU (Telstra)', ip: '198.51.100.42', status: 'propagating' }
    ]
  },
  {
    id: 'cut-904',
    domain: 'nordicfintech.se',
    client: 'Nordic Capital AB',
    registrar: 'Loopia DNS',
    oldHost: 'Hetzner Dedicated',
    oldIp: '194.14.88.5',
    newHost: 'vps-sto-01',
    newIp: '185.193.66.88',
    currentTtl: '300s',
    propagationPercent: 44,
    nodesResolved: '8/18',
    status: 'propagating',
    cutoverDate: '14 minutes ago',
    sslReady: true,
    dataSynced: true,
    dnsNodes: [
      { location: 'Stockholm, SE (Telia)', ip: '185.193.66.88', status: 'resolved' },
      { location: 'Frankfurt, DE (Google 8.8.8.8)', ip: '185.193.66.88', status: 'resolved' },
      { location: 'New York, US (Quad9)', ip: '194.14.88.5', status: 'propagating' },
      { location: 'Singapore, SG (OpenDNS)', ip: '194.14.88.5', status: 'propagating' }
    ]
  },
  {
    id: 'cut-905',
    domain: 'freshgreenshop.com',
    client: 'Fresh Green Organics',
    registrar: 'AWS Route53',
    oldHost: 'SiteGround Cloud',
    oldIp: '172.67.142.19',
    newHost: 'app-fra-02',
    newIp: '185.193.64.14',
    currentTtl: '300s',
    propagationPercent: 0,
    nodesResolved: '0/18',
    status: 'ready',
    cutoverDate: 'Awaiting trigger',
    sslReady: true,
    dataSynced: true,
    dnsNodes: [
      { location: 'London, UK (Cloudflare)', ip: '172.67.142.19', status: 'ready' },
      { location: 'Frankfurt, DE (Google 8.8.8.8)', ip: '172.67.142.19', status: 'ready' },
      { location: 'New York, US (Quad9)', ip: '172.67.142.19', status: 'ready' },
      { location: 'Tokyo, JP (Level3)', ip: '172.67.142.19', status: 'ready' }
    ]
  },
  {
    id: 'cut-906',
    domain: 'velocityautos.co.uk',
    client: 'Velocity Motors Ltd',
    registrar: '123-Reg',
    oldHost: 'IONOS Cloud',
    oldIp: '82.165.197.1',
    newHost: 'vps-lon-02',
    newIp: '185.193.64.18',
    currentTtl: '600s',
    propagationPercent: 0,
    nodesResolved: '0/18',
    status: 'ready',
    cutoverDate: 'Awaiting trigger',
    sslReady: true,
    dataSynced: true,
    dnsNodes: [
      { location: 'London, UK (Cloudflare)', ip: '82.165.197.1', status: 'ready' },
      { location: 'Frankfurt, DE (Google 8.8.8.8)', ip: '82.165.197.1', status: 'ready' },
      { location: 'New York, US (Quad9)', ip: '82.165.197.1', status: 'ready' },
      { location: 'Sydney, AU (Telstra)', ip: '82.165.197.1', status: 'ready' }
    ]
  },
  {
    id: 'cut-907',
    domain: 'solarlighting.io',
    client: 'Solar Lighting Corp',
    registrar: 'Porkbun DNS',
    oldHost: 'Bluehost VPS',
    oldIp: '144.126.241.90',
    newHost: 'vps-lon-01',
    newIp: '185.193.64.12',
    currentTtl: '300s',
    propagationPercent: 0,
    nodesResolved: '0/18',
    status: 'ready',
    cutoverDate: 'Awaiting trigger',
    sslReady: true,
    dataSynced: true,
    dnsNodes: [
      { location: 'London, UK (Cloudflare)', ip: '144.126.241.90', status: 'ready' },
      { location: 'Frankfurt, DE (Google 8.8.8.8)', ip: '144.126.241.90', status: 'ready' },
      { location: 'New York, US (Quad9)', ip: '144.126.241.90', status: 'ready' },
      { location: 'Tokyo, JP (Level3)', ip: '144.126.241.90', status: 'ready' }
    ]
  },
  {
    id: 'cut-908',
    domain: 'vaultcrypto.finance',
    client: 'Vault Financial Ltd',
    registrar: 'NameSilo',
    oldHost: 'OVHcloud Dedicated',
    oldIp: '94.130.180.22',
    newHost: 'vps-sto-01',
    newIp: '185.193.66.88',
    currentTtl: '3600s',
    propagationPercent: 0,
    nodesResolved: '0/18',
    status: 'rollback',
    cutoverDate: 'Aborted (Migration incomplete)',
    sslReady: false,
    dataSynced: false,
    dnsNodes: [
      { location: 'Stockholm, SE (Telia)', ip: '94.130.180.22', status: 'rollback' },
      { location: 'Frankfurt, DE (Google 8.8.8.8)', ip: '94.130.180.22', status: 'rollback' },
      { location: 'New York, US (Quad9)', ip: '94.130.180.22', status: 'rollback' },
      { location: 'Singapore, SG (OpenDNS)', ip: '94.130.180.22', status: 'rollback' }
    ]
  }
];

let cutoversList = [...initialCutovers];
let currentFilter = 'all'; // all | ready | propagating | completed | rollback
let currentSearch = '';
let selectedCutoverId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderDnsCutoverHTML() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar (NO CARDS OVERVIEW) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            DNS Cutover
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Authoritative DNS cutovers and propagation monitoring.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-batch-cutover-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="zap" class="w-4 h-4"></i>
            <span>Execute Switch</span>
          </button>
        </div>
      </div>

      <!-- Controls & Tabs -->
      <div class="space-y-4">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2" id="cutover-filter-tabs">
          <button 
            type="button" 
            data-filter="all" 
            class="cut-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            All Domains (<span id="count-all">0</span>)
          </button>
          
          <button 
            type="button" 
            data-filter="ready" 
            class="cut-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'ready' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Ready (<span id="count-ready">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="propagating" 
            class="cut-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'propagating' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Propagating (<span id="count-propagating">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="completed" 
            class="cut-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'completed' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Live (<span id="count-completed">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="rollback" 
            class="cut-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'rollback' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Rollback (<span id="count-rollback">0</span>)
          </button>
        </div>

        <!-- Filter Search & Global Action -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="cutover-search-input"
              value="${currentSearch}"
              placeholder="Search by domain, registrar, or IP address..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="recheck-dns-btn"
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Probe Global Resolvers</span>
            </button>
          </div>
        </div>

      </div>

      <!-- Main Data Table -->
      <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900/40 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
                <th class="py-3 px-4 font-medium">Domain & Registrar</th>
                <th class="py-3 px-4 font-medium">Source Origin IP</th>
                <th class="py-3 px-4 font-medium">Target Hostlab IP</th>
                <th class="py-3 px-4 font-medium">TTL</th>
                <th class="py-3 px-4 font-medium">Propagation</th>
                <th class="py-3 px-4 font-medium text-center">Status</th>
                <th class="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="cutover-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <!-- Empty state container -->
        <div id="cut-empty-state" class="hidden p-12 text-center">
          <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
            <i data-lucide="network" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No cutovers found</h3>
          <p class="text-xs text-zinc-500 max-w-sm mx-auto">
            No cutover records match the active filter or query.
          </p>
        </div>
      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="cutover-drawer-container"></div>

      <!-- Execute Cutover Modal -->
      <div id="execute-cutover-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="zap" class="w-5 h-5 text-amber-500"></i>
              <h3 class="font-bold font-display text-zinc-900 dark:text-white text-base">Execute DNS Cutover</h3>
            </div>
            <button type="button" id="close-execute-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="execute-cutover-form" class="p-6 space-y-4 text-xs">
            
            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Select Ready Domain</label>
              <select id="modal-cutover-select" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none font-mono">
                ${cutoversList.filter(c => c.status === 'ready').map(c => `
                  <option value="${c.id}">${c.domain} -> ${c.newIp} (${c.registrar})</option>
                `).join('')}
              </select>
            </div>

            <!-- Pre-flight checks confirmation -->
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 space-y-2">
              <div class="text-[11px] font-mono uppercase text-zinc-500 mb-1">Pre-Switch Automated Safeguards</div>
              <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>SSL Wildcard active on target cluster</span>
              </div>
              <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>Database delta replication synced (< 10s lag)</span>
              </div>
              <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>TTL lowered to 300s across root zones</span>
              </div>
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Cutover Method</label>
              <select class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none font-mono">
                <option>Automated Registrar API Direct Update (Recommended)</option>
                <option>Hostlab Anycast Authoritative Nameserver Cutover</option>
                <option>Manual A/AAAA/MX Record Copy Mode</option>
              </select>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-execute-modal-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 flex items-center gap-1.5"
              >
                <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                <span>Switch Traffic Now</span>
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

function getFilteredCutovers() {
  return cutoversList.filter(item => {
    // 1. Tab filter
    if (currentFilter === 'ready' && item.status !== 'ready') return false;
    if (currentFilter === 'propagating' && item.status !== 'propagating') return false;
    if (currentFilter === 'completed' && item.status !== 'completed') return false;
    if (currentFilter === 'rollback' && item.status !== 'rollback') return false;

    // 2. Search query
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchDomain = item.domain.toLowerCase().includes(q);
      const matchRegistrar = item.registrar.toLowerCase().includes(q);
      const matchOldIp = item.oldIp.toLowerCase().includes(q);
      const matchNewIp = item.newIp.toLowerCase().includes(q);
      if (!matchDomain && !matchRegistrar && !matchOldIp && !matchNewIp) return false;
    }

    return true;
  });
}

function updateTabCounts() {
  const countAll = document.getElementById('count-all');
  const countReady = document.getElementById('count-ready');
  const countPropagating = document.getElementById('count-propagating');
  const countCompleted = document.getElementById('count-completed');
  const countRollback = document.getElementById('count-rollback');

  if (countAll) countAll.textContent = cutoversList.length;
  if (countReady) countReady.textContent = cutoversList.filter(c => c.status === 'ready').length;
  if (countPropagating) countPropagating.textContent = cutoversList.filter(c => c.status === 'propagating').length;
  if (countCompleted) countCompleted.textContent = cutoversList.filter(c => c.status === 'completed').length;
  if (countRollback) countRollback.textContent = cutoversList.filter(c => c.status === 'rollback').length;
}

function renderTableRows() {
  const tbody = document.getElementById('cutover-table-body');
  const emptyState = document.getElementById('cut-empty-state');
  if (!tbody) return;

  const filtered = getFilteredCutovers();

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(item => {
    // Status text formatting: plain text with color, NO background pill
    let statusClass = 'text-emerald-500';
    let statusLabel = 'Live';
    if (item.status === 'propagating') {
      statusClass = 'text-blue-500';
      statusLabel = 'Propagating';
    } else if (item.status === 'ready') {
      statusClass = 'text-amber-500';
      statusLabel = 'Ready';
    } else if (item.status === 'rollback') {
      statusClass = 'text-rose-500';
      statusLabel = 'Rollback';
    }

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Domain & Registrar -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          <div class="flex items-center gap-2">
            <i data-lucide="globe" class="w-3.5 h-3.5 text-zinc-400 shrink-0"></i>
            <span>${item.domain}</span>
          </div>
          <div class="text-[11px] text-zinc-400 font-sans mt-0.5">${item.registrar}</div>
        </td>

        <!-- Source Origin IP -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div>${item.oldIp}</div>
          <div class="text-[11px] text-zinc-400">${item.oldHost}</div>
        </td>

        <!-- Target Hostlab IP -->
        <td class="py-3 px-4 font-mono text-zinc-900 dark:text-white">
          <div class="font-medium">${item.newIp}</div>
          <div class="text-[11px] text-emerald-500 font-sans">${item.newHost}</div>
        </td>

        <!-- TTL (clean numbers) -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          ${item.currentTtl}
        </td>

        <!-- Propagation (clean percentage only, no loading bar) -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          ${item.propagationPercent}%
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
              data-view-cut="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Inspect Propagation Switchboard"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-trigger-cut="${item.id}"
              class="p-1.5 rounded-md hover:bg-amber-50 dark:hover:bg-amber-950/40 text-zinc-500 hover:text-amber-500 transition-colors cursor-pointer"
              title="${item.status === 'ready' ? 'Trigger Immediate Cutover' : 'Retest DNS Resolution'}"
            >
              <i data-lucide="${item.status === 'ready' ? 'zap' : 'refresh-cw'}" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-rollback-cut="${item.id}"
              class="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Instant Rollback to Old Origin"
            >
              <i data-lucide="undo-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  createIcons({ icons });
}

// ==========================================
// 4. SLIDE-OVER DRAWER (SWITCHBOARD & MAP)
// ==========================================

function renderCutoverDrawer(cutoverId) {
  const container = document.getElementById('cutover-drawer-container');
  if (!container) return;

  const item = cutoversList.find(c => c.id === cutoverId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let statusClass = 'text-emerald-500';
  let statusLabel = 'Live';
  if (item.status === 'propagating') {
    statusClass = 'text-blue-500';
    statusLabel = 'Propagating';
  } else if (item.status === 'ready') {
    statusClass = 'text-amber-500';
    statusLabel = 'Ready';
  } else if (item.status === 'rollback') {
    statusClass = 'text-rose-500';
    statusLabel = 'Rollback';
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-xl h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>Traffic Switchboard</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${statusLabel}</span>
            </div>
            <h2 class="text-xl font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2">
              <i data-lucide="network" class="w-5 h-5 text-zinc-400"></i>
              <span>${item.domain}</span>
            </h2>
          </div>
          <button 
            type="button" 
            id="close-cut-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700 dark:text-zinc-300">
          
          <!-- IP Switchboard Comparison -->
          <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 space-y-3">
            <div class="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Authoritative A-Record Target</div>
            <div class="flex items-center justify-between gap-3 font-mono text-xs">
              <div class="p-3 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex-1">
                <div class="text-zinc-400 text-[10px]">OLD ORIGIN</div>
                <div class="font-bold text-zinc-600 dark:text-zinc-400 mt-0.5 line-through">${item.oldIp}</div>
                <div class="text-[10px] text-zinc-400">${item.oldHost}</div>
              </div>
              <i data-lucide="arrow-right" class="w-4 h-4 text-zinc-400 shrink-0"></i>
              <div class="p-3 rounded bg-white dark:bg-zinc-900 border border-emerald-500/40 dark:border-emerald-500/40 flex-1">
                <div class="text-emerald-500 text-[10px] font-bold">HOSTLAB CLOUD</div>
                <div class="font-bold text-zinc-900 dark:text-white mt-0.5">${item.newIp}</div>
                <div class="text-[10px] text-emerald-500">${item.newHost}</div>
              </div>
            </div>
          </div>

          <!-- Propagation Progress -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-zinc-500">Global Anycast Edge Propagation</span>
              <span class="font-mono font-bold text-zinc-900 dark:text-white">${item.propagationPercent}%</span>
            </div>
            <div class="text-[11px] text-zinc-400 font-mono">
              Resolvers matching target IP: ${item.nodesResolved}
            </div>
          </div>

          <!-- Global Edge Resolver Checkpoints -->
          <div class="space-y-2">
            <div class="text-xs font-mono uppercase text-zinc-500">Resolver Node Probes</div>
            <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-xs">
              <table class="w-full text-left font-mono">
                <thead class="bg-zinc-50 dark:bg-zinc-800/60 text-[10px] text-zinc-500 uppercase border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th class="py-2 px-3">Location & Provider</th>
                    <th class="py-2 px-3">Resolved IP</th>
                    <th class="py-2 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                  ${item.dnsNodes.map(node => `
                    <tr>
                      <td class="py-2.5 px-3 text-zinc-900 dark:text-white">${node.location}</td>
                      <td class="py-2.5 px-3 text-zinc-500">${node.ip}</td>
                      <td class="py-2.5 px-3 text-right">
                        <span class="${node.status === 'resolved' ? 'text-emerald-500' : (node.status === 'propagating' ? 'text-blue-500' : 'text-zinc-400')} font-medium">
                          ${node.status === 'resolved' ? 'Aligned' : (node.status === 'propagating' ? 'Syncing...' : 'Pending')}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Pre-Cutover Safety Checks -->
          <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-2">
            <div class="text-xs font-mono uppercase text-zinc-500">Safety Verification Checks</div>
            <div class="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div class="flex items-center gap-1.5 text-emerald-500">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>SSL/TLS Terminated</span>
              </div>
              <div class="flex items-center gap-1.5 text-emerald-500">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>Database Sync 100%</span>
              </div>
              <div class="flex items-center gap-1.5 text-emerald-500">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>TTL set to ${item.currentTtl}</span>
              </div>
              <div class="flex items-center gap-1.5 text-emerald-500">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>Mail MX Preserved</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
          <button 
            type="button" 
            id="drawer-instant-rollback-btn"
            class="px-3 py-2 text-xs font-medium rounded-md text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1.5"
          >
            <i data-lucide="undo-2" class="w-3.5 h-3.5"></i>
            <span>Emergency Rollback</span>
          </button>
          <div class="flex items-center gap-2">
            ${item.status === 'ready' ? `
              <button 
                type="button" 
                id="drawer-switch-now-btn"
                class="px-3.5 py-2 text-xs font-medium rounded-md bg-amber-500 hover:bg-amber-600 text-black font-semibold transition-colors flex items-center gap-1.5"
              >
                <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                <span>Cutover Now</span>
              </button>
            ` : `
              <button 
                type="button" 
                id="drawer-probe-now-btn"
                class="px-3.5 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                Probe Nodes
              </button>
            `}
            <button 
              type="button" 
              id="drawer-cut-done-btn"
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

  const closeBtn = document.getElementById('close-cut-drawer-btn');
  const doneBtn = document.getElementById('drawer-cut-done-btn');
  const rollbackBtn = document.getElementById('drawer-instant-rollback-btn');
  const switchBtn = document.getElementById('drawer-switch-now-btn');
  const probeBtn = document.getElementById('drawer-probe-now-btn');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedCutoverId = null;
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

  if (switchBtn) {
    switchBtn.onclick = () => {
      item.status = 'propagating';
      item.propagationPercent = 65;
      item.nodesResolved = '12/18';
      renderCutoverDrawer(item.id);
      renderTableRows();
      updateTabCounts();
    };
  }

  if (probeBtn) {
    probeBtn.onclick = () => {
      item.propagationPercent = 100;
      item.status = 'completed';
      renderCutoverDrawer(item.id);
      renderTableRows();
      updateTabCounts();
    };
  }

  if (rollbackBtn) {
    rollbackBtn.onclick = () => {
      item.status = 'rollback';
      item.propagationPercent = 0;
      renderCutoverDrawer(item.id);
      renderTableRows();
      updateTabCounts();
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupDnsCutoverEvents(onNavigate) {
  createIcons({ icons });
  updateTabCounts();
  renderTableRows();

  // Tab Filtering
  const tabs = document.querySelectorAll('.cut-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => {
        t.className = 'cut-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white';
      });
      tab.className = 'cut-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900';

      currentFilter = tab.getAttribute('data-filter') || 'all';
      renderTableRows();
    };
  });

  // Search input
  const searchInput = document.getElementById('cutover-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Global Probe Resolvers button
  const probeBtn = document.getElementById('recheck-dns-btn');
  if (probeBtn) {
    probeBtn.onclick = () => {
      const span = probeBtn.querySelector('span');
      if (span) {
        span.textContent = 'Probing 18 Anycast Nodes...';
        setTimeout(() => {
          cutoversList.forEach(c => {
            if (c.status === 'propagating') {
              c.propagationPercent = 100;
              c.status = 'completed';
            }
          });
          span.textContent = 'Probes Aligned';
          renderTableRows();
          updateTabCounts();
          setTimeout(() => { span.textContent = 'Probe Global Resolvers'; }, 2000);
        }, 800);
      }
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('cutover-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-cut]');
      const triggerBtn = e.target.closest('[data-trigger-cut]');
      const rollbackBtn = e.target.closest('[data-rollback-cut]');

      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-cut');
        selectedCutoverId = id;
        renderCutoverDrawer(id);
      } else if (triggerBtn) {
        const id = triggerBtn.getAttribute('data-trigger-cut');
        const item = cutoversList.find(c => c.id === id);
        if (item) {
          if (item.status === 'ready') {
            item.status = 'propagating';
            item.propagationPercent = 50;
          } else {
            item.propagationPercent = 100;
            item.status = 'completed';
          }
          renderTableRows();
          updateTabCounts();
        }
      } else if (rollbackBtn) {
        const id = rollbackBtn.getAttribute('data-rollback-cut');
        const item = cutoversList.find(c => c.id === id);
        if (item) {
          item.status = 'rollback';
          item.propagationPercent = 0;
          renderTableRows();
          updateTabCounts();
        }
      }
    };
  }

  // Batch Cutover Modal
  const openModalBtn = document.getElementById('open-batch-cutover-btn');
  const modal = document.getElementById('execute-cutover-modal');
  const closeModalBtn = document.getElementById('close-execute-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-execute-modal-btn');
  const form = document.getElementById('execute-cutover-form');

  if (openModalBtn && modal) {
    openModalBtn.onclick = () => modal.classList.remove('hidden');
  }

  const closeModal = () => {
    if (modal) modal.classList.add('hidden');
  };

  if (closeModalBtn) closeModalBtn.onclick = closeModal;
  if (cancelModalBtn) cancelModalBtn.onclick = closeModal;

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const cutoverId = document.getElementById('modal-cutover-select')?.value;
      if (cutoverId) {
        const item = cutoversList.find(c => c.id === cutoverId);
        if (item) {
          item.status = 'propagating';
          item.propagationPercent = 75;
          renderTableRows();
          updateTabCounts();
        }
      }
      closeModal();
    };
  }
}

export function cleanupDnsCutover() {
  currentFilter = 'all';
  currentSearch = '';
  selectedCutoverId = null;
}
