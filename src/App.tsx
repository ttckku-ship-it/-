import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppSidebar from "@/components/AppSidebar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Support from "./pages/Support";
import AiInsights from "./pages/AiInsights";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CareerAdvisor from "./pages/CareerAdvisor";
import StudentSupport from "./pages/StudentSupport";
import StudentSidebar from "@/components/StudentSidebar";
import StudentDashboard from "./pages/StudentDashboard";
import StudentCases from "./pages/StudentCases";
import StudentAdvisor from "./pages/StudentAdvisor";
import StudentInsights from "./pages/StudentInsights";
import Assessment from "./pages/Assessment";
import MyBookings from "./pages/MyBookings";
import Register from "./pages/Register";
const queryClient = new QueryClient();

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AppSidebar>{children}</AppSidebar>
    </ProtectedRoute>
  );
}

function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <StudentSidebar>{children}</StudentSidebar>
    </ProtectedRoute>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
            <Route path="/support" element={<ProtectedLayout><Support /></ProtectedLayout>} />
            <Route
  path="/assessment"
  element={
    <ProtectedLayout>
      <Assessment />
    </ProtectedLayout>
  }
/>
            <Route path="/ai-insights" element={<ProtectedLayout><AiInsights /></ProtectedLayout>} />
            <Route path="/settings" element={<ProtectedLayout><SettingsPage /></ProtectedLayout>} />
<Route
  path="/career-advisor"
  element={
    <ProtectedLayout>
      <CareerAdvisor />
    </ProtectedLayout>
  }
/>            <Route path="*" element={<NotFound />} />
            <Route
  path="/student-support"
  element={
    <StudentLayout>
      <StudentSupport />
    </StudentLayout>
  }
/>

<Route
  path="/student-dashboard"
  element={
    <StudentLayout>
      <StudentDashboard />
    </StudentLayout>
  }
/>

<Route
  path="/my-bookings"
  element={
    <ProtectedLayout>
      <MyBookings />
    </ProtectedLayout>
  }
/>

<Route
  path="/student-cases"
  element={
    <StudentLayout>
      <StudentCases />
    </StudentLayout>
  }
/>

<Route
  path="/student-advisor"
  element={
    <StudentLayout>
      <StudentAdvisor />
    </StudentLayout>
  }
/>

<Route
  path="/student-insights"
  element={
    <StudentLayout>
      <StudentInsights />
    </StudentLayout>
  }
/>
<Route path="/register" element={<Register />} />
                       </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
