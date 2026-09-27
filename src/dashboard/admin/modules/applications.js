import { createIcons, icons } from 'lucide';

/**
 * Hostlab Applications Module
 * Standalone module for runtime frameworks, process management, and live logs.
 */

// --- Data Store & State ---

export const appStats = {
  totalApps: 846,
  runningApps: 842,
  wordpressApps: 612,
  nodejsApps: 148,
  laravelApps: 58,
  pythonApps: 28,
  pendingUpdates: 18,
  memoryUsed: '38.4GB',
  memoryTotal: '96.0GB',
  memoryPercentage: '40%'
};

export const initialApplications = [
  {
    id: 'app-201',
    name: 'TechFlow Main WooCommerce',
    type: 'wordpress',
    typeName: 'WordPress',
    version: '6.5.2',
    domain: 'techflow-media.com',
    path: '/',
    runtime: 'PHP 8.3-FPM',
    processInfo: 'PHP-FPM Pool #83',
    memoryUsedMB: 280,
    memoryLimitMB: 1024,
    cpuUsage: '1.2%',
    updateStatus: 'Patch Available (v6.5.3)',
    hasUpdate: true,
    status: 'running',
    autoUpdate: true,
    createdAt: '2024-03-12'
  },
  {
    id: 'app-202',
    name: 'Apex Studios SSR Portal',
    type: 'nodejs',
    typeName: 'Node.js',
    version: '20.11 LTS',
    domain: 'apexstudios.design',
    path: '/',
    runtime: 'Node.js 20.11 (PM2)',
    processInfo: 'PM2 Cluster (Port 3000)',
    memoryUsedMB: 420,
    memoryLimitMB: 2048,
    cpuUsage: '2.4%',
    updateStatus: 'Up to date',
    hasUpdate: false,
    status: 'running',
    autoUpdate: false,
    createdAt: '2024-01-20'
  },
  {
    id: 'app-203',
    name: 'CryptoTrack Webhook Gateway',
    type: 'laravel',
    typeName: 'Laravel',
    version: '10.4',
    domain: 'cryptotrack-api.io',
    path: '/api/v1',
    runtime: 'PHP 8.2 (Swoole)',
    processInfo: 'Worker Daemon (Port 8080)',
    memoryUsedMB: 190,
    memoryLimitMB: 512,
    cpuUsage: '0.6%',
    updateStatus: 'Framework Patch (v10.4.8)',
    hasUpdate: true,
    status: 'stopped',
    autoUpdate: false,
    createdAt: '2024-02-18'
  },
  {
    id: 'app-204',
    name: 'Greenleaf Inventory Sync',
    type: 'python',
    typeName: 'Django',
    version: '5.0',
    domain: 'greenleaf-organics.co.uk',
    path: '/inventory',
    runtime: 'Python 3.11',
    processInfo: 'Gunicorn Worker #04',
    memoryUsedMB: 165,
    memoryLimitMB: 512,
    cpuUsage: '0.4%',
    updateStatus: 'Up to date',
    hasUpdate: false,
    status: 'running',
    autoUpdate: true,
    createdAt: '2023-11-04'
  },
  {
    id: 'app-205',
    name: 'Craft Coffee Blog & Shop',
    type: 'wordpress',
    typeName: 'WordPress',
    version: '6.5.2',
    domain: 'craftcoffee-roasters.com',
    path: '/',
    runtime: 'PHP 8.3-FPM',
    processInfo: 'PHP-FPM Pool #84',
    memoryUsedMB: 140,
    memoryLimitMB: 512,
    cpuUsage: '0.3%',
    updateStatus: 'Up to date',
    hasUpdate: false,
    status: 'running',
    autoUpdate: true,
    createdAt: '2024-04-10'
  },
  {
    id: 'app-206',
    name: 'Nordic Logistics Customer API',
    type: 'nodejs',
    typeName: 'Express.js',
    version: '18.19 LTS',
    domain: 'nordiclogistics.se',
    path: '/api',
    runtime: 'Node.js 18 (PM2)',
    processInfo: 'PM2 #02 (Port 4000)',
    memoryUsedMB: 310,
    memoryLimitMB: 1024,
    cpuUsage: '1.8%',
    updateStatus: 'Node LTS upgrade ready',
    hasUpdate: true,
    status: 'restarting',
    autoUpdate: false,
    createdAt: '2024-02-01'
  }
];

