import { createIcons, icons } from 'lucide';

/**
 * Hostlab Support Tickets Module
 * Dedicated standalone module for technical support tickets, incident tracking,
 * live client-agent message threads, internal notes, and SLA resolution timers.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const ticketStats = {
  openTickets: 18,
  avgFirstResponse: '14 mins',
  csatSatisfaction: '99.1%',
  resolvedToday: 42,
  criticalEscalations: 1,
  slaCompliance: '99.8%'
};

export const initialTickets = [
  {
    id: 'TCK-8921',
    subject: 'Reverse DNS PTR record configuration for outbound mail node',
    customer: 'Sarah Jenkins',
    company: 'TechFlow Media LLC',
    email: 'sarah@techflow-media.com',
    department: 'Technical Ops',
    priority: 'high', // critical | high | medium | low
    status: 'open', // open | in-progress | resolved | closed
    assignedTo: 'Alex Chen (Tier 2)',
    lastUpdated: '6 mins ago',
    createdDate: 'Today at 18:24',
    messages: [
      {
        sender: 'Sarah Jenkins',
        role: 'customer',
        time: 'Today at 18:24',
        text: 'Hello team, we just provisioned vps-lon-01 for our outbound Postfix cluster. Could you please configure the reverse DNS (PTR record) for IP 185.193.64.12 to resolve to mail.techflow-media.com? Thank you!'
      },
      {
        sender: 'Alex Chen',
        role: 'staff',
        time: 'Today at 18:38',
        text: 'Hi Sarah, I am submitting the PTR update to our upstream RIPE NCC delegation pool now. It should propagate to public resolvers within 15-20 minutes.'
      }
    ]
  },
  {
    id: 'TCK-8922',
    subject: 'Scheduled database maintenance window for managed MySQL replica',
    customer: 'David Vance',
    company: 'Apex Studios Design Ltd',
    email: 'david@apexstudios.design',
    department: 'Technical Ops',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'Marcus Ward (Tier 3)',
    lastUpdated: '24 mins ago',
    createdDate: 'Today at 17:10',
    messages: [
      {
        sender: 'David Vance',
        role: 'customer',
        time: 'Today at 17:10',
        text: 'We are planning to run a 40GB table re-indexing operation this Friday at 02:00 UTC. Can you confirm if our read replica failover is configured for zero downtime?'
      },
      {
        sender: 'Marcus Ward',
        role: 'staff',
        time: 'Today at 17:35',
        text: 'Confirmed David. Heartbeat replication is active with 0 lag. If the primary node experiences high load, the ProxySQL router will automatically redirect read queries to the standby.'
      }
    ]
  },
  {
    id: 'TCK-8923',
    subject: 'Emergency: Source SSH timeout during cPanel live migration stream',
    customer: 'Vault Financial Ltd',
    company: 'Vault Financial Ltd',
    email: 'v.krum@vaultcrypto.finance',
    department: 'Migration Support',
    priority: 'critical',
    status: 'open',
    assignedTo: 'Unassigned',
    lastUpdated: '45 mins ago',
    createdDate: 'Today at 18:45',
    messages: [
      {
        sender: 'Viktor Krum',
        role: 'customer',
        time: 'Today at 18:45',
        text: 'Our migration job mig-809 halted at 18% with error: "Connection reset by peer at source firewall". We need assistance with whitelist IP addresses for Hostlab worker nodes.'
      }
    ]
  },
  {
    id: 'TCK-8924',
    subject: 'EU VAT tax exempt status verification for cross-border SaaS',
    customer: 'Marcus Lindqvist',
    company: 'Nordic Capital AB',
    email: 'marcus@nordicfintech.se',
    department: 'Billing & Accounts',
    priority: 'low',
    status: 'open',
    assignedTo: 'Emma Watson (Finance)',
    lastUpdated: '1 hour ago',
    createdDate: 'Today at 16:30',
    messages: [
      {
        sender: 'Marcus Lindqvist',
        role: 'customer',
        time: 'Today at 16:30',
        text: 'Attached is our updated Swedish VIES registration certificate. Please ensure all future invoices are zero-rated for intra-community reverse charge.'
      }
    ]
  },
  {
    id: 'TCK-8925',
    subject: 'Requesting Let\'s Encrypt 90-day auto-renewal hook verification',
    customer: 'Elena Rostova',
    company: 'CloudScale SaaS Corp',
    email: 'elena@cloudscale-saas.net',
    department: 'Technical Ops',
    priority: 'medium',
    status: 'open',
    assignedTo: 'Unassigned',
    lastUpdated: '2 hours ago',
    createdDate: 'Today at 15:15',
    messages: [
      {
        sender: 'Elena Rostova',
        role: 'customer',
        time: 'Today at 15:15',
        text: 'Checking if our Kubernetes cert-manager ingress is successfully issuing certificates via the Hostlab Cloud DNS ACME webhook.'
      }
    ]
  },
  {
    id: 'TCK-8926',
    subject: 'PHP 8.3 OPcache memory limit increase on app-ams-01',
    customer: 'Julian Moretti',
    company: 'Urban Bistro Hospitality',
    email: 'julian@urbanbistro.io',
    department: 'Technical Ops',
    priority: 'low',
    status: 'in-progress',
    assignedTo: 'Alex Chen (Tier 2)',
    lastUpdated: '3 hours ago',
    createdDate: 'Today at 14:00',
    messages: [
      {
        sender: 'Julian Moretti',
        role: 'customer',
        time: 'Today at 14:00',
        text: 'Could you bump opcache.memory_consumption to 256MB in our php.ini? Our WooCommerce checkout has high plugin overhead.'
      },
      {
        sender: 'Alex Chen',
        role: 'staff',
        time: 'Today at 14:30',
        text: 'Done! The PHP-FPM pool has been gracefully reloaded with 256MB OPcache.'
      }
    ]
  },
  {
    id: 'TCK-8927',
    subject: 'Custom nameserver glue records setup for ns1.nexus-logistics.de',
    customer: 'Alexander Weber',
    company: 'Nexus Logistics GmbH',
    email: 'a.weber@nexus-logistics.de',
    department: 'Technical Ops',
    priority: 'medium',
    status: 'resolved',
    assignedTo: 'Marcus Ward (Tier 3)',
    lastUpdated: 'Yesterday',
    createdDate: 'Sep 25, 2024',
    messages: [
      {
        sender: 'Alexander Weber',
        role: 'customer',
        time: 'Sep 25 at 10:12',
        text: 'We require custom branded nameservers registered at the registry level.'
      },
      {
        sender: 'Marcus Ward',
        role: 'staff',
        time: 'Sep 25 at 11:05',
        text: 'Glue records for ns1 and ns2 have been committed to DENIC. All queries are now resolving directly.'
      }
    ]
  },
  {
    id: 'TCK-8928',
    subject: 'Refund confirmation for duplicate annual domain registration',
    customer: 'Liam Gallagher',
    company: 'Velocity Autos Ltd',
    email: 'liam@velocityautos.co.uk',
    department: 'Billing & Accounts',
    priority: 'low',
    status: 'resolved',
    assignedTo: 'Emma Watson (Finance)',
    lastUpdated: '2 days ago',
    createdDate: 'Sep 24, 2024',
    messages: [
      {
        sender: 'Liam Gallagher',
        role: 'customer',
        time: 'Sep 24 at 09:00',
        text: 'I was accidentally billed twice for the initial domain setup.'
      },
      {
        sender: 'Emma Watson',
        role: 'staff',
        time: 'Sep 24 at 09:30',
        text: 'Refund of £14.00 has been credited back to your original payment method. Thank you for notifying us!'
      }
    ]
  }
];

let ticketsList = [...initialTickets];
let currentFilter = 'all'; // all | open | in-progress | resolved
let currentSearch = '';
let currentDeptFilter = 'all';
let currentPriorityFilter = 'all';
let selectedTicketId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderTicketsHTML() {
  const departments = Array.from(new Set(ticketsList.map(t => t.department))).sort();

  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar (NO CARDS OVERVIEW) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Support Tickets
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Manage customer requests and technical support queue.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-create-ticket-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>New Ticket</span>
          </button>
        </div>
      </div>

      <!-- Controls & Tabs -->
      <div class="space-y-4">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2" id="ticket-filter-tabs">
          <button 
            type="button" 
            data-filter="all" 
            class="tck-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            All Tickets (<span id="count-all">0</span>)
          </button>
          
          <button 
            type="button" 
            data-filter="open" 
            class="tck-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'open' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Open (<span id="count-open">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="in-progress" 
            class="tck-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'in-progress' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            In-Progress (<span id="count-inprogress">0</span>)
          </button>

          <button 
            type="button" 
            data-filter="resolved" 
            class="tck-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentFilter === 'resolved' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Resolved (<span id="count-resolved">0</span>)
          </button>
        </div>

        <!-- Filter Search & Selectors -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="ticket-search-input"
              value="${currentSearch}"
              placeholder="Search by ticket ID, subject, customer, or keyword..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <select 
              id="ticket-dept-select" 
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Departments</option>
              ${departments.map(d => `<option value="${d}" ${currentDeptFilter === d ? 'selected' : ''}>${d}</option>`).join('')}
            </select>

            <select 
              id="ticket-priority-select" 
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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
                <th class="py-3 px-4 font-medium">Ticket ID & Subject</th>
                <th class="py-3 px-4 font-medium">Customer & Account</th>
                <th class="py-3 px-4 font-medium">Department</th>
                <th class="py-3 px-4 font-medium text-center">Priority</th>
                <th class="py-3 px-4 font-medium">Last Activity</th>
                <th class="py-3 px-4 font-medium text-center">Status</th>
                <th class="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="ticket-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <!-- Empty state container -->
        <div id="tck-empty-state" class="hidden p-12 text-center">
          <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
            <i data-lucide="life-buoy" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No support tickets found</h3>
          <p class="text-xs text-zinc-500 max-w-sm mx-auto">
            No tickets match your active filter parameters or search query.
          </p>
        </div>
      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="ticket-drawer-container"></div>

      <!-- Open Ticket Modal -->
      <div id="create-ticket-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="life-buoy" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold font-display text-zinc-900 dark:text-white text-base">Open Technical Ticket</h3>
            </div>
            <button type="button" id="close-create-tck-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="create-ticket-form" class="p-6 space-y-4 text-xs">
            
            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Customer / Organization</label>
              <input 
                type="text" 
                id="modal-tck-customer" 
                placeholder="Sarah Jenkins (TechFlow Media LLC)" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Ticket Subject</label>
              <input 
                type="text" 
                id="modal-tck-subject" 
                placeholder="e.g. Reverse DNS PTR configuration request" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Department</label>
                <select id="modal-tck-dept" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
                  <option value="Technical Ops">Technical Ops</option>
                  <option value="Billing & Accounts">Billing & Accounts</option>
                  <option value="Migration Support">Migration Support</option>
                  <option value="Security & Abuse">Security & Abuse</option>
                </select>
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Priority</label>
                <select id="modal-tck-priority" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
                  <option value="low">Low</option>
                  <option value="medium" selected>Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical (P1)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Initial Message / Case Details</label>
              <textarea 
                id="modal-tck-message" 
                rows="4" 
                placeholder="Detailed description of the issue or maintenance request..." 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none placeholder-zinc-400"
              ></textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-create-tck-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Open Ticket
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

function getFilteredTickets() {
  return ticketsList.filter(item => {
    // 1. Tab filter
    if (currentFilter === 'open' && item.status !== 'open') return false;
    if (currentFilter === 'in-progress' && item.status !== 'in-progress') return false;
    if (currentFilter === 'resolved' && item.status !== 'resolved' && item.status !== 'closed') return false;

    // 2. Department filter
    if (currentDeptFilter !== 'all' && item.department !== currentDeptFilter) return false;

    // 3. Priority filter
    if (currentPriorityFilter !== 'all' && item.priority !== currentPriorityFilter) return false;

    // 4. Search query
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchId = item.id.toLowerCase().includes(q);
      const matchSubj = item.subject.toLowerCase().includes(q);
      const matchCust = item.customer.toLowerCase().includes(q);
      const matchEmail = item.email.toLowerCase().includes(q);
      if (!matchId && !matchSubj && !matchCust && !matchEmail) return false;
    }

    return true;
  });
}

function updateTabCounts() {
  const countAll = document.getElementById('count-all');
  const countOpen = document.getElementById('count-open');
  const countInprogress = document.getElementById('count-inprogress');
  const countResolved = document.getElementById('count-resolved');

  if (countAll) countAll.textContent = ticketsList.length;
  if (countOpen) countOpen.textContent = ticketsList.filter(t => t.status === 'open').length;
  if (countInprogress) countInprogress.textContent = ticketsList.filter(t => t.status === 'in-progress').length;
  if (countResolved) countResolved.textContent = ticketsList.filter(t => t.status === 'resolved' || t.status === 'closed').length;
}

function renderTableRows() {
  const tbody = document.getElementById('ticket-table-body');
  const emptyState = document.getElementById('tck-empty-state');
  if (!tbody) return;

  const filtered = getFilteredTickets();

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(item => {
    // Status text formatting: plain text with color, NO background pill
    let statusClass = 'text-emerald-500';
    let statusLabel = 'Open';
    if (item.status === 'in-progress') {
      statusClass = 'text-blue-500';
      statusLabel = 'In-Progress';
    } else if (item.status === 'resolved' || item.status === 'closed') {
      statusClass = 'text-zinc-500';
      statusLabel = 'Resolved';
    }

    // Priority formatting: plain text with color, NO pill
    let priorityClass = 'text-zinc-500';
    let priorityLabel = 'Low';
    if (item.priority === 'medium') {
      priorityClass = 'text-blue-500';
      priorityLabel = 'Medium';
    } else if (item.priority === 'high') {
      priorityClass = 'text-amber-500';
      priorityLabel = 'High';
    } else if (item.priority === 'critical') {
      priorityClass = 'text-rose-500 font-bold';
      priorityLabel = 'Critical';
    }

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Ticket ID & Subject -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white max-w-sm">
          <div class="flex items-center gap-2">
            <span class="text-zinc-400 text-[11px] shrink-0">${item.id}</span>
            <span class="truncate hover:text-blue-500 transition-colors cursor-pointer" data-view-tck="${item.id}">
              ${item.subject}
            </span>
          </div>
          <div class="text-[11px] text-zinc-400 font-sans mt-0.5 truncate">Assigned: ${item.assignedTo}</div>
        </td>

        <!-- Customer & Account -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          <div class="font-medium text-zinc-900 dark:text-white">${item.customer}</div>
          <div class="text-[11px] text-zinc-400">${item.company}</div>
        </td>

        <!-- Department (plain text, no pill) -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          ${item.department}
        </td>

        <!-- Priority (plain text with color, NO background pill) -->
        <td class="py-3 px-4 text-center font-mono font-medium ${priorityClass}">
          ${priorityLabel}
        </td>

        <!-- Last Activity -->
        <td class="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-300">
          ${item.lastUpdated}
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
              data-view-tck="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Open Conversation Thread"
            >
              <i data-lucide="message-square" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-toggle-tck="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="${item.status === 'resolved' ? 'Reopen Ticket' : 'Mark Resolved'}"
            >
              <i data-lucide="${item.status === 'resolved' ? 'rotate-ccw' : 'check'}" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  createIcons({ icons });
}

// ==========================================
// 4. SLIDE-OVER DRAWER (LIVE CONVERSATION THREAD)
// ==========================================

function renderTicketDrawer(ticketId) {
  const container = document.getElementById('ticket-drawer-container');
  if (!container) return;

  const item = ticketsList.find(t => t.id === ticketId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let statusClass = 'text-emerald-500';
  let statusLabel = 'Open';
  if (item.status === 'in-progress') {
    statusClass = 'text-blue-500';
    statusLabel = 'In-Progress';
  } else if (item.status === 'resolved' || item.status === 'closed') {
    statusClass = 'text-zinc-500';
    statusLabel = 'Resolved';
  }

  let priorityClass = 'text-zinc-500';
  let priorityLabel = 'Low';
  if (item.priority === 'medium') {
    priorityClass = 'text-blue-500';
    priorityLabel = 'Medium Priority';
  } else if (item.priority === 'high') {
    priorityClass = 'text-amber-500';
    priorityLabel = 'High Priority';
  } else if (item.priority === 'critical') {
    priorityClass = 'text-rose-500 font-bold';
    priorityLabel = 'Critical SLA';
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-xl h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>${item.id}</span>
              <span>/</span>
              <span class="${priorityClass}">${priorityLabel}</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${statusLabel}</span>
            </div>
            <h2 class="text-base font-bold font-display text-zinc-900 dark:text-white leading-tight">
              ${item.subject}
            </h2>
            <div class="text-xs text-zinc-400 mt-1 font-mono">${item.customer} • ${item.company}</div>
          </div>
          <button 
            type="button" 
            id="close-tck-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer shrink-0"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Conversation Area -->
        <div class="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          <!-- Ticket Context Metadata -->
          <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <span class="text-zinc-400 text-[11px]">DEPARTMENT:</span>
              <span class="text-zinc-900 dark:text-white font-medium ml-1">${item.department}</span>
            </div>
            <div>
              <span class="text-zinc-400 text-[11px]">ASSIGNED TO:</span>
              <span class="text-zinc-900 dark:text-white font-medium ml-1">${item.assignedTo}</span>
            </div>
          </div>

          <!-- Message Thread -->
          <div class="space-y-3 pt-2">
            ${item.messages.map(msg => `
              <div class="p-4 rounded-lg border ${msg.role === 'staff' ? 'border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60'} space-y-1.5">
                <div class="flex items-center justify-between text-xs font-mono">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-zinc-900 dark:text-white">${msg.sender}</span>
                    <span class="text-[10px] uppercase ${msg.role === 'staff' ? 'text-blue-500 font-semibold' : 'text-zinc-400'}">${msg.role === 'staff' ? 'Support Engineer' : 'Customer'}</span>
                  </div>
                  <span class="text-zinc-400 text-[11px]">${msg.time}</span>
                </div>
                <div class="text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans text-xs">
                  ${msg.text}
                </div>
              </div>
            `).join('')}
          </div>

        </div>

        <!-- Quick Reply Box -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 space-y-3 shrink-0">
          <form id="drawer-reply-form" class="space-y-2">
            <div class="relative">
              <textarea 
                id="drawer-reply-text"
                rows="3" 
                placeholder="Type your response to the customer..."
                required
                class="w-full p-3 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              ></textarea>
            </div>

            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  id="drawer-mark-resolved-btn"
                  class="px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  ${item.status === 'resolved' ? 'Reopen' : 'Close Ticket'}
                </button>
              </div>

              <div class="flex items-center gap-2">
                <button 
                  type="submit" 
                  class="px-4 py-1.5 rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <i data-lucide="send" class="w-3.5 h-3.5"></i>
                  <span>Send Reply</span>
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  `;

  createIcons({ icons });

  const closeBtn = document.getElementById('close-tck-drawer-btn');
  const toggleResolvedBtn = document.getElementById('drawer-mark-resolved-btn');
  const replyForm = document.getElementById('drawer-reply-form');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedTicketId = null;
  };

  if (closeBtn) closeBtn.onclick = closeDrawer;

  const backdrop = container.firstElementChild;
  if (backdrop) {
    backdrop.onclick = (e) => {
      const panel = backdrop.firstElementChild;
      if (panel && !panel.contains(e.target)) closeDrawer();
    };
  }

  if (toggleResolvedBtn) {
    toggleResolvedBtn.onclick = () => {
      item.status = item.status === 'resolved' ? 'open' : 'resolved';
      renderTicketDrawer(item.id);
      renderTableRows();
      updateTabCounts();
    };
  }

  if (replyForm) {
    replyForm.onsubmit = (e) => {
      e.preventDefault();
      const text = document.getElementById('drawer-reply-text')?.value.trim();
      if (!text) return;

      item.messages.push({
        sender: 'Support Staff (You)',
        role: 'staff',
        time: 'Just now',
        text
      });
      item.lastUpdated = 'Just now';
      item.status = 'in-progress';

      renderTicketDrawer(item.id);
      renderTableRows();
      updateTabCounts();
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupTicketsEvents(onNavigate) {
  createIcons({ icons });
  updateTabCounts();
  renderTableRows();

  // Tab Filtering
  const tabs = document.querySelectorAll('.tck-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => {
        t.className = 'tck-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white';
      });
      tab.className = 'tck-tab px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900';

      currentFilter = tab.getAttribute('data-filter') || 'all';
      renderTableRows();
    };
  });

  // Search input
  const searchInput = document.getElementById('ticket-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Department selector
  const deptSelect = document.getElementById('ticket-dept-select');
  if (deptSelect) {
    deptSelect.onchange = (e) => {
      currentDeptFilter = e.target.value;
      renderTableRows();
    };
  }

  // Priority selector
  const prioritySelect = document.getElementById('ticket-priority-select');
  if (prioritySelect) {
    prioritySelect.onchange = (e) => {
      currentPriorityFilter = e.target.value;
      renderTableRows();
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('ticket-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-tck]');
      const toggleBtn = e.target.closest('[data-toggle-tck]');

      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-tck');
        selectedTicketId = id;
        renderTicketDrawer(id);
      } else if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-toggle-tck');
        const item = ticketsList.find(t => t.id === id);
        if (item) {
          item.status = item.status === 'resolved' ? 'open' : 'resolved';
          renderTableRows();
          updateTabCounts();
        }
      }
    };
  }

  // Create Ticket Modal Handlers
  const openModalBtn = document.getElementById('open-create-ticket-btn');
  const modal = document.getElementById('create-ticket-modal');
  const closeModalBtn = document.getElementById('close-create-tck-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-create-tck-btn');
  const form = document.getElementById('create-ticket-form');

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
      const customer = document.getElementById('modal-tck-customer')?.value.trim();
      const subject = document.getElementById('modal-tck-subject')?.value.trim();
      const dept = document.getElementById('modal-tck-dept')?.value || 'Technical Ops';
      const priority = document.getElementById('modal-tck-priority')?.value || 'medium';
      const message = document.getElementById('modal-tck-message')?.value.trim();

      if (!customer || !subject || !message) return;

      const newTicket = {
        id: `TCK-${Math.floor(8000 + Math.random() * 1000)}`,
        subject,
        customer,
        company: `${customer} LLC`,
        email: 'client@domain.com',
        department: dept,
        priority,
        status: 'open',
        assignedTo: 'Unassigned',
        lastUpdated: 'Just now',
        createdDate: 'Today',
        messages: [
          {
            sender: customer,
            role: 'customer',
            time: 'Just now',
            text: message
          }
        ]
      };

      ticketsList.unshift(newTicket);
      closeModal();
      updateTabCounts();
      renderTableRows();
    };
  }
}

export function cleanupTickets() {
  currentFilter = 'all';
  currentSearch = '';
  currentDeptFilter = 'all';
  currentPriorityFilter = 'all';
  selectedTicketId = null;
}
