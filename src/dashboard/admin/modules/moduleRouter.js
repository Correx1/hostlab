import { renderOverviewHTML, setupOverviewEvents, cleanupOverview } from './overview.js';
import { renderHostingHTML, setupHostingEvents, cleanupHosting } from './hosting.js';
import { renderApplicationsHTML, setupApplicationsEvents, cleanupApplications } from './applications.js';
import { renderSslHTML, setupSslEvents, cleanupSsl } from './ssl.js';
import { renderInstancesHTML, setupInstancesEvents, cleanupInstances } from './instances.js';
import { renderSnapshotsHTML, setupSnapshotsEvents, cleanupSnapshots } from './snapshots.js';
import { renderSshKeysHTML, setupSshKeysEvents, cleanupSshKeys } from './sshKeys.js';
import { renderRegisteredDomainsHTML, setupRegisteredDomainsEvents, cleanupRegisteredDomains } from './registeredDomains.js';
import { renderDnsZonesHTML, setupDnsZonesEvents, cleanupDnsZones } from './dnsZones.js';
import { renderEmailDomainsHTML, setupEmailDomainsEvents, cleanupEmailDomains } from './emailDomains.js';
import { renderMailboxesHTML, setupMailboxesEvents, cleanupMailboxes } from './mailboxes.js';
import { renderAliasesHTML, setupAliasesEvents, cleanupAliases } from './aliases.js';
import { renderDeliverabilityHTML, setupDeliverabilityEvents, cleanupDeliverability } from './deliverability.js';
import { renderMigrationQueueHTML, setupMigrationQueueEvents, cleanupMigrationQueue } from './migrationQueue.js';
import { renderDnsCutoverHTML, setupDnsCutoverEvents, cleanupDnsCutover } from './dnsCutover.js';
import { renderCustomersHTML, setupCustomersEvents, cleanupCustomers } from './customers.js';
import { renderInvoicesHTML, setupInvoicesEvents, cleanupInvoices } from './invoices.js';
import { renderSubscriptionsHTML, setupSubscriptionsEvents, cleanupSubscriptions } from './subscriptions.js';
import { renderCouponsHTML, setupCouponsEvents, cleanupCoupons } from './coupons.js';
import { renderTicketsHTML, setupTicketsEvents, cleanupTickets } from './tickets.js';
import { renderActivityLogsHTML, setupActivityLogsEvents, cleanupActivityLogs } from './activityLogs.js';
import { renderStaffRolesHTML, setupStaffRolesEvents, cleanupStaffRoles } from './staffRoles.js';
import { renderSettingsHTML, setupSettingsEvents, cleanupSettings } from './settings.js';
import { renderPlansHTML, setupPlansEvents, cleanupPlans } from './plans.js';
import { renderAnnouncementsHTML, setupAnnouncementsEvents, cleanupAnnouncements } from './announcements.js';

/**
 * Hostlab Admin Module Registry & Router
 * Manages clean lifecycle and isolation for each module.
 */

// Track active module cleanup handler
let activeModuleCleanup = null;

