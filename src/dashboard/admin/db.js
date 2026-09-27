/**
 * Hostlab Dashboard Central Database (db.js)
 * Single source of truth for all mock data, metrics, and state across all dashboard modules.
 */

// ==========================================
// 1. OVERVIEW & METRICS
// ==========================================
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
  }
];

// ==========================================
// 2. WEB HOSTING
// ==========================================
export const hostingStats = {
  totalSites: 1284,
  activeSites: 1240,
  suspendedSites: 32,
  provisioningSites: 12,
  diskUsed: '4.8 TB',
  diskTotal: '12.0 TB',
  diskPercentage: '40%',
  bandwidthUsed: '68.4 TB',
  bandwidthTotal: '200 TB',
  bandwidthPercentage: '34.2%',
  sslCoverage: '99.8%'
};

export const hostingPlans = [
  { id: 'starter', name: 'Starter Cloud', price: '$4.99/mo', disk: '15 GB SSD', bandwidth: '200 GB' },
  { id: 'business', name: 'Business Pro', price: '$12.99/mo', disk: '50 GB NVMe', bandwidth: '1,000 GB' },
  { id: 'agency', name: 'Agency Unlimited', price: '$29.99/mo', disk: '150 GB NVMe', bandwidth: 'Unlimited' }
];

export const serverNodes = [
  { id: 'all', name: 'All Server Nodes' },
  { id: 'fra-node-01', name: 'fra-node-01 (Frankfurt)', ip: '185.190.140.22' },
  { id: 'iad-node-03', name: 'iad-node-03 (Virginia)', ip: '144.126.241.80' },
  { id: 'pdx-node-02', name: 'pdx-node-02 (Oregon)', ip: '198.51.100.45' },
  { id: 'lon-node-01', name: 'lon-node-01 (London)', ip: '178.62.204.11' }
];

export const initialHostingSites = [
  {
    id: 'site-101',
    domain: 'techflow-media.com',
    client: 'Sarah Jenkins',
    email: 'sarah@techflow.io',
    plan: 'Business Pro',
    server: 'fra-node-01',
    serverIp: '185.190.140.22',
    runtime: 'PHP 8.3',
    appType: 'WordPress 6.5',
    diskUsedMB: 14200,
    diskLimitMB: 50000,
    bandwidthGB: 284,
    bandwidthLimitGB: 1000,
    sslStatus: 'Active (Let’s Encrypt)',
    sslExpires: 'in 68 days',
    status: 'active',
    createdAt: '2024-03-12'
  },
  {
    id: 'site-102',
    domain: 'apexstudios.design',
    client: 'David Vance',
    email: 'david@apexstudios.design',
    plan: 'Agency Unlimited',
    server: 'iad-node-03',
    serverIp: '144.126.241.80',
    runtime: 'Node.js 20',
    appType: 'Next.js SSR',
    diskUsedMB: 28600,
    diskLimitMB: 150000,
    bandwidthGB: 840,
    bandwidthLimitGB: 2500,
    sslStatus: 'Active (Cloudflare)',
    sslExpires: 'Auto-renew',
    status: 'active',
    createdAt: '2024-01-20'
  },
  {
    id: 'site-103',
    domain: 'greenleaf-organics.co.uk',
    client: 'Emma Watson',
    email: 'emma@greenleaforganics.co.uk',
    plan: 'Business Pro',
    server: 'lon-node-01',
    serverIp: '178.62.204.11',
    runtime: 'PHP 8.2',
    appType: 'WooCommerce',
    diskUsedMB: 48900,
    diskLimitMB: 50000,
    bandwidthGB: 920,
    bandwidthLimitGB: 1000,
    sslStatus: 'Active (Let’s Encrypt)',
    sslExpires: 'in 14 days',
    status: 'active',
    createdAt: '2023-11-04'
  },
  {
    id: 'site-104',
    domain: 'cryptotrack-api.io',
    client: 'Alex Rivera',
    email: 'alex@cryptotrack.io',
    plan: 'Agency Unlimited',
    server: 'pdx-node-02',
    serverIp: '198.51.100.45',
    runtime: 'Python 3.11',
    appType: 'FastAPI Microservice',
    diskUsedMB: 12400,
    diskLimitMB: 150000,
    bandwidthGB: 1840,
    bandwidthLimitGB: 2500,
    sslStatus: 'Active (ZeroSSL)',
    sslExpires: 'in 42 days',
    status: 'active',
    createdAt: '2024-02-18'
  },
  {
    id: 'site-105',
    domain: 'pulsecreative.de',
    client: 'Hans Gruber',
    email: 'hans@pulsecreative.de',
    plan: 'Starter Cloud',
    server: 'fra-node-01',
    serverIp: '185.190.140.22',
    runtime: 'PHP 8.3',
    appType: 'Custom HTML5',
    diskUsedMB: 2800,
    diskLimitMB: 15000,
    bandwidthGB: 88,
    bandwidthLimitGB: 200,
    sslStatus: 'Expiring Soon',
    sslExpires: 'in 3 days',
    status: 'active',
    createdAt: '2023-12-05'
  }
];

