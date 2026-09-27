import { createIcons, icons } from 'lucide';

/**
 * Hostlab Invoices Module
 * Dedicated standalone module for customer invoicing, automated recurring billing,
 * PDF tax receipts, gateway reconciliation (Stripe, SEPA, PayPal), and dunning.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const invoiceStats = {
  collected30d: '$48,290.00',
  outstandingTotal: '$2,840.00',
  overdueCount: 1,
  settlementAvgDays: '1.4 days',
  taxCollected: '$7,840.00',
  failedCharges24h: 0
};

export const initialInvoices = [
  {
    id: 'INV-2024-108',
    customer: 'Sarah Jenkins',
    company: 'TechFlow Media LLC',
    email: 'sarah@techflow-media.com',
    issueDate: 'Sep 01, 2024',
    dueDate: 'Sep 15, 2024',
    amount: '$150.00',
    amountRaw: 150.00,
    currency: 'USD',
    gateway: 'Stripe (Visa •••• 4242)',
    transactionId: 'ch_3Ps88xLkd8914',
    status: 'paid', // paid | pending | overdue | void
    items: [
      { desc: 'vps-lon-01 Dedicated VPS (8 vCPU / 32GB RAM)', qty: 1, unit: '$96.00', total: '$96.00' },
      { desc: 'Business Email - Pro Tier (20 Mailboxes)', qty: 1, unit: '$40.00', total: '$40.00' },
      { desc: 'Authoritative DNS Anycast Zones', qty: 1, unit: '$14.00', total: '$14.00' }
    ],
    subtotal: '$150.00',
    tax: '$0.00',
    notes: 'Auto-settled via Stripe recurring mandate'
  },
  {
    id: 'INV-2024-107',
    customer: 'David Vance',
    company: 'Apex Studios Design Ltd',
    email: 'david@apexstudios.design',
    issueDate: 'Sep 05, 2024',
    dueDate: 'Sep 19, 2024',
    amount: '£199.00',
    amountRaw: 199.00,
    currency: 'GBP',
    gateway: 'Stripe (Mastercard •••• 8910)',
    transactionId: 'ch_3Ps911Bba8120',
    status: 'paid',
    items: [
      { desc: 'app-fra-02 High-Compute Node (16GB RAM)', qty: 1, unit: '£64.00', total: '£64.00' },
      { desc: 'Enterprise Email Pool (50 Mailboxes)', qty: 1, unit: '£80.00', total: '£80.00' },
      { desc: 'Managed MySQL Dedicated Replica', qty: 1, unit: '£45.00', total: '£45.00' },
      { desc: 'Anycast DNS Pro Addon', qty: 1, unit: '£10.00', total: '£10.00' }
    ],
    subtotal: '£165.83',
    tax: '£33.17 (20% UK VAT)',
    notes: 'Reverse charge applicable under UK domestic rules'
  },
  {
    id: 'INV-2024-106',
    customer: 'Marcus Lindqvist',
    company: 'Nordic Capital AB',
    email: 'marcus@nordicfintech.se',
    issueDate: 'Sep 10, 2024',
    dueDate: 'Sep 24, 2024',
    amount: '€292.00',
    amountRaw: 292.00,
    currency: 'EUR',
    gateway: 'SEPA Direct Debit',
    transactionId: 'sepa_trx_990141',
    status: 'paid',
    items: [
      { desc: 'vps-sto-01 Dedicated Metal Node (16 Cores)', qty: 1, unit: '€240.00', total: '€240.00' },
      { desc: 'Compliant S3 Cold Storage Vault (1TB)', qty: 1, unit: '€50.00', total: '€50.00' },
      { desc: 'EU-West DNS Zone Replication', qty: 1, unit: '€2.00', total: '€2.00' }
    ],
    subtotal: '€292.00',
    tax: '€0.00 (EU Reverse Charge)',
    notes: 'SEPA Mandate verified'
  },
  {
    id: 'INV-2024-105',
    customer: 'Elena Rostova',
    company: 'CloudScale SaaS Corp',
    email: 'elena@cloudscale-saas.net',
    issueDate: 'Sep 12, 2024',
    dueDate: 'Sep 26, 2024',
    amount: '$412.00',
    amountRaw: 412.00,
    currency: 'USD',
    gateway: 'Stripe (Amex •••• 1004)',
    transactionId: 'ch_3Ps988Uuu9011',
    status: 'paid',
    items: [
      { desc: 'Managed Kubernetes Control Plane + 3 Nodes', qty: 1, unit: '$320.00', total: '$320.00' },
      { desc: 'Global Anycast Edge CDN Cache Tier', qty: 1, unit: '$80.00', total: '$80.00' },
      { desc: 'cloudscale-saas.net Domain Annual Renewal', qty: 1, unit: '$12.00', total: '$12.00' }
    ],
    subtotal: '$412.00',
    tax: '$0.00',
    notes: 'Corporate expense billing'
  },
  {
    id: 'INV-2024-104',
    customer: 'Alexander Weber',
    company: 'Nexus Logistics GmbH',
    email: 'a.weber@nexus-logistics.de',
    issueDate: 'Sep 18, 2024',
    dueDate: 'Oct 02, 2024',
    amount: '€49.00',
    amountRaw: 49.00,
    currency: 'EUR',
    gateway: 'Stripe (Mastercard •••• 2210)',
    transactionId: 'ch_3Ps999Www1244',
    status: 'paid',
    items: [
      { desc: 'app-fra-02 API Gateway Container', qty: 1, unit: '€48.00', total: '€48.00' },
      { desc: 'Zone DNS Record Sync', qty: 1, unit: '€1.00', total: '€1.00' }
    ],
    subtotal: '€41.18',
    tax: '€7.82 (19% DE MwSt)',
    notes: 'VAT registered business'
  },
  {
    id: 'INV-2024-103',
    customer: 'Julian Moretti',
    company: 'Urban Bistro Hospitality',
    email: 'julian@urbanbistro.io',
    issueDate: 'Sep 22, 2024',
    dueDate: 'Oct 06, 2024',
    amount: '$27.00',
    amountRaw: 27.00,
    currency: 'USD',
    gateway: 'PayPal (Instant Transfer)',
    transactionId: 'pp_ord_7718920',
    status: 'pending',
    items: [
      { desc: 'app-ams-01 WordPress Hosting Package', qty: 1, unit: '$24.00', total: '$24.00' },
      { desc: 'Automated Snapshot Backups', qty: 1, unit: '$3.00', total: '$3.00' }
    ],
    subtotal: '$27.00',
    tax: '$0.00',
    notes: 'Awaiting scheduled webhook execution'
  },
  {
    id: 'INV-2024-102',
    customer: 'Liam Gallagher',
    company: 'Velocity Autos Ltd',
    email: 'liam@velocityautos.co.uk',
    issueDate: 'Sep 24, 2024',
    dueDate: 'Oct 08, 2024',
    amount: '£14.00',
    amountRaw: 14.00,
    currency: 'GBP',
    gateway: 'Stripe (Visa •••• 9901)',
    transactionId: 'ch_3Ps100Qqq8192',
    status: 'pending',
    items: [
      { desc: 'velocityautos.co.uk Domain Registration (1 Year)', qty: 1, unit: '£14.00', total: '£14.00' }
    ],
    subtotal: '£11.67',
    tax: '£2.33 (20% UK VAT)',
    notes: 'New client registration invoice'
  },
  {
    id: 'INV-2024-101',
    customer: 'Viktor Krum',
    company: 'SolarPulse Energy Systems',
    email: 'v.krum@solarpulse.energy',
    issueDate: 'Aug 22, 2024',
    dueDate: 'Sep 05, 2024',
    amount: '€32.00',
    amountRaw: 32.00,
    currency: 'EUR',
    gateway: 'Bank Wire Transfer',
    transactionId: 'wire_pending_8819',
    status: 'overdue',
    items: [
      { desc: 'solarpulse.energy Domain Renewal', qty: 1, unit: '€32.00', total: '€32.00' }
    ],
    subtotal: '€32.00',
    tax: '€0.00',
    notes: 'Dunning email #3 dispatched. Services suspended pending payment.'
  }
];

let invoicesList = [...initialInvoices];
let currentFilter = 'all'; // all | paid | pending | overdue
let currentSearch = '';
let currentGatewayFilter = 'all';
let selectedInvoiceId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderInvoicesHTML() {
  const gateways = Array.from(new Set(invoicesList.map(i => i.gateway.split(' ')[0]))).sort();

  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar (NO CARDS OVERVIEW) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Invoices
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Track automated charges and payment receipts.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-create-inv-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      <!-- Controls & Tabs -->
      <div class="space-y-4">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2" id="invoice-filter-tabs">
          <button 
            type="button" 
            data-filter="all" 
            class="inv-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            All Invoices (<span id="count-all">0</span>)
          </button>
          
          <button 
            type="button" 
            data-filter="paid" 
            class="inv-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'paid' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Paid (<span id="count-paid">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="pending" 
            class="inv-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'pending' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Pending (<span id="count-pending">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="overdue" 
            class="inv-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'overdue' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Overdue (<span id="count-overdue">0</span>)
          </button>
        </div>

        <!-- Filter Search & Gateway Selector -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="invoice-search-input"
              value="${currentSearch}"
              placeholder="Search by invoice number, customer, or transaction ID..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <select 
              id="invoice-gateway-select" 
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Gateways</option>
              ${gateways.map(g => `<option value="${g}" ${currentGatewayFilter === g ? 'selected' : ''}>${g}</option>`).join('')}
            </select>
          </div>
        </div>

      </div>

      <!-- Main Data Table -->
      <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900/40 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
                <th class="py-3 px-4 font-medium">Invoice ID</th>
                <th class="py-3 px-4 font-medium">Customer & Company</th>
                <th class="py-3 px-4 font-medium">Issue / Due Date</th>
                <th class="py-3 px-4 font-medium text-right">Amount</th>
                <th class="py-3 px-4 font-medium">Payment Gateway</th>
                <th class="py-3 px-4 font-medium text-center">Status</th>
                <th class="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="invoice-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <!-- Empty state container -->
        <div id="inv-empty-state" class="hidden p-12 text-center">
          <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
            <i data-lucide="receipt" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No invoices found</h3>
          <p class="text-xs text-zinc-500 max-w-sm mx-auto">
            No invoices match the selected filter criteria or query parameters.
          </p>
        </div>
      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="invoice-drawer-container"></div>

      <!-- Create Invoice Modal -->
      <div id="create-invoice-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="plus-circle" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold font-display text-zinc-900 dark:text-white text-base">Generate New Invoice</h3>
            </div>
            <button type="button" id="close-create-inv-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="create-invoice-form" class="p-6 space-y-4 text-xs">
            
            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Recipient Customer</label>
              <input 
                type="text" 
                id="modal-inv-customer" 
                placeholder="Sarah Jenkins (TechFlow Media)" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Amount Due</label>
                <input 
                  type="text" 
                  id="modal-inv-amount" 
                  placeholder="$150.00" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Payment Method</label>
                <select id="modal-inv-gateway" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none font-mono">
                  <option value="Stripe (Credit Card)">Stripe (Credit Card)</option>
                  <option value="SEPA Direct Debit">SEPA Direct Debit</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Line Items / Services Rendered</label>
              <textarea 
                id="modal-inv-items" 
                rows="3" 
                placeholder="vps-lon-01 Dedicated VPS (8 vCPU / 32GB RAM) - $150.00" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none placeholder-zinc-400"
              ></textarea>
            </div>

            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="modal-inv-send-email" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 w-4 h-4" />
                <span>Email PDF tax invoice to customer upon generation</span>
              </label>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-create-inv-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Issue Invoice
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  `;
}

// ==========================================
// 3. TABLE ROWS GENERATOR
// ==========================================

function getFilteredInvoices() {
  return invoicesList.filter(item => {
    // 1. Tab filter
    if (currentFilter === 'paid' && item.status !== 'paid') return false;
    if (currentFilter === 'pending' && item.status !== 'pending') return false;
    if (currentFilter === 'overdue' && item.status !== 'overdue') return false;

    // 2. Gateway filter
    if (currentGatewayFilter !== 'all' && !item.gateway.toLowerCase().includes(currentGatewayFilter.toLowerCase())) return false;

    // 3. Search query
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchId = item.id.toLowerCase().includes(q);
      const matchCustomer = item.customer.toLowerCase().includes(q);
      const matchCompany = item.company.toLowerCase().includes(q);
      const matchTrx = item.transactionId.toLowerCase().includes(q);
      if (!matchId && !matchCustomer && !matchCompany && !matchTrx) return false;
    }

    return true;
  });
}

function updateTabCounts() {
  const countAll = document.getElementById('count-all');
  const countPaid = document.getElementById('count-paid');
  const countPending = document.getElementById('count-pending');
  const countOverdue = document.getElementById('count-overdue');

  if (countAll) countAll.textContent = invoicesList.length;
  if (countPaid) countPaid.textContent = invoicesList.filter(i => i.status === 'paid').length;
  if (countPending) countPending.textContent = invoicesList.filter(i => i.status === 'pending').length;
  if (countOverdue) countOverdue.textContent = invoicesList.filter(i => i.status === 'overdue').length;
}

function renderTableRows() {
  const tbody = document.getElementById('invoice-table-body');
  const emptyState = document.getElementById('inv-empty-state');
  if (!tbody) return;

  const filtered = getFilteredInvoices();

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(item => {
    // Status text formatting: plain text with color, NO background pill
    let statusClass = 'text-emerald-500';
    let statusLabel = 'Paid';
    if (item.status === 'pending') {
      statusClass = 'text-amber-500';
      statusLabel = 'Pending';
    } else if (item.status === 'overdue') {
      statusClass = 'text-rose-500';
      statusLabel = 'Overdue';
    } else if (item.status === 'void') {
      statusClass = 'text-zinc-500';
      statusLabel = 'Void';
    }

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Invoice ID -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          <div class="flex items-center gap-2">
            <i data-lucide="receipt" class="w-3.5 h-3.5 text-zinc-400 shrink-0"></i>
            <span>${item.id}</span>
          </div>
          <div class="text-[11px] text-zinc-400 font-mono mt-0.5">${item.transactionId}</div>
        </td>

        <!-- Customer & Company -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div class="font-medium text-zinc-900 dark:text-white">${item.customer}</div>
          <div class="text-[11px] text-zinc-400">${item.company}</div>
        </td>

        <!-- Issue / Due Date -->
        <td class="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-300">
          <div>${item.issueDate}</div>
          <div class="text-[11px] text-zinc-400">Due: ${item.dueDate}</div>
        </td>

        <!-- Amount (clean numbers) -->
        <td class="py-3 px-4 font-mono text-right font-bold text-zinc-900 dark:text-white">
          ${item.amount}
        </td>

        <!-- Payment Gateway (plain text, no pill) -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          ${item.gateway}
        </td>

        <!-- Status (plain text with color, NO background pill) -->
        <td class="py-3 px-4 text-center font-mono font-medium ${statusClass}">
          ${statusLabel}
        </td>

        <!-- Actions -->
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1">
            <button 
              type="button" 
              data-view-inv="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Inspect Tax Invoice"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-send-inv="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Resend Invoice Email"
            >
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-toggle-inv="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="${item.status === 'paid' ? 'Mark as Pending' : 'Mark as Paid'}"
            >
              <i data-lucide="${item.status === 'paid' ? 'undo' : 'check'}" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  createIcons({ icons });
}

// ==========================================
// 4. SLIDE-OVER DRAWER (TAX INVOICE SHEET)
// ==========================================

function renderInvoiceDrawer(invoiceId) {
  const container = document.getElementById('invoice-drawer-container');
  if (!container) return;

  const item = invoicesList.find(i => i.id === invoiceId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let statusClass = 'text-emerald-500';
  let statusLabel = 'Paid';
  if (item.status === 'pending') {
    statusClass = 'text-amber-500';
    statusLabel = 'Pending';
  } else if (item.status === 'overdue') {
    statusClass = 'text-rose-500';
    statusLabel = 'Overdue';
  } else if (item.status === 'void') {
    statusClass = 'text-zinc-500';
    statusLabel = 'Void';
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-xl h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>Official Tax Invoice</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${statusLabel}</span>
            </div>
            <h2 class="text-xl font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2">
              <i data-lucide="receipt" class="w-5 h-5 text-zinc-400"></i>
              <span>${item.id}</span>
            </h2>
          </div>
          <button 
            type="button" 
            id="close-inv-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700 dark:text-zinc-300">
          
          <!-- Invoice Meta Info -->
          <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">BILLED TO</div>
              <div class="font-bold text-zinc-900 dark:text-white mt-1">${item.customer}</div>
              <div class="text-[11px] text-zinc-500">${item.company}</div>
              <div class="text-[11px] text-zinc-400 font-mono mt-0.5">${item.email}</div>
            </div>
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">ISSUED BY</div>
              <div class="font-bold text-zinc-900 dark:text-white mt-1">Hostlab Cloud Infrastructure</div>
              <div class="text-[11px] text-zinc-500">Tax ID: GB-VAT-90184201</div>
              <div class="text-[11px] text-zinc-400 font-mono mt-0.5">London, United Kingdom</div>
            </div>
          </div>

          <!-- Transaction Specs -->
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
              <div class="text-zinc-500 text-[11px] font-mono">PAYMENT METHOD</div>
              <div class="font-semibold text-zinc-900 dark:text-white mt-1 font-mono">${item.gateway}</div>
            </div>
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
              <div class="text-zinc-500 text-[11px] font-mono">GATEWAY REF ID</div>
              <div class="font-semibold text-zinc-900 dark:text-white mt-1 font-mono">${item.transactionId}</div>
            </div>
          </div>

          <!-- Line Items Table -->
          <div class="space-y-2">
            <div class="text-xs font-mono uppercase text-zinc-500">Invoice Items Breakdown</div>
            <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-xs">
              <table class="w-full text-left font-mono">
                <thead class="bg-zinc-50 dark:bg-zinc-800/60 text-[10px] text-zinc-500 uppercase border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th class="py-2.5 px-3">Description</th>
                    <th class="py-2.5 px-3 text-center">Qty</th>
                    <th class="py-2.5 px-3 text-right">Unit Price</th>
                    <th class="py-2.5 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                  ${item.items.map(line => `
                    <tr>
                      <td class="py-2.5 px-3 text-zinc-900 dark:text-white">${line.desc}</td>
                      <td class="py-2.5 px-3 text-center text-zinc-500">${line.qty}</td>
                      <td class="py-2.5 px-3 text-right text-zinc-500">${line.unit}</td>
                      <td class="py-2.5 px-3 text-right text-zinc-900 dark:text-white font-medium">${line.total}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Total Calculation Summary -->
          <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 space-y-2 font-mono text-xs">
            <div class="flex items-center justify-between text-zinc-500">
              <span>Subtotal</span>
              <span class="text-zinc-900 dark:text-white">${item.subtotal}</span>
            </div>
            <div class="flex items-center justify-between text-zinc-500">
              <span>Tax / VAT</span>
              <span class="text-zinc-900 dark:text-white">${item.tax}</span>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700 text-sm font-bold">
              <span class="text-zinc-900 dark:text-white">Total Amount</span>
              <span class="text-zinc-900 dark:text-white">${item.amount}</span>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
          <button 
            type="button" 
            id="drawer-toggle-paid-btn"
            class="px-3 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            ${item.status === 'paid' ? 'Mark Unpaid' : 'Mark Paid'}
          </button>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="drawer-download-pdf-btn"
              class="px-3.5 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>Download PDF</span>
            </button>
            <button 
              type="button" 
              id="drawer-inv-done-btn"
              class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  `;

  createIcons({ icons });

  const closeBtn = document.getElementById('close-inv-drawer-btn');
  const doneBtn = document.getElementById('drawer-inv-done-btn');
  const togglePaidBtn = document.getElementById('drawer-toggle-paid-btn');
  const downloadPdfBtn = document.getElementById('drawer-download-pdf-btn');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedInvoiceId = null;
  };

  if (closeBtn) closeBtn.onclick = closeDrawer;
  if (doneBtn) doneBtn.onclick = closeDrawer;

  const backdrop = container.firstElementChild;
  if (backdrop) {
    backdrop.onclick = (e) => {
      const panel = backdrop.firstElementChild;
      if (panel && !panel.contains(e.target)) closeDrawer();
    };
  }

  if (togglePaidBtn) {
    togglePaidBtn.onclick = () => {
      item.status = item.status === 'paid' ? 'pending' : 'paid';
      renderInvoiceDrawer(item.id);
      renderTableRows();
      updateTabCounts();
    };
  }

  if (downloadPdfBtn) {
    downloadPdfBtn.onclick = () => {
      const span = downloadPdfBtn.querySelector('span');
      if (span) {
        span.textContent = 'Generating PDF...';
        setTimeout(() => {
          span.textContent = 'Downloaded!';
          setTimeout(() => { span.textContent = 'Download PDF'; }, 1500);
        }, 800);
      }
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupInvoicesEvents(onNavigate) {
  createIcons({ icons });
  updateTabCounts();
  renderTableRows();

  // Tab Filtering
  const tabs = document.querySelectorAll('.inv-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => {
        t.className = 'inv-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white';
      });
      tab.className = 'inv-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900';

      currentFilter = tab.getAttribute('data-filter') || 'all';
      renderTableRows();
    };
  });

  // Search input
  const searchInput = document.getElementById('invoice-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Gateway selector
  const gatewaySelect = document.getElementById('invoice-gateway-select');
  if (gatewaySelect) {
    gatewaySelect.onchange = (e) => {
      currentGatewayFilter = e.target.value;
      renderTableRows();
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('invoice-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-inv]');
      const sendBtn = e.target.closest('[data-send-inv]');
      const toggleBtn = e.target.closest('[data-toggle-inv]');

      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-inv');
        selectedInvoiceId = id;
        renderInvoiceDrawer(id);
      } else if (sendBtn) {
        const id = sendBtn.getAttribute('data-send-inv');
        sendBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-500"></i>`;
        createIcons({ icons });
        setTimeout(() => { renderTableRows(); }, 1500);
      } else if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-toggle-inv');
        const item = invoicesList.find(i => i.id === id);
        if (item) {
          item.status = item.status === 'paid' ? 'pending' : 'paid';
          renderTableRows();
          updateTabCounts();
        }
      }
    };
  }

  // Create Invoice Modal Handlers
  const openModalBtn = document.getElementById('open-create-inv-btn');
  const modal = document.getElementById('create-invoice-modal');
  const closeModalBtn = document.getElementById('close-create-inv-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-create-inv-btn');
  const form = document.getElementById('create-invoice-form');

  if (openModalBtn && modal) {
    openModalBtn.onclick = () => modal.classList.remove('hidden');
  }

  const closeModal = () => {
    if (modal) modal.classList.add('hidden');
    if (form) form.reset();
  };

  if (closeModalBtn) closeModalBtn.onclick = closeModal;
  if (cancelModalBtn) cancelModalBtn.onclick = closeModal;

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const customer = document.getElementById('modal-inv-customer')?.value.trim();
      const amount = document.getElementById('modal-inv-amount')?.value.trim();
      const gateway = document.getElementById('modal-inv-gateway')?.value || 'Stripe (Credit Card)';
      const rawItems = document.getElementById('modal-inv-items')?.value.trim() || 'Custom Cloud Service';

      if (!customer || !amount) return;

      const newInv = {
        id: `INV-2024-${Math.floor(100 + Math.random() * 900)}`,
        customer,
        company: `${customer} LLC`,
        email: 'billing@client.com',
        issueDate: 'Today',
        dueDate: 'In 14 Days',
        amount,
        amountRaw: parseFloat(amount.replace(/[^0-9.]/g, '')) || 0,
        currency: 'USD',
        gateway,
        transactionId: `trx_${Date.now()}`,
        status: 'pending',
        items: [
          { desc: rawItems, qty: 1, unit: amount, total: amount }
        ],
        subtotal: amount,
        tax: '$0.00',
        notes: 'Manually issued invoice'
      };

      invoicesList.unshift(newInv);
      closeModal();
      updateTabCounts();
      renderTableRows();
    };
  }
}

export function cleanupInvoices() {
  currentFilter = 'all';
  currentSearch = '';
  currentGatewayFilter = 'all';
  selectedInvoiceId = null;
}
