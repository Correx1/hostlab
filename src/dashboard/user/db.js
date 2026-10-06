/**
 * Hostlab Customer Dashboard Central Database (db.js)
 * Single source of truth for the logged-in customer's profile, active resources, usage, and metrics.
 */

export const customerUser = {
  id: 'usr_849201',
  name: 'Alex Thorne',
  email: 'alex@thorneventures.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  company: 'Thorne Ventures Ltd',
  tier: 'Developer Pro',
  memberSince: 'March 2025',
  balance: '$142.50',
  monthlySpend: '$68.00',
  nextBillingDate: 'Oct 14, 2026',
  twoFactorEnabled: true,
  phone: '+1 (555) 389-4019',
  address: '84 King Street West, Suite 400',
  city: 'Toronto',
  country: 'Canada',
  postalCode: 'M5H 1J9',
  timezone: 'America/Toronto (UTC-4)',
  currency: 'USD ($)',
  defaultPaymentMethod: {
    brand: 'Mastercard',
    last4: '4242',
    exp: '09/28'
  }
};

export const customerOverviewStats = [
  {
    id: 'sites',
    label: 'Active Web Sites',
    value: '3 Sites',
    subtext: 'All SSL secured • 99.98% avg uptime',
    icon: 'globe',
    badge: 'Healthy',
    badgeType: 'success',
    target: { parent: 'hosting' }
  },
  {
    id: 'vps',
    label: 'Cloud VPS Servers',
    value: '2 Running',
    subtext: '6 vCPU • 12 GB RAM combined',
    icon: 'server',
    badge: '100% Online',
    badgeType: 'success',
    target: { parent: 'vps' }
  },
  {
    id: 'domains',
    label: 'Domains Managed',
    value: '4 Domains',
    subtext: 'Anycast DNS • Cloudflare proxy active',
    icon: 'shield-check',
    badge: 'Auto-Renew',
    badgeType: 'neutral',
    target: { parent: 'domains' }
  },
  {
    id: 'email',
    label: 'Business Mailboxes',
    value: '4 Accounts',
    subtext: '9.5 GB used of 100 GB storage',
    icon: 'mail',
    badge: 'DKIM/SPF OK',
    badgeType: 'success',
    target: { parent: 'email' }
  }
];

export const customerResourceUsage = {
  bandwidth: {
    used: 142.8,
    total: 1000,
    unit: 'GB',
    percentage: 14
  },
  storage: {
    used: 48.4,
    total: 160,
    unit: 'GB',
    percentage: 30
  },
  memory: {
    used: 6.2,
    total: 12,
    unit: 'GB',
    percentage: 51
  },
  cpuAvg: 22 // percentage
};