// ==========================================
// 3. APPLICATIONS
// ==========================================
export const appStats = {
  totalApps: 846,
  runningApps: 842,
  wordpressApps: 612,
  nodejsApps: 148,
  laravelApps: 58,
  pythonApps: 28,
  pendingUpdates: 18,
  memoryUsed: '38.4GB',
  memoryTotal: '96.0GB',
  memoryPercentage: '40%'
};

export const initialApplications = [
  {
    id: 'app-201',
    name: 'TechFlow Main WooCommerce',
    type: 'wordpress',
    typeName: 'WordPress',
    version: '6.5.2',
    domain: 'techflow-media.com',
    path: '/',
    runtime: 'PHP 8.3-FPM',
    processInfo: 'PHP-FPM Pool #83',
    memoryUsedMB: 280,
    memoryLimitMB: 1024,
    cpuUsage: '1.2%',
    updateStatus: 'Patch Available (v6.5.3)',
    hasUpdate: true,
    status: 'running',
    autoUpdate: true,
    createdAt: '2024-03-12'
  },
  {
    id: 'app-202',
    name: 'Apex Studios SSR Portal',
    type: 'nodejs',
    typeName: 'Node.js',
    version: '20.11 LTS',
    domain: 'apexstudios.design',
    path: '/',
    runtime: 'Node.js 20.11 (PM2)',
    processInfo: 'PM2 Cluster (Port 3000)',
    memoryUsedMB: 420,
    memoryLimitMB: 2048,
    cpuUsage: '2.4%',
    updateStatus: 'Up to date',
    hasUpdate: false,
    status: 'running',
    autoUpdate: false,
    createdAt: '2024-01-20'
  },
  {
    id: 'app-203',
    name: 'CryptoTrack Webhook Gateway',
    type: 'laravel',
    typeName: 'Laravel',
    version: '10.4',
    domain: 'cryptotrack-api.io',
    path: '/api/v1',
    runtime: 'PHP 8.2 (Swoole)',
    processInfo: 'Worker Daemon (Port 8080)',
    memoryUsedMB: 190,
    memoryLimitMB: 512,
    cpuUsage: '0.6%',
    updateStatus: 'Framework Patch (v10.4.8)',
    hasUpdate: true,
    status: 'stopped',
    autoUpdate: false,
    createdAt: '2024-02-18'
  },
  {
    id: 'app-204',
    name: 'Greenleaf Inventory Sync',
    type: 'python',
    typeName: 'Django',
    version: '5.0',
    domain: 'greenleaf-organics.co.uk',
    path: '/inventory',
    runtime: 'Python 3.11',
    processInfo: 'Gunicorn Worker #04',
    memoryUsedMB: 165,
    memoryLimitMB: 512,
    cpuUsage: '0.4%',
    updateStatus: 'Up to date',
    hasUpdate: false,
    status: 'running',
    autoUpdate: true,
    createdAt: '2023-11-04'
  }
];

// ==========================================
// 4. SSL CERTIFICATES
// ==========================================
export const sslStats = {
  totalCerts: 1284,
  validCerts: 1264,
  expiringSoon: 17,
  failedValidation: 3,
  autoRenewPercentage: '98.7%'
};

