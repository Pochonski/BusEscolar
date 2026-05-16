import { useState } from "react";
import {
  Navigation,
  MapPin,
  Clock,
  Car,
  Users,
  CheckCircle2,
  Circle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Calendar,
  Gauge,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface StudentStop {
  studentId: number;
  name: string;
  photo: string;
  stopLabel: string;
  status: "pending" | "picked_up" | "dropped_off" | "absent" | "excused";
}

interface RouteSession {
  id: number;
  routeName: string;
  vehiclePlate: string;
  driverName: string;
  driverPhoto: string;
  status: "pending" | "in_progress" | "completed";
  morningStops: StudentStop[];
  afternoonStops: StudentStop[];
  position?: { x: number; y: number };
}

const studentStatusConfig = {
  pending: { label: "Pendiente", icon: Circle, color: "text-gray-400", bg: "bg-gray-100" },
  picked_up: { label: "Recogido", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  dropped_off: { label: "Entregado", icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
  absent: { label: "Ausente", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  excused: { label: "Justificado", icon: CheckCircle2, color: "text-orange-500", bg: "bg-orange-50" },
};

function createInitialSessions(): RouteSession[] {
  return [
    {
      id: 1,
      routeName: "Ruta Norte",
      vehiclePlate: "AQP-832",
      driverName: "Carlos Mendoza Quispe",
      driverPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza",
      status: "in_progress",
      position: { x: 35, y: 40 },
      morningStops: [
        {
          studentId: 101,
          name: "Sofía Ramírez Torres",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
          stopLabel: "Parada 1 — Calle Los Pinos #45",
          status: "picked_up",
        },
        {
          studentId: 102,
          name: "Diego Mendoza Castillo",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego",
          stopLabel: "Parada 1 — Calle Los Pinos #45",
          status: "picked_up",
        },
        {
          studentId: 103,
          name: "Luis García Huamán",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuisGarcia",
          stopLabel: "Parada 2 — Av. Arequipa 1200",
          status: "pending",
        },
        {
          studentId: 104,
          name: "Camila Torres Ríos",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camila",
          stopLabel: "Parada 2 — Av. Arequipa 1200",
          status: "picked_up",
        },
        {
          studentId: 105,
          name: "Mateo Quispe López",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mateo",
          stopLabel: "Parada 3 — Jr. Los Olivos 234",
          status: "pending",
        },
        {
          studentId: 106,
          name: "Valeria Sánchez Paz",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valeria",
          stopLabel: "Parada 3 — Jr. Los Olivos 234",
          status: "pending",
        },
      ],
      afternoonStops: [
        {
          studentId: 101,
          name: "Sofía Ramírez Torres",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
          stopLabel: "Colegio San Francisco — Salida",
          status: "pending",
        },
        {
          studentId: 102,
          name: "Diego Mendoza Castillo",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego",
          stopLabel: "Colegio San Francisco — Salida",
          status: "pending",
        },
        {
          studentId: 103,
          name: "Luis García Huamán",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuisGarcia",
          stopLabel: "Parada 2 — Av. Arequipa 1200",
          status: "pending",
        },
      ],
    },
    {
      id: 2,
      routeName: "Ruta Centro",
      vehiclePlate: "BXK-445",
      driverName: "Rosa María Huamán Castillo",
      driverPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=RosaHuaman",
      status: "completed",
      position: { x: 65, y: 55 },
      morningStops: [
        {
          studentId: 201,
          name: "Valentina Pérez Sánchez",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina",
          stopLabel: "Parada 1 — Jr. Libertad 456",
          status: "dropped_off",
        },
        {
          studentId: 202,
          name: "Adrián López Vega",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adrian",
          stopLabel: "Parada 2 — Calle Real 789",
          status: "dropped_off",
        },
      ],
      afternoonStops: [
        {
          studentId: 201,
          name: "Valentina Pérez Sánchez",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina",
          stopLabel: "Colegio Santa María — Salida",
          status: "pending",
        },
      ],
    },
    {
      id: 3,
      routeName: "Ruta Sur",
      vehiclePlate: "CML-912",
      driverName: "Luis Alberto Paredes Cruz",
      driverPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuisParedes",
      status: "pending",
      position: { x: 20, y: 70 },
      morningStops: [
        {
          studentId: 301,
          name: "Sebastián Torres Ramírez",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian",
          stopLabel: "Parada 1 — Jr. Los Pinos 345",
          status: "excused",
        },
        {
          studentId: 302,
          name: "Isabella Castro Mendoza",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
          stopLabel: "Parada 1 — Jr. Los Pinos 345",
          status: "pending",
        },
        {
          studentId: 303,
          name: "Joaquín Ríos Vargas",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joaquin",
          stopLabel: "Parada 2 — Av. Venezuela 1500",
          status: "pending",
        },
      ],
      afternoonStops: [
        {
          studentId: 301,
          name: "Sebastián Torres Ramírez",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian",
          stopLabel: "Colegio San Francisco — Salida",
          status: "pending",
        },
        {
          studentId: 302,
          name: "Isabella Castro Mendoza",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
          stopLabel: "Parada 2 — Av. Venezuela 1500",
          status: "pending",
        },
      ],
    },
    {
      id: 4,
      routeName: "Ruta Este",
      vehiclePlate: "DTX-556",
      driverName: "Ana Patricia Flores Vega",
      driverPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnaFlores",
      status: "in_progress",
      position: { x: 55, y: 30 },
      morningStops: [
        {
          studentId: 401,
          name: "Gabriela Paredes Soto",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriela",
          stopLabel: "Parada 1 — Calle Las Magnolias 890",
          status: "picked_up",
        },
        {
          studentId: 402,
          name: "Andrés Huamán Díaz",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andres",
          stopLabel: "Parada 1 — Calle Las Magnolias 890",
          status: "picked_up",
        },
        {
          studentId: 403,
          name: "Ximena Flores Cruz",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ximena",
          stopLabel: "Parada 2 — Av. Los Próceres 567",
          status: "absent",
        },
        {
          studentId: 404,
          name: "Daniel Quiroz León",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
          stopLabel: "Parada 3 — Jr. San Martín 123",
          status: "pending",
        },
      ],
      afternoonStops: [],
    },
  ];
}

const routePolyline = "M15,80 Q30,50 35,40 Q40,30 50,35 Q60,40 65,55 Q70,70 55,70 Q40,70 20,70 Z";

function RouteMap({ sessions }: { sessions: RouteSession[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Navigation className="size-5 text-primary" />
          Mapa de Rutas Activas
        </CardTitle>
        <CardDescription>
          Ubicación simulada de vehículos en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-[400px] bg-gradient-to-br from-slate-50 to-blue-50"
        >
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.3" />
            </pattern>
            <radialGradient id="pulse1">
              <animate attributeName="r" from="4" to="12" dur="1.5s" repeatCount="indefinite" />
            </radialGradient>
            <radialGradient id="shadow">
              <stop offset="0%" stopColor="rgba(37,99,235,0.15)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0)" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Route polylines */}
          <path
            d="M35,40 Q45,45 55,35 Q65,25 65,55"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          <path
            d="M65,55 Q60,65 45,60 Q30,55 20,70"
            fill="none"
            stroke="#16A34A"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          <path
            d="M55,30 Q65,35 70,50 Q75,65 65,55"
            fill="none"
            stroke="#F97316"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />

          {/* Stop markers */}
          {[
            { x: 35, y: 40, label: "1" },
            { x: 50, y: 40, label: "2" },
            { x: 55, y: 35, label: "3" },
            { x: 65, y: 55, label: "4" },
            { x: 45, y: 60, label: "5" },
            { x: 20, y: 70, label: "6" },
            { x: 55, y: 30, label: "7" },
            { x: 70, y: 50, label: "8" },
          ].map((stop, i) => (
            <g key={i}>
              {i % 3 === 0 && (
                <circle cx={stop.x} cy={stop.y} r="5" fill="rgba(37,99,235,0.1)" />
              )}
              <circle
                cx={stop.x}
                cy={stop.y}
                r="3.5"
                fill={i % 3 === 0 ? "#2563EB" : i % 3 === 1 ? "#16A34A" : "#F97316"}
                stroke="white"
                strokeWidth="1.5"
              />
              <text
                x={stop.x}
                y={stop.y + 0.6}
                textAnchor="middle"
                fill="white"
                fontSize="3"
                fontWeight="bold"
              >
                {stop.label}
              </text>
            </g>
          ))}

          {/* School marker */}
          <g>
            <rect
              x="61"
              y="51"
              width="8"
              height="8"
              rx="1.5"
              fill="#1E293B"
              stroke="white"
              strokeWidth="1"
            />
            <text
              x="65"
              y="56.5"
              textAnchor="middle"
              fill="white"
              fontSize="3.5"
              fontWeight="bold"
            >
              &#x1F3EB;
            </text>
          </g>

          {/* Vehicle markers with pulse */}
          {sessions.map((session) => {
            if (!session.position || session.status === "completed") return null;
            const { x, y } = session.position;
            const isMoving = session.status === "in_progress";
            const color = isMoving ? "#2563EB" : "#F97316";

            return (
              <g key={`vehicle-${session.id}`}>
                {/* Pulse ring */}
                {isMoving && (
                  <circle cx={x} cy={y} r="4" fill="rgba(37,99,235,0.15)">
                    <animate
                      attributeName="r"
                      from="4"
                      to="1"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {/* Vehicle */}
                <rect
                  x={x - 2.5}
                  y={y - 4}
                  width="5"
                  height="8"
                  rx="2"
                  fill={color}
                  stroke="white"
                  strokeWidth="0.8"
                />
                {/* ETA label */}
                <rect
                  x={x - 5}
                  y={y - 10}
                  width="10"
                  height="4"
                  rx="1"
                  fill="white"
                  stroke={color}
                  strokeWidth="0.3"
                />
                <text
                  x={x}
                  y={y - 7.2}
                  textAnchor="middle"
                  fill={color}
                  fontSize="2"
                  fontWeight="bold"
                >
                  {isMoving ? "ETA 5min" : "En punto"}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(4, 91)">
            <rect width="36" height="8" rx="2" fill="white" stroke="#e2e8f0" strokeWidth="0.5" />
            <circle cx="7" cy="4" r="2" fill="#2563EB" />
            <text x="10" y="5.5" fontSize="2" fill="#64748B">En ruta</text>
            <circle cx="17" cy="4" r="2" fill="#16A34A" />
            <text x="20" y="5.5" fontSize="2" fill="#64748B">Parada</text>
            <rect x="26.5" y="2" width="4" height="4" rx="1" fill="#1E293B" />
            <text x="31.5" y="5.5" fontSize="2" fill="#64748B">Colegio</text>
          </g>
        </svg>
      </CardContent>
    </Card>
  );
}

function StudentRow({
  student,
  onClick,
}: {
  student: StudentStop;
  onClick: () => void;
}) {
  const config = studentStatusConfig[student.status];
  const StatusIcon = config.icon;

  const statusCycle = ["pending", "picked_up", "dropped_off", "absent"] as const;

  return (
    <div
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
      onClick={onClick}
      title="Clic para cambiar estado"
    >
      <img
        src={student.photo}
        alt={student.name}
        className="size-9 rounded-full border object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(student.name)}`;
        }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{student.name}</p>
        <p className="text-xs text-muted-foreground truncate">{student.stopLabel}</p>
      </div>
      <Badge
        variant="outline"
        className={`${config.bg} ${config.color} border-current shrink-0`}
      >
        <StatusIcon className="size-3 mr-1" />
        {config.label}
      </Badge>
    </div>
  );
}

export function EmpresaTracking() {
  const [sessions, setSessions] = useState<RouteSession[]>(createInitialSessions());
  const [date, setDate] = useState("2026-05-16");
  const [expandedRoutes, setExpandedRoutes] = useState<Set<number>>(new Set([1]));
  const [activeTripType, setActiveTripType] = useState<Record<number, "morning" | "afternoon">>({
    1: "morning",
    2: "morning",
    3: "morning",
    4: "morning",
  });

  const toggleExpanded = (id: number) => {
    setExpandedRoutes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const cycleStudentStatus = (sessionId: number, tripType: "morning" | "afternoon", studentId: number) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== sessionId) return session;
        const stopsKey = tripType === "morning" ? "morningStops" : "afternoonStops";
        const statusOrder = ["pending", "picked_up", "dropped_off", "absent"] as const;
        return {
          ...session,
          [stopsKey]: session[stopsKey].map((s) =>
            s.studentId === studentId
              ? {
                  ...s,
                  status: statusOrder[
                    (statusOrder.indexOf(s.status as typeof statusOrder[number]) + 1) %
                      statusOrder.length
                  ],
                }
              : s
          ),
        };
      })
    );
  };

  const activeRoutesCount = sessions.filter((s) => s.status !== "completed").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tracking del Día</h2>
          <p className="text-muted-foreground">
            Monitorea las rutas en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-muted-foreground" />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-auto"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rutas Activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-primary">{activeRoutesCount}</div>
            <p className="text-xs text-muted-foreground">
              {new Date(date).toLocaleDateString("es-PE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estudiantes en Ruta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {sessions.reduce((sum, s) => {
                const morningPicked = s.morningStops.filter(
                  (st) => st.status === "picked_up" || st.status === "dropped_off"
                ).length;
                return sum + morningPicked;
              }, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Recogidos esta mañana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rutas Completadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-success">
              {sessions.filter((s) => s.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">de {sessions.length} totales</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => {
          const isExpanded = expandedRoutes.has(session.id);
          const tripType = activeTripType[session.id] || "morning";
          const stops = tripType === "morning" ? session.morningStops : session.afternoonStops;
          const processedCount = stops.filter(
            (s) => s.status !== "pending"
          ).length;
          const progressPercent =
            stops.length > 0 ? (processedCount / stops.length) * 100 : 0;

          const statusConfig2 = {
            pending: { label: "Pendiente", color: "bg-gray-500" },
            in_progress: { label: "En Progreso", color: "bg-primary" },
            completed: { label: "Completada", color: "bg-success" },
          };

          return (
            <Card key={session.id} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-accent/30 transition-colors"
                onClick={() => toggleExpanded(session.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="size-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="size-5 text-muted-foreground" />
                    )}
                    <div>
                      <CardTitle className="text-lg">{session.routeName}</CardTitle>
                      <CardDescription>
                        <span className="flex items-center gap-2">
                          <Car className="size-3" />
                          {session.vehiclePlate}
                          <span className="text-foreground font-medium ml-1">
                            {session.driverName}
                          </span>
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2">
                      <img
                        src={session.driverPhoto}
                        alt={session.driverName}
                        className="size-8 rounded-full border"
                      />
                    </div>
                    <Badge
                      className={`${statusConfig2[session.status].color} text-white border-0`}
                    >
                      {statusConfig2[session.status].label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <Progress value={progressPercent} className="mb-4" />

                  <div className="flex gap-2 mb-4">
                    <Button
                      variant={tripType === "morning" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setActiveTripType((prev) => ({ ...prev, [session.id]: "morning" }))
                      }
                    >
                      Recogida (Mañana)
                    </Button>
                    <Button
                      variant={tripType === "afternoon" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setActiveTripType((prev) => ({
                          ...prev,
                          [session.id]: "afternoon",
                        }))
                      }
                    >
                      Entrega (Tarde)
                      {session.afternoonStops.length === 0 && (
                        <span className="ml-1 text-xs opacity-70">(vacío)</span>
                      )}
                    </Button>
                  </div>

                  <div className="rounded-lg border">
                    <div className="p-3 bg-accent/30 border-b">
                      <p className="text-sm font-semibold">
                        {tripType === "morning" ? "Recorrido matutino" : "Recorrido vespertino"}
                        <span className="text-muted-foreground font-normal ml-2">
                          — {processedCount}/{stops.length} procesados
                        </span>
                      </p>
                    </div>

                    {stops.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground">
                        <Users className="size-8 mx-auto mb-2 opacity-40" />
                        <p className="text-sm">No hay estudiantes asignados para este tramo</p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {stops.map((student) => (
                          <StudentRow
                            key={`${session.id}-${tripType === "morning" ? "m" : "a"}-${student.studentId}`}
                            student={student}
                            onClick={() =>
                              cycleStudentStatus(session.id, tripType, student.studentId)
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Clic en un estudiante para cambiar su estado: Pendiente → Recogido → Entregado → Ausente</p>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <RouteMap sessions={sessions} />
    </div>
  );
}
