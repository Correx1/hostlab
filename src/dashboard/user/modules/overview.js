import { 
  customerOverviewStats, 
  customerSites, 
  customerVPS, 
  customerRecentActivities,
  customerUser
} from '../db.js';

export function renderUserOverview() {
  return `
    <!-- Header: Exact Admin Style -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-2xl font-bold text-zinc-900 dark:text-white font-display tracking-tight">
            Overview
          </h1>
        </div>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Real-time status of your websites, VPS nodes, domains, and mail services.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          type="button" 
          data-route-parent="hosting" 
          class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Deploy Site</span>
        </button>
      </div>
    </div>

    <!-- 4 Stat Cards: Exact Admin Style -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${customerOverviewStats.map(stat => `
        <div 
          class="overview-stat-card p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm cursor-pointer group"
          data-route-parent="${stat.target.parent}"
        >
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
              <i data-lucide="${stat.icon}" class="w-5 h-5"></i>
            </div>
          </div>

          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              ${stat.label}
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${stat.value}
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 dark:text-zinc-500 truncate">
              ${stat.subtext}
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Primary Grid: Exact Admin 2-to-1 Column Proportions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Left 2 Cols: Active Infrastructure List -->
      <div class="lg:col-span-2 p-5 sm:p-6 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-3 mb-4">
            <div class="flex items-center gap-2">
              <h3 class="text-base font-semibold text-zinc-900 dark:text-white font-display">
                Active Services
              </h3>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                ${customerSites.length + customerVPS.length} Total
              </span>
            </div>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
            Hosted applications, WordPress deployments, and managed VPS instances.
          </p>

          <div class="space-y-2.5">
            <!-- Websites -->
            ${customerSites.map(site => `
              <div class="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex items-center justify-between gap-3 group">
                <div class="flex items-start gap-3 min-w-0">
                  <div class="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 shrink-0 mt-0.5">
                    <i data-lucide="globe" class="w-4 h-4"></i>
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">${site.domain}</span>
                      <span class="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        ${site.status}
                      </span>
                    </div>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-mono">
                      ${site.type} • IP: ${site.ip} • Bandwidth: ${site.bandwidthUsed}
                    </p>
                  </div>
                </div>

                <button 
                  type="button" 
                  data-route-parent="hosting"
                  class="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                >
                  <span>Manage</span>
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform"></i>
                </button>
              </div>
            `).join('')}

            <!-- VPS Instances -->
            ${customerVPS.map(vps => `
              <div class="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex items-center justify-between gap-3 group">
                <div class="flex items-start gap-3 min-w-0">
                  <div class="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 shrink-0 mt-0.5">
                    <i data-lucide="server" class="w-4 h-4"></i>
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono truncate">${vps.name}</span>
                      <span class="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        ${vps.status}
                      </span>
                    </div>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-mono">
                      ${vps.specs} • IP: ${vps.ip} • Region: ${vps.region}
                    </p>
                  </div>
                </div>

                <button 
                  type="button" 
                  data-route-parent="vps"
                  class="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                >
                  <span>Console</span>
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform"></i>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right 1 Col: Platform Activity & Support Snapshot -->
      <div class="space-y-6">
        
        <!-- Activity Card: Exact Admin Style -->
        <div class="p-5 sm:p-6 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-center justify-between gap-2 mb-1">
            <h3 class="text-base font-semibold text-zinc-900 dark:text-white font-display">
              Recent Activity
            </h3>
            <span class="text-[11px] font-mono text-zinc-400">Live</span>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
            Recent commits, automated backups, and renewals.
          </p>

          <div class="space-y-3">
            ${customerRecentActivities.map(act => `
              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/60 dark:border-zinc-800/60">
                <div class="flex items-start gap-2.5">
                  <div class="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0 mt-0.5">
                    <i data-lucide="${act.icon}" class="w-3.5 h-3.5"></i>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">${act.title}</span>
                      <span class="text-[10px] font-mono text-zinc-400 shrink-0">${act.time}</span>
                    </div>
                    <p class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      ${act.desc}
                    </p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}
