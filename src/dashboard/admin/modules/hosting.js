import { createIcons, icons } from 'lucide';

/**
 * Hostlab Web Hosting Module
 * Dedicated module for Web Hosting accounts, disk quotas, nodes, and container provisioning.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const hostingStats = {
  totalSites: 1284,
  activeSites: 1240,
  suspendedSites: 32,
  provisioningSites: 12,
  diskUsed: '4.8 TB',
  diskTotal: '12.0 TB',
  diskPercentage: '40%',
  bandwidthUsed: '68.4 TB',
  bandwidthTotal: '200 TB',
  bandwidthPercentage: '34.2%',
  sslCoverage: '99.8%'
};

export const hostingPlans = [
  { id: 'starter', name: 'Starter Cloud', price: '$4.99/mo', disk: '15 GB SSD', bandwidth: '200 GB' },
  { id: 'business', name: 'Business Pro', price: '$12.99/mo', disk: '50 GB NVMe', bandwidth: '1,000 GB' },
  { id: 'agency', name: 'Agency Unlimited', price: '$29.99/mo', disk: '150 GB NVMe', bandwidth: 'Unlimited' }
];

export const serverNodes = [
  { id: 'all', name: 'All Server Nodes' },
  { id: 'fra-node-01', name: 'fra-node-01 (Frankfurt)', ip: '185.190.140.22' },
  { id: 'iad-node-03', name: 'iad-node-03 (Virginia)', ip: '144.126.241.80' },
  { id: 'pdx-node-02', name: 'pdx-node-02 (Oregon)', ip: '198.51.100.45' },
  { id: 'lon-node-01', name: 'lon-node-01 (London)', ip: '178.62.204.11' }
];

export const initialHostingSites = [
  {
    id: 'site-101',
    domain: 'techflow-media.com',
    client: 'Sarah Jenkins',
    email: 'sarah@techflow.io',
    plan: 'Business Pro',
    server: 'fra-node-01',
    serverIp: '185.190.140.22',
    runtime: 'PHP 8.3',
    appType: 'WordPress 6.5',
    diskUsedMB: 14200,
    diskLimitMB: 50000,
    bandwidthGB: 284,
    bandwidthLimitGB: 1000,
    sslStatus: 'Active (Let’s Encrypt)',
    sslExpires: 'in 68 days',
    status: 'active',
    createdAt: '2024-03-12'
  },
  {
    id: 'site-102',
    domain: 'apexstudios.design',
    client: 'David Vance',
    email: 'david@apexstudios.design',
    plan: 'Agency Unlimited',
    server: 'iad-node-03',
    serverIp: '144.126.241.80',
    runtime: 'Node.js 20',
    appType: 'Next.js SSR',
    diskUsedMB: 28600,
    diskLimitMB: 150000,
    bandwidthGB: 840,
    bandwidthLimitGB: 2500,
    sslStatus: 'Active (Cloudflare)',
    sslExpires: 'Auto-renew',
    status: 'active',
    createdAt: '2024-01-20'
  },
  {
    id: 'site-103',
    domain: 'greenleaf-organics.co.uk',
    client: 'Emma Watson',
    email: 'emma@greenleaforganics.co.uk',
    plan: 'Business Pro',
    server: 'lon-node-01',
    serverIp: '178.62.204.11',
    runtime: 'PHP 8.2',
    appType: 'WooCommerce',
    diskUsedMB: 48900,
    diskLimitMB: 50000,
    bandwidthGB: 920,
    bandwidthLimitGB: 1000,
    sslStatus: 'Active (Let’s Encrypt)',
    sslExpires: 'in 14 days',
    status: 'active',
    createdAt: '2023-11-04'
  },
  {
    id: 'site-104',
    domain: 'cryptotrack-api.io',
    client: 'Alex Rivera',
    email: 'alex@cryptotrack.net',
    plan: 'Agency Unlimited',
    server: 'fra-node-01',
    serverIp: '185.190.140.22',
    runtime: 'Python 3.11',
    appType: 'FastAPI Microservice',
    diskUsedMB: 8400,
    diskLimitMB: 150000,
    bandwidthGB: 1850,
    bandwidthLimitGB: 2500,
    sslStatus: 'Active (ZeroSSL)',
    sslExpires: 'in 120 days',
    status: 'active',
    createdAt: '2024-02-18'
  },
  {
    id: 'site-105',
    domain: 'pulsecreative.de',
    client: 'Felix Weber',
    email: 'felix@pulsecreative.de',
    plan: 'Starter Cloud',
    server: 'fra-node-01',
    serverIp: '185.190.140.22',
    runtime: 'PHP 8.3',
    appType: 'Laravel 10',
    diskUsedMB: 14800,
    diskLimitMB: 15000,
    bandwidthGB: 198,
    bandwidthLimitGB: 200,
    sslStatus: 'Active (Let’s Encrypt)',
    sslExpires: 'in 4 days',
    status: 'suspended',
    suspendedReason: 'Disk Quota Exceeded (98.7% full)',
    createdAt: '2023-12-01'
  },
  {
    id: 'site-106',
    domain: 'nordiclogistics.se',
    client: 'Karin Larsson',
    email: 'karin@nordiclogistics.se',
    plan: 'Business Pro',
    server: 'lon-node-01',
    serverIp: '178.62.204.11',
    runtime: 'PHP 8.2',
    appType: 'WordPress Multi-site',
    diskUsedMB: 18200,
    diskLimitMB: 50000,
    bandwidthGB: 340,
    bandwidthLimitGB: 1000,
    sslStatus: 'Active (Let’s Encrypt)',
    sslExpires: 'in 82 days',
    status: 'active',
    createdAt: '2024-02-01'
  },
  {
    id: 'site-107',
    domain: 'aurora-fashion.com',
    client: 'Chloë Dupuis',
    email: 'chloe@aurorafashion.fr',
    plan: 'Business Pro',
    server: 'pdx-node-02',
    serverIp: '198.51.100.45',
    runtime: 'Node.js 20',
    appType: 'Shopify Headless Storefront',
    diskUsedMB: 4200,
    diskLimitMB: 50000,
    bandwidthGB: 112,
    bandwidthLimitGB: 1000,
    sslStatus: 'Pending Verification',
    sslExpires: 'DNS Pending',
    status: 'provisioning',
    createdAt: '2024-05-14'
  },
  {
    id: 'site-108',
    domain: 'zenith-consulting.net',
    client: 'Patrick Stewart',
    email: 'patrick@zenithgroup.net',
    plan: 'Starter Cloud',
    server: 'lon-node-01',
    serverIp: '178.62.204.11',
    runtime: 'PHP 8.1',
    appType: 'HTML5 Static',
    diskUsedMB: 1200,
    diskLimitMB: 15000,
    bandwidthGB: 18,
    bandwidthLimitGB: 200,
    sslStatus: 'Active (Let’s Encrypt)',
    sslExpires: 'in 30 days',
    status: 'suspended',
    suspendedReason: 'Account Billing Overdue (14 days)',
    createdAt: '2023-09-19'
  }
];

// In-memory state for sites
let sitesList = [...initialHostingSites];
let currentFilter = 'all';
let currentSearch = '';
let currentNode = 'all';

function getFilteredSites() {
  return sitesList.filter(site => {
    if (currentFilter !== 'all' && site.status !== currentFilter) return false;
    if (currentNode !== 'all' && site.server !== currentNode) return false;
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      return (
        site.domain.toLowerCase().includes(q) ||
        site.client.toLowerCase().includes(q) ||
        site.email.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

// ==========================================
// 2. WEB HOSTING VIEWS & COMPONENTS
// ==========================================

function getHostingStatsCardsHTML() {
  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Card 1: Total Sites -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="layers" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ${hostingStats.activeSites} Active
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Total Web Sites
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${hostingStats.totalSites.toLocaleString()}
            </span>
            <span class="text-xs font-mono font-medium text-amber-600 dark:text-amber-400">
              ${hostingStats.suspendedSites} Suspended
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            ${hostingStats.provisioningSites} currently provisioning
          </div>
        </div>
      </div>

      <!-- Card 2: Disk Quota -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="hard-drive" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            ${hostingStats.diskPercentage} Used
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Storage Pool (NVMe/SSD)
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${hostingStats.diskUsed}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              / ${hostingStats.diskTotal}
            </span>
          </div>
          <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div class="bg-blue-500 h-full rounded-full" style="width: ${hostingStats.diskPercentage}"></div>
          </div>
        </div>
      </div>

      <!-- Card 3: Bandwidth -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="activity" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            ${hostingStats.bandwidthPercentage}
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Monthly Bandwidth
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${hostingStats.bandwidthUsed}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              / ${hostingStats.bandwidthTotal}
            </span>
          </div>
          <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div class="bg-purple-500 h-full rounded-full" style="width: ${hostingStats.bandwidthPercentage}"></div>
          </div>
        </div>
      </div>

      <!-- Card 4: SSL Coverage -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Auto-Renew
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            SSL Encryption Coverage
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${hostingStats.sslCoverage}
            </span>
            <span class="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
              Let's Encrypt
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            1,281 sites secured automatically
          </div>
        </div>
      </div>

    </div>
  `;
}

function getHostingSitesTableHTML(sites, curFilter, curSearch, curNode) {
  return `
    <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
      
      <!-- Table Controls Bar -->
      <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Status Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button 
            type="button" 
            data-filter="all"
            class="site-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            All Sites (${sitesList.length})
          </button>
          <button 
            type="button" 
            data-filter="active"
            class="site-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'active' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Active
          </button>
          <button 
            type="button" 
            data-filter="suspended"
            class="site-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'suspended' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Suspended
          </button>
          <button 
            type="button" 
            data-filter="provisioning"
            class="site-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'provisioning' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Provisioning
          </button>
        </div>

        <!-- Search & Node Filter -->
        <div class="flex items-center gap-3">
          <div class="relative flex-1 sm:w-60">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="sites-search-input"
              value="${curSearch}"
              placeholder="Search domain, client..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <select 
            id="sites-node-select"
            class="px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-zinc-500 font-mono"
          >
            ${serverNodes.map(node => `
              <option value="${node.id}" ${curNode === node.id ? 'selected' : ''}>
                ${node.name}
              </option>
            `).join('')}
          </select>
        </div>

      </div>

      <!-- Table Content -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <th class="py-3 px-4 sm:px-6">Domain & SSL</th>
              <th class="py-3 px-4">Client / Owner</th>
              <th class="py-3 px-4">Plan & Server</th>
              <th class="py-3 px-4">Runtime & App</th>
              <th class="py-3 px-4">Storage (NVMe)</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
            ${sites.length === 0 ? `
              <tr>
                <td colspan="7" class="py-12 text-center text-zinc-500">
                  <div class="flex flex-col items-center justify-center">
                    <i data-lucide="layers" class="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-2"></i>
                    <p class="text-sm font-medium text-zinc-900 dark:text-white">No hosting sites found</p>
                    <p class="text-xs text-zinc-400 mt-1">Try adjusting your filters or search query.</p>
                  </div>
                </td>
              </tr>
            ` : sites.map(site => {
              const diskUsedGB = (site.diskUsedMB / 1024).toFixed(1);
              const diskLimitGB = (site.diskLimitMB / 1024).toFixed(0);

              let statusBadge = '';
              if (site.status === 'active') {
                statusBadge = `<span class="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400">Active</span>`;
              } else if (site.status === 'suspended') {
                statusBadge = `<span class="text-xs font-mono font-semibold text-rose-500 dark:text-rose-400" title="${site.suspendedReason || 'Suspended'}">Suspended</span>`;
              } else {
                statusBadge = `<span class="text-xs font-mono font-semibold text-blue-500 dark:text-blue-400">Provisioning</span>`;
              }

              return `
                <tr class="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Domain & SSL -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="flex items-center gap-2">
                      <a href="https://${site.domain}" target="_blank" rel="noopener noreferrer" class="font-medium font-mono text-zinc-900 dark:text-white hover:underline flex items-center gap-1">
                        <span>${site.domain}</span>
                        <i data-lucide="external-link" class="w-3 h-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </a>
                    </div>
                    <div class="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-zinc-400">
                      <i data-lucide="shield-check" class="w-3 h-3 ${site.sslStatus.includes('Active') ? 'text-emerald-500' : 'text-amber-500'}"></i>
                      <span>${site.sslStatus}</span>
                    </div>
                  </td>

                  <!-- Client / Owner -->
                  <td class="py-3.5 px-4">
                    <div class="font-medium text-zinc-900 dark:text-zinc-100">
                      ${site.client}
                    </div>
                    <div class="text-[11px] text-zinc-400 font-mono mt-0.5 truncate max-w-[160px]">
                      ${site.email}
                    </div>
                  </td>

                  <!-- Plan & Server -->
                  <td class="py-3.5 px-4">
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                      ${site.plan}
                    </span>
                    <div class="text-[11px] font-mono text-zinc-400 mt-1 flex items-center gap-1">
                      <span>${site.server}</span>
                    </div>
                  </td>

                  <!-- Runtime & App -->
                  <td class="py-3.5 px-4">
                    <div class="font-mono text-xs text-zinc-800 dark:text-zinc-200">
                      ${site.runtime}
                    </div>
                    <div class="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-1">
                      <i data-lucide="box" class="w-3 h-3 text-zinc-400"></i>
                      <span>${site.appType}</span>
                    </div>
                  </td>

                  <!-- Storage (Numbers Only) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    <span class="font-semibold text-zinc-900 dark:text-zinc-100">${diskUsedGB}GB</span><span class="text-zinc-400">/${diskLimitGB}GB</span>
                  </td>

                  <!-- Status (Text Only, Colored) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${statusBadge}
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <button 
                        type="button" 
                        class="site-sso-btn px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        data-site-id="${site.id}"
                        title="Manage Site & Control Panel Login"
                      >
                        Manage Site
                      </button>

                      <button 
                        type="button" 
                        class="site-action-btn p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        data-site-id="${site.id}"
                        data-action="toggle-status"
                        title="${site.status === 'active' ? 'Suspend Account' : 'Unsuspend Account'}"
                      >
                        <i data-lucide="${site.status === 'active' ? 'pause-circle' : 'play-circle'}" class="w-4 h-4"></i>
                      </button>

                      <button 
                        type="button" 
                        class="site-delete-btn p-1 rounded hover:bg-rose-500/10 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        data-site-id="${site.id}"
                        data-action="delete"
                        title="Terminate Site"
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
          Showing <span class="text-zinc-900 dark:text-white font-semibold">${sites.length}</span> of 1,284 accounts
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

function getAddSiteModalHTML() {
  return `
    <div id="add-site-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden transition-opacity duration-200">
      <div class="relative w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-5">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white">
              Provision New Web Site
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Deploy a new shared hosting container with automated SSL and runtime configuration.
            </p>
          </div>
          <button 
            type="button" 
            id="close-add-site-modal-btn"
            class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Form Body -->
        <form id="add-site-form" class="space-y-4">
          
          <!-- Domain Name -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              PRIMARY DOMAIN
            </label>
            <input 
              type="text" 
              id="modal-domain-input"
              required
              placeholder="e.g. clientsite.com"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <!-- Client Info -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                CLIENT / OWNER
              </label>
              <input 
                type="text" 
                id="modal-client-name"
                required
                placeholder="Jane Doe"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                CLIENT EMAIL
              </label>
              <input 
                type="email" 
                id="modal-client-email"
                required
                placeholder="jane@example.com"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
          </div>

          <!-- Plan Selection -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              HOSTING PACKAGE PLAN
            </label>
            <select 
              id="modal-plan-select"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
            >
              ${hostingPlans.map(plan => `
                <option value="${plan.name}">
                  ${plan.name} (${plan.price}) - ${plan.disk} / ${plan.bandwidth}
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Server Node & Runtime -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                DEPLOYMENT NODE
              </label>
              <select 
                id="modal-server-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                ${serverNodes.filter(n => n.id !== 'all').map(node => `
                  <option value="${node.id}">
                    ${node.name}
                  </option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                APP RUNTIME TEMPLATE
              </label>
              <select 
                id="modal-runtime-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                <option value="WordPress 6.5 (PHP 8.3)">WordPress 6.5 (PHP 8.3)</option>
                <option value="PHP 8.3 Clean Container">PHP 8.3 Clean Container</option>
                <option value="PHP 8.2 + Laravel">PHP 8.2 + Laravel 10</option>
                <option value="Node.js 20 LTS SSR">Node.js 20 LTS SSR</option>
                <option value="Static HTML5 / JAMstack">Static HTML5 / JAMstack</option>
              </select>
            </div>
          </div>

          <!-- SSL Toggle -->
          <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i>
              <div>
                <div class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Auto-issue Free Let's Encrypt SSL</div>
                <div class="text-[11px] text-zinc-400">Automatic DNS validation & 90-day renewal</div>
              </div>
            </div>
            <input type="checkbox" id="modal-ssl-toggle" checked class="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4 cursor-pointer" />
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-2">
            <button 
              type="button" 
              id="cancel-add-site-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Provision Site
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}

// ==========================================
// 3. MAIN ORCHESTRATOR & EXPORT
// ==========================================

export function renderHostingHTML() {
  const filteredSites = getFilteredSites();

  return `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            HOSTING / WEB HOSTING
          </div>
          <h1 class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mt-1">
            Web Hosting Accounts
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Managed shared hosting containers, PHP runtime isolation, storage quotas, and SSL certs.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-add-site-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-mono font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Add Hosting Site</span>
          </button>
        </div>
      </div>

      <!-- 1. Top KPI Resource Metrics -->
      ${getHostingStatsCardsHTML()}

      <!-- 2. Interactive Data Table -->
      <div id="hosting-table-container">
        ${getHostingSitesTableHTML(filteredSites, currentFilter, currentSearch, currentNode)}
      </div>

      <!-- 3. Slide-over / Modal for Adding Site -->
      ${getAddSiteModalHTML()}

    </div>
  `;
}

// ==========================================
// 4. EVENT BINDINGS & LIFECYCLE
// ==========================================

export function setupHostingEvents(onNavigate) {
  createIcons({ icons });

  const container = document.getElementById('hosting-table-container');

  const refreshTable = () => {
    if (container) {
      const filtered = getFilteredSites();
      container.innerHTML = getHostingSitesTableHTML(filtered, currentFilter, currentSearch, currentNode);
      createIcons({ icons });
      attachTableEvents();
    }
  };

  const attachTableEvents = () => {
    // Filter Tabs
    const filterBtns = document.querySelectorAll('.site-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        currentFilter = btn.getAttribute('data-filter') || 'all';
        refreshTable();
      };
    });

    // Search Input
    const searchInput = document.getElementById('sites-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        currentSearch = e.target.value;
        refreshTable();
      };
    }

    // Node Select
    const nodeSelect = document.getElementById('sites-node-select');
    if (nodeSelect) {
      nodeSelect.onchange = (e) => {
        currentNode = e.target.value;
        refreshTable();
      };
    }

    // Manage site buttons
    const ssoBtns = document.querySelectorAll('.site-sso-btn');
    ssoBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-site-id');
        const site = sitesList.find(s => s.id === id);
        if (site) {
          // Open details or simulated panel session
          console.log(`Managing site ${site.domain}`);
        }
      };
    });

    // Toggle status (Active / Suspended)
    const actionBtns = document.querySelectorAll('.site-action-btn');
    actionBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-site-id');
        const site = sitesList.find(s => s.id === id);
        if (site) {
          site.status = site.status === 'active' ? 'suspended' : 'active';
          if (site.status === 'suspended') {
            site.suspendedReason = 'Manually suspended by Administrator';
          }
          refreshTable();
        }
      };
    });

    // Delete site
    const deleteBtns = document.querySelectorAll('.site-delete-btn');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-site-id');
        const site = sitesList.find(s => s.id === id);
        if (site && confirm(`Are you sure you want to terminate hosting account for ${site.domain}? This cannot be undone.`)) {
          sitesList = sitesList.filter(s => s.id !== id);
          refreshTable();
        }
      };
    });
  };

  attachTableEvents();

  // Modal Open / Close logic
  const modal = document.getElementById('add-site-modal');
  const openModalBtn = document.getElementById('open-add-site-btn');
  const closeModalBtn = document.getElementById('close-add-site-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-add-site-btn');
  const addForm = document.getElementById('add-site-form');

  if (openModalBtn && modal) {
    openModalBtn.onclick = () => {
      modal.classList.remove('hidden');
    };
  }

  const closeModal = () => {
    if (modal) modal.classList.add('hidden');
    if (addForm) addForm.reset();
  };

  if (closeModalBtn) closeModalBtn.onclick = closeModal;
  if (cancelModalBtn) cancelModalBtn.onclick = closeModal;

  // Form Submit
  if (addForm) {
    addForm.onsubmit = (e) => {
      e.preventDefault();
      const domain = document.getElementById('modal-domain-input')?.value.trim();
      const client = document.getElementById('modal-client-name')?.value.trim();
      const email = document.getElementById('modal-client-email')?.value.trim();
      const plan = document.getElementById('modal-plan-select')?.value || 'Business Pro';
      const server = document.getElementById('modal-server-select')?.value || 'fra-node-01';
      const runtime = document.getElementById('modal-runtime-select')?.value || 'PHP 8.3 Clean Container';

      if (!domain || !client || !email) return;

      const newSite = {
        id: `site-${Date.now()}`,
        domain,
        client,
        email,
        plan,
        server,
        serverIp: '185.190.140.22',
        runtime: runtime.split(' ')[0],
        appType: runtime,
        diskUsedMB: 120,
        diskLimitMB: plan.includes('Starter') ? 15000 : plan.includes('Business') ? 50000 : 150000,
        bandwidthGB: 2,
        bandwidthLimitGB: plan.includes('Starter') ? 200 : 1000,
        sslStatus: 'Active (Let’s Encrypt)',
        sslExpires: 'in 90 days',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };

      sitesList.unshift(newSite);
      closeModal();
      refreshTable();
    };
  }
}

export function cleanupHosting() {
  currentFilter = 'all';
  currentSearch = '';
  currentNode = 'all';
}
