import { createIcons, icons } from 'lucide';

/**
 * Hostlab Coupons & Credits Module
 * Dedicated standalone module for promotional codes, percentage discounts,
 * account wallet credits, partner vouchers, and campaign redemption analytics.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const couponStats = {
  activeCampaigns: 14,
  totalRedeemedSavings: '$18,420.00',
  outstandingWalletCredits: '$4,920.00',
  redemptionRate: '64.2%',
  totalVouchersUsed: 894,
  avgSavingsPerCustomer: '$20.60'
};

export const initialCoupons = [
  {
    id: 'CPN-101',
    code: 'HOSTLAB20',
    campaign: 'Fall Infrastructure Migration Blitz',
    type: 'Percentage Discount',
    value: '20% Off',
    valueDetail: '20% recurring discount for first 12 months',
    usageCount: 248,
    usageLimit: 500,
    applicableService: 'VPS Compute & Web Hosting',
    expiresAt: 'Dec 31, 2024',
    status: 'active', // active | near-limit | expired
    minSpend: '$50.00',
    recentRedemptions: [
      { customer: 'Sarah Jenkins', order: 'INV-2024-108', saved: '$30.00', date: 'Sep 01, 2024' },
      { customer: 'David Vance', order: 'INV-2024-107', saved: '$39.80', date: 'Sep 05, 2024' },
      { customer: 'Alexander Weber', order: 'INV-2024-104', saved: '$9.80', date: 'Sep 18, 2024' }
    ]
  },
  {
    id: 'CPN-102',
    code: 'FOUNDER50',
    campaign: 'Y-Combinator & Techstars Startup Credits',
    type: 'Fixed Credit Grant',
    value: '$50.00 Credit',
    valueDetail: '$50 one-time credit applied to wallet balance',
    usageCount: 82,
    usageLimit: 100,
    applicableService: 'All Services',
    expiresAt: 'Nov 30, 2024',
    status: 'active',
    minSpend: '$0.00',
    recentRedemptions: [
      { customer: 'Elena Rostova', order: 'INV-2024-105', saved: '$50.00', date: 'Sep 12, 2024' }
    ]
  },
  {
    id: 'CPN-103',
    code: 'DEV-COMMUNITY-FREE',
    campaign: 'Open Source Maintainer Sponsorship',
    type: 'Free Trial',
    value: '100% Off',
    valueDetail: '3 months complimentary VPS Pro Compute',
    usageCount: 45,
    usageLimit: 50,
    applicableService: 'VPS Instances (Standard)',
    expiresAt: 'Oct 31, 2024',
    status: 'near-limit',
    minSpend: '$0.00',
    recentRedemptions: [
      { customer: 'Liam Gallagher', order: 'INV-2024-102', saved: '$24.00', date: 'Sep 24, 2024' }
    ]
  },
  {
    id: 'CPN-104',
    code: 'CRD-SLA-REBATE-901',
    campaign: 'Network Maintenance Credit Compensation',
    type: 'Account Credit',
    value: '$25.00 Credit',
    valueDetail: 'Direct ledger adjustment for scheduled maintenance window',
    usageCount: 1,
    usageLimit: 1,
    applicableService: 'Nordic Capital AB (Account Credit)',
    expiresAt: 'Never (Wallet Balance)',
    status: 'active',
    minSpend: '$0.00',
    recentRedemptions: [
      { customer: 'Marcus Lindqvist', order: 'CRD-901', saved: '$25.00', date: 'Sep 10, 2024' }
    ]
  },
  {
    id: 'CPN-105',
    code: 'EMAILPRO10',
    campaign: 'Business Email Launch Special',
    type: 'Percentage Discount',
    value: '10% Off',
    valueDetail: '10% off business email domains and user inboxes',
    usageCount: 114,
    usageLimit: 250,
    applicableService: 'Business Email & Aliases',
    expiresAt: 'Jan 15, 2025',
    status: 'active',
    minSpend: '$20.00',
    recentRedemptions: [
      { customer: 'Julian Moretti', order: 'INV-2024-103', saved: '$2.70', date: 'Sep 22, 2024' }
    ]
  },
  {
    id: 'CPN-106',
    code: 'DEDICATED-ANNUAL-15',
    campaign: 'Annual Bare-Metal Contract Incentive',
    type: 'Percentage Discount',
    value: '15% Off',
    valueDetail: '15% annual contract prepay discount',
    usageCount: 28,
    usageLimit: 100,
    applicableService: 'Dedicated Metal & Bare Servers',
    expiresAt: 'Dec 31, 2024',
    status: 'active',
    minSpend: '$1,000.00',
    recentRedemptions: [
      { customer: 'Marcus Lindqvist', order: 'INV-2024-106', saved: '$432.00', date: 'Sep 10, 2024' }
    ]
  },
  {
    id: 'CPN-107',
    code: 'CRD-OVERCHARGE-REFUND',
    campaign: 'Automated Billing Adjustment',
    type: 'Account Credit',
    value: '$14.00 Credit',
    valueDetail: 'Duplicate domain fee refunded into internal balance',
    usageCount: 1,
    usageLimit: 1,
    applicableService: 'DevStudio Digital (Account Credit)',
    expiresAt: 'Never (Wallet Balance)',
    status: 'active',
    minSpend: '$0.00',
    recentRedemptions: [
      { customer: 'Liam Gallagher', order: 'CRD-812', saved: '$14.00', date: 'Aug 18, 2024' }
    ]
  },
  {
    id: 'CPN-108',
    code: 'SUMMER2023',
    campaign: 'Summer Cloud Clearance 2023',
    type: 'Percentage Discount',
    value: '30% Off',
    valueDetail: '30% discount on first month VPS tier',
    usageCount: 300,
    usageLimit: 300,
    applicableService: 'VPS Compute',
    expiresAt: 'Aug 31, 2023',
    status: 'expired',
    minSpend: '$30.00',
    recentRedemptions: []
  }
];

let couponsList = [...initialCoupons];
let currentFilter = 'all'; // all | active | credits | expired
let currentSearch = '';
let currentTypeFilter = 'all';
let selectedCouponId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderCouponsHTML() {
  const types = Array.from(new Set(couponsList.map(c => c.type))).sort();

  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar (NO CARDS OVERVIEW) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Coupons & Credits
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Manage promotional discount vouchers and customer wallet credits.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-create-coupon-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="tag" class="w-4 h-4"></i>
            <span>New Coupon</span>
          </button>
        </div>
      </div>

      <!-- Controls & Tabs -->
      <div class="space-y-4">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2" id="coupon-filter-tabs">
          <button 
            type="button" 
            data-filter="all" 
            class="cpn-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            All Codes & Credits (<span id="count-all">0</span>)
          </button>
          
          <button 
            type="button" 
            data-filter="active" 
            class="cpn-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'active' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Active Promos (<span id="count-active">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="credits" 
            class="cpn-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'credits' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Account Credits (<span id="count-credits">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="expired" 
            class="cpn-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'expired' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Expired / Depleted (<span id="count-expired">0</span>)
          </button>
        </div>

        <!-- Filter Search & Type Selector -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="coupon-search-input"
              value="${currentSearch}"
              placeholder="Search by code, campaign name, or recipient..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <select 
              id="coupon-type-select" 
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Discount Types</option>
              ${types.map(t => `<option value="${t}" ${currentTypeFilter === t ? 'selected' : ''}>${t}</option>`).join('')}
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
                <th class="py-3 px-4 font-medium">Coupon Code / Credit</th>
                <th class="py-3 px-4 font-medium">Campaign & Service Scope</th>
                <th class="py-3 px-4 font-medium text-right">Discount Value</th>
                <th class="py-3 px-4 font-medium text-right">Usage / Cap</th>
                <th class="py-3 px-4 font-medium">Expiration</th>
                <th class="py-3 px-4 font-medium text-center">Status</th>
                <th class="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="coupon-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <!-- Empty state container -->
        <div id="cpn-empty-state" class="hidden p-12 text-center">
          <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
            <i data-lucide="tag" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No coupons found</h3>
          <p class="text-xs text-zinc-500 max-w-sm mx-auto">
            No promotional codes or credit grants match your current filter.
          </p>
        </div>
      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="coupon-drawer-container"></div>

      <!-- Create Coupon Modal -->
      <div id="create-coupon-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="tag" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold font-display text-zinc-900 dark:text-white text-base">Create Promo Code / Credit</h3>
            </div>
            <button type="button" id="close-create-coupon-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="create-coupon-form" class="p-6 space-y-4 text-xs">
            
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Coupon Code / Voucher</label>
                <input 
                  type="text" 
                  id="modal-cpn-code" 
                  placeholder="e.g. AUTUMN25" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono uppercase focus:outline-none"
                />
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Discount Type</label>
                <select id="modal-cpn-type" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
                  <option value="Percentage Discount">Percentage Discount (%)</option>
                  <option value="Fixed Credit Grant">Fixed Amount Credit ($)</option>
                  <option value="Free Trial">Free Trial Duration</option>
                  <option value="Account Credit">Direct Account Credit Adjustment</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Campaign Name & Description</label>
              <input 
                type="text" 
                id="modal-cpn-campaign" 
                placeholder="Black Friday 2024 Cloud VPS Launch" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Discount Value (e.g. 25% or $50)</label>
                <input 
                  type="text" 
                  id="modal-cpn-value" 
                  placeholder="25% Off" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Redemption Usage Limit</label>
                <input 
                  type="number" 
                  id="modal-cpn-limit" 
                  value="100" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Applicable Service</label>
                <select id="modal-cpn-service" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
                  <option value="All Services">All Infrastructure & Services</option>
                  <option value="VPS Compute">VPS Compute Only</option>
                  <option value="Web Hosting">Web Hosting Only</option>
                  <option value="Business Email">Business Email Only</option>
                </select>
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Expiration Date</label>
                <input 
                  type="text" 
                  id="modal-cpn-expiry" 
                  value="Dec 31, 2024" 
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-create-coupon-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Publish Coupon
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

function getFilteredCoupons() {
  return couponsList.filter(item => {
    // 1. Tab filter
    if (currentFilter === 'active' && item.status !== 'active') return false;
    if (currentFilter === 'credits' && item.type !== 'Account Credit' && item.type !== 'Fixed Credit Grant') return false;
    if (currentFilter === 'expired' && item.status !== 'expired' && item.status !== 'near-limit') return false;

    // 2. Type filter
    if (currentTypeFilter !== 'all' && item.type !== currentTypeFilter) return false;

    // 3. Search query
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchCode = item.code.toLowerCase().includes(q);
      const matchCampaign = item.campaign.toLowerCase().includes(q);
      const matchService = item.applicableService.toLowerCase().includes(q);
      if (!matchCode && !matchCampaign && !matchService) return false;
    }

    return true;
  });
}

function updateTabCounts() {
  const countAll = document.getElementById('count-all');
  const countActive = document.getElementById('count-active');
  const countCredits = document.getElementById('count-credits');
  const countExpired = document.getElementById('count-expired');

  if (countAll) countAll.textContent = couponsList.length;
  if (countActive) countActive.textContent = couponsList.filter(c => c.status === 'active').length;
  if (countCredits) countCredits.textContent = couponsList.filter(c => c.type === 'Account Credit' || c.type === 'Fixed Credit Grant').length;
  if (countExpired) countExpired.textContent = couponsList.filter(c => c.status === 'expired' || c.status === 'near-limit').length;
}

function renderTableRows() {
  const tbody = document.getElementById('coupon-table-body');
  const emptyState = document.getElementById('cpn-empty-state');
  if (!tbody) return;

  const filtered = getFilteredCoupons();

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
    if (item.status === 'near-limit') {
      statusClass = 'text-amber-500';
      statusLabel = 'Near Limit';
    } else if (item.status === 'expired') {
      statusClass = 'text-zinc-500';
      statusLabel = 'Expired';
    }

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Coupon Code / Credit -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          <div class="flex items-center gap-2">
            <i data-lucide="tag" class="w-3.5 h-3.5 text-zinc-400 shrink-0"></i>
            <span class="font-bold tracking-wider">${item.code}</span>
          </div>
          <div class="text-[11px] text-zinc-400 font-sans mt-0.5">${item.type}</div>
        </td>

        <!-- Campaign & Service Scope -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div class="font-medium text-zinc-900 dark:text-white">${item.campaign}</div>
          <div class="text-[11px] text-zinc-400">${item.applicableService}</div>
        </td>

        <!-- Discount Value (clean numbers) -->
        <td class="py-3 px-4 font-mono text-right font-bold text-zinc-900 dark:text-white">
          ${item.value}
        </td>

        <!-- Usage / Cap (clean numbers) -->
        <td class="py-3 px-4 font-mono text-right text-zinc-700 dark:text-zinc-300">
          ${item.usageCount} / ${item.usageLimit}
        </td>

        <!-- Expiration -->
        <td class="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-300">
          ${item.expiresAt}
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
              data-view-cpn="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Inspect Usage & Redemptions"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-copy-cpn="${item.code}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Copy Code"
            >
              <i data-lucide="copy" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-toggle-cpn="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="${item.status === 'active' ? 'Expire / Deactivate' : 'Reactivate'}"
            >
              <i data-lucide="${item.status === 'active' ? 'pause' : 'play'}" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  createIcons({ icons });
}

// ==========================================
// 4. SLIDE-OVER DRAWER (COUPON & REDEMPTIONS)
// ==========================================

function renderCouponDrawer(couponId) {
  const container = document.getElementById('coupon-drawer-container');
  if (!container) return;

  const item = couponsList.find(c => c.id === couponId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let statusClass = 'text-emerald-500';
  let statusLabel = 'Active';
  if (item.status === 'near-limit') {
    statusClass = 'text-amber-500';
    statusLabel = 'Near Limit';
  } else if (item.status === 'expired') {
    statusClass = 'text-zinc-500';
    statusLabel = 'Expired';
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-xl h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>Promotion Campaign</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${statusLabel}</span>
            </div>
            <h2 class="text-xl font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2">
              <i data-lucide="tag" class="w-5 h-5 text-zinc-400"></i>
              <span class="font-mono tracking-wider">${item.code}</span>
            </h2>
            <div class="text-xs text-zinc-400 mt-0.5">${item.campaign}</div>
          </div>
          <button 
            type="button" 
            id="close-cpn-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700 dark:text-zinc-300">
          
          <!-- Discount Rule Specs -->
          <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">DISCOUNT BENEFIT</div>
              <div class="text-xl font-bold text-zinc-900 dark:text-white font-mono mt-0.5">${item.value}</div>
              <div class="text-[11px] text-zinc-400 mt-1">${item.valueDetail}</div>
            </div>
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">USAGE CAPACITY</div>
              <div class="text-xl font-bold text-zinc-900 dark:text-white font-mono mt-0.5">
                ${item.usageCount} <span class="text-xs text-zinc-400 font-normal">/ ${item.usageLimit} claimed</span>
              </div>
              <div class="text-[11px] font-mono text-emerald-500 mt-1">
                ${((item.usageCount / item.usageLimit) * 100).toFixed(1)}% saturation
              </div>
            </div>
          </div>

          <!-- Eligibility Parameters -->
          <div class="space-y-3">
            <div class="text-xs font-mono uppercase text-zinc-500">Campaign Constraints</div>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">APPLICABLE SERVICES</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.applicableService}</div>
              </div>
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">MINIMUM SPEND REQUIREMENT</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.minSpend}</div>
              </div>
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">EXPIRATION DATE</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.expiresAt}</div>
              </div>
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">DISCOUNT CLASSIFICATION</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.type}</div>
              </div>
            </div>
          </div>

          <!-- Recent Redemption Activity -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-zinc-500">Recent Customer Redemptions</span>
              <span class="text-[11px] font-mono text-zinc-400">Live Checkout Ingestion</span>
            </div>

            <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-xs">
              <table class="w-full text-left font-mono">
                <thead class="bg-zinc-50 dark:bg-zinc-800/60 text-[10px] text-zinc-500 uppercase border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th class="py-2.5 px-3">Customer</th>
                    <th class="py-2.5 px-3">Invoice Ref</th>
                    <th class="py-2.5 px-3 text-right">Saved</th>
                    <th class="py-2.5 px-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                  ${item.recentRedemptions.length > 0 ? item.recentRedemptions.map(r => `
                    <tr>
                      <td class="py-2.5 px-3 text-zinc-900 dark:text-white font-medium">${r.customer}</td>
                      <td class="py-2.5 px-3 text-zinc-500">${r.order}</td>
                      <td class="py-2.5 px-3 text-right text-emerald-500 font-semibold">${r.saved}</td>
                      <td class="py-2.5 px-3 text-right text-zinc-400">${r.date}</td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="4" class="py-4 text-center text-zinc-400 font-sans">No redemptions recorded yet for this promotion.</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
          <button 
            type="button" 
            id="drawer-toggle-expire-btn"
            class="px-3 py-2 text-xs font-medium rounded-md text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            ${item.status === 'active' ? 'Expire Campaign' : 'Reactivate Promo'}
          </button>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="drawer-copy-code-btn"
              class="px-3.5 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Copy Code</span>
            </button>
            <button 
              type="button" 
              id="drawer-cpn-done-btn"
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

  const closeBtn = document.getElementById('close-cpn-drawer-btn');
  const doneBtn = document.getElementById('drawer-cpn-done-btn');
  const toggleExpireBtn = document.getElementById('drawer-toggle-expire-btn');
  const copyBtn = document.getElementById('drawer-copy-code-btn');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedCouponId = null;
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

  if (toggleExpireBtn) {
    toggleExpireBtn.onclick = () => {
      item.status = item.status === 'active' ? 'expired' : 'active';
      renderCouponDrawer(item.id);
      renderTableRows();
      updateTabCounts();
    };
  }

  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(item.code);
      const span = copyBtn.querySelector('span');
      if (span) {
        span.textContent = 'Copied!';
        setTimeout(() => { span.textContent = 'Copy Code'; }, 1500);
      }
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupCouponsEvents(onNavigate) {
  createIcons({ icons });
  updateTabCounts();
  renderTableRows();

  // Tab Filtering
  const tabs = document.querySelectorAll('.cpn-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => {
        t.className = 'cpn-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white';
      });
      tab.className = 'cpn-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900';

      currentFilter = tab.getAttribute('data-filter') || 'all';
      renderTableRows();
    };
  });

  // Search input
  const searchInput = document.getElementById('coupon-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Type selector
  const typeSelect = document.getElementById('coupon-type-select');
  if (typeSelect) {
    typeSelect.onchange = (e) => {
      currentTypeFilter = e.target.value;
      renderTableRows();
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('coupon-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-cpn]');
      const copyBtn = e.target.closest('[data-copy-cpn]');
      const toggleBtn = e.target.closest('[data-toggle-cpn]');

      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-cpn');
        selectedCouponId = id;
        renderCouponDrawer(id);
      } else if (copyBtn) {
        const code = copyBtn.getAttribute('data-copy-cpn');
        navigator.clipboard.writeText(code);
        copyBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-500"></i>`;
        createIcons({ icons });
        setTimeout(() => { renderTableRows(); }, 1500);
      } else if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-toggle-cpn');
        const item = couponsList.find(c => c.id === id);
        if (item) {
          item.status = item.status === 'active' ? 'expired' : 'active';
          renderTableRows();
          updateTabCounts();
        }
      }
    };
  }

  // Add Coupon Modal Handlers
  const openModalBtn = document.getElementById('open-create-coupon-btn');
  const modal = document.getElementById('create-coupon-modal');
  const closeModalBtn = document.getElementById('close-create-coupon-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-create-coupon-btn');
  const form = document.getElementById('create-coupon-form');

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
      const code = document.getElementById('modal-cpn-code')?.value.trim().toUpperCase();
      const type = document.getElementById('modal-cpn-type')?.value || 'Percentage Discount';
      const campaign = document.getElementById('modal-cpn-campaign')?.value.trim();
      const value = document.getElementById('modal-cpn-value')?.value.trim();
      const limit = parseInt(document.getElementById('modal-cpn-limit')?.value || '100', 10);
      const service = document.getElementById('modal-cpn-service')?.value || 'All Services';
      const expiry = document.getElementById('modal-cpn-expiry')?.value.trim() || 'Dec 31, 2024';

      if (!code || !campaign || !value) return;

      const newCoupon = {
        id: `CPN-${Math.floor(100 + Math.random() * 900)}`,
        code,
        campaign,
        type,
        value,
        valueDetail: `${value} applicable to ${service}`,
        usageCount: 0,
        usageLimit: limit,
        applicableService: service,
        expiresAt: expiry,
        status: 'active',
        minSpend: '$0.00',
        recentRedemptions: []
      };

      couponsList.unshift(newCoupon);
      closeModal();
      updateTabCounts();
      renderTableRows();
    };
  }
}

export function cleanupCoupons() {
  currentFilter = 'all';
  currentSearch = '';
  currentTypeFilter = 'all';
  selectedCouponId = null;
}
