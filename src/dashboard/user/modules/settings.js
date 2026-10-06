import { customerUser } from '../db.js';
import { createIcons, icons } from 'lucide';

// ==========================================
// 1. STATE & CONFIG
// ==========================================

let activeTab = 'profile'; // 'profile' | 'security' | 'notifications'

const userSettingsState = {
  profile: {
    name: customerUser.name,
    email: customerUser.email,
    phone: '+1 (555) 389-4019',
    company: customerUser.company,
    address: '84 King Street West, Suite 400',
    city: 'Toronto',
    country: 'Canada',
    postalCode: 'M5H 1J8'
  },
  security: {
    twoFactorEnabled: customerUser.twoFactorEnabled,
    sessionAlerts: true,
    strictIpLock: false
  },
  notifications: {
    maintenanceAlerts: true,
    billingInvoices: true,
    snapshotDigests: true,
    productUpdates: false
  }
};

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderUserSettings() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Account Settings
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Manage your personal profile, authentication security, and platform notifications.
          </p>
        </div>

        <div class="flex items-center gap-2.5">
          <button 
            type="button" 
            id="save-all-settings-btn"
            class="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="check" class="w-4 h-4"></i>
            <span id="save-btn-text">Save Changes</span>
          </button>
        </div>
      </div>

      <!-- Segmented Tab Navigation -->
      <div class="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto pb-px">
        <button 
          type="button" 
          data-tab="profile"
          class="settings-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === 'profile' ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
        >
          Profile &amp; Organization
        </button>
        <button 
          type="button" 
          data-tab="security"
          class="settings-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === 'security' ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
        >
          Security &amp; Login
        </button>
        <button 
          type="button" 
          data-tab="notifications"
          class="settings-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === 'notifications' ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
        >
          Notifications &amp; Preferences
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="settings-tab-container">
        <!-- Rendered via JS -->
      </div>

    </div>
  `;
}

// ==========================================
// 3. TAB RENDERERS
// ==========================================

function renderProfileTab() {
  const p = userSettingsState.profile;
  return `
    <div class="space-y-6 max-w-4xl">
      
      <!-- Personal Details Card -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Profile Information</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Full Name</label>
            <input 
              type="text" 
              id="set-user-name" 
              value="${p.name}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Email Address</label>
            <input 
              type="email" 
              id="set-user-email" 
              value="${p.email}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Phone Number</label>
            <input 
              type="text" 
              id="set-user-phone" 
              value="${p.phone}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Company / Legal Entity</label>
            <input 
              type="text" 
              id="set-user-company" 
              value="${p.company}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Billing Address Card -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Billing Address</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div class="md:col-span-2">
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Street Address</label>
            <input 
              type="text" 
              id="set-user-address" 
              value="${p.address}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">City</label>
            <input 
              type="text" 
              id="set-user-city" 
              value="${p.city}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Country</label>
            <select id="set-user-country" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
              <option value="Canada" ${p.country === 'Canada' ? 'selected' : ''}>Canada</option>
              <option value="United States" ${p.country === 'United States' ? 'selected' : ''}>United States</option>
              <option value="United Kingdom" ${p.country === 'United Kingdom' ? 'selected' : ''}>United Kingdom</option>
              <option value="Germany" ${p.country === 'Germany' ? 'selected' : ''}>Germany</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  `;
}

function renderSecurityTab() {
  const s = userSettingsState.security;
  return `
    <div class="space-y-6 max-w-4xl">
      
      <!-- Password Change Card -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Change Account Password</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div class="md:col-span-2">
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Current Password</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              class="w-full max-w-md px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Security Policies & Toggles -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Authentication &amp; Session Control</h3>
        
        <div class="divide-y divide-zinc-200 dark:divide-zinc-800">
          <div class="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Two-Factor Authentication (2FA)</div>
              <div class="text-[11px] text-zinc-400">Protect account access with TOTP authenticator (Google Authenticator, Authy)</div>
            </div>
            ${renderToggle('security', 'twoFactorEnabled', s.twoFactorEnabled)}
          </div>

          <div class="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">New Device Sign-in Alerts</div>
              <div class="text-[11px] text-zinc-400">Receive immediate email notices when your account is accessed from an unrecognized browser</div>
            </div>
            ${renderToggle('security', 'sessionAlerts', s.sessionAlerts)}
          </div>
        </div>
      </div>

      <!-- Active Sessions Card -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-3">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Active Login Sessions</h3>
        <div class="p-3.5 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between font-mono text-xs">
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div>
              <span class="text-zinc-900 dark:text-white font-semibold">Chrome on Windows 11</span>
              <span class="text-zinc-500 block text-[11px]">IP: 194.38.12.84 • Frankfurt, DE (Current Session)</span>
            </div>
          </div>
          <span class="text-emerald-500 text-[11px] font-semibold">Active Now</span>
        </div>
      </div>

    </div>
  `;
}

function renderNotificationsTab() {
  const n = userSettingsState.notifications;
  return `
    <div class="space-y-6 max-w-4xl">
      
      <!-- Email Notifications Card -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Email Subscriptions</h3>
        
        <div class="divide-y divide-zinc-200 dark:divide-zinc-800">
          <div class="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Scheduled Maintenance &amp; Outage Warnings</div>
              <div class="text-[11px] text-zinc-400">Receive advance notice regarding host node kernel updates and maintenance windows</div>
            </div>
            ${renderToggle('notifications', 'maintenanceAlerts', n.maintenanceAlerts)}
          </div>

          <div class="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Invoices &amp; Billing Receipts</div>
              <div class="text-[11px] text-zinc-400">Receive PDF receipts when monthly renewals and credit card charges complete</div>
            </div>
            ${renderToggle('notifications', 'billingInvoices', n.billingInvoices)}
          </div>

          <div class="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Automated Snapshot Digests</div>
              <div class="text-[11px] text-zinc-400">Confirmation alerts when daily backup archives finish uploading</div>
            </div>
            ${renderToggle('notifications', 'snapshotDigests', n.snapshotDigests)}
          </div>

          <div class="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Product Releases &amp; Changelogs</div>
              <div class="text-[11px] text-zinc-400">Quarterly updates about new datacenter regions and features</div>
            </div>
            ${renderToggle('notifications', 'productUpdates', n.productUpdates)}
          </div>
        </div>
      </div>

    </div>
  `;
}

// ==========================================
// 4. HELPERS
// ==========================================

function renderToggle(section, key, isChecked) {
  return `
    <button 
      type="button" 
      role="switch"
      data-setting-section="${section}"
      data-setting-key="${key}"
      aria-checked="${isChecked ? 'true' : 'false'}"
      class="setting-toggle relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isChecked ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}"
    >
      <span class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm ring-0 transition duration-200 ease-in-out ${isChecked ? 'translate-x-4' : 'translate-x-0'}"></span>
    </button>
  `;
}

function updateActiveTabUI() {
  const container = document.getElementById('settings-tab-container');
  if (!container) return;

  if (activeTab === 'profile') container.innerHTML = renderProfileTab();
  else if (activeTab === 'security') container.innerHTML = renderSecurityTab();
  else if (activeTab === 'notifications') container.innerHTML = renderNotificationsTab();

  bindTabEvents();
  createIcons({ icons });
}

function bindTabEvents() {
  // Bind toggle switches
  document.querySelectorAll('.setting-toggle').forEach(btn => {
    btn.onclick = () => {
      const section = btn.getAttribute('data-setting-section');
      const key = btn.getAttribute('data-setting-key');
      if (!section || !key || !userSettingsState[section]) return;

      const current = !!userSettingsState[section][key];
      const next = !current;
      userSettingsState[section][key] = next;

      const thumb = btn.querySelector('span');
      btn.setAttribute('aria-checked', next ? 'true' : 'false');
      if (next) {
        btn.classList.remove('bg-zinc-200', 'dark:bg-zinc-700');
        btn.classList.add('bg-zinc-900', 'dark:bg-white');
        if (thumb) {
          thumb.classList.remove('translate-x-0');
          thumb.classList.add('translate-x-4');
        }
      } else {
        btn.classList.remove('bg-zinc-900', 'dark:bg-white');
        btn.classList.add('bg-zinc-200', 'dark:bg-zinc-700');
        if (thumb) {
          thumb.classList.remove('translate-x-4');
          thumb.classList.add('translate-x-0');
        }
      }
    };
  });
}

// ==========================================
// 5. LIFECYCLE & EVENT HANDLERS
// ==========================================

export function setupSettingsEvents(onRerender) {
  createIcons({ icons });
  updateActiveTabUI();

  // Tab switching
  document.querySelectorAll('.settings-tab-btn').forEach(btn => {
    btn.onclick = () => {
      const tab = btn.getAttribute('data-tab');
      if (!tab) return;
      activeTab = tab;

      // Update tab button styles
      document.querySelectorAll('.settings-tab-btn').forEach(b => {
        const isCurrent = b.getAttribute('data-tab') === activeTab;
        if (isCurrent) {
          b.className = 'settings-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold';
        } else {
          b.className = 'settings-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white';
        }
      });

      updateActiveTabUI();
    };
  });

  // Save All Settings Button
  const saveBtn = document.getElementById('save-all-settings-btn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      // Sync form inputs if profile tab is active
      const nameInput = document.getElementById('set-user-name');
      const emailInput = document.getElementById('set-user-email');
      const companyInput = document.getElementById('set-user-company');
      if (nameInput) customerUser.name = nameInput.value.trim();
      if (emailInput) customerUser.email = emailInput.value.trim();
      if (companyInput) customerUser.company = companyInput.value.trim();

      const btnText = document.getElementById('save-btn-text');
      if (btnText) btnText.textContent = 'Saved!';
      saveBtn.classList.add('bg-emerald-600', 'text-white');

      setTimeout(() => {
        if (btnText) btnText.textContent = 'Save Changes';
        saveBtn.classList.remove('bg-emerald-600', 'text-white');
      }, 2000);
    };
  }
}
