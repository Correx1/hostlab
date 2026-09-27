import { createIcons, icons } from 'lucide';

/**
 * Hostlab Customers Module
 * Dedicated standalone module for customer lifecycle management, CRM profiles,
 * active service subscriptions, billing history, and client impersonation.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const customerStats = {
  totalCustomers: 1842,
  activeAccounts: 1780,
  monthlyRecurringRevenue: '$42,850',
  avgCustomerLtv: '$1,280',
  verifiedKycRate: '96.4%',
  churnRate: '0.8%'
};

export const initialCustomers = [
  {
    id: 'CUST-1042',
    name: 'Sarah Jenkins',
    company: 'TechFlow Media LLC',
    email: 'sarah@techflow-media.com',
    phone: '+1 (555) 234-8901',
    country: 'United States',
    currency: 'USD',
    taxId: 'US-EIN-9482018',
    activeServicesCount: 4,
    servicesList: [
      { name: 'vps-lon-01 (Pro 8C/32G)', type: 'VPS Instance', cost: '$96.00/mo' },
      { name: 'techflow-media.com', type: 'Registered Domain', cost: '$14.00/yr' },
      { name: 'Pro Mail (20 Inboxes)', type: 'Business Email', cost: '$40.00/mo' },
      { name: 'Wildcard SSL (*.techflow-media.com)', type: 'SSL Cert', cost: '$0.00/mo' }
    ],
    totalSpend: '$2,480.00',
    joinedDate: 'Mar 12, 2024',
    lastLogin: '12 minutes ago',
    twoFactorEnabled: true,
    status: 'active', // active | pending | suspended
    recentInvoices: [
      { id: 'INV-2024-089', date: 'Sep 01, 2024', amount: '$150.00', status: 'Paid' },
      { id: 'INV-2024-044', date: 'Aug 01, 2024', amount: '$150.00', status: 'Paid' },
      { id: 'INV-2024-012', date: 'Jul 01, 2024', amount: '$150.00', status: 'Paid' }
    ]
  },
  {
    id: 'CUST-1043',
    name: 'David Vance',
    company: 'Apex Studios Design Ltd',
    email: 'david@apexstudios.design',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    currency: 'GBP',
    taxId: 'GB-VAT-8849102',
    activeServicesCount: 5,
    servicesList: [
      { name: 'app-fra-02 (Web Node)', type: 'VPS Instance', cost: '£64.00/mo' },
      { name: 'apexstudios.design', type: 'Registered Domain', cost: '£18.00/yr' },
      { name: 'Enterprise Mail (50 Inboxes)', type: 'Business Email', cost: '£80.00/mo' },
      { name: 'Managed MySQL Cluster', type: 'Database', cost: '£45.00/mo' },
      { name: 'Anycast DNS Pro', type: 'DNS Zone', cost: '£10.00/mo' }
    ],
    totalSpend: '£3,840.00',
    joinedDate: 'Jan 20, 2024',
    lastLogin: 'Just now',
    twoFactorEnabled: true,
    status: 'active',
    recentInvoices: [
      { id: 'INV-2024-092', date: 'Sep 05, 2024', amount: '£199.00', status: 'Paid' },
      { id: 'INV-2024-051', date: 'Aug 05, 2024', amount: '£199.00', status: 'Paid' }
    ]
  },
  {
    id: 'CUST-1044',
    name: 'Marcus Lindqvist',
    company: 'Nordic Capital AB',
    email: 'marcus@nordicfintech.se',
    phone: '+46 8 123 4567',
    country: 'Sweden',
    currency: 'EUR',
    taxId: 'SE-ORG-5569123',
    activeServicesCount: 3,
    servicesList: [
      { name: 'vps-sto-01 (Dedicated 16C)', type: 'Dedicated VPS', cost: '€240.00/mo' },
      { name: 'nordicfintech.se', type: 'Registered Domain', cost: '€24.00/yr' },
      { name: 'Compliant S3 Cold Vault', type: 'Storage', cost: '€50.00/mo' }
    ],
    totalSpend: '€4,620.00',
    joinedDate: 'Apr 02, 2024',
    lastLogin: '2 hours ago',
    twoFactorEnabled: true,
    status: 'active',
    recentInvoices: [
      { id: 'INV-2024-098', date: 'Sep 10, 2024', amount: '€292.00', status: 'Paid' }
    ]
  },
  {
    id: 'CUST-1045',
    name: 'Elena Rostova',
    company: 'CloudScale SaaS Corp',
    email: 'elena@cloudscale-saas.net',
    phone: '+1 (415) 890-1244',
    country: 'United States',
    currency: 'USD',
    taxId: 'US-EIN-3819024',
    activeServicesCount: 6,
    servicesList: [
      { name: 'k8s-cluster-primary', type: 'Kubernetes Cluster', cost: '$320.00/mo' },
      { name: 'cloudscale-saas.net', type: 'Registered Domain', cost: '$12.00/yr' },
      { name: 'Edge CDN Global Cache', type: 'CDN & WAF', cost: '$80.00/mo' }
    ],
    totalSpend: '$5,910.00',
    joinedDate: 'Feb 15, 2024',
    lastLogin: '1 hour ago',
    twoFactorEnabled: true,
    status: 'active',
    recentInvoices: [
      { id: 'INV-2024-101', date: 'Sep 12, 2024', amount: '$412.00', status: 'Paid' }
    ]
  },
  {
    id: 'CUST-1046',
    name: 'Julian Moretti',
    company: 'Urban Bistro Hospitality',
    email: 'julian@urbanbistro.io',
    phone: '+1 (312) 555-0199',
    country: 'United States',
    currency: 'USD',
    taxId: 'US-EIN-7729103',
    activeServicesCount: 2,
    servicesList: [
      { name: 'app-ams-01 (Standard WordPress)', type: 'Web Hosting', cost: '$24.00/mo' },
      { name: 'urbanbistro.io', type: 'Registered Domain', cost: '$38.00/yr' }
    ],
    totalSpend: '$420.00',
    joinedDate: 'Jun 10, 2024',
    lastLogin: '3 days ago',
    twoFactorEnabled: false,
    status: 'active',
    recentInvoices: [
      { id: 'INV-2024-077', date: 'Sep 01, 2024', amount: '$27.00', status: 'Paid' }
    ]
  },
  {
    id: 'CUST-1047',
    name: 'Alexander Weber',
    company: 'Nexus Logistics GmbH',
    email: 'a.weber@nexus-logistics.de',
    phone: '+49 30 901820',
    country: 'Germany',
    currency: 'EUR',
    taxId: 'DE-UST-992014',
    activeServicesCount: 2,
    servicesList: [
      { name: 'app-fra-02 (API Gateway)', type: 'VPS Instance', cost: '€48.00/mo' },
      { name: 'nexus-logistics.de', type: 'Registered Domain', cost: '€14.00/yr' }
    ],
    totalSpend: '€780.00',
    joinedDate: 'May 04, 2024',
    lastLogin: 'Yesterday',
    twoFactorEnabled: true,
    status: 'active',
    recentInvoices: [
      { id: 'INV-2024-068', date: 'Sep 04, 2024', amount: '€49.00', status: 'Paid' }
    ]
  },
  {
    id: 'CUST-1048',
    name: 'Liam Gallagher',
    company: 'Velocity Autos Ltd',
    email: 'liam@velocityautos.co.uk',
    phone: '+44 161 496 0231',
    country: 'United Kingdom',
    currency: 'GBP',
    taxId: 'GB-VAT-4410291',
    activeServicesCount: 1,
    servicesList: [
      { name: 'velocityautos.co.uk', type: 'Registered Domain', cost: '£14.00/yr' }
    ],
    totalSpend: '£140.00',
    joinedDate: 'Aug 18, 2024',
    lastLogin: '5 days ago',
    twoFactorEnabled: false,
    status: 'pending', // pending KYC verification
    recentInvoices: [
      { id: 'INV-2024-081', date: 'Aug 18, 2024', amount: '£14.00', status: 'Paid' }
    ]
  },
  {
    id: 'CUST-1049',
    name: 'Viktor Krum',
    company: 'SolarPulse Energy Systems',
    email: 'v.krum@solarpulse.energy',
    phone: '+359 2 981 4455',
    country: 'Bulgaria',
    currency: 'EUR',
    taxId: 'BG-VAT-2019481',
    activeServicesCount: 1,
    servicesList: [
      { name: 'solarpulse.energy', type: 'Registered Domain', cost: '€32.00/yr' }
    ],
    totalSpend: '€190.00',
    joinedDate: 'Jul 22, 2024',
    lastLogin: '18 days ago',
    twoFactorEnabled: false,
    status: 'suspended', // suspended for past due invoice
    recentInvoices: [
      { id: 'INV-2024-071', date: 'Aug 22, 2024', amount: '€32.00', status: 'Unpaid (Overdue)' }
    ]
  }
];

let customersList = [...initialCustomers];
let currentFilter = 'all'; // all | active | pending | suspended
let currentSearch = '';
let currentCountryFilter = 'all';
let selectedCustomerId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderCustomersHTML() {
  const countries = Array.from(new Set(customersList.map(c => c.country))).sort();

  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar (NO CARDS OVERVIEW) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Customers
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Manage organization accounts, subscriptions, and profile details.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-create-customer-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="user-plus" class="w-4 h-4"></i>
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      <!-- Controls & Tabs -->
      <div class="space-y-4">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2" id="customer-filter-tabs">
          <button 
            type="button" 
            data-filter="all" 
            class="cust-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            All Accounts (<span id="count-all">0</span>)
          </button>
          
          <button 
            type="button" 
            data-filter="active" 
            class="cust-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'active' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Active (<span id="count-active">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="pending" 
            class="cust-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'pending' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Pending Verification (<span id="count-pending">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="suspended" 
            class="cust-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'suspended' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Suspended (<span id="count-suspended">0</span>)
          </button>
        </div>

        <!-- Filter Search & Country Selector -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="customer-search-input"
              value="${currentSearch}"
              placeholder="Search by name, company, email, or account ID..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <select 
              id="customer-country-select" 
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Jurisdictions</option>
              ${countries.map(c => `<option value="${c}" ${currentCountryFilter === c ? 'selected' : ''}>${c}</option>`).join('')}
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
                <th class="py-3 px-4 font-medium">Customer & Company</th>
                <th class="py-3 px-4 font-medium">Contact Email</th>
                <th class="py-3 px-4 font-medium text-center">Active Services</th>
                <th class="py-3 px-4 font-medium text-right">Lifetime Spend</th>
                <th class="py-3 px-4 font-medium">Joined Date</th>
                <th class="py-3 px-4 font-medium text-center">Status</th>
                <th class="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="customer-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <!-- Empty state container -->
        <div id="cust-empty-state" class="hidden p-12 text-center">
          <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
            <i data-lucide="users" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No customers found</h3>
          <p class="text-xs text-zinc-500 max-w-sm mx-auto">
            No customer accounts match your current filter or query parameters.
          </p>
        </div>
      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="customer-drawer-container"></div>

      <!-- Add Customer Modal -->
      <div id="create-customer-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="user-plus" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold font-display text-zinc-900 dark:text-white text-base">Register Customer</h3>
            </div>
            <button type="button" id="close-create-cust-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="create-customer-form" class="p-6 space-y-4 text-xs">
            
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  id="modal-cust-name" 
                  placeholder="Sarah Jenkins" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Company / Org</label>
                <input 
                  type="text" 
                  id="modal-cust-company" 
                  placeholder="Acme Studio LLC" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Primary Email Address</label>
              <input 
                type="email" 
                id="modal-cust-email" 
                placeholder="billing@company.com" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Country / Jurisdiction</label>
                <select id="modal-cust-country" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
                  <option value="United States">United States (USD)</option>
                  <option value="United Kingdom">United Kingdom (GBP)</option>
                  <option value="Germany">Germany (EUR)</option>
                  <option value="Sweden">Sweden (EUR)</option>
                  <option value="Bulgaria">Bulgaria (EUR)</option>
                </select>
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Phone Number</label>
                <input 
                  type="text" 
                  id="modal-cust-phone" 
                  placeholder="+1 (555) 000-0000" 
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="modal-cust-send-welcome" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 w-4 h-4" />
                <span>Send automated onboarding email with temporary password</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="modal-cust-require-2fa" checked class="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 w-4 h-4" />
                <span>Enforce Two-Factor Authentication (2FA) on first login</span>
              </label>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-create-cust-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Create Account
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

function getFilteredCustomers() {
  return customersList.filter(item => {
    // 1. Tab filter
    if (currentFilter === 'active' && item.status !== 'active') return false;
    if (currentFilter === 'pending' && item.status !== 'pending') return false;
    if (currentFilter === 'suspended' && item.status !== 'suspended') return false;

    // 2. Country filter
    if (currentCountryFilter !== 'all' && item.country !== currentCountryFilter) return false;

    // 3. Search query
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchCompany = item.company.toLowerCase().includes(q);
      const matchEmail = item.email.toLowerCase().includes(q);
      const matchId = item.id.toLowerCase().includes(q);
      if (!matchName && !matchCompany && !matchEmail && !matchId) return false;
    }

    return true;
  });
}

function updateTabCounts() {
  const countAll = document.getElementById('count-all');
  const countActive = document.getElementById('count-active');
  const countPending = document.getElementById('count-pending');
  const countSuspended = document.getElementById('count-suspended');

  if (countAll) countAll.textContent = customersList.length;
  if (countActive) countActive.textContent = customersList.filter(c => c.status === 'active').length;
  if (countPending) countPending.textContent = customersList.filter(c => c.status === 'pending').length;
  if (countSuspended) countSuspended.textContent = customersList.filter(c => c.status === 'suspended').length;
}

function renderTableRows() {
  const tbody = document.getElementById('customer-table-body');
  const emptyState = document.getElementById('cust-empty-state');
  if (!tbody) return;

  const filtered = getFilteredCustomers();

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
    if (item.status === 'pending') {
      statusClass = 'text-amber-500';
      statusLabel = 'Pending KYC';
    } else if (item.status === 'suspended') {
      statusClass = 'text-rose-500';
      statusLabel = 'Suspended';
    }

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Customer & Company -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          <div class="flex items-center gap-2">
            <i data-lucide="user" class="w-3.5 h-3.5 text-zinc-400 shrink-0"></i>
            <span>${item.name}</span>
          </div>
          <div class="text-[11px] text-zinc-400 font-sans mt-0.5">${item.company} • ${item.id}</div>
        </td>

        <!-- Contact Email -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div>${item.email}</div>
          <div class="text-[11px] text-zinc-400">${item.country}</div>
        </td>

        <!-- Active Services (clean numbers only) -->
        <td class="py-3 px-4 font-mono text-center font-bold text-zinc-900 dark:text-zinc-100">
          ${item.activeServicesCount}
        </td>

        <!-- Lifetime Spend (clean numbers) -->
        <td class="py-3 px-4 font-mono text-right font-medium text-zinc-900 dark:text-white">
          ${item.totalSpend}
        </td>

        <!-- Joined Date -->
        <td class="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-300">
          ${item.joinedDate}
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
              data-view-cust="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Inspect 360 Customer Profile"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-impersonate-cust="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Impersonate (Login as Client)"
            >
              <i data-lucide="log-in" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-toggle-cust="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="${item.status === 'active' ? 'Suspend Account' : 'Activate Account'}"
            >
              <i data-lucide="${item.status === 'active' ? 'ban' : 'check'}" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  createIcons({ icons });
}

// ==========================================
// 4. SLIDE-OVER DRAWER (CUSTOMER 360 PROFILE)
// ==========================================

function renderCustomerDrawer(customerId) {
  const container = document.getElementById('customer-drawer-container');
  if (!container) return;

  const item = customersList.find(c => c.id === customerId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let statusClass = 'text-emerald-500';
  let statusLabel = 'Active';
  if (item.status === 'pending') {
    statusClass = 'text-amber-500';
    statusLabel = 'Pending KYC';
  } else if (item.status === 'suspended') {
    statusClass = 'text-rose-500';
    statusLabel = 'Suspended';
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-xl h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>Customer Profile</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${statusLabel}</span>
            </div>
            <h2 class="text-xl font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2">
              <i data-lucide="user" class="w-5 h-5 text-zinc-400"></i>
              <span>${item.name}</span>
            </h2>
            <div class="text-xs text-zinc-400 mt-0.5">${item.company} • ${item.id}</div>
          </div>
          <button 
            type="button" 
            id="close-cust-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700 dark:text-zinc-300">
          
          <!-- Quick Overview Card -->
          <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 grid grid-cols-2 gap-3 text-xs">
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">LIFETIME REVENUE</div>
              <div class="text-lg font-bold text-zinc-900 dark:text-white font-mono mt-0.5">${item.totalSpend}</div>
            </div>
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">ACTIVE SUBSCRIPTIONS</div>
              <div class="text-lg font-bold text-zinc-900 dark:text-white font-mono mt-0.5">${item.activeServicesCount} Services</div>
            </div>
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">SECURITY POSTURE</div>
              <div class="font-mono mt-0.5 ${item.twoFactorEnabled ? 'text-emerald-500 font-semibold' : 'text-amber-500'}">
                ${item.twoFactorEnabled ? '2FA Enforced' : 'No 2FA'}
              </div>
            </div>
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">LAST SESSION</div>
              <div class="font-mono text-zinc-700 dark:text-zinc-300 mt-0.5">${item.lastLogin}</div>
            </div>
          </div>

          <!-- Contact & Billing Info -->
          <div class="space-y-3">
            <div class="text-xs font-mono uppercase text-zinc-500">Account Credentials & Tax Details</div>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">EMAIL ADDRESS</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1 break-all">${item.email}</div>
              </div>
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">PHONE NUMBER</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.phone}</div>
              </div>
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">TAX IDENTIFIER</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.taxId}</div>
              </div>
              <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                <div class="text-zinc-500 text-[11px] font-mono">MEMBER SINCE</div>
                <div class="font-semibold text-zinc-900 dark:text-white mt-1">${item.joinedDate}</div>
              </div>
            </div>
          </div>

          <!-- Active Services List -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-zinc-500">Active Provisioned Services (${item.servicesList.length})</span>
              <span class="text-[11px] font-mono text-zinc-400">All Nodes Healthy</span>
            </div>
            
            <div class="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-xs">
              ${item.servicesList.map(srv => `
                <div class="p-3 bg-white dark:bg-zinc-900/50 flex items-center justify-between">
                  <div>
                    <div class="font-mono font-medium text-zinc-900 dark:text-white">${srv.name}</div>
                    <div class="text-[11px] text-zinc-400">${srv.type}</div>
                  </div>
                  <div class="font-mono text-zinc-900 dark:text-white font-semibold">
                    ${srv.cost}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Billing Invoices History -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-zinc-500">Recent Invoices</span>
              <span class="text-[11px] font-mono text-zinc-400">Auto-Billed</span>
            </div>

            <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-xs">
              <table class="w-full text-left font-mono">
                <thead class="bg-zinc-50 dark:bg-zinc-800/60 text-[10px] text-zinc-500 uppercase border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th class="py-2 px-3">Invoice</th>
                    <th class="py-2 px-3">Date</th>
                    <th class="py-2 px-3 text-right">Amount</th>
                    <th class="py-2 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                  ${item.recentInvoices.map(inv => `
                    <tr>
                      <td class="py-2.5 px-3 text-zinc-900 dark:text-white font-medium">${inv.id}</td>
                      <td class="py-2.5 px-3 text-zinc-500">${inv.date}</td>
                      <td class="py-2.5 px-3 text-right text-zinc-900 dark:text-white">${inv.amount}</td>
                      <td class="py-2.5 px-3 text-right">
                        <span class="${inv.status.includes('Paid') ? 'text-emerald-500' : 'text-rose-500'} font-medium">
                          ${inv.status}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
          <button 
            type="button" 
            id="drawer-toggle-suspend-btn"
            class="px-3 py-2 text-xs font-medium rounded-md text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            ${item.status === 'active' ? 'Suspend Account' : 'Restore Account'}
          </button>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="drawer-impersonate-btn"
              class="px-3.5 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
              <span>Impersonate Client</span>
            </button>
            <button 
              type="button" 
              id="drawer-cust-done-btn"
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

  const closeBtn = document.getElementById('close-cust-drawer-btn');
  const doneBtn = document.getElementById('drawer-cust-done-btn');
  const suspendBtn = document.getElementById('drawer-toggle-suspend-btn');
  const impersonateBtn = document.getElementById('drawer-impersonate-btn');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedCustomerId = null;
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

  if (suspendBtn) {
    suspendBtn.onclick = () => {
      item.status = item.status === 'active' ? 'suspended' : 'active';
      renderCustomerDrawer(item.id);
      renderTableRows();
      updateTabCounts();
    };
  }

  if (impersonateBtn) {
    impersonateBtn.onclick = () => {
      const span = impersonateBtn.querySelector('span');
      if (span) {
        span.textContent = 'Launching session...';
        setTimeout(() => {
          span.textContent = 'Impersonate Client';
          closeDrawer();
        }, 800);
      }
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupCustomersEvents(onNavigate) {
  createIcons({ icons });
  updateTabCounts();
  renderTableRows();

  // Tab Filtering
  const tabs = document.querySelectorAll('.cust-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => {
        t.className = 'cust-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white';
      });
      tab.className = 'cust-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900';

      currentFilter = tab.getAttribute('data-filter') || 'all';
      renderTableRows();
    };
  });

  // Search input
  const searchInput = document.getElementById('customer-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Country selector
  const countrySelect = document.getElementById('customer-country-select');
  if (countrySelect) {
    countrySelect.onchange = (e) => {
      currentCountryFilter = e.target.value;
      renderTableRows();
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('customer-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-cust]');
      const impBtn = e.target.closest('[data-impersonate-cust]');
      const toggleBtn = e.target.closest('[data-toggle-cust]');

      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-cust');
        selectedCustomerId = id;
        renderCustomerDrawer(id);
      } else if (impBtn) {
        const id = impBtn.getAttribute('data-impersonate-cust');
        selectedCustomerId = id;
        renderCustomerDrawer(id);
      } else if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-toggle-cust');
        const item = customersList.find(c => c.id === id);
        if (item) {
          item.status = item.status === 'active' ? 'suspended' : 'active';
          renderTableRows();
          updateTabCounts();
        }
      }
    };
  }

  // Add Customer Modal Handlers
  const openModalBtn = document.getElementById('open-create-customer-btn');
  const modal = document.getElementById('create-customer-modal');
  const closeModalBtn = document.getElementById('close-create-cust-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-create-cust-btn');
  const form = document.getElementById('create-customer-form');

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
      const name = document.getElementById('modal-cust-name')?.value.trim();
      const company = document.getElementById('modal-cust-company')?.value.trim();
      const email = document.getElementById('modal-cust-email')?.value.trim();
      const country = document.getElementById('modal-cust-country')?.value || 'United States';
      const phone = document.getElementById('modal-cust-phone')?.value.trim() || '+1 (555) 000-0000';
      const enforce2FA = document.getElementById('modal-cust-require-2fa')?.checked ?? true;

      if (!name || !company || !email) return;

      const newCust = {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        company,
        email,
        phone,
        country,
        currency: country === 'United Kingdom' ? 'GBP' : (country === 'United States' ? 'USD' : 'EUR'),
        taxId: `${country.substring(0, 2).toUpperCase()}-TAX-${Math.floor(100000 + Math.random() * 900000)}`,
        activeServicesCount: 0,
        servicesList: [],
        totalSpend: '$0.00',
        joinedDate: 'Today',
        lastLogin: 'Never',
        twoFactorEnabled: enforce2FA,
        status: 'active',
        recentInvoices: []
      };

      customersList.unshift(newCust);
      closeModal();
      updateTabCounts();
      renderTableRows();
    };
  }
}

export function cleanupCustomers() {
  currentFilter = 'all';
  currentSearch = '';
  currentCountryFilter = 'all';
  selectedCustomerId = null;
}
