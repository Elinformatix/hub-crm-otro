"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, FileText, PieChart } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/customers', icon: Users, label: 'Customers' },
    { href: '/proposals', icon: FileText, label: 'Proposals' },
    { href: '/funnel', icon: PieChart, label: 'Funnel Canvas' },
  ];

  return (
    <nav className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
      <div className="text-2xl font-bold mb-8">CRM System</div>
      <ul>
        {navItems.map((item) => (
          <li key={item.href} className="mb-2">
            <Link href={item.href}>
              <span className={cn(
                "flex items-center p-2 rounded-lg",
                pathname === item.href
                  ? "bg-gray-200 dark:bg-gray-700 text-primary"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              )}>
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;