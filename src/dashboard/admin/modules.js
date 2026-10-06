import overviewHtml from './modules/overview.html?raw';
import hostingHtml from './modules/hosting.html?raw';
import applicationsHtml from './modules/applications.html?raw';
import sslHtml from './modules/ssl.html?raw';
import instancesHtml from './modules/instances.html?raw';
import snapshotsHtml from './modules/snapshots.html?raw';
import sshKeysHtml from './modules/sshKeys.html?raw';
import registeredDomainsHtml from './modules/registeredDomains.html?raw';
import dnsZonesHtml from './modules/dnsZones.html?raw';
import dnsCutoverHtml from './modules/dnsCutover.html?raw';
import emailDomainsHtml from './modules/emailDomains.html?raw';
import mailboxesHtml from './modules/mailboxes.html?raw';
import aliasesHtml from './modules/aliases.html?raw';
import deliverabilityHtml from './modules/deliverability.html?raw';
import migrationQueueHtml from './modules/migrationQueue.html?raw';
import customersHtml from './modules/customers.html?raw';
import invoicesHtml from './modules/invoices.html?raw';
import subscriptionsHtml from './modules/subscriptions.html?raw';
import couponsHtml from './modules/coupons.html?raw';
import plansHtml from './modules/plans.html?raw';
import ticketsHtml from './modules/tickets.html?raw';
import announcementsHtml from './modules/announcements.html?raw';
import activityLogsHtml from './modules/activityLogs.html?raw';
import staffRolesHtml from './modules/staffRoles.html?raw';
import settingsHtml from './modules/settings.html?raw';

import Chart from 'chart.js/auto';
import { createIcons, icons } from 'lucide';

/**
 * Hostlab Admin Dashboard - Consolidated Module Engine
 * All Admin Modules are written in standalone .html files and managed by this single JS engine.
 */

let activeChart = null;

/**
 * Renders the matching HTML string based on active navigation state
 */
export function renderAdminModuleHTML(activeParent = 'overview', activeSub = null) {
  // 1. Overview
  if (activeParent === 'overview') {
    return overviewHtml;
  }

  // 2. Hosting
  if (activeParent === 'hosting') {
    if (activeSub === 'hosting-apps') return applicationsHtml;
    if (activeSub === 'hosting-ssl') return sslHtml;
    return hostingHtml;
  }

  // 3. VPS Instances
  if (activeParent === 'instances') {
    if (activeSub === 'vps-snapshots') return snapshotsHtml;
    if (activeSub === 'vps-ssh') return sshKeysHtml;
    return instancesHtml;
  }

  // 4. Domains & DNS
  if (activeParent === 'domains') {
    if (activeSub === 'domains-zones') return dnsZonesHtml;
    if (activeSub === 'domains-cutover') return dnsCutoverHtml;
    return registeredDomainsHtml;
  }

  // 5. Business Email
  if (activeParent === 'email') {
    if (activeSub === 'email-mailboxes') return mailboxesHtml;
    if (activeSub === 'email-aliases') return aliasesHtml;
    if (activeSub === 'email-deliverability') return deliverabilityHtml;
    return emailDomainsHtml;
  }

  // 6. Billing & Invoices
  if (activeParent === 'billing') {
    if (activeSub === 'billing-invoices') return invoicesHtml;
    if (activeSub === 'billing-coupons') return couponsHtml;
    if (activeSub === 'billing-plans') return plansHtml;
    return subscriptionsHtml;
  }

  // 7. Customers & CRM
  if (activeParent === 'customers') {
    return customersHtml;
  }

  // 8. Support Tickets
  if (activeParent === 'tickets') {
    return ticketsHtml;
  }

  // 9. Operations
  if (activeParent === 'operations') {
    if (activeSub === 'ops-migrations') return migrationQueueHtml;
    if (activeSub === 'ops-activity') return activityLogsHtml;
    return announcementsHtml;
  }

  // 10. System
  if (activeParent === 'system') {
    if (activeSub === 'system-roles') return staffRolesHtml;
    return settingsHtml;
  }

  return overviewHtml;
}

/**
 * Attaches all events, modals, table search, and interactive controls for admin modules
 */
export function setupAdminModuleEvents(activeParent, activeSub, onNavigate, onRerender) {
  const root = document.getElementById('admin-content-root');
  if (!root) return;

  createIcons({ icons });

  // Cleanup chart if navigating away
  if (activeChart) {
    try {
      activeChart.destroy();
    } catch (e) {}
    activeChart = null;
  }

  // 1. In-content navigation buttons
  const routeButtons = root.querySelectorAll('[data-route-parent]');
  routeButtons.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const parent = btn.getAttribute('data-route-parent');
      const sub = btn.getAttribute('data-route-sub') || null;
      if (onNavigate) {
        onNavigate({
          activeParent: parent,
          activeSub: sub
        });
      }
    };
  });

  // 2. Overview Revenue Chart initialization
  if (activeParent === 'overview') {
    const canvas = document.getElementById('revenue-overview-chart');
    if (canvas && typeof Chart !== 'undefined') {
      try {
        const isDark = document.documentElement.classList.contains('dark');
        activeChart = new Chart(canvas, {
          type: 'line',
          data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [
              {
                label: 'MRR ($)',
                data: [21400, 23900, 26100, 28800, 30500, 32180],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                fill: true,
                tension: 0.35,
                borderWidth: 2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: isDark ? '#71717a' : '#a1a1aa' }
              },
              y: {
                grid: { color: isDark ? '#27272a' : '#e4e4e7' },
                ticks: { color: isDark ? '#71717a' : '#a1a1aa' }
              }
            }
          }
        });
      } catch (err) {
        console.warn('Chart setup notice', err);
      }
    }
  }

  // 3. Generic Table Search Filters
  const searchInputs = root.querySelectorAll('input[type="text"][placeholder*="Search"]');
  searchInputs.forEach(input => {
    input.oninput = (e) => {
      const query = e.target.value.toLowerCase().trim();
      const table = input.closest('.border')?.querySelector('tbody') || root.querySelector('tbody');
      if (table) {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      }
    };
  });

  // 4. Generic Modal Handlers (Close on [data-close-modal], dismiss clicks)
  const modalCloses = root.querySelectorAll('[data-close-modal]');
  modalCloses.forEach(btn => {
    btn.onclick = () => {
      const modal = btn.closest('[id$="-modal"]');
      if (modal) modal.classList.add('hidden');
    };
  });

  // 5. Drawer Closes (Close on [data-close-drawer])
  const drawerCloses = root.querySelectorAll('[data-close-drawer]');
  drawerCloses.forEach(btn => {
    btn.onclick = () => {
      const drawer = btn.closest('[id$="-drawer"]');
      if (drawer) drawer.classList.add('translate-x-full');
    };
  });

  // 6. Generic Form Submissions / Action Alerts
  const submitBtns = root.querySelectorAll('button[type="submit"], [data-submit-action]');
  submitBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const actionName = btn.getAttribute('data-submit-action') || 'Action';
      btn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i><span>Completed</span>';
      createIcons({ icons });
      setTimeout(() => {
        const modal = btn.closest('[id$="-modal"]');
        if (modal) modal.classList.add('hidden');
        if (onRerender) onRerender();
      }, 1000);
    };
  });
}
