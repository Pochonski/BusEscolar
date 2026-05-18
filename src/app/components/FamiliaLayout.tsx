import { Home, Map, CreditCard, Bell, User, AlertTriangle } from "lucide-react";
import { RoleSwitcher, type Role } from "./RoleSwitcher";

export type FamiliaSection = "inicio" | "mapa" | "pagos" | "notificaciones" | "perfil" | "reportar";

interface FamiliaLayoutProps {
  children: React.ReactNode;
  activeSection: FamiliaSection;
  onSectionChange: (section: FamiliaSection) => void;
  role: Role;
  onRoleChange: (role: Role) => void;
}

const tabs: Array<{ id: FamiliaSection; icon: typeof Home; label: string }> = [
  { id: "inicio", icon: Home, label: "Inicio" },
  { id: "mapa", icon: Map, label: "Mapa" },
  { id: "pagos", icon: CreditCard, label: "Pagos" },
  { id: "notificaciones", icon: Bell, label: "Notif." },
  { id: "reportar", icon: AlertTriangle, label: "Reportar" },
  { id: "perfil", icon: User, label: "Perfil" },
];

const sectionTitles: Record<FamiliaSection, string> = {
  inicio: "Inicio",
  mapa: "Tracking en Vivo",
  pagos: "Historial de Pagos",
  notificaciones: "Notificaciones",
  reportar: "Reportar Novedad",
  perfil: "Perfil del Estudiante",
};

export function FamiliaLayout({ children, activeSection, onSectionChange, role, onRoleChange }: FamiliaLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[390px] relative flex flex-col min-h-screen border-x border-border bg-card">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between relative">
          <div className="flex-1">
            <h1 className="text-lg font-bold">{sectionTitles[activeSection]}</h1>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 scale-75 sm:scale-90">
            <RoleSwitcher role={role} onRoleChange={onRoleChange} />
          </div>
          <div className="size-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">AT</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto pb-16">
          {children}
        </main>

        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-border px-2 pb-safe">
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
