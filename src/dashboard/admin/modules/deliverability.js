import { createIcons, icons } from 'lucide';

/**
 * Hostlab Email Deliverability Module
 * Dedicated standalone module for reputation monitoring, SPF/DKIM/DMARC alignment,
 * RBL blacklist checks, bounce rate analytics, and inbox placement diagnostics.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const deliverabilityStats = {
  reputationScore: '98.6 / 100',
  reputationStatus: 'Excellent',
  dmarcCompliance: '99.2%',
  outbound24h: '342,850',
  bounceRate: '0.28%',
  spamComplaintRate: '0.012%',
  activeBlacklists: 0,
  monitoredRbls: 56
};

export const initialDeliverabilityDomains = [
  {
    id: 'del-601',
    domain: 'techflow-media.com',
    dedicatedIp: '185.193.64.12',
    reputationScore: 99,
    reputationTier: 'Optimal',
    spfStatus: 'Pass (v=spf1 ip4:185.193.64.12 -all)',
    spfValid: true,
    dkimStatus: 'Pass (2048-bit rsa - s1._domainkey)',
    dkimValid: true,
    dmarcStatus: 'p=reject; pct=100; aspf=r',
    dmarcValid: true,
    dmarcPolicy: 'Reject',
    bounceRate: '0.14%',
    spamComplaints: '0.008%',
    rblStatus: 'Clean (0/56 listed)',
    rblClean: true,
    status: 'compliant', // compliant | warning | at-risk
    lastScan: '14 minutes ago',
    outboundVolume30d: 84200
  },
  {
    id: 'del-602',
    domain: 'apexstudios.design',
    dedicatedIp: '185.193.64.14',
    reputationScore: 98,
    reputationTier: 'Optimal',
    spfStatus: 'Pass (v=spf1 include:_spf.hostlab.email -all)',
    spfValid: true,
    dkimStatus: 'Pass (2048-bit rsa - k1._domainkey)',
    dkimValid: true,
    dmarcStatus: 'p=quarantine; pct=100',
    dmarcValid: true,
    dmarcPolicy: 'Quarantine',
    bounceRate: '0.22%',
    spamComplaints: '0.011%',
    rblStatus: 'Clean (0/56 listed)',
    rblClean: true,
    status: 'compliant',
    lastScan: '28 minutes ago',
    outboundVolume30d: 112000
  },
  {
    id: 'del-603',
    domain: 'cloudscale-saas.net',
    dedicatedIp: '185.193.65.20',
    reputationScore: 96,
    reputationTier: 'Good',
    spfStatus: 'Pass (v=spf1 ip4:185.193.65.20 ~all)',
    spfValid: true,
    dkimStatus: 'Pass (2048-bit ed25519 - mta1._domainkey)',
    dkimValid: true,
    dmarcStatus: 'p=none; sp=none',
    dmarcValid: true,
    dmarcPolicy: 'None (Monitoring)',
    bounceRate: '0.41%',
    spamComplaints: '0.015%',
    rblStatus: 'Clean (0/56 listed)',
    rblClean: true,
    status: 'compliant',
    lastScan: '1 hour ago',
    outboundVolume30d: 59400
  },
  {
    id: 'del-604',
    domain: 'urbanbistro.io',
    dedicatedIp: '185.193.64.12',
    reputationScore: 84,
    reputationTier: 'Needs Attention',
    spfStatus: 'Pass (v=spf1 include:_spf.hostlab.email ~all)',
    spfValid: true,
    dkimStatus: 'Pass (2048-bit rsa - default._domainkey)',
    dkimValid: true,
    dmarcStatus: 'Missing Record (_dmarc.urbanbistro.io)',
    dmarcValid: false,
    dmarcPolicy: 'Missing',
    bounceRate: '1.24%',
    spamComplaints: '0.042%',
    rblStatus: 'Clean (0/56 listed)',
    rblClean: true,
    status: 'warning',
    lastScan: '3 hours ago',
    outboundVolume30d: 21400
  },
  {
    id: 'del-605',
    domain: 'hypervault-fintech.com',
    dedicatedIp: '185.193.66.88',
    reputationScore: 100,
    reputationTier: 'Maximum',
    spfStatus: 'Pass (v=spf1 ip4:185.193.66.88 -all)',
    spfValid: true,
    dkimStatus: 'Pass (4096-bit rsa - sec01._domainkey)',
    dkimValid: true,
    dmarcStatus: 'p=reject; pct=100; adkim=s; aspf=s',
    dmarcValid: true,
    dmarcPolicy: 'Strict Reject',
    bounceRate: '0.05%',
    spamComplaints: '0.001%',
    rblStatus: 'Clean (0/56 listed)',
    rblClean: true,
    status: 'compliant',
    lastScan: '5 minutes ago',
    outboundVolume30d: 198000
  },
  {
    id: 'del-606',
    domain: 'nexus-logistics.de',
    dedicatedIp: '185.193.64.14',
    reputationScore: 92,
    reputationTier: 'Good',
    spfStatus: 'Pass (v=spf1 include:_spf.hostlab.email -all)',
    spfValid: true,
    dkimStatus: 'Pass (2048-bit rsa - 2024._domainkey)',
    dkimValid: true,
    dmarcStatus: 'p=quarantine; pct=100',
    dmarcValid: true,
    dmarcPolicy: 'Quarantine',
    bounceRate: '0.38%',
    spamComplaints: '0.018%',
    rblStatus: 'Clean (0/56 listed)',
    rblClean: true,
    status: 'compliant',
    lastScan: '45 minutes ago',
    outboundVolume30d: 46200
  },
  {
    id: 'del-607',
    domain: 'solarpulse.energy',
    dedicatedIp: '185.193.65.20',
    reputationScore: 78,
    reputationTier: 'At-Risk',
    spfStatus: 'SoftFail (~all alignment issue)',
    spfValid: false,
    dkimStatus: 'Invalid Signature (Key mismatch)',
    dkimValid: false,
    dmarcStatus: 'p=none',
    dmarcValid: true,
    dmarcPolicy: 'None (Monitoring)',
    bounceRate: '2.84%',
    spamComplaints: '0.095%',
    rblStatus: '1 Listing (Spamhaus CSS)',
    rblClean: false,
    status: 'at-risk',
    lastScan: '18 minutes ago',
    outboundVolume30d: 18900
  },
  {
    id: 'del-608',
    domain: 'krypton-security.org',
    dedicatedIp: '185.193.66.88',
    reputationScore: 99,
    reputationTier: 'Optimal',
    spfStatus: 'Pass (v=spf1 ip4:185.193.66.88 -all)',
    spfValid: true,
    dkimStatus: 'Pass (2048-bit rsa - hostlab._domainkey)',
    dkimValid: true,
    dmarcStatus: 'p=reject; pct=100',
    dmarcValid: true,
    dmarcPolicy: 'Reject',
    bounceRate: '0.12%',
    spamComplaints: '0.003%',
    rblStatus: 'Clean (0/56 listed)',
    rblClean: true,
    status: 'compliant',
    lastScan: '35 minutes ago',
    outboundVolume30d: 38700
  }
];

let deliverabilityList = [...initialDeliverabilityDomains];
let currentFilter = 'all'; // all | compliant | warning | at-risk
let currentSearch = '';
let selectedDomainId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderDeliverabilityHTML() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
            <span>Business Email</span>
            <span>/</span>
            <span class="text-zinc-900 dark:text-zinc-100 font-semibold">Deliverability & Reputation</span>
          </div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Email Deliverability & Reputation
          </h1>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Monitor real-time sender reputation, SPF/DKIM/DMARC alignment, RBL blacklists, bounce analytics, and inbox placement.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-seed-test-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Test Inbox Placement</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
          <div class="flex items-center justify-between text-zinc-500 text-xs font-mono mb-2">
            <span>GLOBAL REPUTATION</span>
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i>
          </div>
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-display">
            ${deliverabilityStats.reputationScore}
          </div>
          <div class="text-[11px] text-zinc-500 mt-1 font-mono">
            ${deliverabilityStats.reputationStatus} across all clusters
          </div>
        </div>

        <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
          <div class="flex items-center justify-between text-zinc-500 text-xs font-mono mb-2">
            <span>DMARC COMPLIANCE</span>
            <i data-lucide="lock" class="w-4 h-4 text-blue-500"></i>
          </div>
          <div class="text-2xl font-bold text-zinc-900 dark:text-white font-display">
            ${deliverabilityStats.dmarcCompliance}
          </div>
          <div class="text-[11px] text-zinc-500 mt-1 font-mono">
            DKIM & SPF aligned
          </div>
        </div>

        <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
          <div class="flex items-center justify-between text-zinc-500 text-xs font-mono mb-2">
            <span>OUTBOUND (24H)</span>
            <i data-lucide="mail" class="w-4 h-4 text-zinc-400"></i>
          </div>
          <div class="text-2xl font-bold text-zinc-900 dark:text-white font-display">
            ${deliverabilityStats.outbound24h}
          </div>
          <div class="text-[11px] text-zinc-500 mt-1 font-mono">
            Bounce: ${deliverabilityStats.bounceRate} | Spam: ${deliverabilityStats.spamComplaintRate}
          </div>
        </div>

        <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
          <div class="flex items-center justify-between text-zinc-500 text-xs font-mono mb-2">
            <span>RBL LISTINGS</span>
            <i data-lucide="alert-triangle" class="w-4 h-4 ${deliverabilityStats.activeBlacklists === 0 ? 'text-emerald-500' : 'text-rose-500'}"></i>
          </div>
          <div class="text-2xl font-bold ${deliverabilityStats.activeBlacklists === 0 ? 'text-zinc-900 dark:text-white' : 'text-rose-600'} font-display">
            ${deliverabilityStats.activeBlacklists}
          </div>
          <div class="text-[11px] text-zinc-500 mt-1 font-mono">
            Scanning ${deliverabilityStats.monitoredRbls} global blacklists
          </div>
        </div>

      </div>

      <!-- Controls & Tabs -->
      <div class="space-y-4">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2" id="deliverability-filter-tabs">
          <button 
            type="button" 
            data-filter="all" 
            class="del-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            All Domains (<span id="count-all">0</span>)
          </button>
          
          <button 
            type="button" 
            data-filter="compliant" 
            class="del-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'compliant' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Compliant (<span id="count-compliant">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="warning" 
            class="del-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'warning' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Warnings (<span id="count-warning">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="at-risk" 
            class="del-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'at-risk' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            At-Risk (<span id="count-atrisk">0</span>)
          </button>
        </div>

        <!-- Filter Search & Global Action -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="deliverability-search-input"
              value="${currentSearch}"
              placeholder="Search by domain name, IP address, or policy..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="refresh-rbl-btn"
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Retest All RBLs</span>
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
                <th class="py-3 px-4 font-medium">Domain / Outbound IP</th>
                <th class="py-3 px-4 font-medium">Reputation</th>
                <th class="py-3 px-4 font-medium">SPF Alignment</th>
                <th class="py-3 px-4 font-medium">DKIM Key</th>
                <th class="py-3 px-4 font-medium">DMARC Policy</th>
                <th class="py-3 px-4 font-medium text-right">Bounce Rate</th>
                <th class="py-3 px-4 font-medium text-center">Status</th>
                <th class="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="deliverability-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <!-- Empty state container -->
        <div id="del-empty-state" class="hidden p-12 text-center">
          <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
            <i data-lucide="shield-alert" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No domains found</h3>
          <p class="text-xs text-zinc-500 max-w-sm mx-auto">
            No sending domains match your selected filter or search parameters.
          </p>
        </div>
      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="deliverability-drawer-container"></div>

      <!-- Seed Test Modal -->
      <div id="seed-test-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="send" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold font-display text-zinc-900 dark:text-white text-base">Inbox Placement Simulator</h3>
            </div>
            <button type="button" id="close-seed-test-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="seed-test-form" class="p-6 space-y-4 text-xs">
            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Select Sender Domain</label>
              <select id="modal-test-domain" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
                ${deliverabilityList.map(d => `<option value="${d.domain}">${d.domain} (${d.dedicatedIp})</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Mailbox Test Seed Network</label>
              <div class="space-y-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 w-4 h-4" />
                  <span>Google Workspace / Gmail Consumer Seeds (12 inboxes)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 w-4 h-4" />
                  <span>Microsoft 365 / Outlook Consumer Seeds (10 inboxes)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 w-4 h-4" />
                  <span>Yahoo & AOL Mail Seeds (6 inboxes)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 w-4 h-4" />
                  <span>ProtonMail & Apple iCloud Mail Seeds (4 inboxes)</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Test Subject Line</label>
              <input 
                type="text" 
                id="modal-test-subject" 
                value="[Hostlab Deliverability Audit] RFC Compliance Verification Probe" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
              />
            </div>

            <div id="test-run-result" class="hidden p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-mono">
              <div class="font-bold flex items-center gap-1.5">
                <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500"></i>
                Placement Probe Complete: 98.4% Inbox Delivered
              </div>
              <div class="text-[11px] mt-1 text-emerald-700 dark:text-emerald-400">
                Gmail: 100% Inbox • Microsoft 365: 100% Inbox • Yahoo: 96% Inbox • 0% Spam Junk
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-seed-test-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                id="submit-seed-test-btn"
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 flex items-center gap-1.5"
              >
                <span>Dispatch Seed Probe</span>
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

function getFilteredDomains() {
  return deliverabilityList.filter(item => {
    // 1. Tab filter
    if (currentFilter === 'compliant' && item.status !== 'compliant') return false;
    if (currentFilter === 'warning' && item.status !== 'warning') return false;
    if (currentFilter === 'at-risk' && item.status !== 'at-risk') return false;

    // 2. Search query
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchDomain = item.domain.toLowerCase().includes(q);
      const matchIp = item.dedicatedIp.toLowerCase().includes(q);
      const matchPolicy = item.dmarcPolicy.toLowerCase().includes(q);
      if (!matchDomain && !matchIp && !matchPolicy) return false;
    }

    return true;
  });
}

function updateTabCounts() {
  const countAll = document.getElementById('count-all');
  const countCompliant = document.getElementById('count-compliant');
  const countWarning = document.getElementById('count-warning');
  const countAtrisk = document.getElementById('count-atrisk');

  if (countAll) countAll.textContent = deliverabilityList.length;
  if (countCompliant) countCompliant.textContent = deliverabilityList.filter(d => d.status === 'compliant').length;
  if (countWarning) countWarning.textContent = deliverabilityList.filter(d => d.status === 'warning').length;
  if (countAtrisk) countAtrisk.textContent = deliverabilityList.filter(d => d.status === 'at-risk').length;
}

function renderTableRows() {
  const tbody = document.getElementById('deliverability-table-body');
  const emptyState = document.getElementById('del-empty-state');
  if (!tbody) return;

  const filtered = getFilteredDomains();

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(item => {
    // Status text formatting: plain text with color, NO background pill
    let statusClass = 'text-emerald-500';
    let statusLabel = 'Compliant';
    if (item.status === 'warning') {
      statusClass = 'text-amber-500';
      statusLabel = 'Warning';
    } else if (item.status === 'at-risk') {
      statusClass = 'text-rose-500';
      statusLabel = 'At-Risk';
    }

    // Reputation score styling
    let repColor = 'text-emerald-600 dark:text-emerald-400';
    if (item.reputationScore < 85) repColor = 'text-amber-500';
    if (item.reputationScore < 80) repColor = 'text-rose-500';

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Domain / Outbound IP -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          <div class="flex items-center gap-2">
            <i data-lucide="globe" class="w-3.5 h-3.5 text-zinc-400 shrink-0"></i>
            <span>${item.domain}</span>
          </div>
          <div class="text-[11px] text-zinc-400 font-mono mt-0.5">${item.dedicatedIp}</div>
        </td>

        <!-- Reputation (plain text with color, clean number) -->
        <td class="py-3 px-4 font-mono">
          <span class="font-bold ${repColor}">${item.reputationScore}/100</span>
          <span class="text-[11px] text-zinc-400 ml-1">(${item.reputationTier})</span>
        </td>

        <!-- SPF Alignment -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div class="flex items-center gap-1.5">
            <span class="${item.spfValid ? 'text-emerald-500' : 'text-rose-500'} font-semibold">
              ${item.spfValid ? 'Pass' : 'Fail'}
            </span>
            <span class="text-zinc-400 text-[11px] truncate max-w-[140px]">${item.spfStatus.split(' ')[0]}</span>
          </div>
        </td>

        <!-- DKIM Key -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div class="flex items-center gap-1.5">
            <span class="${item.dkimValid ? 'text-emerald-500' : 'text-rose-500'} font-semibold">
              ${item.dkimValid ? 'Pass' : 'Fail'}
            </span>
            <span class="text-zinc-400 text-[11px]">2048-bit</span>
          </div>
        </td>

        <!-- DMARC Policy (plain text, no pill) -->
        <td class="py-3 px-4 font-mono text-zinc-800 dark:text-zinc-200 font-medium">
          ${item.dmarcPolicy}
        </td>

        <!-- Bounce Rate (clean numbers) -->
        <td class="py-3 px-4 font-mono text-right text-zinc-900 dark:text-zinc-100">
          ${item.bounceRate}
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
              data-view-del="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Inspect DNS & Deliverability"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-retest-del="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Run Live DNS & RBL Scan"
            >
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  createIcons({ icons });
}

// ==========================================
// 4. SLIDE-OVER DRAWER (DIAGNOSTICS & RBL)
// ==========================================

function renderDeliverabilityDrawer(domainId) {
  const container = document.getElementById('deliverability-drawer-container');
  if (!container) return;

  const item = deliverabilityList.find(d => d.id === domainId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let statusClass = 'text-emerald-500';
  let statusLabel = 'Compliant';
  if (item.status === 'warning') {
    statusClass = 'text-amber-500';
    statusLabel = 'Warning';
  } else if (item.status === 'at-risk') {
    statusClass = 'text-rose-500';
    statusLabel = 'At-Risk';
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-xl h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>Deliverability Diagnostics</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${statusLabel}</span>
            </div>
            <h2 class="text-xl font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2">
              <i data-lucide="shield-check" class="w-5 h-5 text-emerald-500"></i>
              <span>${item.domain}</span>
            </h2>
          </div>
          <button 
            type="button" 
            id="close-del-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700 dark:text-zinc-300">
          
          <!-- Reputation Score Banner -->
          <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono text-zinc-500 uppercase">Sender Domain Trust Score</div>
              <div class="text-2xl font-bold text-zinc-900 dark:text-white font-display mt-0.5">
                ${item.reputationScore} <span class="text-xs text-zinc-400 font-normal">/ 100</span>
              </div>
              <div class="text-[11px] text-zinc-500 mt-1 font-mono">
                Tier: <span class="font-medium text-zinc-900 dark:text-white">${item.reputationTier}</span> • Last checked ${item.lastScan}
              </div>
            </div>
            <div class="text-right">
              <div class="text-[11px] font-mono text-zinc-500 uppercase">Outbound 30D</div>
              <div class="font-bold text-zinc-900 dark:text-white font-mono text-sm mt-0.5">${item.outboundVolume30d.toLocaleString()} msgs</div>
              <div class="text-[11px] text-zinc-500 font-mono mt-1">Bounce: ${item.bounceRate}</div>
            </div>
          </div>

          <!-- DNS Record Alignment Breakdown -->
          <div class="space-y-3">
            <div class="text-xs font-mono uppercase text-zinc-500 flex items-center justify-between">
              <span>Authentication Records</span>
              <span class="text-[11px] text-zinc-400">RFC 7208 / 6376 / 7489</span>
            </div>

            <!-- SPF -->
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-mono font-bold text-zinc-900 dark:text-white">SPF (Sender Policy Framework)</span>
                <span class="font-mono font-semibold ${item.spfValid ? 'text-emerald-500' : 'text-rose-500'}">
                  ${item.spfValid ? 'VALID' : 'ALIGNMENT ERROR'}
                </span>
              </div>
              <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/60 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 break-all select-all">
                ${item.spfStatus}
              </div>
            </div>

            <!-- DKIM -->
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-mono font-bold text-zinc-900 dark:text-white">DKIM (DomainKeys Identified Mail)</span>
                <span class="font-mono font-semibold ${item.dkimValid ? 'text-emerald-500' : 'text-rose-500'}">
                  ${item.dkimValid ? 'ACTIVE & SIGNED' : 'KEY MISMATCH'}
                </span>
              </div>
              <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/60 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 break-all select-all">
                ${item.dkimStatus}
              </div>
            </div>

            <!-- DMARC -->
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-mono font-bold text-zinc-900 dark:text-white">DMARC Policy</span>
                <span class="font-mono font-semibold ${item.dmarcValid ? 'text-emerald-500' : 'text-amber-500'}">
                  ${item.dmarcPolicy}
                </span>
              </div>
              <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/60 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 break-all select-all">
                ${item.dmarcStatus}
              </div>
            </div>
          </div>

          <!-- RBL Real-Time Blacklist Status -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-zinc-500">Real-Time Blacklist (RBL) Scanner</span>
              <span class="text-[11px] font-mono ${item.rblClean ? 'text-emerald-500' : 'text-rose-500'}">
                ${item.rblStatus}
              </span>
            </div>
            
            <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-xs">
              <table class="w-full text-left font-mono">
                <thead class="bg-zinc-50 dark:bg-zinc-800/60 text-[10px] text-zinc-500 uppercase border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th class="py-2 px-3">RBL Provider</th>
                    <th class="py-2 px-3">Target IP / Host</th>
                    <th class="py-2 px-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                  <tr>
                    <td class="py-2 px-3">Spamhaus ZEN</td>
                    <td class="py-2 px-3 text-zinc-400">${item.dedicatedIp}</td>
                    <td class="py-2 px-3 text-right text-emerald-500 font-semibold">CLEAN</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3">Barracuda BRBL</td>
                    <td class="py-2 px-3 text-zinc-400">${item.dedicatedIp}</td>
                    <td class="py-2 px-3 text-right text-emerald-500 font-semibold">CLEAN</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3">SpamCop SC-BL</td>
                    <td class="py-2 px-3 text-zinc-400">${item.dedicatedIp}</td>
                    <td class="py-2 px-3 text-right text-emerald-500 font-semibold">CLEAN</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3">Invaluement ivmURI</td>
                    <td class="py-2 px-3 text-zinc-400">${item.domain}</td>
                    <td class="py-2 px-3 text-right text-emerald-500 font-semibold">CLEAN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
          <div class="text-[11px] font-mono text-zinc-400">
            Dedicated IP: ${item.dedicatedIp}
          </div>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="drawer-retest-btn"
              class="px-3.5 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Re-run Audit</span>
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

  const closeBtn = document.getElementById('close-del-drawer-btn');
  const doneBtn = document.getElementById('drawer-done-btn');
  const retestBtn = document.getElementById('drawer-retest-btn');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedDomainId = null;
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

  if (retestBtn) {
    retestBtn.onclick = () => {
      item.lastScan = 'Just now';
      renderDeliverabilityDrawer(item.id);
      renderTableRows();
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupDeliverabilityEvents(onNavigate) {
  createIcons({ icons });
  updateTabCounts();
  renderTableRows();

  // Tab Filtering
  const tabs = document.querySelectorAll('.del-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => {
        t.className = 'del-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white';
      });
      tab.className = 'del-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900';

      currentFilter = tab.getAttribute('data-filter') || 'all';
      renderTableRows();
    };
  });

  // Search input
  const searchInput = document.getElementById('deliverability-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Refresh all RBLs button
  const refreshBtn = document.getElementById('refresh-rbl-btn');
  if (refreshBtn) {
    refreshBtn.onclick = () => {
      const span = refreshBtn.querySelector('span');
      if (span) {
        span.textContent = 'Scanning 56 RBLs...';
        setTimeout(() => {
          deliverabilityList.forEach(d => { d.lastScan = 'Just now'; });
          span.textContent = 'Retest Complete';
          renderTableRows();
          setTimeout(() => { span.textContent = 'Retest All RBLs'; }, 2000);
        }, 800);
      }
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('deliverability-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-del]');
      const retestBtn = e.target.closest('[data-retest-del]');

      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-del');
        selectedDomainId = id;
        renderDeliverabilityDrawer(id);
      } else if (retestBtn) {
        const id = retestBtn.getAttribute('data-retest-del');
        const item = deliverabilityList.find(d => d.id === id);
        if (item) {
          item.lastScan = 'Just now';
          renderTableRows();
        }
      }
    };
  }

  // Seed test modal
  const openTestBtn = document.getElementById('open-seed-test-btn');
  const testModal = document.getElementById('seed-test-modal');
  const closeTestBtn = document.getElementById('close-seed-test-modal-btn');
  const cancelTestBtn = document.getElementById('cancel-seed-test-btn');
  const testForm = document.getElementById('seed-test-form');
  const resultBox = document.getElementById('test-run-result');
  const submitBtn = document.getElementById('submit-seed-test-btn');

  if (openTestBtn && testModal) {
    openTestBtn.onclick = () => {
      testModal.classList.remove('hidden');
      if (resultBox) resultBox.classList.add('hidden');
    };
  }

  const closeTestModal = () => {
    if (testModal) testModal.classList.add('hidden');
    if (resultBox) resultBox.classList.add('hidden');
  };

  if (closeTestBtn) closeTestBtn.onclick = closeTestModal;
  if (cancelTestBtn) cancelTestBtn.onclick = closeTestModal;

  if (testForm) {
    testForm.onsubmit = (e) => {
      e.preventDefault();
      if (submitBtn) {
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Simulating Delivery...</span>`;
        setTimeout(() => {
          submitBtn.innerHTML = origText;
          if (resultBox) {
            resultBox.classList.remove('hidden');
            createIcons({ icons });
          }
        }, 900);
      }
    };
  }
}

export function cleanupDeliverability() {
  currentFilter = 'all';
  currentSearch = '';
  selectedDomainId = null;
}