export const initialCertificates = [
  {
    id: 'cert-301',
    domain: 'techflow-media.com',
    sans: ['techflow-media.com', 'www.techflow-media.com', 'api.techflow-media.com'],
    issuer: "Let's Encrypt",
    type: 'DV Wildcard',
    keyType: 'ECDSA P-256',
    serial: '04:BA:88:2E:7C:19:90:3A',
    fingerprint: '3F:7A:B2:91:C4:08:92:10:E4:31:8B:22:90:1C:DF:88',
    issuedDate: '2024-03-01',
    expiryDate: '2024-05-30',
    daysLeft: 68,
    autoRenew: true,
    challengeType: 'DNS-01 (Automated)',
    status: 'valid'
  },
  {
    id: 'cert-302',
    domain: 'apexstudios.design',
    sans: ['apexstudios.design', 'cdn.apexstudios.design'],
    issuer: 'Cloudflare Inc',
    type: 'Origin CA',
    keyType: 'RSA 2048',
    serial: '19:42:01:DF:AA:08:71:BC',
    fingerprint: '8A:14:FE:90:22:45:11:09:CB:77:3A:90:AA:12:43:08',
    issuedDate: '2023-11-15',
    expiryDate: '2024-11-15',
    daysLeft: 232,
    autoRenew: true,
    challengeType: 'Origin Managed',
    status: 'valid'
  },
  {
    id: 'cert-303',
    domain: 'greenleaf-organics.co.uk',
    sans: ['greenleaf-organics.co.uk', 'www.greenleaf-organics.co.uk'],
    issuer: "Let's Encrypt",
    type: 'DV Single',
    keyType: 'RSA 2048',
    serial: '08:99:32:AE:55:10:98:C1',
    fingerprint: '11:45:90:AE:32:88:FE:09:44:91:02:CB:AA:87:65:19',
    issuedDate: '2024-01-05',
    expiryDate: '2024-04-05',
    daysLeft: 14,
    autoRenew: true,
    challengeType: 'HTTP-01 (Webroot)',
    status: 'expiring'
  }
];

// ==========================================
// 5. VPS INSTANCES
// ==========================================
export const vpsStats = {
  totalInstances: 486,
  runningInstances: 462,
  stoppedInstances: 18,
  provisioningInstances: 6,
  totalVcpu: '2,140 vCPU',
  totalRam: '8.4 TB',
  avgLoad: '41.8%',
  networkThroughput: '14.2 Gbps'
};

export const vpsPlans = [
  { id: 'cx21', name: 'Cloud VPS Standard 2', vcpu: 2, ramGB: 4, diskGB: 40, transferTB: 20, price: '$7.50/mo' },
  { id: 'cx31', name: 'Cloud VPS Standard 4', vcpu: 4, ramGB: 8, diskGB: 80, transferTB: 20, price: '$14.90/mo' },
  { id: 'cx41', name: 'Cloud VPS Pro 8', vcpu: 8, ramGB: 16, diskGB: 160, transferTB: 30, price: '$29.90/mo' },
  { id: 'cx51', name: 'Cloud VPS Dedicated 16', vcpu: 16, ramGB: 32, diskGB: 320, transferTB: 40, price: '$59.00/mo' }
];

export const regions = [
  { id: 'all', name: 'All Locations' },
  { id: 'fra', name: 'Frankfurt (eu-central-1)' },
  { id: 'iad', name: 'Ashburn / VA (us-east-1)' },
  { id: 'lon', name: 'London (eu-west-2)' },
  { id: 'sin', name: 'Singapore (ap-southeast-1)' }
];

