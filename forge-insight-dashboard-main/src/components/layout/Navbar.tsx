
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.faq'), path: '/faq' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const MobileNav = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden text-gray-700">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] md:hidden">
        <nav className="flex flex-col space-y-4 mt-8">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => 
                isActive 
                  ? "text-secondary font-medium py-2" 
                  : "text-gray-700 hover:text-secondary transition duration-150 py-2"
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-gray-200">
            <NavLink to="/login" className="btn-secondary text-center" onClick={() => setOpen(false)}>
              {t('nav.login')}
            </NavLink>
            <NavLink to="/register" className="btn-primary text-center" onClick={() => setOpen(false)}>
              {t('nav.register')}
            </NavLink>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <LanguageSelector />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path}
                  className={({ isActive }) => 
                    isActive 
                      ? "text-secondary font-medium" 
                      : "text-gray-700 hover:text-secondary transition duration-150"
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            
            <div className="flex space-x-3 items-center">
              <LanguageSelector />
              <NavLink to="/login" className="btn-secondary">
                {t('nav.login')}
              </NavLink>
              <NavLink to="/register" className="btn-primary">
                {t('nav.register')}
              </NavLink>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
