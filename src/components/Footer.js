import { createIcons, icons } from 'lucide';

/**
 * Generates a Clean, Spacious Footer HTML (No operational tag, no bloated junk, increased font & spacing)
 */
export function getFooterHTML() {
  return `
    <footer class="relative border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black py-20 lg:py-24 text-zinc-600 dark:text-zinc-400 font-sans">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        
        <!-- Main Footer Row -->
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-12 lg:gap-16 pb-16 border-b border-zinc-200 dark:border-zinc-900">
          
          <!-- Brand Column -->
          <div class="space-y-4 max-w-sm">
            <a href="/" class="flex items-center gap-3.5 text-zinc-900 dark:text-white group">
              <svg class="w-8 h-8 text-zinc-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span class="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white">Hostlab</span>
            </a>
            <p class="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Cloud hosting and managed infrastructure engineered for developers and growing businesses.
            </p>
          </div>

          <!-- Navigation Links matching actual services -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-16">
            <div class="space-y-4">
              <div class="text-sm font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Hosting</div>
              <ul class="space-y-3.5 text-base">
                <li><a href="/hosting.html" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Hosting</a></li>
                <li><a href="/vps-hosting.html" class="hover:text-zinc-900 dark:hover:text-white transition-colors">VPS Hosting</a></li>
              </ul>
            </div>

            <div class="space-y-4">
              <div class="text-sm font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Domains & Email</div>
              <ul class="space-y-3.5 text-base">
                <li><a href="/domains.html" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Domains</a></li>
                <li><a href="/business-email.html" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Business Email</a></li>
              </ul>
            </div>

            <div class="space-y-4">
              <div class="text-sm font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Company</div>
              <ul class="space-y-3.5 text-base">
                <li><a href="#about" class="hover:text-zinc-900 dark:hover:text-white transition-colors">About</a></li>
                <li><a href="/contact.html" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Bottom Bar -->
        <div class="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-zinc-500 font-mono">
          <div>
            &copy; 2026 Hostlab Inc. All rights reserved.
          </div>
          <div class="flex items-center gap-8">
            <a href="#privacy" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</a>
            <a href="#terms" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms</a>
            <a href="/contact.html" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  `;
}

/**
 * Mounts Footer component into specified container
 */
export function mountFooter(containerId = '#footer-root') {
  const container = typeof containerId === 'string' 
    ? document.querySelector(containerId) 
    : containerId;
    
  if (!container) return;
  container.innerHTML = getFooterHTML();
  createIcons({ icons });
}
