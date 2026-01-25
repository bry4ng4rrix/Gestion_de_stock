import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/contexts/SidebarContext';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, Menu , ArrowLeftFromLine } from 'lucide-react';

type NavItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

const navItems: NavItem[] = [
  {
    title: 'Tableau de bord',
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/dashboard',
  },
  {
    title: 'Produits',
    icon: <Package className="h-5 w-5" />,
    href: '/products',
  },
  {
    title: 'Commandes',
    icon: <ShoppingCart className="h-5 w-5" />,
    href: '/orders',
  },
  {
    title: 'Clients',
    icon: <Users className="h-5 w-5" />,
    href: '/customers',
  },
  {
    title: 'Paramètres',
    icon: <Settings className="h-5 w-5" />,
    href: '/settings',
  },
];

export function DashboardLayout() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="flex h-screen bg-stone-950">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex h-full flex-col border-r  bg-white transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b  px-4">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-primary">PME</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            
            {isCollapsed ? <Menu className="h-5 w-5" /> : <ArrowLeftFromLine className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700',
                    'hover:bg-gray-100 hover:text-primary',
                    'transition-colors duration-200',
                    isCollapsed ? 'justify-center' : 'space-x-3'
                  )}
                >
                  <span>{item.icon}</span>
                  {!isCollapsed && <span>{item.title}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {!isCollapsed && (
          <div className="border-t p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">Utilisateur</p>
                <p className="truncate text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300 ease-in-out',
          isCollapsed ? 'ml-20' : 'ml-64'
        )}
      >
       

        <main className="flex-1 overflow-y-auto ">
          <div className='bg-stone-900 h-full '>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
