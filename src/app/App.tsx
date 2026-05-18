import { useState } from "react";
import { EmpresaLayout, MenuSection } from "./components/EmpresaLayout";
import { AdminLayout, AdminMenuSection } from "./components/AdminLayout";
import { FamiliaLayout, FamiliaSection } from "./components/FamiliaLayout";
import { ChoferLayout, ChoferSection } from "./components/ChoferLayout";
import { EmpresaDashboard } from "./components/EmpresaDashboard";
import { EmpresaEstudiantes } from "./components/EmpresaEstudiantes";
import { EmpresaRutas } from "./components/EmpresaRutas";
import { EmpresaVehiculos } from "./components/EmpresaVehiculos";
import { EmpresaPersonal } from "./components/EmpresaPersonal";
import { EmpresaPagos } from "./components/EmpresaPagos";
import { EmpresaEventos } from "./components/EmpresaEventos";
import { EmpresaTracking } from "./components/EmpresaTracking";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminEmpresas } from "./components/AdminEmpresas";
import { FamiliaDashboard } from "./components/FamiliaDashboard";
import { FamiliaTracking } from "./components/FamiliaTracking";
import { FamiliaPerfil } from "./components/FamiliaPerfil";
import { FamiliaPagos } from "./components/FamiliaPagos";
import { FamiliaNotificaciones } from "./components/FamiliaNotificaciones";
import { FamiliaReportar } from "./components/FamiliaReportar";
import { ChoferRuta } from "./components/ChoferRuta";
import { ChoferReportar } from "./components/ChoferReportar";
import { ChoferMapa } from "./components/ChoferMapa";
import { ChoferPerfil } from "./components/ChoferPerfil";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import { Building2, Shield, Users, Bus } from "lucide-react";

type Role = "admin" | "empresa" | "familia" | "chofer";

export default function App() {
  const [role, setRole] = useState<Role>("empresa");
  const [empresaSection, setEmpresaSection] = useState<MenuSection>("dashboard");
  const [adminSection, setAdminSection] = useState<AdminMenuSection>("dashboard");
  const [familiaSection, setFamiliaSection] = useState<FamiliaSection>("inicio");
  const [choferSection, setChoferSection] = useState<ChoferSection>("ruta");

  return (
    <div>
      {/* Role toggle bar */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center gap-1 bg-card border rounded-full px-1.5 py-1 shadow-lg">
        <Button
          size="sm"
          variant={role === "empresa" ? "default" : "ghost"}
          className="rounded-full h-7 text-xs px-2.5"
          onClick={() => setRole("empresa")}
        >
          <Building2 className="mr-1 size-3.5" />
          Empresa
        </Button>
        <Button
          size="sm"
          variant={role === "admin" ? "default" : "ghost"}
          className="rounded-full h-7 text-xs px-2.5"
          onClick={() => setRole("admin")}
        >
          <Shield className="mr-1 size-3.5" />
          Admin
        </Button>
        <Button
          size="sm"
          variant={role === "familia" ? "default" : "ghost"}
          className="rounded-full h-7 text-xs px-2.5"
          onClick={() => setRole("familia")}
        >
          <Users className="mr-1 size-3.5" />
          Familia
        </Button>
        <Button
          size="sm"
          variant={role === "chofer" ? "default" : "ghost"}
          className="rounded-full h-7 text-xs px-2.5"
          onClick={() => setRole("chofer")}
        >
          <Bus className="mr-1 size-3.5" />
          Chofer
        </Button>
      </div>

      {role === "empresa" && (
        <EmpresaLayout activeSection={empresaSection} onSectionChange={setEmpresaSection}>
          {(() => {
            switch (empresaSection) {
              case "dashboard": return <EmpresaDashboard />;
              case "estudiantes": return <EmpresaEstudiantes />;
              case "rutas": return <EmpresaRutas />;
              case "vehiculos": return <EmpresaVehiculos />;
              case "personal": return <EmpresaPersonal />;
              case "pagos": return <EmpresaPagos />;
              case "eventos": return <EmpresaEventos />;
              case "tracking": return <EmpresaTracking />;
              default: return <EmpresaDashboard />;
            }
          })()}
        </EmpresaLayout>
      )}

      {role === "admin" && (
        <AdminLayout activeSection={adminSection} onSectionChange={setAdminSection}>
          {adminSection === "dashboard" ? <AdminDashboard /> : <AdminEmpresas />}
        </AdminLayout>
      )}

      {role === "familia" && (
        <FamiliaLayout activeSection={familiaSection} onSectionChange={setFamiliaSection}>
          {(() => {
            switch (familiaSection) {
              case "inicio": return <FamiliaDashboard onNavigate={setFamiliaSection} />;
              case "mapa": return <FamiliaTracking onNavigate={setFamiliaSection} />;
              case "pagos": return <FamiliaPagos />;
              case "notificaciones": return <FamiliaNotificaciones />;
              case "reportar": return <FamiliaReportar />;
              case "perfil": return <FamiliaPerfil />;
              default: return <FamiliaDashboard onNavigate={setFamiliaSection} />;
            }
          })()}
        </FamiliaLayout>
      )}

      {role === "chofer" && (
        <ChoferLayout activeSection={choferSection} onSectionChange={setChoferSection}>
          {choferSection === "ruta"
            ? <ChoferRuta onNavigate={setChoferSection} />
            : choferSection === "reportar"
            ? <ChoferReportar />
            : choferSection === "mapa"
            ? <ChoferMapa />
            : <ChoferPerfil />
          }
        </ChoferLayout>
      )}
      <Toaster position="top-right" richColors />
    </div>
  );
}
