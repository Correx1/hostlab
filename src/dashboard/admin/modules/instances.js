import { createIcons, icons } from 'lucide';

/**
 * Hostlab VPS Instances Module
 * Dedicated standalone module for KVM Virtual Private Servers, hypervisor allocation,
 * power controls, and real-time telemetry.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const vpsStats = {
  totalInstances: 486,
  runningInstances: 462,
  stoppedInstances: 18,
  provisioningInstances: 6,
  totalVcpu: '2,140 vCPU',
  totalRam: '8.4 TB',
  avgLoad: '41.8%',
  networkThroughput: '14.2 Gbps'
};

export const vpsPlans = [
  { id: 'cx21', name: 'Cloud VPS Standard 2', vcpu: 2, ramGB: 4, diskGB: 40, transferTB: 20, price: '$7.50/mo' },
  { id: 'cx31', name: 'Cloud VPS Standard 4', vcpu: 4, ramGB: 8, diskGB: 80, transferTB: 20, price: '$14.90/mo' },
  { id: 'cx41', name: 'Cloud VPS Pro 8', vcpu: 8, ramGB: 16, diskGB: 160, transferTB: 30, price: '$29.90/mo' },
  { id: 'cx51', name: 'Cloud VPS Dedicated 16', vcpu: 16, ramGB: 32, diskGB: 320, transferTB: 40, price: '$59.00/mo' }
];

export const regions = [
  { id: 'all', name: 'All Locations' },
  { id: 'fra', name: 'Frankfurt (eu-central-1)' },
  { id: 'iad', name: 'Ashburn / VA (us-east-1)' },
  { id: 'lon', name: 'London (eu-west-2)' },
  { id: 'sin', name: 'Singapore (ap-southeast-1)' }
];

export const initialInstances = [
  {
    id: 'vps-501',
    name: 'prod-api-cluster-01',
    ipv4: '144.126.241.80',
    ipv6: '2a01:4f8:c012:a81::1',
    region: 'fra',
    regionName: 'Frankfurt',
    plan: 'Cloud VPS Pro 8',
    vcpu: 8,
    ramGB: 16,
    diskGB: 160,
    os: 'Ubuntu 22.04 LTS',
    client: 'David Vance',
    clientEmail: 'david@apexstudios.design',
    cpuUsage: '18.4%',
    bandwidthUsedGB: 1420,
    bandwidthLimitTB: 30,
    status: 'running', // running | stopped | rebooting | provisioning
    uptime: '48d 14h',
    createdAt: '2024-01-15'
  },
  {
    id: 'vps-502',
    name: 'db-master-postgres',
    ipv4: '185.190.140.22',
    ipv6: '2a01:4f8:c012:b92::2',
    region: 'fra',
    regionName: 'Frankfurt',
    plan: 'Cloud VPS Dedicated 16',
    vcpu: 16,
    ramGB: 32,
    diskGB: 320,
    os: 'Debian 12 Bookworm',
    client: 'Sarah Jenkins',
    clientEmail: 'sarah@techflow.io',
    cpuUsage: '42.1%',
    bandwidthUsedGB: 2840,
    bandwidthLimitTB: 40,
    status: 'running',
    uptime: '112d 06h',
    createdAt: '2023-11-20'
  },
  {
    id: 'vps-503',
    name: 'redis-cache-iad',
    ipv4: '198.51.100.45',
    ipv6: '2600:1f18:412:90::3',
    region: 'iad',
    regionName: 'Ashburn / VA',
    plan: 'Cloud VPS Standard 4',
    vcpu: 4,
    ramGB: 8,
    diskGB: 80,
    os: 'Ubuntu 24.04 LTS',
    client: 'Alex Rivera',
    clientEmail: 'alex@cryptotrack.net',
    cpuUsage: '6.2%',
    bandwidthUsedGB: 680,
    bandwidthLimitTB: 20,
    status: 'running',
    uptime: '24d 19h',
    createdAt: '2024-02-18'
  },
  {
    id: 'vps-504',
    name: 'worker-queue-runner',
    ipv4: '178.62.204.11',
    ipv6: '2a03:b0c0:3:d0::4',
    region: 'lon',
    regionName: 'London',
    plan: 'Cloud VPS Standard 2',
    vcpu: 2,
    ramGB: 4,
    diskGB: 40,
    os: 'Alpine Linux 3.19',
    client: 'Emma Watson',
    clientEmail: 'emma@greenleaforganics.co.uk',
    cpuUsage: '0.0%',
    bandwidthUsedGB: 110,
    bandwidthLimitTB: 20,
    status: 'stopped',
    uptime: 'Offline',
    createdAt: '2023-12-04'
  },
  {
    id: 'vps-505',
    name: 'analytics-k8s-node-03',
    ipv4: '103.253.144.18',
    ipv6: '2400:cb00:2048:1::5',
    region: 'sin',
    regionName: 'Singapore',
    plan: 'Cloud VPS Pro 8',
    vcpu: 8,
    ramGB: 16,
    diskGB: 160,
    os: 'Rocky Linux 9',
    client: 'Karin Larsson',
    clientEmail: 'karin@nordiclogistics.se',
    cpuUsage: '64.8%',
    bandwidthUsedGB: 3410,
    bandwidthLimitTB: 30,
    status: 'running',
    uptime: '15d 02h',
    createdAt: '2024-03-01'
  },
  {
    id: 'vps-506',
    name: 'staging-env-nextjs',
    ipv4: '144.126.241.95',
    ipv6: '2a01:4f8:c012:c11::6',
    region: 'fra',
    regionName: 'Frankfurt',
    plan: 'Cloud VPS Standard 2',
    vcpu: 2,
    ramGB: 4,
    diskGB: 40,
    os: 'Ubuntu 22.04 LTS',
    client: 'Felix Weber',
    clientEmail: 'felix@pulsecreative.de',
    cpuUsage: '0.0%',
    bandwidthUsedGB: 15,
    bandwidthLimitTB: 20,
    status: 'stopped',
    uptime: 'Offline',
    createdAt: '2024-04-10'
  },
  {
    id: 'vps-507',
    name: 'edge-vpn-gateway',
    ipv4: '198.51.100.89',
    ipv6: '2600:1f18:412:90::7',
    region: 'iad',
    regionName: 'Ashburn / VA',
    plan: 'Cloud VPS Standard 2',
    vcpu: 2,
    ramGB: 4,
    diskGB: 40,
    os: 'Debian 12 Bookworm',
    client: 'Patrick Stewart',
    clientEmail: 'patrick@zenithgroup.net',
    cpuUsage: '8.1%',
    bandwidthUsedGB: 490,
    bandwidthLimitTB: 20,
    status: 'running',
    uptime: '38d 11h',
    createdAt: '2024-01-28'
  },
  {
    id: 'vps-508',
    name: 'ai-inferencing-host',
    ipv4: '185.190.140.77',
    ipv6: '2a01:4f8:c012:d34::8',
    region: 'fra',
    regionName: 'Frankfurt',
    plan: 'Cloud VPS Dedicated 16',
    vcpu: 16,
    ramGB: 32,
    diskGB: 320,
    os: 'Ubuntu 22.04 LTS (NVIDIA Ready)',
    client: 'Marcus Brody',
    clientEmail: 'marcus@novatech.ai',
    cpuUsage: '0.0%',
    bandwidthUsedGB: 0,
    bandwidthLimitTB: 40,
    status: 'provisioning',
    uptime: 'Building Kernel',
    createdAt: '2024-05-18'
  }
];

// In-memory state
let instancesList = [...initialInstances];
let currentFilter = 'all'; // all | running | stopped | provisioning
let currentSearch = '';
let currentRegion = 'all';

function getFilteredInstances() {
  return instancesList.filter(inst => {
    if (currentFilter !== 'all' && inst.status !== currentFilter) return false;
    if (currentRegion !== 'all' && inst.region !== currentRegion) return false;
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      return (
        inst.name.toLowerCase().includes(q) ||
        inst.ipv4.includes(q) ||
        inst.client.toLowerCase().includes(q) ||
        inst.clientEmail.toLowerCase().includes(q) ||
        inst.os.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

// ==========================================
// 2. VIEW TEMPLATES & COMPONENTS
// ==========================================

function getVpsStatsCardsHTML() {
  const runningCount = instancesList.filter(i => i.status === 'running').length;
  const stoppedCount = instancesList.filter(i => i.status === 'stopped').length;
  const provisioningCount = instancesList.filter(i => i.status === 'provisioning').length;

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Card 1: Total VPS -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="server" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ${runningCount} Active
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Total Instances
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${vpsStats.totalInstances.toLocaleString()}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              KVM Virtual Machines
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            ${stoppedCount} stopped • ${provisioningCount} provisioning
          </div>
        </div>
      </div>

      <!-- Card 2: vCPU Allocation -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="cpu" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            AMD EPYC™
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Allocated Compute
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${vpsStats.totalVcpu}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Compute Threads
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Average Hypervisor Load: ${vpsStats.avgLoad}
          </div>
        </div>
      </div>

      <!-- Card 3: Memory Footprint -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="activity" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            DDR5 ECC
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Provisioned Memory
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${vpsStats.totalRam}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Hardware RAM
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Across 24 Host Nodes
          </div>
        </div>
      </div>

      <!-- Card 4: Network Ingress/Egress -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="network" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            100 Gbps Core
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Current Network Load
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${vpsStats.networkThroughput}
            </span>
            <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              Optimal
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Anti-DDoS Scrubbing Active
          </div>
        </div>
      </div>

    </div>
  `;
}

function getInstancesTableHTML(instances, curFilter, curSearch, curRegion) {
  const allCount = instancesList.length;
  const runningCount = instancesList.filter(i => i.status === 'running').length;
  const stoppedCount = instancesList.filter(i => i.status === 'stopped').length;
  const provisioningCount = instancesList.filter(i => i.status === 'provisioning').length;

  return `
    <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
      
      <!-- Table Controls Bar -->
      <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Status Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button 
            type="button" 
            data-inst-filter="all"
            class="inst-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            All Instances (${allCount})
          </button>
          <button 
            type="button" 
            data-inst-filter="running"
            class="inst-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'running' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Running (${runningCount})
          </button>
          <button 
            type="button" 
            data-inst-filter="stopped"
            class="inst-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'stopped' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Stopped (${stoppedCount})
          </button>
          <button 
            type="button" 
            data-inst-filter="provisioning"
            class="inst-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'provisioning' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Setup (${provisioningCount})
          </button>
        </div>

        <!-- Search & Region Select -->
        <div class="flex items-center gap-3">
          <div class="relative flex-1 sm:w-60">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="vps-search-input"
              value="${curSearch}"
              placeholder="Search hostname, IP, client..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <select 
            id="vps-region-select"
            class="px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-zinc-500 font-mono"
          >
            ${regions.map(r => `
              <option value="${r.id}" ${curRegion === r.id ? 'selected' : ''}>
                ${r.name}
              </option>
            `).join('')}
          </select>
        </div>

      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <th class="py-3 px-4 sm:px-6">Instance</th>
              <th class="py-3 px-4">Client / Owner</th>
              <th class="py-3 px-4">Region</th>
              <th class="py-3 px-4">Specs (vCPU / RAM / Disk)</th>
              <th class="py-3 px-4">Operating System</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
            ${instances.length === 0 ? `
              <tr>
                <td colspan="7" class="py-12 text-center text-zinc-500">
                  <div class="flex flex-col items-center justify-center">
                    <i data-lucide="server" class="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-2"></i>
                    <p class="text-sm font-medium text-zinc-900 dark:text-white">No VPS instances found</p>
                    <p class="text-xs text-zinc-400 mt-1">Try adjusting your filters or search query.</p>
                  </div>
                </td>
              </tr>
            ` : instances.map(inst => {
              // Status: plain text, colored, no background pill
              let statusText = '';
              if (inst.status === 'running') {
                statusText = `<span class="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400">Running</span>`;
              } else if (inst.status === 'stopped') {
                statusText = `<span class="text-xs font-mono font-semibold text-zinc-400">Stopped</span>`;
              } else if (inst.status === 'rebooting') {
                statusText = `<span class="text-xs font-mono font-semibold text-amber-500 dark:text-amber-400">Rebooting</span>`;
              } else {
                statusText = `<span class="text-xs font-mono font-semibold text-blue-500 dark:text-blue-400">Provisioning</span>`;
              }

              return `
                <tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Instance Name -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="font-medium text-zinc-900 dark:text-white flex items-center gap-1.5 font-mono">
                      <span>${inst.name}</span>
                    </div>
                  </td>

                  <!-- Client / Owner -->
                  <td class="py-3.5 px-4">
                    <div class="font-medium text-zinc-900 dark:text-zinc-100">
                      ${inst.client}
                    </div>
                    <div class="text-[11px] text-zinc-400 font-mono mt-0.5 truncate max-w-[150px]">
                      ${inst.clientEmail}
                    </div>
                  </td>

                  <!-- Region (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${inst.regionName}
                  </td>

                  <!-- Hardware Specs (Clean numbers) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    <span class="font-semibold text-zinc-900 dark:text-zinc-100">${inst.vcpu} vCPU</span>
                    <span class="text-zinc-400"> / </span>
                    <span class="font-semibold text-zinc-900 dark:text-zinc-100">${inst.ramGB}GB</span>
                    <span class="text-zinc-400"> / </span>
                    <span class="text-zinc-600 dark:text-zinc-400">${inst.diskGB}GB NVMe</span>
                  </td>

                  <!-- Operating System (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${inst.os}
                  </td>

                  <!-- Status (Text Only, Colored) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${statusText}
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <!-- Open Console / Details Drawer -->
                      <button 
                        type="button" 
                        class="vps-details-btn px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        data-inst-id="${inst.id}"
                        title="View Hardware Specs & Console"
                      >
                        Manage
                      </button>

                      <!-- Power toggle (Start/Stop) -->
                      <button 
                        type="button" 
                        class="vps-power-btn p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        data-inst-id="${inst.id}"
                        title="${inst.status === 'running' ? 'Power Off Instance' : 'Power On Instance'}"
                      >
                        <i data-lucide="${inst.status === 'running' ? 'power' : 'play'}" class="w-4 h-4"></i>
                      </button>

                      <!-- Terminate -->
                      <button 
                        type="button" 
                        class="vps-delete-btn p-1.5 rounded hover:bg-rose-500/10 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        data-inst-id="${inst.id}"
                        title="Terminate & Destroy VPS"
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
          Showing <span class="text-zinc-900 dark:text-white font-semibold">${instances.length}</span> of ${allCount} instances
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

function getVpsDetailsDrawerHTML() {
  return `
    <div id="vps-details-drawer" class="fixed inset-0 z-50 overflow-hidden hidden transition-all duration-300">
      <!-- Backdrop -->
      <div id="vps-details-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-lg bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto custom-scrollbar">
          
          <div>
            <!-- Drawer Header -->
            <div class="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <div class="flex items-center gap-2">
                  <span id="drawer-vps-status" class="text-xs font-mono font-semibold text-emerald-500">Running</span>
                  <span class="text-zinc-600 dark:text-zinc-700">•</span>
                  <span id="drawer-vps-region" class="text-xs font-mono text-zinc-400">Frankfurt (eu-central-1)</span>
                </div>
                <h3 id="drawer-vps-name" class="text-lg font-bold font-display text-zinc-900 dark:text-white mt-1">prod-api-cluster-01</h3>
                <p id="drawer-vps-ipv4" class="text-xs font-mono text-zinc-400 mt-0.5">144.126.241.80</p>
              </div>
              <button type="button" id="close-vps-drawer-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Specs Grid -->
            <div class="mt-6 space-y-4">
              
              <!-- Realtime Resource Telemetry -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  HARDWARE & COMPUTE
                </div>
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span class="text-zinc-400 block text-[11px]">VIRTUAL CPU</span>
                    <span id="drawer-vps-cpu" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">8 vCPU AMD EPYC</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">RAM ALLOCATION</span>
                    <span id="drawer-vps-ram" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">16 GB DDR5</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">PRIMARY DISK</span>
                    <span id="drawer-vps-disk" class="font-mono text-zinc-800 dark:text-zinc-200">160 GB NVMe Gen4</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">BANDWIDTH USAGE</span>
                    <span id="drawer-vps-bandwidth" class="font-mono text-zinc-800 dark:text-zinc-200">1.4 TB / 30 TB</span>
                  </div>
                </div>

                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <span class="text-zinc-400 block text-[11px]">OPERATING SYSTEM</span>
                  <span id="drawer-vps-os" class="font-mono text-xs text-zinc-800 dark:text-zinc-200">Ubuntu 22.04 LTS (Jammy)</span>
                </div>

                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <span class="text-zinc-400 block text-[11px]">PUBLIC IPV6 ADDRESS</span>
                  <span id="drawer-vps-ipv6" class="font-mono text-xs text-zinc-600 dark:text-zinc-400 break-all">2a01:4f8:c012:a81::1</span>
                </div>
              </div>

              <!-- Power & Action Controls -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  QUICK POWER ACTIONS
                </div>
                <div class="flex items-center gap-2">
                  <button 
                    type="button" 
                    id="drawer-vps-reboot-btn"
                    class="flex-1 px-3 py-2 text-xs font-mono font-medium rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i>
                    <span>Soft Reboot</span>
                  </button>
                  <button 
                    type="button" 
                    id="drawer-vps-stop-toggle-btn"
                    class="flex-1 px-3 py-2 text-xs font-mono font-medium rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i data-lucide="power" class="w-3.5 h-3.5"></i>
                    <span id="drawer-vps-power-label">Shutdown</span>
                  </button>
                </div>
              </div>

              <!-- Web Serial / VNC Terminal Preview -->
              <div class="p-4 rounded-lg bg-black border border-zinc-800 space-y-2 font-mono text-[11px] text-zinc-300">
                <div class="flex items-center justify-between text-zinc-500 pb-2 border-b border-zinc-800">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>SERIAL CONSOLE ttyS0</span>
                  </div>
                  <span class="text-[10px]">115200 baud</span>
                </div>
                <div class="text-zinc-400 space-y-1">
                  <div>[  OK  ] Started OpenSSH Server Daemon.</div>
                  <div>[  OK  ] Reached target Multi-User System.</div>
                  <div class="text-zinc-100">Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 5.15.0-105-generic)</div>
                  <div class="text-emerald-400">hostlab-guest login: _</div>
                </div>
              </div>

            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end">
            <button 
              type="button" 
              id="drawer-vps-done-btn"
              class="px-4 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  `;
}

function getDeployVpsModalHTML() {
  return `
    <div id="deploy-vps-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden transition-opacity duration-200">
      <div class="relative w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-5">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white">
              Deploy Cloud VPS Instance
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Launch dedicated KVM compute with automated root provisioning and NVMe storage.
            </p>
          </div>
          <button 
            type="button" 
            id="close-deploy-vps-modal-btn"
            class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Form Body -->
        <form id="deploy-vps-form" class="space-y-4">
          
          <!-- Hostname -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              INSTANCE HOSTNAME
            </label>
            <input 
              type="text" 
              id="modal-vps-name-input"
              required
              placeholder="e.g. app-prod-node-01"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <!-- Region & Plan -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                DATACENTER REGION
              </label>
              <select 
                id="modal-vps-region-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                ${regions.filter(r => r.id !== 'all').map(r => `
                  <option value="${r.id}">${r.name}</option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                COMPUTE HARDWARE PLAN
              </label>
              <select 
                id="modal-vps-plan-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                ${vpsPlans.map(p => `
                  <option value="${p.name}">${p.name} (${p.vcpu} vCPU / ${p.ramGB}GB RAM) - ${p.price}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- OS Distribution -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              OPERATING SYSTEM DISTRIBUTION
            </label>
            <select 
              id="modal-vps-os-select"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
            >
              <option value="Ubuntu 22.04 LTS">Ubuntu 22.04 LTS (Jammy Jellyfish)</option>
              <option value="Ubuntu 24.04 LTS">Ubuntu 24.04 LTS (Noble Numbat)</option>
              <option value="Debian 12 Bookworm">Debian 12 Bookworm</option>
              <option value="Rocky Linux 9">Rocky Linux 9 (Enterprise)</option>
              <option value="Alpine Linux 3.19">Alpine Linux 3.19 (Minimal)</option>
            </select>
          </div>

          <!-- Client Owner -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                CLIENT / OWNER
              </label>
              <input 
                type="text" 
                id="modal-vps-client-name"
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
                id="modal-vps-client-email"
                required
                placeholder="jane@example.com"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-2">
            <button 
              type="button" 
              id="cancel-deploy-vps-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Provision Instance
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}

// ==========================================
// 3. MAIN MODULE RENDERER
// ==========================================

export function renderInstancesHTML() {
  const filtered = getFilteredInstances();

  return `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            VPS INSTANCES / ALL INSTANCES
          </div>
          <h1 class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mt-1">
            Virtual Private Servers
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Dedicated KVM hypervisor virtual machines, network throughput, console access, and power management.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-deploy-vps-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-mono font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Deploy Instance</span>
          </button>
        </div>
      </div>

      <!-- 1. Top KPI Compute Metrics -->
      ${getVpsStatsCardsHTML()}

      <!-- 2. Interactive Data Table -->
      <div id="vps-table-container">
        ${getInstancesTableHTML(filtered, currentFilter, currentSearch, currentRegion)}
      </div>

      <!-- 3. Deploy VPS Modal -->
      ${getDeployVpsModalHTML()}

      <!-- 4. Slide-over Details & Terminal Drawer -->
      ${getVpsDetailsDrawerHTML()}

    </div>
  `;
}

// ==========================================
// 4. EVENT BINDINGS & LIFECYCLE
// ==========================================

export function setupInstancesEvents(onNavigate) {
  createIcons({ icons });

  const tableContainer = document.getElementById('vps-table-container');
  const drawer = document.getElementById('vps-details-drawer');
  const closeDrawerBtn = document.getElementById('close-vps-drawer-btn');
  const drawerDoneBtn = document.getElementById('drawer-vps-done-btn');
  const drawerBackdrop = document.getElementById('vps-details-backdrop');

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

  const openDrawer = (inst) => {
    if (!drawer) return;
    const stEl = document.getElementById('drawer-vps-status');
    const rgEl = document.getElementById('drawer-vps-region');
    const nmEl = document.getElementById('drawer-vps-name');
    const ipEl = document.getElementById('drawer-vps-ipv4');
    const cpuEl = document.getElementById('drawer-vps-cpu');
    const ramEl = document.getElementById('drawer-vps-ram');
    const dskEl = document.getElementById('drawer-vps-disk');
    const bwEl = document.getElementById('drawer-vps-bandwidth');
    const osEl = document.getElementById('drawer-vps-os');
    const ip6El = document.getElementById('drawer-vps-ipv6');
    const pwrLabel = document.getElementById('drawer-vps-power-label');

    if (stEl) {
      if (inst.status === 'running') {
        stEl.textContent = 'Running';
        stEl.className = 'text-xs font-mono font-semibold text-emerald-500';
      } else if (inst.status === 'stopped') {
        stEl.textContent = 'Stopped';
        stEl.className = 'text-xs font-mono font-semibold text-zinc-400';
      } else if (inst.status === 'rebooting') {
        stEl.textContent = 'Rebooting';
        stEl.className = 'text-xs font-mono font-semibold text-amber-500';
      } else {
        stEl.textContent = 'Provisioning';
        stEl.className = 'text-xs font-mono font-semibold text-blue-500';
      }
    }

    if (rgEl) rgEl.textContent = `${inst.regionName} (${inst.region})`;
    if (nmEl) nmEl.textContent = inst.name;
    if (ipEl) ipEl.textContent = inst.ipv4;
    if (cpuEl) cpuEl.textContent = `${inst.vcpu} vCPU AMD EPYC`;
    if (ramEl) ramEl.textContent = `${inst.ramGB} GB DDR5`;
    if (dskEl) dskEl.textContent = `${inst.diskGB} GB NVMe Gen4`;
    if (bwEl) bwEl.textContent = `${(inst.bandwidthUsedGB / 1024).toFixed(1)} TB / ${inst.bandwidthLimitTB} TB`;
    if (osEl) osEl.textContent = inst.os;
    if (ip6El) ip6El.textContent = inst.ipv6;
    if (pwrLabel) pwrLabel.textContent = inst.status === 'running' ? 'Shutdown' : 'Power On';

    // Power toggle in drawer
    const stopToggleBtn = document.getElementById('drawer-vps-stop-toggle-btn');
    if (stopToggleBtn) {
      stopToggleBtn.onclick = () => {
        inst.status = inst.status === 'running' ? 'stopped' : 'running';
        inst.uptime = inst.status === 'running' ? '0m' : 'Offline';
        refreshTable();
        openDrawer(inst);
      };
    }

    // Reboot in drawer
    const rebootBtn = document.getElementById('drawer-vps-reboot-btn');
    if (rebootBtn) {
      rebootBtn.onclick = () => {
        inst.status = 'rebooting';
        refreshTable();
        openDrawer(inst);
        setTimeout(() => {
          inst.status = 'running';
          inst.uptime = '0m';
          refreshTable();
          openDrawer(inst);
        }, 1000);
      };
    }

    drawer.classList.remove('hidden');
    createIcons({ icons });
  };

  const refreshTable = () => {
    if (tableContainer) {
      const filtered = getFilteredInstances();
      tableContainer.innerHTML = getInstancesTableHTML(filtered, currentFilter, currentSearch, currentRegion);
      createIcons({ icons });
      attachTableEvents();
    }
  };

  const attachTableEvents = () => {
    // Filter Tabs
    const filterBtns = document.querySelectorAll('.inst-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        currentFilter = btn.getAttribute('data-inst-filter') || 'all';
        refreshTable();
      };
    });

    // Search Input
    const searchInput = document.getElementById('vps-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        currentSearch = e.target.value;
        refreshTable();
      };
    }

    // Region Select
    const regionSelect = document.getElementById('vps-region-select');
    if (regionSelect) {
      regionSelect.onchange = (e) => {
        currentRegion = e.target.value;
        refreshTable();
      };
    }

    // Manage button (opens drawer)
    const detailsBtns = document.querySelectorAll('.vps-details-btn');
    detailsBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-inst-id');
        const inst = instancesList.find(i => i.id === id);
        if (inst) openDrawer(inst);
      };
    });

    // Power toggle button
    const powerBtns = document.querySelectorAll('.vps-power-btn');
    powerBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-inst-id');
        const inst = instancesList.find(i => i.id === id);
        if (inst) {
          inst.status = inst.status === 'running' ? 'stopped' : 'running';
          inst.uptime = inst.status === 'running' ? '0m' : 'Offline';
          refreshTable();
        }
      };
    });

    // Terminate instance
    const deleteBtns = document.querySelectorAll('.vps-delete-btn');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-inst-id');
        const inst = instancesList.find(i => i.id === id);
        if (inst && confirm(`Are you sure you want to permanently delete VPS ${inst.name}? This will purge all NVMe data.`)) {
          instancesList = instancesList.filter(i => i.id !== id);
          refreshTable();
        }
      };
    });
  };

  attachTableEvents();

  // Deploy VPS Modal logic
  const deployModal = document.getElementById('deploy-vps-modal');
  const openDeployBtn = document.getElementById('open-deploy-vps-btn');
  const closeDeployBtn = document.getElementById('close-deploy-vps-modal-btn');
  const cancelDeployBtn = document.getElementById('cancel-deploy-vps-btn');
  const deployForm = document.getElementById('deploy-vps-form');

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
      const name = document.getElementById('modal-vps-name-input')?.value.trim();
      const regionId = document.getElementById('modal-vps-region-select')?.value || 'fra';
      const planName = document.getElementById('modal-vps-plan-select')?.value || 'Cloud VPS Standard 4';
      const os = document.getElementById('modal-vps-os-select')?.value || 'Ubuntu 22.04 LTS';
      const client = document.getElementById('modal-vps-client-name')?.value.trim();
      const clientEmail = document.getElementById('modal-vps-client-email')?.value.trim();

      if (!name || !client || !clientEmail) return;

      const planObj = vpsPlans.find(p => p.name === planName) || vpsPlans[1];
      const regionObj = regions.find(r => r.id === regionId) || regions[1];

      const newInst = {
        id: `vps-${Date.now()}`,
        name,
        ipv4: `144.126.241.${Math.floor(Math.random() * 200 + 20)}`,
        ipv6: `2a01:4f8:c012:${Math.floor(Math.random() * 900 + 100)}::1`,
        region: regionId,
        regionName: regionObj.name.split(' ')[0],
        plan: planName,
        vcpu: planObj.vcpu,
        ramGB: planObj.ramGB,
        diskGB: planObj.diskGB,
        os,
        client,
        clientEmail,
        cpuUsage: '0.2%',
        bandwidthUsedGB: 2,
        bandwidthLimitTB: planObj.transferTB,
        status: 'running',
        uptime: '0m',
        createdAt: new Date().toISOString().split('T')[0]
      };

      instancesList.unshift(newInst);
      closeDeploy();
      refreshTable();
    };
  }
}

export function cleanupInstances() {
  currentFilter = 'all';
  currentSearch = '';
  currentRegion = 'all';
}