export const customerSites = [
  {
    id: 'site_1',
    domain: 'thorneventures.io',
    type: 'WordPress Managed',
    phpVersion: '8.3',
    status: 'Active',
    ip: '194.38.12.84',
    serverLocation: 'Frankfurt FRA-1',
    ssl: 'Auto-renewing (Let\'s Encrypt)',
    sslValidUntil: 'Dec 18, 2026',
    forceHttps: true,
    bandwidthUsed: '42.1 GB',
    storageUsed: '8.4 GB',
    lastBackup: 'Today at 03:00 AM',
    cacheEnabled: true,
    wafEnabled: true,
    sftp: {
      host: '194.38.12.84',
      port: 22,
      user: 'thorne_wp',
      pass: 'Th0rne#9281_Secure',
      webRoot: '/var/www/thorneventures.io/public_html'
    },
    database: {
      name: 'thorne_wp_db',
      user: 'thorne_wp_usr',
      host: 'localhost:3306',
      phpMyAdminUrl: 'https://pma.hostlab.cloud'
    },
    phpConfig: {
      memoryLimit: '512M',
      maxUpload: '128M',
      maxExecTime: '300s',
      opcache: true
    },
    aliases: [
      { domain: 'www.thorneventures.io', target: 'thorneventures.io', type: '301 Redirect', status: 'Active' },
      { domain: 'thorne.co', target: 'thorneventures.io', type: 'Alias Pointer', status: 'Active' }
    ],
    backups: [
      { id: 'bk_1', name: 'daily_auto_20261005_0300.tar.gz', size: '8.4 GB', date: 'Oct 05, 2026 (03:00 AM)', type: 'Automated' },
      { id: 'bk_2', name: 'daily_auto_20261004_0300.tar.gz', size: '8.3 GB', date: 'Oct 04, 2026 (03:00 AM)', type: 'Automated' },
      { id: 'bk_3', name: 'pre_plugin_update.tar.gz', size: '8.2 GB', date: 'Oct 02, 2026 (11:20 AM)', type: 'Manual' }
    ]
  },
  {
    id: 'site_2',
    domain: 'api.thorne.dev',
    type: 'Node.js Container',
    runtime: 'Node 20 LTS',
    status: 'Active',
    ip: '194.38.12.84',
    serverLocation: 'Frankfurt FRA-1',
    ssl: 'Hostlab Edge SSL',
    sslValidUntil: 'Jan 22, 2027',
    forceHttps: true,
    bandwidthUsed: '89.6 GB',
    storageUsed: '2.1 GB',
    lastDeploy: 'Commit 8f2a1b (2h ago)',
    cacheEnabled: false,
    wafEnabled: true,
    sftp: {
      host: '194.38.12.84',
      port: 22,
      user: 'api_thorne_dev',
      pass: 'DevNode_8829#App',
      webRoot: '/home/deploy/api.thorne.dev'
    },
    database: {
      name: 'thorne_api_pg',
      user: 'thorne_api_usr',
      host: 'localhost:5432',
      phpMyAdminUrl: 'https://pma.hostlab.cloud'
    },
    phpConfig: {
      memoryLimit: '1024M',
      maxUpload: '50M',
      maxExecTime: '60s',
      opcache: false
    },
    aliases: [
      { domain: 'api-v1.thorne.dev', target: 'api.thorne.dev', type: 'CNAME Proxy', status: 'Active' }
    ],
    backups: [
      { id: 'bk_4', name: 'git_tag_v2.4.1.tar.gz', size: '2.1 GB', date: 'Oct 05, 2026 (08:42 AM)', type: 'Deploy Snapshot' },
      { id: 'bk_5', name: 'git_tag_v2.4.0.tar.gz', size: '2.0 GB', date: 'Sep 28, 2026 (14:15 PM)', type: 'Deploy Snapshot' }
    ]
  },
  {
    id: 'site_3',
    domain: 'staging.clientflow.co',
    type: 'PHP / Laravel',
    phpVersion: '8.3',
    status: 'Active',
    ip: '64.227.41.119',
    serverLocation: 'US East IAD-1',
    ssl: 'Auto-renewing (Let\'s Encrypt)',
    sslValidUntil: 'Nov 02, 2026',
    forceHttps: true,
    bandwidthUsed: '11.1 GB',
    storageUsed: '37.9 GB',
    lastBackup: 'Yesterday at 04:00 AM',
    cacheEnabled: true,
    wafEnabled: true,
    sftp: {
      host: '64.227.41.119',
      port: 22,
      user: 'clientflow_stg',
      pass: 'Staging#Flow_2026!',
      webRoot: '/var/www/staging.clientflow.co/public'
    },
    database: {
      name: 'clientflow_stg_db',
      user: 'clientflow_usr',
      host: 'localhost:3306',
      phpMyAdminUrl: 'https://pma.hostlab.cloud'
    },
    phpConfig: {
      memoryLimit: '256M',
      maxUpload: '64M',
      maxExecTime: '120s',
      opcache: true
    },
    aliases: [],
    backups: [
      { id: 'bk_6', name: 'staging_daily_20261004.tar.gz', size: '37.9 GB', date: 'Oct 04, 2026 (04:00 AM)', type: 'Automated' }
    ]
  }
];

export const customerVPS = [
  {
    id: 'vps_1',
    name: 'vps-prod-frankfurt',
    region: 'Frankfurt (eu-central)',
    flag: '🇩🇪',
    os: 'Ubuntu 24.04 LTS',
    ip: '194.38.12.84',
    specs: '4 vCPU · 8 GB RAM · 160 GB NVMe',
    status: 'Running',
    uptime: '49 days, 14 hours',
    cpuUsage: 28,
    ramUsage: 64,
    diskUsage: 35,
    sshUser: 'root',
    sshPort: 22,
    rootPassword: 'Root#Vps_Frankfurt99!',
    snapshots: [
      { id: 'snp_1', name: 'vps-prod-auto-20261005', size: '4.2 GB', date: 'Today at 02:00 AM' },
      { id: 'snp_2', name: 'vps-prod-pre-kernel-upg', size: '4.1 GB', date: 'Oct 01, 2026' }
    ]
  },
  {
    id: 'vps_2',
    name: 'vps-dev-virginia',
    region: 'US East (us-east-1)',
    flag: '🇺🇸',
    os: 'Debian 12 Bookworm',
    ip: '64.227.41.119',
    specs: '2 vCPU · 4 GB RAM · 80 GB NVMe',
    status: 'Running',
    uptime: '18 days, 6 hours',
    cpuUsage: 14,
    ramUsage: 42,
    diskUsage: 24,
    sshUser: 'root',
    sshPort: 22,
    rootPassword: 'Debian#Dev_Virginia42!',
    snapshots: [
      { id: 'snp_3', name: 'dev-virginia-initial-setup', size: '1.8 GB', date: 'Sep 18, 2026' }
    ]
  }
];

