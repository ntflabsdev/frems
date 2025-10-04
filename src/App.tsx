import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DiscoverPage from "./pages/DiscoverPage";
import CreatorWorldPage from "./pages/CreatorWorldPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import BrandingPage from "./pages/dashboard/BrandingPage";
import ContentPage from "./pages/dashboard/ContentPage";
import MonetizationPage from "./pages/dashboard/MonetizationPage";
import CommunityPage from "./pages/dashboard/CommunityPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminCreatorsPage from "./pages/admin/AdminCreatorsPage";
import AdminPaymentsPage from "./pages/admin/AdminPaymentsPage";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import UserSubscriptionsPage from "./pages/user/UserSubscriptionsPage";
import UserPurchasesPage from "./pages/user/UserPurchasesPage";
import UserProfilePage from "./pages/user/UserProfilePage";

const queryClient = new QueryClient();

function DashboardLayout({ type }: { type: 'creator' | 'admin' | 'user' }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar type={type} />
        <SidebarInset className="flex-1">
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/creator/:id" element={<CreatorWorldPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardLayout type="creator" />}>
            <Route index element={<DashboardPage />} />
            <Route path="branding" element={<BrandingPage />} />
            <Route path="content" element={<ContentPage />} />
            {/* <Route path="monetization" element={<MonetizationPage />} /> */}
            {/* <Route path="community" element={<CommunityPage />} /> */}
          </Route>
          <Route path="/admin" element={<DashboardLayout type="admin" />}>
            <Route index element={<AdminDashboardPage />} />
            {/* <Route path="creators" element={<AdminCreatorsPage />} /> */}
            {/* <Route path="payments" element={<AdminPaymentsPage />} /> */}
          </Route>
          <Route path="/user" element={<DashboardLayout type="user" />}>
            <Route path="dashboard" element={<UserDashboardPage />} />
            <Route path="subscriptions" element={<UserSubscriptionsPage />} />
            <Route path="purchases" element={<UserPurchasesPage />} />
            <Route path="profile" element={<UserProfilePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
