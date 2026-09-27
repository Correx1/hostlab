import { createIcons, icons } from 'lucide';

/**
 * Hostlab SSL Certificates Module
 * Dedicated standalone module for SSL/TLS certificate management, automated ACME renewals,
 * and cryptographic validation.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const sslStats = {
  totalCerts: 1284,
  validCerts: 1264,
  expiringSoon: 17,
  failedValidation: 3,
  autoRenewPercentage: '98.7%'
};

export const initialCertificates = [
  {
    id: 'cert-301',
    domain: 'techflow-media.com',
    sans: ['techflow-media.com', 'www.techflow-media.com', 'api.techflow-media.com'],
    issuer: "Let's Encrypt",
    type: 'DV Wildcard',
    keyType: 'ECDSA P-256',
    serial: '04:BA:88:2E:7C:19:90:3A',
    fingerprint: '3F:7A:B2:91:C4:08:92:10:E4:31:8B:22:90:1C:DF:88',
    issuedDate: '2024-03-01',
    expiryDate: '2024-05-30',
    daysLeft: 68,
    autoRenew: true,
    challengeType: 'DNS-01 (Automated)',
    status: 'valid' // valid | expiring | failed | issuing
  },
  {
    id: 'cert-302',
    domain: 'apexstudios.design',
    sans: ['apexstudios.design', 'cdn.apexstudios.design'],
    issuer: 'Cloudflare Inc',
    type: 'Origin CA',
    keyType: 'RSA 2048',
    serial: '19:42:01:DF:AA:08:71:BC',
    fingerprint: '8A:14:FE:90:22:45:11:09:CB:77:3A:90:AA:12:43:08',
    issuedDate: '2023-11-15',
    expiryDate: '2024-11-15',
    daysLeft: 232,
    autoRenew: true,
    challengeType: 'Origin Managed',
    status: 'valid'
  },
  {
    id: 'cert-303',
    domain: 'greenleaf-organics.co.uk',
    sans: ['greenleaf-organics.co.uk', 'www.greenleaf-organics.co.uk'],
    issuer: "Let's Encrypt",
    type: 'DV Single',
    keyType: 'RSA 2048',
    serial: '08:99:32:AE:55:10:98:C1',
    fingerprint: '11:45:90:AE:32:88:FE:09:44:91:02:CB:AA:87:65:19',
    issuedDate: '2024-01-05',
    expiryDate: '2024-04-05',
    daysLeft: 14,
    autoRenew: true,
    challengeType: 'HTTP-01 (Webroot)',
    status: 'expiring'
  },
  {
    id: 'cert-304',
    domain: 'cryptotrack-api.io',
    sans: ['cryptotrack-api.io', 'gateway.cryptotrack-api.io'],
    issuer: 'ZeroSSL',
    type: 'DV Multi-Domain',
    keyType: 'ECDSA P-384',
    serial: '77:1A:BC:30:88:94:01:FE',
    fingerprint: '99:81:3A:76:CD:45:12:90:BB:43:11:AE:09:88:54:21',
    issuedDate: '2024-02-18',
    expiryDate: '2024-05-18',
    daysLeft: 54,
    autoRenew: true,
    challengeType: 'DNS-01 (Cloudflare)',
    status: 'valid'
  },
  {
    id: 'cert-305',
    domain: 'pulsecreative.de',
    sans: ['pulsecreative.de'],
    issuer: "Let's Encrypt",
    type: 'DV Single',
    keyType: 'RSA 2048',
    serial: '01:FF:84:2A:90:12:44:00',
    fingerprint: '44:90:12:BC:66:32:11:89:FA:01:45:67:88:90:12:33',
    issuedDate: '2023-12-05',
    expiryDate: '2024-03-05',
    daysLeft: 3,
    autoRenew: false,
    challengeType: 'HTTP-01 (Webroot)',
    status: 'expiring'
  },
  {
    id: 'cert-306',
    domain: 'nordiclogistics.se',
    sans: ['nordiclogistics.se', 'hub.nordiclogistics.se'],
    issuer: 'DigiCert Global',
    type: 'OV Commercial',
    keyType: 'RSA 4096',
    serial: '55:90:1A:FE:22:87:41:99',
    fingerprint: '77:34:90:11:AC:54:88:21:45:90:BB:12:00:99:32:FE',
    issuedDate: '2023-04-10',
    expiryDate: '2024-04-10',
    daysLeft: 18,
    autoRenew: false,
    challengeType: 'Manual CSR Upload',
    status: 'expiring'
  },
  {
    id: 'cert-307',
    domain: 'aurora-fashion.com',
    sans: ['aurora-fashion.com'],
    issuer: "Let's Encrypt",
    type: 'DV Single',
    keyType: 'ECDSA P-256',
    serial: '00:00:00:00:00:00:00:00',
    fingerprint: 'Pending Validation',
    issuedDate: '—',
    expiryDate: '—',
    daysLeft: 0,
    autoRenew: true,
    challengeType: 'DNS-01 (Pending)',
    status: 'failed',
    failureReason: 'DNS CAA Record prohibits Let’s Encrypt issuance'
  },
  {
    id: 'cert-308',
    domain: 'zenith-consulting.net',
    sans: ['zenith-consulting.net', 'www.zenith-consulting.net'],
    issuer: "Let's Encrypt",
    type: 'DV Single',
    keyType: 'RSA 2048',
    serial: '99:11:22:33:44:55:66:77',
    fingerprint: '88:22:11:44:55:99:00:11:AA:BB:CC:DD:EE:FF:00:11',
    issuedDate: '2023-11-20',
    expiryDate: '2024-02-20',
    daysLeft: -34,
    autoRenew: false,
    challengeType: 'HTTP-01 (Webroot)',
    status: 'failed',
    failureReason: 'Account suspended - renewal challenge aborted'
  }
];

// In-memory state
let certsList = [...initialCertificates];
let currentFilter = 'all'; // all | valid | expiring | failed
let currentSearch = '';
let currentIssuerFilter = 'all';

function getFilteredCerts() {
  return certsList.filter(cert => {
    if (currentFilter !== 'all') {
      if (currentFilter === 'valid' && cert.status !== 'valid') return false;
      if (currentFilter === 'expiring' && cert.status !== 'expiring') return false;
      if (currentFilter === 'failed' && cert.status !== 'failed') return false;
    }
    if (currentIssuerFilter !== 'all' && !cert.issuer.toLowerCase().includes(currentIssuerFilter.toLowerCase())) {
      return false;
    }
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      return (
        cert.domain.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.type.toLowerCase().includes(q) ||
        cert.sans.some(san => san.toLowerCase().includes(q))
      );
    }
    return true;
  });
}

// ==========================================
// 2. VIEW TEMPLATES & COMPONENTS
// ==========================================

function getSslStatsCardsHTML() {
  const validCount = certsList.filter(c => c.status === 'valid').length;
  const expiringCount = certsList.filter(c => c.status === 'expiring').length;
  const failedCount = certsList.filter(c => c.status === 'failed').length;

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Card 1: Total Certificates -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            TLS 1.3 Active
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Total Active Certs
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${sslStats.totalCerts.toLocaleString()}
            </span>
            <span class="text-xs font-mono text-zinc-400">
              Across all virtual hosts
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            ${validCount} Valid • ECDSA & RSA Hybrid
          </div>
        </div>
      </div>

      <!-- Card 2: Auto-Renew Coverage -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="refresh-cw" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            ACME Bot
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Automated Renewals
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${sslStats.autoRenewPercentage}
            </span>
            <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              Zero-Downtime
            </span>
          </div>
          <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div class="bg-blue-500 h-full rounded-full" style="width: 98.7%"></div>
          </div>
        </div>
      </div>

      <!-- Card 3: Expiring Soon (<30 Days) -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="clock" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Attention Needed
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Expiring &lt; 30 Days
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${expiringCount}
            </span>
            <span class="text-xs font-mono text-amber-600 dark:text-amber-400">
              Queued for renewal
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            Auto-trigger scheduled 10 days before expiry
          </div>
        </div>
      </div>

      <!-- Card 4: Validation Issues -->
      <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
            <i data-lucide="alert-triangle" class="w-5 h-5"></i>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            CAA / Challenge
          </span>
        </div>
        <div class="mt-4">
          <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            Validation Issues
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              ${failedCount}
            </span>
            <span class="text-xs font-mono text-rose-600 dark:text-rose-400 font-medium">
              Action Required
            </span>
          </div>
          <div class="mt-2 text-xs text-zinc-500 truncate">
            DNS CAA or suspended domain barriers
          </div>
        </div>
      </div>

    </div>
  `;
}

function getSslTableHTML(certs, curFilter, curSearch, curIssuer) {
  const allCount = certsList.length;
  const validCount = certsList.filter(c => c.status === 'valid').length;
  const expiringCount = certsList.filter(c => c.status === 'expiring').length;
  const failedCount = certsList.filter(c => c.status === 'failed').length;

  return `
    <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
      
      <!-- Table Controls Bar -->
      <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button 
            type="button" 
            data-ssl-filter="all"
            class="ssl-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            All Certs (${allCount})
          </button>
          <button 
            type="button" 
            data-ssl-filter="valid"
            class="ssl-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'valid' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Valid (${validCount})
          </button>
          <button 
            type="button" 
            data-ssl-filter="expiring"
            class="ssl-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'expiring' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Expiring Soon (${expiringCount})
          </button>
          <button 
            type="button" 
            data-ssl-filter="failed"
            class="ssl-filter-btn px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${curFilter === 'failed' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'}"
          >
            Issues (${failedCount})
          </button>
        </div>

        <!-- Search & Issuer Filter -->
        <div class="flex items-center gap-3">
          <div class="relative flex-1 sm:w-60">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="ssl-search-input"
              value="${curSearch}"
              placeholder="Search domain, issuer, SAN..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <select 
            id="ssl-issuer-select"
            class="px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-zinc-500 font-mono"
          >
            <option value="all" ${curIssuer === 'all' ? 'selected' : ''}>All Issuers</option>
            <option value="let's encrypt" ${curIssuer === "let's encrypt" ? 'selected' : ''}>Let's Encrypt</option>
            <option value="zerossl" ${curIssuer === 'zerossl' ? 'selected' : ''}>ZeroSSL</option>
            <option value="cloudflare" ${curIssuer === 'cloudflare' ? 'selected' : ''}>Cloudflare Origin</option>
            <option value="digicert" ${curIssuer === 'digicert' ? 'selected' : ''}>DigiCert</option>
          </select>
        </div>

      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <th class="py-3 px-4 sm:px-6">Domain & Alternative Names</th>
              <th class="py-3 px-4">Issuer (CA)</th>
              <th class="py-3 px-4">Type</th>
              <th class="py-3 px-4">Validity</th>
              <th class="py-3 px-4">Auto-Renew</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
            ${certs.length === 0 ? `
              <tr>
                <td colspan="7" class="py-12 text-center text-zinc-500">
                  <div class="flex flex-col items-center justify-center">
                    <i data-lucide="shield-off" class="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-2"></i>
                    <p class="text-sm font-medium text-zinc-900 dark:text-white">No SSL certificates found</p>
                    <p class="text-xs text-zinc-400 mt-1">Try modifying your filter or search terms.</p>
                  </div>
                </td>
              </tr>
            ` : certs.map(cert => {
              // Status text only, colored, no background pill
              let statusText = '';
              if (cert.status === 'valid') {
                statusText = `<span class="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400">Valid</span>`;
              } else if (cert.status === 'expiring') {
                statusText = `<span class="text-xs font-mono font-semibold text-amber-500 dark:text-amber-400">Expiring Soon</span>`;
              } else if (cert.status === 'failed') {
                statusText = `<span class="text-xs font-mono font-semibold text-rose-500 dark:text-rose-400" title="${cert.failureReason || 'Failed'}">Validation Error</span>`;
              } else {
                statusText = `<span class="text-xs font-mono font-semibold text-blue-500 dark:text-blue-400">Issuing</span>`;
              }

              // Validity formatted with numbers only
              let validityDisplay = '';
              if (cert.daysLeft > 0) {
                validityDisplay = `<span class="font-mono text-xs ${cert.daysLeft <= 30 ? 'text-amber-500 dark:text-amber-400 font-semibold' : 'text-zinc-900 dark:text-zinc-100'}">${cert.daysLeft} days</span>`;
              } else if (cert.daysLeft === 0) {
                validityDisplay = `<span class="font-mono text-xs text-zinc-400">Pending</span>`;
              } else {
                validityDisplay = `<span class="font-mono text-xs text-rose-500 font-semibold">Expired ${Math.abs(cert.daysLeft)}d ago</span>`;
              }

              return `
                <tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Domain & SANs -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="font-medium text-zinc-900 dark:text-white flex items-center gap-1.5 font-mono">
                      <span>${cert.domain}</span>
                    </div>
                    <div class="text-[11px] font-mono text-zinc-400 mt-0.5 truncate max-w-xs">
                      ${cert.sans.length > 1 ? `+${cert.sans.length - 1} SANs (${cert.sans.slice(1).join(', ')})` : 'Single SAN'}
                    </div>
                  </td>

                  <!-- Issuer (Plain text, no color) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${cert.issuer}
                  </td>

                  <!-- Type (Plain text, no color) -->
                  <td class="py-3.5 px-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    ${cert.type}
                  </td>

                  <!-- Validity (Clean numbers) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${validityDisplay}
                    <div class="text-[10px] font-mono text-zinc-400 mt-0.5">
                      Exp: ${cert.expiryDate}
                    </div>
                  </td>

                  <!-- Auto-Renew (Plain text) -->
                  <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                    ${cert.autoRenew ? '<span class="text-zinc-800 dark:text-zinc-200">Enabled</span>' : '<span class="text-zinc-400">Manual</span>'}
                  </td>

                  <!-- Status (Text Only, Colored) -->
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${statusText}
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <!-- Inspect details button -->
                      <button 
                        type="button" 
                        class="ssl-inspect-btn px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        data-cert-id="${cert.id}"
                        title="View Certificate Details & Fingerprint"
                      >
                        Inspect
                      </button>

                      <!-- Force renew button -->
                      <button 
                        type="button" 
                        class="ssl-renew-btn p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        data-cert-id="${cert.id}"
                        title="Renew Certificate via ACME"
                      >
                        <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                      </button>

                      <!-- Revoke / Delete -->
                      <button 
                        type="button" 
                        class="ssl-delete-btn p-1.5 rounded hover:bg-rose-500/10 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        data-cert-id="${cert.id}"
                        title="Revoke / Delete Certificate"
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
          Showing <span class="text-zinc-900 dark:text-white font-semibold">${certs.length}</span> of ${allCount} certificates
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

function getSslDetailsDrawerHTML() {
  return `
    <div id="ssl-details-drawer" class="fixed inset-0 z-50 overflow-hidden hidden transition-all duration-300">
      <!-- Backdrop -->
      <div id="ssl-details-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-lg bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto custom-scrollbar">
          
          <div>
            <!-- Drawer Header -->
            <div class="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <div class="flex items-center gap-2">
                  <span id="drawer-cert-issuer" class="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300">Let's Encrypt</span>
                  <span id="drawer-cert-status" class="text-xs font-mono font-semibold text-emerald-500">Valid</span>
                </div>
                <h3 id="drawer-cert-domain" class="text-lg font-bold font-display text-zinc-900 dark:text-white mt-1">techflow-media.com</h3>
                <p id="drawer-cert-type" class="text-xs font-mono text-zinc-400 mt-0.5">DV Wildcard Certificate</p>
              </div>
              <button type="button" id="close-ssl-drawer-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Certificate Specs Grid -->
            <div class="mt-6 space-y-4">
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  CRYPTOGRAPHIC DETAILS
                </div>
                
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span class="text-zinc-400 block text-[11px]">KEY ALGORITHM</span>
                    <span id="drawer-cert-key" class="font-mono font-medium text-zinc-900 dark:text-zinc-100">ECDSA P-256</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">DAYS REMAINING</span>
                    <span id="drawer-cert-days" class="font-mono font-semibold text-zinc-900 dark:text-zinc-100">68 days</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">ISSUED DATE</span>
                    <span id="drawer-cert-issued" class="font-mono text-zinc-800 dark:text-zinc-200">2024-03-01</span>
                  </div>
                  <div>
                    <span class="text-zinc-400 block text-[11px]">EXPIRATION DATE</span>
                    <span id="drawer-cert-expires" class="font-mono text-zinc-800 dark:text-zinc-200">2024-05-30</span>
                  </div>
                </div>

                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <span class="text-zinc-400 block text-[11px]">CHALLENGE VERIFICATION</span>
                  <span id="drawer-cert-challenge" class="font-mono text-xs text-zinc-800 dark:text-zinc-200">DNS-01 (Automated)</span>
                </div>

                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <span class="text-zinc-400 block text-[11px]">SERIAL NUMBER</span>
                  <span id="drawer-cert-serial" class="font-mono text-xs text-zinc-600 dark:text-zinc-400 break-all">04:BA:88:2E:7C:19:90:3A</span>
                </div>

                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <span class="text-zinc-400 block text-[11px]">SHA-256 FINGERPRINT</span>
                  <span id="drawer-cert-fingerprint" class="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 break-all">3F:7A:B2:91:C4:08:92:10:E4:31:8B:22:90:1C:DF:88</span>
                </div>
              </div>

              <!-- Subject Alternative Names (SANs) -->
              <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  SUBJECT ALTERNATIVE NAMES (SANS)
                </div>
                <div id="drawer-cert-sans-list" class="space-y-1 font-mono text-xs text-zinc-800 dark:text-zinc-200">
                  <!-- Injected via JS -->
                </div>
              </div>

              <!-- Failure notice if any -->
              <div id="drawer-cert-failure-box" class="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 space-y-1 hidden">
                <div class="text-xs font-mono font-bold text-rose-500 uppercase tracking-wide">
                  ISSUANCE BARRIER / DIAGNOSTIC
                </div>
                <p id="drawer-cert-failure-text" class="text-xs text-rose-400">
                  DNS CAA Record prohibits Let’s Encrypt issuance.
                </p>
              </div>
            </div>
          </div>

          <!-- Drawer Footer Actions -->
          <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
            <button 
              type="button" 
              id="drawer-force-renew-btn"
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Force Immediate Renewal
            </button>
            <button 
              type="button" 
              id="drawer-ssl-done-btn"
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

function getIssueSslModalHTML() {
  return `
    <div id="issue-ssl-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden transition-opacity duration-200">
      <div class="relative w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-5">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white">
              Issue / Install SSL Certificate
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Request automated ACME certificate or upload custom commercial keys.
            </p>
          </div>
          <button 
            type="button" 
            id="close-issue-ssl-modal-btn"
            class="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Form Body -->
        <form id="issue-ssl-form" class="space-y-4">
          
          <!-- Primary Domain -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              PRIMARY HOSTNAME / DOMAIN
            </label>
            <input 
              type="text" 
              id="modal-ssl-domain-input"
              required
              placeholder="e.g. domain.com or *.domain.com"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <!-- Certificate Authority Provider -->
          <div>
            <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              CERTIFICATE AUTHORITY (CA)
            </label>
            <select 
              id="modal-ssl-provider-select"
              class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
            >
              <option value="Let's Encrypt">Let's Encrypt (Free Automated ACME)</option>
              <option value="ZeroSSL">ZeroSSL (EAB Credentials)</option>
              <option value="Cloudflare Inc">Cloudflare Origin Certificate (15 Years)</option>
              <option value="Custom CSR">Custom Commercial Certificate (Manual Paste)</option>
            </select>
          </div>

          <!-- Challenge Validation Method -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                VALIDATION METHOD
              </label>
              <select 
                id="modal-ssl-challenge-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                <option value="DNS-01 (Automated)">DNS-01 Record (Supports Wildcards)</option>
                <option value="HTTP-01 (Webroot)">HTTP-01 Challenge (Standard Web)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                KEY ENCRYPTION TYPE
              </label>
              <select 
                id="modal-ssl-key-select"
                class="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
              >
                <option value="ECDSA P-256">ECDSA P-256 (High Performance)</option>
                <option value="RSA 2048">RSA 2048 (Legacy Compatibility)</option>
                <option value="RSA 4096">RSA 4096 (Maximum Strength)</option>
              </select>
            </div>
          </div>

          <!-- Auto-renew Setting -->
          <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <i data-lucide="refresh-cw" class="w-4 h-4 text-emerald-500"></i>
              <div>
                <div class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Automatic ACME 90-Day Renewal</div>
                <div class="text-[11px] text-zinc-400">Trigger background renewals 20 days prior to expiration</div>
              </div>
            </div>
            <input type="checkbox" id="modal-ssl-renew-toggle" checked class="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4 cursor-pointer" />
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-2">
            <button 
              type="button" 
              id="cancel-issue-ssl-btn"
              class="px-3.5 py-2 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 text-xs font-mono font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Issue Certificate
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

export function renderSslHTML() {
  const filteredCerts = getFilteredCerts();

  return `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            HOSTING / SSL CERTIFICATES
          </div>
          <h1 class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mt-1">
            SSL / TLS Certificates
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Automated ACME zero-touch renewal, Let's Encrypt validation, CAA record checks, and cryptographic cipher control.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-issue-ssl-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-mono font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Issue SSL Certificate</span>
          </button>
        </div>
      </div>

      <!-- 1. Top KPI Metrics -->
      ${getSslStatsCardsHTML()}

      <!-- 2. Interactive SSL Table -->
      <div id="ssl-table-container">
        ${getSslTableHTML(filteredCerts, currentFilter, currentSearch, currentIssuerFilter)}
      </div>

      <!-- 3. Issue / Install SSL Modal -->
      ${getIssueSslModalHTML()}

      <!-- 4. Slide-over Details Drawer -->
      ${getSslDetailsDrawerHTML()}

    </div>
  `;
}

// ==========================================
// 4. EVENT BINDINGS & LIFECYCLE
// ==========================================

export function setupSslEvents(onNavigate) {
  createIcons({ icons });

  const tableContainer = document.getElementById('ssl-table-container');
  const drawer = document.getElementById('ssl-details-drawer');
  const closeDrawerBtn = document.getElementById('close-ssl-drawer-btn');
  const drawerDoneBtn = document.getElementById('drawer-ssl-done-btn');
  const drawerBackdrop = document.getElementById('ssl-details-backdrop');

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

  const openCertDrawer = (cert) => {
    if (!drawer) return;
    const isEl = document.getElementById('drawer-cert-issuer');
    const stEl = document.getElementById('drawer-cert-status');
    const dmEl = document.getElementById('drawer-cert-domain');
    const tpEl = document.getElementById('drawer-cert-type');
    const keyEl = document.getElementById('drawer-cert-key');
    const daysEl = document.getElementById('drawer-cert-days');
    const issEl = document.getElementById('drawer-cert-issued');
    const expEl = document.getElementById('drawer-cert-expires');
    const chEl = document.getElementById('drawer-cert-challenge');
    const serEl = document.getElementById('drawer-cert-serial');
    const fpEl = document.getElementById('drawer-cert-fingerprint');
    const sansContainer = document.getElementById('drawer-cert-sans-list');
    const failureBox = document.getElementById('drawer-cert-failure-box');
    const failureText = document.getElementById('drawer-cert-failure-text');

    if (isEl) isEl.textContent = cert.issuer;
    if (stEl) {
      if (cert.status === 'valid') {
        stEl.textContent = 'Valid';
        stEl.className = 'text-xs font-mono font-semibold text-emerald-500';
      } else if (cert.status === 'expiring') {
        stEl.textContent = 'Expiring Soon';
        stEl.className = 'text-xs font-mono font-semibold text-amber-500';
      } else if (cert.status === 'failed') {
        stEl.textContent = 'Validation Error';
        stEl.className = 'text-xs font-mono font-semibold text-rose-500';
      } else {
        stEl.textContent = 'Issuing';
        stEl.className = 'text-xs font-mono font-semibold text-blue-500';
      }
    }
    if (dmEl) dmEl.textContent = cert.domain;
    if (tpEl) tpEl.textContent = `${cert.type} Certificate`;
    if (keyEl) keyEl.textContent = cert.keyType;
    if (daysEl) {
      daysEl.textContent = cert.daysLeft > 0 ? `${cert.daysLeft} days` : cert.daysLeft === 0 ? 'Pending' : `Expired ${Math.abs(cert.daysLeft)}d ago`;
    }
    if (issEl) issEl.textContent = cert.issuedDate;
    if (expEl) expEl.textContent = cert.expiryDate;
    if (chEl) chEl.textContent = cert.challengeType;
    if (serEl) serEl.textContent = cert.serial;
    if (fpEl) fpEl.textContent = cert.fingerprint;

    if (sansContainer) {
      sansContainer.innerHTML = cert.sans.map(san => `
        <div class="flex items-center gap-1.5 py-0.5">
          <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i>
          <span>${san}</span>
        </div>
      `).join('');
    }

    if (failureBox && failureText) {
      if (cert.failureReason) {
        failureBox.classList.remove('hidden');
        failureText.textContent = cert.failureReason;
      } else {
        failureBox.classList.add('hidden');
      }
    }

    const forceRenewBtn = document.getElementById('drawer-force-renew-btn');
    if (forceRenewBtn) {
      forceRenewBtn.onclick = () => {
        forceRenewBtn.textContent = 'Requesting ACME Challenge...';
        setTimeout(() => {
          cert.status = 'valid';
          cert.daysLeft = 90;
          cert.expiryDate = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];
          delete cert.failureReason;
          forceRenewBtn.textContent = 'Renewed Successfully!';
          refreshSslTable();
          setTimeout(() => {
            openCertDrawer(cert);
          }, 400);
        }, 800);
      };
    }

    drawer.classList.remove('hidden');
    createIcons({ icons });
  };

  const refreshSslTable = () => {
    if (tableContainer) {
      const filtered = getFilteredCerts();
      tableContainer.innerHTML = getSslTableHTML(filtered, currentFilter, currentSearch, currentIssuerFilter);
      createIcons({ icons });
      attachTableEvents();
    }
  };

  const attachTableEvents = () => {
    // Filter Tabs
    const filterBtns = document.querySelectorAll('.ssl-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        currentFilter = btn.getAttribute('data-ssl-filter') || 'all';
        refreshSslTable();
      };
    });

    // Search Input
    const searchInput = document.getElementById('ssl-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        currentSearch = e.target.value;
        refreshSslTable();
      };
    }

    // Issuer Select
    const issuerSelect = document.getElementById('ssl-issuer-select');
    if (issuerSelect) {
      issuerSelect.onchange = (e) => {
        currentIssuerFilter = e.target.value;
        refreshSslTable();
      };
    }

    // Inspect buttons
    const inspectBtns = document.querySelectorAll('.ssl-inspect-btn');
    inspectBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-cert-id');
        const cert = certsList.find(c => c.id === id);
        if (cert) openCertDrawer(cert);
      };
    });

    // Force Renew buttons in table
    const renewBtns = document.querySelectorAll('.ssl-renew-btn');
    renewBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-cert-id');
        const cert = certsList.find(c => c.id === id);
        if (cert) {
          cert.status = 'valid';
          cert.daysLeft = 90;
          cert.expiryDate = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];
          delete cert.failureReason;
          refreshSslTable();
        }
      };
    });

    // Revoke / Delete buttons
    const deleteBtns = document.querySelectorAll('.ssl-delete-btn');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-cert-id');
        const cert = certsList.find(c => c.id === id);
        if (cert && confirm(`Are you sure you want to revoke and delete the SSL certificate for ${cert.domain}?`)) {
          certsList = certsList.filter(c => c.id !== id);
          refreshSslTable();
        }
      };
    });
  };

  attachTableEvents();

  // Issue Certificate Modal logic
  const issueModal = document.getElementById('issue-ssl-modal');
  const openIssueBtn = document.getElementById('open-issue-ssl-btn');
  const closeIssueBtn = document.getElementById('close-issue-ssl-modal-btn');
  const cancelIssueBtn = document.getElementById('cancel-issue-ssl-btn');
  const issueForm = document.getElementById('issue-ssl-form');

  if (openIssueBtn && issueModal) {
    openIssueBtn.onclick = () => issueModal.classList.remove('hidden');
  }

  const closeIssue = () => {
    if (issueModal) issueModal.classList.add('hidden');
    if (issueForm) issueForm.reset();
  };

  if (closeIssueBtn) closeIssueBtn.onclick = closeIssue;
  if (cancelIssueBtn) cancelIssueBtn.onclick = closeIssue;

  if (issueForm) {
    issueForm.onsubmit = (e) => {
      e.preventDefault();
      const domain = document.getElementById('modal-ssl-domain-input')?.value.trim();
      const provider = document.getElementById('modal-ssl-provider-select')?.value || "Let's Encrypt";
      const challenge = document.getElementById('modal-ssl-challenge-select')?.value || 'DNS-01 (Automated)';
      const keyType = document.getElementById('modal-ssl-key-select')?.value || 'ECDSA P-256';
      const autoRenew = document.getElementById('modal-ssl-renew-toggle')?.checked ?? true;

      if (!domain) return;

      const isWildcard = domain.startsWith('*.');
      const baseDomain = isWildcard ? domain.slice(2) : domain;
      const sans = isWildcard ? [domain, baseDomain] : [domain, `www.${domain}`];

      const newCert = {
        id: `cert-${Date.now()}`,
        domain,
        sans,
        issuer: provider,
        type: isWildcard ? 'DV Wildcard' : 'DV Single',
        keyType,
        serial: `${Math.floor(Math.random() * 90 + 10)}:${Math.floor(Math.random() * 90 + 10)}:${Math.floor(Math.random() * 90 + 10)}:${Math.floor(Math.random() * 90 + 10)}`,
        fingerprint: 'AC:77:90:12:44:91:BB:00:23:45:67:89:01:23:45:67',
        issuedDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
        daysLeft: 90,
        autoRenew,
        challengeType: challenge,
        status: 'valid'
      };

      certsList.unshift(newCert);
      closeIssue();
      refreshSslTable();
    };
  }
}

export function cleanupSsl() {
  currentFilter = 'all';
  currentSearch = '';
  currentIssuerFilter = 'all';
}