export const customerDomains = [
  {
    id: 'dom_1',
    domain: 'thorneventures.io',
    registrar: 'Hostlab Registrar',
    expires: 'Nov 14, 2027',
    dns: 'Cloudflare Proxied',
    autoRenew: true,
    status: 'Active',
    registrarLock: true,
    authCode: 'HL-AUTH-8842TV',
    nameservers: ['ns1.hostlabdns.com', 'ns2.hostlabdns.com'],
    dnsRecords: [
      { id: 'rec_101', type: 'A', name: '@', content: '194.38.12.84', ttl: 'Auto' },
      { id: 'rec_102', type: 'CNAME', name: 'www', content: 'thorneventures.io', ttl: 'Auto' },
      { id: 'rec_103', type: 'MX', name: '@', content: 'mail.hostlab.cloud', ttl: 'Auto', priority: 10 },
      { id: 'rec_104', type: 'TXT', name: '@', content: 'v=spf1 include:_spf.hostlab.cloud ~all', ttl: 'Auto' }
    ]
  },
  {
    id: 'dom_2',
    domain: 'thorne.dev',
    registrar: 'Hostlab Registrar',
    expires: 'Jan 22, 2027',
    dns: 'Cloudflare Proxied',
    autoRenew: true,
    status: 'Active',
    registrarLock: true,
    authCode: 'HL-AUTH-1904TD',
    nameservers: ['ns1.hostlabdns.com', 'ns2.hostlabdns.com'],
    dnsRecords: [
      { id: 'rec_201', type: 'A', name: '@', content: '194.38.12.84', ttl: 'Auto' },
      { id: 'rec_202', type: 'CNAME', name: 'api', content: 'api.thorne.dev', ttl: 'Auto' },
      { id: 'rec_203', type: 'TXT', name: '@', content: 'google-site-verification=abc8912', ttl: 'Auto' }
    ]
  },
  {
    id: 'dom_3',
    domain: 'clientflow.co',
    registrar: 'Hostlab Registrar',
    expires: 'Aug 05, 2026',
    dns: 'Cloudflare Proxied',
    autoRenew: true,
    status: 'Active',
    registrarLock: true,
    authCode: 'HL-AUTH-7731CF',
    nameservers: ['ns1.hostlabdns.com', 'ns2.hostlabdns.com'],
    dnsRecords: [
      { id: 'rec_301', type: 'A', name: '@', content: '64.227.41.119', ttl: 'Auto' },
      { id: 'rec_302', type: 'CNAME', name: 'staging', content: 'staging.clientflow.co', ttl: 'Auto' }
    ]
  },
  {
    id: 'dom_4',
    domain: 'paythorne.ng',
    registrar: 'Hostlab Registrar',
    expires: 'Mar 19, 2027',
    dns: 'Hostlab Anycast DNS',
    autoRenew: true,
    status: 'Active',
    registrarLock: true,
    authCode: 'HL-AUTH-6218PT',
    nameservers: ['ns1.hostlabdns.com', 'ns2.hostlabdns.com'],
    dnsRecords: [
      { id: 'rec_401', type: 'A', name: '@', content: '194.38.12.84', ttl: 'Auto' }
    ]
  }
];

