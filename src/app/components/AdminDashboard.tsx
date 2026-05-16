import { Building2, Users, TrendingUp, AlertTriangle, Building, ArrowUpRight, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const kpiData = [
  {
    title: "Empresas Activas",
    value: "12",
    change: "+2 este trimestre",
    trend: "up" as const,
    icon: Building2,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Estudiantes Transportados",
    value: "1,842",
    change: "+156 vs mes anterior",
    trend: "up" as const,
    icon: Users,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    title: "Ingresos del Mes",
    value: "S/ 58,200",
    change: "Mayo 2026",
    trend: "neutral" as const,
    icon: TrendingUp,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10"
  },
  {
    title: "Incidencias Activas",
    value: "5",
    badge: "2 críticas",
    change: "3 resueltas hoy",
    trend: "down" as const,
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
];

const recentActivity = [
  {
    id: 1,
    icon: Building2,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    title: "Nueva empresa registrada",
    description: "Transportes Los Andes SRL se registró en la plataforma",
    time: "hace 20 min",
  },
  {
    id: 2,
    icon: AlertTriangle,
    iconColor: "text-destructive",
    bgColor: "bg-destructive/10",
    title: "Incidencia crítica en Ruta Sur",
    description: "Accidente de tránsito reportado. Vehículo CML-912 activó ruta alternativa.",
    time: "hace 35 min",
  },
  {
    id: 3,
    icon: Users,
    iconColor: "text-success",
    bgColor: "bg-success/10",
    title: "Pico de estudiantes activos",
    description: "Se alcanzaron 1,842 estudiantes transportados hoy. Récord del mes.",
    time: "hace 1 hora",
  },
  {
    id: 4,
    icon: Building2,
    iconColor: "text-chart-3",
    bgColor: "bg-chart-3/10",
    title: "Transportes Lima SAC renovó plan",
    description: "Plan actualizado a Plan Completo (Mañana + Tarde) para 487 estudiantes.",
    time: "hace 2 horas",
  },
  {
    id: 5,
    icon: CheckCircle2,
    iconColor: "text-success",
    bgColor: "bg-success/10",
    title: "Facturación mensual completada",
    description: "Se generaron 487 facturas para el periodo Mayo 2026.",
    time: "hace 3 horas",
  },
  {
    id: 6,
    icon: Building2,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    title: "Nueva empresa en verificación",
    description: "Corporación Educativa San Martín S.A.C. inició proceso de registro.",
    time: "hace 4 horas",
  },
  {
    id: 7,
    icon: AlertCircle,
    iconColor: "text-warning",
    bgColor: "bg-warning/10",
    title: "Alerta meteorológica",
    description: "SENAMHI emitió alerta de lluvias para mañana. Empresas notificadas.",
    time: "hace 5 horas",
  },
  {
    id: 8,
    icon: TrendingUp,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    title: "Reporte mensual generado",
    description: "Reporte de abril 2026 completado: S/ 52,300 facturados, 92% cobranza.",
    time: "hace 6 horas",
  },
];

const topCompanies = [
  { name: "Transportes Lima SAC", students: 487, routes: 24, status: "Activo" },
  { name: "Transportes Los Andes SRL", students: 312, routes: 15, status: "Activo" },
  { name: "Movilidad Escolar Norte SAC", students: 245, routes: 12, status: "Activo" },
  { name: "Bus Escolar Centro SRL", students: 198, routes: 10, status: "Activo" },
  { name: "Transporte Andino EIRL", students: 156, routes: 8, status: "Inactivo" },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className={`size-10 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                <kpi.icon className={`size-5 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold mb-1">{kpi.value}</div>
              {kpi.badge && (
                <Badge variant="destructive" className="mb-2">
                  {kpi.badge}
                </Badge>
              )}
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Feed */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5 text-primary" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>Eventos y acciones en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className={`p-2 rounded-lg shrink-0 ${item.bgColor}`}>
                    <item.icon className={`size-4 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-semibold text-sm">{item.title}</p>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Access + Top Companies */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Acceso Rápido</CardTitle>
              <CardDescription>Gestón frecuente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="default" size="sm">
                <Building className="mr-2 size-4" />
                Gestionar Empresas
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Users className="mr-2 size-4" />
                Ver Usuarios
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <TrendingUp className="mr-2 size-4" />
                Ver Reportes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Empresas</CardTitle>
              <CardDescription>Mayor volumen de estudiantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topCompanies.map((company, i) => (
                  <div
                    key={company.name}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">#{i + 1}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{company.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {company.students} estudiantes · {company.routes} rutas
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={company.status === "Activo" ? "default" : "secondary"}
                      className="shrink-0 text-xs"
                    >
                      {company.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