export const initialInstances = [
  {
    id: 'vps-501',
    name: 'prod-api-cluster-01',
    ipv4: '144.126.241.80',
    ipv6: '2a01:4f8:c012:a81::1',
    region: 'fra',
    regionName: 'Frankfurt',
    plan: 'Cloud VPS Pro 8',
    vcpu: 8,
    ramGB: 16,
    diskGB: 160,
    os: 'Ubuntu 22.04 LTS',
    client: 'David Vance',
    clientEmail: 'david@apexstudios.design',
    cpuUsage: '18.4%',
    bandwidthUsedGB: 1420,
    bandwidthLimitTB: 30,
    status: 'running',
    uptime: '48d 14h',
    createdAt: '2024-01-15'
  },
  {
    id: 'vps-502',
    name: 'db-master-postgres',
    ipv4: '185.190.140.22',
    ipv6: '2a01:4f8:c012:b92::2',
    region: 'fra',
    regionName: 'Frankfurt',
    plan: 'Cloud VPS Dedicated 16',
    vcpu: 16,
    ramGB: 32,
    diskGB: 320,
    os: 'Debian 12 Bookworm',
    client: 'Sarah Jenkins',
    clientEmail: 'sarah@techflow.io',
    cpuUsage: '42.1%',
    bandwidthUsedGB: 2840,
    bandwidthLimitTB: 40,
    status: 'running',
    uptime: '112d 06h',
    createdAt: '2023-11-20'
  }
];

// ==========================================
// 6. SNAPSHOTS
// ==========================================
export const snapshotStats = {
  totalSnapshots: 342,
  totalStorageTB: '14.8 TB',
  customImages: 28,
  autoBackups: 264,
  avgRestoreTime: '4m 12s'
};

export const initialSnapshots = [
  {
    id: 'snap-801',
    name: 'prod-api-pre-migration',
    sourceInstance: 'prod-api-cluster-01',
    type: 'Snapshot',
    sizeGB: 42.5,
    os: 'Ubuntu 22.04 LTS',
    region: 'Frankfurt (eu-central-1)',
    createdAt: '2024-03-24 14:32',
    retention: 'Manual',
    status: 'available',
    description: 'Pre-v2.4 API deployment snapshot'
  },
  {
    id: 'snap-802',
    name: 'gold-rocky-k8s-node-v1',
    sourceInstance: 'analytics-k8s-node-03',
    type: 'Custom Image',
    sizeGB: 18.2,
    os: 'Rocky Linux 9',
    region: 'Frankfurt (eu-central-1)',
    createdAt: '2024-03-15 09:10',
    retention: 'Permanent',
    status: 'available',
    description: 'Hardened Kubernetes worker template with containerd & cilium'
  }
];

// ==========================================
// 7. SSH KEYS
// ==========================================
export const sshStats = {
  totalKeys: 42,
  ed25519Keys: 31,
  rsaKeys: 11,
  attachedInstances: 486,
  securityCompliance: '100%'
};

export const initialSshKeys = [
  {
    id: 'ssh-901',
    name: 'devops-lead-ed25519',
    type: 'ED25519',
    fingerprint: 'SHA256:mK9p+vB8x1Z3Lq4Y7wT0rE2uI5oP8sD1fG3hJ5kL7mN',
    publicKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG4Z+9Vn3FkQ1k2L4p5Q6r7S8t9U0v1W2x3Y4z5A6B7C devops@hostlab.cloud',
    comment: 'devops@hostlab.cloud',
    attachedServers: ['prod-api-cluster-01', 'db-master-postgres'],
    createdAt: '2024-01-10',
    lastUsed: '2 hours ago',
    status: 'active'
  },
  {
    id: 'ssh-902',
    name: 'ci-cd-deployer-iad',
    type: 'ED25519',
    fingerprint: 'SHA256:9qW8e7R6t5Y4u3I2o1P0a9S8d7F6g5H4j3K2l1Z0x9C',
    publicKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIK7M+8Xn2GjP0j1K3o4P5q6R7s8T9u0V1w2X3y4Z5a6B github-actions@apexstudios.design',
    comment: 'github-actions@apexstudios.design',
    attachedServers: ['redis-cache-iad', 'edge-vpn-gateway'],
    createdAt: '2024-02-14',
    lastUsed: '18 minutes ago',
    status: 'active'
  }
];

// ==========================================
// 8. DOMAINS & DNS ZONES
// ==========================================
export const domainStats = {
  totalDomains: 1420,
  activeDomains: 1388,
  expiringIn30Days: 24,
  transfersPending: 8,
  whoisPrivacyProtected: '99.4%'
};

