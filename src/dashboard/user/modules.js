import overviewHtml from './modules/overview.html?raw';
import hostingHtml from './modules/hosting.html?raw';
import vpsHtml from './modules/vps.html?raw';
import domainsHtml from './modules/domains.html?raw';
import emailHtml from './modules/email.html?raw';
import billingHtml from './modules/billing.html?raw';
import ticketsHtml from './modules/tickets.html?raw';
import profileHtml from './modules/profile.html?raw';
import settingsHtml from './modules/settings.html?raw';

import { 
  customerUser, 
  customerSites, 
  customerVPS, 
  customerDomains, 
  customerMailboxes, 
  customerInvoices, 
  customerSubscriptions, 
  customerTickets 
} from './db.js';
import { createIcons, icons } from 'lucide';

/**
 * Hostlab User Dashboard - Consolidated Module Engine
 * All User Modules are defined in standalone .html files and managed by this single JS engine.
 */

// Registry of module HTML templates
const userModules = {
  overview: overviewHtml,
  hosting: hostingHtml,
  vps: vpsHtml,
  domains: domainsHtml,
  email: emailHtml,
  billing: billingHtml,
  tickets: ticketsHtml,
  profile: profileHtml,
  settings: settingsHtml
};

// Module state
let activeTicketDrawer = null;
let activeVpsDrawer = null;
let activeHostingDrawer = null;
let activeDnsDrawer = null;
let copyTimeout = null;

/**
 * Returns raw HTML string for the requested module
 */
export function renderUserModuleHTML(activeParent = 'overview') {
  return userModules[activeParent] || userModules.overview;
}

/**
 * Attaches all event handlers and interactivity across all user modules
 */
