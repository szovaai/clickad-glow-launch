import { LayoutDashboard, Users, MessageSquare, Workflow, Mic, BarChart3, BookOpen, Plug, Settings, LogOut, Zap, Star, CalendarCheck, UserX, HeartHandshake } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "Clients", url: "/app/clients", icon: Users, agencyOnly: true },
  { title: "AI Chat", url: "/app/chat", icon: MessageSquare },
  { title: "Automations", url: "/app/automations", icon: Workflow },
  { title: "Voice (Beta)", url: "/app/voice", icon: Mic },
  { title: "Analytics", url: "/app/analytics", icon: BarChart3 },
  { title: "Reviews", url: "/app/reviews", icon: Star },
  { title: "Appointments", url: "/app/appointments", icon: CalendarCheck },
  { title: "Reactivation", url: "/app/reactivation", icon: UserX },
  { title: "Post-Job", url: "/app/post-job", icon: HeartHandshake },
  { title: "Knowledge Base", url: "/app/knowledge-base", icon: BookOpen },
  { title: "Integrations", url: "/app/integrations", icon: Plug },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, isAgencyUser, profile } = useAuth();

  const filteredItems = navItems.filter((item) => !item.agencyOnly || isAgencyUser);

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-lg font-heading font-bold text-sidebar-foreground">ClickAd AI</span>
        </div>
        {profile?.display_name && (
          <p className="text-xs text-muted-foreground mt-1 truncate">{profile.display_name}</p>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      className={isActive ? "bg-primary/15 text-primary font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/10"}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
