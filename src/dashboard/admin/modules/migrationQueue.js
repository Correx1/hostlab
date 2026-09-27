import { createIcons, icons } from 'lucide';

/**
 * Hostlab Migration Queue Module
 * Dedicated standalone module for incoming website, database, and mailbox migrations
 * from cPanel, Plesk, DirectAdmin, WP Engine, and generic SSH/Rsync sources.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const migrationStats = {
  activeJobs: 4,
  queuedJobs: 2,
  completed30d: 184,
  failedJobs: 1,
  totalTransferredTB: '1.86 TB',
  avgMigrationTimeMins: '24m'
};

export const initialMigrations = [
  {
    id: 'mig-801',
    domain: 'apexmedia.co',
    client: 'Apex Media Group',
    sourceProvider: 'cPanel Backup (WHM API)',
    sourceIp: '198.51.100.42',
    targetNode: 'vps-lon-01 (185.193.64.12)',
    currentStep: 'Step 3/5: Syncing MySQL Databases',
    progressPercent: 68,
    dataTransferred: '14.8 GB',
    dataTotal: '21.5 GB',
    speed: '48 MB/s',
    eta: '8 mins remaining',
    status: 'running', // running | queued | completed | failed
    includeMailboxes: true,
    includeDns: true,
    startedAt: '16 minutes ago',
    logs: [
      '[19:15:02] Connected to source cPanel API v2 at 198.51.100.42:2087 (SSL verified)',
      '[19:15:18] Generated streaming backup snapshot of /home/apexmedia',
      '[19:17:40] Public_html filesystem stream initialized via TLS pipeline',
      '[19:22:15] Completed 12.4 GB document root sync without checksum mismatch',
      '[19:24:00] Dumping 4 MySQL databases: apex_db, apex_wp, apex_crm, apex_logs',
      '[19:26:10] Ingesting apex_db into target MySQL 8.0 instance (68% complete)...'
    ]
  },
  {
    id: 'mig-802',
    domain: 'freshgreenshop.com',
    client: 'Fresh Green Organics',
    sourceProvider: 'WordPress SFTP/MySQL Migrator',
    sourceIp: '172.67.142.19',
    targetNode: 'app-fra-02 (185.193.64.14)',
    currentStep: 'Step 2/5: Streaming wp-content/uploads',
    progressPercent: 42,
    dataTransferred: '8.4 GB',
    dataTotal: '20.0 GB',
    speed: '32 MB/s',
    eta: '18 mins remaining',
    status: 'running',
    includeMailboxes: false,
    includeDns: true,
    startedAt: '12 minutes ago',
    logs: [
      '[19:19:11] WordPress auth plugin key accepted',
      '[19:20:00] Validated WP core v6.4.3 and active theme Astra Pro',
      '[19:21:40] Streaming 34,000 product images from wp-content/uploads/2023/',
      '[19:27:50] Media assets sync running at 32 MB/s...'
    ]
  },
  {
    id: 'mig-803',
    domain: 'nordicfintech.se',
    client: 'Nordic Capital AB',
    sourceProvider: 'Plesk JetBackup Archive',
    sourceIp: '194.14.88.5',
    targetNode: 'vps-sto-01 (185.193.66.88)',
    currentStep: 'Step 4/5: Verifying SSL & Nginx VHost',
    progressPercent: 91,
    dataTransferred: '34.2 GB',
    dataTotal: '37.5 GB',
    speed: '64 MB/s',
    eta: '2 mins remaining',
    status: 'running',
    includeMailboxes: true,
    includeDns: false,
    startedAt: '28 minutes ago',
    logs: [
      '[19:03:00] Received encrypted JetBackup tarball stream',
      '[19:08:44] Extracted virtual host directories and Nginx configuration templates',
      '[19:16:30] Migrated 14 IMAP mailboxes into Hostlab Business Mail storage',
      '[19:25:12] Ingested PostgreSQL 15 database cluster (18.2 GB)',
      '[19:29:40] Generating Let\'s Encrypt wildcard certificate for staging URL...'
    ]
  },
  {
    id: 'mig-804',
    domain: 'velocityautos.co.uk',
    client: 'Velocity Motors Ltd',
    sourceProvider: 'DirectAdmin Full User Backup',
    sourceIp: '82.165.197.1',
    targetNode: 'vps-lon-02 (185.193.64.18)',
    currentStep: 'Step 1/5: Establishing Secure Rsync Daemon',
    progressPercent: 12,
    dataTransferred: '1.2 GB',
    dataTotal: '9.8 GB',
    speed: '24 MB/s',
    eta: '26 mins remaining',
    status: 'running',
    includeMailboxes: true,
    includeDns: true,
    startedAt: '4 minutes ago',
    logs: [
      '[19:27:00] SSH handshake on port 2222 succeeded (ed25519 key)',
      '[19:28:10] Scanning DirectAdmin backup archive manifest',
      '[19:29:05] Rsync stream initiated for home directory...'
    ]
  },
  {
    id: 'mig-805',
    domain: 'solarlighting.io',
    client: 'Solar Lighting Corp',
    sourceProvider: 'cPanel Backup (WHM API)',
    sourceIp: '144.126.241.90',
    targetNode: 'vps-lon-01 (185.193.64.12)',
    currentStep: 'Queued (Awaiting target node worker slot)',
    progressPercent: 0,
    dataTransferred: '0 GB',
    dataTotal: '15.4 GB',
    speed: '0 MB/s',
    eta: 'Queued',
    status: 'queued',
    includeMailboxes: true,
    includeDns: true,
    startedAt: 'Scheduled',
    logs: [
      '[19:20:00] Migration job scheduled by client',
      '[19:20:05] Pre-flight credentials verification PASSED',
      '[19:20:10] Waiting for available transfer worker...'
    ]
  },
  {
    id: 'mig-806',
    domain: 'kineticsport.com',
    client: 'Kinetic Athletic Wear',
    sourceProvider: 'Generic SSH / Rsync Server',
    sourceIp: '159.65.120.33',
    targetNode: 'app-ams-01 (185.193.65.20)',
    currentStep: 'Queued (Awaiting target node worker slot)',
    progressPercent: 0,
    dataTransferred: '0 GB',
    dataTotal: '42.0 GB',
    speed: '0 MB/s',
    eta: 'Queued',
    status: 'queued',
    includeMailboxes: false,
    includeDns: false,
    startedAt: 'Scheduled',
    logs: [
      '[19:24:30] SSH key exchange verified successfully',
      '[19:24:35] Target root storage verified (120 GB free)',
      '[19:24:40] Position #2 in queue...'
    ]
  },
  {
    id: 'mig-807',
    domain: 'devstudio-agency.net',
    client: 'DevStudio Digital',
    sourceProvider: 'cPanel Backup (WHM API)',
    sourceIp: '104.248.55.9',
    targetNode: 'vps-lon-01 (185.193.64.12)',
    currentStep: 'Step 5/5: Migration Complete & Verified',
    progressPercent: 100,
    dataTransferred: '18.4 GB',
    dataTotal: '18.4 GB',
    speed: 'Done',
    eta: 'Completed',
    status: 'completed',
    includeMailboxes: true,
    includeDns: true,
    startedAt: '1 hour ago',
    logs: [
      '[18:15:00] Migration job launched',
      '[18:24:10] DocumentRoot files sync complete',
      '[18:32:00] Database tables successfully restored',
      '[18:41:20] Health check 200 OK verified on staging URL',
      '[18:42:00] DNS cutover ready'
    ]
  },
  {
    id: 'mig-808',
    domain: 'urbanbarista.coffee',
    client: 'Urban Barista Ltd',
    sourceProvider: 'WordPress SFTP/MySQL Migrator',
    sourceIp: '178.62.204.11',
    targetNode: 'app-fra-02 (185.193.64.14)',
    currentStep: 'Step 5/5: Migration Complete & Verified',
    progressPercent: 100,
    dataTransferred: '6.2 GB',
    dataTotal: '6.2 GB',
    speed: 'Done',
    eta: 'Completed',
    status: 'completed',
    includeMailboxes: false,
    includeDns: true,
    startedAt: '2 hours ago',
    logs: [
      '[17:20:00] Migration initiated',
      '[17:34:00] Database imported with URL replacement (search & replace)',
      '[17:38:15] Completed without error'
    ]
  },
  {
    id: 'mig-809',
    domain: 'vaultcrypto.finance',
    client: 'Vault Financial Ltd',
    sourceProvider: 'Generic SSH / Rsync Server',
    sourceIp: '94.130.180.22',
    targetNode: 'vps-sto-01 (185.193.66.88)',
    currentStep: 'Failed at Step 2: Source SSH Connection Timeout',
    progressPercent: 18,
    dataTransferred: '2.1 GB',
    dataTotal: '14.0 GB',
    speed: '0 MB/s',
    eta: 'Halted',
    status: 'failed',
    includeMailboxes: true,
    includeDns: false,
    startedAt: '45 minutes ago',
    logs: [
      '[18:45:00] Initiated SSH transfer to 94.130.180.22:22',
      '[18:48:20] Connection reset by peer at source firewall',
      '[18:52:10] Retrying handshake attempt 2 of 3...',
      '[18:55:00] Retrying handshake attempt 3 of 3...',
      '[18:57:30] FATAL: Source host unreachable. Check IP whitelist.'
    ]
  }
];

let migrationsList = [...initialMigrations];
let currentFilter = 'all'; // all | running | queued | completed | failed
let currentSearch = '';
let selectedMigrationId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderMigrationQueueHTML() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar (NO CARDS OVERVIEW) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Migration Queue
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Automated site, database, and mailbox migrations.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-create-mig-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>New Migration</span>
          </button>
        </div>
      </div>

      <!-- Controls & Tabs -->
      <div class="space-y-4">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2" id="migration-filter-tabs">
          <button 
            type="button" 
            data-filter="all" 
            class="mig-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            All Migrations (<span id="count-all">0</span>)
          </button>
          
          <button 
            type="button" 
            data-filter="running" 
            class="mig-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'running' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            In-Progress (<span id="count-running">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="queued" 
            class="mig-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'queued' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Queued (<span id="count-queued">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="completed" 
            class="mig-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'completed' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Completed (<span id="count-completed">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="failed" 
            class="mig-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'failed' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Failed (<span id="count-failed">0</span>)
          </button>
        </div>

        <!-- Filter Search & Global Action -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="migration-search-input"
              value="${currentSearch}"
              placeholder="Search by target domain, client, or source provider..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-zinc-500">
              Worker Capacity: 4/8 Concurrent Slots
            </span>
          </div>
        </div>

      </div>

      <!-- Main Data Table -->
      <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900/40 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
                <th class="py-3 px-4 font-medium">Target Domain & Client</th>
                <th class="py-3 px-4 font-medium">Source Engine</th>
                <th class="py-3 px-4 font-medium">Progress</th>
                <th class="py-3 px-4 font-medium text-right">Data Volume</th>
                <th class="py-3 px-4 font-medium text-right">ETA</th>
                <th class="py-3 px-4 font-medium text-center">Status</th>
                <th class="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="migration-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <!-- Empty state container -->
        <div id="mig-empty-state" class="hidden p-12 text-center">
          <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
            <i data-lucide="arrow-left-right" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No migrations found</h3>
          <p class="text-xs text-zinc-500 max-w-sm mx-auto">
            No migration tasks match your current filter or search criteria.
          </p>
        </div>
      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="migration-drawer-container"></div>

      <!-- Initiate Migration Modal -->
      <div id="create-migration-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="arrow-left-right" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold font-display text-zinc-900 dark:text-white text-base">Initiate New Migration</h3>
            </div>
            <button type="button" id="close-create-mig-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="create-migration-form" class="p-6 space-y-4 text-xs">
            
            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Target Domain Name</label>
              <input 
                type="text" 
                id="modal-mig-domain" 
                placeholder="example.com" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Client / Organization</label>
              <input 
                type="text" 
                id="modal-mig-client" 
                placeholder="Acme Studios LLC" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Source Engine / Format</label>
              <select id="modal-mig-provider" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none font-mono">
                <option value="cPanel Backup (WHM API)">cPanel Live Stream (WHM / cPanel User Credentials)</option>
                <option value="WordPress SFTP/MySQL Migrator">WordPress Engine (Direct SFTP & MySQL Dump)</option>
                <option value="Plesk JetBackup Archive">Plesk XML/JetBackup Ingestion</option>
                <option value="DirectAdmin Full User Backup">DirectAdmin User Archive (.tar.gz)</option>
                <option value="Generic SSH / Rsync Server">Generic SSH / Rsync Remote Host</option>
              </select>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="col-span-2">
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Source Host / IP</label>
                <input 
                  type="text" 
                  id="modal-mig-ip" 
                  placeholder="198.51.100.42" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Port</label>
                <input 
                  type="number" 
                  id="modal-mig-port" 
                  value="22" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Target Destination Node</label>
              <select id="modal-mig-target" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none font-mono">
                <option value="vps-lon-01 (185.193.64.12)">vps-lon-01 (London Primary - 185.193.64.12)</option>
                <option value="app-fra-02 (185.193.64.14)">app-fra-02 (Frankfurt Web Node - 185.193.64.14)</option>
                <option value="vps-sto-01 (185.193.66.88)">vps-sto-01 (Stockholm Dedicated - 185.193.66.88)</option>
              </select>
            </div>

            <!-- Migration Components -->
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="modal-mig-opt-mail" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 w-4 h-4" />
                <span>Migrate existing IMAP/POP3 Mailboxes and message stores</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="modal-mig-opt-dns" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 w-4 h-4" />
                <span>Auto-provision Hostlab authoritative DNS zone</span>
              </label>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-create-mig-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Launch Pipeline
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

function getFilteredMigrations() {
  return migrationsList.filter(item => {
    // 1. Tab filter
    if (currentFilter === 'running' && item.status !== 'running') return false;
    if (currentFilter === 'queued' && item.status !== 'queued') return false;
    if (currentFilter === 'completed' && item.status !== 'completed') return false;
    if (currentFilter === 'failed' && item.status !== 'failed') return false;

    // 2. Search query
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchDomain = item.domain.toLowerCase().includes(q);
      const matchClient = item.client.toLowerCase().includes(q);
      const matchProvider = item.sourceProvider.toLowerCase().includes(q);
      if (!matchDomain && !matchClient && !matchProvider) return false;
    }

    return true;
  });
}

function updateTabCounts() {
  const countAll = document.getElementById('count-all');
  const countRunning = document.getElementById('count-running');
  const countQueued = document.getElementById('count-queued');
  const countCompleted = document.getElementById('count-completed');
  const countFailed = document.getElementById('count-failed');

  if (countAll) countAll.textContent = migrationsList.length;
  if (countRunning) countRunning.textContent = migrationsList.filter(m => m.status === 'running').length;
  if (countQueued) countQueued.textContent = migrationsList.filter(m => m.status === 'queued').length;
  if (countCompleted) countCompleted.textContent = migrationsList.filter(m => m.status === 'completed').length;
  if (countFailed) countFailed.textContent = migrationsList.filter(m => m.status === 'failed').length;
}

function renderTableRows() {
  const tbody = document.getElementById('migration-table-body');
  const emptyState = document.getElementById('mig-empty-state');
  if (!tbody) return;

  const filtered = getFilteredMigrations();

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(item => {
    // Status text formatting: plain text with color, NO background pill
    let statusClass = 'text-blue-500';
    let statusLabel = 'In-Progress';
    if (item.status === 'queued') {
      statusClass = 'text-amber-500';
      statusLabel = 'Queued';
    } else if (item.status === 'completed') {
      statusClass = 'text-emerald-500';
      statusLabel = 'Completed';
    } else if (item.status === 'failed') {
      statusClass = 'text-rose-500';
      statusLabel = 'Failed';
    }

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Target Domain & Client -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          <div class="flex items-center gap-2">
            <i data-lucide="globe" class="w-3.5 h-3.5 text-zinc-400 shrink-0"></i>
            <span>${item.domain}</span>
          </div>
          <div class="text-[11px] text-zinc-400 font-sans mt-0.5">${item.client}</div>
        </td>

        <!-- Source Engine (plain text, no pill) -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div>${item.sourceProvider}</div>
          <div class="text-[11px] text-zinc-400">${item.sourceIp}</div>
        </td>

        <!-- Progress (clean percentage only, no loading bar) -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          ${item.progressPercent}%
        </td>

        <!-- Data Volume (clean numbers) -->
        <td class="py-3 px-4 font-mono text-right text-zinc-900 dark:text-zinc-100">
          ${item.dataTransferred} / ${item.dataTotal}
        </td>

        <!-- ETA -->
        <td class="py-3 px-4 font-mono text-right text-zinc-700 dark:text-zinc-300">
          ${item.eta}
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
              data-view-mig="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Inspect Migration Terminal Logs"
            >
              <i data-lucide="terminal" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-toggle-mig="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="${item.status === 'running' ? 'Pause Transfer' : 'Resume Transfer'}"
            >
              <i data-lucide="${item.status === 'running' ? 'pause' : 'play'}" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-delete-mig="${item.id}"
              class="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Abort / Remove"
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
// 4. SLIDE-OVER DRAWER (TERMINAL & STEP PROGRESS)
// ==========================================

function renderMigrationDrawer(migrationId) {
  const container = document.getElementById('migration-drawer-container');
  if (!container) return;

  const item = migrationsList.find(m => m.id === migrationId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let statusClass = 'text-blue-500';
  let statusLabel = 'In-Progress';
  if (item.status === 'queued') {
    statusClass = 'text-amber-500';
    statusLabel = 'Queued';
  } else if (item.status === 'completed') {
    statusClass = 'text-emerald-500';
    statusLabel = 'Completed';
  } else if (item.status === 'failed') {
    statusClass = 'text-rose-500';
    statusLabel = 'Failed';
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-xl h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>Migration Orchestrator</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${statusLabel}</span>
            </div>
            <h2 class="text-xl font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2">
              <i data-lucide="arrow-left-right" class="w-5 h-5 text-zinc-400"></i>
              <span>${item.domain}</span>
            </h2>
          </div>
          <button 
            type="button" 
            id="close-mig-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700 dark:text-zinc-300">
          
          <!-- Progress Banner -->
          <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-mono uppercase text-zinc-500">Pipeline Execution Progress</span>
              <span class="font-mono font-bold text-zinc-900 dark:text-white text-sm">${item.progressPercent}%</span>
            </div>
            <div class="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-300 ${item.status === 'failed' ? 'bg-rose-500' : (item.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500')}"
                style="width: ${item.progressPercent}%"
              ></div>
            </div>
            <div class="flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Transferred: ${item.dataTransferred} of ${item.dataTotal}</span>
              <span>Speed: ${item.speed}</span>
            </div>
          </div>

          <!-- Topology & Node Mapping -->
          <div class="space-y-3">
            <div class="text-xs font-mono uppercase text-zinc-500">Server Mapping</div>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">SOURCE ORIGIN</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.sourceProvider}</div>
                <div class="text-[11px] text-zinc-400 font-mono mt-0.5">${item.sourceIp}</div>
              </div>
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">TARGET HOSTLAB CLUSTER</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.targetNode}</div>
                <div class="text-[11px] text-emerald-500 font-mono mt-0.5">Ready for cutover</div>
              </div>
            </div>
          </div>

          <!-- Staging Preview URL -->
          <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono text-zinc-500 uppercase">Staging Preview Link</div>
              <div class="font-mono text-xs text-blue-500 hover:underline mt-0.5 cursor-pointer">
                http://${item.domain.replace('.', '-')}.preview.hostlab.cloud
              </div>
            </div>
            <button 
              type="button" 
              class="px-2.5 py-1.5 rounded border border-zinc-200 dark:border-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1 cursor-pointer"
              onclick="navigator.clipboard.writeText('http://${item.domain.replace('.', '-')}.preview.hostlab.cloud')"
            >
              <i data-lucide="copy" class="w-3 h-3"></i>
              <span>Copy</span>
            </button>
          </div>

          <!-- Live Streaming Terminal Log -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-zinc-500 flex items-center gap-1.5">
                <i data-lucide="terminal" class="w-3.5 h-3.5"></i>
                <span>Worker Terminal Output</span>
              </span>
              <span class="text-[10px] font-mono text-zinc-400">stdout/stderr stream</span>
            </div>

            <div class="p-4 rounded-lg bg-black border border-zinc-800 text-zinc-300 font-mono text-[11px] leading-relaxed space-y-1.5 max-h-56 overflow-y-auto custom-scrollbar select-all">
              ${item.logs.map(log => `
                <div class="flex items-start gap-2">
                  <span class="text-zinc-500 select-none">$</span>
                  <span class="${log.includes('FATAL') ? 'text-rose-400 font-bold' : (log.includes('complete') ? 'text-emerald-400' : 'text-zinc-300')}">${log}</span>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
          <button 
            type="button" 
            id="drawer-abort-mig-btn"
            class="px-3 py-2 text-xs font-medium rounded-md text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            Abort Migration
          </button>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="drawer-toggle-mig-btn"
              class="px-3.5 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              ${item.status === 'running' ? 'Pause Pipeline' : 'Resume Pipeline'}
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

  const closeBtn = document.getElementById('close-mig-drawer-btn');
  const doneBtn = document.getElementById('drawer-done-btn');
  const toggleBtn = document.getElementById('drawer-toggle-mig-btn');
  const abortBtn = document.getElementById('drawer-abort-mig-btn');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedMigrationId = null;
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

  if (toggleBtn) {
    toggleBtn.onclick = () => {
      item.status = item.status === 'running' ? 'queued' : 'running';
      renderMigrationDrawer(item.id);
      renderTableRows();
    };
  }

  if (abortBtn) {
    abortBtn.onclick = () => {
      migrationsList = migrationsList.filter(m => m.id !== item.id);
      closeDrawer();
      updateTabCounts();
      renderTableRows();
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupMigrationQueueEvents(onNavigate) {
  createIcons({ icons });
  updateTabCounts();
  renderTableRows();

  // Tab Filtering
  const tabs = document.querySelectorAll('.mig-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => {
        t.className = 'mig-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white';
      });
      tab.className = 'mig-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900';

      currentFilter = tab.getAttribute('data-filter') || 'all';
      renderTableRows();
    };
  });

  // Search input
  const searchInput = document.getElementById('migration-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('migration-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-mig]');
      const toggleBtn = e.target.closest('[data-toggle-mig]');
      const deleteBtn = e.target.closest('[data-delete-mig]');

      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-mig');
        selectedMigrationId = id;
        renderMigrationDrawer(id);
      } else if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-toggle-mig');
        const item = migrationsList.find(m => m.id === id);
        if (item) {
          item.status = item.status === 'running' ? 'queued' : 'running';
          renderTableRows();
        }
      } else if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-delete-mig');
        migrationsList = migrationsList.filter(m => m.id !== id);
        updateTabCounts();
        renderTableRows();
      }
    };
  }

  // Initiate Modal Handlers
  const openModalBtn = document.getElementById('open-create-mig-btn');
  const modal = document.getElementById('create-migration-modal');
  const closeModalBtn = document.getElementById('close-create-mig-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-create-mig-btn');
  const form = document.getElementById('create-migration-form');

  if (openModalBtn && modal) {
    openModalBtn.onclick = () => modal.classList.remove('hidden');
  }

  const closeModal = () => {
    if (modal) modal.classList.add('hidden');
    if (form) form.reset();
  };

  if (closeModalBtn) closeModalBtn.onclick = closeModal;
  if (cancelModalBtn) cancelModalBtn.onclick = closeModal;

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const domain = document.getElementById('modal-mig-domain')?.value.trim();
      const client = document.getElementById('modal-mig-client')?.value.trim();
      const provider = document.getElementById('modal-mig-provider')?.value || 'cPanel Backup (WHM API)';
      const ip = document.getElementById('modal-mig-ip')?.value.trim();
      const target = document.getElementById('modal-mig-target')?.value || 'vps-lon-01 (185.193.64.12)';
      const includeMail = document.getElementById('modal-mig-opt-mail')?.checked ?? true;
      const includeDns = document.getElementById('modal-mig-opt-dns')?.checked ?? true;

      if (!domain || !client || !ip) return;

      const newMig = {
        id: `mig-${Date.now()}`,
        domain,
        client,
        sourceProvider: provider,
        sourceIp: ip,
        targetNode: target,
        currentStep: 'Step 1/5: Performing Pre-Flight Connection Check',
        progressPercent: 5,
        dataTransferred: '0.1 GB',
        dataTotal: '15.0 GB',
        speed: 'Connecting...',
        eta: 'Calculating...',
        status: 'running',
        includeMailboxes: includeMail,
        includeDns: includeDns,
        startedAt: 'Just now',
        logs: [
          `[${new Date().toLocaleTimeString()}] Pipeline started for ${domain}`,
          `[${new Date().toLocaleTimeString()}] Contacting source ${ip}...`
        ]
      };

      migrationsList.unshift(newMig);
      closeModal();
      updateTabCounts();
      renderTableRows();
    };
  }
}

export function cleanupMigrationQueue() {
  currentFilter = 'all';
  currentSearch = '';
  selectedMigrationId = null;
}