export const initialDomains = [
  {
    id: 'dom-101',
    domain: 'techflow-media.com',
    tld: '.com',
    registrar: 'OpenSRS / Tucows',
    client: 'Sarah Jenkins',
    clientEmail: 'sarah@techflow.io',
    registeredDate: '2021-04-12',
    expiryDate: '2025-04-12',
    daysLeft: 198,
    renewalPrice: '$13.99/yr',
    autoRenew: true,
    transferLock: true,
    whoisPrivacy: true,
    dnssec: true,
    nameservers: ['ns1.hostlab.cloud', 'ns2.hostlab.cloud'],
    status: 'active'
  },
  {
    id: 'dom-102',
    domain: 'apexstudios.design',
    tld: '.design',
    registrar: 'Namecheap API',
    client: 'David Vance',
    clientEmail: 'david@apexstudios.design',
    registeredDate: '2023-01-20',
    expiryDate: '2025-01-20',
    daysLeft: 116,
    renewalPrice: '$38.50/yr',
    autoRenew: true,
    transferLock: true,
    whoisPrivacy: true,
    dnssec: false,
    nameservers: ['ns1.cloudflare.com', 'ns2.cloudflare.com'],
    status: 'active'
  }
];

export const dnsStats = {
  totalZones: 1842,
  activeZones: 1826,
  dnssecSigned: 1240,
  monthlyQueries: '84.2M',
  avgPropagationMs: '42ms'
};

export const initialZones = [
  {
    id: 'zone-201',
    domain: 'techflow-media.com',
    type: 'Primary Authoritative',
    provider: 'Hostlab Anycast DNS',
    client: 'Sarah Jenkins',
    clientEmail: 'sarah@techflow.io',
    dnssec: true,
    serial: 2024032401,
    queries: '4.8M',
    status: 'active',
    records: [
      { id: 'rec-1', type: 'A', name: '@', content: '185.190.140.22', ttl: 3600 },
      { id: 'rec-2', type: 'AAAA', name: '@', content: '2a01:4f8:c012:a81::1', ttl: 3600 },
      { id: 'rec-3', type: 'CNAME', name: 'www', content: 'techflow-media.com', ttl: 3600 },
      { id: 'rec-4', type: 'MX', name: '@', content: '10 mail.techflow-media.com', ttl: 3600 },
      { id: 'rec-5', type: 'TXT', name: '@', content: 'v=spf1 include:_spf.hostlab.cloud ~all', ttl: 3600 }
    ]
  }
];

// ==========================================
// 9. EMAIL INFRASTRUCTURE
// ==========================================
export const emailStats = {
  totalDomains: 624,
  activeDomains: 608,
  pendingDns: 12,
  suspended: 4,
  totalMailboxes: 2840,
  storageUsedTB: '18.4 TB',
  storageTotalTB: '50.0 TB',
  storagePercentage: '36.8%',
  spamBlockRate: '99.92%'
};

export const initialEmailDomains = [
  {
    id: 'eml-dom-101',
    domain: 'techflow-media.com',
    plan: 'Pro Mail (50GB)',
    client: 'Sarah Jenkins',
    clientEmail: 'sarah@techflow.io',
    mailboxesCount: 8,
    mailboxesLimit: 20,
    storageUsedGB: 14.2,
    storageLimitGB: 50,
    mxStatus: 'Aligned (mx1.hostlab.email)',
    dkimStatus: 'Signed (2048-bit)',
    spfStatus: 'Pass',
    webmailUrl: 'webmail.techflow-media.com',
    status: 'active'
  }
];

export const mbxStats = {
  totalMailboxes: 2840,
  activeMailboxes: 2816,
  quotaWarnings: 18,
  totalMessages: '14.2M',
  storageUsedTB: '18.4 TB',
  avgSpamScore: '0.04'
};

