import { createIcons, icons } from 'lucide';

/**
 * Hostlab System Settings Module
 * Global infrastructure configuration, security toggles, payment gateways, and API controls.
 */

// ==========================================
// 1. STATE & CONFIG
// ==========================================

let activeTab = 'general'; // 'general' | 'security' | 'billing' | 'email' | 'api'

const settingsState = {
  general: {
    platformName: 'Hostlab Cloud Platform',
    supportEmail: 'ops@hostlab.internal',
    defaultRegion: 'eu-central-1 (Frankfurt)',
    timezone: 'UTC',
    maintenanceMode: false,
    autoBackupEnabled: true
  },
  security: {
    enforceMfa: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipAllowlistOnly: false,
    tlsStrict: true,
    tamperProofAudit: true
  },
  billing: {
    currency: 'USD',
    taxRate: 0,
    stripeLive: true,
    cryptoGateways: true,
    paypalExpress: false,
    autoInvoicing: true,
    gracePeriodDays: 3
  },
  email: {
    smtpHost: 'smtp.eu-central-1.hostlab.internal',
    smtpPort: 587,
    smtpUser: 'relay@hostlab.internal',
    senderName: 'Hostlab Cloud Notification',
    senderEmail: 'noreply@hostlab.internal',
    alertOnHighLoad: true,
    weeklyReport: true
  },
  api: {
    apiKey: 'hl_live_sec_9938210492817264810293847',
    webhookUrl: 'https://hooks.hostlab.internal/events/cluster',
    rateLimit: 1200,
    apiDebugLogs: false
  }
};

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderSettingsHTML() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar (NO CARDS OVERVIEW) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Settings
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Global system configuration and platform preferences.
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
          data-tab="general"
          class="settings-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === 'general' ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
        >
          General
        </button>
        <button 
          type="button" 
          data-tab="security"
          class="settings-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === 'security' ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
        >
          Security & Access
        </button>
        <button 
          type="button" 
          data-tab="billing"
          class="settings-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === 'billing' ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
        >
          Billing & Gateways
        </button>
        <button 
          type="button" 
          data-tab="email"
          class="settings-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === 'email' ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
        >
          Email & Alerts
        </button>
        <button 
          type="button" 
          data-tab="api"
          class="settings-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === 'api' ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
        >
          API & Webhooks
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

function renderGeneralTab() {
  const g = settingsState.general;
  return `
    <div class="space-y-6 max-w-4xl">
      
      <!-- Platform Info -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Platform Information</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Platform Brand Name</label>
            <input 
              type="text" 
              id="set-platform-name" 
              value="${g.platformName}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Internal Operations Email</label>
            <input 
              type="email" 
              id="set-support-email" 
              value="${g.supportEmail}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Default Region</label>
            <select id="set-default-region" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
              <option value="eu-central-1 (Frankfurt)" ${g.defaultRegion.includes('Frankfurt') ? 'selected' : ''}>eu-central-1 (Frankfurt)</option>
              <option value="us-east-1 (N. Virginia)" ${g.defaultRegion.includes('Virginia') ? 'selected' : ''}>us-east-1 (N. Virginia)</option>
              <option value="ap-southeast-1 (Singapore)" ${g.defaultRegion.includes('Singapore') ? 'selected' : ''}>ap-southeast-1 (Singapore)</option>
            </select>
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">System Timezone</label>
            <select id="set-timezone" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none font-mono">
              <option value="UTC" ${g.timezone === 'UTC' ? 'selected' : ''}>UTC (Coordinated Universal Time)</option>
              <option value="Europe/Berlin" ${g.timezone === 'Europe/Berlin' ? 'selected' : ''}>Europe/Berlin (CET)</option>
              <option value="America/New_York" ${g.timezone === 'America/New_York' ? 'selected' : ''}>America/New_York (EST)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Operational Toggles -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Operations</h3>
        
        <div class="divide-y divide-zinc-200 dark:divide-zinc-800">
          <!-- Toggle 1: Maintenance Mode -->
          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Maintenance Mode</div>
              <div class="text-[11px] text-zinc-400">Temporarily suspend customer portal access during scheduled updates</div>
            </div>
            ${renderToggle('general', 'maintenanceMode', g.maintenanceMode)}
          </div>

          <!-- Toggle 2: Auto Backup -->
          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Automated Cluster Snapshots</div>
              <div class="text-[11px] text-zinc-400">Trigger daily differential storage snapshots at 02:00 UTC</div>
            </div>
            ${renderToggle('general', 'autoBackupEnabled', g.autoBackupEnabled)}
          </div>
        </div>
      </div>

    </div>
  `;
}

