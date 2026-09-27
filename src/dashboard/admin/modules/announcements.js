import { createIcons, icons } from 'lucide';

/**
 * Hostlab Announcements Module
 * Post platform-wide notices to customers: maintenance windows, outages,
 * feature launches, and promotional messages.
 */

// ==========================================
// 1. DATA STORES & STATE
// ==========================================

let selectedAnnouncementId = null;
let composeMode = false;

export const initialAnnouncements = [
  {
    id: 'ANN-001',
    title: 'Scheduled Network Maintenance — Frankfurt DC',
    type: 'maintenance', // maintenance | outage | feature | promo
    status: 'published', // draft | published | archived
    audience: 'all', // all | vps | hosting | email | billing
    body: 'We will be performing scheduled network maintenance on our Frankfurt (eu-central-1) edge nodes on October 5th, 2024 from 02:00–04:00 UTC. VPS instances in this region may experience brief connectivity interruptions of up to 5 minutes. All other regions remain unaffected. No action is required from customers.',
    author: 'Raphael C.',
    publishedAt: 'Sep 26, 2024 at 14:00 UTC',
    sentTo: 1842,
    openRate: '68.4%'
  },
  {
    id: 'ANN-002',
    title: 'New: Managed PostgreSQL 16 Add-on Now Available',
    type: 'feature',
    status: 'published',
    audience: 'vps',
    body: 'We are excited to announce that Managed PostgreSQL 16 add-ons are now available for all VPS Dedicated and Bare Metal plans. Includes automated point-in-time recovery (PITR), read replicas, and connection pooling via PgBouncer. Available from your VPS control panel.',
    author: 'Raphael C.',
    publishedAt: 'Sep 20, 2024 at 10:00 UTC',
    sentTo: 1284,
    openRate: '74.1%'
  },
  {
    id: 'ANN-003',
    title: 'Invoice Payment Reminder — October Renewal Cycle',
    type: 'promo',
    status: 'published',
    audience: 'billing',
    body: 'Friendly reminder that October renewal invoices will be automatically collected on October 1st, 2024. Ensure your payment method on file is up to date to avoid service interruption. Customers with expired payment methods will receive a 3-day grace period.',
    author: 'Sarah L.',
    publishedAt: 'Sep 24, 2024 at 09:00 UTC',
    sentTo: 2418,
    openRate: '81.2%'
  },
  {
    id: 'ANN-004',
    title: 'Extended Downtime — Email Deliverability Cluster',
    type: 'outage',
    status: 'archived',
    audience: 'email',
    body: 'Our email deliverability cluster experienced an unplanned outage on September 15th from 03:20–04:45 UTC due to a certificate rotation failure on our DKIM signing service. All affected messages were queued and delivered within 2 hours. We apologize for the disruption.',
    author: 'Alex Chen',
    publishedAt: 'Sep 15, 2024 at 06:00 UTC',
    sentTo: 890,
    openRate: '92.3%'
  },
  {
    id: 'ANN-005',
    title: 'Q4 Infrastructure Migration — DRAFT',
    type: 'maintenance',
    status: 'draft',
    audience: 'all',
    body: 'We are planning a major infrastructure upgrade across all regions in Q4 2024. This message is in draft and has not been sent to customers yet.',
    author: 'Raphael C.',
    publishedAt: null,
    sentTo: 0,
    openRate: null
  }
];

const TYPE_META = {
  maintenance: { label: 'Maintenance', color: 'text-amber-500' },
  outage:      { label: 'Outage',      color: 'text-rose-500' },
  feature:     { label: 'Feature',     color: 'text-emerald-500' },
  promo:       { label: 'Promotion',   color: 'text-blue-500' }
};

const STATUS_META = {
  published: { label: 'Published', color: 'text-emerald-500' },
  draft:     { label: 'Draft',     color: 'text-zinc-400' },
  archived:  { label: 'Archived',  color: 'text-zinc-400' }
};

// ==========================================
// 2. HTML RENDERER
// ==========================================