export const initialMailboxes = [
  {
    id: 'mbx-301',
    email: 'sarah@techflow-media.com',
    domain: 'techflow-media.com',
    displayName: 'Sarah Jenkins',
    storageUsedMB: 4200,
    storageLimitMB: 10000,
    messagesCount: 8420,
    autoResponder: false,
    lastLogin: '12 minutes ago',
    status: 'active'
  }
];

export const aliasStats = {
  totalAliases: 1420,
  activeAliases: 1398,
  domainsCovered: 580,
  totalForwardsToday: '48.2k',
  failedForwards: 12
};

export const initialAliases = [
  {
    id: 'als-401',
    alias: 'press@techflow-media.com',
    domain: 'techflow-media.com',
    targets: ['sarah@techflow-media.com', 'pr-agency@mediaworks.co'],
    forwardsCount: 142,
    status: 'active',
    createdAt: '2024-01-14'
  }
];

export const deliverabilityStats = {
  monitoredDomains: 624,
  avgHealthScore: 98,
  spfPassing: 620,
  dkimPassing: 618,
  dmarcEnforced: 540,
  blacklistedIPs: 0
};

export const initialDeliverabilityDomains = [
  {
    id: 'del-101',
    domain: 'techflow-media.com',
    reputationScore: 99,
    spfStatus: 'pass',
    dkimStatus: 'pass',
    dmarcStatus: 'reject',
    bouncesRate: '0.2%',
    spamRate: '0.01%',
    status: 'excellent'
  }
];

// ==========================================
// 10. MIGRATIONS & CUTOVER
// ==========================================
export const initialMigrations = [
  {
    id: 'mig-801',
    domain: 'apexmedia.co',
    client: 'Apex Media Group',
    sourceProvider: 'cPanel Backup (WHM API)',
    sourceIp: '198.51.100.42',
    targetNode: 'vps-lon-01 (185.193.64.12)',
    currentStep: 'Step 3/5: Syncing MySQL Databases',
    progressPercent: 68,
    dataTransferred: '14.8 GB',
    dataTotal: '21.5 GB',
    speed: '48 MB/s',
    eta: '8 mins remaining',
    status: 'running',
    includeMailboxes: true,
    includeDns: true,
    startedAt: '16 minutes ago',
    logs: [
      '[19:15:02] Connected to source cPanel API v2 at 198.51.100.42:2087 (SSL verified)',
      '[19:22:15] Completed 12.4 GB document root sync without checksum mismatch',
      '[19:26:10] Ingesting apex_db into target MySQL 8.0 instance (68% complete)...'
    ]
  }
];

export const initialCutovers = [
  {
    id: 'cut-901',
    domain: 'devstudio-agency.net',
    client: 'DevStudio Digital',
    registrar: 'Namecheap API',
    oldHost: 'DigitalOcean Droplet',
    oldIp: '104.248.55.9',
    newHost: 'vps-lon-01',
    newIp: '185.193.64.12',
    currentTtl: '300s',
    propagationPercent: 100,
    nodesResolved: '18/18',
    status: 'completed',
    cutoverDate: '1 hour ago',
    sslReady: true,
    dataSynced: true
  }
];

// ==========================================
// 11. BILLING & CRM
// ==========================================
export const initialCustomers = [
  {
    id: 'CUST-1042',
    name: 'Sarah Jenkins',
    company: 'TechFlow Media LLC',
    email: 'sarah@techflow-media.com',
    phone: '+1 (555) 234-8901',
    country: 'United States',
    currency: 'USD',
    taxId: 'US-EIN-9482018',
    activeServicesCount: 4,
    totalSpend: '$2,480.00',
    joinedDate: 'Mar 12, 2024',
    status: 'active'
  },
  {
    id: 'CUST-1043',
    name: 'David Vance',
    company: 'Apex Studios Design Ltd',
    email: 'david@apexstudios.design',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    currency: 'GBP',
    taxId: 'GB-VAT-8910293',
    activeServicesCount: 3,
    totalSpend: '£1,840.00',
    joinedDate: 'Jan 20, 2024',
    status: 'active'
  }
];

