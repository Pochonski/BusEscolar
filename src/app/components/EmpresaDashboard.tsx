import { Users, Route, Car, CreditCard, UserPlus, AlertCircle, TrendingUp, Clock, CheckCircle2, Circle, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Progress } from "./ui/progress";

const kpiData = [
  {
    title: "Estudiantes Activos",
    value: "487",
    change: "+12 este mes",
    trend: "up",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Rutas Activas",
    value: "24",
    change: "Sin cambios",
    trend: "neutral",
    icon: Route,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    title: "Vehículos Operativos",
    value: "18",
    change: "2 en mantenimiento",
    trend: "down",
    icon: Car,
    color: "text-info",
    bgColor: "bg-info/10"
  },
  {
    title: "Cobros Pendientes",
    value: "32",
    badge: "12 vencidos",
    change: "S/ 14,400 total",
    trend: "warning",
    icon: CreditCard,
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
];

const revenueData = [
  { month: "Oct 2025", amount: 45000 },
  { month: "Nov 2025", amount: 52000 },
  { month: "Dic 2025", amount: 48000 },
  { month: "Ene 2026", amount: 61000 },
  { month: "Feb 2026", amount: 58000 },
  { month: "Mar 2026", amount: 67000 },
];

const rideSessions = [
  {
    id: 1,
    route: "Ruta Norte - Mañana",
    vehicle: "AQP-832",
    driver: "Carlos Mendoza Quispe",
    status: "in_progress" as const,
    studentsPickedUp: 12,
    totalStudents: 15,
    currentStop: "Parada 3 de 8",
    eta: "7:45 AM",
    location: "Av. Arequipa altura 1200"
  },
  {
    id: 2,
    route: "Ruta Centro - Mañana",
    vehicle: "BXK-445",
    driver: "Rosa María Huamán Castillo",
    status: "completed" as const,
    studentsPickedUp: 18,
    totalStudents: 18,
    currentStop: "Completada - 8:15 AM",
    eta: "Completada",
    location: "Colegio San Francisco"
  },
  {
    id: 3,
    route: "Ruta Sur - Mañana",
    vehicle: "CML-912",
    driver: "Luis Alberto Paredes Cruz",
    status: "pending" as const,
    studentsPickedUp: 0,
    totalStudents: 22,
    currentStop: "Próximo inicio",
    eta: "7:30 AM",
    location: "Punto de partida: Jr. Los Pinos 345"
  },
  {
    id: 4,
    route: "Ruta Este - Mañana",
    vehicle: "DTX-556",
    driver: "Ana Patricia Flores Vega",
    status: "in_progress" as const,
    studentsPickedUp: 8,
    totalStudents: 20,
    currentStop: "Parada 2 de 10",
    eta: "8:00 AM",
    location: "Calle Las Magnolias 890"
  },
];

const recentEvents = [
  {
    id: 1,
    type: "Retraso",
    title: "Ruta Norte - Tráfico intenso en Av. Arequipa",
    description: "Demora estimada de 10 minutos por manifestación",
    time: "hace 15 min",
    severity: "warning" as const,
    reporter: "Carlos Mendoza"
  },
  {
    id: 2,
    type: "Ausencia estudiante",
    title: "Sebastián Torres Ramírez - Ausencia justificada",
    description: "Padre notificó cita médica",
    time: "hace 32 min",
    severity: "info" as const,
    reporter: "Sistema"
  },
  {
    id: 3,
    type: "Emergencia",
    title: "Cambio de ruta forzado - Ruta Sur",
    description: "Manifestación en Av. Venezuela, ruta alternativa activada",
    time: "hace 1 hora",
    severity: "critical" as const,
    reporter: "Luis Paredes"
  },
  {
    id: 4,
    type: "Pago",
    title: "Familia Torres Sánchez - Pago recibido",
    description: "S/ 450.00 - Mensualidad de Mayo 2026",
    time: "hace 2 horas",
    severity: "info" as const,
    reporter: "Sistema"
  },
  {
    id: 5,
    type: "Falla vehículo",
    title: "Vehículo PLM-332 - Revisión de mantenimiento",
    description: "Programado para revisión el 17/05/2026",
    time: "hace 3 horas",
    severity: "warning" as const,
    reporter: "Juan Pérez"
  },
  {
    id: 6,
    type: "Cambio ruta",
    title: "Nueva parada agregada - Ruta Centro",
    description: "Parada en Jr. Libertad 456 por solicitud familiar",
    time: "hace 4 horas",
    severity: "info" as const,
    reporter: "María González"
  },
];

// Según especificación: green=pending, blue=in_progress, gray=completed
const statusConfig = {
  pending: { label: "Pendiente", color: "bg-success", icon: Circle },
  in_progress: { label: "En Progreso", color: "bg-primary", icon: Clock },
  completed: { label: "Completada", color: "bg-gray-500", icon: CheckCircle2 },
};

const severityConfig = {
  info: {
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-500"
  },
  warning: {
    color: "bg-orange-50 text-orange-700 border-orange-200",
    iconColor: "text-orange-500"
  },
  critical: {
    color: "bg-red-50 text-red-700 border-red-200",
    iconColor: "text-red-500"
  },
};

const chartConfig = {
  amount: {
    label: "Ingresos",
    color: "#2563EB",
  },
};

export function EmpresaDashboard() {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
  const avgRevenue = Math.round(totalRevenue / revenueData.length);

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
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-success" />
              Ingresos últimos 6 meses
            </CardTitle>
            <CardDescription>
              Total: S/ {totalRevenue.toLocaleString()} | Promedio mensual: S/ {avgRevenue.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                  tickFormatter={(value) => `${(value / 1000)}k`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(label) => label}
                      formatter={(value) => [`S/ ${Number(value).toLocaleString()}`, "Ingresos"]}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--color-amount)"
                  strokeWidth={3}
                  dot={{ fill: "#2563EB", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Operaciones frecuentes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="default" size="lg">
              <Route className="mr-2 size-5" />
              Nueva Ruta
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg">
              <UserPlus className="mr-2 size-5" />
              Registrar Estudiante
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg">
              <AlertCircle className="mr-2 size-5" />
              Reportar Evento
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Ride Sessions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="size-5 text-primary" />
                  Sesiones de Ruta - Hoy
                </CardTitle>
                <CardDescription>Viernes, 16 de Mayo 2026</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {rideSessions.map((session) => {
              const StatusIcon = statusConfig[session.status].icon;
              const progress = (session.studentsPickedUp / session.totalStudents) * 100;

              return (
                <div
                  key={session.id}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{session.route}</h4>
                          <Badge
                            variant="outline"
                            className={`${statusConfig[session.status].color} text-white border-0`}
                          >
                            <StatusIcon className="size-3 mr-1" />
                            {statusConfig[session.status].label}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p className="flex items-center gap-1">
                            <Car className="size-3" />
                            <span className="font-medium text-foreground">{session.vehicle}</span> • {session.driver}
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {session.location}
                          </p>
                          <p className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {session.currentStop} • ETA: {session.eta}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-center gap-1">
                        <div className="size-14 rounded-full border-4 border-primary/20 flex items-center justify-center bg-primary/5">
                          <span className="text-sm font-bold text-primary">
                            {Math.round(progress)}%
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {session.studentsPickedUp}/{session.totalStudents}
                        </span>
                      </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="size-5 text-orange-500" />
              Eventos Recientes
            </CardTitle>
            <CardDescription>Actividad e incidencias del día</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border ${severityConfig[event.severity].color} hover:shadow-sm transition-shadow cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${severityConfig[event.severity].iconColor}`}>
                      <AlertCircle className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs border-current">
                          {event.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                      </div>
                      <p className="text-sm font-semibold mb-1">{event.title}</p>
                      <p className="text-xs text-muted-foreground mb-1">{event.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Reportado por: {event.reporter}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