export function renderAnnouncementsHTML() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            Announcements
          </h1>
          <p class="text-xs text-zinc-500 mt-1">Post platform-wide notices and updates to customers.</p>
        </div>
        <button
          type="button"
          id="compose-announcement-btn"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
        >
          <i data-lucide="megaphone" class="w-4 h-4"></i>
          New Announcement
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="flex items-center gap-2 flex-wrap">
        ${['all', 'published', 'draft', 'archived'].map((f, i) => `
          <button
            type="button"
            data-ann-filter="${f}"
            class="ann-filter-btn px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${i === 0 ? 'border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400'}"
          >${f.charAt(0).toUpperCase() + f.slice(1)}</button>
        `).join('')}
      </div>

      <!-- Announcements List -->
      <div id="ann-list-container" class="space-y-2">
        ${renderAnnouncementRows(initialAnnouncements)}
      </div>

    </div>

    <!-- Announcement Detail / Compose Drawer -->
    <div
      id="ann-drawer"
      class="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col"
    >
      <div class="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <h2 id="ann-drawer-title" class="text-sm font-bold text-zinc-900 dark:text-white">Announcement</h2>
        <button type="button" id="ann-drawer-close" class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <div id="ann-drawer-body" class="flex-1 overflow-y-auto p-6"></div>
      <div id="ann-drawer-footer" class="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0 gap-3"></div>
    </div>
    <div id="ann-overlay" class="fixed inset-0 bg-black/50 z-40 hidden"></div>
  `;
}

// ==========================================
// 3. ROW RENDERER
// ==========================================

function renderAnnouncementRows(announcements) {
  if (!announcements.length) {
    return `<div class="text-sm text-zinc-500 py-10 text-center">No announcements found.</div>`;
  }

  return announcements.map(a => {
    const typeMeta = TYPE_META[a.type] || { label: a.type, color: 'text-zinc-500' };
    const statusMeta = STATUS_META[a.status] || { label: a.status, color: 'text-zinc-400' };

    return `
      <div
        class="ann-row flex items-start gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900/30 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors cursor-pointer"
        data-ann-id="${a.id}"
      >
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 mb-1 flex-wrap">
            <span class="text-xs font-medium text-zinc-900 dark:text-white">${a.title}</span>
          </div>
          <div class="text-[11px] text-zinc-400 line-clamp-2">${a.body}</div>
          <div class="flex items-center gap-4 mt-2">
            <span class="text-[11px] font-mono ${typeMeta.color}">${typeMeta.label}</span>
            <span class="text-[11px] font-mono ${statusMeta.color}">${statusMeta.label}</span>
            ${a.publishedAt ? `<span class="text-[11px] text-zinc-400">${a.publishedAt}</span>` : ''}
            ${a.status === 'published' ? `<span class="text-[11px] text-zinc-400">${a.sentTo.toLocaleString()} recipients · ${a.openRate} open rate</span>` : ''}
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          ${a.status === 'draft' ? `
            <button type="button" data-publish-ann="${a.id}" class="ann-publish-btn px-2.5 py-1 text-[11px] font-mono rounded border border-emerald-500 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 cursor-pointer">Publish</button>
          ` : ''}
          <button type="button" data-view-ann="${a.id}" class="ann-view-btn px-2.5 py-1 text-[11px] font-mono rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 cursor-pointer">View</button>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// 4. DRAWER RENDERERS
// ==========================================