export const initialInvoices = [
  {
    id: 'INV-2024-108',
    customer: 'Sarah Jenkins',
    company: 'TechFlow Media LLC',
    email: 'sarah@techflow-media.com',
    issueDate: 'Sep 01, 2024',
    dueDate: 'Sep 15, 2024',
    amount: '$150.00',
    amountRaw: 150.00,
    currency: 'USD',
    gateway: 'Stripe (Visa •••• 4242)',
    status: 'paid',
    subtotal: '$150.00',
    tax: '$0.00'
  }
];

export const initialSubscriptions = [
  {
    id: 'SUB-4081',
    planName: 'Pro Dedicated VPS (8 vCPU / 32GB RAM)',
    category: 'VPS Compute',
    customer: 'Sarah Jenkins',
    company: 'TechFlow Media LLC',
    email: 'sarah@techflow-media.com',
    billingCycle: 'Monthly',
    price: '$96.00',
    priceRaw: 96.00,
    currency: 'USD',
    nextRenewal: 'Oct 01, 2024',
    startDate: 'Mar 12, 2024',
    autoRenew: true,
    status: 'active'
  }
];

export const initialCoupons = [
  {
    id: 'CPN-101',
    code: 'HOSTLAB20',
    campaign: 'Fall Infrastructure Migration Blitz',
    type: 'Percentage Discount',
    value: '20% Off',
    usageCount: 248,
    usageLimit: 500,
    status: 'active'
  }
];

// ==========================================
// 12. TICKETS & ACTIVITY LOGS
// ==========================================
export const initialTickets = [
  {
    id: 'TCK-8921',
    subject: 'Reverse DNS PTR record configuration for outbound mail node',
    customer: 'Sarah Jenkins',
    company: 'TechFlow Media LLC',
    email: 'sarah@techflow-media.com',
    department: 'Technical Ops',
    priority: 'high',
    status: 'open',
    assignedTo: 'Alex Chen (Tier 2)',
    lastUpdated: '6 mins ago',
    createdDate: 'Today at 18:24',
    messages: [
      {
        sender: 'Sarah Jenkins',
        role: 'customer',
        time: 'Today at 18:24',
        text: 'Hello team, we just provisioned vps-lon-01 for our outbound Postfix cluster. Could you please configure the reverse DNS (PTR record) for IP 185.193.64.12 to resolve to mail.techflow-media.com? Thank you!'
      }
    ]
  }
];

export const initialLogs = [
  {
    id: 'EVT-904128',
    action: 'VPS.Instance.Reboot',
    resource: 'vps-lon-01 (185.193.64.12)',
    category: 'infrastructure',
    actor: 'sarah@techflow-media.com',
    actorRole: 'Client Owner',
    ipAddress: '82.165.197.44',
    severity: 'warning',
    status: 'success',
    timeAgo: '2 mins ago',
    timestamp: '2024-09-26T21:37:12Z'
  }
];

// ==========================================
// 13. STAFF, ROLES & SETTINGS
// ==========================================
export const availablePermissions = [
  { id: 'vps_read', category: 'Instances', label: 'View VPS Instances', desc: 'Read-only access to VPS dashboard' },
  { id: 'vps_power', category: 'Instances', label: 'Power Controls', desc: 'Start, stop, reboot and power cycle VMs' },
  { id: 'vps_reimage', category: 'Instances', label: 'Re-image / Reinstall', desc: 'Wipe and install OS distributions' },
  { id: 'vps_snapshots', category: 'Instances', label: 'Snapshots & Backups', desc: 'Create, restore, and delete disk snapshots' },
  { id: 'dns_zones', category: 'Networking', label: 'Manage DNS Records', desc: 'Create, edit, delete zone records' },
  { id: 'dns_ptr', category: 'Networking', label: 'Reverse DNS (PTR)', desc: 'Assign reverse DNS IP delegations' },
  { id: 'dns_cutover', category: 'Networking', label: 'Execute DNS Cutovers', desc: 'Trigger zero-downtime cutover scripts' },
  { id: 'email_admin', category: 'Email', label: 'Manage Mailboxes', desc: 'Provision, suspend, and reset inboxes' },
  { id: 'email_routing', category: 'Email', label: 'Aliases & Forwarding', desc: 'Configure forwarders and route maps' },
  { id: 'crm_inspect', category: 'CRM', label: 'View Customer Data', desc: 'Inspect account details and assigned services' },
  { id: 'billing_invoices', category: 'Billing', label: 'Manage Invoices', desc: 'Create, void, and mark invoices paid' },
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
    status: 'active'
  }
];