export function renderModuleContent(activeParent, activeSub) {
  // Run previous module cleanup if exists
  if (activeModuleCleanup) {
    try {
      activeModuleCleanup();
    } catch (e) {
      console.warn('Error during module cleanup', e);
    }
    activeModuleCleanup = null;
  }

  // 1. Overview Module
  if (activeParent === 'overview') {
    return renderOverviewHTML();
  }

  // 2. Hosting Module -> Submenu 1: Web Hosting (hosting-sites)
  if (activeParent === 'hosting' && (!activeSub || activeSub === 'hosting-sites')) {
    return renderHostingHTML();
  }

  // 3. Hosting Module -> Submenu 2: Applications (hosting-apps)
  if (activeParent === 'hosting' && activeSub === 'hosting-apps') {
    return renderApplicationsHTML();
  }

  // 4. Hosting Module -> Submenu 3: SSL Certificates (hosting-ssl)
  if (activeParent === 'hosting' && activeSub === 'hosting-ssl') {
    return renderSslHTML();
  }

  // 5. VPS Instances Module -> Submenu 1: All Instances (vps-all)
  if (activeParent === 'instances' && (!activeSub || activeSub === 'vps-all')) {
    return renderInstancesHTML();
  }

  // 6. VPS Instances Module -> Submenu 2: Snapshots & Images (vps-snapshots)
  if (activeParent === 'instances' && activeSub === 'vps-snapshots') {
    return renderSnapshotsHTML();
  }

  // 7. VPS Instances Module -> Submenu 3: SSH Keys (vps-ssh)
  if (activeParent === 'instances' && activeSub === 'vps-ssh') {
    return renderSshKeysHTML();
  }

  // 8. Domains & DNS Module -> Submenu 1: Registered Domains (domains-registered)
  if (activeParent === 'domains' && (!activeSub || activeSub === 'domains-registered')) {
    return renderRegisteredDomainsHTML();
  }

  // 9. Domains & DNS Module -> Submenu 2: DNS Zones (domains-zones)
  if (activeParent === 'domains' && activeSub === 'domains-zones') {
    return renderDnsZonesHTML();
  }

  // 10. Business Email Module -> Submenu 1: Email Domains (email-domains)
  if (activeParent === 'email' && (!activeSub || activeSub === 'email-domains')) {
    return renderEmailDomainsHTML();
  }

  // 11. Business Email Module -> Submenu 2: Mailboxes (email-mailboxes)
  if (activeParent === 'email' && activeSub === 'email-mailboxes') {
    return renderMailboxesHTML();
  }

  // 12. Business Email Module -> Submenu 3: Aliases & Routing (email-aliases)
  if (activeParent === 'email' && activeSub === 'email-aliases') {
    return renderAliasesHTML();
  }

  // 13. Business Email Module -> Submenu 4: Deliverability (email-deliverability)
  if (activeParent === 'email' && activeSub === 'email-deliverability') {
    return renderDeliverabilityHTML();
  }

  // 14. Migrations Module -> Submenu 1: Migration Queue (migrations-queue)
  if (activeParent === 'migrations' && (!activeSub || activeSub === 'migrations-queue')) {
    return renderMigrationQueueHTML();
  }

  // 15. Migrations Module -> Submenu 2: DNS Cutover (migrations-cutover)
  if (activeParent === 'migrations' && activeSub === 'migrations-cutover') {
    return renderDnsCutoverHTML();
  }

  // 16. Customers Module (customers)
  if (activeParent === 'customers') {
    return renderCustomersHTML();
  }

  // 17. Billing & Invoices Module -> Submenu 1: Invoices (billing-invoices)
  if (activeParent === 'billing' && (!activeSub || activeSub === 'billing-invoices')) {
    return renderInvoicesHTML();
  }

  // 18. Billing & Invoices Module -> Submenu 2: Subscriptions (billing-subs)
  if (activeParent === 'billing' && activeSub === 'billing-subs') {
    return renderSubscriptionsHTML();
  }

  // 19. Billing -> Coupons & Credits (billing-coupons)
  if (activeParent === 'billing' && activeSub === 'billing-coupons') {
    return renderCouponsHTML();
  }

  // 19b. Billing -> Plans & Pricing (billing-plans)
  if (activeParent === 'billing' && activeSub === 'billing-plans') {
    return renderPlansHTML();
  }

  // 20. Support Tickets Module (tickets)
  if (activeParent === 'tickets') {
    return renderTicketsHTML();
  }

  // 20b. Announcements Module (announcements)
  if (activeParent === 'announcements') {
    return renderAnnouncementsHTML();
  }

  // 21. Activity Logs Module (logs)
  if (activeParent === 'logs') {
    return renderActivityLogsHTML();
  }

  // 22. System Module -> Submenu 1: Staff & Roles (system-roles)
  if (activeParent === 'system' && (!activeSub || activeSub === 'system-roles')) {
    return renderStaffRolesHTML();
  }

  // 23. System Module -> Submenu 2: Settings (system-settings)
  if (activeParent === 'system' && activeSub === 'system-settings') {
    return renderSettingsHTML();
  }

  // Fallback for modules queued to be built next
  const title = activeSub 
    ? activeSub.replace(/-/g, ' ').toUpperCase() 
    : activeParent.toUpperCase();

  return `
    <div class="max-w-5xl mx-auto space-y-6">
      <div class="p-8 border border-zinc-200 dark:border-zinc-800/80 rounded-lg bg-white dark:bg-zinc-900/40 shadow-sm">
        <div class="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
          <span>MODULE PIPELINE</span>
          <span>/</span>
          <span class="text-zinc-900 dark:text-zinc-200">${activeParent.toUpperCase()}</span>
        </div>
        <h2 class="text-2xl font-bold font-display text-zinc-900 dark:text-white">
          ${title}
        </h2>
        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
          This module is queued for modular construction. Ready to be built cleanly and independently.
        </p>

        <div class="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
          <div class="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Status: Next in queue
          </div>
          <a href="#overview" id="return-overview-btn" class="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">
            ← Return to Overview
          </a>
        </div>
      </div>
    </div>
  `;
}

