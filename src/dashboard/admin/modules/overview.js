import Chart from 'chart.js/auto';
import { createIcons, icons } from 'lucide';

/**
 * Hostlab Overview Module (Consolidated Single-File)
 * Business KPIs, Attention Items, Revenue/MRR Performance, and Activity Stream.
 */

// --- Data Store ---
export const overviewStats = [
  {
    id: 'mrr',
    label: 'Monthly Recurring Revenue',
    value: '$32,180',
    change: '+8.4% this mo',
    trend: 'up',
    subtext: 'ARR: $386.1k • Net +$2,480',
    icon: 'dollar-sign',
    badge: 'Healthy Growth',
    badgeType: 'success',
    targetNav: { parent: 'billing', sub: 'billing-subs' }
  },
  {
    id: 'vps',
    label: 'Managed VPS Instances',
    value: '142',
    change: '+12 this mo',
    trend: 'up',
    subtext: '138 running • 3 provisioning • 1 reboot',
    icon: 'server',
    badge: '99.9% Uptime',
    badgeType: 'success',
    targetNav: { parent: 'instances', sub: 'vps-all' }
  },
  {
    id: 'hosting',
    label: 'Web Sites & Domains',
    value: '1,284 / 642',
    change: '+48 sites',
    trend: 'up',
    subtext: 'Cloudflare Edge Proxy Synced',
    icon: 'globe',
    badge: '100% SSL Active',
    badgeType: 'info',
    targetNav: { parent: 'hosting', sub: 'hosting-sites' }
  },
  {
    id: 'support',
    label: 'Open Support Tickets',
    value: '14',
    change: '3 urgent',
    trend: 'warning',
    subtext: 'Avg response time: 14 mins',
    icon: 'life-buoy',
    badge: 'Needs Attention',
    badgeType: 'warning',
    targetNav: { parent: 'tickets', sub: null }
  }
];

export const attentionItems = [
  {
    id: 'att-tickets',
    category: 'Support Tickets',
    title: '3 Urgent Tickets Awaiting First Response',
    desc: 'Enterprise VPS customer reports DB timeout; 2 migration cutover requests > 30m old.',
    badge: '3 Urgent',
    severity: 'danger',
    icon: 'life-buoy',
    actionText: 'View Queue',
    targetNav: { parent: 'tickets', sub: null }
  },
  {
    id: 'att-invoices',
    category: 'Billing & Invoices',
    title: '4 Overdue Invoices ($1,840 pending)',
    desc: '2 accounts exceeded 7-day grace period; automated service suspension scheduled in 24h.',
    badge: '$1,840 Due',
    severity: 'warning',
    icon: 'receipt',
    actionText: 'Manage Invoices',
    targetNav: { parent: 'billing', sub: 'billing-invoices' }
  },
  {
    id: 'att-payments',
    category: 'Failed Payments',
    title: '2 Subscription Renewals Failed',
    desc: 'Stripe card charge failed for apexcloud.io and devstudio.net. Automatic retries active.',
    badge: '2 Failed',
    severity: 'danger',
    icon: 'alert-triangle',
    actionText: 'Resolve Billing',
    targetNav: { parent: 'billing', sub: 'billing-invoices' }
  },
  {
    id: 'att-domains',
    category: 'Expiring Domains',
    title: '7 Domains Expiring Within 7 Days',
    desc: 'Auto-renewal is disabled or pending registrant confirmation on 7 TLD registrations.',
    badge: '7 Expiring',
    severity: 'warning',
    icon: 'globe',
    actionText: 'Review Domains',
    targetNav: { parent: 'domains', sub: 'domains-registered' }
  },
  {
    id: 'att-ssl',
    category: 'SSL Certificates',
    title: '2 Custom SSL Certs Expiring in 48h',
    desc: 'Third-party DigiCert EV certificates require manual certificate renewal and upload.',
    badge: '48h Left',
    severity: 'warning',
    icon: 'shield-alert',
    actionText: 'Inspect Certs',
    targetNav: { parent: 'hosting', sub: 'hosting-ssl' }
  }
];