export function setupUserModuleEvents(navState, onNavigate, onRerender) {
  const root = document.getElementById('user-content-root');
  if (!root) return;

  createIcons({ icons });

  // 1. Global in-content route buttons (data-route-parent)
  const routeButtons = root.querySelectorAll('[data-route-parent]');
  routeButtons.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const parent = btn.getAttribute('data-route-parent');
      const sub = btn.getAttribute('data-route-sub') || null;
      if (onNavigate) {
        onNavigate({
          ...navState,
          activeParent: parent,
          activeSub: sub,
          isMobileOpen: false
        });
      }
    };
  });

  const activeModule = navState.activeParent;

  // -------------------------------------------------------------
  // PROFILE MODULE EVENTS
  // -------------------------------------------------------------
  if (activeModule === 'profile') {
    // Copy Client ID
    const copyBtn = document.getElementById('copy-client-id-btn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard?.writeText(customerUser.id);
        const status = document.getElementById('copy-status');
        if (status) {
          status.classList.remove('hidden');
          clearTimeout(copyTimeout);
          copyTimeout = setTimeout(() => status.classList.add('hidden'), 1800);
        }
      };
    }

    // Save Profile
    const saveBtn = document.getElementById('save-profile-btn');
    if (saveBtn) {
      saveBtn.onclick = () => {
        const nameInput = document.getElementById('myprofile-name-input');
        const emailInput = document.getElementById('myprofile-email-input');
        const companyInput = document.getElementById('myprofile-company-input');
        const phoneInput = document.getElementById('myprofile-phone-input');
        const addressInput = document.getElementById('myprofile-address-input');
        const cityInput = document.getElementById('myprofile-city-input');

        if (nameInput) customerUser.name = nameInput.value.trim();
        if (emailInput) customerUser.email = emailInput.value.trim();
        if (companyInput) customerUser.company = companyInput.value.trim();
        if (phoneInput) customerUser.phone = phoneInput.value.trim();
        if (addressInput) customerUser.address = addressInput.value.trim();
        if (cityInput) customerUser.city = cityInput.value.trim();

        const btnText = document.getElementById('save-profile-text');
        if (btnText) btnText.textContent = 'Saved!';
        saveBtn.classList.add('bg-emerald-600', 'text-white');

        setTimeout(() => {
          if (btnText) btnText.textContent = 'Save Changes';
          saveBtn.classList.remove('bg-emerald-600', 'text-white');
        }, 2000);
      };
    }

    // Revoke sessions
    const revokeBtn = document.getElementById('revoke-sessions-btn');
    if (revokeBtn) {
      revokeBtn.onclick = () => {
        const text = document.getElementById('revoke-sessions-text');
        if (text) text.textContent = 'Revoked other sessions!';
        revokeBtn.classList.add('border-emerald-500', 'text-emerald-500');
        setTimeout(() => {
          if (text) text.textContent = 'Sign Out Other Sessions';
          revokeBtn.classList.remove('border-emerald-500', 'text-emerald-500');
        }, 2000);
      };
    }
  }

  // -------------------------------------------------------------
  // HOSTING MODULE EVENTS
  // -------------------------------------------------------------
  if (activeModule === 'hosting') {
    // Drawer opener
    const openDrawerBtns = root.querySelectorAll('[data-open-site-drawer]');
    const drawer = document.getElementById('hosting-manage-drawer');
    const closeDrawerBtn = document.getElementById('close-hosting-drawer-btn');

    openDrawerBtns.forEach(btn => {
      btn.onclick = () => {
        if (drawer) drawer.classList.remove('translate-x-full');
      };
    });

    if (closeDrawerBtn && drawer) {
      closeDrawerBtn.onclick = () => drawer.classList.add('translate-x-full');
    }

    // Password view toggle
    const togglePassBtn = document.getElementById('toggle-sftp-pass-btn');
    const passInput = document.getElementById('sftp-pass-display');
    if (togglePassBtn && passInput) {
      togglePassBtn.onclick = () => {
        passInput.type = passInput.type === 'password' ? 'text' : 'password';
      };
    }

    // Backup button
    const backupBtn = document.getElementById('create-backup-now-btn');
    if (backupBtn) {
      backupBtn.onclick = () => {
        backupBtn.innerHTML = '<i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i><span>Backing up...</span>';
        createIcons({ icons });
        setTimeout(() => {
          backupBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i><span>Backup Completed</span>';
          createIcons({ icons });
          setTimeout(() => {
            backupBtn.innerHTML = '<i data-lucide="archive" class="w-3.5 h-3.5"></i><span>Create Manual Backup</span>';
            createIcons({ icons });
          }, 2000);
        }, 1500);
      };
    }
  }

  // -------------------------------------------------------------
  // CLOUD VPS MODULE EVENTS
  // -------------------------------------------------------------
  if (activeModule === 'vps') {
    // Power Toggle
    const powerBtns = root.querySelectorAll('[data-action="toggle-power"]');
    powerBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-vps-id');
        const vps = customerVPS.find(v => v.id === id);
        if (vps) {
          vps.status = vps.status === 'running' ? 'stopped' : 'running';
          onRerender();
        }
      };
    });

    // Reboot Button
    const rebootBtns = root.querySelectorAll('[data-action="reboot"]');
    rebootBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-vps-id');
        const vps = customerVPS.find(v => v.id === id);
        if (vps) {
          vps.status = 'rebooting';
          btn.innerHTML = '<i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i>';
          createIcons({ icons });
          setTimeout(() => {
            vps.status = 'running';
            onRerender();
          }, 2000);
        }
      };
    });

    // VNC Console Modal
    const vncModal = document.getElementById('vnc-console-modal');
    const openVncBtns = root.querySelectorAll('[data-action="open-vnc"]');
    const closeVncBtn = document.getElementById('close-vnc-modal-btn');

    openVncBtns.forEach(btn => {
      btn.onclick = () => {
        if (vncModal) vncModal.classList.remove('hidden');
      };
    });
    if (closeVncBtn && vncModal) {
      closeVncBtn.onclick = () => vncModal.classList.add('hidden');
    }
  }

  // -------------------------------------------------------------
  // DOMAINS & DNS MODULE EVENTS
  // -------------------------------------------------------------
  if (activeModule === 'domains') {
    // Add Record Modal
    const recordModal = document.getElementById('add-dns-record-modal');
    const openRecordBtn = document.getElementById('open-add-record-modal-btn');
    const closeRecordBtn = document.getElementById('close-add-record-modal-btn');
    const saveRecordBtn = document.getElementById('save-new-dns-record-btn');

    if (openRecordBtn && recordModal) {
      openRecordBtn.onclick = () => recordModal.classList.remove('hidden');
    }
    if (closeRecordBtn && recordModal) {
      closeRecordBtn.onclick = () => recordModal.classList.add('hidden');
    }
    if (saveRecordBtn && recordModal) {
      saveRecordBtn.onclick = () => {
        recordModal.classList.add('hidden');
        alert('DNS Record created successfully.');
      };
    }

    // Nameservers save
    const saveNsBtn = document.getElementById('save-nameservers-btn');
    if (saveNsBtn) {
      saveNsBtn.onclick = () => {
        saveNsBtn.textContent = 'Saved!';
        setTimeout(() => saveNsBtn.textContent = 'Update Nameservers', 1800);
      };
    }
  }

  // -------------------------------------------------------------
  // BUSINESS EMAIL MODULE EVENTS
  // -------------------------------------------------------------
  if (activeModule === 'email') {
    // Create Mailbox Modal
    const mailboxModal = document.getElementById('create-mailbox-modal');
    const openMailboxBtn = document.getElementById('open-create-mailbox-modal-btn');
    const closeMailboxBtn = document.getElementById('close-create-mailbox-modal-btn');
    const createMailboxSubmit = document.getElementById('submit-create-mailbox-btn');

    if (openMailboxBtn && mailboxModal) {
      openMailboxBtn.onclick = () => mailboxModal.classList.remove('hidden');
    }
    if (closeMailboxBtn && mailboxModal) {
      closeMailboxBtn.onclick = () => mailboxModal.classList.add('hidden');
    }
    if (createMailboxSubmit && mailboxModal) {
      createMailboxSubmit.onclick = () => {
        mailboxModal.classList.add('hidden');
        alert('Mailbox provisioned successfully.');
      };
    }
  }

  // -------------------------------------------------------------
  // BILLING & INVOICES MODULE EVENTS
  // -------------------------------------------------------------
  if (activeModule === 'billing') {
    // Add Funds Modal
    const addFundsModal = document.getElementById('add-funds-modal');
    const openAddFundsBtn = document.getElementById('open-add-funds-modal-btn');
    const closeAddFundsBtn = document.getElementById('close-add-funds-modal-btn');
    const confirmAddFundsBtn = document.getElementById('confirm-add-funds-btn');

    if (openAddFundsBtn && addFundsModal) {
      openAddFundsBtn.onclick = () => addFundsModal.classList.remove('hidden');
    }
    if (closeAddFundsBtn && addFundsModal) {
      closeAddFundsBtn.onclick = () => addFundsModal.classList.add('hidden');
    }
    if (confirmAddFundsBtn && addFundsModal) {
      confirmAddFundsBtn.onclick = () => {
        customerUser.balance = '$192.50';
        addFundsModal.classList.add('hidden');
        onRerender();
      };
    }

    // Payment Method Modal
    const paymentModal = document.getElementById('payment-method-modal');
    const openPaymentBtn = document.getElementById('open-payment-method-modal-btn');
    const closePaymentBtn = document.getElementById('close-payment-method-modal-btn');

    if (openPaymentBtn && paymentModal) {
      openPaymentBtn.onclick = () => paymentModal.classList.remove('hidden');
    }
    if (closePaymentBtn && paymentModal) {
      closePaymentBtn.onclick = () => paymentModal.classList.add('hidden');
    }
  }

  // -------------------------------------------------------------
  // SUPPORT TICKETS MODULE EVENTS
  // -------------------------------------------------------------
  if (activeModule === 'tickets') {
    // Ticket Drawer
    const drawer = document.getElementById('ticket-detail-drawer');
    const closeDrawerBtn = document.getElementById('close-ticket-drawer-btn');
    const ticketRows = root.querySelectorAll('[data-ticket-id]');

    ticketRows.forEach(row => {
      row.onclick = () => {
        if (drawer) drawer.classList.remove('translate-x-full');
      };
    });

    if (closeDrawerBtn && drawer) {
      closeDrawerBtn.onclick = () => drawer.classList.add('translate-x-full');
    }

    // Reply Box
    const replyBtn = document.getElementById('send-ticket-reply-btn');
    const replyTextarea = document.getElementById('ticket-reply-textarea');
    if (replyBtn && replyTextarea) {
      replyBtn.onclick = () => {
        if (replyTextarea.value.trim()) {
          replyTextarea.value = '';
          alert('Response sent to Hostlab Tier-3 engineers.');
        }
      };
    }

    // New Ticket Modal
    const newModal = document.getElementById('new-ticket-modal');
    const openNewBtn = document.getElementById('open-new-ticket-modal-btn');
    const closeNewBtn = document.getElementById('close-new-ticket-modal-btn');
    const submitTicketBtn = document.getElementById('submit-ticket-btn');

    if (openNewBtn && newModal) {
      openNewBtn.onclick = () => newModal.classList.remove('hidden');
    }
    if (closeNewBtn && newModal) {
      closeNewBtn.onclick = () => newModal.classList.add('hidden');
    }
    if (submitTicketBtn && newModal) {
      submitTicketBtn.onclick = () => {
        newModal.classList.add('hidden');
        alert('Ticket submitted successfully. Ticket #HL-8491 created.');
      };
    }
  }

  // -------------------------------------------------------------
  // SETTINGS MODULE EVENTS
  // -------------------------------------------------------------
  if (activeModule === 'settings') {
    // Toggles
    const toggleButtons = root.querySelectorAll('.setting-toggle');
    toggleButtons.forEach(btn => {
      btn.onclick = () => {
        const dot = btn.querySelector('.toggle-dot');
        const isActive = btn.classList.contains('bg-emerald-600') || btn.classList.contains('bg-white');
        if (isActive) {
          btn.classList.remove('bg-emerald-600', 'bg-white');
          btn.classList.add('bg-zinc-300', 'dark:bg-zinc-800');
          if (dot) dot.classList.remove('translate-x-4');
        } else {
          btn.classList.remove('bg-zinc-300', 'dark:bg-zinc-800');
          btn.classList.add('bg-emerald-600');
          if (dot) dot.classList.add('translate-x-4');
        }
      };
    });

    // Save Settings button
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    if (saveSettingsBtn) {
      saveSettingsBtn.onclick = () => {
        saveSettingsBtn.textContent = 'Settings Saved!';
        setTimeout(() => saveSettingsBtn.textContent = 'Save Changes', 2000);
      };
    }
  }
}
