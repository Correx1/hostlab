import { customerSites } from '../db.js';
import { createIcons, icons } from 'lucide';

// Module state
let activeFilter = 'all';
let searchQuery = '';
let selectedSite = null;
let isDeployModalOpen = false;
let showPassword = false;
let actionFeedback = null; // message notification banner in drawer

export function renderUserHosting() {
  const filteredSites = customerSites.filter(site => {
    const matchesFilter = activeFilter === 'all' || site.status.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      site.domain.toLowerCase().includes(searchQuery.toLowerCase()) || 
      site.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return `
    <div class="space-y-6">
      
      <!-- 1. Header: Exact Admin Style -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold text-zinc-900 dark:text-white font-display tracking-tight">
              Web Hosting
            </h1>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your websites, SFTP credentials, databases, and automated backups.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="deploy-site-btn"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Deploy Site</span>
          </button>
        </div>
      </div>

      <!-- 2. Stat Cards: Exact Admin Style -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Total Sites -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="globe" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Hosted Websites
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${customerSites.length}
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              All 3 sites active &amp; monitored
            </div>
          </div>
        </div>

        <!-- Storage Used -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="hard-drive" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              NVMe Storage
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                48.4 GB
              </span>
              <span class="text-xs font-mono text-zinc-500">/ 160 GB</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              30% allocation quota
            </div>
          </div>
        </div>

        <!-- Bandwidth -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="activity" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Monthly Bandwidth
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                142.8 GB
              </span>
              <span class="text-xs font-mono text-zinc-500">/ 1,000 GB</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              FastCGI edge cache enabled
            </div>
          </div>
        </div>

        <!-- SSL Coverage -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              SSL Certificates
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                3 / 3
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Auto-renewing Let's Encrypt
            </div>
          </div>
        </div>

      </div>

      <!-- 3. Sites Table: Exact Admin Style -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
        
        <!-- Controls Bar -->
        <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <!-- Filter Tabs -->
          <div class="flex items-center gap-1.5">
            <button 
              type="button" 
              data-site-filter="all"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
            >
              All Sites (${customerSites.length})
            </button>
            <button 
              type="button" 
              data-site-filter="active"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === 'active' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
            >
              Active (${customerSites.filter(s => s.status === 'Active').length})
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="user-sites-search"
              value="${searchQuery}"
              placeholder="Search domain or runtime..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-sans"
            />
          </div>

        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                <th class="py-3 px-4 sm:px-6">Website / Domain</th>
                <th class="py-3 px-4">Runtime &amp; Application</th>
                <th class="py-3 px-4">Server Node</th>
                <th class="py-3 px-4">Storage</th>
                <th class="py-3 px-4">Bandwidth</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
              ${filteredSites.length === 0 ? `
                <tr>
                  <td colspan="7" class="py-12 text-center text-zinc-500">
                    No websites found matching your search.
                  </td>
                </tr>
              ` : filteredSites.map(site => `
                <tr class="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Domain & SSL -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="flex items-center gap-2.5">
                      <div class="font-semibold text-zinc-900 dark:text-white text-xs">
                        ${site.domain}
                      </div>
                      <a 
                        href="https://${site.domain}" 
                        target="_blank" 
                        class="text-zinc-400 hover:text-white transition-colors"
                        title="Visit site"
                      >
                        <i data-lucide="external-link" class="w-3 h-3"></i>
                      </a>
                    </div>
                    <div class="text-[11px] font-mono text-zinc-400 mt-0.5">
                      ${site.ssl}
                    </div>
                  </td>

                  <!-- Runtime -->
                  <td class="py-3.5 px-4">
                    <div class="font-medium text-zinc-800 dark:text-zinc-200">
                      ${site.type}
                    </div>
                    <div class="text-[11px] font-mono text-zinc-400 mt-0.5">
                      ${site.phpVersion ? `PHP ${site.phpVersion}` : site.runtime || 'Containerized'}
                    </div>
                  </td>

                  <!-- Server -->
                  <td class="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                    <div>${site.ip}</div>
                    <div class="text-[11px] text-zinc-500">${site.serverLocation || 'eu-central-fra'}</div>
                  </td>

                  <!-- Storage -->
                  <td class="py-3.5 px-4 font-mono text-zinc-700 dark:text-zinc-300">
                    ${site.storageUsed}
                  </td>

                  <!-- Bandwidth -->
                  <td class="py-3.5 px-4 font-mono text-zinc-700 dark:text-zinc-300">
                    ${site.bandwidthUsed}
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ${site.status}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <div class="inline-flex items-center gap-2">
                      <button 
                        type="button" 
                        data-manage-site="${site.id}"
                        class="px-3 py-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                      >
                        Manage →
                      </button>
                    </div>
                  </td>

                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

      </div>

      <!-- 4. Real Web Hosting Management Drawer (Closes on outside click) -->
      ${selectedSite ? `
        <!-- Backdrop Overlay -->
        <div 
          id="site-drawer-backdrop"
          class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        ></div>

        <!-- Drawer Content Shell -->
        <div 
          id="site-drawer"
          class="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between shadow-2xl text-white select-none overflow-hidden"
        >
          <!-- Top Section -->
          <div class="flex-1 flex flex-col min-h-0">
            
            <!-- Drawer Header -->
            <div class="h-20 px-6 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-black">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <i data-lucide="globe" class="w-5 h-5"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold font-display text-white tracking-tight">${selectedSite.domain}</h3>
                  <div class="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-0.5">
                    <span class="text-emerald-400 font-semibold">● ${selectedSite.status}</span>
                    <span>•</span>
                    <span>${selectedSite.type}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <a 
                  href="https://${selectedSite.domain}" 
                  target="_blank" 
                  class="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 transition-colors cursor-pointer"
                  title="Visit Website"
                >
                  <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
                <button 
                  id="close-site-drawer-btn"
                  type="button" 
                  class="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 transition-colors cursor-pointer"
                  aria-label="Close drawer"
                >
                  <i data-lucide="x" class="w-5 h-5"></i>
                </button>
              </div>
            </div>

            <!-- Notification Feedback Banner (If any action triggered) -->
            ${actionFeedback ? `
              <div class="px-6 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center justify-between">
                <span>✓ ${actionFeedback}</span>
                <button id="dismiss-feedback-btn" class="text-emerald-500 hover:text-emerald-300">
                  <i data-lucide="x" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            ` : ''}

            <!-- Scrollable Content Body -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-xs font-sans">
              
              <!-- Quick Client Actions -->
              <div class="grid grid-cols-2 gap-3">
                ${selectedSite.type?.toLowerCase().includes('wordpress') ? `
                  <a 
                    href="https://${selectedSite.domain}/wp-admin" 
                    target="_blank"
                    class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 font-medium text-white transition-colors cursor-pointer"
                  >
                    <i data-lucide="layout-dashboard" class="w-4 h-4 text-zinc-400"></i>
                    <span>WP Admin ↗</span>
                  </a>
                ` : `
                  <a 
                    href="https://${selectedSite.domain}" 
                    target="_blank"
                    class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 font-medium text-white transition-colors cursor-pointer"
                  >
                    <i data-lucide="external-link" class="w-4 h-4 text-zinc-400"></i>
                    <span>Visit Site ↗</span>
                  </a>
                `}
                <a 
                  href="${selectedSite.database?.phpMyAdminUrl || 'https://pma.hostlab.cloud'}" 
                  target="_blank"
                  class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 font-medium text-white transition-colors cursor-pointer"
                >
                  <i data-lucide="database" class="w-4 h-4 text-zinc-400"></i>
                  <span>phpMyAdmin ↗</span>
                </a>
              </div>

              <!-- 1. SFTP Access Credentials -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="folder-git-2" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      SFTP / File Access
                    </h4>
                  </div>
                  <span class="text-[10px] font-mono text-emerald-400">Port 22</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <span class="text-zinc-500 font-mono text-[11px] block mb-1">Host / Server IP</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 font-mono text-zinc-200">
                      <span>${selectedSite.sftp?.host || selectedSite.ip}</span>
                      <button type="button" data-copy-text="${selectedSite.sftp?.host || selectedSite.ip}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <span class="text-zinc-500 font-mono text-[11px] block mb-1">Username</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 font-mono text-zinc-200">
                      <span>${selectedSite.sftp?.user || 'thorne_user'}</span>
                      <button type="button" data-copy-text="${selectedSite.sftp?.user || 'thorne_user'}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <span class="text-zinc-500 font-mono text-[11px] block mb-1">Password</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 font-mono text-zinc-200">
                      <span>${showPassword ? (selectedSite.sftp?.pass || 'Secret#Password') : '••••••••••••••••'}</span>
                      <div class="flex items-center gap-2">
                        <button type="button" id="toggle-password-btn" class="text-zinc-400 hover:text-white cursor-pointer" title="${showPassword ? 'Hide' : 'Show'}">
                          <i data-lucide="${showPassword ? 'eye-off' : 'eye'}" class="w-3.5 h-3.5"></i>
                        </button>
                        <button type="button" data-copy-text="${selectedSite.sftp?.pass || 'Secret#Password'}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy password">
                          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <span class="text-zinc-500 font-mono text-[11px] block mb-1">Web Root Directory</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 font-mono text-zinc-300 text-[11px]">
                      <span class="truncate">${selectedSite.sftp?.webRoot || '/var/www/' + selectedSite.domain + '/public_html'}</span>
                      <button type="button" data-copy-text="${selectedSite.sftp?.webRoot || '/var/www/' + selectedSite.domain + '/public_html'}" class="copy-btn text-zinc-400 hover:text-white shrink-0 ml-2 cursor-pointer" title="Copy path">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. Database Credentials -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="database" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      MySQL Database
                    </h4>
                  </div>
                  <a 
                    href="${selectedSite.database?.phpMyAdminUrl || 'https://pma.hostlab.cloud'}" 
                    target="_blank"
                    class="text-[11px] font-mono text-zinc-300 hover:text-white inline-flex items-center gap-1 underline"
                  >
                    <span>phpMyAdmin ↗</span>
                  </a>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <span class="text-zinc-500 font-mono text-[11px] block mb-1">Database Name</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 font-mono text-zinc-200">
                      <span>${selectedSite.database?.name || 'app_db'}</span>
                      <button type="button" data-copy-text="${selectedSite.database?.name || 'app_db'}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <span class="text-zinc-500 font-mono text-[11px] block mb-1">Database User</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 font-mono text-zinc-200">
                      <span>${selectedSite.database?.user || 'app_usr'}</span>
                      <button type="button" data-copy-text="${selectedSite.database?.user || 'app_usr'}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <span class="text-zinc-500 font-mono text-[11px] block mb-1">Database Host</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 font-mono text-zinc-200">
                      <span>${selectedSite.database?.host || 'localhost:3306'}</span>
                      <button type="button" data-copy-text="${selectedSite.database?.host || 'localhost:3306'}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 3. Automated Backups -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="archive" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      Backups &amp; Snapshots
                    </h4>
                  </div>
                  <button 
                    type="button" 
                    id="create-instant-backup-btn"
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    <span>Backup Now</span>
                  </button>
                </div>

                <div class="space-y-2.5">
                  ${(selectedSite.backups || []).length === 0 ? `
                    <div class="p-4 text-center text-zinc-500 bg-zinc-950 rounded border border-zinc-800">
                      No backup snapshots created yet.
                    </div>
                  ` : (selectedSite.backups || []).map(bk => `
                    <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
                      <div class="min-w-0 font-mono">
                        <div class="font-semibold text-white truncate text-xs">${bk.name}</div>
                        <div class="text-[11px] text-zinc-500 mt-0.5">${bk.date} • ${bk.size}</div>
                      </div>

                      <div class="flex items-center gap-2 shrink-0">
                        <button 
                          type="button" 
                          data-restore-backup="${bk.id}"
                          class="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors cursor-pointer"
                        >
                          Restore
                        </button>
                        <button 
                          type="button" 
                          data-download-backup="${bk.id}"
                          class="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Download Snapshot"
                        >
                          <i data-lucide="download" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

            </div>

          </div>

          <!-- Drawer Footer -->
          <div class="h-16 px-6 border-t border-zinc-800 flex items-center justify-between shrink-0 bg-black">
            <span class="text-[11px] font-mono text-zinc-500">
              Hostlab Managed Platform
            </span>
            <div class="flex items-center gap-3">
              <a 
                href="https://${selectedSite.domain}" 
                target="_blank" 
                class="px-4 py-2 rounded text-center bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors"
              >
                Visit Site ↗
              </a>
              <button 
                type="button" 
                id="close-site-drawer-footer-btn"
                class="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 5. Deploy New Site Modal (Closes on outside click) -->
      ${isDeployModalOpen ? `
        <!-- Backdrop -->
        <div id="deploy-modal-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"></div>
        
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div id="deploy-modal" class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl text-white space-y-5">
            <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 class="text-base font-bold font-display text-white">Deploy New Website</h3>
              <button id="close-deploy-modal-btn" class="text-zinc-400 hover:text-white cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <form id="deploy-site-form" class="space-y-4 text-xs font-sans">
              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Domain Name</label>
                <input 
                  type="text" 
                  id="deploy-domain-input" 
                  placeholder="e.g. mycompany.com" 
                  required
                  class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono text-xs"
                />
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Application Preset</label>
                <select id="deploy-type-input" class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                  <option value="WordPress Managed">WordPress (Managed + FastCGI)</option>
                  <option value="Node.js Container">Node.js Container (Git Deploy)</option>
                  <option value="PHP 8.3 / Laravel">PHP 8.3 / Laravel Stack</option>
                  <option value="Static HTML">Static HTML / Jamstack</option>
                </select>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Location Node</label>
                <select class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                  <option>Frankfurt FRA-1 (eu-central)</option>
                  <option>US East IAD-1 (us-east)</option>
                  <option>London LON-1 (uk-south)</option>
                </select>
              </div>

              <div class="pt-2 flex items-center justify-end gap-3">
                <button type="button" id="cancel-deploy-btn" class="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer">
                  Deploy Now
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

export function setupHostingEvents(onRerender) {
  createIcons({ icons });

  // Filter tabs
  const filterBtns = document.querySelectorAll('[data-site-filter]');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      activeFilter = btn.getAttribute('data-site-filter');
      onRerender();
    };
  });

  // Search input
  const searchInput = document.getElementById('user-sites-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      onRerender();
      const newInput = document.getElementById('user-sites-search');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    };
  }

  // Manage Site Click -> Open Drawer
  const manageBtns = document.querySelectorAll('[data-manage-site]');
  manageBtns.forEach(btn => {
    btn.onclick = () => {
      const siteId = btn.getAttribute('data-manage-site');
      selectedSite = customerSites.find(s => s.id === siteId) || null;
      actionFeedback = null;
      showPassword = false;
      onRerender();
    };
  });

  // Toggle Password Show/Hide
  const togglePassBtn = document.getElementById('toggle-password-btn');
  if (togglePassBtn) {
    togglePassBtn.onclick = () => {
      showPassword = !showPassword;
      onRerender();
    };
  }

  // Copy buttons
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.onclick = () => {
      const textToCopy = btn.getAttribute('data-copy-text');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        actionFeedback = `Copied "${textToCopy}" to clipboard!`;
        onRerender();
      }
    };
  });

  // Dismiss feedback
  const dismissBtn = document.getElementById('dismiss-feedback-btn');
  if (dismissBtn) {
    dismissBtn.onclick = () => {
      actionFeedback = null;
      onRerender();
    };
  }

  // Create Instant Backup Button
  const createBkBtn = document.getElementById('create-instant-backup-btn');
  if (createBkBtn && selectedSite) {
    createBkBtn.onclick = () => {
      if (!selectedSite.backups) selectedSite.backups = [];
      const newBk = {
        id: `bk_${Date.now()}`,
        name: `manual_snapshot_${new Date().toISOString().slice(0, 10)}.tar.gz`,
        size: selectedSite.storageUsed,
        date: 'Just now',
        type: 'Manual Snapshot'
      };
      selectedSite.backups.unshift(newBk);
      actionFeedback = `Snapshot created: ${newBk.name} (${newBk.size})!`;
      onRerender();
    };
  }

  // Restore Backup Button
  const restoreBtns = document.querySelectorAll('[data-restore-backup]');
  restoreBtns.forEach(btn => {
    btn.onclick = () => {
      const bkId = btn.getAttribute('data-restore-backup');
      const bk = (selectedSite?.backups || []).find(b => b.id === bkId);
      if (bk) {
        actionFeedback = `Site files and database restored from ${bk.name}!`;
        onRerender();
      }
    };
  });

  // Download Backup Button
  const downloadBtns = document.querySelectorAll('[data-download-backup]');
  downloadBtns.forEach(btn => {
    btn.onclick = () => {
      const bkId = btn.getAttribute('data-download-backup');
      const bk = (selectedSite?.backups || []).find(b => b.id === bkId);
      if (bk) {
        actionFeedback = `Preparing download archive for ${bk.name}...`;
        onRerender();
      }
    };
  });

  // Close Site Drawer Click
  const closeDrawerBtn = document.getElementById('close-site-drawer-btn');
  const closeDrawerFooterBtn = document.getElementById('close-site-drawer-footer-btn');
  const drawerBackdrop = document.getElementById('site-drawer-backdrop');

  if (closeDrawerBtn) closeDrawerBtn.onclick = () => { selectedSite = null; actionFeedback = null; onRerender(); };
  if (closeDrawerFooterBtn) closeDrawerFooterBtn.onclick = () => { selectedSite = null; actionFeedback = null; onRerender(); };
  // Close when outside screen is clicked
  if (drawerBackdrop) drawerBackdrop.onclick = () => { selectedSite = null; actionFeedback = null; onRerender(); };

  // Deploy Site Button -> Open Modal
  const deployBtn = document.getElementById('deploy-site-btn');
  if (deployBtn) {
    deployBtn.onclick = () => {
      isDeployModalOpen = true;
      onRerender();
    };
  }

  // Close Deploy Modal Click
  const closeDeployModalBtn = document.getElementById('close-deploy-modal-btn');
  const cancelDeployBtn = document.getElementById('cancel-deploy-btn');
  const deployModalBackdrop = document.getElementById('deploy-modal-backdrop');

  if (closeDeployModalBtn) closeDeployModalBtn.onclick = () => { isDeployModalOpen = false; onRerender(); };
  if (cancelDeployBtn) cancelDeployBtn.onclick = () => { isDeployModalOpen = false; onRerender(); };
  // Close when outside screen is clicked
  if (deployModalBackdrop) deployModalBackdrop.onclick = () => { isDeployModalOpen = false; onRerender(); };

  // Deploy Form Submit
  const deployForm = document.getElementById('deploy-site-form');
  if (deployForm) {
    deployForm.onsubmit = (e) => {
      e.preventDefault();
      const domainInput = document.getElementById('deploy-domain-input');
      const typeInput = document.getElementById('deploy-type-input');

      if (domainInput && domainInput.value.trim()) {
        const domainVal = domainInput.value.trim();
        const newSite = {
          id: `site_${Date.now()}`,
          domain: domainVal,
          type: typeInput ? typeInput.value : 'WordPress Managed',
          status: 'Active',
          ip: '194.38.12.84',
          serverLocation: 'Frankfurt FRA-1',
          ssl: 'Auto-renewing (Let\'s Encrypt)',
          sslValidUntil: 'Jan 15, 2027',
          forceHttps: true,
          bandwidthUsed: '0.1 GB',
          storageUsed: '1.2 GB',
          lastBackup: 'Just now',
          sftp: {
            host: '194.38.12.84',
            port: 22,
            user: domainVal.split('.')[0] + '_usr',
            pass: 'Hostlab#' + Math.floor(1000 + Math.random() * 9000),
            webRoot: '/var/www/' + domainVal + '/public_html'
          },
          database: {
            name: domainVal.split('.')[0] + '_db',
            user: domainVal.split('.')[0] + '_u',
            host: 'localhost:3306',
            phpMyAdminUrl: 'https://pma.hostlab.cloud'
          },
          phpConfig: {
            memoryLimit: '512M',
            maxUpload: '128M',
            maxExecTime: '300s',
            opcache: true
          },
          aliases: [],
          backups: [
            { id: `bk_${Date.now()}`, name: `initial_deploy_${domainVal}.tar.gz`, size: '1.2 GB', date: 'Just now', type: 'Initial Setup' }
          ]
        };
        customerSites.unshift(newSite);
      }

      isDeployModalOpen = false;
      onRerender();
    };
  }
}