export const revenueMetrics = {
  mrrTrend: {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    values: [24800, 26400, 28100, 29650, 30750, 32180],
    unit: '$',
    currentMRR: '$32,180',
    netGrowth: '+$2,480 (+8.4%)',
    arrRunRate: '$386,160',
    churnRate: '0.8%'
  },
  productBreakdown: {
    labels: ['Managed VPS', 'Web Hosting', 'Business Email', 'Domains & DNS'],
    values: [17450, 8980, 3620, 2130],
    percentages: ['54.2%', '27.9%', '11.2%', '6.7%']
  }
};

export const recentActivities = [
  {
    id: 'act-1',
    title: 'New VPS Subscription Activated',
    desc: 'Client Apex Innovations deployed 4 vCPU / 8GB RAM in Frankfurt (+$64/mo)',
    user: 'billing-worker',
    timestamp: '8 mins ago',
    type: 'server',
    status: 'success'
  },
  {
    id: 'act-2',
    title: 'Zero-Downtime Migration Cutover Completed',
    desc: 'fintech-corp.com migration verified & switched to Cloudflare edge',
    user: 'system@hostlab.io',
    timestamp: '24 mins ago',
    type: 'arrow-left-right',
    status: 'success'
  },
  {
    id: 'act-3',
    title: 'Urgent Support Ticket Submitted',
    desc: '#TK-4891: MySQL replication lag alert on Dedicated VPS-03',
    user: 'mark@novacorp.com',
    timestamp: '42 mins ago',
    type: 'life-buoy',
    status: 'warning'
  },
  {
    id: 'act-4',
    title: 'Automatic Let’s Encrypt Wildcard Renewed',
    desc: 'SSL certificate for *.brandlaunch.co successfully refreshed for 90 days',
    user: 'security-bot',
    timestamp: '1 hour ago',
    type: 'shield-check',
    status: 'success'
  },
  {
    id: 'act-5',
    title: 'Business Mailbox Added',
    desc: 'sales@scaleup.agency created ($3/mo add-on with DKIM/SPF alignment)',
    user: 'r.chukwu@hostlab.io',
    timestamp: '2 hours ago',
    type: 'mail',
    status: 'success'
  },
  {
    id: 'act-6',
    title: 'Invoice Payment Received',
    desc: 'Invoice #INV-2024-884 paid via Stripe ($480.00 annual hosting plan)',
    user: 'stripe-webhook',
    timestamp: '3 hours ago',
    type: 'receipt',
    status: 'success'
  }
];

let chartInstance = null;

// --- Components Rendering ---

