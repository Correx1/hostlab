import { createIcons, icons } from 'lucide';

/**
 * Hostlab Activity Logs Module
 * Clean, immutable audit trail for administrative actions, security, and infrastructure mutations.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const initialLogs = [
  {
    id: 'EVT-904128',
    action: 'VPS.Instance.Reboot',
    resource: 'vps-lon-01 (185.193.64.12)',
    category: 'infrastructure',
    actor: 'sarah@techflow-media.com',
    actorRole: 'Client Owner',
    ipAddress: '82.165.197.44',
    location: 'London, UK',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    severity: 'warning',
    status: 'success',
    statusCode: '200 OK',
    timeAgo: '2 mins ago',
    timestamp: '2024-09-26T21:37:12Z',
    details: {
      method: 'POST',
      endpoint: '/api/v1/vps/vps-lon-01/actions/reboot',
      executionTimeMs: 1420
    }
  },
  {
    id: 'EVT-904127',
    action: 'Auth.TwoFactor.Verify',
    resource: 'Admin Console',
    category: 'security',
    actor: 'alex.chen@hostlab.internal',
    actorRole: 'Support Lead',
    ipAddress: '194.14.88.19',
    location: 'Frankfurt, DE',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    severity: 'info',
    status: 'success',
    statusCode: '200 OK',
    timeAgo: '8 mins ago',
    timestamp: '2024-09-26T21:31:05Z',
    details: {
      method: 'POST',
      endpoint: '/auth/2fa/challenge',
      mechanism: 'TOTP'
    }
  },
  {
    id: 'EVT-904126',
    action: 'DNS.Zone.RecordUpdate',
    resource: 'devstudio-agency.net',
    category: 'infrastructure',
    actor: 'system.orchestrator',
    actorRole: 'Migration Daemon',
    ipAddress: '127.0.0.1',
    location: 'Internal Core',
    userAgent: 'Hostlab-MigrationWorker/v2.4',
    severity: 'info',
    status: 'success',
    statusCode: '201 Created',
    timeAgo: '18 mins ago',
    timestamp: '2024-09-26T21:21:40Z',
    details: {
      zone: 'devstudio-agency.net',
      recordType: 'A',
      targetIp: '185.193.64.12'
    }
  },
  {
    id: 'EVT-904125',
    action: 'Billing.Invoice.AutoDebit',
    resource: 'INV-2024-108 ($150.00)',
    category: 'billing',
    actor: 'stripe.webhook',
    actorRole: 'Gateway',
    ipAddress: '54.187.174.169',
    location: 'Ashburn, US',
    userAgent: 'Stripe/1.0',
    severity: 'info',
    status: 'success',
    statusCode: '200 OK',
    timeAgo: '42 mins ago',
    timestamp: '2024-09-26T20:57:18Z',
    details: {
      invoiceId: 'INV-2024-108',
      amountCaptured: 150.00
    }
  },
  {
    id: 'EVT-904124',
    action: 'Auth.SSHKey.Inject',
    resource: 'vps-sto-01 (185.193.66.88)',
    category: 'security',
    actor: 'marcus@nordicfintech.se',
    actorRole: 'Client Owner',
    ipAddress: '194.14.88.5',
    location: 'Stockholm, SE',
    userAgent: 'HostlabCLI/v1.9.0',
    severity: 'info',
    status: 'success',
    statusCode: '200 OK',
    timeAgo: '1 hour ago',
    timestamp: '2024-09-26T20:38:22Z',
    details: {
      fingerprint: 'SHA256:7mK9pL2xVqRtY4wBz810mNaPqRs',
      targetUser: 'root'
    }
  },
  {
    id: 'EVT-904123',
    action: 'Auth.RootLogin.Failed',
    resource: 'vps-lon-02 (185.193.64.18)',
    category: 'security',
    actor: 'unknown.scanner',
    actorRole: 'Intrusion Probe',
    ipAddress: '193.106.191.8',
    location: 'Kyiv, UA',
    userAgent: 'Go-http-client/1.1',
    severity: 'critical',
    status: 'failed',
    statusCode: '403 Forbidden',
    timeAgo: '2 hours ago',
    timestamp: '2024-09-26T19:44:10Z',
    details: {
      reason: 'Failed password attempt for root via SSH',
      mitigation: 'Fail2ban banned IP'
    }
  },
  {
    id: 'EVT-904122',
    action: 'Email.Mailbox.Create',
    resource: 'press@apexstudios.design',
    category: 'infrastructure',
    actor: 'david@apexstudios.design',
    actorRole: 'Client Owner',
    ipAddress: '86.134.42.10',
    location: 'London, UK',
    userAgent: 'Mozilla/5.0',
    severity: 'info',
    status: 'success',
    statusCode: '201 Created',
    timeAgo: '3 hours ago',
    timestamp: '2024-09-26T18:20:44Z',
    details: {
      mailboxEmail: 'press@apexstudios.design',
      storageQuotaMb: 10240
    }
  },
  {
    id: 'EVT-904121',
    action: 'VPS.Snapshot.Create',
    resource: 'vps-fra-01 (185.193.65.10)',
    category: 'infrastructure',
    actor: 'marcus.brody@hostlab.internal',
    actorRole: 'DevOps / SRE',
    ipAddress: '194.14.88.33',
    location: 'Frankfurt, DE',
    userAgent: 'HostlabCLI/v1.9.0',
    severity: 'info',
    status: 'success',
    statusCode: '200 OK',
    timeAgo: '4 hours ago',
    timestamp: '2024-09-26T17:10:02Z',
    details: {
      snapshotId: 'snp-fra-pre-cutover',
      sizeGb: 18.4
    }
  },
  {
    id: 'EVT-904120',
    action: 'Billing.Coupon.Redeem',
    resource: 'GROWTH50 ($120.00)',
    category: 'billing',
    actor: 'priya@zenithai.io',
    actorRole: 'Client Owner',
    ipAddress: '49.207.199.14',
    location: 'Bengaluru, IN',
    userAgent: 'Mozilla/5.0',
    severity: 'info',
    status: 'success',
    statusCode: '200 OK',
    timeAgo: '5 hours ago',
    timestamp: '2024-09-26T16:04:19Z',
    details: {
      couponCode: 'GROWTH50',
      discountAmount: 120.00
    }
  },
  {
    id: 'EVT-904119',
    action: 'Staff.Role.Update',
    resource: 'Alex Chen (STF-002)',
    category: 'security',
    actor: 'raphael@hostlab.internal',
    actorRole: 'Super Admin',
    ipAddress: '194.14.88.5',
    location: 'Stockholm, SE',
    userAgent: 'Mozilla/5.0',
    severity: 'warning',
    status: 'success',
    statusCode: '200 OK',
    timeAgo: '6 hours ago',
    timestamp: '2024-09-26T15:22:31Z',
    details: {
      targetStaffId: 'STF-002',
      newRole: 'role-support-l2'
    }
  }
];

let logsList = [...initialLogs];
let currentFilter = 'all'; // all | security | infrastructure | billing
let currentSearch = '';
let currentSeverityFilter = 'all';
let selectedLogId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderActivityLogsHTML() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar (NO CARDS OVERVIEW) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Audit Logs
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Immutable system activity and security audit trail.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-export-log-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>Export</span>
          </button>
        </div>
      </div>

      <!-- Controls & Tabs -->
      <div class="space-y-4">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2" id="log-filter-tabs">
          <button 
            type="button" 
            data-filter="all" 
            class="log-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            All (<span id="count-all">0</span>)
          </button>
          
          <button 
            type="button" 
            data-filter="security" 
            class="log-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'security' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Security (<span id="count-security">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="infrastructure" 
            class="log-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'infrastructure' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Infrastructure (<span id="count-infra">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="billing" 
            class="log-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'billing' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Billing (<span id="count-billing">0</span>)
          </button>
        </div>

        <!-- Filter Search & Severity Selector -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="log-search-input"
              value="${currentSearch}"
              placeholder="Search logs..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <select 
              id="log-severity-select" 
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
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
                <th class="py-3 px-4 font-medium">Event & Resource</th>
                <th class="py-3 px-4 font-medium">Actor</th>
                <th class="py-3 px-4 font-medium">IP & Location</th>
                <th class="py-3 px-4 font-medium text-center">Severity</th>
                <th class="py-3 px-4 font-medium">Time</th>
                <th class="py-3 px-4 font-medium text-center">Status</th>
                <th class="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="log-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <div id="log-empty-state" class="hidden p-12 text-center">
          <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
            <i data-lucide="file-text" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No log entries found</h3>
          <p class="text-xs text-zinc-500">No audit records match your query.</p>
        </div>
      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="log-drawer-container"></div>

      <!-- Export Logs Modal -->
      <div id="export-log-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="download" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold text-zinc-900 dark:text-white text-base">Export Logs</h3>
            </div>
            <button type="button" id="close-export-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="export-log-form" class="p-6 space-y-4 text-xs">
            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Format</label>
              <select id="modal-export-format" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none font-mono">
                <option value="json">JSON Lines (NDJSON)</option>
                <option value="csv">CSV (Spreadsheet)</option>
                <option value="syslog">Syslog RFC 5424</option>
              </select>
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Time Range</label>
              <select id="modal-export-range" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="all">Full Retention Archive</option>
              </select>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-export-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                id="submit-export-btn"
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 flex items-center gap-1.5"
              >
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>Download</span>
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

function getFilteredLogs() {
  return logsList.filter(item => {
    if (currentFilter === 'security' && item.category !== 'security') return false;
    if (currentFilter === 'infrastructure' && item.category !== 'infrastructure') return false;
    if (currentFilter === 'billing' && item.category !== 'billing') return false;

    if (currentSeverityFilter !== 'all' && item.severity !== currentSeverityFilter) return false;

    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchAction = item.action.toLowerCase().includes(q);
      const matchResource = item.resource.toLowerCase().includes(q);
      const matchActor = item.actor.toLowerCase().includes(q);
      const matchIp = item.ipAddress.toLowerCase().includes(q);
      if (!matchAction && !matchResource && !matchActor && !matchIp) return false;
    }

    return true;
  });
}

function updateTabCounts() {
  const countAll = document.getElementById('count-all');
  const countSecurity = document.getElementById('count-security');
  const countInfra = document.getElementById('count-infra');
  const countBilling = document.getElementById('count-billing');

  if (countAll) countAll.textContent = logsList.length;
  if (countSecurity) countSecurity.textContent = logsList.filter(l => l.category === 'security').length;
  if (countInfra) countInfra.textContent = logsList.filter(l => l.category === 'infrastructure').length;
  if (countBilling) countBilling.textContent = logsList.filter(l => l.category === 'billing').length;
}

function renderTableRows() {
  const tbody = document.getElementById('log-table-body');
  const emptyState = document.getElementById('log-empty-state');
  if (!tbody) return;

  const filtered = getFilteredLogs();

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(item => {
    let severityClass = 'text-blue-500';
    let severityLabel = 'Info';
    if (item.severity === 'warning') {
      severityClass = 'text-amber-500';
      severityLabel = 'Warning';
    } else if (item.severity === 'critical') {
      severityClass = 'text-rose-500 font-bold';
      severityLabel = 'Critical';
    }

    let statusClass = 'text-emerald-500';
    if (item.status === 'failed') {
      statusClass = 'text-rose-500 font-bold';
    } else if (item.status === 'rate-limited') {
      statusClass = 'text-amber-500';
    }

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Event & Resource -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white max-w-xs">
          <div>${item.action}</div>
          <div class="text-[11px] text-zinc-400 font-sans mt-0.5 truncate">${item.resource}</div>
        </td>

        <!-- Actor -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div class="font-medium text-zinc-900 dark:text-white truncate max-w-[180px]">${item.actor}</div>
          <div class="text-[11px] text-zinc-400">${item.actorRole}</div>
        </td>

        <!-- IP & Location -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div>${item.ipAddress}</div>
          <div class="text-[11px] text-zinc-400">${item.location}</div>
        </td>

        <!-- Severity (plain text, NO pill) -->
        <td class="py-3 px-4 text-center font-mono font-medium ${severityClass}">
          ${severityLabel}
        </td>

        <!-- Time -->
        <td class="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-300">
          ${item.timeAgo}
        </td>

        <!-- Status (plain text, NO pill) -->
        <td class="py-3 px-4 text-center font-mono font-medium ${statusClass}">
          ${item.statusCode}
        </td>

        <!-- Actions -->
        <td class="py-3 px-4 text-right">
          <button 
            type="button" 
            data-view-log="${item.id}"
            class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Inspect Details"
          >
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  createIcons({ icons });
}

// ==========================================
// 4. SLIDE-OVER DRAWER (AUDIT EVENT INSPECTOR)
// ==========================================

function renderLogDrawer(logId) {
  const container = document.getElementById('log-drawer-container');
  if (!container) return;

  const item = logsList.find(l => l.id === logId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let severityClass = 'text-blue-500';
  let severityLabel = 'Info';
  if (item.severity === 'warning') {
    severityClass = 'text-amber-500';
    severityLabel = 'Warning';
  } else if (item.severity === 'critical') {
    severityClass = 'text-rose-500 font-bold';
    severityLabel = 'Critical';
  }

  let statusClass = 'text-emerald-500';
  if (item.status === 'failed') {
    statusClass = 'text-rose-500';
  } else if (item.status === 'rate-limited') {
    statusClass = 'text-amber-500';
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-xl h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>${item.id}</span>
              <span>/</span>
              <span class="${severityClass}">${severityLabel}</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${item.statusCode}</span>
            </div>
            <h2 class="text-lg font-bold font-display text-zinc-900 dark:text-white font-mono">
              ${item.action}
            </h2>
            <div class="text-xs text-zinc-400 mt-0.5">${item.resource}</div>
          </div>
          <button 
            type="button" 
            id="close-log-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700 dark:text-zinc-300">
          
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
              <div class="text-zinc-500 text-[11px] font-mono">ACTOR</div>
              <div class="font-semibold text-zinc-900 dark:text-white mt-1 break-all">${item.actor}</div>
              <div class="text-[11px] text-zinc-400 mt-0.5">${item.actorRole}</div>
            </div>
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
              <div class="text-zinc-500 text-[11px] font-mono">ORIGIN IP</div>
              <div class="font-semibold text-zinc-900 dark:text-white mt-1 font-mono">${item.ipAddress}</div>
              <div class="text-[11px] text-zinc-400 mt-0.5">${item.location}</div>
            </div>
          </div>

          <!-- Payload -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-zinc-500">Event Payload</span>
              <button 
                type="button" 
                id="copy-json-btn"
                class="text-[11px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                <span id="copy-json-text">Copy</span>
              </button>
            </div>

            <div class="p-4 rounded-lg bg-black border border-zinc-800 text-zinc-300 font-mono text-[11px] leading-relaxed overflow-x-auto select-all">
              <pre><code>${JSON.stringify({
                eventId: item.id,
                action: item.action,
                resource: item.resource,
                timestamp: item.timestamp,
                severity: item.severity,
                status: item.status,
                statusCode: item.statusCode,
                actor: item.actor,
                ip: item.ipAddress,
                metadata: item.details
              }, null, 2)}</code></pre>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
          <div class="text-[11px] font-mono text-zinc-400">
            ${item.timestamp}
          </div>
          <button 
            type="button" 
            id="drawer-log-done-btn"
            class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  `;

  createIcons({ icons });

  const closeBtn = document.getElementById('close-log-drawer-btn');
  const doneBtn = document.getElementById('drawer-log-done-btn');
  const copyBtn = document.getElementById('copy-json-btn');
  const copyText = document.getElementById('copy-json-text');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedLogId = null;
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
      const payload = JSON.stringify(item, null, 2);
      navigator.clipboard?.writeText(payload);
      if (copyText) copyText.textContent = 'Copied!';
      setTimeout(() => {
        if (copyText) copyText.textContent = 'Copy';
      }, 1500);
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupActivityLogsEvents(onNavigate) {
  createIcons({ icons });
  updateTabCounts();
  renderTableRows();

  // Search input
  const searchInput = document.getElementById('log-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Severity select
  const severitySelect = document.getElementById('log-severity-select');
  if (severitySelect) {
    severitySelect.onchange = (e) => {
      currentSeverityFilter = e.target.value;
      renderTableRows();
    };
  }

  // Tabs filtering
  const tabsContainer = document.getElementById('log-filter-tabs');
  if (tabsContainer) {
    tabsContainer.onclick = (e) => {
      const tabBtn = e.target.closest('.log-tab');
      if (!tabBtn) return;

      currentFilter = tabBtn.getAttribute('data-filter') || 'all';

      // Update classes
      tabsContainer.querySelectorAll('.log-tab').forEach(b => {
        if (b === tabBtn) {
          b.className = 'log-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900';
        } else {
          b.className = 'log-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white';
        }
      });

      renderTableRows();
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('log-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-log]');
      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-log');
        selectedLogId = id;
        renderLogDrawer(id);
      }
    };
  }

  // Export Modal
  const openExportBtn = document.getElementById('open-export-log-btn');
  const exportModal = document.getElementById('export-log-modal');
  const closeExportBtn = document.getElementById('close-export-modal-btn');
  const cancelExportBtn = document.getElementById('cancel-export-btn');
  const exportForm = document.getElementById('export-log-form');

  const closeExport = () => {
    if (exportModal) exportModal.classList.add('hidden');
  };

  if (openExportBtn && exportModal) {
    openExportBtn.onclick = () => {
      exportModal.classList.remove('hidden');
    };
  }

  if (closeExportBtn) closeExportBtn.onclick = closeExport;
  if (cancelExportBtn) cancelExportBtn.onclick = closeExport;

  if (exportForm) {
    exportForm.onsubmit = (e) => {
      e.preventDefault();
      const format = document.getElementById('modal-export-format')?.value || 'json';
      const range = document.getElementById('modal-export-range')?.value || '24h';

      const filtered = getFilteredLogs();
      const filename = `hostlab-audit-${range}-${Date.now()}.${format === 'csv' ? 'csv' : 'json'}`;
      const blobData = format === 'csv'
        ? 'id,action,resource,actor,ip,time,status\n' + filtered.map(l => `"${l.id}","${l.action}","${l.resource}","${l.actor}","${l.ipAddress}","${l.timestamp}","${l.statusCode}"`).join('\n')
        : JSON.stringify(filtered, null, 2);

      const blob = new Blob([blobData], { type: format === 'csv' ? 'text/csv' : 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      closeExport();
    };
  }
}

export function cleanupActivityLogs() {
  currentSearch = '';
  currentFilter = 'all';
  currentSeverityFilter = 'all';
  selectedLogId = null;
}