export function setupModuleEvents(activeParent, activeSub, onNavigate) {
  if (activeParent === 'overview') {
    setupOverviewEvents(onNavigate);
    activeModuleCleanup = cleanupOverview;
  } else if (activeParent === 'hosting' && (!activeSub || activeSub === 'hosting-sites')) {
    setupHostingEvents(onNavigate);
    activeModuleCleanup = cleanupHosting;
  } else if (activeParent === 'hosting' && activeSub === 'hosting-apps') {
    setupApplicationsEvents(onNavigate);
    activeModuleCleanup = cleanupApplications;
  } else if (activeParent === 'hosting' && activeSub === 'hosting-ssl') {
    setupSslEvents(onNavigate);
    activeModuleCleanup = cleanupSsl;
  } else if (activeParent === 'instances' && (!activeSub || activeSub === 'vps-all')) {
    setupInstancesEvents(onNavigate);
    activeModuleCleanup = cleanupInstances;
  } else if (activeParent === 'instances' && activeSub === 'vps-snapshots') {
    setupSnapshotsEvents(onNavigate);
    activeModuleCleanup = cleanupSnapshots;
  } else if (activeParent === 'instances' && activeSub === 'vps-ssh') {
    setupSshKeysEvents(onNavigate);
    activeModuleCleanup = cleanupSshKeys;
  } else if (activeParent === 'domains' && (!activeSub || activeSub === 'domains-registered')) {
    setupRegisteredDomainsEvents(onNavigate);
    activeModuleCleanup = cleanupRegisteredDomains;
  } else if (activeParent === 'domains' && activeSub === 'domains-zones') {
    setupDnsZonesEvents(onNavigate);
    activeModuleCleanup = cleanupDnsZones;
  } else if (activeParent === 'email' && (!activeSub || activeSub === 'email-domains')) {
    setupEmailDomainsEvents(onNavigate);
    activeModuleCleanup = cleanupEmailDomains;
  } else if (activeParent === 'email' && activeSub === 'email-mailboxes') {
    setupMailboxesEvents(onNavigate);
    activeModuleCleanup = cleanupMailboxes;
  } else if (activeParent === 'email' && activeSub === 'email-aliases') {
    setupAliasesEvents(onNavigate);
    activeModuleCleanup = cleanupAliases;
  } else if (activeParent === 'email' && activeSub === 'email-deliverability') {
    setupDeliverabilityEvents(onNavigate);
    activeModuleCleanup = cleanupDeliverability;
  } else if (activeParent === 'migrations' && (!activeSub || activeSub === 'migrations-queue')) {
    setupMigrationQueueEvents(onNavigate);
    activeModuleCleanup = cleanupMigrationQueue;
  } else if (activeParent === 'migrations' && activeSub === 'migrations-cutover') {
    setupDnsCutoverEvents(onNavigate);
    activeModuleCleanup = cleanupDnsCutover;
  } else if (activeParent === 'customers') {
    setupCustomersEvents(onNavigate);
    activeModuleCleanup = cleanupCustomers;
  } else if (activeParent === 'billing' && (!activeSub || activeSub === 'billing-invoices')) {
    setupInvoicesEvents(onNavigate);
    activeModuleCleanup = cleanupInvoices;
  } else if (activeParent === 'billing' && activeSub === 'billing-subs') {
    setupSubscriptionsEvents(onNavigate);
    activeModuleCleanup = cleanupSubscriptions;
  } else if (activeParent === 'billing' && activeSub === 'billing-coupons') {
    setupCouponsEvents(onNavigate);
    activeModuleCleanup = cleanupCoupons;
  } else if (activeParent === 'billing' && activeSub === 'billing-plans') {
    setupPlansEvents(onNavigate);
    activeModuleCleanup = cleanupPlans;
  } else if (activeParent === 'tickets') {
    setupTicketsEvents(onNavigate);
    activeModuleCleanup = cleanupTickets;
  } else if (activeParent === 'announcements') {
    setupAnnouncementsEvents(onNavigate);
    activeModuleCleanup = cleanupAnnouncements;
  } else if (activeParent === 'logs') {
    setupActivityLogsEvents(onNavigate);
    activeModuleCleanup = cleanupActivityLogs;
  } else if (activeParent === 'system' && (!activeSub || activeSub === 'system-roles')) {
    setupStaffRolesEvents(onNavigate);
    activeModuleCleanup = cleanupStaffRoles;
  } else if (activeParent === 'system' && activeSub === 'system-settings') {
    setupSettingsEvents(onNavigate);
    activeModuleCleanup = cleanupSettings;
  } else {
    const returnBtn = document.getElementById('return-overview-btn');
    if (returnBtn) {
      returnBtn.onclick = (e) => {
        e.preventDefault();
        onNavigate({
          activeParent: 'overview',
          activeSub: null,
          openParents: []
        });
      };
    }
  }
}
