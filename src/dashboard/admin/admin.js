import '../../style.css';
import { initTheme } from '../../components/Navbar.js';
import { getSidebarHTML, setupSidebarEvents } from './Sidebar.js';
import { getTopbarHTML, setupTopbarEvents } from './Topbar.js';
import { renderModuleContent, setupModuleEvents } from './modules/moduleRouter.js';
import { createIcons, icons } from 'lucide';

// Initialize Theme
initTheme();

const app = document.getElementById('app');

if (app) {
  let navState = {
    activeParent: 'overview',
    activeSub: null,
    openParents: [],
    isMobileOpen: false
  };

  const render = () => {
    app.innerHTML = `
      <div class="flex h-screen w-full bg-[#f4f4f5] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans relative">
        
        <!-- Mobile Backdrop Overlay -->
        <div 
          id="admin-sidebar-backdrop" 
          class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${navState.isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}"
        ></div>

        <!-- Left Sidebar Container (Responsive: Drawer on Mobile, Static on Desktop) -->
        <div 
          id="admin-sidebar-root" 
          class="fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out shrink-0 bg-black shadow-2xl md:shadow-none ${
            navState.isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }"
        >
          ${getSidebarHTML(navState.activeParent, navState.activeSub, navState.openParents)}
        </div>

        <!-- Right Main Shell -->
        <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-[#f4f4f5] dark:bg-[#09090b]">
          
          <!-- Topbar Container (Always Black) -->
          <div id="admin-topbar-root" class="shrink-0 bg-black">
            ${getTopbarHTML()}
          </div>

          <!-- Scrollable Main Content Area -->
          <main id="admin-content-root" class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#f4f4f5] dark:bg-[#09090b] custom-scrollbar">
            ${renderModuleContent(navState.activeParent, navState.activeSub)}
          </main>

        </div>

      </div>
    `;

    setupSidebarEvents(navState, (newState) => {
      navState = newState;
      render();
    });

    setupTopbarEvents(() => {
      navState.isMobileOpen = !navState.isMobileOpen;
      render();
    });

    // Mobile backdrop click to close
    const backdrop = document.getElementById('admin-sidebar-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        navState.isMobileOpen = false;
        render();
      });
    }

    setupModuleEvents(navState.activeParent, navState.activeSub, (newState) => {
      navState = { ...navState, ...newState, isMobileOpen: false };
      render();
    });

    createIcons({ icons });
  };

  render();
}
