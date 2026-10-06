import { customerDomains } from '../db.js';
import { createIcons, icons } from 'lucide';

// Module state
let activeFilter = 'all';
let searchQuery = '';
let selectedDomain = null;
let isRegisterModalOpen = false;
let isAddRecordOpen = false;
let showAuthCode = false;
let actionFeedback = null;
let isEditingNameservers = false;

export function renderUserDomains() {
  const filteredDomains = customerDomains.filter(dom => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'autorenew' && dom.autoRenew) ||
      (activeFilter === 'active' && dom.status.toLowerCase() === 'active');
    const matchesSearch = !searchQuery || 
      dom.domain.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dom.dns.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const allCount = customerDomains.length;
  const autoRenewCount = customerDomains.filter(d => d.autoRenew).length;

  return `
    <div class="space-y-6">
      
      <!-- 1. Header: Exact Admin Style -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold text-zinc-900 dark:text-white font-display tracking-tight">
              Domains &amp; DNS
            </h1>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your registered domains, nameservers, DNS zone records, and auto-renewal.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="register-domain-btn"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Register Domain</span>
          </button>
        </div>
      </div>

      <!-- 2. Stat Cards: Exact Admin Style -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Total Registered -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="globe" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Active Domains
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${customerDomains.length}
              </span>
              <span class="text-xs font-mono text-emerald-500 font-medium">Healthy</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              All domains active &amp; resolving
            </div>
          </div>
        </div>

        <!-- Auto-Renew Protected -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Auto-Renew Protection
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${autoRenewCount} / ${customerDomains.length}
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Protected against expiry lapsing
            </div>
          </div>
        </div>

        <!-- DNS Resolution -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="network" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              DNS Resolution
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                Global Edge
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Anycast network propagation &lt; 60s
            </div>
          </div>
        </div>

        <!-- Next Renewal -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="calendar" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Next Renewal
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                Aug 2026
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              clientflow.co (Aug 05, 2026)
            </div>
          </div>
        </div>

      </div>

      <!-- 3. Domains Table: Exact Admin Style -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
        
        <!-- Controls Bar -->
        <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <!-- Filter Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button 
              type="button" 
              data-dom-filter="all"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'all' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              All Domains (${allCount})
            </button>
            <button 
              type="button" 
              data-dom-filter="autorenew"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'autorenew' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              Auto-Renew (${autoRenewCount})
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="user-dom-search"
              value="${searchQuery}"
              placeholder="Search domain, DNS..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

        </div>

        <!-- Table Data -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                <th class="py-3 px-4 sm:px-6">Domain Name</th>
                <th class="py-3 px-4">Expiration Date</th>
                <th class="py-3 px-4">DNS Provider</th>
                <th class="py-3 px-4">Auto-Renew</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
              ${filteredDomains.length === 0 ? `
                <tr>
                  <td colspan="6" class="py-12 text-center text-zinc-500">
                    No domains found matching your criteria.
                  </td>
                </tr>
              ` : filteredDomains.map(dom => `
                <tr class="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Domain Name & Link -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="flex items-center gap-2">
                      <div class="font-semibold text-zinc-900 dark:text-white text-xs">
                        ${dom.domain}
                      </div>
                      <a 
                        href="https://${dom.domain}" 
                        target="_blank" 
                        class="text-zinc-400 hover:text-white transition-colors"
                        title="Visit site"
                      >
                        <i data-lucide="external-link" class="w-3 h-3"></i>
                      </a>
                    </div>
                    <div class="text-[11px] font-mono text-zinc-400 mt-0.5">
                      ${dom.registrar}
                    </div>
                  </td>

                  <!-- Expiration -->
                  <td class="py-3.5 px-4 font-mono text-zinc-700 dark:text-zinc-300">
                    ${dom.expires}
                  </td>

                  <!-- DNS -->
                  <td class="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                    <span class="inline-flex items-center gap-1.5">
                      <i data-lucide="shield" class="w-3.5 h-3.5 text-zinc-400"></i>
                      <span>${dom.dns}</span>
                    </span>
                  </td>

                  <!-- Auto-Renew -->
                  <td class="py-3.5 px-4">
                    <button 
                      type="button"
                      data-toggle-autorenew="${dom.id}"
                      class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                        dom.autoRenew 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700'
                      }"
                    >
                      <span class="w-1.5 h-1.5 rounded-full ${dom.autoRenew ? 'bg-emerald-500' : 'bg-zinc-500'}"></span>
                      <span>${dom.autoRenew ? 'Auto-Renew On' : 'Manual'}</span>
                    </button>
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ${dom.status}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <button 
                      type="button" 
                      data-manage-domain="${dom.id}"
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

      <!-- 4. Client Domain Management Drawer -->
      ${selectedDomain ? `
        <!-- Backdrop Overlay -->
        <div 
          id="dom-drawer-backdrop"
          class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        ></div>

        <!-- Drawer Content Shell -->
        <div 
          id="dom-drawer"
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
                  <h3 class="text-base font-bold font-display text-white tracking-tight">${selectedDomain.domain}</h3>
                  <div class="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-0.5">
                    <span class="text-emerald-400 font-semibold">● ${selectedDomain.status}</span>
                    <span>•</span>
                    <span>Expires ${selectedDomain.expires}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <a 
                  href="https://${selectedDomain.domain}" 
                  target="_blank" 
                  class="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 transition-colors cursor-pointer"
                  title="Visit Website"
                >
                  <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
                <button 
                  id="close-dom-drawer-btn"
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
                <button id="dismiss-dom-feedback-btn" class="text-emerald-500 hover:text-emerald-300">
                  <i data-lucide="x" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            ` : ''}

            <!-- Scrollable Content Body -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-xs font-sans">
              
              <!-- 1. Nameservers Card -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="server" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      Authoritative Nameservers
                    </h4>
                  </div>
                  <button 
                    type="button" 
                    id="toggle-edit-ns-btn"
                    class="text-[11px] font-mono text-zinc-300 hover:text-white cursor-pointer underline"
                  >
                    ${isEditingNameservers ? 'Cancel' : 'Change Nameservers'}
                  </button>
                </div>

                ${isEditingNameservers ? `
                  <form id="save-ns-form" class="space-y-3 font-mono">
                    <div>
                      <label class="block text-zinc-400 text-[11px] mb-1">Primary Nameserver (NS1)</label>
                      <input 
                        type="text" 
                        id="ns1-input" 
                        value="${selectedDomain.nameservers?.[0] || 'ns1.hostlabdns.com'}" 
                        class="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-zinc-600"
                      />
                    </div>
                    <div>
                      <label class="block text-zinc-400 text-[11px] mb-1">Secondary Nameserver (NS2)</label>
                      <input 
                        type="text" 
                        id="ns2-input" 
                        value="${selectedDomain.nameservers?.[1] || 'ns2.hostlabdns.com'}" 
                        class="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-zinc-600"
                      />
                    </div>
                    <div class="pt-1 flex justify-end gap-2">
                      <button type="submit" class="px-3 py-1.5 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold cursor-pointer">
                        Save Nameservers
                      </button>
                    </div>
                  </form>
                ` : `
                  <div class="space-y-2 font-mono">
                    ${(selectedDomain.nameservers || ['ns1.hostlabdns.com', 'ns2.hostlabdns.com']).map((ns, idx) => `
                      <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-200">
                        <span class="truncate">${ns}</span>
                        <button type="button" data-copy-text="${ns}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy">
                          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    `).join('')}
                  </div>
                `}
              </div>

              <!-- 2. DNS Zone Records Card -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="network" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      DNS Zone Records (${(selectedDomain.dnsRecords || []).length})
                    </h4>
                  </div>
                  <button 
                    type="button" 
                    id="toggle-add-record-btn"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors cursor-pointer"
                  >
                    <i data-lucide="plus" class="w-3 h-3"></i>
                    <span>${isAddRecordOpen ? 'Cancel' : 'Add Record'}</span>
                  </button>
                </div>

                <!-- Add Record Form Inline -->
                ${isAddRecordOpen ? `
                  <form id="add-dns-record-form" class="p-3.5 rounded bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs">
                    <div class="grid grid-cols-3 gap-2">
                      <div>
                        <label class="block text-zinc-400 text-[10px] mb-1">Type</label>
                        <select id="record-type-input" class="w-full px-2 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600">
                          <option value="A">A</option>
                          <option value="CNAME">CNAME</option>
                          <option value="TXT">TXT</option>
                          <option value="MX">MX</option>
                        </select>
                      </div>
                      <div class="col-span-2">
                        <label class="block text-zinc-400 text-[10px] mb-1">Name (Host)</label>
                        <input 
                          type="text" 
                          id="record-name-input" 
                          placeholder="@ or subdomain" 
                          required
                          class="w-full px-2 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="block text-zinc-400 text-[10px] mb-1">Target / Value</label>
                      <input 
                        type="text" 
                        id="record-content-input" 
                        placeholder="IP address or target hostname" 
                        required
                        class="w-full px-2 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                      />
                    </div>

                    <div class="flex items-center justify-end gap-2 pt-1">
                      <button type="submit" class="px-3 py-1.5 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold cursor-pointer">
                        Save Record
                      </button>
                    </div>
                  </form>
                ` : ''}

                <!-- Records List -->
                <div class="space-y-2 font-mono">
                  ${(selectedDomain.dnsRecords || []).length === 0 ? `
                    <div class="p-4 text-center text-zinc-500 bg-zinc-950 rounded border border-zinc-800">
                      No DNS records found for this domain zone.
                    </div>
                  ` : (selectedDomain.dnsRecords || []).map(rec => `
                    <div class="p-2.5 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3 text-xs">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-200 border border-zinc-700/80">
                          ${rec.type}
                        </span>
                        <div class="min-w-0">
                          <span class="text-white font-semibold">${rec.name}</span>
                          <span class="text-zinc-500 mx-1.5">→</span>
                          <span class="text-zinc-300 truncate">${rec.content}</span>
                        </div>
                      </div>

                      <button 
                        type="button" 
                        data-delete-record="${rec.id}"
                        class="text-zinc-500 hover:text-red-400 transition-colors p-1 cursor-pointer shrink-0"
                        title="Delete Record"
                      >
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- 3. Domain Security & Transfer Lock -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="lock" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      Transfer Lock &amp; Auth Code
                    </h4>
                  </div>
                  <span class="text-[10px] font-mono text-emerald-400">
                    ${selectedDomain.registrarLock ? 'Lock Enabled' : 'Unlocked'}
                  </span>
                </div>

                <div class="space-y-3 font-mono text-xs">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-white font-semibold">Registrar Transfer Lock</div>
                      <div class="text-[11px] text-zinc-500 mt-0.5">Prevents unauthorized external domain transfers.</div>
                    </div>
                    <button 
                      type="button" 
                      id="toggle-lock-btn"
                      class="px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                        selectedDomain.registrarLock 
                          ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' 
                          : 'bg-emerald-500 text-black font-semibold'
                      }"
                    >
                      ${selectedDomain.registrarLock ? 'Unlock Domain' : 'Lock Domain'}
                    </button>
                  </div>

                  <div class="pt-2 border-t border-zinc-800/80">
                    <span class="text-zinc-500 text-[11px] block mb-1">EPP / Transfer Authorization Code</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-200">
                      <span>${showAuthCode ? (selectedDomain.authCode || 'HL-AUTH-9921KD') : '••••••••••••••••'}</span>
                      <div class="flex items-center gap-2">
                        <button type="button" id="toggle-auth-code-btn" class="text-zinc-400 hover:text-white cursor-pointer" title="${showAuthCode ? 'Hide' : 'Show'}">
                          <i data-lucide="${showAuthCode ? 'eye-off' : 'eye'}" class="w-3.5 h-3.5"></i>
                        </button>
                        <button type="button" data-copy-text="${selectedDomain.authCode || 'HL-AUTH-9921KD'}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy Auth Code">
                          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <!-- Drawer Footer -->
          <div class="h-16 px-6 border-t border-zinc-800 flex items-center justify-between shrink-0 bg-black">
            <span class="text-[11px] font-mono text-zinc-500">
              Hostlab ICANN Registrar Partner
            </span>
            <div class="flex items-center gap-3">
              <button 
                type="button" 
                id="close-dom-drawer-footer-btn"
                class="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 5. Register Domain Modal -->
      ${isRegisterModalOpen ? `
        <!-- Backdrop -->
        <div id="register-domain-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"></div>
        
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div id="register-domain-modal" class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl text-white space-y-5">
            <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 class="text-base font-bold font-display text-white">Register New Domain</h3>
              <button id="close-register-modal-btn" class="text-zinc-400 hover:text-white cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <form id="register-domain-form" class="space-y-4 text-xs font-sans">
              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Domain Name</label>
                <div class="flex items-center gap-2">
                  <input 
                    type="text" 
                    id="register-domain-input" 
                    placeholder="e.g. startupflow.com" 
                    required
                    class="flex-1 px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono text-xs"
                  />
                </div>
              </div>

              <!-- TLD Chips -->
              <div>
                <label class="block text-zinc-400 mb-1.5 font-mono">Popular TLDs</label>
                <div class="grid grid-cols-4 gap-2 text-center font-mono">
                  <div class="p-2 rounded bg-zinc-900 border border-zinc-800">
                    <div class="font-bold text-white">.com</div>
                    <div class="text-[10px] text-zinc-400 mt-0.5">$12.99</div>
                  </div>
                  <div class="p-2 rounded bg-zinc-900 border border-zinc-800">
                    <div class="font-bold text-white">.io</div>
                    <div class="text-[10px] text-zinc-400 mt-0.5">$34.99</div>
                  </div>
                  <div class="p-2 rounded bg-zinc-900 border border-zinc-800">
                    <div class="font-bold text-white">.dev</div>
                    <div class="text-[10px] text-zinc-400 mt-0.5">$14.99</div>
                  </div>
                  <div class="p-2 rounded bg-zinc-900 border border-zinc-800">
                    <div class="font-bold text-white">.co</div>
                    <div class="text-[10px] text-zinc-400 mt-0.5">$22.00</div>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Registration Term</label>
                <select class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                  <option>1 Year (Standard)</option>
                  <option>2 Years (Save 10%)</option>
                  <option>3 Years (Save 15%)</option>
                </select>
              </div>

              <div class="flex items-center gap-2 pt-1 font-mono text-xs">
                <input type="checkbox" id="register-autorenew-input" checked class="rounded bg-zinc-900 border-zinc-800 text-white focus:ring-0 cursor-pointer" />
                <label for="register-autorenew-input" class="text-zinc-300 cursor-pointer">Enable auto-renewal</label>
              </div>

              <div class="pt-2 flex items-center justify-end gap-3">
                <button type="button" id="cancel-register-btn" class="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer">
                  Register &amp; Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

export function setupDomainsEvents(onRerender) {
  createIcons({ icons });

  // Filter tabs
  const filterBtns = document.querySelectorAll('[data-dom-filter]');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      activeFilter = btn.getAttribute('data-dom-filter');
      onRerender();
    };
  });

  // Search input
  const searchInput = document.getElementById('user-dom-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      onRerender();
      const newInput = document.getElementById('user-dom-search');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    };
  }

  // Manage Domain Click -> Open Drawer
  const manageBtns = document.querySelectorAll('[data-manage-domain]');
  manageBtns.forEach(btn => {
    btn.onclick = () => {
      const domId = btn.getAttribute('data-manage-domain');
      selectedDomain = customerDomains.find(d => d.id === domId) || null;
      actionFeedback = null;
      showAuthCode = false;
      isEditingNameservers = false;
      isAddRecordOpen = false;
      onRerender();
    };
  });

  // Toggle Auto-Renew from table
  const toggleAutoRenewBtns = document.querySelectorAll('[data-toggle-autorenew]');
  toggleAutoRenewBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const domId = btn.getAttribute('data-toggle-autorenew');
      const dom = customerDomains.find(d => d.id === domId);
      if (dom) {
        dom.autoRenew = !dom.autoRenew;
        onRerender();
      }
    };
  });

  // Toggle Auth Code show/hide
  const toggleAuthBtn = document.getElementById('toggle-auth-code-btn');
  if (toggleAuthBtn) {
    toggleAuthBtn.onclick = () => {
      showAuthCode = !showAuthCode;
      onRerender();
    };
  }

  // Toggle Edit Nameservers
  const toggleEditNsBtn = document.getElementById('toggle-edit-ns-btn');
  if (toggleEditNsBtn) {
    toggleEditNsBtn.onclick = () => {
      isEditingNameservers = !isEditingNameservers;
      onRerender();
    };
  }

  // Save Nameservers Form
  const saveNsForm = document.getElementById('save-ns-form');
  if (saveNsForm && selectedDomain) {
    saveNsForm.onsubmit = (e) => {
      e.preventDefault();
      const ns1 = document.getElementById('ns1-input');
      const ns2 = document.getElementById('ns2-input');
      if (ns1 && ns2) {
        selectedDomain.nameservers = [ns1.value.trim(), ns2.value.trim()];
        actionFeedback = `Nameservers updated for ${selectedDomain.domain}. Propagation underway!`;
        isEditingNameservers = false;
        onRerender();
      }
    };
  }

  // Toggle Lock Button
  const toggleLockBtn = document.getElementById('toggle-lock-btn');
  if (toggleLockBtn && selectedDomain) {
    toggleLockBtn.onclick = () => {
      selectedDomain.registrarLock = !selectedDomain.registrarLock;
      actionFeedback = `Domain transfer lock ${selectedDomain.registrarLock ? 'enabled' : 'disabled'} for ${selectedDomain.domain}!`;
      onRerender();
    };
  }

  // Toggle Add Record Inline Form
  const toggleAddRecBtn = document.getElementById('toggle-add-record-btn');
  if (toggleAddRecBtn) {
    toggleAddRecBtn.onclick = () => {
      isAddRecordOpen = !isAddRecordOpen;
      onRerender();
    };
  }

  // Add DNS Record Form
  const addRecForm = document.getElementById('add-dns-record-form');
  if (addRecForm && selectedDomain) {
    addRecForm.onsubmit = (e) => {
      e.preventDefault();
      const type = document.getElementById('record-type-input');
      const name = document.getElementById('record-name-input');
      const content = document.getElementById('record-content-input');

      if (type && name && content && name.value.trim() && content.value.trim()) {
        if (!selectedDomain.dnsRecords) selectedDomain.dnsRecords = [];
        selectedDomain.dnsRecords.push({
          id: `rec_${Date.now()}`,
          type: type.value,
          name: name.value.trim(),
          content: content.value.trim(),
          ttl: 'Auto'
        });
        actionFeedback = `DNS record ${type.value} ${name.value.trim()} added!`;
        isAddRecordOpen = false;
        onRerender();
      }
    };
  }

  // Delete Record Buttons
  const deleteRecBtns = document.querySelectorAll('[data-delete-record]');
  deleteRecBtns.forEach(btn => {
    btn.onclick = () => {
      const recId = btn.getAttribute('data-delete-record');
      if (selectedDomain && selectedDomain.dnsRecords) {
        selectedDomain.dnsRecords = selectedDomain.dnsRecords.filter(r => r.id !== recId);
        actionFeedback = `DNS record removed.`;
        onRerender();
      }
    };
  });

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
  const dismissBtn = document.getElementById('dismiss-dom-feedback-btn');
  if (dismissBtn) {
    dismissBtn.onclick = () => {
      actionFeedback = null;
      onRerender();
    };
  }

  // Close Domain Drawer Click
  const closeDrawerBtn = document.getElementById('close-dom-drawer-btn');
  const closeDrawerFooterBtn = document.getElementById('close-dom-drawer-footer-btn');
  const drawerBackdrop = document.getElementById('dom-drawer-backdrop');

  if (closeDrawerBtn) closeDrawerBtn.onclick = () => { selectedDomain = null; actionFeedback = null; onRerender(); };
  if (closeDrawerFooterBtn) closeDrawerFooterBtn.onclick = () => { selectedDomain = null; actionFeedback = null; onRerender(); };
  if (drawerBackdrop) drawerBackdrop.onclick = () => { selectedDomain = null; actionFeedback = null; onRerender(); };

  // Register Domain Button -> Open Modal
  const registerBtn = document.getElementById('register-domain-btn');
  if (registerBtn) {
    registerBtn.onclick = () => {
      isRegisterModalOpen = true;
      onRerender();
    };
  }

  // Close Register Modal Click
  const closeRegisterModalBtn = document.getElementById('close-register-modal-btn');
  const cancelRegisterBtn = document.getElementById('cancel-register-btn');
  const registerModalBackdrop = document.getElementById('register-domain-backdrop');

  if (closeRegisterModalBtn) closeRegisterModalBtn.onclick = () => { isRegisterModalOpen = false; onRerender(); };
  if (cancelRegisterBtn) cancelRegisterBtn.onclick = () => { isRegisterModalOpen = false; onRerender(); };
  if (registerModalBackdrop) registerModalBackdrop.onclick = () => { isRegisterModalOpen = false; onRerender(); };

  // Register Form Submit
  const registerForm = document.getElementById('register-domain-form');
  if (registerForm) {
    registerForm.onsubmit = (e) => {
      e.preventDefault();
      const domainInput = document.getElementById('register-domain-input');
      const autoRenewInput = document.getElementById('register-autorenew-input');

      if (domainInput && domainInput.value.trim()) {
        const domainVal = domainInput.value.trim();
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        const expiresStr = nextYear.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

        const newDom = {
          id: `dom_${Date.now()}`,
          domain: domainVal,
          registrar: 'Hostlab Registrar',
          expires: expiresStr,
          dns: 'Hostlab Anycast DNS',
          autoRenew: autoRenewInput ? autoRenewInput.checked : true,
          status: 'Active',
          registrarLock: true,
          authCode: `HL-AUTH-${Math.floor(1000 + Math.random() * 9000)}RG`,
          nameservers: ['ns1.hostlabdns.com', 'ns2.hostlabdns.com'],
          dnsRecords: [
            { id: `rec_${Date.now()}`, type: 'A', name: '@', content: '194.38.12.84', ttl: 'Auto' }
          ]
        };
        customerDomains.unshift(newDom);
      }

      isRegisterModalOpen = false;
      onRerender();
    };
  }
}
