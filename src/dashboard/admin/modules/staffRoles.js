import { createIcons, icons } from 'lucide';

/**
 * Hostlab Staff & RBAC Roles Module
 * Administrative personnel and RBAC permission matrices with toggle controls.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

export const availablePermissions = [
  { id: 'vps_read', category: 'Infrastructure', label: 'View Instances', desc: 'Read compute instances, metrics and status' },
  { id: 'vps_power', category: 'Infrastructure', label: 'Power & Reboot', desc: 'Restart, shutdown and boot nodes' },
  { id: 'vps_reimage', category: 'Infrastructure', label: 'Re-image & Delete', desc: 'Rebuild OS and destroy instances' },
  { id: 'vps_snapshots', category: 'Infrastructure', label: 'Snapshots', desc: 'Create, restore and delete snapshots' },
  { id: 'dns_zones', category: 'Networking', label: 'DNS Zones', desc: 'Create and edit DNS records' },
  { id: 'dns_ptr', category: 'Networking', label: 'Reverse DNS PTR', desc: 'Modify reverse lookups for sending IPs' },
  { id: 'dns_cutover', category: 'Networking', label: 'Traffic Cutover', desc: 'Switch nameservers and IP routing' },
  { id: 'email_admin', category: 'Business Email', label: 'Mailboxes', desc: 'Create inboxes and adjust storage quotas' },
  { id: 'email_routing', category: 'Business Email', label: 'Routing & Aliases', desc: 'Configure forwarders and aliases' },
  { id: 'crm_inspect', category: 'Customers', label: 'Customer View', desc: 'View customer accounts and profiles' },
  { id: 'crm_impersonate', category: 'Customers', label: 'Impersonation', desc: 'Log in as customer into client portal' },
  { id: 'billing_invoices', category: 'Billing', label: 'Invoices', desc: 'Generate manual invoices and void charges' },
  { id: 'billing_refunds', category: 'Billing', label: 'Refunds & Credits', desc: 'Credit customer wallets and issue refunds' },
  { id: 'system_staff', category: 'System', label: 'Staff & Roles', desc: 'Invite staff and edit role permissions' },
  { id: 'system_audit', category: 'System', label: 'Audit Logs', desc: 'View and export audit logs' }
];

export const initialRoles = [
  {
    id: 'role-superadmin',
    name: 'Super Administrator',
    isSystem: true,
    permissions: availablePermissions.map(p => p.id)
  },
  {
    id: 'role-devops',
    name: 'DevOps / SRE',
    isSystem: false,
    permissions: ['vps_read', 'vps_power', 'vps_reimage', 'vps_snapshots', 'dns_zones', 'dns_ptr', 'dns_cutover', 'system_audit']
  },
  {
    id: 'role-support-l2',
    name: 'Support Lead',
    isSystem: false,
    permissions: ['vps_read', 'vps_power', 'dns_zones', 'dns_ptr', 'email_admin', 'email_routing', 'crm_inspect']
  },
  {
    id: 'role-billing-mgr',
    name: 'Billing Manager',
    isSystem: false,
    permissions: ['crm_inspect', 'billing_invoices', 'billing_refunds', 'system_audit']
  },
  {
    id: 'role-auditor',
    name: 'Auditor',
    isSystem: false,
    permissions: ['vps_read', 'crm_inspect', 'system_audit']
  }
];

export const initialStaff = [
  {
    id: 'STF-001',
    name: 'Raphael Vance',
    email: 'raphael@hostlab.internal',
    department: 'Engineering',
    roleId: 'role-superadmin',
    twoFactor: 'FIDO2 Key',
    lastActive: 'Just now',
    joinedDate: 'Jan 10, 2023',
    status: 'active',
    sessionIp: '194.14.88.5'
  },
  {
    id: 'STF-002',
    name: 'Alex Chen',
    email: 'alex.chen@hostlab.internal',
    department: 'Operations',
    roleId: 'role-support-l2',
    twoFactor: 'Authenticator',
    lastActive: '8 mins ago',
    joinedDate: 'Mar 15, 2023',
    status: 'active',
    sessionIp: '194.14.88.19'
  },
  {
    id: 'STF-003',
    name: 'Marcus Brody',
    email: 'marcus.brody@hostlab.internal',
    department: 'DevOps',
    roleId: 'role-devops',
    twoFactor: 'FIDO2 Key',
    lastActive: '24 mins ago',
    joinedDate: 'Jun 20, 2023',
    status: 'active',
    sessionIp: '194.14.88.33'
  },
  {
    id: 'STF-004',
    name: 'Sarah Lindqvist',
    email: 'sarah.l@hostlab.internal',
    department: 'Finance',
    roleId: 'role-billing-mgr',
    twoFactor: 'Authenticator',
    lastActive: '2 hours ago',
    joinedDate: 'Nov 04, 2023',
    status: 'active',
    sessionIp: '194.14.88.45'
  },
  {
    id: 'STF-005',
    name: 'David Okafor',
    email: 'david.o@hostlab.internal',
    department: 'DevOps',
    roleId: 'role-devops',
    twoFactor: 'Authenticator',
    lastActive: '5 hours ago',
    joinedDate: 'Dec 12, 2023',
    status: 'active',
    sessionIp: '194.14.88.77'
  },
  {
    id: 'STF-006',
    name: 'Emily Watson',
    email: 'emily.w@hostlab.internal',
    department: 'Compliance',
    roleId: 'role-auditor',
    twoFactor: 'Authenticator',
    lastActive: 'Yesterday',
    joinedDate: 'Feb 18, 2024',
    status: 'active',
    sessionIp: '194.14.88.92'
  },
  {
    id: 'STF-007',
    name: 'Lucas Thorne',
    email: 'lucas.thorne@hostlab.internal',
    department: 'Support',
    roleId: 'role-support-l2',
    twoFactor: 'Pending',
    lastActive: '3 days ago',
    joinedDate: 'Sep 01, 2024',
    status: 'pending',
    sessionIp: 'Pending'
  },
  {
    id: 'STF-008',
    name: 'Gavin Ross',
    email: 'gavin.ross@hostlab.internal',
    department: 'Consulting',
    roleId: 'role-auditor',
    twoFactor: 'Authenticator',
    lastActive: '12 days ago',
    joinedDate: 'Aug 10, 2024',
    status: 'suspended',
    sessionIp: '54.187.174.12'
  }
];

let staffList = [...initialStaff];
let rolesList = [...initialRoles];
let activeMainTab = 'directory'; // 'directory' | 'rbac'
let currentSearch = '';
let currentRoleFilter = 'all';
let selectedStaffId = null;
let editingRoleId = null;

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderStaffRolesHTML() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Staff & Roles
          </h1>
          <p class="text-xs text-zinc-500 mt-1">
            Manage administrative personnel and configure role permissions.
          </p>
        </div>

        <div class="flex items-center gap-2.5">
          <!-- Segmented View Switcher -->
          <div class="inline-flex p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-xs font-medium">
            <button 
              type="button" 
              id="switch-to-directory-btn"
              class="px-3 py-1.5 rounded-md transition-all ${activeMainTab === 'directory' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
            >
              Staff
            </button>
            <button 
              type="button" 
              id="switch-to-rbac-btn"
              class="px-3 py-1.5 rounded-md transition-all ${activeMainTab === 'rbac' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}"
            >
              Roles & Permissions
            </button>
          </div>

          <button 
            type="button" 
            id="action-primary-btn"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
          >
            <i data-lucide="${activeMainTab === 'directory' ? 'user-plus' : 'shield-plus'}" class="w-4 h-4"></i>
            <span id="action-primary-label">${activeMainTab === 'directory' ? 'Invite Staff' : 'Create Role'}</span>
          </button>
        </div>
      </div>

      <!-- MAIN TAB 1: STAFF DIRECTORY -->
      <div id="section-staff-directory" class="${activeMainTab === 'directory' ? '' : 'hidden'} space-y-4">
        
        <!-- Controls bar -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="staff-search-input"
              value="${currentSearch}"
              placeholder="Search staff..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div class="flex items-center gap-2">
            <select 
              id="staff-role-select" 
              class="text-xs px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Roles</option>
              ${rolesList.map(r => `<option value="${r.id}" ${currentRoleFilter === r.id ? 'selected' : ''}>${r.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Staff Table -->
        <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900/40 overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-4 font-medium">Staff Member</th>
                  <th class="py-3 px-4 font-medium">Department</th>
                  <th class="py-3 px-4 font-medium">Role</th>
                  <th class="py-3 px-4 font-medium">2FA</th>
                  <th class="py-3 px-4 font-medium">Last Active</th>
                  <th class="py-3 px-4 font-medium text-center">Status</th>
                  <th class="py-3 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody id="staff-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                <!-- Rendered via JS -->
              </tbody>
            </table>
          </div>

          <div id="stf-empty-state" class="hidden p-12 text-center">
            <div class="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-3">
              <i data-lucide="users" class="w-6 h-6"></i>
            </div>
            <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">No staff members found</h3>
            <p class="text-xs text-zinc-500">No personnel match your search or filter.</p>
          </div>
        </div>

      </div>

      <!-- MAIN TAB 2: RBAC ROLES SETTING & PERMISSIONS MATRIX -->
      <div id="section-rbac-matrix" class="${activeMainTab === 'rbac' ? '' : 'hidden'} space-y-6">
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Left Column: Role List -->
          <div class="space-y-3">
            <div class="text-xs font-mono uppercase text-zinc-500 font-semibold">
              Roles (${rolesList.length})
            </div>

            <div class="space-y-2" id="roles-cards-list">
              <!-- Rendered via JS -->
            </div>
          </div>

          <!-- Right Column: Interactive Permission Matrix with Toggles -->
          <div class="lg:col-span-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900/40 p-6 space-y-6 shadow-sm" id="role-editor-container">
            <!-- Rendered via JS based on selected role -->
          </div>

        </div>

      </div>

      <!-- Slide-Over Drawer Container -->
      <div id="staff-drawer-container"></div>

      <!-- Invite Staff Modal -->
      <div id="invite-staff-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="user-plus" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold text-zinc-900 dark:text-white text-base">Invite Staff</h3>
            </div>
            <button type="button" id="close-invite-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="invite-staff-form" class="p-6 space-y-4 text-xs">
            
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  id="modal-stf-name" 
                  placeholder="Elena Rostova" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Email</label>
                <input 
                  type="email" 
                  id="modal-stf-email" 
                  placeholder="elena@hostlab.internal" 
                  required
                  class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Department</label>
                <select id="modal-stf-dept" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
                  <option value="Operations">Operations</option>
                  <option value="Engineering">Engineering</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Support">Support</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div>
                <label class="block font-mono uppercase text-zinc-500 mb-1.5">Role</label>
                <select id="modal-stf-role" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
                  ${rolesList.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-invite-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Send Invite
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- Create Role Modal -->
      <div id="create-role-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
          
          <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="shield-plus" class="w-5 h-5 text-zinc-900 dark:text-white"></i>
              <h3 class="font-bold text-zinc-900 dark:text-white text-base">Create Role</h3>
            </div>
            <button type="button" id="close-role-modal-btn" class="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="create-role-form" class="p-6 space-y-4 text-xs">
            <div>
              <label class="block font-mono uppercase text-zinc-500 mb-1.5">Role Name</label>
              <input 
                type="text" 
                id="modal-role-name" 
                placeholder="e.g. Migration Operator" 
                required
                class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                id="cancel-role-btn"
                class="px-4 py-2 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Create Role
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  `;
}

// ==========================================
// 3. TABLE & RBAC MATRIX RENDERERS
// ==========================================

function getRoleById(roleId) {
  return rolesList.find(r => r.id === roleId) || { name: 'Unknown', isSystem: false };
}

function renderTableRows() {
  const tbody = document.getElementById('staff-table-body');
  const emptyState = document.getElementById('stf-empty-state');
  if (!tbody) return;

  const filtered = staffList.filter(item => {
    if (currentRoleFilter !== 'all' && item.roleId !== currentRoleFilter) return false;
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const roleObj = getRoleById(item.roleId);
      const matchName = item.name.toLowerCase().includes(q);
      const matchEmail = item.email.toLowerCase().includes(q);
      const matchDept = item.department.toLowerCase().includes(q);
      const matchRole = roleObj.name.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchDept && !matchRole) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(item => {
    let statusClass = 'text-emerald-500';
    let statusLabel = 'Active';
    if (item.status === 'pending') {
      statusClass = 'text-amber-500';
      statusLabel = 'Pending';
    } else if (item.status === 'suspended') {
      statusClass = 'text-rose-500';
      statusLabel = 'Suspended';
    }

    const roleObj = getRoleById(item.roleId);

    return `
      <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
        <!-- Staff Member -->
        <td class="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-white">
          <div class="flex items-center gap-2">
            <i data-lucide="user-check" class="w-3.5 h-3.5 text-zinc-400 shrink-0"></i>
            <span>${item.name}</span>
          </div>
          <div class="text-[11px] text-zinc-400 font-mono mt-0.5">${item.email}</div>
        </td>

        <!-- Department -->
        <td class="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">
          ${item.department}
        </td>

        <!-- Role -->
        <td class="py-3 px-4 font-mono text-zinc-900 dark:text-white font-medium">
          ${roleObj.name}
        </td>

        <!-- 2FA -->
        <td class="py-3 px-4 font-mono text-emerald-500">
          ${item.twoFactor}
        </td>

        <!-- Last Active -->
        <td class="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-300">
          ${item.lastActive}
        </td>

        <!-- Status (plain text with color, NO pill) -->
        <td class="py-3 px-4 text-center font-mono font-medium ${statusClass}">
          ${statusLabel}
        </td>

        <!-- Actions -->
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1">
            <button 
              type="button" 
              data-view-stf="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Inspect"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button 
              type="button" 
              data-toggle-stf="${item.id}"
              class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="${item.status === 'active' ? 'Suspend' : 'Activate'}"
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

function renderRbacRoleCards() {
  const container = document.getElementById('roles-cards-list');
  if (!container) return;

  if (!editingRoleId && rolesList.length > 0) {
    editingRoleId = rolesList[0].id;
  }

  container.innerHTML = rolesList.map(role => {
    const isSelected = role.id === editingRoleId;
    const membersCount = staffList.filter(s => s.roleId === role.id).length;

    return `
      <div 
        data-select-role="${role.id}"
        class="p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${isSelected ? 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800/80 shadow-xs' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700'}"
      >
        <div class="font-medium text-zinc-900 dark:text-white text-xs">${role.name}</div>
        <span class="text-[11px] font-mono text-zinc-500">${membersCount}</span>
      </div>
    `;
  }).join('');

  renderRbacMatrixEditor();
  createIcons({ icons });
}

function renderRbacMatrixEditor() {
  const container = document.getElementById('role-editor-container');
  if (!container) return;

  const role = rolesList.find(r => r.id === editingRoleId);
  if (!role) {
    container.innerHTML = `<div class="p-8 text-center text-zinc-400">Select a role.</div>`;
    return;
  }

  // Group permissions by category
  const categories = Array.from(new Set(availablePermissions.map(p => p.category)));

  container.innerHTML = `
    <!-- Role Header & Edit Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
      <div>
        <h3 class="text-base font-bold text-zinc-900 dark:text-white">${role.name}</h3>
      </div>

      <div class="flex items-center gap-2">
        ${!role.isSystem ? `
          <button 
            type="button" 
            id="grant-all-role-btn" 
            class="px-2.5 py-1.5 text-xs font-mono rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
          >
            Grant All
          </button>
          <button 
            type="button" 
            id="revoke-all-role-btn" 
            class="px-2.5 py-1.5 text-xs font-mono rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-rose-500 cursor-pointer"
          >
            Revoke All
          </button>
        ` : ''}
        <button 
          type="button" 
          id="save-role-permissions-btn" 
          class="px-3.5 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-xs cursor-pointer"
        >
          Save Permissions
        </button>
      </div>
    </div>

    <!-- Category Permission Toggles (NO CHECKBOXES) -->
    <div class="space-y-6">
      ${categories.map(category => {
        const catPerms = availablePermissions.filter(p => p.category === category);
        return `
          <div class="space-y-2.5">
            <div class="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
              ${category}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              ${catPerms.map(perm => {
                const isChecked = role.permissions.includes(perm.id);
                return `
                  <div 
                    data-toggle-perm="${perm.id}"
                    class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 flex items-center justify-between gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer select-none"
                  >
                    <div class="min-w-0 pr-2">
                      <div class="font-medium text-xs text-zinc-900 dark:text-white">${perm.label}</div>
                      <div class="text-[11px] text-zinc-400 mt-0.5 truncate">${perm.desc}</div>
                    </div>

                    <!-- Modern Toggle Switch -->
                    <button 
                      type="button" 
                      role="switch"
                      data-perm-switch="${perm.id}"
                      aria-checked="${isChecked ? 'true' : 'false'}"
                      ${role.isSystem ? 'disabled' : ''}
                      class="perm-toggle relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isChecked ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'} ${role.isSystem ? 'opacity-50 cursor-not-allowed' : ''}"
                    >
                      <span class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm ring-0 transition duration-200 ease-in-out ${isChecked ? 'translate-x-4' : 'translate-x-0'}"></span>
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  createIcons({ icons });

  // Bind toggle clicks
  container.querySelectorAll('[data-toggle-perm]').forEach(card => {
    card.onclick = (e) => {
      if (role.isSystem) return;
      const permId = card.getAttribute('data-toggle-perm');
      if (!permId) return;

      const btn = card.querySelector(`[data-perm-switch="${permId}"]`);
      const thumb = btn?.querySelector('span');

      const idx = role.permissions.indexOf(permId);
      if (idx > -1) {
        role.permissions.splice(idx, 1);
        if (btn) {
          btn.setAttribute('aria-checked', 'false');
          btn.classList.remove('bg-zinc-900', 'dark:bg-white');
          btn.classList.add('bg-zinc-200', 'dark:bg-zinc-700');
        }
        if (thumb) {
          thumb.classList.remove('translate-x-4');
          thumb.classList.add('translate-x-0');
        }
      } else {
        role.permissions.push(permId);
        if (btn) {
          btn.setAttribute('aria-checked', 'true');
          btn.classList.remove('bg-zinc-200', 'dark:bg-zinc-700');
          btn.classList.add('bg-zinc-900', 'dark:bg-white');
        }
        if (thumb) {
          thumb.classList.remove('translate-x-0');
          thumb.classList.add('translate-x-4');
        }
      }
    };
  });

  // Bind grant/revoke/save
  const grantAllBtn = document.getElementById('grant-all-role-btn');
  const revokeAllBtn = document.getElementById('revoke-all-role-btn');
  const saveBtn = document.getElementById('save-role-permissions-btn');

  if (grantAllBtn) {
    grantAllBtn.onclick = () => {
      role.permissions = availablePermissions.map(p => p.id);
      renderRbacMatrixEditor();
    };
  }

  if (revokeAllBtn) {
    revokeAllBtn.onclick = () => {
      role.permissions = [];
      renderRbacMatrixEditor();
    };
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      if (role.isSystem) {
        saveBtn.textContent = 'Protected';
        setTimeout(() => { saveBtn.textContent = 'Save Permissions'; }, 1200);
        return;
      }
      saveBtn.textContent = 'Saved';
      setTimeout(() => {
        saveBtn.textContent = 'Save Permissions';
      }, 1200);
    };
  }
}

// ==========================================
// 4. SLIDE-OVER DRAWER (STAFF PROFILE)
// ==========================================

function renderStaffDrawer(staffId) {
  const container = document.getElementById('staff-drawer-container');
  if (!container) return;

  const item = staffList.find(s => s.id === staffId);
  if (!item) {
    container.innerHTML = '';
    return;
  }

  let statusClass = 'text-emerald-500';
  let statusLabel = 'Active';
  if (item.status === 'pending') {
    statusClass = 'text-amber-500';
    statusLabel = 'Pending';
  } else if (item.status === 'suspended') {
    statusClass = 'text-rose-500';
    statusLabel = 'Suspended';
  }

  const roleObj = getRoleById(item.roleId);

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div class="w-full max-w-lg h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden">
        
        <!-- Header -->
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-1">
              <span>Staff Member</span>
              <span>/</span>
              <span class="${statusClass} font-semibold">${statusLabel}</span>
            </div>
            <h2 class="text-xl font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2">
              <i data-lucide="user-check" class="w-5 h-5 text-zinc-400"></i>
              <span>${item.name}</span>
            </h2>
            <div class="text-xs text-zinc-400 mt-0.5 font-mono">${item.email}</div>
          </div>
          <button 
            type="button" 
            id="close-stf-drawer-btn" 
            class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700 dark:text-zinc-300">
          
          <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">ROLE</div>
              <div class="text-base font-bold text-zinc-900 dark:text-white font-mono mt-0.5">${roleObj.name}</div>
            </div>
            <div>
              <div class="text-[11px] font-mono uppercase text-zinc-500">DEPARTMENT</div>
              <div class="text-base font-bold text-zinc-900 dark:text-white mt-0.5">${item.department}</div>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-xs font-mono uppercase text-zinc-500">Reassign Role</label>
            <select id="drawer-stf-role-select" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono text-xs focus:outline-none">
              ${rolesList.map(r => `<option value="${r.id}" ${item.roleId === r.id ? 'selected' : ''}>${r.name}</option>`).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
              <div class="text-zinc-500 text-[11px] font-mono">2FA</div>
              <div class="font-medium text-emerald-500 mt-1">${item.twoFactor}</div>
            </div>
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
              <div class="text-zinc-500 text-[11px] font-mono">LAST ACTIVE</div>
              <div class="font-medium text-zinc-900 dark:text-white mt-1 font-mono">${item.lastActive}</div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
          <button 
            type="button" 
            id="drawer-toggle-suspend-stf-btn"
            class="px-3 py-2 text-xs font-medium rounded-md text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            ${item.status === 'active' ? 'Suspend' : 'Activate'}
          </button>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="drawer-apply-role-change-btn"
              class="px-3.5 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Update
            </button>
            <button 
              type="button" 
              id="drawer-stf-done-btn"
              class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  `;

  createIcons({ icons });

  const closeBtn = document.getElementById('close-stf-drawer-btn');
  const doneBtn = document.getElementById('drawer-stf-done-btn');
  const suspendBtn = document.getElementById('drawer-toggle-suspend-stf-btn');
  const applyRoleBtn = document.getElementById('drawer-apply-role-change-btn');
  const roleSelect = document.getElementById('drawer-stf-role-select');

  const closeDrawer = () => {
    container.innerHTML = '';
    selectedStaffId = null;
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
      renderStaffDrawer(item.id);
      renderTableRows();
    };
  }

  if (applyRoleBtn && roleSelect) {
    applyRoleBtn.onclick = () => {
      item.roleId = roleSelect.value;
      renderStaffDrawer(item.id);
      renderTableRows();
      renderRbacRoleCards();
    };
  }
}

// ==========================================
// 5. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupStaffRolesEvents(onNavigate) {
  createIcons({ icons });
  renderTableRows();
  renderRbacRoleCards();

  // Tab View Switcher (Directory vs RBAC Matrix)
  const dirBtn = document.getElementById('switch-to-directory-btn');
  const rbacBtn = document.getElementById('switch-to-rbac-btn');
  const dirSection = document.getElementById('section-staff-directory');
  const rbacSection = document.getElementById('section-rbac-matrix');
  const actionLabel = document.getElementById('action-primary-label');
  const actionBtn = document.getElementById('action-primary-btn');

  if (dirBtn && rbacBtn) {
    dirBtn.onclick = () => {
      activeMainTab = 'directory';
      dirBtn.className = 'px-3 py-1.5 rounded-md transition-all bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold';
      rbacBtn.className = 'px-3 py-1.5 rounded-md transition-all text-zinc-500 hover:text-zinc-900 dark:hover:text-white';
      if (dirSection) dirSection.classList.remove('hidden');
      if (rbacSection) rbacSection.classList.add('hidden');
      if (actionLabel) actionLabel.textContent = 'Invite Staff';
      createIcons({ icons });
    };

    rbacBtn.onclick = () => {
      activeMainTab = 'rbac';
      rbacBtn.className = 'px-3 py-1.5 rounded-md transition-all bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold';
      dirBtn.className = 'px-3 py-1.5 rounded-md transition-all text-zinc-500 hover:text-zinc-900 dark:hover:text-white';
      if (dirSection) dirSection.classList.add('hidden');
      if (rbacSection) rbacSection.classList.remove('hidden');
      if (actionLabel) actionLabel.textContent = 'Create Role';
      renderRbacRoleCards();
      createIcons({ icons });
    };
  }

  // Primary action button routing (Invite Staff or Create Role)
  if (actionBtn) {
    actionBtn.onclick = () => {
      if (activeMainTab === 'directory') {
        const modal = document.getElementById('invite-staff-modal');
        if (modal) modal.classList.remove('hidden');
      } else {
        const modal = document.getElementById('create-role-modal');
        if (modal) modal.classList.remove('hidden');
      }
    };
  }

  // Role card selection in RBAC view
  const roleCardsList = document.getElementById('roles-cards-list');
  if (roleCardsList) {
    roleCardsList.onclick = (e) => {
      const card = e.target.closest('[data-select-role]');
      if (card) {
        editingRoleId = card.getAttribute('data-select-role');
        renderRbacRoleCards();
      }
    };
  }

  // Search input
  const searchInput = document.getElementById('staff-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value.trim();
      renderTableRows();
    };
  }

  // Role filter select in Directory
  const roleSelect = document.getElementById('staff-role-select');
  if (roleSelect) {
    roleSelect.onchange = (e) => {
      currentRoleFilter = e.target.value;
      renderTableRows();
    };
  }

  // Table row actions (delegated)
  const tbody = document.getElementById('staff-table-body');
  if (tbody) {
    tbody.onclick = (e) => {
      const viewBtn = e.target.closest('[data-view-stf]');
      const toggleBtn = e.target.closest('[data-toggle-stf]');

      if (viewBtn) {
        const id = viewBtn.getAttribute('data-view-stf');
        selectedStaffId = id;
        renderStaffDrawer(id);
      } else if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-toggle-stf');
        const item = staffList.find(s => s.id === id);
        if (item) {
          item.status = item.status === 'active' ? 'suspended' : 'active';
          renderTableRows();
        }
      }
    };
  }

  // Invite Modal Handlers
  const inviteModal = document.getElementById('invite-staff-modal');
  const closeInviteBtn = document.getElementById('close-invite-modal-btn');
  const cancelInviteBtn = document.getElementById('cancel-invite-btn');
  const inviteForm = document.getElementById('invite-staff-form');

  const closeInvite = () => {
    if (inviteModal) inviteModal.classList.add('hidden');
    if (inviteForm) inviteForm.reset();
  };

  if (closeInviteBtn) closeInviteBtn.onclick = closeInvite;
  if (cancelInviteBtn) cancelInviteBtn.onclick = closeInvite;

  if (inviteForm) {
    inviteForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-stf-name')?.value.trim();
      const email = document.getElementById('modal-stf-email')?.value.trim();
      const dept = document.getElementById('modal-stf-dept')?.value || 'Operations';
      const roleId = document.getElementById('modal-stf-role')?.value || 'role-support-l2';

      if (!name || !email) return;

      const newStaff = {
        id: `STF-${Math.floor(100 + Math.random() * 900)}`,
        name,
        email,
        department: dept,
        roleId,
        twoFactor: 'Enforced',
        lastActive: 'Never',
        joinedDate: 'Today',
        status: 'active',
        sessionIp: 'Pending'
      };

      staffList.unshift(newStaff);
      closeInvite();
      renderTableRows();
      renderRbacRoleCards();
    };
  }

  // Create Role Modal Handlers
  const roleModal = document.getElementById('create-role-modal');
  const closeRoleBtn = document.getElementById('close-role-modal-btn');
  const cancelRoleBtn = document.getElementById('cancel-role-btn');
  const roleForm = document.getElementById('create-role-form');

  const closeRole = () => {
    if (roleModal) roleModal.classList.add('hidden');
    if (roleForm) roleForm.reset();
  };

  if (closeRoleBtn) closeRoleBtn.onclick = closeRole;
  if (cancelRoleBtn) cancelRoleBtn.onclick = closeRole;

  if (roleForm) {
    roleForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-role-name')?.value.trim();

      if (!name) return;

      const newRole = {
        id: `role-${Date.now()}`,
        name,
        isSystem: false,
        permissions: ['vps_read', 'crm_inspect']
      };

      rolesList.push(newRole);
      editingRoleId = newRole.id;
      closeRole();
      renderRbacRoleCards();
    };
  }
}

export function cleanupStaffRoles() {
  currentSearch = '';
  currentRoleFilter = 'all';
  selectedStaffId = null;
}
