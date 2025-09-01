'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, History } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  {
    href: '/app',
    label: 'Dashboard',
    icon: <LayoutDashboard />,
  },
  {
    href: '/app/summaries',
    label: 'History',
    icon: <History />,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            as={Link}
            href={item.href}
            isActive={pathname === item.href}
            tooltip={{ children: item.label }}
          >
            {item.icon}
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