export const settingsState = {
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
    rateLimitPerMin: 1200,
    webhookUrl: 'https://ops.hostlab.internal/webhooks/infra',
    corsOrigins: 'https://hostlab.cloud, https://admin.hostlab.cloud',
    apiActive: true
  }
};

// ==========================================
// 14. PLANS & ANNOUNCEMENTS
// ==========================================
export const planCatalog = {
  vps: [
    {
      id: 'vps-starter',
      name: 'Cloud VPS Starter',
      vcpu: 1, ramGB: 2, diskGB: 25, transferTB: 10,
      price: 5.00, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 284,
      description: 'Entry-level KVM instance for dev workloads and staging environments.'
    },
    {
      id: 'vps-standard',
      name: 'Cloud VPS Standard',
      vcpu: 2, ramGB: 4, diskGB: 50, transferTB: 20,
      price: 9.90, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 618,
      description: 'Reliable 2-core instance for small production apps and CMS sites.'
    }
  ],
  hosting: [
    {
      id: 'host-starter',
      name: 'Starter Cloud',
      sites: 1, diskGB: 15, bandwidth: '200 GB', cpanelAccounts: 1,
      price: 4.99, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 412,
      description: 'Ideal for blogs, portfolio sites, and single WordPress instances.'
    }
  ],
  email: [
    {
      id: 'email-single',
      name: 'Business Mailbox',
      mailboxes: 1, storageGB: 10, customDomain: true, antiSpam: true,
      price: 3.00, currency: 'USD', billingCycle: 'Monthly',
      visible: true,
      activeSubscriptions: 1420,
      description: 'Custom domain professional mailbox with generous per-user storage.'
    }
  ],
  domains: [
    {
      id: 'tld-com',
      tld: '.com',
      registrationPrice: 15.00, renewalPrice: 15.00, transferPrice: 15.00,
      currency: 'USD',
      whoisPrivacyIncluded: true,
      visible: true,
      activeCount: 1040
    }
  ]
};

export const initialAnnouncements = [
  {
    id: 'ANN-001',
    title: 'Scheduled Network Maintenance — Frankfurt DC',
    type: 'maintenance',
    status: 'published',
    audience: 'all',
    body: 'We will be performing scheduled network maintenance on our Frankfurt (eu-central-1) edge nodes on October 5th, 2024 from 02:00–04:00 UTC. VPS instances in this region may experience brief connectivity interruptions of up to 5 minutes. All other regions remain unaffected. No action is required from customers.',
    author: 'Raphael C.',
    publishedAt: 'Sep 26, 2024 at 14:00 UTC',
    sentTo: 1842,
    openRate: '68.4%'
  }
];

// ==========================================
// CENTRAL DATABASE OBJECT
// ==========================================
export const db = {
  overviewStats,
  attentionItems,
  revenueMetrics,
  recentActivities,
  hostingStats,
  hostingPlans,
  serverNodes,
  initialHostingSites,
  appStats,
  initialApplications,
  sslStats,
  initialCertificates,
  vpsStats,
  vpsPlans,
  regions,
  initialInstances,
  snapshotStats,
  initialSnapshots,
  sshStats,
  initialSshKeys,
  domainStats,
  initialDomains,
  dnsStats,
  initialZones,
  emailStats,
  initialEmailDomains,
  mbxStats,
  initialMailboxes,
  aliasStats,
  initialAliases,
  deliverabilityStats,
  initialDeliverabilityDomains,
  initialMigrations,
  initialCutovers,
  initialCustomers,
  initialInvoices,
  initialSubscriptions,
  initialCoupons,
  initialTickets,
  initialLogs,
  initialStaff,
  initialRoles,
  availablePermissions,
  settingsState,
  planCatalog,
  initialAnnouncements
};
