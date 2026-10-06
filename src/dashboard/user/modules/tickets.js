import { customerTickets, customerUser } from '../db.js';
import { createIcons, icons } from 'lucide';

// Module state
let activeFilter = 'all';
let searchQuery = '';
let selectedTicket = null;
let isOpenTicketModalOpen = false;
let actionFeedback = null;

export function renderUserTickets() {
  const filteredTickets = customerTickets.filter(tick => {
    const isResolved = tick.status.toLowerCase() === 'resolved';
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'open' && !isResolved) ||
      (activeFilter === 'resolved' && isResolved);
    const matchesSearch = !searchQuery || 
      tick.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tick.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tick.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const allCount = customerTickets.length;
  const openCount = customerTickets.filter(t => t.status.toLowerCase() !== 'resolved').length;
  const resolvedCount = customerTickets.filter(t => t.status.toLowerCase() === 'resolved').length;

  return `
    <div class="space-y-6">
      
      <!-- 1. Header: Exact Admin Style -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold text-zinc-900 dark:text-white font-display tracking-tight">
              Support Tickets
            </h1>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Direct priority communication with Hostlab technical engineering and support specialists.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="open-ticket-btn"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Open New Ticket</span>
          </button>
        </div>
      </div>

      <!-- 2. Stat Cards: Exact Admin Style -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Active Tickets -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="life-buoy" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Active Tickets
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${openCount}
              </span>
              <span class="text-xs font-mono text-blue-500 font-medium">Answered</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Awaiting customer verification
            </div>
          </div>
        </div>

        <!-- Resolved -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="check-circle" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Resolved Cases
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${resolvedCount}
              </span>
              <span class="text-xs font-mono text-emerald-500 font-medium">Settled</span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              100% satisfaction rating
            </div>
          </div>
        </div>

        <!-- Average Response Time -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="clock" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Avg First Response
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                14 mins
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Priority SLA guarantee active
            </div>
          </div>
        </div>

        <!-- Support Tier -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="shield" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Support Coverage
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                24/7/365
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Developer Pro Dedicated Queue
            </div>
          </div>
        </div>

      </div>

      <!-- 3. Tickets Table: Exact Admin Style -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
        
        <!-- Controls Bar -->
        <div class="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <!-- Filter Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button 
              type="button" 
              data-ticket-filter="all"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'all' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              All Tickets (${allCount})
            </button>
            <button 
              type="button" 
              data-ticket-filter="open"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'open' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              Open (${openCount})
            </button>
            <button 
              type="button" 
              data-ticket-filter="resolved"
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === 'resolved' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60'
              }"
            >
              Resolved (${resolvedCount})
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
            </div>
            <input 
              type="text" 
              id="user-ticket-search"
              value="${searchQuery}"
              placeholder="Search ticket ID, subject..." 
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

        </div>

        <!-- Table Data -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                <th class="py-3 px-4 sm:px-6">Ticket ID &amp; Subject</th>
                <th class="py-3 px-4">Department / Service</th>
                <th class="py-3 px-4">Priority</th>
                <th class="py-3 px-4">Last Updated</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
              ${filteredTickets.length === 0 ? `
                <tr>
                  <td colspan="6" class="py-12 text-center text-zinc-500">
                    No tickets found matching your query.
                  </td>
                </tr>
              ` : filteredTickets.map(tick => `
                <tr class="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors group">
                  
                  <!-- ID & Subject -->
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="font-semibold text-zinc-900 dark:text-white text-xs">
                      ${tick.subject}
                    </div>
                    <div class="text-[11px] font-mono text-zinc-400 mt-0.5">
                      ${tick.id}
                    </div>
                  </td>

                  <!-- Department & Service -->
                  <td class="py-3.5 px-4 font-mono text-zinc-700 dark:text-zinc-300">
                    <div>${tick.department || 'Technical Support'}</div>
                    <div class="text-[11px] text-zinc-500">${tick.service}</div>
                  </td>

                  <!-- Priority -->
                  <td class="py-3.5 px-4 font-mono">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] ${
                      tick.priority?.toLowerCase() === 'high' 
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                        : tick.priority?.toLowerCase() === 'urgent'
                        ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border border-zinc-200 dark:border-zinc-700'
                    }">
                      ${tick.priority || 'Normal'}
                    </span>
                  </td>

                  <!-- Last Updated -->
                  <td class="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                    ${tick.lastUpdate}
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-mono ${
                      tick.status.toLowerCase() === 'answered'
                        ? 'text-blue-500 dark:text-blue-400'
                        : tick.status.toLowerCase() === 'resolved'
                        ? 'text-zinc-500'
                        : 'text-emerald-500'
                    }">
                      <span class="w-1.5 h-1.5 rounded-full ${
                        tick.status.toLowerCase() === 'answered' ? 'bg-blue-500' : tick.status.toLowerCase() === 'resolved' ? 'bg-zinc-500' : 'bg-emerald-500'
                      }"></span>
                      ${tick.status}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <button 
                      type="button" 
                      data-view-ticket="${tick.id}"
                      class="px-3 py-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                    >
                      View Thread →
                    </button>
                  </td>

                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

      </div>

      <!-- 4. Ticket Conversation Thread Drawer -->
      ${selectedTicket ? `
        <!-- Backdrop -->
        <div id="ticket-drawer-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"></div>

        <!-- Drawer Content Shell -->
        <div id="ticket-drawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between shadow-2xl text-white select-none overflow-hidden">
          
          <!-- Top Section -->
          <div class="flex-1 flex flex-col min-h-0">
            
            <!-- Drawer Header -->
            <div class="h-20 px-6 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-black">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shrink-0">
                  <i data-lucide="life-buoy" class="w-5 h-5"></i>
                </div>
                <div class="min-w-0">
                  <h3 class="text-base font-bold font-display text-white tracking-tight truncate">${selectedTicket.subject}</h3>
                  <div class="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-0.5">
                    <span class="text-blue-400 font-semibold">${selectedTicket.id}</span>
                    <span>•</span>
                    <span>${selectedTicket.status}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <button 
                  id="close-ticket-drawer-btn"
                  type="button" 
                  class="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 transition-colors cursor-pointer"
                  aria-label="Close drawer"
                >
                  <i data-lucide="x" class="w-5 h-5"></i>
                </button>
              </div>
            </div>

            <!-- Feedback banner -->
            ${actionFeedback ? `
              <div class="px-6 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center justify-between">
                <span>✓ ${actionFeedback}</span>
                <button id="dismiss-ticket-feedback-btn" class="text-emerald-500 hover:text-emerald-300">
                  <i data-lucide="x" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            ` : ''}

            <!-- Messages Stream (Scrollable) -->
            <div class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar text-xs font-sans">
              
              <!-- Service Context Card -->
              <div class="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-between font-mono text-xs">
                <div>
                  <span class="text-zinc-500 text-[11px] block">Related Service</span>
                  <span class="text-white font-semibold">${selectedTicket.service}</span>
                </div>
                <div>
                  <span class="text-zinc-500 text-[11px] block text-right">Department</span>
                  <span class="text-zinc-300">${selectedTicket.department || 'Technical Support'}</span>
                </div>
              </div>

              <!-- Message History -->
              <div class="space-y-4 pt-2">
                ${(selectedTicket.messages || []).map(msg => `
                  <div class="p-4 rounded-lg border ${
                    msg.role === 'Client' 
                      ? 'bg-zinc-900/40 border-zinc-800' 
                      : 'bg-zinc-900 border-zinc-700/80'
                  } space-y-2">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-white text-xs">${msg.sender}</span>
                        <span class="px-1.5 py-0.5 rounded text-[10px] font-mono ${
                          msg.role === 'Client' 
                            ? 'bg-zinc-800 text-zinc-400' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold'
                        }">
                          ${msg.role}
                        </span>
                      </div>
                      <span class="text-[11px] font-mono text-zinc-500">${msg.time}</span>
                    </div>
                    <p class="text-zinc-300 leading-relaxed font-sans text-xs whitespace-pre-wrap">${msg.text}</p>
                  </div>
                `).join('')}
              </div>

              <!-- Reply Box Form -->
              ${selectedTicket.status.toLowerCase() !== 'resolved' ? `
                <form id="reply-ticket-form" class="pt-4 border-t border-zinc-800/80 space-y-3">
                  <div class="flex items-center justify-between">
                    <label class="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      Add Reply
                    </label>
                    <button 
                      type="button" 
                      id="resolve-ticket-btn"
                      class="text-[11px] font-mono text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Mark as Resolved
                    </button>
                  </div>
                  <textarea 
                    id="ticket-reply-text" 
                    rows="3" 
                    placeholder="Type your response here..." 
                    required
                    class="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-sans text-xs resize-none"
                  ></textarea>
                  <div class="flex justify-end">
                    <button type="submit" class="px-4 py-2 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold cursor-pointer">
                      Send Reply
                    </button>
                  </div>
                </form>
              ` : `
                <div class="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800 text-center text-zinc-400 text-xs font-mono">
                  This support ticket is marked as resolved.
                </div>
              `}

            </div>

          </div>

          <!-- Drawer Footer -->
          <div class="h-16 px-6 border-t border-zinc-800 flex items-center justify-between shrink-0 bg-black">
            <span class="text-[11px] font-mono text-zinc-500">
              Hostlab Priority SLA Desk
            </span>
            <button 
              type="button" 
              id="close-ticket-drawer-footer-btn"
              class="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      ` : ''}

      <!-- 5. Open New Ticket Modal -->
      ${isOpenTicketModalOpen ? `
        <div id="new-ticket-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"></div>
        
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div id="new-ticket-modal" class="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl text-white space-y-5">
            <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 class="text-base font-bold font-display text-white">Open Support Ticket</h3>
              <button id="close-new-ticket-btn" class="text-zinc-400 hover:text-white cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>

            <form id="open-ticket-form" class="space-y-4 text-xs font-sans">
              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Ticket Subject</label>
                <input 
                  type="text" 
                  id="new-ticket-subject-input" 
                  placeholder="Summary of the issue or inquiry" 
                  required
                  class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-sans text-xs"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-zinc-400 mb-1 font-mono">Department</label>
                  <select id="new-ticket-dept-input" class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing & Invoicing">Billing &amp; Invoicing</option>
                    <option value="Domain & DNS">Domain &amp; DNS</option>
                    <option value="Infrastructure">Infrastructure Operations</option>
                  </select>
                </div>

                <div>
                  <label class="block text-zinc-400 mb-1 font-mono">Priority Level</label>
                  <select id="new-ticket-priority-input" class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical (Service Down)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Related Service</label>
                <select id="new-ticket-service-input" class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-600 font-mono text-xs">
                  <option value="thorneventures.io (Web Hosting)">thorneventures.io (Web Hosting)</option>
                  <option value="api.thorne.dev (Container)">api.thorne.dev (Container)</option>
                  <option value="vps-prod-frankfurt (Cloud VPS)">vps-prod-frankfurt (Cloud VPS)</option>
                  <option value="General Account / Billing">General Account / Billing</option>
                </select>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1 font-mono">Detailed Description</label>
                <textarea 
                  id="new-ticket-msg-input" 
                  rows="4" 
                  placeholder="Provide complete steps, error messages, or details..." 
                  required
                  class="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-sans text-xs resize-none"
                ></textarea>
              </div>

              <div class="pt-2 flex items-center justify-end gap-3">
                <button type="button" id="cancel-new-ticket-btn" class="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 rounded bg-white text-black hover:bg-zinc-200 text-xs font-semibold cursor-pointer">
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

export function setupTicketsEvents(onRerender) {
  createIcons({ icons });

  // Filter tabs
  const filterBtns = document.querySelectorAll('[data-ticket-filter]');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      activeFilter = btn.getAttribute('data-ticket-filter');
      onRerender();
    };
  });

  // Search input
  const searchInput = document.getElementById('user-ticket-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      onRerender();
      const newInput = document.getElementById('user-ticket-search');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    };
  }

  // View Ticket Click -> Open Drawer
  const viewBtns = document.querySelectorAll('[data-view-ticket]');
  viewBtns.forEach(btn => {
    btn.onclick = () => {
      const tickId = btn.getAttribute('data-view-ticket');
      selectedTicket = customerTickets.find(t => t.id === tickId) || null;
      actionFeedback = null;
      onRerender();
    };
  });

  // Dismiss feedback
  const dismissBtn = document.getElementById('dismiss-ticket-feedback-btn');
  if (dismissBtn) {
    dismissBtn.onclick = () => {
      actionFeedback = null;
      onRerender();
    };
  }

  // Reply Form Submit
  const replyForm = document.getElementById('reply-ticket-form');
  if (replyForm && selectedTicket) {
    replyForm.onsubmit = (e) => {
      e.preventDefault();
      const replyInput = document.getElementById('ticket-reply-text');
      if (replyInput && replyInput.value.trim()) {
        if (!selectedTicket.messages) selectedTicket.messages = [];
        selectedTicket.messages.push({
          id: `msg_${Date.now()}`,
          sender: customerUser.name,
          role: 'Client',
          time: 'Just now',
          text: replyInput.value.trim()
        });
        selectedTicket.status = 'In Progress';
        selectedTicket.lastUpdate = 'Just now';
        actionFeedback = 'Reply submitted to support engineer.';
        onRerender();
      }
    };
  }

  // Resolve Ticket Button
  const resolveBtn = document.getElementById('resolve-ticket-btn');
  if (resolveBtn && selectedTicket) {
    resolveBtn.onclick = () => {
      selectedTicket.status = 'Resolved';
      actionFeedback = `Ticket ${selectedTicket.id} marked as resolved.`;
      onRerender();
    };
  }

  // Close Drawer Click
  const closeDrawerBtn = document.getElementById('close-ticket-drawer-btn');
  const closeDrawerFooterBtn = document.getElementById('close-ticket-drawer-footer-btn');
  const drawerBackdrop = document.getElementById('ticket-drawer-backdrop');

  if (closeDrawerBtn) closeDrawerBtn.onclick = () => { selectedTicket = null; actionFeedback = null; onRerender(); };
  if (closeDrawerFooterBtn) closeDrawerFooterBtn.onclick = () => { selectedTicket = null; actionFeedback = null; onRerender(); };
  if (drawerBackdrop) drawerBackdrop.onclick = () => { selectedTicket = null; actionFeedback = null; onRerender(); };

  // Open Ticket Modal Toggle
  const openTicketBtn = document.getElementById('open-ticket-btn');
  const closeNewTicketBtn = document.getElementById('close-new-ticket-btn');
  const cancelNewTicketBtn = document.getElementById('cancel-new-ticket-btn');
  const newTicketBackdrop = document.getElementById('new-ticket-backdrop');

  if (openTicketBtn) openTicketBtn.onclick = () => { isOpenTicketModalOpen = true; onRerender(); };
  if (closeNewTicketBtn) closeNewTicketBtn.onclick = () => { isOpenTicketModalOpen = false; onRerender(); };
  if (cancelNewTicketBtn) cancelNewTicketBtn.onclick = () => { isOpenTicketModalOpen = false; onRerender(); };
  if (newTicketBackdrop) newTicketBackdrop.onclick = () => { isOpenTicketModalOpen = false; onRerender(); };

  // New Ticket Form Submit
  const newTicketForm = document.getElementById('open-ticket-form');
  if (newTicketForm) {
    newTicketForm.onsubmit = (e) => {
      e.preventDefault();
      const subjectInput = document.getElementById('new-ticket-subject-input');
      const deptInput = document.getElementById('new-ticket-dept-input');
      const priorityInput = document.getElementById('new-ticket-priority-input');
      const serviceInput = document.getElementById('new-ticket-service-input');
      const msgInput = document.getElementById('new-ticket-msg-input');

      if (subjectInput && msgInput && subjectInput.value.trim() && msgInput.value.trim()) {
        const newTicket = {
          id: `TICK-${Math.floor(5000 + Math.random() * 4999)}`,
          subject: subjectInput.value.trim(),
          department: deptInput ? deptInput.value : 'Technical Support',
          service: serviceInput ? serviceInput.value : 'General',
          status: 'Open',
          lastUpdate: 'Just now',
          priority: priorityInput ? priorityInput.value : 'Normal',
          messages: [
            {
              id: `msg_${Date.now()}`,
              sender: customerUser.name,
              role: 'Client',
              time: 'Just now',
              text: msgInput.value.trim()
            }
          ]
        };
        customerTickets.unshift(newTicket);
      }

      isOpenTicketModalOpen = false;
      onRerender();
    };
  }
}
