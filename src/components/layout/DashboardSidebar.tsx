import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Palette,
  FileText,
  DollarSign,
  Heart,
  Users,
  CreditCard,
  Settings,
  User,
  Package,
  TrendingUp
} from 'lucide-react';

const creatorMenuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Branding',
    url: '/dashboard/branding',
    icon: Palette,
  },
  {
    title: 'Content',
    url: '/dashboard/content',
    icon: FileText,
  },
  {
    title: 'Monetization',
    url: '/dashboard/monetization',
    icon: DollarSign,
  },
  {
    title: 'Community',
    url: '/dashboard/community',
    icon: Heart,
  },
];

const adminMenuItems = [
  {
    title: 'Admin Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Creators',
    url: '/admin/creators',
    icon: Users,
  },
  {
    title: 'Payments',
    url: '/admin/payments',
    icon: CreditCard,
  },
];

const userMenuItems = [
  {
    title: 'Dashboard',
    url: '/user/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Subscriptions',
    url: '/user/subscriptions',
    icon: Package,
  },
  {
    title: 'Purchases',
    url: '/user/purchases',
    icon: CreditCard,
  },
  {
    title: 'Profile',
    url: '/user/profile',
    icon: User,
  },
];

interface DashboardSidebarProps {
  type: 'creator' | 'admin' | 'user';
}

export function DashboardSidebar({ type }: DashboardSidebarProps) {
  const location = useLocation();
  const { state } = useSidebar();
  
  const menuItems = type === 'creator' ? creatorMenuItems : 
                   type === 'admin' ? adminMenuItems : 
                   userMenuItems;

  const getTitle = () => {
    switch (type) {
      case 'creator': return 'Creator Hub';
      case 'admin': return 'Admin Panel';
      case 'user': return 'My Account';
      default: return 'Dashboard';
    }
  };

  return (
    <Sidebar variant="inset" className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <img 
            src="/Logo V1.png" 
            alt="Frems Logo" 
            className="h-14  w-auto"
          />
          <h2 className={cn(
            "font-semibold text-foreground transition-opacity duration-200",
            state === "collapsed" && "opacity-0"
          )}>
            {getTitle()}
          </h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={state === "collapsed" ? item.title : undefined}
                  >
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span className={cn(
                        "transition-opacity duration-200",
                        state === "collapsed" && "opacity-0 w-0"
                      )}>
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}