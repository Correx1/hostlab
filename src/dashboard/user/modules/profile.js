import { customerUser } from '../db.js';
import { createIcons, icons } from 'lucide';

// Module state
let actionFeedback = null;
let copyTooltipTimeout = null;

export function renderUserProfile() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- 1. Header: Exact Admin Style with Profile Banner -->
      <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="w-16 h-16 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl font-mono shadow-md shrink-0">
              AT
            </div>
            <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center" title="Online & Verified">
              <i data-lucide="check" class="w-3 h-3 text-white stroke-[3]"></i>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2.5">
              <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
                ${customerUser.name}
              </h1>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Verified Client
              </span>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                ${customerUser.tier}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
              <span>${customerUser.company}</span>
              <span>•</span>
              <span>${customerUser.email}</span>
              <span>•</span>
              <button 
                type="button" 
                id="copy-client-id-btn"
                class="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Click to copy Client ID"
              >
                <span>ID: ${customerUser.id}</span>
                <i data-lucide="copy" class="w-3 h-3"></i>
                <span id="copy-status" class="text-emerald-500 hidden font-bold">Copied!</span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <button 
            type="button" 
            id="save-profile-btn"
            class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="check" class="w-4 h-4"></i>
            <span id="save-profile-text">Save Changes</span>
          </button>
        </div>
      </div>

      <!-- Feedback Banner -->
      ${actionFeedback ? `
        <div class="px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center justify-between">
          <span>✓ ${actionFeedback}</span>
          <button id="dismiss-profile-feedback-btn" class="text-emerald-500 hover:text-emerald-300 cursor-pointer">
            <i data-lucide="x" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      ` : ''}

      <!-- 2. Stat Cards: Exact Admin Style -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Account Tier -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="award" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Membership Tier
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${customerUser.tier}
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Member since ${customerUser.memberSince}
            </div>
          </div>
        </div>

        <!-- Account Balance -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start justify-between">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="wallet" class="w-5 h-5"></i>
            </div>
            <button 
              type="button" 
              data-route-parent="billing"
              class="text-[11px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Billing →
            </button>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Current Balance
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                ${customerUser.balance}
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Auto-draw active • Next: ${customerUser.nextBillingDate}
            </div>
          </div>
        </div>

        <!-- Active Resources -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="layers" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Active Resources
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                9 Services
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              3 Sites · 2 VPS · 4 Domains
            </div>
          </div>
        </div>

        <!-- Security Status -->
        <div class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-start">
            <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Account Security
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-xl font-bold font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
                2FA Active
              </span>
            </div>
            <div class="mt-2 text-xs text-zinc-500 truncate">
              Protected via TOTP Authenticator
            </div>
          </div>
        </div>

      </div>

      <!-- 3. Profile Information Form -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm p-6 space-y-6">
        <div class="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h3 class="text-sm font-bold font-display text-zinc-900 dark:text-white">
            Personal &amp; Contact Details
          </h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Primary contact information associated with this Hostlab client account.
          </p>
        </div>

        <form id="profile-edit-form" class="space-y-4 max-w-4xl text-xs font-sans">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Full Name</label>
              <input 
                type="text" 
                id="myprofile-name-input" 
                value="${customerUser.name}" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
              />
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Primary Email</label>
              <input 
                type="email" 
                id="myprofile-email-input" 
                value="${customerUser.email}" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
              />
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Company / Legal Entity</label>
              <input 
                type="text" 
                id="myprofile-company-input" 
                value="${customerUser.company}" 
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
              />
            </div>

            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Phone Number</label>
              <input 
                type="text" 
                id="myprofile-phone-input" 
                value="${customerUser.phone || '+1 (555) 389-4019'}" 
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
              />
            </div>
          </div>
        </form>
      </div>

      <!-- 4. Billing & Organization Address -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm p-6 space-y-6">
        <div class="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h3 class="text-sm font-bold font-display text-zinc-900 dark:text-white">
            Billing &amp; Tax Address
          </h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Address used on official VAT invoices and payment receipts.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans max-w-4xl">
          <div class="md:col-span-2">
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Street Address</label>
            <input 
              type="text" 
              id="myprofile-address-input"
              value="${customerUser.address || '84 King Street West, Suite 400'}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">City</label>
            <input 
              type="text" 
              id="myprofile-city-input"
              value="${customerUser.city || 'Toronto'}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Postal / ZIP Code</label>
            <input 
              type="text" 
              id="myprofile-postal-input"
              value="${customerUser.postalCode || 'M5H 1J9'}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Country</label>
            <input 
              type="text" 
              id="myprofile-country-input"
              value="${customerUser.country || 'Canada'}" 
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            />
          </div>

          <div>
            <label class="block font-mono uppercase text-zinc-500 mb-1.5">Preferred Currency</label>
            <select 
              id="myprofile-currency-input"
              class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            >
              <option value="USD ($)" ${customerUser.currency === 'USD ($)' ? 'selected' : ''}>USD ($) - US Dollar</option>
              <option value="EUR (€)" ${customerUser.currency === 'EUR (€)' ? 'selected' : ''}>EUR (€) - Euro</option>
              <option value="GBP (£)" ${customerUser.currency === 'GBP (£)' ? 'selected' : ''}>GBP (£) - British Pound</option>
              <option value="CAD ($)" ${customerUser.currency === 'CAD ($)' ? 'selected' : ''}>CAD ($) - Canadian Dollar</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 5. Active Sessions & Security Log -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm p-6 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h3 class="text-sm font-bold font-display text-zinc-900 dark:text-white">
              Active Authorized Sessions
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Devices currently signed in to your Hostlab client account.
            </p>
          </div>
          <button 
            type="button" 
            id="revoke-sessions-btn"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
            <span id="revoke-sessions-text">Sign Out Other Sessions</span>
          </button>
        </div>

        <div class="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
          <div class="py-3 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shrink-0">
                <i data-lucide="laptop" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span>Chrome on macOS</span>
                  <span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Current Device
                  </span>
                </div>
                <div class="text-zinc-500 font-mono text-[11px] mt-0.5">
                  Toronto, Canada • 142.250.190.46 • Active now
                </div>
              </div>
            </div>
          </div>

          <div class="py-3 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shrink-0">
                <i data-lucide="smartphone" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="font-semibold text-zinc-900 dark:text-white">
                  Hostlab iOS Client
                </div>
                <div class="text-zinc-500 font-mono text-[11px] mt-0.5">
                  Toronto, Canada • 174.114.88.19 • Last active 2 hours ago
                </div>
              </div>
            </div>
            <span class="text-xs text-zinc-400 font-mono">Mobile App</span>
          </div>
        </div>
      </div>

      <!-- 6. Quick Account Shortcuts -->
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 class="text-xs font-bold font-display text-zinc-900 dark:text-white">
            Looking for Password, 2FA or Notification Preferences?
          </h4>
          <p class="text-xs text-zinc-500 mt-0.5">
            Configure authentication credentials, API tokens, and operational alerts in Account Settings.
          </p>
        </div>

        <button 
          type="button" 
          data-route-parent="settings"
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer shrink-0"
        >
          <i data-lucide="settings" class="w-3.5 h-3.5"></i>
          <span>Account Settings →</span>
        </button>
      </div>

    </div>
  `;
}

export function setupProfileEvents(onRerender) {
  createIcons({ icons });

  // Dismiss feedback
  const dismissBtn = document.getElementById('dismiss-profile-feedback-btn');
  if (dismissBtn) {
    dismissBtn.onclick = () => {
      actionFeedback = null;
      onRerender();
    };
  }

  // Copy Client ID
  const copyBtn = document.getElementById('copy-client-id-btn');
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard?.writeText(customerUser.id);
      const status = document.getElementById('copy-status');
      if (status) {
        status.classList.remove('hidden');
        clearTimeout(copyTooltipTimeout);
        copyTooltipTimeout = setTimeout(() => {
          status.classList.add('hidden');
        }, 1800);
      }
    };
  }

  // Revoke other sessions
  const revokeBtn = document.getElementById('revoke-sessions-btn');
  if (revokeBtn) {
    revokeBtn.onclick = () => {
      const text = document.getElementById('revoke-sessions-text');
      if (text) text.textContent = 'Revoked all other devices!';
      revokeBtn.classList.add('border-emerald-500', 'text-emerald-500');
      setTimeout(() => {
        if (text) text.textContent = 'Sign Out Other Sessions';
        revokeBtn.classList.remove('border-emerald-500', 'text-emerald-500');
      }, 2500);
    };
  }

  // Save Profile Button
  const saveBtn = document.getElementById('save-profile-btn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      const nameInput = document.getElementById('myprofile-name-input');
      const emailInput = document.getElementById('myprofile-email-input');
      const companyInput = document.getElementById('myprofile-company-input');
      const phoneInput = document.getElementById('myprofile-phone-input');
      const addressInput = document.getElementById('myprofile-address-input');
      const cityInput = document.getElementById('myprofile-city-input');
      const postalInput = document.getElementById('myprofile-postal-input');
      const countryInput = document.getElementById('myprofile-country-input');
      const currencyInput = document.getElementById('myprofile-currency-input');

      if (nameInput) customerUser.name = nameInput.value.trim();
      if (emailInput) customerUser.email = emailInput.value.trim();
      if (companyInput) customerUser.company = companyInput.value.trim();
      if (phoneInput) customerUser.phone = phoneInput.value.trim();
      if (addressInput) customerUser.address = addressInput.value.trim();
      if (cityInput) customerUser.city = cityInput.value.trim();
      if (postalInput) customerUser.postalCode = postalInput.value.trim();
      if (countryInput) customerUser.country = countryInput.value.trim();
      if (currencyInput) customerUser.currency = currencyInput.value;

      actionFeedback = 'Profile and billing address details updated successfully.';
      
      const btnText = document.getElementById('save-profile-text');
      if (btnText) btnText.textContent = 'Saved!';
      saveBtn.classList.add('bg-emerald-600', 'text-white');

      setTimeout(() => {
        if (btnText) btnText.textContent = 'Save Changes';
        saveBtn.classList.remove('bg-emerald-600', 'text-white');
      }, 2000);

      onRerender();
    };
  }
}
