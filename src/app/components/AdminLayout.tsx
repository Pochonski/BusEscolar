import { Building2, LayoutDashboard, Building, Users, Settings, Bell, LogOut, ChevronDown, BarChart3 } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarFooter } from "./ui/sidebar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export type AdminMenuSection = "dashboard" | "empresas";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: AdminMenuSection;
  onSectionChange: (section: AdminMenuSection) => void;
}

const menuItems: Array<{
  id: AdminMenuSection;
  icon: typeof LayoutDashboard;
  label: string;
}> = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "empresas", icon: Building, label: "Empresas" },
];

const sectionTitles: Record<AdminMenuSection, string> = {
  dashboard: "Dashboard Admin",
  empresas: "Gestión de Empresas",
};

export function AdminLayout({ children, activeSection, onSectionChange }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="p-6 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
                  <BarChart3 className="size-7 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-sidebar-foreground text-lg">BusEscolar</h2>
                  <p className="text-xs text-muted-foreground">Panel de Administración</p>
                </div>
              </div>
            </div>
            <SidebarGroup className="px-3 py-4">
              <SidebarGroupLabel className="px-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Menú Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activeSection === item.id}
                        className="group cursor-pointer"
                        onClick={() => onSectionChange(item.id)}
                      >
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg w-full">
                          <item.icon className="size-5 group-data-[active=true]:text-primary" />
                          <span className="flex-1 group-data-[active=true]:font-semibold">{item.label}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3 px-2">
              <div className="size-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Alejandro Delgado</p>
                <p className="text-xs text-muted-foreground truncate">Super Administrador</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 size-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{sectionTitles[activeSection]}</h1>
                  <p className="text-sm text-muted-foreground">Viernes, 16 de Mayo 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="size-5" />
                  <span className="absolute -top-1 -right-1 size-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <div className="size-9 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">AD</span>
                      </div>
                      <div className="text-left hidden md:block">
                        <p className="text-sm font-medium text-foreground">Alejandro Delgado</p>
                        <p className="text-xs text-muted-foreground">Super Administrador</p>
                      </div>
                      <ChevronDown className="size-4 hidden md:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 size-4" />
                      Configuración
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 size-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <div className="flex-1 p-6 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