export const customerMailboxes = [
  {
    id: 'mbx_1',
    address: 'alex@thorneventures.io',
    storageUsed: '5.2 GB',
    storageLimit: '25 GB',
    storagePct: 21,
    status: 'Active',
    lastLogin: '12 mins ago',
    password: 'AlexMail#2026_Secure!',
    aliases: ['ceo@thorneventures.io', 'founder@thorneventures.io'],
    autoresponder: { enabled: false, subject: 'Out of Office', message: 'I am currently away with limited access to email.' }
  },
  {
    id: 'mbx_2',
    address: 'hello@thorneventures.io',
    storageUsed: '1.1 GB',
    storageLimit: '25 GB',
    storagePct: 4,
    status: 'Active',
    lastLogin: '1 hour ago',
    password: 'Hello#Thorne2026!',
    aliases: ['contact@thorneventures.io', 'inquiries@thorneventures.io'],
    autoresponder: { enabled: false, subject: '', message: '' }
  },
  {
    id: 'mbx_3',
    address: 'billing@thorneventures.io',
    storageUsed: '840 MB',
    storageLimit: '25 GB',
    storagePct: 3,
    status: 'Active',
    lastLogin: 'Yesterday',
    password: 'Billing#Secure991!',
    aliases: ['finance@thorneventures.io', 'accounts@thorneventures.io'],
    autoresponder: { enabled: false, subject: '', message: '' }
  },
  {
    id: 'mbx_4',
    address: 'support@thorneventures.io',
    storageUsed: '2.4 GB',
    storageLimit: '25 GB',
    storagePct: 10,
    status: 'Active',
    lastLogin: '3 days ago',
    password: 'Support#TeamHost2026!',
    aliases: ['help@thorneventures.io'],
    autoresponder: { enabled: true, subject: 'Support Ticket Received', message: 'Thank you for contacting Thorne Ventures Support. We will get back to you shortly.' }
  }
];

export const customerRecentActivities = [
  {
    id: 'act_1',
    title: 'Git deploy succeeded',
    desc: 'Commit 8f2a1b built and deployed to api.thorne.dev in 42s',
    time: '2 hours ago',
    icon: 'git-commit',
    badge: 'Deploy',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'act_2',
    title: 'Automated Snapshot Created',
    desc: 'Daily snapshot snapshot-vps-prod-20260928 completed (4.2 GB)',
    time: '6 hours ago',
    icon: 'camera',
    badge: 'Backup',
    badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
  },
  {
    id: 'act_3',
    title: 'SSL Certificate Renewed',
    desc: 'Auto-renewed Let\'s Encrypt wildcard certificate for *.thorneventures.io',
    time: '1 day ago',
    icon: 'shield-check',
    badge: 'Security',
    badgeClass: 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-500/20'
  },
  {
    id: 'act_4',
    title: 'Invoice INV-2026-0914 Paid',
    desc: 'Monthly Developer Pro subscription $68.00 billed to Mastercard •••• 4242',
    time: '2 weeks ago',
    icon: 'credit-card',
    badge: 'Billing',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
  }
];

export const customerSubscriptions = [
  {
    id: 'sub_1',
    name: 'Developer Pro Web Hosting',
    price: '$29.00 / mo',
    status: 'Active',
    nextBilling: 'Oct 14, 2026',
    resources: '3 Websites · Unlimited NVMe · Free SSL · CDN'
  },
  {
    id: 'sub_2',
    name: 'Cloud VPS Standard Node',
    price: '$24.00 / mo',
    status: 'Active',
    nextBilling: 'Oct 14, 2026',
    resources: '4 vCPU · 8 GB RAM · 160 GB NVMe'
  },
  {
    id: 'sub_3',
    name: 'Corporate Mailbox Cluster',
    price: '$15.00 / mo',
    status: 'Active',
    nextBilling: 'Oct 14, 2026',
    resources: '4 Business Accounts · 100 GB Storage'
  }
];

