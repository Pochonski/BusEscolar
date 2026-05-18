import { Route, Map, AlertTriangle, User } from "lucide-react";
import { RoleSwitcher, type Role } from "./RoleSwitcher";

export type ChoferSection = "ruta" | "mapa" | "reportar" | "perfil";

interface ChoferLayoutProps {
  children: React.ReactNode;
  activeSection: ChoferSection;
  onSectionChange: (section: ChoferSection) => void;
  role: Role;
  onRoleChange: (role: Role) => void;
}

const tabs: Array<{ id: ChoferSection; icon: typeof Route; label: string }> = [
  { id: "ruta", icon: Route, label: "Mi Ruta" },
  { id: "mapa", icon: Map, label: "Mapa" },
  { id: "reportar", icon: AlertTriangle, label: "Reportar" },
  { id: "perfil", icon: User, label: "Perfil" },
];

const sectionTitles: Record<ChoferSection, string> = {
  ruta: "Mi Ruta de Hoy",
  mapa: "Mapa",
  reportar: "Reportar Incidencia",
  perfil: "Perfil",
};

export function ChoferLayout({ children, activeSection, onSectionChange, role, onRoleChange }: ChoferLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[390px] relative flex flex-col min-h-screen border-x border-border bg-card">
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between relative">
          <div className="flex-1">
            <h1 className="text-lg font-bold">{sectionTitles[activeSection]}</h1>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 scale-75 sm:scale-90">
            <RoleSwitcher role={role} onRoleChange={onRoleChange} />
          </div>
          <div className="size-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">CM</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto pb-16">
          {children}
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-border px-2">
          <div className="flex items-center justify-around py-2">
            {tabs.map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSectionChange(tab.id)}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className={`size-5 ${isActive ? "fill-primary/10" : ""}`} />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
