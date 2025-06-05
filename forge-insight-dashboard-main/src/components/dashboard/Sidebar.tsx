
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ChartBar, Calendar, BarChart, 
  Users, Settings, ChevronLeft, ChevronRight,
  LogOut
} from 'lucide-react';
import Logo from '../layout/Logo';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard'
    },
    {
      title: 'Reports',
      icon: <ChartBar size={20} />,
      path: '/dashboard/reports'
    },
    {
      title: 'Bookings',
      icon: <Calendar size={20} />,
      path: '/dashboard/bookings'
    },
    {
      title: 'Financial',
      icon: <BarChart size={20} />,
      path: '/dashboard/financial'
    },
    {
      title: 'Guest Segments',
      icon: <Users size={20} />,
      path: '/dashboard/guests'
    },
    {
      title: 'Settings',
      icon: <Settings size={20} />,
      path: '/dashboard/settings'
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside 
      className={`bg-primary text-white h-screen fixed top-0 left-0 z-30 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className={`p-4 ${collapsed ? 'justify-center' : ''} flex`}>
        {collapsed ? (
          <BarChart className="h-8 w-8 text-secondary" />
        ) : (
          <Logo variant="white" />
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-6 px-2">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg ${
                    isActive(item.path) 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-300 hover:bg-white/5'
                  } transition duration-150`}
                >
                  <span className="text-secondary">{item.icon}</span>
                  {!collapsed && (
                    <span className="ml-3">{item.title}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-gray-300 hover:bg-white/5 transition duration-150"
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <div className="flex items-center justify-between w-full">
              <span>Collapse Sidebar</span>
              <ChevronLeft size={20} />
            </div>
          )}
        </button>

        <NavLink
          to="/logout"
          className="mt-2 w-full flex items-center justify-center p-2 rounded-lg text-gray-300 hover:bg-white/5 transition duration-150"
        >
          {collapsed ? (
            <LogOut size={20} />
          ) : (
            <div className="flex items-center justify-between w-full">
              <span>Logout</span>
              <LogOut size={20} />
            </div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
