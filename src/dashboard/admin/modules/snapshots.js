import { createIcons, icons } from 'lucide';

/**
 * Hostlab VPS Snapshots & Custom Images Module
 * Dedicated standalone module for point-in-time VM snapshots, custom gold images,
 * and automated backup archives.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const snapshotStats = {
  totalSnapshots: 342,
  totalStorageTB: '14.8 TB',
  customImages: 28,
  autoBackups: 264,
  avgRestoreTime: '4m 12s'
};

export const initialSnapshots = [
  {
    id: 'snap-801',
    name: 'prod-api-pre-migration',
    sourceInstance: 'prod-api-cluster-01',
    type: 'Snapshot', // Snapshot | Custom Image | Scheduled Backup
    sizeGB: 42.5,
    os: 'Ubuntu 22.04 LTS',
    region: 'Frankfurt (eu-central-1)',
    createdAt: '2024-03-24 14:32',
    retention: 'Manual',
    status: 'available', // available | creating | failed
    description: 'Pre-v2.4 API deployment snapshot'
  },
  {
    id: 'snap-802',
    name: 'gold-rocky-k8s-node-v1',
    sourceInstance: 'analytics-k8s-node-03',
    type: 'Custom Image',
    sizeGB: 18.2,
    os: 'Rocky Linux 9',
    region: 'Frankfurt (eu-central-1)',
    createdAt: '2024-03-15 09:10',
    retention: 'Permanent',
    status: 'available',
    description: 'Hardened Kubernetes worker template with containerd & cilium'
  },
  {
    id: 'snap-803',
    name: 'db-master-weekly-backup',
    sourceInstance: 'db-master-postgres',
    type: 'Scheduled Backup',
    sizeGB: 112.0,
    os: 'Debian 12 Bookworm',
    region: 'Frankfurt (eu-central-1)',
    createdAt: '2024-03-22 03:00',
    retention: '21 days left',
    status: 'available',
    description: 'Automated sunday full block storage backup'
  },
  {
    id: 'snap-804',
    name: 'redis-state-snapshot-01',
    sourceInstance: 'redis-cache-iad',
    type: 'Snapshot',
    sizeGB: 14.8,
    os: 'Ubuntu 24.04 LTS',
    region: 'Ashburn / VA (us-east-1)',
    createdAt: '2024-03-20 18:45',
    retention: '6 days left',
    status: 'available',
    description: 'Pre-kernel upgrade memory state'
  },
  {
    id: 'snap-805',
    name: 'nodejs-ssr-base-template',
    sourceInstance: 'staging-env-nextjs',
    type: 'Custom Image',
    sizeGB: 12.0,
    os: 'Ubuntu 22.04 LTS',
    region: 'Frankfurt (eu-central-1)',
    createdAt: '2024-02-28 11:20',
    retention: 'Permanent',
    status: 'available',
    description: 'Node.js 20 LTS + PM2 + Nginx reverse proxy pre-configured'
  },
  {
    id: 'snap-806',
    name: 'worker-queue-nightly',
    sourceInstance: 'worker-queue-runner',
    type: 'Scheduled Backup',
    sizeGB: 8.5,
    os: 'Alpine Linux 3.19',
    region: 'London (eu-west-2)',
    createdAt: '2024-03-24 02:00',
    retention: '13 days left',
    status: 'available',
    description: 'Daily automated backup'
  },
  {
    id: 'snap-807',
    name: 'ai-training-checkpoint-raw',
    sourceInstance: 'ai-inferencing-host',
    type: 'Snapshot',
    sizeGB: 85.0,
    os: 'Ubuntu 22.04 LTS',
    region: 'Frankfurt (eu-central-1)',
    createdAt: '2024-03-25 16:10',
    retention: 'Manual',
    status: 'creating',
    description: 'Volume copy in progress (64%)'
  }
];

// In-memory state
let snapshotsList = [...initialSnapshots];
let currentFilter = 'all'; // all | snapshot | image | backup
let currentSearch = '';

function getFilteredSnapshots() {
  return snapshotsList.filter(item => {
    if (currentFilter !== 'all') {
      if (currentFilter === 'snapshot' && item.type !== 'Snapshot') return false;
      if (currentFilter === 'image' && item.type !== 'Custom Image') return false;
      if (currentFilter === 'backup' && item.type !== 'Scheduled Backup') return false;
    }
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.sourceInstance.toLowerCase().includes(q) ||
        item.os.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

// ==========================================
// 2. VIEW TEMPLATES & COMPONENTS
// ==========================================

function getSnapshotStatsCardsHTML() {
  const snapCount = snapshotsList.filter(s => s.type === 'Snapshot').length;
  const imgCount = snapshotsList.filter(s => s.type === 'Custom Image').length;
  const bkpCount = snapshotsList.filter(s => s.type === 'Scheduled Backup').length;

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Card 1: Total Storage Used -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="hard-drive" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Deduplicated
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Backup Storage Pool
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${snapshotStats.totalStorageTB}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              NVMe Object Storage
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Incremental ZFS block compression active
          </div>
        </div>
      </div>

      <!-- Card 2: Manual Snapshots -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="camera" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Point-in-Time
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Live VM Snapshots
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${snapCount}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Active Snapshots
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Zero-downtime consistency
          </div>
        </div>
      </div>

      <!-- Card 3: Custom OS Gold Images -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="disc" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            Reusable
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Custom OS Images
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${imgCount}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Gold Templates
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Ready for instant VPS deployment
          </div>
        </div>
      </div>

      <!-- Card 4: Scheduled Backups -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="archive" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Auto-Pruning
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Automated Backups
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${bkpCount}
            </span>
            <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              Daily/Weekly
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Average Restore: ${snapshotStats.avgRestoreTime}
          </div>
        </div>
      </div>

    </div>
  `;
}

function getSnapshotsTableHTML(items, curFilter, curSearch) {
  const allCount = snapshotsList.length;
  const snapCount = snapshotsList.filter(s => s.type === 'Snapshot').length;
  const imgCount = snapshotsList.filter(s => s.type === 'Custom Image').length;
  const bkpCount = snapshotsList.filter(s => s.type === 'Scheduled Backup').length;

  return `
    <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
      
      <!-- Table Controls Bar -->
      <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button 
            type="button" 
            data-snap-filter="all"
            class="snap-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            All Items (${allCount})
          </button>
          <button 
            type="button" 
            data-snap-filter="snapshot"
            class="snap-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'snapshot' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Snapshots (${snapCount})
          </button>
          <button 
            type="button" 
            data-snap-filter="image"
            class="snap-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'image' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Custom Images (${imgCount})
          </button>
          <button 
            type="button" 
            data-snap-filter="backup"
            class="snap-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'backup' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Auto Backups (${bkpCount})
          </button>
        </div>

        <!-- Search Input -->
        <div class="flex items-center gap-3">
          <div class="relative flex-1 sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="snap-search-input"
              value="${curSearch}"
              placeholder="Search snapshot, VPS, OS..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>
        </div>

      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <th class="py-3 px-4 sm:px-6">Snapshot / Image</th>
              <th class="py-3 px-4">Source VPS</th>
              <th class="py-3 px-4">Type</th>
              <th class="py-3 px-4">Size</th>
              <th class="py-3 px-4">Operating System</th>
              <th class="py-3 px-4">Created Date</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
            ${items.length === 0 ? `
              <tr>
                <td colspan="8" class="py-12 text-center text-zinc-500">
                  <div class="flex flex-col items-center justify-center">
                    <i data-lucide="camera-off" class="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-2"></i>
                    <p class="text-sm font-medium text-zinc-900 dark:text-white">No snapshots or images found</p>
                    <p class="text-xs text-zinc-400 mt-1">Try adjusting your filters or search terms.</p>
                  </div>
                </td>
              </tr>
            ` : items.map(item => {
              // Status: plain text, colored, no background pill
              let statusText = '';
              if (item.status === 'available') {
                statusText = `<span class="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400">Available</span>`;
              } else if (item.status === 'creating') {
                statusText = `<span class="text-xs font-mono font-semibold text-blue-500 dark:text-blue-400">Creating...</span>`;
              } else {
                statusText = `<span class="text-xs font-mono font-semibold text-rose-500 dark:text-rose-400">Failed</span>`;
              }

              return `
                <tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Name & Description -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="font-medium text-zinc-900 dark:text-white font-mono">
                      ${item.name}
                    </div>
                    <div class="text-[11px] text-zinc-400 mt-0.5 truncate max-w-xs">
                      ${item.description}
                    </div>
                  </td>

                  <!-- Source VPS (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${item.sourceInstance}
                  </td>

                  <!-- Type (Plain text, no color) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${item.type}
                  </td>

                  <!-- Size (Clean numbers) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 whitespace-nowrap font-semibold">
                    ${item.sizeGB} GB
                  </td>

                  <!-- Operating System (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${item.os}
                  </td>

                  <!-- Created Date & Retention -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    <div>${item.createdAt.split(' ')[0]}</div>
                    <div class="text-[10px] text-zinc-400">${item.retention}</div>
                  </td>

                  <!-- Status (Text Only, Colored) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${statusText}
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <!-- Inspect details -->
                      <button 
                        type="button" 
                        class="snap-inspect-btn px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        data-snap-id="${item.id}"
                        title="View Snapshot Details"
                      >
                        Details
                      </button>

                      <!-- Quick Restore -->
                      <button 
                        type="button" 
                        class="snap-restore-btn p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        data-snap-id="${item.id}"
                        title="Rollback / Restore to Source VPS"
                      >
                        <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
                      </button>

                      <!-- Delete -->
                      <button 
                        type="button" 
                        class="snap-delete-btn p-1.5 rounded hover:bg-rose-500/10 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        data-snap-id="${item.id}"
                        title="Delete Snapshot"
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
          Showing <span class="text-zinc-900 dark:text-white font-semibold">${items.length}</span> of ${allCount} items
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

function getSnapshotDetailsDrawerHTML() {
  return `
    <div id="snap-details-drawer" class="fixed inset-0 z-50 overflow-hidden hidden transition-all duration-300">
      <!-- Backdrop -->
      <div id="snap-details-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-lg bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto custom-scrollbar">
          
          <div>
            <!-- Drawer Header -->
            <div class="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <div class="flex items-center gap-2">
                  <span id="drawer-snap-type" class="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300">Snapshot</span>
                  <span id="drawer-snap-status" class="text-xs font-mono font-semibold text-emerald-500">Available</span>
                </div>
                <h3 id="drawer-snap-name" class="text-lg font-bold font-display text-zinc-900 dark:text-white mt-1">prod-api-pre-migration</h3>
                <p id="drawer-snap-source" class="text-xs font-mono text-zinc-400 mt-0.5">Source: prod-api-cluster-01</p>
              </div>
              <button type="button" id="close-snap-drawer-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Details Specs Grid -->
            <div class="mt-6 space-y-4">
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  STORAGE & OS METADATA
                </div>
                
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span class="text-zinc-400 block text-[11px]">COMPRESSED SIZE</span>
                    <span id="drawer-snap-size" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">42.5 GB</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">RETENTION POLICY</span>
                    <span id="drawer-snap-retention" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">Manual (No Expiry)</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">CREATED AT</span>
                    <span id="drawer-snap-date" class="font-mono text-zinc-800 dark:text-zinc-200">2024-03-24 14:32</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">STORAGE REGION</span>
                    <span id="drawer-snap-region" class="font-mono text-zinc-800 dark:text-zinc-200">Frankfurt (eu-central-1)</span>
                  </div>
                </div>

                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <span class="text-zinc-400 block text-[11px]">OPERATING SYSTEM</span>
                  <span id="drawer-snap-os" class="font-mono text-xs text-zinc-800 dark:text-zinc-200">Ubuntu 22.04 LTS (Jammy)</span>
                </div>

                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <span class="text-zinc-400 block text-[11px]">DESCRIPTION / NOTE</span>
                  <p id="drawer-snap-desc" class="font-mono text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Pre-v2.4 API deployment snapshot
                  </p>
                </div>
              </div>

              <!-- Restoration Guide Box -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  RESTORATION PROCEDURES
                </div>
                <p class="text-xs text-zinc-500 leading-relaxed">
                  Restoring will overwrite current NVMe block storage on the target server. 
                  Alternatively, you can launch a brand-new VPS with this snapshot as its boot volume.
                </p>
              </div>
            </div>
          </div>

          <!-- Drawer Footer Actions -->
          <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
            <button 
              type="button" 
              id="drawer-snap-restore-btn"
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Rollback Target VPS
            </button>
            <button 
              type="button" 
              id="drawer-snap-done-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  `;
}

function getCreateSnapshotModalHTML() {
  return `
    <div id="create-snap-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden transition-opacity duration-200">
      <div class="relative w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-5">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white">
              Create Snapshot or Image
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Take a live point-in-time snapshot or convert a VPS into a reusable template image.
            </p>
          </div>
          <button 
            type="button" 
            id="close-create-snap-modal-btn"
            class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Form Body -->
        <form id="create-snap-form" class="space-y-4">
          
          <!-- Source VPS -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              SOURCE VPS INSTANCE
            </label>
            <select 
              id="modal-snap-source-select"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
            >
              <option value="prod-api-cluster-01">prod-api-cluster-01 (Ubuntu 22.04 LTS)</option>
              <option value="db-master-postgres">db-master-postgres (Debian 12)</option>
              <option value="redis-cache-iad">redis-cache-iad (Ubuntu 24.04 LTS)</option>
              <option value="worker-queue-runner">worker-queue-runner (Alpine 3.19)</option>
              <option value="analytics-k8s-node-03">analytics-k8s-node-03 (Rocky Linux 9)</option>
            </select>
          </div>

          <!-- Name -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              SNAPSHOT / IMAGE NAME
            </label>
            <input 
              type="text" 
              id="modal-snap-name-input"
              required
              placeholder="e.g. pre-upgrade-snap-01"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <!-- Type Selection -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                BACKUP TYPE
              </label>
              <select 
                id="modal-snap-type-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                <option value="Snapshot">Live VM Snapshot</option>
                <option value="Custom Image">Reusable Custom Image</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                RETENTION POLICY
              </label>
              <select 
                id="modal-snap-retention-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                <option value="Manual">Manual (Keep until deleted)</option>
                <option value="7 days">Auto-prune after 7 days</option>
                <option value="30 days">Auto-prune after 30 days</option>
              </select>
            </div>
          </div>

          <!-- Description / Note -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              DESCRIPTION / NOTES
            </label>
            <input 
              type="text" 
              id="modal-snap-desc-input"
              placeholder="Optional notes or changelog"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-2">
            <button 
              type="button" 
              id="cancel-create-snap-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Capture Snapshot
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

export function renderSnapshotsHTML() {
  const filtered = getFilteredSnapshots();

  return `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            VPS INSTANCES / SNAPSHOTS & IMAGES
          </div>
          <h1 class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mt-1">
            Snapshots & Custom Images
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Point-in-time crash-consistent snapshots, golden OS deployment templates, and automated restore pipelines.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-create-snap-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-mono font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Take Snapshot</span>
          </button>
        </div>
      </div>

      <!-- 1. Top KPI Metrics -->
      ${getSnapshotStatsCardsHTML()}

      <!-- 2. Interactive Data Table -->
      <div id="snap-table-container">
        ${getSnapshotsTableHTML(filtered, currentFilter, currentSearch)}
      </div>

      <!-- 3. Create Snapshot Modal -->
      ${getCreateSnapshotModalHTML()}

      <!-- 4. Slide-over Details Drawer -->
      ${getSnapshotDetailsDrawerHTML()}

    </div>
  `;
}

// ==========================================
// 4. EVENT BINDINGS & LIFECYCLE
// ==========================================

export function setupSnapshotsEvents(onNavigate) {
  createIcons({ icons });

  const tableContainer = document.getElementById('snap-table-container');
  const drawer = document.getElementById('snap-details-drawer');
  const closeDrawerBtn = document.getElementById('close-snap-drawer-btn');
  const drawerDoneBtn = document.getElementById('drawer-snap-done-btn');
  const drawerBackdrop = document.getElementById('snap-details-backdrop');

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

  const openDrawer = (item) => {
    if (!drawer) return;
    const tpEl = document.getElementById('drawer-snap-type');
    const stEl = document.getElementById('drawer-snap-status');
    const nmEl = document.getElementById('drawer-snap-name');
    const srcEl = document.getElementById('drawer-snap-source');
    const szEl = document.getElementById('drawer-snap-size');
    const retEl = document.getElementById('drawer-snap-retention');
    const dtEl = document.getElementById('drawer-snap-date');
    const regEl = document.getElementById('drawer-snap-region');
    const osEl = document.getElementById('drawer-snap-os');
    const descEl = document.getElementById('drawer-snap-desc');
    const restoreBtn = document.getElementById('drawer-snap-restore-btn');

    if (tpEl) tpEl.textContent = item.type;
    if (stEl) {
      if (item.status === 'available') {
        stEl.textContent = 'Available';
        stEl.className = 'text-xs font-mono font-semibold text-emerald-500';
      } else if (item.status === 'creating') {
        stEl.textContent = 'Creating...';
        stEl.className = 'text-xs font-mono font-semibold text-blue-500';
      } else {
        stEl.textContent = 'Failed';
        stEl.className = 'text-xs font-mono font-semibold text-rose-500';
      }
    }

    if (nmEl) nmEl.textContent = item.name;
    if (srcEl) srcEl.textContent = `Source: ${item.sourceInstance}`;
    if (szEl) szEl.textContent = `${item.sizeGB} GB`;
    if (retEl) retEl.textContent = item.retention;
    if (dtEl) dtEl.textContent = item.createdAt;
    if (regEl) regEl.textContent = item.region;
    if (osEl) osEl.textContent = item.os;
    if (descEl) descEl.textContent = item.description || 'No notes provided.';

    if (restoreBtn) {
      restoreBtn.onclick = () => {
        restoreBtn.textContent = 'Restoring volume...';
        setTimeout(() => {
          restoreBtn.textContent = 'Restored Successfully!';
          setTimeout(() => {
            closeDrawer();
          }, 800);
        }, 1200);
      };
    }

    drawer.classList.remove('hidden');
    createIcons({ icons });
  };

  const refreshTable = () => {
    if (tableContainer) {
      const filtered = getFilteredSnapshots();
      tableContainer.innerHTML = getSnapshotsTableHTML(filtered, currentFilter, currentSearch);
      createIcons({ icons });
      attachTableEvents();
    }
  };

  const attachTableEvents = () => {
    // Filter Tabs
    const filterBtns = document.querySelectorAll('.snap-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        currentFilter = btn.getAttribute('data-snap-filter') || 'all';
        refreshTable();
      };
    });

    // Search Input
    const searchInput = document.getElementById('snap-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        currentSearch = e.target.value;
        refreshTable();
      };
    }

    // Inspect Details
    const inspectBtns = document.querySelectorAll('.snap-inspect-btn');
    inspectBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-snap-id');
        const item = snapshotsList.find(s => s.id === id);
        if (item) openDrawer(item);
      };
    });

    // Restore button in table
    const restoreBtns = document.querySelectorAll('.snap-restore-btn');
    restoreBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-snap-id');
        const item = snapshotsList.find(s => s.id === id);
        if (item) openDrawer(item);
      };
    });

    // Delete button
    const deleteBtns = document.querySelectorAll('.snap-delete-btn');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-snap-id');
        const item = snapshotsList.find(s => s.id === id);
        if (item && confirm(`Permanently delete snapshot "${item.name}"?`)) {
          snapshotsList = snapshotsList.filter(s => s.id !== id);
          refreshTable();
        }
      };
    });
  };

  attachTableEvents();

  // Create Snapshot Modal logic
  const createModal = document.getElementById('create-snap-modal');
  const openCreateBtn = document.getElementById('open-create-snap-btn');
  const closeCreateBtn = document.getElementById('close-create-snap-modal-btn');
  const cancelCreateBtn = document.getElementById('cancel-create-snap-btn');
  const createForm = document.getElementById('create-snap-form');

  if (openCreateBtn && createModal) {
    openCreateBtn.onclick = () => createModal.classList.remove('hidden');
  }

  const closeCreate = () => {
    if (createModal) createModal.classList.add('hidden');
    if (createForm) createForm.reset();
  };

  if (closeCreateBtn) closeCreateBtn.onclick = closeCreate;
  if (cancelCreateBtn) cancelCreateBtn.onclick = closeCreate;

  if (createForm) {
    createForm.onsubmit = (e) => {
      e.preventDefault();
      const source = document.getElementById('modal-snap-source-select')?.value || 'prod-api-cluster-01';
      const name = document.getElementById('modal-snap-name-input')?.value.trim();
      const type = document.getElementById('modal-snap-type-select')?.value || 'Snapshot';
      const retention = document.getElementById('modal-snap-retention-select')?.value || 'Manual';
      const desc = document.getElementById('modal-snap-desc-input')?.value.trim() || 'User triggered snapshot';

      if (!name) return;

      const newSnap = {
        id: `snap-${Date.now()}`,
        name,
        sourceInstance: source,
        type,
        sizeGB: 15.0,
        os: 'Ubuntu 22.04 LTS',
        region: 'Frankfurt (eu-central-1)',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        retention,
        status: 'available',
        description: desc
      };

      snapshotsList.unshift(newSnap);
      closeCreate();
      refreshTable();
    };
  }
}

export function cleanupSnapshots() {
  currentFilter = 'all';
  currentSearch = '';
}
