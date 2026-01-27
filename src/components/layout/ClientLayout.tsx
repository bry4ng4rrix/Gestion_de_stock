import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, ShoppingCart, User, Menu, Package , Users , ClipboardClock } from 'lucide-react';
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
    title: 'Historique',
    icon: <ClipboardClock className="h-5 w-5" />,
    href: '/historique',
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
    <div className="flex min-h-screen flex-col bg-lime-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-blue-50/50 backdrop-blur supports-[backdrop-filter]:bg-background/2">
      <div className=" mx-auto flex h-16 items-center justify-between px-4">
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
                'flex items-center gap-2 hover:border-b hover:border-sky-500 hover:bg-transparent',
                isActive(item.href) && 'bg-teal-500 hover:bg-teal-500 hover:text-slate-50 text-slate-50 hover:shadow-lg'
              )}
            >
              <Link to={item.href}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </Button>
          ))}
          <Button 
          variant="default"
          className="ml-auto bg-lime-500 text-lime-50  hover:bg-transparent hover:shadow-lg 
                   hover:text-slate-950 hover:border hover:border-lime-500 rounded-lg"> <Users />Login</Button>
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
      <main className="flex-1 ">
        <Outlet />
      </main>

     
    </div>
  );
}