let appsList = [...initialApplications];
let currentAppTypeFilter = 'all';
let currentAppSearch = '';

function getFilteredApps() {
  return appsList.filter(app => {
    if (currentAppTypeFilter !== 'all' && app.type !== currentAppTypeFilter) return false;
    if (currentAppSearch.trim() !== '') {
      const q = currentAppSearch.toLowerCase();
      return (
        app.name.toLowerCase().includes(q) ||
        app.domain.toLowerCase().includes(q) ||
        app.typeName.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

// --- Component Builders ---

function getAppsStatsCardsHTML() {
  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Card 1: Total Apps -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="cpu" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ${appStats.runningApps} Active
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Total Deployed Apps
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${appStats.totalApps.toLocaleString()}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Running
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            ${appStats.wordpressApps} WordPress • ${appStats.nodejsApps} Node.js • ${appStats.laravelApps} Laravel
          </div>
        </div>
      </div>

      <!-- Card 2: Memory Footprint -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="activity" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            ${appStats.memoryPercentage}
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Worker Memory Pool
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${appStats.memoryUsed}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              / ${appStats.memoryTotal}
            </span>
          </div>
          <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div class="bg-blue-500 h-full rounded-full" style="width: ${appStats.memoryPercentage}"></div>
          </div>
        </div>
      </div>

      <!-- Card 3: Pending Security Updates -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="refresh-cw" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Action Ready
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Updates & Patches
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${appStats.pendingUpdates}
            </span>
            <span class="text-xs font-mono font-medium text-amber-600 dark:text-amber-400">
              Available
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            14 WP Core/Plugins • 4 Node/Frameworks
          </div>
        </div>
      </div>

      <!-- Card 4: Daemon Process Health -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="terminal" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            PM2 & FPM
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Process Health
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              99.8%
            </span>
            <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400">
              Optimal
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Automatic crash restart active
          </div>
        </div>
      </div>

    </div>
  `;
}

function getAppsTableHTML(apps, curTypeFilter, curSearch) {
  // Dynamically calculated counts from live data
  const wpCount = appsList.filter(a => a.type === 'wordpress').length;
  const nodeCount = appsList.filter(a => a.type === 'nodejs').length;
  const laravelCount = appsList.filter(a => a.type === 'laravel').length;
  const pythonCount = appsList.filter(a => a.type === 'python').length;

  return `
    <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
      
      <!-- Table Controls Bar -->
      <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Framework Tabs (Dynamic Counts) -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button 
            type="button" 
            data-app-type="all"
            class="app-type-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curTypeFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            All Apps (${appsList.length})
          </button>
          <button 
            type="button" 
            data-app-type="wordpress"
            class="app-type-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curTypeFilter === 'wordpress' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            WordPress (${wpCount})
          </button>
          <button 
            type="button" 
            data-app-type="nodejs"
            class="app-type-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curTypeFilter === 'nodejs' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Node.js (${nodeCount})
          </button>
          <button 
            type="button" 
            data-app-type="laravel"
            class="app-type-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curTypeFilter === 'laravel' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Laravel (${laravelCount})
          </button>
          <button 
            type="button" 
            data-app-type="python"
            class="app-type-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curTypeFilter === 'python' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Python (${pythonCount})
          </button>
        </div>

        <!-- Search Filter -->
        <div class="relative w-full md:w-64">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <i data-lucide="search" class="w-3.5 h-3.5"></i>
          </div>
          <input 
            type="text" 
            id="apps-search-input"
            value="${curSearch}"
            placeholder="Search app, domain..." 
            class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
          />
        </div>

      </div>

      <!-- Table Content (Cleaned: Process/Binding removed, clean Framework header) -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <th class="py-3 px-4 sm:px-6">Application & Domain</th>
              <th class="py-3 px-4">Framework</th>
              <th class="py-3 px-4">RAM Allocation</th>
              <th class="py-3 px-4">Updates & Patches</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
            ${apps.length === 0 ? `
              <tr>
                <td colspan="6" class="py-12 text-center text-zinc-500">
                  <div class="flex flex-col items-center justify-center">
                    <i data-lucide="cpu" class="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-2"></i>
                    <p class="text-sm font-medium text-zinc-900 dark:text-white">No applications match criteria</p>
                    <p class="text-xs text-zinc-400 mt-1">Try switching framework tabs or clearing search.</p>
                  </div>
                </td>
              </tr>
            ` : apps.map(app => {
              let statusText = '';
              if (app.status === 'running') {
                statusText = `<span class="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400">Running</span>`;
              } else if (app.status === 'stopped') {
                statusText = `<span class="text-xs font-mono font-semibold text-rose-500 dark:text-rose-400">Stopped</span>`;
              } else {
                statusText = `<span class="text-xs font-mono font-semibold text-blue-500 dark:text-blue-400">Restarting</span>`;
              }

              return `
                <tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors group">
                  <!-- App & Domain -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="font-medium text-zinc-900 dark:text-white">
                      ${app.name}
                    </div>
                    <div class="flex items-center gap-1.5 mt-0.5 text-[11px] font-mono text-zinc-400">
                      <span class="text-zinc-600 dark:text-zinc-300">${app.domain}</span>
                      <span class="text-zinc-500 font-mono">${app.path}</span>
                    </div>
                  </td>

                  <!-- Framework (Plain text, no color) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${app.typeName}
                  </td>

                  <!-- RAM (Numbers Only) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    <span class="font-semibold text-zinc-900 dark:text-zinc-100">${app.memoryUsedMB}MB</span><span class="text-zinc-400">/${app.memoryLimitMB}MB</span>
                  </td>

                  <!-- Updates -->
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-1.5">
                      <i data-lucide="${app.hasUpdate ? 'alert-circle' : 'check-circle-2'}" class="w-3.5 h-3.5 ${app.hasUpdate ? 'text-amber-500' : 'text-emerald-500'}"></i>
                      <span class="text-[11px] font-mono ${app.hasUpdate ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-zinc-500'}">
                        ${app.updateStatus}
                      </span>
                    </div>
                  </td>

                  <!-- Status (Text Only, Colored) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${statusText}
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <!-- Open Slide-over Details Drawer -->
                      <button 
                        type="button" 
                        class="app-details-btn px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        data-app-id="${app.id}"
                        title="View Process Specs & Live Logs"
                      >
                        Details
                      </button>

                      <button 
                        type="button" 
                        class="app-restart-btn p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        data-app-id="${app.id}"
                        title="Restart Application Process"
                      >
                        <i data-lucide="rotate-cw" class="w-4 h-4"></i>
                      </button>

                      <button 
                        type="button" 
                        class="app-delete-btn p-1.5 rounded hover:bg-rose-500/10 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        data-app-id="${app.id}"
                        title="Remove Application"
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
          Showing <span class="text-zinc-900 dark:text-white font-semibold">${apps.length}</span> of 846 managed applications
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

function getAppDetailsDrawerHTML() {
  return `
    <div id="app-details-drawer" class="fixed inset-0 z-50 overflow-hidden hidden transition-all duration-300">
      <!-- Backdrop -->
      <div id="app-details-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-lg bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto custom-scrollbar">
          
          <div>
            <!-- Drawer Header -->
            <div class="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <div class="flex items-center gap-2">
                  <span id="drawer-app-framework" class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">WordPress</span>
                  <span id="drawer-app-status" class="text-xs font-mono font-semibold text-emerald-500">Running</span>
                </div>
                <h3 id="drawer-app-name" class="text-lg font-bold font-display text-zinc-900 dark:text-white mt-1">TechFlow Main WooCommerce</h3>
                <p id="drawer-app-domain" class="text-xs font-mono text-zinc-400 mt-0.5">techflow-media.com /</p>
              </div>
              <button type="button" id="close-app-drawer-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Drawer Body -->
            <div class="space-y-5 mt-5">
              <!-- Resource Specs Grid -->
              <div class="grid grid-cols-3 gap-2.5 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60">
                <div>
                  <div class="text-[10px] font-mono text-zinc-400 uppercase">Memory RAM</div>
                  <div id="drawer-app-ram" class="text-xs font-bold font-mono text-zinc-900 dark:text-white mt-0.5">280MB/1024MB</div>
                </div>
                <div>
                  <div class="text-[10px] font-mono text-zinc-400 uppercase">Runtime Pool</div>
                  <div id="drawer-app-process" class="text-xs font-bold font-mono text-zinc-900 dark:text-white mt-0.5">PHP 8.3-FPM</div>
                </div>
                <div>
                  <div class="text-[10px] font-mono text-zinc-400 uppercase">CPU Load</div>
                  <div id="drawer-app-cpu" class="text-xs font-bold font-mono text-emerald-500 mt-0.5">1.2%</div>
                </div>
              </div>

              <!-- Terminal Live Logs Window -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <i data-lucide="terminal" class="w-4 h-4 text-zinc-400"></i>
                    <span class="text-xs font-mono font-semibold uppercase text-zinc-700 dark:text-zinc-300">Daemon Log Output</span>
                  </div>
                  <span class="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Output
                  </span>
                </div>

                <div class="rounded-lg bg-black border border-zinc-800 p-3.5 font-mono text-[11px] leading-relaxed text-zinc-300 space-y-1.5 overflow-x-auto max-h-56 custom-scrollbar">
                  <div class="text-zinc-500">[17:40:12] [SYSTEM] Process spawned on PID 19284</div>
                  <div class="text-zinc-400">[17:40:15] [INFO] Database pool connected: mysql://127.0.0.1:3306</div>
                  <div class="text-emerald-400">[17:41:04] [HTTP] GET / 200 OK - 14ms (1.4MB transferred)</div>
                  <div class="text-emerald-400">[17:42:22] [HTTP] GET /wp-json/wp/v2/products 200 OK - 22ms</div>
                  <div class="text-zinc-400">[17:43:10] [SYSTEM] OPcache hit rate 99.1%</div>
                  <div class="text-emerald-400">[17:45:00] [HEALTH] Heartbeat nominal. Memory: 280MB</div>
                  <div class="text-amber-400" id="drawer-log-patch">[17:46:18] [NOTICE] Security patch check: 1 update pending</div>
                </div>
              </div>

              <!-- Process Actions -->
              <div>
                <div class="text-xs font-mono font-semibold uppercase text-zinc-700 dark:text-zinc-300 mb-2">Runtime Operations</div>
                <div class="flex items-center gap-2">
                  <button type="button" id="drawer-restart-btn" class="px-3 py-1.5 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-mono text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer">
                    <i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i>
                    <span>Restart Process</span>
                  </button>
                  <button type="button" id="drawer-update-btn" class="px-3 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-xs font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                    <i data-lucide="arrow-up-circle" class="w-3.5 h-3.5"></i>
                    <span>Apply Patch</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end">
            <button type="button" id="drawer-done-btn" class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer">
              Close Details
            </button>
          </div>

        </div>
      </div>
    </div>
  `;
}

function getDeployAppModalHTML() {
  return `
    <div id="deploy-app-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden transition-opacity duration-200">
      <div class="relative w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-5">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white">
              Deploy New Application
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Launch an isolated runtime framework, PM2 service, or CMS instance.
            </p>
          </div>
          <button 
            type="button" 
            id="close-deploy-app-modal-btn"
            class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Form Body -->
        <form id="deploy-app-form" class="space-y-4">
          
          <!-- App Framework -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              FRAMEWORK / RUNTIME
            </label>
            <select 
              id="modal-app-type-select"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
            >
              <option value="wordpress">WordPress (Latest 6.5 - PHP 8.3)</option>
              <option value="nodejs">Node.js 20 LTS (Next.js / PM2 Daemon)</option>
              <option value="laravel">Laravel 10 (PHP 8.2 + Artisan Worker)</option>
              <option value="python">Python 3.11 (Django / WSGI Gunicorn)</option>
            </select>
          </div>

          <!-- App Name -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              APPLICATION NAME
            </label>
            <input 
              type="text" 
              id="modal-app-name-input"
              required
              placeholder="e.g. Acme Online Store"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <!-- Target Domain & Path -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                TARGET DOMAIN
              </label>
              <input 
                type="text" 
                id="modal-app-domain-input"
                required
                value="techflow-media.com"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                INSTALL PATH
              </label>
              <input 
                type="text" 
                id="modal-app-path-input"
                value="/"
                placeholder="/"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
          </div>

          <!-- Auto-update setting -->
          <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <i data-lucide="shield" class="w-4 h-4 text-emerald-500"></i>
              <div>
                <div class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Automatic Minor Security Patches</div>
                <div class="text-[11px] text-zinc-400">Apply non-breaking core & vulnerability updates</div>
              </div>
            </div>
            <input type="checkbox" id="modal-app-autoupdate-toggle" checked class="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4 cursor-pointer" />
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-2">
            <button 
              type="button" 
              id="cancel-deploy-app-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Deploy Application
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}

// --- Main Module Renderer ---

export function renderApplicationsHTML() {
  const filteredApps = getFilteredApps();

  return `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            HOSTING / APPLICATIONS
          </div>
          <h1 class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mt-1">
            Managed Applications & Frameworks
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Isolated runtime processes, WordPress core updates, PM2 Node.js clusters, and framework workers.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-deploy-app-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-mono font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Deploy Application</span>
          </button>
        </div>
      </div>

      <!-- 1. Top KPI Metrics -->
      ${getAppsStatsCardsHTML()}

      <!-- 2. Interactive Applications Table -->
      <div id="apps-table-container">
        ${getAppsTableHTML(filteredApps, currentAppTypeFilter, currentAppSearch)}
      </div>

      <!-- 3. Deploy Application Modal -->
      ${getDeployAppModalHTML()}

      <!-- 4. Slide-over App Details & Logs Drawer -->
      ${getAppDetailsDrawerHTML()}

    </div>
  `;
}

// --- Event Handlers & Lifecycle ---

export function setupApplicationsEvents(onNavigate) {
  createIcons({ icons });

  const appsContainer = document.getElementById('apps-table-container');
  const drawer = document.getElementById('app-details-drawer');
  const closeDrawerBtn = document.getElementById('close-app-drawer-btn');
  const drawerDoneBtn = document.getElementById('drawer-done-btn');
  const drawerBackdrop = document.getElementById('app-details-backdrop');

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

  const openAppDrawer = (app) => {
    if (!drawer) return;
    const fwEl = document.getElementById('drawer-app-framework');
    const stEl = document.getElementById('drawer-app-status');
    const nmEl = document.getElementById('drawer-app-name');
    const dmEl = document.getElementById('drawer-app-domain');
    const ramEl = document.getElementById('drawer-app-ram');
    const prEl = document.getElementById('drawer-app-process');
    const cpuEl = document.getElementById('drawer-app-cpu');

    if (fwEl) fwEl.textContent = `${app.typeName} ${app.version}`;
    if (stEl) {
      stEl.textContent = app.status === 'running' ? 'Running' : app.status === 'stopped' ? 'Stopped' : 'Restarting';
      stEl.className = `text-xs font-mono font-semibold ${app.status === 'running' ? 'text-emerald-500' : app.status === 'stopped' ? 'text-rose-500' : 'text-blue-500'}`;
    }
    if (nmEl) nmEl.textContent = app.name;
    if (dmEl) dmEl.textContent = `${app.domain} ${app.path}`;
    if (ramEl) ramEl.textContent = `${app.memoryUsedMB}MB/${app.memoryLimitMB}MB`;
    if (prEl) prEl.textContent = app.runtime;
    if (cpuEl) cpuEl.textContent = app.cpuUsage;

    const drawerRestartBtn = document.getElementById('drawer-restart-btn');
    if (drawerRestartBtn) {
      drawerRestartBtn.onclick = () => {
        app.status = 'restarting';
        refreshAppsTable();
        openAppDrawer(app);
        setTimeout(() => {
          app.status = 'running';
          refreshAppsTable();
          openAppDrawer(app);
        }, 800);
      };
    }

    const drawerUpdateBtn = document.getElementById('drawer-update-btn');
    if (drawerUpdateBtn) {
      if (!app.hasUpdate) {
        drawerUpdateBtn.classList.add('hidden');
      } else {
        drawerUpdateBtn.classList.remove('hidden');
        drawerUpdateBtn.onclick = () => {
          drawerUpdateBtn.textContent = 'Updating...';
          setTimeout(() => {
            app.hasUpdate = false;
            app.updateStatus = 'Up to date';
            refreshAppsTable();
            openAppDrawer(app);
          }, 700);
        };
      }
    }

    drawer.classList.remove('hidden');
    createIcons({ icons });
  };

  const refreshAppsTable = () => {
    if (appsContainer) {
      const filtered = getFilteredApps();
      appsContainer.innerHTML = getAppsTableHTML(filtered, currentAppTypeFilter, currentAppSearch);
      createIcons({ icons });
      attachAppActions();
    }
  };

  const attachAppActions = () => {
    // Type Filter Tabs
    const typeBtns = document.querySelectorAll('.app-type-filter-btn');
    typeBtns.forEach(btn => {
      btn.onclick = () => {
        currentAppTypeFilter = btn.getAttribute('data-app-type') || 'all';
        refreshAppsTable();
      };
    });

    // Search input
    const appSearchInput = document.getElementById('apps-search-input');
    if (appSearchInput) {
      appSearchInput.oninput = (e) => {
        currentAppSearch = e.target.value;
        refreshAppsTable();
      };
    }

    // Details Drawer Trigger
    const detailsBtns = document.querySelectorAll('.app-details-btn');
    detailsBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-app-id');
        const app = appsList.find(a => a.id === id);
        if (app) openAppDrawer(app);
      };
    });

    // Restart worker
    const restartBtns = document.querySelectorAll('.app-restart-btn');
    restartBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-app-id');
        const app = appsList.find(a => a.id === id);
        if (app) {
          app.status = 'restarting';
          refreshAppsTable();
          setTimeout(() => {
            app.status = 'running';
            refreshAppsTable();
          }, 800);
        }
      };
    });

    // Delete app
    const deleteBtns = document.querySelectorAll('.app-delete-btn');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-app-id');
        const app = appsList.find(a => a.id === id);
        if (app && confirm(`Are you sure you want to delete application "${app.name}"?`)) {
          appsList = appsList.filter(a => a.id !== id);
          refreshAppsTable();
        }
      };
    });
  };

  attachAppActions();

  // Modal logic for Deploy App
  const deployModal = document.getElementById('deploy-app-modal');
  const openDeployBtn = document.getElementById('open-deploy-app-btn');
  const closeDeployBtn = document.getElementById('close-deploy-app-modal-btn');
  const cancelDeployBtn = document.getElementById('cancel-deploy-app-btn');
  const deployForm = document.getElementById('deploy-app-form');

  if (openDeployBtn && deployModal) {
    openDeployBtn.onclick = () => deployModal.classList.remove('hidden');
  }

  const closeDeploy = () => {
    if (deployModal) deployModal.classList.add('hidden');
    if (deployForm) deployForm.reset();
  };

  if (closeDeployBtn) closeDeployBtn.onclick = closeDeploy;
  if (cancelDeployBtn) cancelDeployBtn.onclick = closeDeploy;

  if (deployForm) {
    deployForm.onsubmit = (e) => {
      e.preventDefault();
      const framework = document.getElementById('modal-app-type-select')?.value || 'wordpress';
      const name = document.getElementById('modal-app-name-input')?.value.trim();
      const domain = document.getElementById('modal-app-domain-input')?.value.trim() || 'techflow-media.com';
      const path = document.getElementById('modal-app-path-input')?.value.trim() || '/';

      if (!name) return;

      let typeName = 'WordPress';
      let runtime = 'PHP 8.3-FPM';
      let version = '6.5.2';
      let processInfo = 'PHP-FPM Pool';
      if (framework === 'nodejs') {
        typeName = 'Node.js';
        runtime = 'Node.js 20 (PM2)';
        version = '20.11 LTS';
        processInfo = 'PM2 Cluster (Port 3001)';
      } else if (framework === 'laravel') {
        typeName = 'Laravel';
        runtime = 'PHP 8.2 (Swoole)';
        version = '10.4';
        processInfo = 'Artisan Worker';
      } else if (framework === 'python') {
        typeName = 'Django';
        runtime = 'Python 3.11';
        version = '5.0';
        processInfo = 'Gunicorn #05';
      }

      const newApp = {
        id: `app-${Date.now()}`,
        name,
        type: framework,
        typeName,
        version,
        domain,
        path,
        runtime,
        processInfo,
        memoryUsedMB: 120,
        memoryLimitMB: 512,
        cpuUsage: '0.2%',
        updateStatus: 'Up to date',
        hasUpdate: false,
        status: 'running',
        autoUpdate: true,
        createdAt: new Date().toISOString().split('T')[0]
      };

      appsList.unshift(newApp);
      closeDeploy();
      refreshAppsTable();
    };
  }
}

export function cleanupApplications() {
  currentAppTypeFilter = 'all';
  currentAppSearch = '';
}
