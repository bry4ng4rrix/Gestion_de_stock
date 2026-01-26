import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, ShoppingCart, User, Menu, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type NavItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

const navItems: NavItem[] = [
  {
    title: 'Accueil',
    icon: <Home className="h-5 w-5" />,
    href: '/',
  },
  {
    title: 'Boutique',
    icon: <Package className="h-5 w-5" />,
    href: '/boutique',
  },
  {
    title: 'Panier',
    icon: <ShoppingCart className="h-5 w-5" />,
    href: '/panier',
  },
  {
    title: 'Mon Compte',
    icon: <User className="h-5 w-5" />,
    href: '/compte',
  },
];

export default function ClientLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col ">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Package className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">PME</span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                'flex items-center gap-2',
                isActive(item.href) && 'bg-slate-950 text-slate-50'
              )}
            >
              <Link to={item.href}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  className={cn(
                    'justify-start flex items-center gap-2',
                    isActive(item.href) && 'bg-accent text-accent-foreground'
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Link to={item.href}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

     
    </div>
  );
}