export const customerInvoices = [
  {
    id: 'INV-2026-1014',
    date: 'Oct 14, 2026',
    amount: '$68.00',
    status: 'Upcoming',
    method: 'Balance Auto-Debit',
    items: 'Developer Pro + Cloud VPS + Email Cluster',
    lineItems: [
      { name: 'Developer Pro Web Hosting (Monthly)', qty: 1, price: '$29.00' },
      { name: 'Cloud VPS Standard Node (Monthly)', qty: 1, price: '$24.00' },
      { name: 'Corporate Mailbox Cluster (Monthly)', qty: 1, price: '$15.00' }
    ]
  },
  {
    id: 'INV-2026-0914',
    date: 'Sep 14, 2026',
    amount: '$68.00',
    status: 'Paid',
    method: 'Mastercard •••• 4242',
    items: 'Developer Pro + Cloud VPS + Email Cluster',
    lineItems: [
      { name: 'Developer Pro Web Hosting (Monthly)', qty: 1, price: '$29.00' },
      { name: 'Cloud VPS Standard Node (Monthly)', qty: 1, price: '$24.00' },
      { name: 'Corporate Mailbox Cluster (Monthly)', qty: 1, price: '$15.00' }
    ]
  },
  {
    id: 'INV-2026-0814',
    date: 'Aug 14, 2026',
    amount: '$68.00',
    status: 'Paid',
    method: 'Mastercard •••• 4242',
    items: 'Developer Pro + Cloud VPS + Email Cluster',
    lineItems: [
      { name: 'Developer Pro Web Hosting (Monthly)', qty: 1, price: '$29.00' },
      { name: 'Cloud VPS Standard Node (Monthly)', qty: 1, price: '$24.00' },
      { name: 'Corporate Mailbox Cluster (Monthly)', qty: 1, price: '$15.00' }
    ]
  },
  {
    id: 'INV-2026-0714',
    date: 'Jul 14, 2026',
    amount: '$68.00',
    status: 'Paid',
    method: 'Mastercard •••• 4242',
    items: 'Developer Pro + Cloud VPS + Email Cluster',
    lineItems: [
      { name: 'Developer Pro Web Hosting (Monthly)', qty: 1, price: '$29.00' },
      { name: 'Cloud VPS Standard Node (Monthly)', qty: 1, price: '$24.00' },
      { name: 'Corporate Mailbox Cluster (Monthly)', qty: 1, price: '$15.00' }
    ]
  }
];

export const customerTickets = [
  {
    id: 'TICK-4910',
    subject: 'Increase PHP OPcache memory limit on thorneventures.io',
    department: 'Technical Support',
    service: 'thorneventures.io (Web Hosting)',
    status: 'Answered',
    lastUpdate: 'Yesterday at 4:15 PM',
    priority: 'Normal',
    messages: [
      {
        id: 'msg_1',
        sender: 'Alex Thorne',
        role: 'Client',
        time: 'Yesterday at 2:30 PM',
        text: 'Hi support team, our WordPress WooCommerce site has seen high traffic today and we noticed the OPcache memory buffer is reaching 95% threshold. Could you please bump the pool limit to 256M?'
      },
      {
        id: 'msg_2',
        sender: 'Marcus Vance',
        role: 'Senior Systems Engineer',
        time: 'Yesterday at 4:15 PM',
        text: 'Hello Alex, we have increased the OPcache memory consumption limit to 256M and restarted the PHP-FPM process pool for thorneventures.io. The buffer headroom is now at 68% optimal. Please let us know if everything is running smoothly!'
      }
    ]
  },
  {
    id: 'TICK-4822',
    subject: 'DNS reverse lookup (rDNS) PTR record for vps-prod-frankfurt',
    department: 'Technical Support',
    service: 'vps-prod-frankfurt (194.38.12.84)',
    status: 'Resolved',
    lastUpdate: 'Sep 24, 2026',
    priority: 'Normal',
    messages: [
      {
        id: 'msg_3',
        sender: 'Alex Thorne',
        role: 'Client',
        time: 'Sep 24, 2026 at 11:10 AM',
        text: 'Please configure the PTR record for IPv4 194.38.12.84 to point to mail.thorneventures.io for mail deliverability compliance.'
      },
      {
        id: 'msg_4',
        sender: 'Elena Rostova',
        role: 'Network Operations',
        time: 'Sep 24, 2026 at 11:38 AM',
        text: 'The PTR record for 194.38.12.84 has been set to mail.thorneventures.io on our upstream BGP routing tier. Propagation is complete.'
      }
    ]
  },
  {
    id: 'TICK-4705',
    subject: 'Inquiry regarding annual prepayment discount',
    department: 'Billing & Invoicing',
    service: 'Account Billing',
    status: 'Resolved',
    lastUpdate: 'Aug 18, 2026',
    priority: 'Low',
    messages: [
      {
        id: 'msg_5',
        sender: 'Alex Thorne',
        role: 'Client',
        time: 'Aug 18, 2026 at 09:12 AM',
        text: 'Hello, is there a discount available if we switch our Developer Pro tier to annual upfront billing?'
      },
      {
        id: 'msg_6',
        sender: 'Sarah Jenkins',
        role: 'Accounts & Billing',
        time: 'Aug 18, 2026 at 09:45 AM',
        text: 'Hi Alex, yes! Annual prepayment provides 2 months free (17% overall discount). You can switch anytime directly under Billing Settings or we can apply it on your next cycle.'
      }
    ]
  }
];