function renderSecurityTab() {
  const s = settingsState.security;
  return `
    <div class="space-y-6 max-w-4xl">
      
      <!-- Security Controls -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Authentication & Policy</h3>
        
        <div class="divide-y divide-zinc-200 dark:divide-zinc-800">
          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Enforce Two-Factor Authentication</div>
              <div class="text-[11px] text-zinc-400">Require all staff members to configure hardware FIDO2 or TOTP</div>
            </div>
            ${renderToggle('security', 'enforceMfa', s.enforceMfa)}
          </div>

          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Strict TLS 1.3 Encryption Only</div>
              <div class="text-[11px] text-zinc-400">Block cipher suites older than TLS 1.3 on all admin edge nodes</div>
            </div>
            ${renderToggle('security', 'tlsStrict', s.tlsStrict)}
          </div>

          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">IP Allowlist Restriction</div>
              <div class="text-[11px] text-zinc-400">Restrict admin console logins exclusively to corporate VPN subnets</div>
            </div>
            ${renderToggle('security', 'ipAllowlistOnly', s.ipAllowlistOnly)}
          </div>

          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Tamper-Proof Audit Logging</div>
              <div class="text-[11px] text-zinc-400">Append-only cryptographic hash sealing for system activity logs</div>
            </div>
            ${renderToggle('security', 'tamperProofAudit', s.tamperProofAudit)}
          </div>
        </div>
      </div>

      <!-- Numeric Rules -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Session Security</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Session Idle Timeout (Minutes)</label>
            <input 
              type="number" 
              id="set-session-timeout" 
              value="${s.sessionTimeout}" 
              min="5" 
              max="1440"
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Max Failed Login Attempts</label>
            <input 
              type="number" 
              id="set-max-login" 
              value="${s.maxLoginAttempts}" 
              min="3" 
              max="10"
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>

    </div>
  `;
}

function renderBillingTab() {
  const b = settingsState.billing;
  return `
    <div class="space-y-6 max-w-4xl">
      
      <!-- Currency & Invoicing -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Financial Configuration</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Base Currency</label>
            <select id="set-currency" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none font-mono">
              <option value="USD" ${b.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
              <option value="EUR" ${b.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
              <option value="GBP" ${b.currency === 'GBP' ? 'selected' : ''}>GBP (£)</option>
            </select>
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Standard Tax / VAT (%)</label>
            <input 
              type="number" 
              id="set-tax-rate" 
              value="${b.taxRate}" 
              min="0" 
              max="50"
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Payment Grace Period (Days)</label>
            <input 
              type="number" 
              id="set-grace-period" 
              value="${b.gracePeriodDays}" 
              min="0" 
              max="30"
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Payment Gateways -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Payment Methods</h3>
        
        <div class="divide-y divide-zinc-200 dark:divide-zinc-800">
          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Stripe Card Processing</div>
              <div class="text-[11px] text-zinc-400">Accept Visa, Mastercard, AMEX and Apple Pay via Stripe Elements</div>
            </div>
            ${renderToggle('billing', 'stripeLive', b.stripeLive)}
          </div>

          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Cryptocurrency Gateway (BTCPay)</div>
              <div class="text-[11px] text-zinc-400">Accept Bitcoin, Lightning Network and USDT payments directly</div>
            </div>
            ${renderToggle('billing', 'cryptoGateways', b.cryptoGateways)}
          </div>

          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">PayPal Express Checkout</div>
              <div class="text-[11px] text-zinc-400">Allow customers to pay via linked PayPal accounts</div>
            </div>
            ${renderToggle('billing', 'paypalExpress', b.paypalExpress)}
          </div>

          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Automatic Invoice Generation</div>
              <div class="text-[11px] text-zinc-400">Generate recurring invoices 7 days prior to renewal dates</div>
            </div>
            ${renderToggle('billing', 'autoInvoicing', b.autoInvoicing)}
          </div>
        </div>
      </div>

    </div>
  `;
}

function renderEmailTab() {
  const e = settingsState.email;
  return `
    <div class="space-y-6 max-w-4xl">
      
      <!-- SMTP Configuration -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Outbound SMTP Gateway</h3>
          <button 
            type="button" 
            id="test-smtp-btn" 
            class="px-2.5 py-1 text-xs font-mono rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
          >
            Test Connection
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">SMTP Server Host</label>
            <input 
              type="text" 
              id="set-smtp-host" 
              value="${e.smtpHost}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Port & Protocol</label>
            <input 
              type="number" 
              id="set-smtp-port" 
              value="${e.smtpPort}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">From Display Name</label>
            <input 
              type="text" 
              id="set-sender-name" 
              value="${e.senderName}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">From Return Address</label>
            <input 
              type="email" 
              id="set-sender-email" 
              value="${e.senderEmail}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Alert Toggles -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Automated Notifications</h3>
        
        <div class="divide-y divide-zinc-200 dark:divide-zinc-800">
          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">High Hypervisor Load Alerts</div>
              <div class="text-[11px] text-zinc-400">Dispatch immediate notifications when cluster CPU or RAM crosses 90%</div>
            </div>
            ${renderToggle('email', 'alertOnHighLoad', e.alertOnHighLoad)}
          </div>

          <div class="py-3 flex items-center justify-between gap-4">
            <div>
              <div class="text-xs font-medium text-zinc-900 dark:text-white">Weekly Executive Financial Digest</div>
              <div class="text-[11px] text-zinc-400">Summarize MRR, customer acquisition and pending tickets every Monday</div>
            </div>
            ${renderToggle('email', 'weeklyReport', e.weeklyReport)}
          </div>
        </div>
      </div>

    </div>
  `;
}

