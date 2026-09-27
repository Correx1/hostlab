import { createIcons, icons } from 'lucide';

/**
 * Hostlab DNS Zones Module
 * Dedicated standalone module for Anycast authoritative DNS zones,
 * zone file records (A, AAAA, CNAME, MX, TXT, SRV), and automated DNSSEC signing.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const dnsStats = {
  totalZones: 1840,
  activeZones: 1826,
  dnssecSigned: 1240,
  monthlyQueries: '84.2M',
  avgPropagationMs: '42ms'
};

export const initialZones = [
  {
    id: 'zone-201',
    domain: 'techflow-media.com',
    type: 'Primary Authoritative',
    provider: 'Hostlab Anycast DNS',
    client: 'Sarah Jenkins',
    clientEmail: 'sarah@techflow.io',
    dnssec: true,
    serial: 2024032401,
    queries: '4.8M',
    status: 'active', // active | propagating | error
    records: [
      { id: 'rec-1', type: 'A', name: '@', content: '185.190.140.22', ttl: 3600 },
      { id: 'rec-2', type: 'AAAA', name: '@', content: '2a01:4f8:c012:a81::1', ttl: 3600 },
      { id: 'rec-3', type: 'CNAME', name: 'www', content: 'techflow-media.com', ttl: 3600 },
      { id: 'rec-4', type: 'MX', name: '@', content: '10 mail.techflow-media.com', ttl: 3600 },
      { id: 'rec-5', type: 'TXT', name: '@', content: 'v=spf1 include:_spf.hostlab.cloud ~all', ttl: 3600 },
      { id: 'rec-6', type: 'TXT', name: '_dmarc', content: 'v=DMARC1; p=reject; rua=mailto:dmarc@techflow.io', ttl: 3600 }
    ]
  },
  {
    id: 'zone-202',
    domain: 'apexstudios.design',
    type: 'Primary Authoritative',
    provider: 'Cloudflare Integration',
    client: 'David Vance',
    clientEmail: 'david@apexstudios.design',
    dnssec: false,
    serial: 2024031502,
    queries: '12.4M',
    status: 'active',
    records: [
      { id: 'rec-7', type: 'A', name: '@', content: '144.126.241.80', ttl: 300 },
      { id: 'rec-8', type: 'CNAME', name: 'cdn', content: 'apex-cdn.b-cdn.net', ttl: 300 },
      { id: 'rec-9', type: 'TXT', name: '@', content: 'v=spf1 include:_spf.google.com ~all', ttl: 3600 }
    ]
  },
  {
    id: 'zone-203',
    domain: 'greenleaf-organics.co.uk',
    type: 'Primary Authoritative',
    provider: 'Hostlab Anycast DNS',
    client: 'Emma Watson',
    clientEmail: 'emma@greenleaforganics.co.uk',
    dnssec: true,
    serial: 2024032204,
    queries: '820K',
    status: 'active',
    records: [
      { id: 'rec-10', type: 'A', name: '@', content: '178.62.204.11', ttl: 3600 },
      { id: 'rec-11', type: 'CNAME', name: 'www', content: 'greenleaf-organics.co.uk', ttl: 3600 },
      { id: 'rec-12', type: 'MX', name: '@', content: '10 mx.hostlab.email', ttl: 3600 }
    ]
  },
  {
    id: 'zone-204',
    domain: 'cryptotrack-api.io',
    type: 'Primary Authoritative',
    provider: 'Hostlab Anycast DNS',
    client: 'Alex Rivera',
    clientEmail: 'alex@cryptotrack.net',
    dnssec: true,
    serial: 2024032501,
    queries: '24.8M',
    status: 'propagating',
    records: [
      { id: 'rec-13', type: 'A', name: 'api', content: '185.190.140.22', ttl: 60 },
      { id: 'rec-14', type: 'A', name: 'gateway', content: '185.190.140.25', ttl: 60 },
      { id: 'rec-15', type: 'TXT', name: '_acme-challenge', content: 'vHjK98Lm2NoP3qR4sT5uV6wX7yZ8', ttl: 60 }
    ]
  },
  {
    id: 'zone-205',
    domain: 'pulsecreative.de',
    type: 'Primary Authoritative',
    provider: 'PowerDNS Cluster',
    client: 'Felix Weber',
    clientEmail: 'felix@pulsecreative.de',
    dnssec: false,
    serial: 2023120101,
    queries: '410K',
    status: 'active',
    records: [
      { id: 'rec-16', type: 'A', name: '@', content: '185.190.140.22', ttl: 3600 },
      { id: 'rec-17', type: 'CNAME', name: 'staging', content: 'staging.pulsecreative.de', ttl: 300 }
    ]
  },
  {
    id: 'zone-206',
    domain: 'novatech-solutions.ai',
    type: 'Primary Authoritative',
    provider: 'Hostlab Anycast DNS',
    client: 'Marcus Brody',
    clientEmail: 'marcus@novatech.ai',
    dnssec: true,
    serial: 2024011401,
    queries: '1.2M',
    status: 'active',
    records: [
      { id: 'rec-18', type: 'A', name: '@', content: '185.190.140.77', ttl: 3600 },
      { id: 'rec-19', type: 'A', name: 'cluster', content: '185.190.140.78', ttl: 3600 },
      { id: 'rec-20', type: 'TXT', name: '@', content: 'v=spf1 include:relay.hostlab.cloud ~all', ttl: 3600 }
    ]
  },
  {
    id: 'zone-207',
    domain: 'aurora-fashion.com',
    type: 'Secondary Replica',
    provider: 'Hostlab Anycast DNS',
    client: 'Chloë Dupuis',
    clientEmail: 'chloe@aurorafashion.fr',
    dnssec: false,
    serial: 2024032400,
    queries: '95K',
    status: 'propagating',
    records: [
      { id: 'rec-21', type: 'A', name: '@', content: '198.51.100.45', ttl: 3600 },
      { id: 'rec-22', type: 'CNAME', name: 'shop', content: 'shops.myshopify.com', ttl: 300 }
    ]
  },
  {
    id: 'zone-208',
    domain: 'zenith-consulting.net',
    type: 'Primary Authoritative',
    provider: 'Hostlab Anycast DNS',
    client: 'Patrick Stewart',
    clientEmail: 'patrick@zenithgroup.net',
    dnssec: false,
    serial: 2023091901,
    queries: '12K',
    status: 'error',
    records: [
      { id: 'rec-23', type: 'A', name: '@', content: '178.62.204.11', ttl: 3600 }
    ]
  }
];

// In-memory state
let zonesList = [...initialZones];
let currentFilter = 'all'; // all | active | propagating | dnssec
let currentSearch = '';

function getFilteredZones() {
  return zonesList.filter(z => {
    if (currentFilter !== 'all') {
      if (currentFilter === 'active' && z.status !== 'active') return false;
      if (currentFilter === 'propagating' && z.status !== 'propagating') return false;
      if (currentFilter === 'dnssec' && !z.dnssec) return false;
    }
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      return (
        z.domain.toLowerCase().includes(q) ||
        z.client.toLowerCase().includes(q) ||
        z.provider.toLowerCase().includes(q) ||
        z.records.some(r => r.name.toLowerCase().includes(q) || r.content.toLowerCase().includes(q))
      );
    }
    return true;
  });
}

// ==========================================
// 2. VIEW TEMPLATES & COMPONENTS
// ==========================================

function getDnsStatsCardsHTML() {
  const activeCount = zonesList.filter(z => z.status === 'active').length;
  const dnssecCount = zonesList.filter(z => z.dnssec).length;
  const propCount = zonesList.filter(z => z.status === 'propagating').length;

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Card 1: Total DNS Zones -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="network" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Anycast BGP
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Authoritative Zones
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${dnsStats.totalZones.toLocaleString()}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Zones Hosted
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            ${activeCount} responding across 32 Edge PoPs
          </div>
        </div>
      </div>

      <!-- Card 2: DNSSEC Signed Zones -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Algorithm 13
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            DNSSEC Signing
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${dnssecCount}
            </span>
            <span class="text-xs font-mono text-blue-600 dark:text-blue-400">
              ECDSA P-256
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Automated ZSK & KSK key rotation
          </div>
        </div>
      </div>

      <!-- Card 3: Monthly Query Traffic -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="activity" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            Telemetry
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Global Query Volume
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${dnsStats.monthlyQueries}
            </span>
            <span class="text-xs font-mono text-purple-600 dark:text-purple-400">
              Queries / Mo
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Average edge resolution latency: ${dnsStats.avgPropagationMs}
          </div>
        </div>
      </div>

      <!-- Card 4: Propagating / In-Flight Changes -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="refresh-cw" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium ${propCount > 0 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'}">
            ${propCount > 0 ? 'Synchronizing' : 'Clean'}
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Zone Synchronization
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${propCount}
            </span>
            <span class="text-xs font-mono text-amber-600 dark:text-amber-400">
              Propagating
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Zone transfer (AXFR/IXFR) across Anycast edge
          </div>
        </div>
      </div>

    </div>
  `;
}

function getDnsTableHTML(zones, curFilter, curSearch) {
  const allCount = zonesList.length;
  const activeCount = zonesList.filter(z => z.status === 'active').length;
  const propCount = zonesList.filter(z => z.status === 'propagating').length;
  const dnssecCount = zonesList.filter(z => z.dnssec).length;

  return `
    <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
      
      <!-- Table Controls Bar -->
      <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button 
            type="button" 
            data-dns-filter="all"
            class="dns-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            All Zones (${allCount})
          </button>
          <button 
            type="button" 
            data-dns-filter="active"
            class="dns-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'active' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Active (${activeCount})
          </button>
          <button 
            type="button" 
            data-dns-filter="propagating"
            class="dns-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'propagating' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Propagating (${propCount})
          </button>
          <button 
            type="button" 
            data-dns-filter="dnssec"
            class="dns-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'dnssec' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            DNSSEC (${dnssecCount})
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
              id="dns-search-input"
              value="${curSearch}"
              placeholder="Search zone, record, client..." 
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
              <th class="py-3 px-4 sm:px-6">Zone Domain</th>
              <th class="py-3 px-4">Client / Owner</th>
              <th class="py-3 px-4">DNS Provider</th>
              <th class="py-3 px-4">Total Records</th>
              <th class="py-3 px-4">Query Traffic</th>
              <th class="py-3 px-4">DNSSEC</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
            ${zones.length === 0 ? `
              <tr>
                <td colspan="8" class="py-12 text-center text-zinc-500">
                  <div class="flex flex-col items-center justify-center">
                    <i data-lucide="network" class="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-2"></i>
                    <p class="text-sm font-medium text-zinc-900 dark:text-white">No DNS zones found</p>
                    <p class="text-xs text-zinc-400 mt-1">Try modifying your search or filter options.</p>
                  </div>
                </td>
              </tr>
            ` : zones.map(z => {
              // Status: plain text, colored, no background pill
              let statusText = '';
              if (z.status === 'active') {
                statusText = `<span class="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400">Active</span>`;
              } else if (z.status === 'propagating') {
                statusText = `<span class="text-xs font-mono font-semibold text-amber-500 dark:text-amber-400">Propagating</span>`;
              } else {
                statusText = `<span class="text-xs font-mono font-semibold text-rose-500 dark:text-rose-400">Error</span>`;
              }

              return `
                <tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Domain -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="font-medium text-zinc-900 dark:text-white font-mono flex items-center gap-1.5">
                      <span>${z.domain}</span>
                    </div>
                  </td>

                  <!-- Client / Owner -->
                  <td class="py-3.5 px-4">
                    <div class="font-medium text-zinc-900 dark:text-zinc-100">
                      ${z.client}
                    </div>
                    <div class="text-[11px] text-zinc-400 font-mono mt-0.5 truncate max-w-[150px]">
                      ${z.clientEmail}
                    </div>
                  </td>

                  <!-- DNS Provider (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${z.provider}
                  </td>

                  <!-- Total Records (Clean numbers) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    <span class="font-semibold text-zinc-900 dark:text-zinc-100">${z.records.length}</span> records
                  </td>

                  <!-- Query Traffic (Clean numbers) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap font-medium">
                    ${z.queries}
                  </td>

                  <!-- DNSSEC (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    ${z.dnssec ? '<span class="text-zinc-800 dark:text-zinc-200">Enabled</span>' : '<span class="text-zinc-400">Disabled</span>'}
                  </td>

                  <!-- Status (Text Only, Colored) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${statusText}
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <!-- Manage Records -->
                      <button 
                        type="button" 
                        class="dns-manage-btn px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        data-zone-id="${z.id}"
                        title="Edit DNS Records"
                      >
                        Records
                      </button>

                      <!-- Delete Zone -->
                      <button 
                        type="button" 
                        class="dns-delete-btn p-1.5 rounded hover:bg-rose-500/10 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        data-zone-id="${z.id}"
                        title="Delete DNS Zone"
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
          Showing <span class="text-zinc-900 dark:text-white font-semibold">${zones.length}</span> of ${allCount} zones
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

function getDnsRecordsDrawerHTML() {
  return `
    <div id="dns-records-drawer" class="fixed inset-0 z-50 overflow-hidden hidden transition-all duration-300">
      <!-- Backdrop -->
      <div id="dns-records-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div class="w-screen max-w-2xl bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto custom-scrollbar">
          
          <div class="space-y-6">
            <!-- Drawer Header -->
            <div class="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <div class="flex items-center gap-2">
                  <span id="drawer-zone-status" class="text-xs font-mono font-semibold text-emerald-500">Active</span>
                  <span class="text-zinc-600 dark:text-zinc-700">•</span>
                  <span id="drawer-zone-provider" class="text-xs font-mono text-zinc-400">Hostlab Anycast DNS</span>
                </div>
                <h3 id="drawer-zone-domain" class="text-lg font-bold font-display text-zinc-900 dark:text-white mt-1">techflow-media.com</h3>
                <p id="drawer-zone-meta" class="text-xs font-mono text-zinc-400 mt-0.5">SOA Serial: 2024032401 • 6 DNS Records</p>
              </div>
              <button type="button" id="close-dns-drawer-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Add Record Inline Form -->
            <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                ADD NEW DNS RECORD
              </div>
              <form id="drawer-add-record-form" class="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <div>
                  <select id="record-type-input" class="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded text-zinc-900 dark:text-white font-mono">
                    <option value="A">A (IPv4)</option>
                    <option value="AAAA">AAAA (IPv6)</option>
                    <option value="CNAME">CNAME</option>
                    <option value="MX">MX</option>
                    <option value="TXT">TXT</option>
                    <option value="SRV">SRV</option>
                  </select>
                </div>
                <div>
                  <input type="text" id="record-name-input" placeholder="@ or subdomain" class="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded text-zinc-900 dark:text-white font-mono" required />
                </div>
                <div>
                  <input type="text" id="record-content-input" placeholder="IP or Value" class="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded text-zinc-900 dark:text-white font-mono" required />
                </div>
                <div>
                  <button type="submit" class="w-full py-1.5 text-xs font-mono font-medium rounded bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer">
                    + Add Record
                  </button>
                </div>
              </form>
            </div>

            <!-- Records List Table -->
            <div class="space-y-2">
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                ZONE RECORDS
              </div>
              <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <table class="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr class="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-400">
                      <th class="py-2.5 px-3">Type</th>
                      <th class="py-2.5 px-3">Name</th>
                      <th class="py-2.5 px-3">Content / Target</th>
                      <th class="py-2.5 px-3">TTL</th>
                      <th class="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody id="drawer-records-tbody" class="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                    <!-- Injected via JS -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end">
            <button 
              type="button" 
              id="drawer-dns-done-btn"
              class="px-4 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  `;
}

function getCreateZoneModalHTML() {
  return `
    <div id="create-zone-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden transition-opacity duration-200">
      <div class="relative w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-5">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white">
              Create Authoritative DNS Zone
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Deploy an Anycast zone across global edge nodes with automated DNSSEC.
            </p>
          </div>
          <button 
            type="button" 
            id="close-create-zone-modal-btn"
            class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Form Body -->
        <form id="create-zone-form" class="space-y-4">
          
          <!-- Domain Name -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              DOMAIN ZONE APEX
            </label>
            <input 
              type="text" 
              id="modal-zone-domain-input"
              required
              placeholder="e.g. cloudapp.io"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <!-- Zone Template & Provider -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                PRESET TEMPLATE
              </label>
              <select 
                id="modal-zone-template-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                <option value="standard">Standard Web + Email (SPF/DMARC)</option>
                <option value="empty">Clean / Empty Zone File</option>
                <option value="redirect">Apex to WWW Redirect</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                DNS ENGINE
              </label>
              <select 
                id="modal-zone-provider-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                <option value="Hostlab Anycast DNS">Hostlab Anycast (32 PoPs)</option>
                <option value="Cloudflare Integration">Cloudflare DNS Bridge</option>
                <option value="PowerDNS Cluster">Private PowerDNS Cluster</option>
              </select>
            </div>
          </div>

          <!-- Client Owner -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                CLIENT OWNER
              </label>
              <input 
                type="text" 
                id="modal-zone-client-name"
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
                id="modal-zone-client-email"
                required
                placeholder="jane@example.com"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
          </div>

          <!-- DNSSEC Checkbox -->
          <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i>
              <div>
                <div class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Auto-Sign with DNSSEC</div>
                <div class="text-[11px] text-zinc-400">Generate DS records for registry synchronization</div>
              </div>
            </div>
            <input type="checkbox" id="modal-zone-dnssec-toggle" checked class="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4 cursor-pointer" />
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-2">
            <button 
              type="button" 
              id="cancel-create-zone-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Create Zone
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

export function renderDnsZonesHTML() {
  const filtered = getFilteredZones();

  return `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            DOMAINS & DNS / DNS ZONES
          </div>
          <h1 class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mt-1">
            Authoritative DNS Zones
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Global Anycast name resolution, granular record management (A, CNAME, MX, TXT), and ECDSA DNSSEC signing.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-create-zone-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-mono font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Create DNS Zone</span>
          </button>
        </div>
      </div>

      <!-- 1. Top KPI Metrics -->
      ${getDnsStatsCardsHTML()}

      <!-- 2. Interactive Data Table -->
      <div id="dns-table-container">
        ${getDnsTableHTML(filtered, currentFilter, currentSearch)}
      </div>

      <!-- 3. Create Zone Modal -->
      ${getCreateZoneModalHTML()}

      <!-- 4. Slide-over Records Editor Drawer -->
      ${getDnsRecordsDrawerHTML()}

    </div>
  `;
}

// ==========================================
// 4. EVENT BINDINGS & LIFECYCLE
// ==========================================

export function setupDnsZonesEvents(onNavigate) {
  createIcons({ icons });

  const tableContainer = document.getElementById('dns-table-container');
  const drawer = document.getElementById('dns-records-drawer');
  const closeDrawerBtn = document.getElementById('close-dns-drawer-btn');
  const drawerDoneBtn = document.getElementById('drawer-dns-done-btn');
  const drawerBackdrop = document.getElementById('dns-records-backdrop');
  let activeZone = null;

  const closeDrawer = () => {
    if (drawer) drawer.classList.add('hidden');
    activeZone = null;
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

  const renderDrawerRecords = () => {
    if (!activeZone) return;
    const tbody = document.getElementById('drawer-records-tbody');
    if (!tbody) return;

    tbody.innerHTML = activeZone.records.map(rec => `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
        <td class="py-2 px-3 font-semibold text-zinc-900 dark:text-white">${rec.type}</td>
        <td class="py-2 px-3 text-zinc-700 dark:text-zinc-300">${rec.name}</td>
        <td class="py-2 px-3 text-zinc-600 dark:text-zinc-400 break-all max-w-xs">${rec.content}</td>
        <td class="py-2 px-3 text-zinc-500">${rec.ttl}s</td>
        <td class="py-2 px-3 text-right">
          <button type="button" class="del-rec-btn text-zinc-400 hover:text-rose-500 p-1 cursor-pointer" data-rec-id="${rec.id}">
            <i data-lucide="trash" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      </tr>
    `).join('');

    createIcons({ icons });

    // Wire record deletes
    const delBtns = tbody.querySelectorAll('.del-rec-btn');
    delBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-rec-id');
        activeZone.records = activeZone.records.filter(r => r.id !== id);
        renderDrawerRecords();
        refreshTable();
      };
    });
  };

  const openDrawer = (zone) => {
    if (!drawer) return;
    activeZone = zone;
    const stEl = document.getElementById('drawer-zone-status');
    const prEl = document.getElementById('drawer-zone-provider');
    const dmEl = document.getElementById('drawer-zone-domain');
    const metaEl = document.getElementById('drawer-zone-meta');

    if (stEl) {
      if (zone.status === 'active') {
        stEl.textContent = 'Active';
        stEl.className = 'text-xs font-mono font-semibold text-emerald-500';
      } else if (zone.status === 'propagating') {
        stEl.textContent = 'Propagating';
        stEl.className = 'text-xs font-mono font-semibold text-amber-500';
      } else {
        stEl.textContent = 'Error';
        stEl.className = 'text-xs font-mono font-semibold text-rose-500';
      }
    }

    if (prEl) prEl.textContent = zone.provider;
    if (dmEl) dmEl.textContent = zone.domain;
    if (metaEl) metaEl.textContent = `SOA Serial: ${zone.serial} • ${zone.records.length} Records`;

    renderDrawerRecords();

    // Wire Add Record Form
    const addForm = document.getElementById('drawer-add-record-form');
    if (addForm) {
      addForm.onsubmit = (e) => {
        e.preventDefault();
        const type = document.getElementById('record-type-input')?.value || 'A';
        const name = document.getElementById('record-name-input')?.value.trim() || '@';
        const content = document.getElementById('record-content-input')?.value.trim();

        if (!content) return;

        activeZone.records.push({
          id: `rec-${Date.now()}`,
          type,
          name,
          content,
          ttl: 3600
        });

        addForm.reset();
        renderDrawerRecords();
        refreshTable();
      };
    }

    drawer.classList.remove('hidden');
    createIcons({ icons });
  };

  const refreshTable = () => {
    if (tableContainer) {
      const filtered = getFilteredZones();
      tableContainer.innerHTML = getDnsTableHTML(filtered, currentFilter, currentSearch);
      createIcons({ icons });
      attachTableEvents();
    }
  };

  const attachTableEvents = () => {
    // Filter Tabs
    const filterBtns = document.querySelectorAll('.dns-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        currentFilter = btn.getAttribute('data-dns-filter') || 'all';
        refreshTable();
      };
    });

    // Search Input
    const searchInput = document.getElementById('dns-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        currentSearch = e.target.value;
        refreshTable();
      };
    }

    // Records button
    const manageBtns = document.querySelectorAll('.dns-manage-btn');
    manageBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-zone-id');
        const zone = zonesList.find(z => z.id === id);
        if (zone) openDrawer(zone);
      };
    });

    // Delete zone
    const deleteBtns = document.querySelectorAll('.dns-delete-btn');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-zone-id');
        const zone = zonesList.find(z => z.id === id);
        if (zone && confirm(`Permanently delete DNS zone "${zone.domain}"? This will stop all domain resolution.`)) {
          zonesList = zonesList.filter(z => z.id !== id);
          refreshTable();
        }
      };
    });
  };

  attachTableEvents();

  // Create Zone Modal logic
  const createModal = document.getElementById('create-zone-modal');
  const openCreateBtn = document.getElementById('open-create-zone-btn');
  const closeCreateBtn = document.getElementById('close-create-zone-modal-btn');
  const cancelCreateBtn = document.getElementById('cancel-create-zone-btn');
  const createForm = document.getElementById('create-zone-form');

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
      const domain = document.getElementById('modal-zone-domain-input')?.value.trim();
      const provider = document.getElementById('modal-zone-provider-select')?.value || 'Hostlab Anycast DNS';
      const client = document.getElementById('modal-zone-client-name')?.value.trim();
      const clientEmail = document.getElementById('modal-zone-client-email')?.value.trim();
      const dnssec = document.getElementById('modal-zone-dnssec-toggle')?.checked ?? true;

      if (!domain || !client || !clientEmail) return;

      const newZone = {
        id: `zone-${Date.now()}`,
        domain,
        type: 'Primary Authoritative',
        provider,
        client,
        clientEmail,
        dnssec,
        serial: parseInt(`${new Date().toISOString().slice(0, 10).replace(/-/g, '')}01`),
        queries: '0',
        status: 'propagating',
        records: [
          { id: `rec-${Date.now()}-1`, type: 'A', name: '@', content: '185.190.140.22', ttl: 3600 },
          { id: `rec-${Date.now()}-2`, type: 'CNAME', name: 'www', content: domain, ttl: 3600 }
        ]
      };

      zonesList.unshift(newZone);
      closeCreate();
      refreshTable();
    };
  }
}

export function cleanupDnsZones() {
  currentFilter = 'all';
  currentSearch = '';
}
