import { customerVPS } from '../db.js';
import { createIcons, icons } from 'lucide';

// Module state
let activeFilter = 'all';
let searchQuery = '';
let selectedVPS = null;
let isDeployModalOpen = false;
let showRootPassword = false;
let actionFeedback = null;
let isVncOpen = false;

export function renderUserVPS() {
  const filteredVPS = customerVPS.filter(server => {
    const matchesFilter = activeFilter === 'all' || server.status.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      server.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.os.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const allCount = customerVPS.length;
  const runningCount = customerVPS.filter(s => s.status.toLowerCase() === 'running').length;
  const stoppedCount = customerVPS.filter(s => s.status.toLowerCase() === 'stopped').length;

  return `
    <div class="space-y-6">
      
      <!-- 1. Header: Exact Admin Style -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold text-zinc-900 dark:text-white font-display tracking-tight">
              Cloud VPS
            </h1>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your virtual private servers, power states, SSH credentials, and snapshots.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="deploy-vps-btn"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Deploy Server</span>
          </button>
        </div>
      </div>

      <!-- 2. Stat Cards: Exact Admin Style -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Total Servers -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="server" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Active Instances
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${customerVPS.length}
              </span>
              <span class="text-xs font-mono text-emerald-500 font-medium">Running</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              KVM Enterprise Virtualization
            </div>
          </div>
        </div>

        <!-- Compute Power -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="cpu" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Compute Capacity
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                6 vCPU
              </span>
              <span class="text-xs font-mono text-zinc-500">Allocated</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              AMD EPYC™ Gen 4 High Frequency
            </div>
          </div>
        </div>

        <!-- Provisioned RAM -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="activity" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Memory Footprint
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                12 GB RAM
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              DDR5 ECC Error-Correcting
            </div>
          </div>
        </div>

        <!-- High-Speed Storage -->
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
                240 GB
              </span>
              <span class="text-xs font-mono text-zinc-500">NVMe SSD</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Ceph Replicated Storage Tier
            </div>
          </div>
        </div>

      </div>

      <!-- 3. VPS Instances Table: Exact Admin Style -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
        
        <!-- Controls Bar -->
        <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <!-- Filter Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button 
              type="button" 
              data-vps-filter="all"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'all' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              All Instances (${allCount})
            </button>
            <button 
              type="button" 
              data-vps-filter="running"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'running' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              Running (${runningCount})
            </button>
            <button 
              type="button" 
              data-vps-filter="stopped"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'stopped' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              Stopped (${stoppedCount})
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="user-vps-search"
              value="${searchQuery}"
              placeholder="Search server, IP, location..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

        </div>

        <!-- Table Data -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                <th class="py-3 px-4 sm:px-6">Server Instance</th>
                <th class="py-3 px-4">Region</th>
                <th class="py-3 px-4">Specifications</th>
                <th class="py-3 px-4">Operating System</th>
                <th class="py-3 px-4">CPU &amp; Memory</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
              ${filteredVPS.length === 0 ? `
                <tr>
                  <td colspan="7" class="py-12 text-center text-zinc-500">
                    No cloud servers found matching your criteria.
                  </td>
                </tr>
              ` : filteredVPS.map(server => `
                <tr class="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Server Name & IP -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="flex items-center gap-2">
                      <div class="font-semibold text-zinc-900 dark:text-white text-xs">
                        ${server.name}
                      </div>
                    </div>
                    <div class="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 mt-0.5">
                      <span>${server.ip}</span>
                      <button 
                        type="button" 
                        data-copy-text="${server.ip}"
                        class="copy-btn hover:text-white transition-colors cursor-pointer"
                        title="Copy IP"
                      >
                        <i data-lucide="copy" class="w-3 h-3"></i>
                      </button>
                    </div>
                  </td>

                  <!-- Region -->
                  <td class="py-3.5 px-4 font-mono text-zinc-700 dark:text-zinc-300">
                    <div class="flex items-center gap-1.5">
                      <span>${server.flag || '🌐'}</span>
                      <span class="truncate">${server.region}</span>
                    </div>
                  </td>

                  <!-- Specs -->
                  <td class="py-3.5 px-4 font-mono text-zinc-700 dark:text-zinc-300">
                    ${server.specs}
                  </td>

                  <!-- OS -->
                  <td class="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                    ${server.os}
                  </td>

                  <!-- Telemetry Mini Bars -->
                  <td class="py-3.5 px-4">
                    <div class="space-y-1.5 w-32 font-mono text-[10px]">
                      <div class="flex items-center justify-between">
                        <span class="text-zinc-500">CPU</span>
                        <span class="text-zinc-300">${server.cpuUsage}%</span>
                      </div>
                      <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                        <div class="bg-emerald-500 h-full rounded-full" style="width: ${server.cpuUsage}%"></div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-zinc-500">RAM</span>
                        <span class="text-zinc-300">${server.ramUsage}%</span>
                      </div>
                      <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                        <div class="bg-blue-500 h-full rounded-full" style="width: ${server.ramUsage}%"></div>
                      </div>
                    </div>
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-mono ${
                      server.status.toLowerCase() === 'running' 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-amber-600 dark:text-amber-400'
                    }">
                      <span class="w-1.5 h-1.5 rounded-full ${
                        server.status.toLowerCase() === 'running' ? 'bg-emerald-500' : 'bg-amber-500'
                      }"></span>
                      ${server.status}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <button 
                      type="button" 
                      data-manage-vps="${server.id}"
                      class="px-3 py-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                    >
                      Manage →
                    </button>
                  </td>

                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

      </div>

      <!-- 4. Client VPS Management Drawer -->
      ${selectedVPS ? `
        <!-- Backdrop Overlay -->
        <div 
          id="vps-drawer-backdrop"
          class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        ></div>

        <!-- Drawer Content Shell -->
        <div 
          id="vps-drawer"
          class="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between shadow-2xl text-white select-none overflow-hidden"
        >
          <!-- Top Section -->
          <div class="flex-1 flex flex-col min-h-0">
            
            <!-- Drawer Header -->
            <div class="h-20 px-6 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-black">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <i data-lucide="server" class="w-5 h-5"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold font-display text-white tracking-tight">${selectedVPS.name}</h3>
                  <div class="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-0.5">
                    <span class="${selectedVPS.status.toLowerCase() === 'running' ? 'text-emerald-400' : 'text-amber-400'} font-semibold">● ${selectedVPS.status}</span>
                    <span>•</span>
                    <span>${selectedVPS.os}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button 
                  id="close-vps-drawer-btn"
                  type="button" 
                  class="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 transition-colors cursor-pointer"
                  aria-label="Close drawer"
                >
                  <i data-lucide="x" class="w-5 h-5"></i>
                </button>
              </div>
            </div>

            <!-- Notification Feedback Banner -->
            ${actionFeedback ? `
              <div class="px-6 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center justify-between">
                <span>✓ ${actionFeedback}</span>
                <button id="dismiss-vps-feedback-btn" class="text-emerald-500 hover:text-emerald-300">
                  <i data-lucide="x" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            ` : ''}

            <!-- Scrollable Content Body -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-xs font-sans">
              
              <!-- Quick Power Actions -->
              <div class="grid grid-cols-3 gap-3">
                <button 
                  type="button" 
                  id="vps-reboot-btn"
                  class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 font-medium text-white transition-colors cursor-pointer"
                >
                  <i data-lucide="rotate-cw" class="w-4 h-4 text-zinc-400"></i>
                  <span>Reboot</span>
                </button>

                <button 
                  type="button" 
                  id="vps-power-toggle-btn"
                  class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 font-medium text-white transition-colors cursor-pointer"
                >
                  <i data-lucide="power" class="w-4 h-4 ${selectedVPS.status.toLowerCase() === 'running' ? 'text-amber-400' : 'text-emerald-400'}"></i>
                  <span>${selectedVPS.status.toLowerCase() === 'running' ? 'Power Off' : 'Start'}</span>
                </button>

                <button 
                  type="button" 
                  id="vps-vnc-btn"
                  class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 font-medium text-white transition-colors cursor-pointer"
                >
                  <i data-lucide="terminal" class="w-4 h-4 text-zinc-400"></i>
                  <span>VNC Console</span>
                </button>
              </div>

              <!-- 1. SSH / Remote Access Credentials -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="terminal" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      SSH Access
                    </h4>
                  </div>
                  <span class="text-[10px] font-mono text-emerald-400">Port ${selectedVPS.sshPort || 22}</span>
                </div>

                <div class="space-y-3 font-mono">
                  <div>
                    <span class="text-zinc-500 text-[11px] block mb-1">One-Click SSH Command</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-200">
                      <span>ssh root@${selectedVPS.ip}</span>
                      <button type="button" data-copy-text="ssh root@${selectedVPS.ip}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy command">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span class="text-zinc-500 text-[11px] block mb-1">Public IPv4</span>
                      <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-200">
                        <span>${selectedVPS.ip}</span>
                        <button type="button" data-copy-text="${selectedVPS.ip}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy IP">
                          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </div>

                    <div>
                      <span class="text-zinc-500 text-[11px] block mb-1">Root Password</span>
                      <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-200">
                        <span>${showRootPassword ? (selectedVPS.rootPassword || 'Root#Secure2026') : '••••••••••••••••'}</span>
                        <div class="flex items-center gap-2">
                          <button type="button" id="toggle-vps-pass-btn" class="text-zinc-400 hover:text-white cursor-pointer" title="${showRootPassword ? 'Hide' : 'Show'}">
                            <i data-lucide="${showRootPassword ? 'eye-off' : 'eye'}" class="w-3.5 h-3.5"></i>
                          </button>
                          <button type="button" data-copy-text="${selectedVPS.rootPassword || 'Root#Secure2026'}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy password">
                            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. Telemetry & Hardware Utilization -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="activity" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      Resource Telemetry
                    </h4>
                  </div>
                  <span class="text-[10px] font-mono text-zinc-400">Uptime: ${selectedVPS.uptime}</span>
                </div>

                <div class="space-y-3 font-mono text-xs">
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="text-zinc-400">vCPU Allocation</span>
                      <span class="text-white">${selectedVPS.cpuUsage}% Utilization</span>
                    </div>
                    <div class="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                      <div class="bg-emerald-500 h-full rounded-full transition-all duration-300" style="width: ${selectedVPS.cpuUsage}%"></div>
                    </div>
                  </div>

                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="text-zinc-400">RAM Allocation</span>
                      <span class="text-white">${selectedVPS.ramUsage}% Used</span>
                    </div>
                    <div class="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                      <div class="bg-blue-500 h-full rounded-full transition-all duration-300" style="width: ${selectedVPS.ramUsage}%"></div>
                    </div>
                  </div>

                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="text-zinc-400">NVMe Disk Allocation</span>
                      <span class="text-white">${selectedVPS.diskUsage}% Used</span>
                    </div>
                    <div class="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                      <div class="bg-purple-500 h-full rounded-full transition-all duration-300" style="width: ${selectedVPS.diskUsage}%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 3. Server Snapshots -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="camera" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      Snapshots &amp; Backups
                    </h4>
                  </div>
                  <button 
                    type="button" 
                    id="create-vps-snapshot-btn"
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    <span>Take Snapshot</span>
                  </button>
                </div>

                <div class="space-y-2.5">
                  ${(selectedVPS.snapshots || []).length === 0 ? `
                    <div class="p-4 text-center text-zinc-500 bg-zinc-950 rounded border border-zinc-800">
                      No snapshots created for this server yet.
                    </div>
                  ` : (selectedVPS.snapshots || []).map(snp => `
                    <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
                      <div class="min-w-0 font-mono">
                        <div class="font-semibold text-white truncate text-xs">${snp.name}</div>
                        <div class="text-[11px] text-zinc-500 mt-0.5">${snp.date} • ${snp.size}</div>
                      </div>

                      <div class="flex items-center gap-2 shrink-0">
                        <button 
                          type="button" 
                          data-restore-snapshot="${snp.id}"
                          class="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors cursor-pointer"
                        >
                          Restore
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
              KVM Hypervisor Node
            </span>
            <div class="flex items-center gap-3">
              <button 
                type="button" 
                id="close-vps-drawer-footer-btn"
                class="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 5. Deploy New Server Modal -->
      ${isDeployModalOpen ? `
        <!-- Backdrop -->
        <div id="deploy-vps-modal-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"></div>
        
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div id="deploy-vps-modal" class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl text-white space-y-5">
            <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 class="text-base font-bold font-display text-white">Deploy Cloud VPS</h3>
              <button id="close-deploy-vps-modal-btn" class="text-zinc-400 hover:text-white cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <form id="deploy-vps-form" class="space-y-4 text-xs font-sans">
              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Server Hostname</label>
                <input 
                  type="text" 
                  id="deploy-vps-name-input" 
                  placeholder="e.g. vps-prod-cluster" 
                  required
                  class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono text-xs"
                />
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Datacenter Region</label>
                <select id="deploy-vps-region-input" class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                  <option value="Frankfurt (eu-central)">🇩🇪 Frankfurt FRA-1 (eu-central)</option>
                  <option value="US East (us-east-1)">🇺🇸 US East IAD-1 (us-east-1)</option>
                  <option value="London (eu-west-2)">🇬🇧 London LON-1 (eu-west-2)</option>
                </select>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Operating System</label>
                <select id="deploy-vps-os-input" class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                  <option value="Ubuntu 24.04 LTS">Ubuntu 24.04 LTS (Noble Numbat)</option>
                  <option value="Debian 12 Bookworm">Debian 12 Bookworm</option>
                  <option value="Alpine Linux 3.19">Alpine Linux 3.19 (Minimal)</option>
                  <option value="Rocky Linux 9">Rocky Linux 9 (Enterprise)</option>
                </select>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Hardware Plan</label>
                <select id="deploy-vps-plan-input" class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                  <option value="2 vCPU · 4 GB RAM · 80 GB NVMe">Standard (2 vCPU · 4 GB RAM · 80 GB NVMe)</option>
                  <option value="4 vCPU · 8 GB RAM · 160 GB NVMe" selected>Pro (4 vCPU · 8 GB RAM · 160 GB NVMe)</option>
                  <option value="8 vCPU · 16 GB RAM · 320 GB NVMe">Dedicated (8 vCPU · 16 GB RAM · 320 GB NVMe)</option>
                </select>
              </div>

              <div class="pt-2 flex items-center justify-end gap-3">
                <button type="button" id="cancel-deploy-vps-btn" class="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer">
                  Provision Now
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

      <!-- 6. Web Console (VNC) Modal -->
      ${isVncOpen && selectedVPS ? `
        <div id="vnc-modal-backdrop" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"></div>
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="w-full max-w-2xl bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-2xl text-white">
            <div class="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div class="flex items-center gap-2 font-mono text-xs">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>VNC Console: ${selectedVPS.name} (${selectedVPS.ip})</span>
              </div>
              <button id="close-vnc-btn" class="text-zinc-400 hover:text-white cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>
            <div class="p-6 font-mono text-xs text-emerald-400 bg-black min-h-[260px] space-y-2">
              <p class="text-zinc-500">Connected to Hostlab KVM hypervisor socket...</p>
              <p class="text-zinc-500">${selectedVPS.os} Linux 6.8.0-45-generic (tty1)</p>
              <p class="text-zinc-300 pt-2">${selectedVPS.name} login: <span class="animate-pulse">_</span></p>
            </div>
            <div class="px-4 py-3 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Send Ctrl+Alt+Del</span>
              <button id="close-vnc-footer-btn" class="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs">
                Exit Console
              </button>
            </div>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

export function setupVPSEvents(onRerender) {
  createIcons({ icons });

  // Filter tabs
  const filterBtns = document.querySelectorAll('[data-vps-filter]');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      activeFilter = btn.getAttribute('data-vps-filter');
      onRerender();
    };
  });

  // Search input
  const searchInput = document.getElementById('user-vps-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      onRerender();
      const newInput = document.getElementById('user-vps-search');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    };
  }

  // Manage VPS Click -> Open Drawer
  const manageBtns = document.querySelectorAll('[data-manage-vps]');
  manageBtns.forEach(btn => {
    btn.onclick = () => {
      const vpsId = btn.getAttribute('data-manage-vps');
      selectedVPS = customerVPS.find(s => s.id === vpsId) || null;
      actionFeedback = null;
      showRootPassword = false;
      onRerender();
    };
  });

  // Toggle Password Show/Hide
  const togglePassBtn = document.getElementById('toggle-vps-pass-btn');
  if (togglePassBtn) {
    togglePassBtn.onclick = () => {
      showRootPassword = !showRootPassword;
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
  const dismissBtn = document.getElementById('dismiss-vps-feedback-btn');
  if (dismissBtn) {
    dismissBtn.onclick = () => {
      actionFeedback = null;
      onRerender();
    };
  }

  // Reboot VPS Button
  const rebootBtn = document.getElementById('vps-reboot-btn');
  if (rebootBtn && selectedVPS) {
    rebootBtn.onclick = () => {
      actionFeedback = `Server ${selectedVPS.name} soft reboot triggered successfully.`;
      onRerender();
    };
  }

  // Power Toggle Button
  const powerBtn = document.getElementById('vps-power-toggle-btn');
  if (powerBtn && selectedVPS) {
    powerBtn.onclick = () => {
      if (selectedVPS.status.toLowerCase() === 'running') {
        selectedVPS.status = 'Stopped';
        actionFeedback = `Server ${selectedVPS.name} powered down.`;
      } else {
        selectedVPS.status = 'Running';
        actionFeedback = `Server ${selectedVPS.name} booting up...`;
      }
      onRerender();
    };
  }

  // Open VNC Button
  const vncBtn = document.getElementById('vps-vnc-btn');
  if (vncBtn) {
    vncBtn.onclick = () => {
      isVncOpen = true;
      onRerender();
    };
  }

  // Close VNC
  const closeVncBtn = document.getElementById('close-vnc-btn');
  const closeVncFooterBtn = document.getElementById('close-vnc-footer-btn');
  const vncBackdrop = document.getElementById('vnc-modal-backdrop');
  if (closeVncBtn) closeVncBtn.onclick = () => { isVncOpen = false; onRerender(); };
  if (closeVncFooterBtn) closeVncFooterBtn.onclick = () => { isVncOpen = false; onRerender(); };
  if (vncBackdrop) vncBackdrop.onclick = () => { isVncOpen = false; onRerender(); };

  // Create Snapshot Button
  const createSnpBtn = document.getElementById('create-vps-snapshot-btn');
  if (createSnpBtn && selectedVPS) {
    createSnpBtn.onclick = () => {
      if (!selectedVPS.snapshots) selectedVPS.snapshots = [];
      const newSnp = {
        id: `snp_${Date.now()}`,
        name: `${selectedVPS.name}-snapshot-${new Date().toISOString().slice(0, 10)}`,
        size: '3.6 GB',
        date: 'Just now'
      };
      selectedVPS.snapshots.unshift(newSnp);
      actionFeedback = `Snapshot created: ${newSnp.name}!`;
      onRerender();
    };
  }

  // Restore Snapshot Button
  const restoreBtns = document.querySelectorAll('[data-restore-snapshot]');
  restoreBtns.forEach(btn => {
    btn.onclick = () => {
      const snpId = btn.getAttribute('data-restore-snapshot');
      const snp = (selectedVPS?.snapshots || []).find(s => s.id === snpId);
      if (snp) {
        actionFeedback = `Server restoring from snapshot ${snp.name}...`;
        onRerender();
      }
    };
  });

  // Close VPS Drawer Click
  const closeDrawerBtn = document.getElementById('close-vps-drawer-btn');
  const closeDrawerFooterBtn = document.getElementById('close-vps-drawer-footer-btn');
  const drawerBackdrop = document.getElementById('vps-drawer-backdrop');

  if (closeDrawerBtn) closeDrawerBtn.onclick = () => { selectedVPS = null; actionFeedback = null; onRerender(); };
  if (closeDrawerFooterBtn) closeDrawerFooterBtn.onclick = () => { selectedVPS = null; actionFeedback = null; onRerender(); };
  if (drawerBackdrop) drawerBackdrop.onclick = () => { selectedVPS = null; actionFeedback = null; onRerender(); };

  // Deploy VPS Button -> Open Modal
  const deployBtn = document.getElementById('deploy-vps-btn');
  if (deployBtn) {
    deployBtn.onclick = () => {
      isDeployModalOpen = true;
      onRerender();
    };
  }

  // Close Deploy Modal Click
  const closeDeployModalBtn = document.getElementById('close-deploy-vps-modal-btn');
  const cancelDeployBtn = document.getElementById('cancel-deploy-vps-btn');
  const deployModalBackdrop = document.getElementById('deploy-vps-modal-backdrop');

  if (closeDeployModalBtn) closeDeployModalBtn.onclick = () => { isDeployModalOpen = false; onRerender(); };
  if (cancelDeployBtn) cancelDeployBtn.onclick = () => { isDeployModalOpen = false; onRerender(); };
  if (deployModalBackdrop) deployModalBackdrop.onclick = () => { isDeployModalOpen = false; onRerender(); };

  // Deploy Form Submit
  const deployForm = document.getElementById('deploy-vps-form');
  if (deployForm) {
    deployForm.onsubmit = (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('deploy-vps-name-input');
      const regionInput = document.getElementById('deploy-vps-region-input');
      const osInput = document.getElementById('deploy-vps-os-input');
      const planInput = document.getElementById('deploy-vps-plan-input');

      if (nameInput && nameInput.value.trim()) {
        const nameVal = nameInput.value.trim();
        const regionVal = regionInput ? regionInput.value : 'Frankfurt (eu-central)';
        const flagVal = regionVal.includes('Frankfurt') ? '🇩🇪' : regionVal.includes('London') ? '🇬🇧' : '🇺🇸';
        
        const newServer = {
          id: `vps_${Date.now()}`,
          name: nameVal,
          region: regionVal,
          flag: flagVal,
          os: osInput ? osInput.value : 'Ubuntu 24.04 LTS',
          ip: `194.38.12.${Math.floor(100 + Math.random() * 899)}`,
          specs: planInput ? planInput.value : '4 vCPU · 8 GB RAM · 160 GB NVMe',
          status: 'Running',
          uptime: 'Just provisioned',
          cpuUsage: 4,
          ramUsage: 18,
          diskUsage: 8,
          sshUser: 'root',
          sshPort: 22,
          rootPassword: 'Root#' + Math.floor(1000 + Math.random() * 9000) + '_Vps!',
          snapshots: [
            { id: `snp_${Date.now()}`, name: `${nameVal}-initial-provision`, size: '1.2 GB', date: 'Just now' }
          ]
        };
        customerVPS.unshift(newServer);
      }

      isDeployModalOpen = false;
      onRerender();
    };
  }
}