function renderViewDrawerBody(ann) {
  const typeMeta = TYPE_META[ann.type] || { label: ann.type, color: 'text-zinc-500' };
  const statusMeta = STATUS_META[ann.status] || { label: ann.status, color: 'text-zinc-400' };

  return `
    <div class="space-y-5 text-xs">
      <div class="space-y-1">
        <div class="flex items-center gap-3">
          <span class="font-mono ${typeMeta.color}">${typeMeta.label}</span>
          <span class="font-mono ${statusMeta.color}">${statusMeta.label}</span>
        </div>
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white leading-snug">${ann.title}</h3>
        <div class="text-zinc-400">${ann.publishedAt ? `Published ${ann.publishedAt} by ${ann.author}` : `Draft by ${ann.author}`}</div>
      </div>

      <div class="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        ${ann.body}
      </div>

      ${ann.status === 'published' ? `
        <div class="grid grid-cols-3 gap-4">
          <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div class="text-zinc-400 mb-0.5">Audience</div>
            <div class="font-medium text-zinc-900 dark:text-white capitalize">${ann.audience === 'all' ? 'All Customers' : ann.audience}</div>
          </div>
          <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div class="text-zinc-400 mb-0.5">Sent To</div>
            <div class="font-medium text-zinc-900 dark:text-white">${ann.sentTo.toLocaleString()}</div>
          </div>
          <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div class="text-zinc-400 mb-0.5">Open Rate</div>
            <div class="font-medium text-emerald-500">${ann.openRate}</div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function renderViewDrawerFooter(ann) {
  if (ann.status === 'published') {
    return `
      <button type="button" id="ann-archive-btn" data-ann-id="${ann.id}" class="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 font-medium cursor-pointer">Archive</button>
      <div class="flex gap-2">
        <button type="button" id="ann-edit-btn" class="px-3 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">Edit</button>
      </div>
    `;
  }
  if (ann.status === 'draft') {
    return `
      <button type="button" id="ann-delete-btn" class="text-xs text-rose-500 hover:text-rose-600 font-medium cursor-pointer">Delete Draft</button>
      <button type="button" id="ann-send-btn" class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 cursor-pointer">Publish Now</button>
    `;
  }
  return `<div></div><button type="button" id="ann-delete-btn" class="text-xs text-zinc-400 cursor-pointer">Delete</button>`;
}

function renderComposeDrawerBody() {
  return `
    <div class="space-y-4 text-xs">
      <div>
        <label class="block font-mono uppercase text-zinc-500 mb-1.5">Title</label>
        <input type="text" id="compose-title" placeholder="Announcement title..."
          class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none" />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block font-mono uppercase text-zinc-500 mb-1.5">Type</label>
          <select id="compose-type" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
            <option value="maintenance">Maintenance</option>
            <option value="outage">Outage</option>
            <option value="feature">Feature</option>
            <option value="promo">Promotion</option>
          </select>
        </div>
        <div>
          <label class="block font-mono uppercase text-zinc-500 mb-1.5">Audience</label>
          <select id="compose-audience" class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none">
            <option value="all">All Customers</option>
            <option value="vps">VPS Customers</option>
            <option value="hosting">Hosting Customers</option>
            <option value="email">Email Customers</option>
            <option value="billing">Billing / Finance</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block font-mono uppercase text-zinc-500 mb-1.5">Message Body</label>
        <textarea id="compose-body" rows="8" placeholder="Write your announcement..."
          class="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none resize-none leading-relaxed"></textarea>
      </div>

      <div class="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500">
        This message will be sent via the platform notification system and displayed on the customer portal dashboard.
      </div>
    </div>
  `;
}

// ==========================================
// 5. DRAWER HELPERS
// ==========================================

function openViewDrawer(annId) {
  const ann = initialAnnouncements.find(a => a.id === annId);
  if (!ann) return;
  selectedAnnouncementId = annId;
  composeMode = false;

  const title = document.getElementById('ann-drawer-title');
  const body = document.getElementById('ann-drawer-body');
  const footer = document.getElementById('ann-drawer-footer');

  if (title) title.textContent = 'Announcement';
  if (body) body.innerHTML = renderViewDrawerBody(ann);
  if (footer) footer.innerHTML = renderViewDrawerFooter(ann);

  openDrawer();
  bindViewFooterEvents(ann);
}

function openComposeDrawer() {
  composeMode = true;
  selectedAnnouncementId = null;

  const title = document.getElementById('ann-drawer-title');
  const body = document.getElementById('ann-drawer-body');
  const footer = document.getElementById('ann-drawer-footer');

  if (title) title.textContent = 'New Announcement';
  if (body) body.innerHTML = renderComposeDrawerBody();
  if (footer) footer.innerHTML = `
    <button type="button" id="compose-save-draft" class="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium cursor-pointer">Save as Draft</button>
    <button type="button" id="compose-publish" class="px-4 py-2 text-xs font-medium rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 cursor-pointer">Publish Now</button>
  `;

  openDrawer();
  bindComposeFooterEvents();
}

function openDrawer() {
  document.getElementById('ann-drawer')?.classList.replace('translate-x-full', 'translate-x-0');
  document.getElementById('ann-overlay')?.classList.remove('hidden');
  createIcons({ icons });
}

function closeDrawer() {
  document.getElementById('ann-drawer')?.classList.replace('translate-x-0', 'translate-x-full');
  document.getElementById('ann-overlay')?.classList.add('hidden');
  selectedAnnouncementId = null;
  composeMode = false;
}

function bindViewFooterEvents(ann) {
  const archiveBtn = document.getElementById('ann-archive-btn');
  const deleteBtn = document.getElementById('ann-delete-btn');
  const sendBtn = document.getElementById('ann-send-btn');

  if (archiveBtn) {
    archiveBtn.onclick = () => {
      ann.status = 'archived';
      closeDrawer();
      refreshList();
    };
  }
  if (deleteBtn) {
    deleteBtn.onclick = () => closeDrawer();
  }
  if (sendBtn) {
    sendBtn.onclick = () => {
      ann.status = 'published';
      ann.publishedAt = new Date().toUTCString().replace('GMT', 'UTC');
      ann.sentTo = 1842;
      ann.openRate = '—';
      closeDrawer();
      refreshList();
    };
  }
}

function bindComposeFooterEvents() {
  const draftBtn = document.getElementById('compose-save-draft');
  const publishBtn = document.getElementById('compose-publish');

  if (draftBtn) {
    draftBtn.onclick = () => {
      draftBtn.textContent = 'Draft Saved';
      setTimeout(() => { draftBtn.textContent = 'Save as Draft'; }, 1500);
      closeDrawer();
    };
  }
  if (publishBtn) {
    publishBtn.onclick = () => {
      publishBtn.textContent = 'Publishing...';
      setTimeout(() => {
        closeDrawer();
        refreshList();
      }, 800);
    };
  }
}

function refreshList() {
  const container = document.getElementById('ann-list-container');
  if (container) {
    container.innerHTML = renderAnnouncementRows(initialAnnouncements);
    bindListEvents();
  }
}

// ==========================================
// 6. EVENT HANDLERS & LIFECYCLE
// ==========================================

export function setupAnnouncementsEvents(onNavigate) {
  createIcons({ icons });
  bindListEvents();

  // Compose button
  document.getElementById('compose-announcement-btn')?.addEventListener('click', openComposeDrawer);

  // Drawer close
  document.getElementById('ann-drawer-close')?.addEventListener('click', closeDrawer);
  document.getElementById('ann-overlay')?.addEventListener('click', closeDrawer);

  // Filter buttons
  document.querySelectorAll('.ann-filter-btn').forEach(btn => {
    btn.onclick = () => {
      const filter = btn.getAttribute('data-ann-filter');

      document.querySelectorAll('.ann-filter-btn').forEach(b => {
        const isActive = b.getAttribute('data-ann-filter') === filter;
        b.className = `ann-filter-btn px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${isActive ? 'border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400'}`;
      });

      const filtered = filter === 'all'
        ? initialAnnouncements
        : initialAnnouncements.filter(a => a.status === filter);

      const container = document.getElementById('ann-list-container');
      if (container) {
        container.innerHTML = renderAnnouncementRows(filtered);
        bindListEvents();
      }
    };
  });
}

function bindListEvents() {
  document.querySelectorAll('.ann-view-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-view-ann');
      if (id) openViewDrawer(id);
    };
  });

  document.querySelectorAll('.ann-publish-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-publish-ann');
      const ann = initialAnnouncements.find(a => a.id === id);
      if (ann) {
        ann.status = 'published';
        ann.publishedAt = new Date().toUTCString().replace('GMT', 'UTC');
        ann.sentTo = 1842;
        ann.openRate = '—';
        refreshList();
      }
    };
  });

  document.querySelectorAll('.ann-row').forEach(row => {
    row.onclick = () => {
      const id = row.getAttribute('data-ann-id');
      if (id) openViewDrawer(id);
    };
  });
}

export function cleanupAnnouncements() {
  selectedAnnouncementId = null;
  composeMode = false;
}
