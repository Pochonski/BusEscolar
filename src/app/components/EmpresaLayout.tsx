import { Building2, Home, Users, Route, Car, UsersRound, CreditCard, AlertTriangle, Navigation, Bell, Settings, LogOut, ChevronDown } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarFooter } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export type MenuSection =
  | "dashboard"
  | "estudiantes"
  | "rutas"
  | "vehiculos"
  | "personal"
  | "pagos"
  | "eventos"
  | "tracking";

interface EmpresaLayoutProps {
  children: React.ReactNode;
  activeSection: MenuSection;
  onSectionChange: (section: MenuSection) => void;
}

const menuItems: Array<{
  id: MenuSection;
  icon: typeof Home;
  label: string;
  badge?: string;
  variant?: "warning";
}> = [
  { id: "dashboard", icon: Home, label: "Dashboard" },
  { id: "estudiantes", icon: Users, label: "Estudiantes", badge: "487" },
  { id: "rutas", icon: Route, label: "Rutas" },
  { id: "vehiculos", icon: Car, label: "Vehículos" },
  { id: "personal", icon: UsersRound, label: "Personal" },
  { id: "pagos", icon: CreditCard, label: "Pagos" },
  { id: "eventos", icon: AlertTriangle, label: "Eventos", badge: "5", variant: "warning" },
  { id: "tracking", icon: Navigation, label: "Tracking del Día" },
];

const sectionTitles: Record<MenuSection, string> = {
  dashboard: "Dashboard",
  estudiantes: "Estudiantes",
  rutas: "Rutas",
  vehiculos: "Vehículos",
  personal: "Personal",
  pagos: "Pagos",
  eventos: "Eventos",
  tracking: "Tracking del Día",
};

export function EmpresaLayout({ children, activeSection, onSectionChange }: EmpresaLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="p-6 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                  <Building2 className="size-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-bold text-sidebar-foreground text-lg">BusEscolar</h2>
                  <p className="text-xs text-muted-foreground">Transportes Lima SAC</p>
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
                          {item.badge && (
                            <Badge
                              variant={item.variant === "warning" ? "destructive" : "secondary"}
                              className="ml-auto text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
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
              <div className="size-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">MG</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">María González</p>
                <p className="text-xs text-muted-foreground truncate">Administradora</p>
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
                    3
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <div className="size-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary-foreground">MG</span>
                      </div>
                      <div className="text-left hidden md:block">
                        <p className="text-sm font-medium text-foreground">María González</p>
                        <p className="text-xs text-muted-foreground">Administradora</p>
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