function getStatsCardsHTML() {
  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${overviewStats.map(stat => {
        let badgeClasses = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
        if (stat.badgeType === 'warning') {
          badgeClasses = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
        } else if (stat.badgeType === 'info') {
          badgeClasses = 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
        }

        return `
          <div 
            class="overview-stat-card p-5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm cursor-pointer group"
            data-target-parent="${stat.targetNav.parent}"
            ${stat.targetNav.sub ? `data-target-sub="${stat.targetNav.sub}"` : ''}
          >
            <div class="flex items-start justify-between">
              <div class="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <i data-lucide="${stat.icon}" class="w-5 h-5"></i>
              </div>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium ${badgeClasses}">
                ${stat.badge}
              </span>
            </div>

            <div class="mt-4">
              <div class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                ${stat.label}
              </div>
              <div class="mt-1 flex items-baseline gap-2">
                <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                  ${stat.value}
                </span>
                <span class="text-xs font-mono font-medium ${stat.trend === 'warning' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}">
                  ${stat.change}
                </span>
              </div>
              <div class="mt-2 text-xs text-zinc-500 dark:text-zinc-500 truncate">
                ${stat.subtext}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function getRevenueChartHTML() {
  return `
    <div class="p-5 sm:p-6 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm h-full flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-3 mb-5">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-semibold text-zinc-900 dark:text-white font-display">
                Revenue & MRR Growth
              </h3>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                ARR $386.1K
              </span>
            </div>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Monthly recurring hosting subscriptions, new signups, and service expansion
            </p>
          </div>
        </div>

        <!-- Quick Financial Summary Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 p-3.5 rounded-md bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/60">
          <div>
            <div class="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Current MRR</div>
            <div class="text-sm font-bold font-mono text-zinc-900 dark:text-white mt-0.5">
              ${revenueMetrics.mrrTrend.currentMRR}
            </div>
          </div>
          <div>
            <div class="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Net Expansion</div>
            <div class="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
              ${revenueMetrics.mrrTrend.netGrowth}
            </div>
          </div>
          <div>
            <div class="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Annualized ARR</div>
            <div class="text-sm font-bold font-mono text-zinc-900 dark:text-white mt-0.5">
              ${revenueMetrics.mrrTrend.arrRunRate}
            </div>
          </div>
          <div>
            <div class="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Logo Churn</div>
            <div class="text-sm font-bold font-mono text-zinc-700 dark:text-zinc-300 mt-0.5 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              ${revenueMetrics.mrrTrend.churnRate}
            </div>
          </div>
        </div>

        <!-- Canvas container for MRR line chart -->
        <div class="relative w-full h-[240px]">
          <canvas id="overview-revenue-chart"></canvas>
        </div>
      </div>

      <!-- Actual Figures Breakdown Footer -->
      <div class="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
        <div class="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Revenue by Service Stream</div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          ${revenueMetrics.productBreakdown.labels.map((label, idx) => `
            <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-between">
              <span class="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate">${label}</span>
              <div class="mt-1 flex items-baseline justify-between gap-1">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-xs">
                  $${revenueMetrics.productBreakdown.values[idx].toLocaleString()}
                </span>
                <span class="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  ${revenueMetrics.productBreakdown.percentages[idx]}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function getAttentionRequiredHTML() {
  return `
    <div class="p-5 sm:p-6 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm h-full flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-1">
          <div class="flex items-center gap-2">
            <h3 class="text-base font-semibold text-zinc-900 dark:text-white font-display">
              Attention Required
            </h3>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              ${attentionItems.length} ACTIONS PENDING
            </span>
          </div>
        </div>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Operational bottlenecks, expiring assets, overdue invoices, and failed renewals
        </p>

        <!-- Vertical List of Action Items -->
        <div class="space-y-2.5">
          ${attentionItems.map(item => {
            const isDanger = item.severity === 'danger';
            const iconBorder = isDanger 
              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20' 
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';

            const badgeClass = isDanger 
              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' 
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400';

            return `
              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex items-center justify-between gap-3 group">
                <div class="flex items-start gap-2.5 min-w-0">
                  <div class="p-1.5 rounded-md ${iconBorder} shrink-0 mt-0.5">
                    <i data-lucide="${item.icon}" class="w-3.5 h-3.5"></i>
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        ${item.title}
                      </span>
                      <span class="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded shrink-0 ${badgeClass}">
                        ${item.badge}
                      </span>
                    </div>
                    <p class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                      ${item.desc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  class="overview-nav-btn shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-mono font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                  data-target-parent="${item.targetNav.parent}"
                  ${item.targetNav.sub ? `data-target-sub="${item.targetNav.sub}"` : ''}
                >
                  <span>${item.actionText}</span>
                  <i data-lucide="chevron-right" class="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 transition-transform"></i>
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function getActivityAndQuickActionsHTML() {
  return `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Left 2 Cols: Real-time Platform Activity -->
      <div class="lg:col-span-2 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-base font-semibold text-zinc-900 dark:text-white font-display">
                Real-Time Activity Stream
              </h3>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Audit events across provisioned instances, DNS, mailboxes, and automated snapshots
              </p>
            </div>
            <button 
              type="button" 
              class="overview-nav-btn text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
              data-target-parent="logs"
            >
              View Full Logs
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <div class="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            ${recentActivities.map(act => `
              <div class="py-3.5 flex items-start gap-3.5 first:pt-0 last:pb-0">
                <div class="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0 mt-0.5">
                  <i data-lucide="${act.type}" class="w-4 h-4"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate">
                      ${act.title}
                    </span>
                    <span class="text-[11px] font-mono text-zinc-400 shrink-0">
                      ${act.timestamp}
                    </span>
                  </div>
                  <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                    ${act.desc}
                  </p>
                  <div class="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mt-1">
                    by ${act.user}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right 1 Col: Quick Action Hub & Migration Queue -->
      <div class="space-y-6">
        
        <!-- Quick Deploy Actions -->
        <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <h3 class="text-base font-semibold text-zinc-900 dark:text-white font-display mb-1">
            Quick Actions
          </h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
            Direct orchestration triggers
          </p>

          <div class="space-y-2">
            <button 
              type="button" 
              class="overview-nav-btn w-full px-3.5 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-all duration-150 flex items-center justify-between group cursor-pointer"
              data-target-parent="instances"
              data-target-sub="vps-all"
            >
              <div class="flex items-center gap-3">
                <i data-lucide="plus" class="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                <span class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Deploy New VPS Droplet</span>
              </div>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform"></i>
            </button>

            <button 
              type="button" 
              class="overview-nav-btn w-full px-3.5 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-all duration-150 flex items-center justify-between group cursor-pointer"
              data-target-parent="hosting"
              data-target-sub="hosting-sites"
            >
              <div class="flex items-center gap-3">
                <i data-lucide="globe" class="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                <span class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Add Web Hosting Site</span>
              </div>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform"></i>
            </button>

            <button 
              type="button" 
              class="overview-nav-btn w-full px-3.5 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-all duration-150 flex items-center justify-between group cursor-pointer"
              data-target-parent="domains"
              data-target-sub="domains-registered"
            >
              <div class="flex items-center gap-3">
                <i data-lucide="at-sign" class="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                <span class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Register / Link Domain</span>
              </div>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform"></i>
            </button>

            <button 
              type="button" 
              class="overview-nav-btn w-full px-3.5 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-all duration-150 flex items-center justify-between group cursor-pointer"
              data-target-parent="email"
              data-target-sub="email-mailboxes"
            >
              <div class="flex items-center gap-3">
                <i data-lucide="mail-plus" class="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                <span class="text-xs font-medium text-zinc-900 dark:text-zinc-200">Create Business Inbox</span>
              </div>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform"></i>
            </button>
          </div>
        </div>

        <!-- In-flight Zero-Downtime Migrations Widget -->
        <div class="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-zinc-900 dark:text-white font-display">
              Active Migrations
            </h4>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              3 IN PROGRESS
            </span>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            Zero-downtime automated file & database synchronization
          </p>

          <div class="space-y-3">
            <div class="p-2.5 rounded-md bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/60">
              <div class="flex items-center justify-between text-xs font-mono">
                <span class="font-semibold text-zinc-900 dark:text-zinc-200 truncate">novapress.org</span>
                <span class="text-emerald-500 font-bold">84%</span>
              </div>
              <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full transition-all duration-300" style="width: 84%"></div>
              </div>
              <div class="text-[10px] font-mono text-zinc-400 mt-1 flex justify-between">
                <span>Copying DB tables (4.2GB/5.0GB)</span>
                <span>cPanel Import</span>
              </div>
            </div>

            <div class="p-2.5 rounded-md bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/60">
              <div class="flex items-center justify-between text-xs font-mono">
                <span class="font-semibold text-zinc-900 dark:text-zinc-200 truncate">saasmatrix.io</span>
                <span class="text-blue-500 font-bold">Cutover Ready</span>
              </div>
              <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div class="bg-blue-500 h-full rounded-full transition-all duration-300" style="width: 100%"></div>
              </div>
              <div class="text-[10px] font-mono text-zinc-400 mt-1 flex justify-between">
                <span>Awaiting admin DNS switch</span>
                <span>Hostlab Edge</span>
              </div>
            </div>
          </div>

          <button 
            type="button" 
            class="overview-nav-btn w-full mt-4 py-2 px-3 text-xs font-medium text-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/70 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors cursor-pointer"
            data-target-parent="migrations"
            data-target-sub="migrations-queue"
          >
            Open Migration Queue
          </button>
        </div>

      </div>

    </div>
  `;
}

// --- Main Module HTML ---

export function renderOverviewHTML() {
  return `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            OVERVIEW
          </div>
          <h1 class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mt-1">
            Hosting Operations & Business Pulse
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Revenue metrics, customer support backlog, and items requiring immediate attention.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="overview-refresh-btn"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-300 transition-colors shadow-sm cursor-pointer"
            title="Refresh Pulse"
          >
            <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <!-- 1. Top KPI Stat Cards -->
      ${getStatsCardsHTML()}

      <!-- 2. Side-by-Side: Revenue & MRR Growth (Col 7) and Attention Required (Col 5) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div class="lg:col-span-7 flex flex-col">
          ${getRevenueChartHTML()}
        </div>
        <div class="lg:col-span-5 flex flex-col">
          ${getAttentionRequiredHTML()}
        </div>
      </div>

      <!-- 3. Real-time Activity Stream & Quick Action Hub -->
      ${getActivityAndQuickActionsHTML()}

    </div>
  `;
}

// --- Chart Initialization & Teardown ---

export function initOverviewChart() {
  const canvas = document.getElementById('overview-revenue-chart');
  if (!canvas) return;

  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  const isDark = document.documentElement.classList.contains('dark');
  const ctx = canvas.getContext('2d');

  const textColor = isDark ? '#a1a1aa' : '#71717a';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

  // Gradient for MRR line chart
  const gradient = ctx.createLinearGradient(0, 0, 0, 240);
  if (isDark) {
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.22)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
  } else {
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: revenueMetrics.mrrTrend.labels,
      datasets: [{
        label: 'Monthly Recurring Revenue',
        data: revenueMetrics.mrrTrend.values,
        borderColor: '#10b981',
        borderWidth: 2.5,
        backgroundColor: gradient,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#10b981',
        pointBorderColor: isDark ? '#09090b' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#18181b' : '#ffffff',
          titleColor: isDark ? '#ffffff' : '#09090b',
          bodyColor: isDark ? '#d4d4d8' : '#27272a',
          borderColor: isDark ? '#27272a' : '#e4e4e7',
          borderWidth: 1,
          padding: 10,
          boxPadding: 4,
          usePointStyle: true,
          callbacks: {
            label: (context) => ` MRR: $${context.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor, drawBorder: false },
          ticks: {
            color: textColor,
            font: { family: 'JetBrains Mono, monospace', size: 11 }
          }
        },
        y: {
          grid: { color: gridColor, drawBorder: false },
          ticks: {
            color: textColor,
            font: { family: 'JetBrains Mono, monospace', size: 11 },
            callback: (val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`
          },
          min: 20000
        }
      }
    }
  });
}

export function destroyOverviewChart() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

// --- Event Handlers & Lifecycle ---

export function setupOverviewEvents(onNavigate) {
  createIcons({ icons });
  initOverviewChart();

  // Navigation delegation
  const navTargets = document.querySelectorAll('[data-target-parent]');
  navTargets.forEach(el => {
    el.addEventListener('click', (e) => {
      const parent = el.getAttribute('data-target-parent');
      const sub = el.getAttribute('data-target-sub') || null;
      if (parent && onNavigate) {
        onNavigate({
          activeParent: parent,
          activeSub: sub,
          openParents: [parent]
        });
      }
    });
  });

  // Manual refresh pulse button
  const refreshBtn = document.getElementById('overview-refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      const icon = refreshBtn.querySelector('i');
      if (icon) icon.classList.add('animate-spin');
      setTimeout(() => {
        if (icon) icon.classList.remove('animate-spin');
        initOverviewChart();
        createIcons({ icons });
      }, 400);
    });
  }
}

export function cleanupOverview() {
  destroyOverviewChart();
}
