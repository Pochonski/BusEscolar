import { useState } from "react";
import { Clock, MapPin, Car, User, Phone, AlertTriangle, Bell, CheckCircle2, CreditCard, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const guardianName = "Ana Torres";
const studentName = "Sofía Ramírez Torres";
const studentPhoto = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia";
const studentAge = 8;
const studentSchool = "Colegio San Francisco de Asís";
const studentGrade = "3° Primaria";

interface ServiceState {
  label: string;
  subtitle: string;
  icon: typeof Clock;
  color: string;
  bg: string;
}

const serviceStates: ServiceState[] = [
  { label: "Próxima recogida: 6:45 AM", subtitle: "El bus saldrá en 12 minutos", icon: Clock, color: "text-primary", bg: "bg-primary/10" },
  { label: "El bus está en camino", subtitle: "ETA estimada: 3 min", icon: Car, color: "text-chart-3", bg: "bg-chart-3/10" },
  { label: "Estudiante recogido — 6:47 AM", subtitle: "Sofía va camino al colegio", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  { label: "Llegando al colegio", subtitle: "ETA: 7:30 AM", icon: MapPin, color: "text-chart-4", bg: "bg-chart-4/10" },
];

const recentNotifications = [
  { id: 1, type: "Recogida", title: "Sofía fue recogida", body: "Recogida puntual a las 6:47 AM por Carlos Mendoza", time: "hace 3 min", unread: true },
  { id: 2, type: "Pago", title: "Próximo vencimiento", body: "Factura de Mayo vence el 5 de Junio. S/ 445.00", time: "hace 1 hora", unread: true },
  { id: 3, type: "Evento", title: "Simulacro programado", body: "El viernes 23 de mayo habrá simulacro de evacuación en el colegio", time: "hace 3 horas", unread: false },
  { id: 4, type: "Entrega", title: "Sofía entregada en casa", body: "Entrega realizada a las 3:15 PM por Rosa Huamán", time: "Ayer", unread: false },
];

export function FamiliaDashboard({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [serviceStep, setServiceStep] = useState(1);
  const state = serviceStates[serviceStep];

  const cycleState = () => setServiceStep((prev) => (prev + 1) % serviceStates.length);

  const greeting = new Date().getHours() < 12 ? "Buenos días" : new Date().getHours() < 18 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="p-4 space-y-4">
      {/* Greeting */}
      <div>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" })}
        </p>
        <h2 className="text-xl font-bold">{greeting}, {guardianName}</h2>
      </div>

      {/* Today's Service Card */}
      <Card className="overflow-hidden cursor-pointer" onClick={cycleState}>
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="default" className="text-xs">
              Servicio de Mañana
            </Badge>
            <span className="text-xs text-muted-foreground">Clic para ver etapas</span>
          </div>

          <div className={`p-4 rounded-xl ${state.bg} mb-4`}>
            <div className="flex items-center gap-3">
              <div className={`size-14 rounded-full ${state.bg} flex items-center justify-center`}>
                <state.icon className={`size-8 ${state.color}`} />
              </div>
              <div className="flex-1">
                <p className={`text-lg font-bold ${state.color}`}>{state.label}</p>
                <p className="text-sm text-muted-foreground">{state.subtitle}</p>
              </div>
            </div>
            {serviceStep === 3 && (
              <div className="mt-3 flex items-center gap-3 pt-3 border-t border-border/50">
                <img src={studentPhoto} alt={studentName} className="size-10 rounded-full border-2 border-success" />
                <div>
                  <p className="font-semibold text-sm">Sofía recogida</p>
                  <p className="text-xs text-muted-foreground">por Carlos Mendoza</p>
                </div>
                <CheckCircle2 className="size-6 text-success ml-auto" />
              </div>
            )}
          </div>

          <Progress value={((serviceStep + 1) / serviceStates.length) * 100} className="mb-3" />

          {/* Vehicle & Staff info */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-card">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=60&h=45&fit=crop"
              alt="Vehículo"
              className="w-14 h-10 rounded object-cover"
            />
            <div className="flex-1 text-xs">
              <p className="font-medium">AQP-832 • Mercedes-Benz Sprinter</p>
              <div className="flex gap-3 mt-1">
                <span className="flex items-center gap-1">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza" className="size-4 rounded-full" />
                  Carlos M.
                </span>
                <span className="flex items-center gap-1">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=RosaHuaman" className="size-4 rounded-full" />
                  Rosa H.
                </span>
              </div>
            </div>
          </div>

          <Button className="w-full mt-3" size="sm" onClick={(e) => { e.stopPropagation(); onNavigate("mapa"); }}>
            <MapPin className="mr-1 size-4" />
            Ver en mapa
          </Button>
        </div>
      </Card>

      {/* Upcoming Payments */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="size-5 text-warning" />
              <h3 className="font-semibold">Próximo Pago</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => onNavigate("pagos")}>
              Ver historial
              <ChevronRight className="size-3 ml-1" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">S/ 445.00</p>
              <p className="text-sm text-muted-foreground">Vence: 5 de Junio 2026</p>
            </div>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
              Pendiente
            </Badge>
          </div>

          {/* Overdue alert */}
          <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
            <AlertTriangle className="size-4 text-destructive" />
            <p className="text-sm text-destructive font-medium">
              Factura de Mayo vencida — S/ 440.00
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="size-5 text-primary" />
              <h3 className="font-semibold">Notificaciones Recientes</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => onNavigate("notificaciones")}>
              Ver todas
              <ChevronRight className="size-3 ml-1" />
            </Button>
          </div>
          <div className="space-y-2">
            {recentNotifications.slice(0, 3).map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-lg ${notif.unread ? "border-l-4 border-l-primary bg-accent/30" : "bg-accent/10"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {notif.type}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                </div>
                <p className="text-sm font-semibold mb-0.5">{notif.title}</p>
                <p className="text-xs text-muted-foreground">{notif.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
