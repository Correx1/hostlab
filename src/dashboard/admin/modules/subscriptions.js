import { createIcons, icons } from 'lucide';

/**
 * Hostlab Subscriptions Module
 * Dedicated standalone module for recurring cloud subscriptions, SaaS plans,
 * automated renewal cycles, plan upgrades/downgrades, and churn prevention.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const subscriptionStats = {
  totalActiveSubs: 2418,
  monthlyRecurringRevenue: '$42,850.00',
  annualContractValue: '$514,200.00',
  retentionRate: '98.4%',
  netNewThisMonth: '+68',
  avgRevenuePerUser: '$34.20'
};

export const initialSubscriptions = [
  {
    id: 'SUB-4081',
    planName: 'Pro Dedicated VPS (8 vCPU / 32GB RAM)',
    category: 'VPS Compute',
    customer: 'Sarah Jenkins',
    company: 'TechFlow Media LLC',
    email: 'sarah@techflow-media.com',
    billingCycle: 'Monthly',
    price: '$96.00',
    priceRaw: 96.00,
    currency: 'USD',
    nextRenewal: 'Oct 01, 2024',
    startDate: 'Mar 12, 2024',
    autoRenew: true,
    paymentMethod: 'Stripe (Visa •••• 4242)',
    assignedResource: 'vps-lon-01 (185.193.64.12)',
    status: 'active', // active | paused | cancelled
    specs: '8 vCPU, 32GB RAM, 320GB NVMe, 10Gbps Uplink'
  },
  {
    id: 'SUB-4082',
    planName: 'Enterprise Email Pool (50 Mailboxes)',
    category: 'Business Email',
    customer: 'David Vance',
    company: 'Apex Studios Design Ltd',
    email: 'david@apexstudios.design',
    billingCycle: 'Monthly',
    price: '£80.00',
    priceRaw: 80.00,
    currency: 'GBP',
    nextRenewal: 'Oct 05, 2024',
    startDate: 'Jan 20, 2024',
    autoRenew: true,
    paymentMethod: 'Stripe (Mastercard •••• 8910)',
    assignedResource: 'mail.apexstudios.design (50 Inboxes)',
    status: 'active',
    specs: '250GB Storage Pool, DKIM/SPF Aligned, Priority MX'
  },
  {
    id: 'SUB-4083',
    planName: 'Dedicated Bare-Metal Node (16 Cores)',
    category: 'VPS Compute',
    customer: 'Marcus Lindqvist',
    company: 'Nordic Capital AB',
    email: 'marcus@nordicfintech.se',
    billingCycle: 'Monthly',
    price: '€240.00',
    priceRaw: 240.00,
    currency: 'EUR',
    nextRenewal: 'Oct 10, 2024',
    startDate: 'Apr 02, 2024',
    autoRenew: true,
    paymentMethod: 'SEPA Direct Debit',
    assignedResource: 'vps-sto-01 (185.193.66.88)',
    status: 'active',
    specs: '16 Cores, 64GB ECC RAM, 1TB NVMe RAID-1'
  },
  {
    id: 'SUB-4084',
    planName: 'Managed Kubernetes Multi-Zone Cluster',
    category: 'Kubernetes',
    customer: 'Elena Rostova',
    company: 'CloudScale SaaS Corp',
    email: 'elena@cloudscale-saas.net',
    billingCycle: 'Monthly',
    price: '$320.00',
    priceRaw: 320.00,
    currency: 'USD',
    nextRenewal: 'Oct 12, 2024',
    startDate: 'Feb 15, 2024',
    autoRenew: true,
    paymentMethod: 'Stripe (Amex •••• 1004)',
    assignedResource: 'k8s-cluster-primary (3 Worker Nodes)',
    status: 'active',
    specs: 'HA Control Plane, Autoscaling Pool, Cilium CNI'
  },
  {
    id: 'SUB-4085',
    planName: 'High-Compute Web Node (16GB RAM)',
    category: 'VPS Compute',
    customer: 'David Vance',
    company: 'Apex Studios Design Ltd',
    email: 'david@apexstudios.design',
    billingCycle: 'Monthly',
    price: '£64.00',
    priceRaw: 64.00,
    currency: 'GBP',
    nextRenewal: 'Oct 05, 2024',
    startDate: 'Jan 20, 2024',
    autoRenew: true,
    paymentMethod: 'Stripe (Mastercard •••• 8910)',
    assignedResource: 'app-fra-02 (185.193.64.14)',
    status: 'active',
    specs: '4 vCPU, 16GB RAM, 160GB NVMe, Nginx Reverse Proxy'
  },
  {
    id: 'SUB-4086',
    planName: 'WordPress Turbo Managed Hosting',
    category: 'Web Hosting',
    customer: 'Julian Moretti',
    company: 'Urban Bistro Hospitality',
    email: 'julian@urbanbistro.io',
    billingCycle: 'Monthly',
    price: '$24.00',
    priceRaw: 24.00,
    currency: 'USD',
    nextRenewal: 'Oct 01, 2024',
    startDate: 'Jun 10, 2024',
    autoRenew: true,
    paymentMethod: 'PayPal',
    assignedResource: 'app-ams-01 (urbanbistro.io)',
    status: 'active',
    specs: 'PHP 8.3, LiteSpeed Cache, Redis Object Cache, Staging'
  },
  {
    id: 'SUB-4087',
    planName: 'API Gateway Container Cluster',
    category: 'VPS Compute',
    customer: 'Alexander Weber',
    company: 'Nexus Logistics GmbH',
    email: 'a.weber@nexus-logistics.de',
    billingCycle: 'Monthly',
    price: '€48.00',
    priceRaw: 48.00,
    currency: 'EUR',
    nextRenewal: 'Oct 04, 2024',
    startDate: 'May 04, 2024',
    autoRenew: false,
    paymentMethod: 'Stripe (Mastercard •••• 2210)',
    assignedResource: 'app-fra-02 (Container Node)',
    status: 'paused',
    specs: '2 vCPU, 8GB RAM, Envoy Proxy, 99.99% Uptime'
  },
  {
    id: 'SUB-4088',
    planName: 'Standard Cloud Hosting',
    category: 'Web Hosting',
    customer: 'Viktor Krum',
    company: 'SolarPulse Energy Systems',
    email: 'v.krum@solarpulse.energy',
    billingCycle: 'Monthly',
    price: '€18.00',
    priceRaw: 18.00,
    currency: 'EUR',
    nextRenewal: 'Sep 05, 2024',
    startDate: 'Jul 22, 2024',
    autoRenew: false,
    paymentMethod: 'Bank Wire Transfer',
    assignedResource: 'app-ams-01 (solarpulse.energy)',
    status: 'cancelled',
    specs: '1 vCPU, 2GB RAM, 25GB SSD (Suspended for non-payment)'
  }
];

let subscriptionsList = [...initialSubscriptions];
let currentFilter = 'all'; // all | active | paused | cancelled
let currentSearch = '';
let currentCategoryFilter = 'all';
let selectedSubscriptionId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderSubscriptionsHTML() {
  const categories = Array.from(new Set(subscriptionsList.map(s => s.category))).sort();

  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar (NO CARDS OVERVIEW) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Subscriptions
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Manage recurring subscriptions and plans.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-create-sub-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Add Subscription</span>
          </button>
        </div>
      </div>

      <!-- Controls & Tabs -->
      <div class="space-y-4">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2" id="sub-filter-tabs">
          <button 
            type="button" 
            data-filter="all" 
            class="sub-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            All Subscriptions (<span id="count-all">0</span>)
          </button>
          
          <button 
            type="button" 
            data-filter="active" 
            class="sub-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'active' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Active (<span id="count-active">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="paused" 
            class="sub-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'paused' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Paused (<span id="count-paused">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="cancelled" 
            class="sub-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'cancelled' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Cancelled (<span id="count-cancelled">0</span>)
          </button>
        </div>

        <!-- Filter Search & Category Selector -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="sub-search-input"
              value="${currentSearch}"
              placeholder="Search by plan name, customer, ID, or assigned node..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <select 
              id="sub-category-select" 
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Service Categories</option>
              ${categories.map(c => `<option value="${c}" ${currentCategoryFilter === c ? 'selected' : ''}>${c}</option>`).join('')}
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
                <th class="py-3 px-4 font-medium">Subscription & Plan</th>
                <th class="py-3 px-4 font-medium">Customer & Account</th>
                <th class="py-3 px-4 font-medium text-right">Price / Cycle</th>
                <th class="py-3 px-4 font-medium">Next Renewal</th>
                <th class="py-3 px-4 font-medium">Auto-Renew</th>
                <th class="py-3 px-4 font-medium text-center">Status</th>
                <th class="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="subscription-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <!-- Empty state container -->
        <div id="sub-empty-state" class="hidden p-12 text-center">
          <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
            <i data-lucide="repeat" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No subscriptions found</h3>
          <p class="text-xs text-zinc-500 max-w-sm mx-auto">
            No active subscriptions match your filter criteria or search query.
          </p>
        </div>
      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="subscription-drawer-container"></div>

      <!-- Add Subscription Modal -->
      <div id="create-subscription-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="plus-circle" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold font-display text-zinc-900 dark:text-white text-base">Assign New Subscription</h3>
            </div>
            <button type="button" id="close-create-sub-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="create-subscription-form" class="p-6 space-y-4 text-xs">
            
            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Customer Account</label>
              <input 
                type="text" 
                id="modal-sub-customer" 
                placeholder="Sarah Jenkins (TechFlow Media LLC)" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Plan Template</label>
              <select id="modal-sub-plan" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none font-mono">
                <option value="Pro Dedicated VPS (8 vCPU / 32GB RAM)|$96.00|VPS Compute">Pro Dedicated VPS (8 vCPU / 32GB) - $96.00/mo</option>
                <option value="High-Compute Web Node (16GB RAM)|$64.00|VPS Compute">High-Compute Web Node (16GB RAM) - $64.00/mo</option>
                <option value="Enterprise Email Pool (50 Mailboxes)|$80.00|Business Email">Enterprise Email Pool (50 Inboxes) - $80.00/mo</option>
                <option value="Managed Kubernetes Multi-Zone Cluster|$320.00|Kubernetes">Managed Kubernetes Cluster - $320.00/mo</option>
                <option value="WordPress Turbo Managed Hosting|$24.00|Web Hosting">WordPress Turbo Managed Hosting - $24.00/mo</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Billing Cadence</label>
                <select id="modal-sub-cycle" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annual">Annual (15% Discount)</option>
                </select>
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Assigned Target Node</label>
                <input 
                  type="text" 
                  id="modal-sub-node" 
                  placeholder="vps-lon-01" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="modal-sub-autorenew" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 w-4 h-4" />
                <span>Enable automatic credit card renewal on billing cycle</span>
              </label>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-create-sub-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Create Subscription
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

function getFilteredSubscriptions() {
  return subscriptionsList.filter(item => {
    // 1. Tab filter
    if (currentFilter === 'active' && item.status !== 'active') return false;
    if (currentFilter === 'paused' && item.status !== 'paused') return false;
    if (currentFilter === 'cancelled' && item.status !== 'cancelled') return false;

    // 2. Category filter
    if (currentCategoryFilter !== 'all' && item.category !== currentCategoryFilter) return false;

    // 3. Search query
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchId = item.id.toLowerCase().includes(q);
      const matchPlan = item.planName.toLowerCase().includes(q);
      const matchCustomer = item.customer.toLowerCase().includes(q);
      const matchResource = item.assignedResource.toLowerCase().includes(q);
      if (!matchId && !matchPlan && !matchCustomer && !matchResource) return false;
    }

    return true;
  });
}

function updateTabCounts() {
  const countAll = document.getElementById('count-all');
  const countActive = document.getElementById('count-active');
  const countPaused = document.getElementById('count-paused');
  const countCancelled = document.getElementById('count-cancelled');

  if (countAll) countAll.textContent = subscriptionsList.length;
  if (countActive) countActive.textContent = subscriptionsList.filter(s => s.status === 'active').length;
  if (countPaused) countPaused.textContent = subscriptionsList.filter(s => s.status === 'paused').length;
  if (countCancelled) countCancelled.textContent = subscriptionsList.filter(s => s.status === 'cancelled').length;
}

function renderTableRows() {
  const tbody = document.getElementById('subscription-table-body');
  const emptyState = document.getElementById('sub-empty-state');
  if (!tbody) return;

  const filtered = getFilteredSubscriptions();

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(item => {
    // Status text formatting: plain text with color, NO background pill
    let statusClass = 'text-emerald-500';
    let statusLabel = 'Active';
    if (item.status === 'paused') {
      statusClass = 'text-amber-500';
      statusLabel = 'Paused';
    } else if (item.status === 'cancelled') {
      statusClass = 'text-rose-500';
      statusLabel = 'Cancelled';
    }

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Subscription & Plan -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          <div class="flex items-center gap-2">
            <i data-lucide="repeat" class="w-3.5 h-3.5 text-zinc-400 shrink-0"></i>
            <span>${item.planName}</span>
          </div>
          <div class="text-[11px] text-zinc-400 font-sans mt-0.5">${item.id} • ${item.category}</div>
        </td>

        <!-- Customer & Account -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div class="font-medium text-zinc-900 dark:text-white">${item.customer}</div>
          <div class="text-[11px] text-zinc-400">${item.company}</div>
        </td>

        <!-- Price / Cycle (clean numbers) -->
        <td class="py-3 px-4 font-mono text-right font-bold text-zinc-900 dark:text-white">
          ${item.price} <span class="text-zinc-400 font-normal text-[11px]">/ ${item.billingCycle.toLowerCase()}</span>
        </td>

        <!-- Next Renewal -->
        <td class="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-300">
          <div>${item.nextRenewal}</div>
          <div class="text-[11px] text-zinc-400">Since ${item.startDate}</div>
        </td>

        <!-- Auto-Renew (plain text, no pill) -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          ${item.autoRenew ? 'Enabled (Auto)' : 'Manual (Invoice)'}
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
              data-view-sub="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Inspect Subscription 360"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-toggle-sub="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="${item.status === 'active' ? 'Pause Auto-Renew' : 'Resume Auto-Renew'}"
            >
              <i data-lucide="${item.status === 'active' ? 'pause' : 'play'}" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-cancel-sub="${item.id}"
              class="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Cancel Subscription"
            >
              <i data-lucide="x-circle" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  createIcons({ icons });
}

// ==========================================
// 4. SLIDE-OVER DRAWER (SUBSCRIPTION 360)
// ==========================================

function renderSubscriptionDrawer(subscriptionId) {
  const container = document.getElementById('subscription-drawer-container');
  if (!container) return;

  const item = subscriptionsList.find(s => s.id === subscriptionId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let statusClass = 'text-emerald-500';
  let statusLabel = 'Active';
  if (item.status === 'paused') {
    statusClass = 'text-amber-500';
    statusLabel = 'Paused';
  } else if (item.status === 'cancelled') {
    statusClass = 'text-rose-500';
    statusLabel = 'Cancelled';
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-xl h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>Subscription Inspector</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${statusLabel}</span>
            </div>
            <h2 class="text-xl font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2">
              <i data-lucide="repeat" class="w-5 h-5 text-zinc-400"></i>
              <span>${item.planName}</span>
            </h2>
            <div class="text-xs text-zinc-400 mt-0.5">${item.id} • ${item.category}</div>
          </div>
          <button 
            type="button" 
            id="close-sub-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700 dark:text-zinc-300">
          
          <!-- Pricing & Contract Banner -->
          <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">RECURRING RATE</div>
              <div class="text-xl font-bold text-zinc-900 dark:text-white font-mono mt-0.5">
                ${item.price} <span class="text-xs text-zinc-400 font-normal">/ ${item.billingCycle.toLowerCase()}</span>
              </div>
              <div class="text-[11px] text-zinc-400 font-mono mt-1">${item.paymentMethod}</div>
            </div>
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">NEXT RENEWAL DATE</div>
              <div class="text-xl font-bold text-zinc-900 dark:text-white font-mono mt-0.5">
                ${item.nextRenewal}
              </div>
              <div class="text-[11px] font-mono mt-1 ${item.autoRenew ? 'text-emerald-500' : 'text-amber-500'}">
                ${item.autoRenew ? 'Automatic debit scheduled' : 'Manual invoice scheduled'}
              </div>
            </div>
          </div>

          <!-- Customer & Organization Link -->
          <div class="space-y-3">
            <div class="text-xs font-mono uppercase text-zinc-500">Subscriber Identity</div>
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 flex items-center justify-between">
              <div>
                <div class="font-bold text-zinc-900 dark:text-white">${item.customer}</div>
                <div class="text-zinc-400">${item.company}</div>
                <div class="text-[11px] text-zinc-500 font-mono mt-0.5">${item.email}</div>
              </div>
              <div class="text-right font-mono text-[11px] text-zinc-400">
                <div>Contract since:</div>
                <div class="text-zinc-900 dark:text-white font-medium">${item.startDate}</div>
              </div>
            </div>
          </div>

          <!-- Provisioned Infrastructure Resource -->
          <div class="space-y-2">
            <div class="text-xs font-mono uppercase text-zinc-500">Active Attached Resource</div>
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-1.5 font-mono">
              <div class="flex items-center justify-between">
                <span class="font-bold text-zinc-900 dark:text-white">${item.assignedResource}</span>
                <span class="text-emerald-500 font-semibold text-[11px]">PROVISIONED & ACTIVE</span>
              </div>
              <div class="text-[11px] text-zinc-500">
                ${item.specs}
              </div>
            </div>
          </div>

          <!-- Lifecycle Upgrades -->
          <div class="space-y-2">
            <div class="text-xs font-mono uppercase text-zinc-500">Tier Adjustment / Plan Upgrade</div>
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/20 space-y-2">
              <div class="text-zinc-500 text-[11px]">
                Upgrade to a higher resource tier with instant hot-resizing and automatic prorated billing credit.
              </div>
              <div class="flex items-center gap-2">
                <select id="drawer-upgrade-plan-select" class="flex-1 px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono">
                  <option>Pro Dedicated VPS (8 vCPU / 32GB RAM) - Current Plan</option>
                  <option>Ultra VPS Cluster (16 vCPU / 64GB RAM) - +$80.00/mo</option>
                  <option>Bare-Metal Dedicated (32 Cores / 128GB) - +$180.00/mo</option>
                </select>
                <button type="button" id="drawer-apply-upgrade-btn" class="px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded font-medium hover:bg-zinc-800 transition-colors">
                  Upgrade
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
          <button 
            type="button" 
            id="drawer-cancel-sub-btn"
            class="px-3 py-2 text-xs font-medium rounded-md text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            Cancel Subscription
          </button>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="drawer-toggle-autorenew-btn"
              class="px-3.5 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              ${item.autoRenew ? 'Disable Auto-Renew' : 'Enable Auto-Renew'}
            </button>
            <button 
              type="button" 
              id="drawer-sub-done-btn"
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

  const closeBtn = document.getElementById('close-sub-drawer-btn');
  const doneBtn = document.getElementById('drawer-sub-done-btn');
  const cancelBtn = document.getElementById('drawer-cancel-sub-btn');
  const toggleAutoRenewBtn = document.getElementById('drawer-toggle-autorenew-btn');
  const upgradeBtn = document.getElementById('drawer-apply-upgrade-btn');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedSubscriptionId = null;
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

  if (toggleAutoRenewBtn) {
    toggleAutoRenewBtn.onclick = () => {
      item.autoRenew = !item.autoRenew;
      renderSubscriptionDrawer(item.id);
      renderTableRows();
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      item.status = 'cancelled';
      item.autoRenew = false;
      renderSubscriptionDrawer(item.id);
      renderTableRows();
      updateTabCounts();
    };
  }

  if (upgradeBtn) {
    upgradeBtn.onclick = () => {
      upgradeBtn.textContent = 'Upgraded!';
      setTimeout(() => {
        closeDrawer();
      }, 700);
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupSubscriptionsEvents(onNavigate) {
  createIcons({ icons });
  updateTabCounts();
  renderTableRows();

  // Tab Filtering
  const tabs = document.querySelectorAll('.sub-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => {
        t.className = 'sub-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white';
      });
      tab.className = 'sub-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900';

      currentFilter = tab.getAttribute('data-filter') || 'all';
      renderTableRows();
    };
  });

  // Search input
  const searchInput = document.getElementById('sub-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Category selector
  const categorySelect = document.getElementById('sub-category-select');
  if (categorySelect) {
    categorySelect.onchange = (e) => {
      currentCategoryFilter = e.target.value;
      renderTableRows();
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('subscription-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-sub]');
      const toggleBtn = e.target.closest('[data-toggle-sub]');
      const cancelBtn = e.target.closest('[data-cancel-sub]');

      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-sub');
        selectedSubscriptionId = id;
        renderSubscriptionDrawer(id);
      } else if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-toggle-sub');
        const item = subscriptionsList.find(s => s.id === id);
        if (item) {
          item.status = item.status === 'active' ? 'paused' : 'active';
          renderTableRows();
          updateTabCounts();
        }
      } else if (cancelBtn) {
        const id = cancelBtn.getAttribute('data-cancel-sub');
        const item = subscriptionsList.find(s => s.id === id);
        if (item) {
          item.status = 'cancelled';
          item.autoRenew = false;
          renderTableRows();
          updateTabCounts();
        }
      }
    };
  }

  // Add Subscription Modal Handlers
  const openModalBtn = document.getElementById('open-create-sub-btn');
  const modal = document.getElementById('create-subscription-modal');
  const closeModalBtn = document.getElementById('close-create-sub-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-create-sub-btn');
  const form = document.getElementById('create-subscription-form');

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
      const customer = document.getElementById('modal-sub-customer')?.value.trim();
      const planVal = document.getElementById('modal-sub-plan')?.value || 'Pro Dedicated VPS|$96.00|VPS Compute';
      const cycle = document.getElementById('modal-sub-cycle')?.value || 'Monthly';
      const node = document.getElementById('modal-sub-node')?.value.trim() || 'vps-lon-01';
      const autoRenew = document.getElementById('modal-sub-autorenew')?.checked ?? true;

      const [planName, price, category] = planVal.split('|');

      if (!customer) return;

      const newSub = {
        id: `SUB-${Math.floor(4000 + Math.random() * 9000)}`,
        planName,
        category,
        customer,
        company: `${customer} Co`,
        email: 'billing@client.com',
        billingCycle: cycle,
        price,
        priceRaw: parseFloat(price.replace(/[^0-9.]/g, '')) || 0,
        currency: 'USD',
        nextRenewal: 'In 30 Days',
        startDate: 'Today',
        autoRenew,
        paymentMethod: 'Stripe (Credit Card)',
        assignedResource: node,
        status: 'active',
        specs: 'Automated Provisioned Resource'
      };

      subscriptionsList.unshift(newSub);
      closeModal();
      updateTabCounts();
      renderTableRows();
    };
  }
}

export function cleanupSubscriptions() {
  currentFilter = 'all';
  currentSearch = '';
  currentCategoryFilter = 'all';
  selectedSubscriptionId = null;
}
