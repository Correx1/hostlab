import { customerMailboxes, customerDomains } from '../db.js';
import { createIcons, icons } from 'lucide';

// Module state
let activeFilter = 'all';
let searchQuery = '';
let selectedMailbox = null;
let isCreateModalOpen = false;
let isAddAliasOpen = false;
let showMailPassword = false;
let actionFeedback = null;
let isPasswordResetOpen = false;

export function renderUserEmail() {
  const filteredMailboxes = customerMailboxes.filter(mbx => {
    const matchesFilter = activeFilter === 'all' || mbx.status.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      mbx.address.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (mbx.aliases || []).some(al => al.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const totalUsedStorage = '9.54 GB';

  return `
    <div class="space-y-6">
      
      <!-- 1. Header: Exact Admin Style -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold text-zinc-900 dark:text-white font-display tracking-tight">
              Business Email
            </h1>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your corporate mailboxes, webmail access, aliases, and IMAP/SMTP client credentials.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <a 
            href="https://webmail.hostlab.cloud" 
            target="_blank"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            <span>Webmail Portal ↗</span>
          </a>
          <button 
            type="button" 
            id="create-mailbox-btn"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Create Mailbox</span>
          </button>
        </div>
      </div>

      <!-- 2. Stat Cards: Exact Admin Style -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Total Mailboxes -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="mail" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Active Mailboxes
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${customerMailboxes.length}
              </span>
              <span class="text-xs font-mono text-emerald-500 font-medium">Healthy</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Across thorneventures.io
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
              Storage Allocated
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${totalUsedStorage}
              </span>
              <span class="text-xs font-mono text-zinc-500">/ 100 GB</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              10% aggregate mailbox quota
            </div>
          </div>
        </div>

        <!-- Security & Spam Filter -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Deliverability &amp; Spam
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                DKIM / SPF
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Inbound spam &amp; virus filtering active
            </div>
          </div>
        </div>

        <!-- Mail Protocols -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="lock" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Connection Security
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                SSL / TLS
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              IMAP 993 • SMTP 465 (Enforced)
            </div>
          </div>
        </div>

      </div>

      <!-- 3. Mailboxes Table: Exact Admin Style -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
        
        <!-- Controls Bar -->
        <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <!-- Filter Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button 
              type="button" 
              data-mail-filter="all"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'all' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              All Mailboxes (${customerMailboxes.length})
            </button>
            <button 
              type="button" 
              data-mail-filter="active"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'active' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              Active (${customerMailboxes.length})
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="user-mail-search"
              value="${searchQuery}"
              placeholder="Search email, alias..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

        </div>

        <!-- Table Data -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                <th class="py-3 px-4 sm:px-6">Mailbox Address</th>
                <th class="py-3 px-4">Storage Quota</th>
                <th class="py-3 px-4">Aliases / Routing</th>
                <th class="py-3 px-4">Last Activity</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
              ${filteredMailboxes.length === 0 ? `
                <tr>
                  <td colspan="6" class="py-12 text-center text-zinc-500">
                    No mailboxes found matching your search.
                  </td>
                </tr>
              ` : filteredMailboxes.map(mbx => `
                <tr class="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Mailbox Address -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="flex items-center gap-2">
                      <div class="font-semibold text-zinc-900 dark:text-white text-xs font-mono">
                        ${mbx.address}
                      </div>
                      <a 
                        href="https://webmail.hostlab.cloud" 
                        target="_blank" 
                        class="text-zinc-400 hover:text-white transition-colors"
                        title="Open Webmail"
                      >
                        <i data-lucide="external-link" class="w-3 h-3"></i>
                      </a>
                    </div>
                    <div class="text-[11px] text-zinc-500 mt-0.5">
                      IMAP / SMTP Ready
                    </div>
                  </td>

                  <!-- Storage Quota with Bar -->
                  <td class="py-3.5 px-4">
                    <div class="w-36 space-y-1 font-mono text-[11px]">
                      <div class="flex items-center justify-between">
                        <span class="text-zinc-700 dark:text-zinc-300">${mbx.storageUsed}</span>
                        <span class="text-zinc-500">/ ${mbx.storageLimit}</span>
                      </div>
                      <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-emerald-500 h-full rounded-full" style="width: ${mbx.storagePct || 10}%"></div>
                      </div>
                    </div>
                  </td>

                  <!-- Aliases -->
                  <td class="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                    ${(mbx.aliases || []).length > 0 ? `
                      <span class="inline-flex items-center gap-1 text-[11px]">
                        <span>${mbx.aliases.length} Alias${mbx.aliases.length > 1 ? 'es' : ''}</span>
                      </span>
                    ` : `
                      <span class="text-zinc-500 text-[11px]">Direct Account</span>
                    `}
                  </td>

                  <!-- Last Login -->
                  <td class="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                    ${mbx.lastLogin}
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ${mbx.status}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <button 
                      type="button" 
                      data-manage-mailbox="${mbx.id}"
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

      <!-- 4. Client Mailbox Management Drawer -->
      ${selectedMailbox ? `
        <!-- Backdrop Overlay -->
        <div 
          id="mail-drawer-backdrop"
          class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        ></div>

        <!-- Drawer Content Shell -->
        <div 
          id="mail-drawer"
          class="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between shadow-2xl text-white select-none overflow-hidden"
        >
          <!-- Top Section -->
          <div class="flex-1 flex flex-col min-h-0">
            
            <!-- Drawer Header -->
            <div class="h-20 px-6 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-black">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <i data-lucide="mail" class="w-5 h-5"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold font-display text-white tracking-tight">${selectedMailbox.address}</h3>
                  <div class="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-0.5">
                    <span class="text-emerald-400 font-semibold">● ${selectedMailbox.status}</span>
                    <span>•</span>
                    <span>${selectedMailbox.storageUsed} of ${selectedMailbox.storageLimit}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <a 
                  href="https://webmail.hostlab.cloud" 
                  target="_blank" 
                  class="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 transition-colors cursor-pointer"
                  title="Open Webmail"
                >
                  <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
                <button 
                  id="close-mail-drawer-btn"
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
                <button id="dismiss-mail-feedback-btn" class="text-emerald-500 hover:text-emerald-300">
                  <i data-lucide="x" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            ` : ''}

            <!-- Scrollable Content Body -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-xs font-sans">
              
              <!-- Quick Access Actions -->
              <div class="grid grid-cols-2 gap-3">
                <a 
                  href="https://webmail.hostlab.cloud" 
                  target="_blank"
                  class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 font-medium text-white transition-colors cursor-pointer"
                >
                  <i data-lucide="external-link" class="w-4 h-4 text-zinc-400"></i>
                  <span>Open Webmail ↗</span>
                </a>
                <button 
                  type="button"
                  id="toggle-reset-pass-btn"
                  class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 font-medium text-white transition-colors cursor-pointer"
                >
                  <i data-lucide="key" class="w-4 h-4 text-zinc-400"></i>
                  <span>${isPasswordResetOpen ? 'Cancel' : 'Change Password'}</span>
                </button>
              </div>

              <!-- Password Reset Inline Form -->
              ${isPasswordResetOpen ? `
                <form id="reset-mailbox-pass-form" class="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-3 font-mono text-xs">
                  <h4 class="font-bold text-white uppercase text-[11px] tracking-wider">Set New Password</h4>
                  <div>
                    <input 
                      type="password" 
                      id="new-mailbox-pass-input" 
                      placeholder="Enter new strong password" 
                      required
                      class="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono text-xs"
                    />
                  </div>
                  <div class="flex justify-end gap-2">
                    <button type="submit" class="px-3 py-1.5 rounded bg-white text-black hover:bg-zinc-200 font-semibold cursor-pointer">
                      Save New Password
                    </button>
                  </div>
                </form>
              ` : ''}

              <!-- 1. Email Client Connection (IMAP / SMTP) -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="smartphone" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      Mail Client Settings (Outlook / Apple Mail)
                    </h4>
                  </div>
                  <span class="text-[10px] font-mono text-emerald-400">SSL/TLS Secure</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono">
                  <div>
                    <span class="text-zinc-500 text-[11px] block mb-1">Incoming Server (IMAP)</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-200">
                      <span>mail.hostlab.cloud:993</span>
                      <button type="button" data-copy-text="mail.hostlab.cloud" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy host">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <span class="text-zinc-500 text-[11px] block mb-1">Outgoing Server (SMTP)</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-200">
                      <span>mail.hostlab.cloud:465</span>
                      <button type="button" data-copy-text="mail.hostlab.cloud" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy host">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <span class="text-zinc-500 text-[11px] block mb-1">Username / Login</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-200">
                      <span>${selectedMailbox.address}</span>
                      <button type="button" data-copy-text="${selectedMailbox.address}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy username">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <span class="text-zinc-500 text-[11px] block mb-1">Mailbox Password</span>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-200">
                      <span>${showMailPassword ? (selectedMailbox.password || 'Secret#2026') : '••••••••••••••••'}</span>
                      <div class="flex items-center gap-2">
                        <button type="button" id="toggle-mail-pass-btn" class="text-zinc-400 hover:text-white cursor-pointer" title="${showMailPassword ? 'Hide' : 'Show'}">
                          <i data-lucide="${showMailPassword ? 'eye-off' : 'eye'}" class="w-3.5 h-3.5"></i>
                        </button>
                        <button type="button" data-copy-text="${selectedMailbox.password || 'Secret#2026'}" class="copy-btn text-zinc-400 hover:text-white cursor-pointer" title="Copy password">
                          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. Aliases & Routing -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="corner-down-right" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      Email Aliases (${(selectedMailbox.aliases || []).length})
                    </h4>
                  </div>
                  <button 
                    type="button" 
                    id="toggle-add-alias-btn"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors cursor-pointer"
                  >
                    <i data-lucide="plus" class="w-3 h-3"></i>
                    <span>${isAddAliasOpen ? 'Cancel' : 'Add Alias'}</span>
                  </button>
                </div>

                <!-- Add Alias Form Inline -->
                ${isAddAliasOpen ? `
                  <form id="add-alias-form" class="p-3.5 rounded bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs">
                    <div>
                      <label class="block text-zinc-400 text-[10px] mb-1">New Alias Prefix</label>
                      <div class="flex items-center gap-1">
                        <input 
                          type="text" 
                          id="alias-prefix-input" 
                          placeholder="e.g. sales" 
                          required
                          class="flex-1 px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                        />
                        <span class="text-zinc-500">@${selectedMailbox.address.split('@')[1]}</span>
                      </div>
                    </div>
                    <div class="flex justify-end gap-2 pt-1">
                      <button type="submit" class="px-3 py-1.5 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold cursor-pointer">
                        Save Alias
                      </button>
                    </div>
                  </form>
                ` : ''}

                <!-- Aliases List -->
                <div class="space-y-2 font-mono">
                  ${(selectedMailbox.aliases || []).length === 0 ? `
                    <div class="p-3 text-center text-zinc-500 bg-zinc-950 rounded border border-zinc-800 text-xs">
                      No alternate email aliases mapped to this mailbox.
                    </div>
                  ` : (selectedMailbox.aliases || []).map(al => `
                    <div class="p-2.5 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                      <span class="text-zinc-200">${al}</span>
                      <button 
                        type="button" 
                        data-delete-alias="${al}"
                        class="text-zinc-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        title="Remove alias"
                      >
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- 3. Autoresponder (Out of Office) -->
              <div class="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div class="flex items-center gap-2">
                    <i data-lucide="clock" class="w-4 h-4 text-zinc-400"></i>
                    <h4 class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      Vacation Autoresponder
                    </h4>
                  </div>
                  <span class="text-[10px] font-mono ${selectedMailbox.autoresponder?.enabled ? 'text-emerald-400' : 'text-zinc-500'}">
                    ${selectedMailbox.autoresponder?.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <form id="autoresponder-form" class="space-y-3 font-mono text-xs">
                  <div class="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="autoresponder-enabled-input"
                      ${selectedMailbox.autoresponder?.enabled ? 'checked' : ''}
                      class="rounded bg-zinc-900 border-zinc-800 text-white focus:ring-0 cursor-pointer"
                    />
                    <label for="autoresponder-enabled-input" class="text-zinc-300 cursor-pointer">
                      Enable automated replies
                    </label>
                  </div>

                  <div>
                    <label class="block text-zinc-400 text-[10px] mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="autoresponder-subject-input" 
                      value="${selectedMailbox.autoresponder?.subject || 'Out of Office'}"
                      placeholder="e.g. Out of Office" 
                      class="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                    />
                  </div>

                  <div>
                    <label class="block text-zinc-400 text-[10px] mb-1">Message Body</label>
                    <textarea 
                      id="autoresponder-message-input" 
                      rows="3"
                      placeholder="Your automated reply message..."
                      class="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 resize-none"
                    >${selectedMailbox.autoresponder?.message || ''}</textarea>
                  </div>

                  <div class="flex justify-end pt-1">
                    <button type="submit" class="px-3.5 py-1.5 rounded bg-white text-black hover:bg-zinc-200 font-semibold cursor-pointer">
                      Save Autoresponder
                    </button>
                  </div>
                </form>
              </div>

            </div>

          </div>

          <!-- Drawer Footer -->
          <div class="h-16 px-6 border-t border-zinc-800 flex items-center justify-between shrink-0 bg-black">
            <span class="text-[11px] font-mono text-zinc-500">
              Hostlab Enterprise Mail Cluster
            </span>
            <div class="flex items-center gap-3">
              <button 
                type="button" 
                id="close-mail-drawer-footer-btn"
                class="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 5. Create Mailbox Modal -->
      ${isCreateModalOpen ? `
        <!-- Backdrop -->
        <div id="create-mail-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"></div>
        
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div id="create-mail-modal" class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl text-white space-y-5">
            <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 class="text-base font-bold font-display text-white">Create Business Mailbox</h3>
              <button id="close-create-mail-btn" class="text-zinc-400 hover:text-white cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <form id="create-mail-form" class="space-y-4 text-xs font-sans">
              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Email Address</label>
                <div class="flex items-center gap-2">
                  <input 
                    type="text" 
                    id="create-mail-prefix-input" 
                    placeholder="e.g. sales" 
                    required
                    class="flex-1 px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono text-xs"
                  />
                  <span class="text-zinc-500 font-mono">@</span>
                  <select id="create-mail-domain-input" class="w-44 px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                    ${customerDomains.map(d => `
                      <option value="${d.domain}">${d.domain}</option>
                    `).join('')}
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Password</label>
                <input 
                  type="password" 
                  id="create-mail-pass-input" 
                  placeholder="Set strong mailbox password" 
                  required
                  class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono text-xs"
                />
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Storage Quota</label>
                <select id="create-mail-quota-input" class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                  <option value="10 GB">10 GB Storage</option>
                  <option value="25 GB" selected>25 GB Storage (Recommended)</option>
                  <option value="50 GB">50 GB Storage (Pro)</option>
                </select>
              </div>

              <div class="pt-2 flex items-center justify-end gap-3">
                <button type="button" id="cancel-create-mail-btn" class="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

export function setupEmailEvents(onRerender) {
  createIcons({ icons });

  // Filter tabs
  const filterBtns = document.querySelectorAll('[data-mail-filter]');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      activeFilter = btn.getAttribute('data-mail-filter');
      onRerender();
    };
  });

  // Search input
  const searchInput = document.getElementById('user-mail-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      onRerender();
      const newInput = document.getElementById('user-mail-search');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    };
  }

  // Manage Mailbox Click -> Open Drawer
  const manageBtns = document.querySelectorAll('[data-manage-mailbox]');
  manageBtns.forEach(btn => {
    btn.onclick = () => {
      const mbxId = btn.getAttribute('data-manage-mailbox');
      selectedMailbox = customerMailboxes.find(m => m.id === mbxId) || null;
      actionFeedback = null;
      showMailPassword = false;
      isAddAliasOpen = false;
      isPasswordResetOpen = false;
      onRerender();
    };
  });

  // Toggle Password Show/Hide
  const togglePassBtn = document.getElementById('toggle-mail-pass-btn');
  if (togglePassBtn) {
    togglePassBtn.onclick = () => {
      showMailPassword = !showMailPassword;
      onRerender();
    };
  }

  // Toggle Password Reset Form
  const toggleResetPassBtn = document.getElementById('toggle-reset-pass-btn');
  if (toggleResetPassBtn) {
    toggleResetPassBtn.onclick = () => {
      isPasswordResetOpen = !isPasswordResetOpen;
      onRerender();
    };
  }

  // Reset Mailbox Password Form Submit
  const resetPassForm = document.getElementById('reset-mailbox-pass-form');
  if (resetPassForm && selectedMailbox) {
    resetPassForm.onsubmit = (e) => {
      e.preventDefault();
      const passInput = document.getElementById('new-mailbox-pass-input');
      if (passInput && passInput.value.trim()) {
        selectedMailbox.password = passInput.value.trim();
        actionFeedback = `Password updated successfully for ${selectedMailbox.address}!`;
        isPasswordResetOpen = false;
        onRerender();
      }
    };
  }

  // Toggle Add Alias Inline Form
  const toggleAddAliasBtn = document.getElementById('toggle-add-alias-btn');
  if (toggleAddAliasBtn) {
    toggleAddAliasBtn.onclick = () => {
      isAddAliasOpen = !isAddAliasOpen;
      onRerender();
    };
  }

  // Add Alias Form Submit
  const addAliasForm = document.getElementById('add-alias-form');
  if (addAliasForm && selectedMailbox) {
    addAliasForm.onsubmit = (e) => {
      e.preventDefault();
      const prefixInput = document.getElementById('alias-prefix-input');
      if (prefixInput && prefixInput.value.trim()) {
        const domain = selectedMailbox.address.split('@')[1];
        const newAlias = `${prefixInput.value.trim()}@${domain}`;
        if (!selectedMailbox.aliases) selectedMailbox.aliases = [];
        selectedMailbox.aliases.push(newAlias);
        actionFeedback = `Alias ${newAlias} added!`;
        isAddAliasOpen = false;
        onRerender();
      }
    };
  }

  // Delete Alias Button
  const deleteAliasBtns = document.querySelectorAll('[data-delete-alias]');
  deleteAliasBtns.forEach(btn => {
    btn.onclick = () => {
      const aliasName = btn.getAttribute('data-delete-alias');
      if (selectedMailbox && selectedMailbox.aliases) {
        selectedMailbox.aliases = selectedMailbox.aliases.filter(a => a !== aliasName);
        actionFeedback = `Alias ${aliasName} removed.`;
        onRerender();
      }
    };
  });

  // Autoresponder Form Submit
  const autoresponderForm = document.getElementById('autoresponder-form');
  if (autoresponderForm && selectedMailbox) {
    autoresponderForm.onsubmit = (e) => {
      e.preventDefault();
      const enabledInput = document.getElementById('autoresponder-enabled-input');
      const subjectInput = document.getElementById('autoresponder-subject-input');
      const messageInput = document.getElementById('autoresponder-message-input');

      selectedMailbox.autoresponder = {
        enabled: enabledInput ? enabledInput.checked : false,
        subject: subjectInput ? subjectInput.value.trim() : '',
        message: messageInput ? messageInput.value.trim() : ''
      };
      actionFeedback = `Autoresponder settings saved for ${selectedMailbox.address}!`;
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
  const dismissBtn = document.getElementById('dismiss-mail-feedback-btn');
  if (dismissBtn) {
    dismissBtn.onclick = () => {
      actionFeedback = null;
      onRerender();
    };
  }

  // Close Mailbox Drawer Click
  const closeDrawerBtn = document.getElementById('close-mail-drawer-btn');
  const closeDrawerFooterBtn = document.getElementById('close-mail-drawer-footer-btn');
  const drawerBackdrop = document.getElementById('mail-drawer-backdrop');

  if (closeDrawerBtn) closeDrawerBtn.onclick = () => { selectedMailbox = null; actionFeedback = null; onRerender(); };
  if (closeDrawerFooterBtn) closeDrawerFooterBtn.onclick = () => { selectedMailbox = null; actionFeedback = null; onRerender(); };
  if (drawerBackdrop) drawerBackdrop.onclick = () => { selectedMailbox = null; actionFeedback = null; onRerender(); };

  // Create Mailbox Button -> Open Modal
  const createBtn = document.getElementById('create-mailbox-btn');
  if (createBtn) {
    createBtn.onclick = () => {
      isCreateModalOpen = true;
      onRerender();
    };
  }

  // Close Create Modal Click
  const closeCreateModalBtn = document.getElementById('close-create-mail-btn');
  const cancelCreateBtn = document.getElementById('cancel-create-mail-btn');
  const createModalBackdrop = document.getElementById('create-mail-backdrop');

  if (closeCreateModalBtn) closeCreateModalBtn.onclick = () => { isCreateModalOpen = false; onRerender(); };
  if (cancelCreateBtn) cancelCreateBtn.onclick = () => { isCreateModalOpen = false; onRerender(); };
  if (createModalBackdrop) createModalBackdrop.onclick = () => { isCreateModalOpen = false; onRerender(); };

  // Create Form Submit
  const createForm = document.getElementById('create-mail-form');
  if (createForm) {
    createForm.onsubmit = (e) => {
      e.preventDefault();
      const prefixInput = document.getElementById('create-mail-prefix-input');
      const domainInput = document.getElementById('create-mail-domain-input');
      const passInput = document.getElementById('create-mail-pass-input');
      const quotaInput = document.getElementById('create-mail-quota-input');

      if (prefixInput && domainInput && passInput && prefixInput.value.trim()) {
        const fullAddress = `${prefixInput.value.trim()}@${domainInput.value}`;
        const newMbx = {
          id: `mbx_${Date.now()}`,
          address: fullAddress,
          storageUsed: '0 MB',
          storageLimit: quotaInput ? quotaInput.value : '25 GB',
          storagePct: 0,
          status: 'Active',
          lastLogin: 'Never',
          password: passInput.value.trim(),
          aliases: [],
          autoresponder: { enabled: false, subject: '', message: '' }
        };
        customerMailboxes.unshift(newMbx);
      }

      isCreateModalOpen = false;
      onRerender();
    };
  }
}