function renderApiTab() {
  const a = settingsState.api;
  return `
    <div class="space-y-6 max-w-4xl">
      
      <!-- API Access -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">API Credentials</h3>
        
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Master Cluster API Key</label>
            <div class="flex items-center gap-2">
              <input 
                type="password" 
                id="set-api-key" 
                value="${a.apiKey}" 
                readonly 
                class="flex-1 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono select-all focus:outline-none"
              />
              <button 
                type="button" 
                id="toggle-reveal-key-btn" 
                class="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 cursor-pointer"
                title="Reveal Key"
              >
                <i data-lucide="eye" class="w-4 h-4"></i>
              </button>
              <button 
                type="button" 
                id="copy-key-btn" 
                class="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">System Webhook URL</label>
            <input 
              type="url" 
              id="set-webhook-url" 
              value="${a.webhookUrl}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Rate Limit (Requests / Minute)</label>
            <input 
              type="number" 
              id="set-rate-limit" 
              value="${a.rateLimit}" 
              min="100" 
              max="10000"
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Debug Toggle -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Diagnostics</h3>
        
        <div class="py-1 flex items-center justify-between gap-4">
          <div>
            <div class="text-xs font-medium text-zinc-900 dark:text-white">API Payload Debug Logging</div>
            <div class="text-[11px] text-zinc-400">Stream verbose JSON input/output traces to system activity logs</div>
          </div>
          ${renderToggle('api', 'apiDebugLogs', a.apiDebugLogs)}
        </div>
      </div>

    </div>
  `;
}

// Helper: Sleek Toggle Switch Component (NO CHECKBOXES)
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

  if (activeTab === 'general') container.innerHTML = renderGeneralTab();
  else if (activeTab === 'security') container.innerHTML = renderSecurityTab();
  else if (activeTab === 'billing') container.innerHTML = renderBillingTab();
  else if (activeTab === 'email') container.innerHTML = renderEmailTab();
  else if (activeTab === 'api') container.innerHTML = renderApiTab();

  bindTabEvents();
  createIcons({ icons });
}

function bindTabEvents() {
  // Bind all toggle switches
  document.querySelectorAll('.setting-toggle').forEach(btn => {
    btn.onclick = () => {
      const section = btn.getAttribute('data-setting-section');
      const key = btn.getAttribute('data-setting-key');
      if (!section || !key || !settingsState[section]) return;

      const current = !!settingsState[section][key];
      const next = !current;
      settingsState[section][key] = next;

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

  // SMTP Test Button
  const testSmtpBtn = document.getElementById('test-smtp-btn');
  if (testSmtpBtn) {
    testSmtpBtn.onclick = () => {
      testSmtpBtn.textContent = 'Testing...';
      setTimeout(() => {
        testSmtpBtn.textContent = 'Connected (14ms)';
        testSmtpBtn.classList.add('text-emerald-500');
        setTimeout(() => {
          testSmtpBtn.textContent = 'Test Connection';
          testSmtpBtn.classList.remove('text-emerald-500');
        }, 2000);
      }, 500);
    };
  }

  // API Key Reveal & Copy
  const apiKeyInput = document.getElementById('set-api-key');
  const revealBtn = document.getElementById('toggle-reveal-key-btn');
  const copyBtn = document.getElementById('copy-key-btn');

  if (revealBtn && apiKeyInput) {
    revealBtn.onclick = () => {
      const isPass = apiKeyInput.type === 'password';
      apiKeyInput.type = isPass ? 'text' : 'password';
    };
  }

  if (copyBtn && apiKeyInput) {
    copyBtn.onclick = () => {
      navigator.clipboard?.writeText(apiKeyInput.value);
      copyBtn.textContent = 'Copied';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 1500);
    };
  }
}

// ==========================================
// 4. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupSettingsEvents(onNavigate) {
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

  // Global Save Changes button
  const saveBtn = document.getElementById('save-all-settings-btn');
  const saveBtnText = document.getElementById('save-btn-text');

  if (saveBtn) {
    saveBtn.onclick = () => {
      // Capture any text input values
      const pName = document.getElementById('set-platform-name')?.value;
      if (pName) settingsState.general.platformName = pName;

      const pEmail = document.getElementById('set-support-email')?.value;
      if (pEmail) settingsState.general.supportEmail = pEmail;

      if (saveBtnText) saveBtnText.textContent = 'Saved!';
      setTimeout(() => {
        if (saveBtnText) saveBtnText.textContent = 'Save Changes';
      }, 1400);
    };
  }
}

export function cleanupSettings() {
  activeTab = 'general';
}
