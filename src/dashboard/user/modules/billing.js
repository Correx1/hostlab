import { customerUser, customerInvoices, customerSubscriptions } from '../db.js';
import { createIcons, icons } from 'lucide';

// Module state
let activeFilter = 'all';
let searchQuery = '';
let selectedInvoice = null;
let isAddFundsModalOpen = false;
let isUpdateCardModalOpen = false;
let actionFeedback = null;

export function renderUserBilling() {
  const filteredInvoices = customerInvoices.filter(inv => {
    const matchesFilter = activeFilter === 'all' || inv.status.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      inv.items.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const allCount = customerInvoices.length;
  const paidCount = customerInvoices.filter(i => i.status.toLowerCase() === 'paid').length;
  const upcomingCount = customerInvoices.filter(i => i.status.toLowerCase() === 'upcoming').length;

  return `
    <div class="space-y-6">
      
      <!-- 1. Header: Exact Admin Style -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold text-zinc-900 dark:text-white font-display tracking-tight">
              Billing &amp; Invoices
            </h1>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your subscription plans, payment methods, account balance, and invoice receipts.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="update-card-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
          >
            <i data-lucide="credit-card" class="w-3.5 h-3.5"></i>
            <span>Payment Method</span>
          </button>
          <button 
            type="button" 
            id="add-funds-btn"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Add Funds</span>
          </button>
        </div>
      </div>

      <!-- 2. Stat Cards: Exact Admin Style -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Account Balance -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="wallet" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Account Balance
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${customerUser.balance}
              </span>
              <span class="text-xs font-mono text-emerald-500 font-medium">Available</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Auto-draw on next billing cycle
            </div>
          </div>
        </div>

        <!-- Monthly Spend -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="activity" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Monthly Recurring
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${customerUser.monthlySpend}
              </span>
              <span class="text-xs font-mono text-zinc-500">/ mo</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Developer Pro bundled tier
            </div>
          </div>
        </div>

        <!-- Next Billing Date -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="calendar" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Next Invoice Date
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                Oct 14
              </span>
              <span class="text-xs font-mono text-zinc-500">2026</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Auto-renewal scheduled
            </div>
          </div>
        </div>

        <!-- Default Card -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="credit-card" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Default Card
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-base font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                •••• ${customerUser.defaultPaymentMethod?.last4 || '4242'}
              </span>
              <span class="text-xs font-mono text-zinc-500">${customerUser.defaultPaymentMethod?.brand || 'Mastercard'}</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Exp: ${customerUser.defaultPaymentMethod?.exp || '09/28'} • Primary
            </div>
          </div>
        </div>

      </div>

      <!-- 3. Active Subscriptions Section -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm p-5 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
          <div>
            <h3 class="text-sm font-bold font-display text-zinc-900 dark:text-white">
              Active Subscriptions
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Current recurring services billed on your monthly cycle.
            </p>
          </div>
          <span class="text-xs font-mono text-zinc-500">
            Total: ${customerUser.monthlySpend} / mo
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          ${customerSubscriptions.map(sub => `
            <div class="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-3">
              <div>
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-zinc-900 dark:text-white text-xs">
                    ${sub.name}
                  </span>
                  <span class="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    ${sub.status}
                  </span>
                </div>
                <p class="text-[11px] text-zinc-500 mt-1">
                  ${sub.resources}
                </p>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800/80 font-mono text-xs">
                <span class="text-zinc-900 dark:text-white font-bold">${sub.price}</span>
                <span class="text-zinc-400 text-[11px]">Renews ${sub.nextBilling.split(',')[0]}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 4. Invoices Table: Exact Admin Style -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
        
        <!-- Controls Bar -->
        <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <!-- Filter Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button 
              type="button" 
              data-inv-filter="all"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'all' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              All Invoices (${allCount})
            </button>
            <button 
              type="button" 
              data-inv-filter="paid"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'paid' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              Paid (${paidCount})
            </button>
            <button 
              type="button" 
              data-inv-filter="upcoming"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'upcoming' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              Upcoming (${upcomingCount})
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="user-inv-search"
              value="${searchQuery}"
              placeholder="Search invoice ID, item..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

        </div>

        <!-- Table Data -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                <th class="py-3 px-4 sm:px-6">Invoice Number</th>
                <th class="py-3 px-4">Billing Date</th>
                <th class="py-3 px-4">Description</th>
                <th class="py-3 px-4">Amount</th>
                <th class="py-3 px-4">Payment Method</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 sm:px-6 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
              ${filteredInvoices.length === 0 ? `
                <tr>
                  <td colspan="7" class="py-12 text-center text-zinc-500">
                    No invoices found matching your criteria.
                  </td>
                </tr>
              ` : filteredInvoices.map(inv => `
                <tr class="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- Invoice ID -->
                  <td class="py-3.5 px-4 sm:px-6 font-mono font-semibold text-zinc-900 dark:text-white text-xs">
                    <div class="flex items-center gap-2">
                      <i data-lucide="receipt" class="w-3.5 h-3.5 text-zinc-400"></i>
                      <span>${inv.id}</span>
                    </div>
                  </td>

                  <!-- Date -->
                  <td class="py-3.5 px-4 font-mono text-zinc-700 dark:text-zinc-300">
                    ${inv.date}
                  </td>

                  <!-- Description -->
                  <td class="py-3.5 px-4 text-zinc-700 dark:text-zinc-300">
                    ${inv.items}
                  </td>

                  <!-- Amount -->
                  <td class="py-3.5 px-4 font-mono font-bold text-zinc-900 dark:text-white">
                    ${inv.amount}
                  </td>

                  <!-- Method -->
                  <td class="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                    ${inv.method || 'Mastercard •••• 4242'}
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-mono ${
                      inv.status.toLowerCase() === 'paid' 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-amber-600 dark:text-amber-400'
                    }">
                      <span class="w-1.5 h-1.5 rounded-full ${
                        inv.status.toLowerCase() === 'paid' ? 'bg-emerald-500' : 'bg-amber-500'
                      }"></span>
                      ${inv.status}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <button 
                      type="button" 
                      data-view-invoice="${inv.id}"
                      class="px-3 py-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                    >
                      View Receipt →
                    </button>
                  </td>

                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

      </div>

      <!-- 5. Invoice Receipt Modal / Drawer -->
      ${selectedInvoice ? `
        <!-- Backdrop -->
        <div id="inv-modal-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"></div>

        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div id="inv-modal" class="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[90vh]">
            
            <!-- Invoice Header Bar -->
            <div class="px-6 py-4 bg-black border-b border-zinc-800 flex items-center justify-between shrink-0">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <i data-lucide="receipt" class="w-4 h-4"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold font-display text-white">Invoice ${selectedInvoice.id}</h3>
                  <span class="text-[11px] font-mono text-zinc-400">${selectedInvoice.date}</span>
                </div>
              </div>
              <button id="close-inv-modal-btn" class="text-zinc-400 hover:text-white cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Invoice Document Body -->
            <div class="p-6 overflow-y-auto space-y-6 text-xs font-sans">
              
              <!-- Company & Client Info -->
              <div class="flex items-start justify-between pb-6 border-b border-zinc-800/80">
                <div>
                  <div class="font-bold text-base font-display text-white">HOSTLAB CLOUD</div>
                  <div class="text-[11px] text-zinc-400 font-mono mt-0.5">Automated Cloud Infrastructure</div>
                  <div class="text-[11px] text-zinc-500 font-mono">VAT ID: EU38920184</div>
                </div>
                <div class="text-right">
                  <div class="text-zinc-400 text-[11px] font-mono">Billed To:</div>
                  <div class="font-semibold text-white mt-0.5">${customerUser.name}</div>
                  <div class="text-zinc-400 text-[11px]">${customerUser.company}</div>
                  <div class="text-zinc-500 text-[11px] font-mono">${customerUser.email}</div>
                </div>
              </div>

              <!-- Line Items Table -->
              <div class="space-y-2">
                <div class="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Itemized Breakdown</div>
                <div class="rounded-lg bg-zinc-900/60 border border-zinc-800 divide-y divide-zinc-800/60 overflow-hidden font-mono">
                  ${(selectedInvoice.lineItems || [
                    { name: 'Developer Pro Web Hosting (Monthly)', qty: 1, price: '$29.00' },
                    { name: 'Cloud VPS Standard Node (Monthly)', qty: 1, price: '$24.00' },
                    { name: 'Corporate Mailbox Cluster (Monthly)', qty: 1, price: '$15.00' }
                  ]).map(item => `
                    <div class="p-3 flex items-center justify-between">
                      <div class="min-w-0">
                        <div class="text-white font-medium text-xs truncate">${item.name}</div>
                        <div class="text-[10px] text-zinc-500">Qty: ${item.qty}</div>
                      </div>
                      <span class="text-white font-bold text-xs shrink-0">${item.price}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Summary Totals -->
              <div class="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-2 font-mono text-xs">
                <div class="flex items-center justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span class="text-white">${selectedInvoice.amount}</span>
                </div>
                <div class="flex items-center justify-between text-zinc-400">
                  <span>Tax (0% B2B Reverse Charge)</span>
                  <span class="text-white">$0.00</span>
                </div>
                <div class="pt-2 border-t border-zinc-800 flex items-center justify-between text-sm font-bold">
                  <span class="text-white">Total Amount</span>
                  <span class="text-emerald-400">${selectedInvoice.amount}</span>
                </div>
              </div>

              <!-- Payment Method Record -->
              <div class="p-3.5 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-between font-mono text-[11px]">
                <div class="flex items-center gap-2">
                  <span class="text-zinc-400">Payment Status:</span>
                  <span class="${selectedInvoice.status.toLowerCase() === 'paid' ? 'text-emerald-400' : 'text-amber-400'} font-bold">
                    ${selectedInvoice.status.toUpperCase()}
                  </span>
                </div>
                <span class="text-zinc-500">${selectedInvoice.method || 'Mastercard •••• 4242'}</span>
              </div>

            </div>

            <!-- Modal Footer -->
            <div class="px-6 py-4 bg-black border-t border-zinc-800 flex items-center justify-between shrink-0">
              <button 
                type="button" 
                id="print-invoice-btn"
                class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-white font-medium cursor-pointer"
              >
                <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                <span>Print Receipt</span>
              </button>

              <button 
                type="button" 
                id="close-inv-modal-footer-btn"
                class="px-4 py-1.5 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      ` : ''}

      <!-- 6. Add Funds Modal -->
      ${isAddFundsModalOpen ? `
        <div id="add-funds-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"></div>
        
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl text-white space-y-5">
            <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 class="text-base font-bold font-display text-white">Add Account Funds</h3>
              <button id="close-add-funds-btn" class="text-zinc-400 hover:text-white cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <form id="add-funds-form" class="space-y-4 text-xs font-sans">
              <div>
                <label class="block text-zinc-400 mb-1.5 font-mono">Select Amount</label>
                <div class="grid grid-cols-4 gap-2 text-center font-mono">
                  <button type="button" data-preset-fund="25" class="fund-chip p-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold cursor-pointer">$25</button>
                  <button type="button" data-preset-fund="50" class="fund-chip p-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold cursor-pointer">$50</button>
                  <button type="button" data-preset-fund="100" class="fund-chip p-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold cursor-pointer">$100</button>
                  <button type="button" data-preset-fund="250" class="fund-chip p-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold cursor-pointer">$250</button>
                </div>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Custom Amount (USD)</label>
                <input 
                  type="number" 
                  id="custom-fund-input" 
                  min="10" 
                  step="5" 
                  value="50"
                  class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Charge To</label>
                <div class="p-3 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-between font-mono text-xs">
                  <div class="flex items-center gap-2">
                    <i data-lucide="credit-card" class="w-4 h-4 text-zinc-400"></i>
                    <span>Mastercard •••• 4242</span>
                  </div>
                  <span class="text-emerald-400 text-[11px]">Default</span>
                </div>
              </div>

              <div class="pt-2 flex items-center justify-end gap-3">
                <button type="button" id="cancel-add-funds-btn" class="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold cursor-pointer">
                  Authorize &amp; Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

      <!-- 7. Update Payment Method Modal -->
      ${isUpdateCardModalOpen ? `
        <div id="update-card-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"></div>
        
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl text-white space-y-5">
            <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 class="text-base font-bold font-display text-white">Update Payment Method</h3>
              <button id="close-update-card-btn" class="text-zinc-400 hover:text-white cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <form id="update-card-form" class="space-y-4 text-xs font-sans">
              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Cardholder Name</label>
                <input 
                  type="text" 
                  value="${customerUser.name}" 
                  required
                  class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Card Number</label>
                <input 
                  type="text" 
                  placeholder="4242 •••• •••• 4242" 
                  required
                  class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-zinc-400 mb-1 font-mono">Expires (MM/YY)</label>
                  <input 
                    type="text" 
                    placeholder="09/28" 
                    required
                    class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-zinc-600"
                  />
                </div>
                <div>
                  <label class="block text-zinc-400 mb-1 font-mono">CVC Security</label>
                  <input 
                    type="password" 
                    placeholder="•••" 
                    maxlength="4"
                    required
                    class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-zinc-600"
                  />
                </div>
              </div>

              <div class="pt-2 flex items-center justify-end gap-3">
                <button type="button" id="cancel-update-card-btn" class="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold cursor-pointer">
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

export function setupBillingEvents(onRerender) {
  createIcons({ icons });

  // Filter tabs
  const filterBtns = document.querySelectorAll('[data-inv-filter]');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      activeFilter = btn.getAttribute('data-inv-filter');
      onRerender();
    };
  });

  // Search input
  const searchInput = document.getElementById('user-inv-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      onRerender();
      const newInput = document.getElementById('user-inv-search');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    };
  }

  // View Invoice Click -> Open Receipt Modal
  const viewBtns = document.querySelectorAll('[data-view-invoice]');
  viewBtns.forEach(btn => {
    btn.onclick = () => {
      const invId = btn.getAttribute('data-view-invoice');
      selectedInvoice = customerInvoices.find(i => i.id === invId) || null;
      onRerender();
    };
  });

  // Close Invoice Receipt Modal
  const closeInvBtn = document.getElementById('close-inv-modal-btn');
  const closeInvFooterBtn = document.getElementById('close-inv-modal-footer-btn');
  const invBackdrop = document.getElementById('inv-modal-backdrop');

  if (closeInvBtn) closeInvBtn.onclick = () => { selectedInvoice = null; onRerender(); };
  if (closeInvFooterBtn) closeInvFooterBtn.onclick = () => { selectedInvoice = null; onRerender(); };
  if (invBackdrop) invBackdrop.onclick = () => { selectedInvoice = null; onRerender(); };

  // Print Invoice Button
  const printBtn = document.getElementById('print-invoice-btn');
  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }

  // Add Funds Modal Toggle
  const addFundsBtn = document.getElementById('add-funds-btn');
  const closeAddFundsBtn = document.getElementById('close-add-funds-btn');
  const cancelAddFundsBtn = document.getElementById('cancel-add-funds-btn');
  const addFundsBackdrop = document.getElementById('add-funds-backdrop');

  if (addFundsBtn) addFundsBtn.onclick = () => { isAddFundsModalOpen = true; onRerender(); };
  if (closeAddFundsBtn) closeAddFundsBtn.onclick = () => { isAddFundsModalOpen = false; onRerender(); };
  if (cancelAddFundsBtn) cancelAddFundsBtn.onclick = () => { isAddFundsModalOpen = false; onRerender(); };
  if (addFundsBackdrop) addFundsBackdrop.onclick = () => { isAddFundsModalOpen = false; onRerender(); };

  // Fund Preset Chips
  const fundChips = document.querySelectorAll('.fund-chip');
  fundChips.forEach(chip => {
    chip.onclick = () => {
      const val = chip.getAttribute('data-preset-fund');
      const input = document.getElementById('custom-fund-input');
      if (input) input.value = val;
    };
  });

  // Add Funds Form Submit
  const addFundsForm = document.getElementById('add-funds-form');
  if (addFundsForm) {
    addFundsForm.onsubmit = (e) => {
      e.preventDefault();
      const input = document.getElementById('custom-fund-input');
      if (input && input.value) {
        const added = parseFloat(input.value) || 0;
        const current = parseFloat(customerUser.balance.replace('$', '')) || 0;
        customerUser.balance = `$${(current + added).toFixed(2)}`;
      }
      isAddFundsModalOpen = false;
      onRerender();
    };
  }

  // Update Card Modal Toggle
  const updateCardBtn = document.getElementById('update-card-btn');
  const closeUpdateCardBtn = document.getElementById('close-update-card-btn');
  const cancelUpdateCardBtn = document.getElementById('cancel-update-card-btn');
  const updateCardBackdrop = document.getElementById('update-card-backdrop');

  if (updateCardBtn) updateCardBtn.onclick = () => { isUpdateCardModalOpen = true; onRerender(); };
  if (closeUpdateCardBtn) closeUpdateCardBtn.onclick = () => { isUpdateCardModalOpen = false; onRerender(); };
  if (cancelUpdateCardBtn) cancelUpdateCardBtn.onclick = () => { isUpdateCardModalOpen = false; onRerender(); };
  if (updateCardBackdrop) updateCardBackdrop.onclick = () => { isUpdateCardModalOpen = false; onRerender(); };

  // Update Card Form Submit
  const updateCardForm = document.getElementById('update-card-form');
  if (updateCardForm) {
    updateCardForm.onsubmit = (e) => {
      e.preventDefault();
      isUpdateCardModalOpen = false;
      onRerender();
    };
  }
}
