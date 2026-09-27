import { createIcons, icons } from 'lucide';

/**
 * Hostlab Plans & Pricing Module
 * Manage service plan catalog: VPS, Hosting, Email, and Domain plans.
 * Admins can view, edit pricing, toggle visibility, and manage plan tiers.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

let activePlanTab = 'vps'; // 'vps' | 'hosting' | 'email' | 'domains'
let selectedPlanId = null;

export const planCatalog = {
  vps: [
    {
      id: 'vps-starter',
      name: 'Cloud VPS Starter',
      vcpu: 1, ramGB: 2, diskGB: 25, transferTB: 10,
      price: 5.00, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 284,
      description: 'Entry-level KVM instance for dev workloads and staging environments.'
    },
    {
      id: 'vps-standard',
      name: 'Cloud VPS Standard',
      vcpu: 2, ramGB: 4, diskGB: 50, transferTB: 20,
      price: 9.90, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 618,
      description: 'Reliable 2-core instance for small production apps and CMS sites.'
    },
    {
      id: 'vps-pro',
      name: 'Cloud VPS Pro',
      vcpu: 4, ramGB: 8, diskGB: 100, transferTB: 30,
      price: 19.90, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 402,
      description: 'High-performance node for eCommerce, Node.js and PHP applications.'
    },
    {
      id: 'vps-dedicated',
      name: 'Dedicated VPS 16',
      vcpu: 8, ramGB: 16, diskGB: 200, transferTB: 40,
      price: 39.90, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 198,
      description: 'Dedicated vCPU allocation for high-traffic production workloads.'
    },
    {
      id: 'vps-bare-metal',
      name: 'Bare Metal Node',
      vcpu: 16, ramGB: 64, diskGB: 1000, transferTB: 100,
      price: 149.00, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 54,
      description: 'Dedicated physical server with full hardware isolation.'
    }
  ],
  hosting: [
    {
      id: 'host-starter',
      name: 'Starter Cloud',
      sites: 1, diskGB: 15, bandwidth: '200 GB', cpanelAccounts: 1,
      price: 4.99, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 1102,
      description: 'Single site hosting with cPanel, PHP 8.3, and free SSL.'
    },
    {
      id: 'host-business',
      name: 'Business Pro',
      sites: 10, diskGB: 50, bandwidth: '1 TB', cpanelAccounts: 10,
      price: 12.99, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 648,
      description: 'Multi-site NVMe hosting with priority support and staging.'
    },
    {
      id: 'host-agency',
      name: 'Agency Unlimited',
      sites: 'Unlimited', diskGB: 150, bandwidth: 'Unlimited', cpanelAccounts: 'Unlimited',
      price: 29.99, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 204,
      description: 'White-label reseller ready. Unlimited sites on NVMe cluster nodes.'
    }
  ],
  email: [
    {
      id: 'mail-starter',
      name: 'Business Mail Starter',
      mailboxes: 5, storageGB: 10, aliases: 20,
      price: 4.99, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 388,
      description: '5 professional IMAP inboxes with SPF/DKIM aligned sending.'
    },
    {
      id: 'mail-pro',
      name: 'Business Mail Pro',
      mailboxes: 20, storageGB: 50, aliases: 100,
      price: 12.99, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 214,
      description: '20 mailboxes, calendar sync, and advanced spam filtering.'
    },
    {
      id: 'mail-enterprise',
      name: 'Enterprise Email Pool',
      mailboxes: 50, storageGB: 250, aliases: 'Unlimited',
      price: 39.99, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 88,
      description: 'Full enterprise mail deployment with priority relay and SLA.'
    }
  ],
  domains: [
    {
      id: 'dom-com',
      name: '.com Domain',
      tld: '.com', registrationYrs: 1,
      price: 12.99, renewalPrice: 14.99, currency: 'USD',
      visible: true,
      activeSubscriptions: 4210,
      description: 'Most popular global TLD. Includes free WHOIS privacy.'
    },
    {
      id: 'dom-net',
      name: '.net Domain',
      tld: '.net', registrationYrs: 1,
      price: 13.99, renewalPrice: 15.99, currency: 'USD',
      visible: true,
      activeSubscriptions: 1180,
      description: 'Technology and network-focused TLD.'
    },
    {
      id: 'dom-io',
      name: '.io Domain',
      tld: '.io', registrationYrs: 1,
      price: 39.99, renewalPrice: 42.99, currency: 'USD',
      visible: true,
      activeSubscriptions: 864,
      description: 'Popular with SaaS startups and tech companies.'
    },
    {
      id: 'dom-co-uk',
      name: '.co.uk Domain',
      tld: '.co.uk', registrationYrs: 2,
      price: 9.99, renewalPrice: 11.99, currency: 'GBP',
      visible: true,
      activeSubscriptions: 620,
      description: 'UK-specific TLD for British businesses.'
    }
  ]
};

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderPlansHTML() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Plans &amp; Pricing
          </h1>
          <p class="text-xs text-zinc-500 mt-1">Manage the service plan catalog available to customers.</p>
        </div>
        <button
          type="button"
          id="add-plan-btn"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
        >
          <i data-lucide="plus" class="w-4 h-4"></i>
          Add Plan
        </button>
      </div>

      <!-- Tab Navigation -->
      <div class="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto pb-px">
        ${[
          { id: 'vps', label: 'VPS Instances' },
          { id: 'hosting', label: 'Web Hosting' },
          { id: 'email', label: 'Business Email' },
          { id: 'domains', label: 'Domains' }
        ].map(t => `
          <button
            type="button"
            data-plan-tab="${t.id}"
            class="plan-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${activePlanTab === t.id ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
          >${t.label}</button>
        `).join('')}
      </div>

      <!-- Plan Table -->
      <div id="plans-table-container">
        <!-- Rendered by JS -->
      </div>

    </div>

    <!-- Edit Plan Drawer -->
    <div
      id="plan-drawer"
      class="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col"
    >
      <div class="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <h2 id="plan-drawer-title" class="text-sm font-bold text-zinc-900 dark:text-white">Edit Plan</h2>
        <button type="button" id="plan-drawer-close" class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <div id="plan-drawer-body" class="flex-1 overflow-y-auto p-6 space-y-5 text-xs"></div>
      <div class="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
        <button type="button" id="plan-drawer-delete" class="text-xs text-rose-500 hover:text-rose-600 font-medium cursor-pointer">Remove Plan</button>
        <button type="button" id="plan-drawer-save" class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 cursor-pointer">Save Changes</button>
      </div>
    </div>
    <div id="plan-overlay" class="fixed inset-0 bg-black/50 z-40 hidden"></div>
  `;
}

// ==========================================
// 3. TABLE RENDERERS
// ==========================================

function renderPlansTable(tab) {
  const plans = planCatalog[tab] || [];
  if (tab === 'vps') return renderVpsTable(plans);
  if (tab === 'hosting') return renderHostingTable(plans);
  if (tab === 'email') return renderEmailTable(plans);
  if (tab === 'domains') return renderDomainsTable(plans);
  return '';
}

function tableHead(...cols) {
  return `
    <thead>
      <tr class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
        ${cols.map(c => `<th class="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-zinc-500">${c}</th>`).join('')}
        <th class="px-4 py-3"></th>
      </tr>
    </thead>
  `;
}

function editBtn(id, tab) {
  return `<button type="button" data-edit-plan="${id}" data-plan-tab="${tab}" class="plan-edit-btn px-2.5 py-1 text-[11px] font-mono rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 cursor-pointer">Edit</button>`;
}

function renderVpsTable(plans) {
  return `<div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"><table class="w-full text-xs">
    ${tableHead('Plan', 'Specs', 'Price / mo', 'Subscriptions', 'Visible')}
    <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
      ${plans.map(p => `<tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
        <td class="px-4 py-3.5"><div class="font-medium text-zinc-900 dark:text-white">${p.name}</div><div class="text-[11px] text-zinc-400 mt-0.5 max-w-xs truncate">${p.description}</div></td>
        <td class="px-4 py-3.5 font-mono text-zinc-500">${p.vcpu}vCPU · ${p.ramGB}GB RAM · ${p.diskGB}GB</td>
        <td class="px-4 py-3.5 font-mono font-semibold text-zinc-900 dark:text-white">$${p.price.toFixed(2)}</td>
        <td class="px-4 py-3.5 text-zinc-500">${p.activeSubscriptions.toLocaleString()}</td>
        <td class="px-4 py-3.5">${renderPlanToggle(p.id, p.visible)}</td>
        <td class="px-4 py-3.5 text-right">${editBtn(p.id, 'vps')}</td>
      </tr>`).join('')}
    </tbody>
  </table></div>`;
}

function renderHostingTable(plans) {
  return `<div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"><table class="w-full text-xs">
    ${tableHead('Plan', 'Limits', 'Price / mo', 'Subscriptions', 'Visible')}
    <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
      ${plans.map(p => `<tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
        <td class="px-4 py-3.5"><div class="font-medium text-zinc-900 dark:text-white">${p.name}</div><div class="text-[11px] text-zinc-400 mt-0.5 max-w-xs truncate">${p.description}</div></td>
        <td class="px-4 py-3.5 font-mono text-zinc-500">${p.sites} site(s) · ${p.diskGB}GB · ${p.bandwidth}</td>
        <td class="px-4 py-3.5 font-mono font-semibold text-zinc-900 dark:text-white">$${p.price.toFixed(2)}</td>
        <td class="px-4 py-3.5 text-zinc-500">${p.activeSubscriptions.toLocaleString()}</td>
        <td class="px-4 py-3.5">${renderPlanToggle(p.id, p.visible)}</td>
        <td class="px-4 py-3.5 text-right">${editBtn(p.id, 'hosting')}</td>
      </tr>`).join('')}
    </tbody>
  </table></div>`;
}

function renderEmailTable(plans) {
  return `<div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"><table class="w-full text-xs">
    ${tableHead('Plan', 'Mailboxes / Storage', 'Price / mo', 'Subscriptions', 'Visible')}
    <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
      ${plans.map(p => `<tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
        <td class="px-4 py-3.5"><div class="font-medium text-zinc-900 dark:text-white">${p.name}</div><div class="text-[11px] text-zinc-400 mt-0.5 max-w-xs truncate">${p.description}</div></td>
        <td class="px-4 py-3.5 font-mono text-zinc-500">${p.mailboxes} inboxes · ${p.storageGB}GB</td>
        <td class="px-4 py-3.5 font-mono font-semibold text-zinc-900 dark:text-white">$${p.price.toFixed(2)}</td>
        <td class="px-4 py-3.5 text-zinc-500">${p.activeSubscriptions.toLocaleString()}</td>
        <td class="px-4 py-3.5">${renderPlanToggle(p.id, p.visible)}</td>
        <td class="px-4 py-3.5 text-right">${editBtn(p.id, 'email')}</td>
      </tr>`).join('')}
    </tbody>
  </table></div>`;
}

function renderDomainsTable(plans) {
  return `<div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"><table class="w-full text-xs">
    ${tableHead('TLD', 'Registration', 'Renewal', 'Active Domains', 'Visible')}
    <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
      ${plans.map(p => `<tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
        <td class="px-4 py-3.5"><div class="font-mono font-semibold text-zinc-900 dark:text-white">${p.tld}</div><div class="text-[11px] text-zinc-400 mt-0.5">${p.description}</div></td>
        <td class="px-4 py-3.5 font-mono font-semibold text-zinc-900 dark:text-white">${p.currency === 'GBP' ? '£' : '$'}${p.price.toFixed(2)}/yr</td>
        <td class="px-4 py-3.5 font-mono text-zinc-500">${p.currency === 'GBP' ? '£' : '$'}${p.renewalPrice.toFixed(2)}/yr</td>
        <td class="px-4 py-3.5 text-zinc-500">${p.activeSubscriptions.toLocaleString()}</td>
        <td class="px-4 py-3.5">${renderPlanToggle(p.id, p.visible)}</td>
        <td class="px-4 py-3.5 text-right">${editBtn(p.id, 'domains')}</td>
      </tr>`).join('')}
    </tbody>
  </table></div>`;
}

function renderPlanToggle(planId, isVisible) {
  return `<button type="button" role="switch" data-plan-toggle="${planId}" aria-checked="${isVisible}" class="plan-visibility-toggle relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${isVisible ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}"><span class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm ring-0 transition duration-200 ${isVisible ? 'translate-x-4' : 'translate-x-0'}"></span></button>`;
}

// ==========================================
// 4. DRAWER RENDERER
// ==========================================

function renderPlanDrawerBody(plan, tab) {
  if (!plan) return '';
  const isVps = tab === 'vps';
  const isEmail = tab === 'email';
  const isDomain = tab === 'domains';

  return `
    <div class="space-y-4">
      <div>
        <label class="block font-mono uppercase text-zinc-500 mb-1.5">Plan Name</label>
        <input type="text" id="edit-plan-name" value="${plan.name}" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none" />
      </div>
      <div>
        <label class="block font-mono uppercase text-zinc-500 mb-1.5">Description</label>
        <textarea id="edit-plan-desc" rows="2" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none resize-none">${plan.description}</textarea>
      </div>
      ${isDomain ? `
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Registration Price</label>
            <input type="number" id="edit-plan-price" value="${plan.price}" step="0.01" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none" />
          </div>
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Renewal Price</label>
            <input type="number" id="edit-plan-renewal" value="${plan.renewalPrice}" step="0.01" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none" />
          </div>
        </div>
      ` : `
        <div>
          <label class="block font-mono uppercase text-zinc-500 mb-1.5">Monthly Price (USD)</label>
          <input type="number" id="edit-plan-price" value="${plan.price}" step="0.01" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none" />
        </div>
      `}
      ${isVps ? `
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">vCPU</label>
            <input type="number" id="edit-plan-vcpu" value="${plan.vcpu}" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none" />
          </div>
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">RAM (GB)</label>
            <input type="number" id="edit-plan-ram" value="${plan.ramGB}" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none" />
          </div>
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Disk (GB)</label>
            <input type="number" id="edit-plan-disk" value="${plan.diskGB}" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none" />
          </div>
        </div>
        <div>
          <label class="block font-mono uppercase text-zinc-500 mb-1.5">Transfer (TB/mo)</label>
          <input type="number" id="edit-plan-transfer" value="${plan.transferTB}" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none" />
        </div>
      ` : ''}
      ${isEmail ? `
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Mailboxes</label>
            <input type="number" id="edit-plan-mailboxes" value="${plan.mailboxes}" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none" />
          </div>
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Storage (GB)</label>
            <input type="number" id="edit-plan-storage" value="${plan.storageGB}" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none" />
          </div>
        </div>
      ` : ''}
      <div class="pt-2 border-t border-zinc-200 dark:border-zinc-800">
        <div class="flex items-center justify-between py-2">
          <div>
            <div class="font-medium text-zinc-900 dark:text-white">Visible to Customers</div>
            <div class="text-[11px] text-zinc-400 mt-0.5">Show this plan on the public pricing page</div>
          </div>
          <button type="button" role="switch" id="edit-plan-visible-toggle" aria-checked="${plan.visible}" class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${plan.visible ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}">
            <span class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm ring-0 transition duration-200 ${plan.visible ? 'translate-x-4' : 'translate-x-0'}"></span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 5. DRAWER HELPERS
// ==========================================

function openPlanDrawer(planId, tab) {
  selectedPlanId = planId;
  const plan = (planCatalog[tab] || []).find(p => p.id === planId);
  if (!plan) return;

  const drawer = document.getElementById('plan-drawer');
  const overlay = document.getElementById('plan-overlay');
  const title = document.getElementById('plan-drawer-title');
  const body = document.getElementById('plan-drawer-body');

  if (title) title.textContent = `Edit — ${plan.name}`;
  if (body) body.innerHTML = renderPlanDrawerBody(plan, tab);

  drawer?.classList.replace('translate-x-full', 'translate-x-0');
  overlay?.classList.remove('hidden');

  createIcons({ icons });
  bindDrawerToggle();
}

function closePlanDrawer() {
  document.getElementById('plan-drawer')?.classList.replace('translate-x-0', 'translate-x-full');
  document.getElementById('plan-overlay')?.classList.add('hidden');
  selectedPlanId = null;
}

function bindDrawerToggle() {
  const toggle = document.getElementById('edit-plan-visible-toggle');
  if (!toggle) return;
  toggle.onclick = () => {
    const next = toggle.getAttribute('aria-checked') !== 'true';
    toggle.setAttribute('aria-checked', String(next));
    const thumb = toggle.querySelector('span');
    if (next) {
      toggle.classList.remove('bg-zinc-200', 'dark:bg-zinc-700');
      toggle.classList.add('bg-zinc-900', 'dark:bg-white');
      thumb?.classList.replace('translate-x-0', 'translate-x-4');
    } else {
      toggle.classList.remove('bg-zinc-900', 'dark:bg-white');
      toggle.classList.add('bg-zinc-200', 'dark:bg-zinc-700');
      thumb?.classList.replace('translate-x-4', 'translate-x-0');
    }
  };
}

// ==========================================
// 6. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupPlansEvents(onNavigate) {
  createIcons({ icons });

  const container = document.getElementById('plans-table-container');
  if (container) {
    container.innerHTML = renderPlansTable(activePlanTab);
    createIcons({ icons });
  }

  bindTableEvents();

  // Tab switching
  document.querySelectorAll('.plan-tab-btn').forEach(btn => {
    btn.onclick = () => {
      const tab = btn.getAttribute('data-plan-tab');
      if (!tab) return;
      activePlanTab = tab;

      document.querySelectorAll('.plan-tab-btn').forEach(b => {
        const isCurrent = b.getAttribute('data-plan-tab') === activePlanTab;
        b.className = `plan-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${isCurrent ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`;
      });

      const tableContainer = document.getElementById('plans-table-container');
      if (tableContainer) {
        tableContainer.innerHTML = renderPlansTable(activePlanTab);
        createIcons({ icons });
      }
      bindTableEvents();
    };
  });

  // Drawer close handlers
  document.getElementById('plan-drawer-close')?.addEventListener('click', closePlanDrawer);
  document.getElementById('plan-overlay')?.addEventListener('click', closePlanDrawer);
  document.getElementById('plan-drawer-save')?.addEventListener('click', () => {
    const btn = document.getElementById('plan-drawer-save');
    if (btn) btn.textContent = 'Saved!';
    setTimeout(() => { if (btn) btn.textContent = 'Save Changes'; }, 1400);
    closePlanDrawer();
  });
  document.getElementById('plan-drawer-delete')?.addEventListener('click', closePlanDrawer);

  // Add plan button
  const addBtn = document.getElementById('add-plan-btn');
  if (addBtn) {
    addBtn.onclick = () => {
      addBtn.textContent = 'Coming Soon';
      setTimeout(() => {
        addBtn.innerHTML = '<i data-lucide="plus" class="w-4 h-4"></i> Add Plan';
        createIcons({ icons });
      }, 1500);
    };
  }
}

function bindTableEvents() {
  document.querySelectorAll('.plan-edit-btn').forEach(btn => {
    btn.onclick = () => {
      const planId = btn.getAttribute('data-edit-plan');
      const tab = btn.getAttribute('data-plan-tab');
      if (planId && tab) openPlanDrawer(planId, tab);
    };
  });

  document.querySelectorAll('.plan-visibility-toggle').forEach(btn => {
    btn.onclick = () => {
      const planId = btn.getAttribute('data-plan-toggle');
      const next = btn.getAttribute('aria-checked') !== 'true';
      btn.setAttribute('aria-checked', String(next));
      const thumb = btn.querySelector('span');
      if (next) {
        btn.classList.remove('bg-zinc-200', 'dark:bg-zinc-700');
        btn.classList.add('bg-zinc-900', 'dark:bg-white');
        thumb?.classList.replace('translate-x-0', 'translate-x-4');
      } else {
        btn.classList.remove('bg-zinc-900', 'dark:bg-white');
        btn.classList.add('bg-zinc-200', 'dark:bg-zinc-700');
        thumb?.classList.replace('translate-x-4', 'translate-x-0');
      }
      for (const tab of Object.keys(planCatalog)) {
        const plan = planCatalog[tab].find(p => p.id === planId);
        if (plan) { plan.visible = next; break; }
      }
    };
  });
}

export function cleanupPlans() {
  activePlanTab = 'vps';
  selectedPlanId = null;
}
