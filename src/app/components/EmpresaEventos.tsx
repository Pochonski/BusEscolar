import React, { useState, useEffect } from "react";
import {
  Plus,
  AlertTriangle,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  ChevronDown,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface Event {
  id: number;
  date: string;
  time: string;
  type: string;
  severity: "Info" | "Warning" | "Critical";
  title: string;
  description: string;
  reporter: string;
  resolved: boolean;
  resolutionNotes?: string;
  route?: string;
  student?: string;
}

const initialEvents: Event[] = [
  {
    id: 1,
    date: "2026-05-16",
    time: "07:15 AM",
    type: "Retraso",
    severity: "Warning",
    title: "Tráfico intenso en Av. Arequipa",
    description: "Manifestación en la intersección con Av. Javier Prado. Desvío por calles alternas. Demora estimada de 15-20 minutos.",
    reporter: "Carlos Mendoza",
    resolved: true,
    resolutionNotes: "Ruta retomada a las 7:35 AM. Todos los estudiantes llegaron al colegio con 10 min de retraso.",
    route: "Ruta Norte"
  },
  {
    id: 2,
    date: "2026-05-16",
    time: "06:50 AM",
    type: "Ausencia estudiante",
    severity: "Info",
    title: "Sebastián Torres Ramírez - Ausencia justificada",
    description: "Padre notificó cita médica programada. Estudiante no asistirá hoy.",
    reporter: "Sistema",
    resolved: true,
    student: "Sebastián Torres Ramírez"
  },
  {
    id: 3,
    date: "2026-05-16",
    time: "06:30 AM",
    type: "Emergencia",
    severity: "Critical",
    title: "Cambio de ruta forzado - Ruta Sur",
    description: "Cierre total de Av. Venezuela por accidente de tránsito. Vehículo CML-912 activó ruta alternativa pre-aprobada.",
    reporter: "Luis Paredes",
    resolved: true,
    resolutionNotes: "Ruta alternativa ejecutada exitosamente. Aviso enviado a 22 familias. Sin novedades posteriores.",
    route: "Ruta Sur"
  },
  {
    id: 4,
    date: "2026-05-16",
    time: "05:45 AM",
    type: "Falla vehículo",
    severity: "Warning",
    title: "Vehículo PLM-332 presentó falla de encendido",
    description: "Batería descargada. Vehículo de respaldo DTX-556 asignado temporalmente a Ruta Este.",
    reporter: "Juan Pérez",
    resolved: false,
    route: "Ruta Este"
  },
  {
    id: 5,
    date: "2026-05-15",
    time: "03:20 PM",
    type: "Cambio ruta",
    severity: "Info",
    title: "Nueva parada agregada - Ruta Centro",
    description: "Solicitud de familia Torres fue aprobada. Nueva parada en Jr. Libertad 456 a partir del lunes 19 de mayo.",
    reporter: "María González",
    resolved: true,
    route: "Ruta Centro"
  },
  {
    id: 6,
    date: "2026-05-15",
    time: "02:45 PM",
    type: "Clima",
    severity: "Warning",
    title: "Alerta de lluvia intensa para mañana",
    description: "SENAMHI pronostica lluvias intensas. Se recomienda salir 15 min antes en todas las rutas matutinas.",
    reporter: "Sistema",
    resolved: true,
  },
  {
    id: 7,
    date: "2026-05-15",
    time: "11:00 AM",
    type: "Ausencia chofer",
    severity: "Warning",
    title: "Pedro Flores - Ausencia por enfermedad",
    description: "Chofer de Ruta Oeste reportó malestar. Roberto Vargas cubrirá su ruta mañana. Coordinado con asistentes.",
    reporter: "María González",
    resolved: false,
    route: "Ruta Oeste"
  },
  {
    id: 8,
    date: "2026-05-14",
    time: "04:10 PM",
    type: "Cambio vehículo",
    severity: "Info",
    title: "Rotación programada - Vehículo BXK-445",
    description: "Rotación trimestral de vehículos. BXK-445 pasa a Ruta Centro, HLP-321 a Ruta Norte.",
    reporter: "María González",
    resolved: true,
  },
  {
    id: 9,
    date: "2026-05-14",
    time: "12:30 PM",
    type: "Otro",
    severity: "Info",
    title: "Recordatorio: simulacro de evacuación",
    description: "El próximo viernes 23 de mayo se realizará simulacro de evacuación en todos los colegios. Coordinar con choferes tiempos de retorno.",
    reporter: "Sistema",
    resolved: true,
  },
  {
    id: 10,
    date: "2026-05-13",
    time: "08:15 AM",
    type: "Retraso",
    severity: "Critical",
    title: "Demora mayor de 30 min - Ruta Norte",
    description: "Accidente múltiple en Vía Expresa. Vehículo AQP-832 quedó atrapado sin posibilidad de desvío. 15 estudiantes afectados.",
    reporter: "Carlos Mendoza",
    resolved: true,
    resolutionNotes: "Se coordinó con los colegios. Padres notificados. Estudiantes llegaron con 45 min de retraso. Justificación oficial enviada.",
    route: "Ruta Norte"
  },
  {
    id: 11,
    date: "2026-05-12",
    time: "07:00 AM",
    type: "Estudiante no recogido",
    severity: "Critical",
    title: "Valentina Pérez - No abordó en parada",
    description: "Estudiante no se presentó en parada de Jr. Los Olivos. Padre no responde llamadas. Chofer esperó tiempo máximo reglamentario (5 min).",
    reporter: "Ana Flores",
    resolved: false,
    student: "Valentina Pérez Sánchez",
    route: "Ruta Este"
  },
];

const eventTypeConfig: Record<string, string> = {
  "Retraso": "text-orange-600 bg-orange-50",
  "Ausencia estudiante": "text-blue-600 bg-blue-50",
  "Ausencia chofer": "text-purple-600 bg-purple-50",
  "Falla vehículo": "text-red-600 bg-red-50",
  "Cambio ruta": "text-teal-600 bg-teal-50",
  "Cambio vehículo": "text-cyan-600 bg-cyan-50",
  "Emergencia": "text-red-700 bg-red-100",
  "Clima": "text-sky-600 bg-sky-50",
  "Otro": "text-gray-600 bg-gray-50",
  "Estudiante no recogido": "text-rose-600 bg-rose-50",
};

const severityConfig = {
  Info: { color: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50" },
  Warning: { color: "bg-warning", text: "text-orange-700", bg: "bg-orange-50" },
  Critical: { color: "bg-destructive", text: "text-red-700", bg: "bg-red-50" },
};

const eventTypes = Object.keys(eventTypeConfig);

export function EmpresaEventos() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterResolved, setFilterResolved] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = events.filter((ev) => {
    const matchesSearch =
      !search ||
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.reporter.toLowerCase().includes(search.toLowerCase()) ||
      ev.type.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || ev.type === filterType;
    const matchesSeverity = filterSeverity === "all" || ev.severity === filterSeverity;
    const matchesResolved =
      filterResolved === "all" ||
      (filterResolved === "resolved" && ev.resolved) ||
      (filterResolved === "unresolved" && !ev.resolved);
    const matchesDate = !filterDate || ev.date === filterDate;
    return matchesSearch && matchesType && matchesSeverity && matchesResolved && matchesDate;
  });

  const totalEvents = events.length;
  const resolvedCount = events.filter((e) => e.resolved).length;
  const criticalCount = events.filter((e) => e.severity === "Critical").length;

  const toggleResolved = (id: number) => {
    setEvents(
      events.map((e) => (e.id === id ? { ...e, resolved: !e.resolved } : e))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Eventos</h2>
          <p className="text-muted-foreground">
            Administra eventos e incidencias
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="mr-2 size-4" />
              Reportar Evento
            </Button>
          </DialogTrigger>
          <ReportEventDialog
            onSave={(data) => {
              const newEvent: Event = {
                id: Math.max(0, ...events.map((e) => e.id)) + 1,
                date: new Date().toISOString().split("T")[0],
                time: new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }),
                type: data.type || "Otro",
                severity: data.severity || "Info",
                title: data.title || "",
                description: data.description || "",
                reporter: "María González",
                resolved: false,
                route: data.route,
                student: data.student,
              };
              setEvents([newEvent, ...events]);
              setCreateOpen(false);
            }}
            onCancel={() => setCreateOpen(false)}
          />
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{totalEvents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Eventos Resueltos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-success">{resolvedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Incidentes Críticos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-destructive">{criticalCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Eventos</CardTitle>
          <CardDescription>
            {filtered.length} de {totalEvents} eventos mostrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-6 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar eventos..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 size-4" />
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {eventTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[150px]">
                <AlertTriangle className="mr-2 size-4" />
                <SelectValue placeholder="Severidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Info">Info</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterResolved} onValueChange={setFilterResolved}>
              <SelectTrigger className="w-[150px]">
                <CheckCircle2 className="mr-2 size-4" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="resolved">Resueltos</SelectItem>
                <SelectItem value="unresolved">Pendientes</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-[170px]"
            />
          </div>

          <div className="rounded-md border table-responsive">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Fecha / Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Severidad</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Reportado por</TableHead>
                  <TableHead className="text-center">Resuelto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={`sk-${i}`}>
                      <TableCell><Skeleton className="size-4" /></TableCell>
                      <TableCell><div className="flex gap-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-14" /></div></TableCell>
                      <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="text-center"><Skeleton className="h-4 w-4 mx-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No se encontraron eventos con los filtros seleccionados
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((event) => {
                  const isExpanded = expandedId === event.id;
                  return (
                    <React.Fragment key={event.id}>
                      <TableRow
                        key={event.id}
                        className="cursor-pointer hover:bg-accent/50"
                        onClick={() => setExpandedId(isExpanded ? null : event.id)}
                      >
                        <TableCell>
                          {isExpanded ? (
                            <ChevronDown className="size-4" />
                          ) : (
                            <ChevronRight className="size-4" />
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="size-3 text-muted-foreground" />
                            <span className="text-sm">
                              {new Date(event.date).toLocaleDateString("es-PE", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </span>
                            <Clock className="size-3 text-muted-foreground ml-2" />
                            <span className="text-sm text-muted-foreground">{event.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${eventTypeConfig[event.type] || "text-gray-600 bg-gray-50"} border-current`}
                          >
                            {event.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${severityConfig[event.severity].color} text-white border-0`}
                          >
                            {event.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium max-w-[250px] truncate">
                          {event.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {event.reporter}
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={event.resolved}
                            onCheckedChange={() => toggleResolved(event.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow key={`expanded-${event.id}`}>
                          <TableCell colSpan={7} className="bg-accent/30">
                            <div className="p-3 space-y-3">
                              <div>
                                <p className="text-sm font-semibold mb-1">Descripción</p>
                                <p className="text-sm text-muted-foreground">
                                  {event.description}
                                </p>
                              </div>
                              {(event.route || event.student) && (
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                  {event.route && (
                                    <span>
                                      <strong>Ruta:</strong> {event.route}
                                    </span>
                                  )}
                                  {event.student && (
                                    <span>
                                      <strong>Estudiante:</strong> {event.student}
                                    </span>
                                  )}
                                </div>
                              )}
                              {event.resolutionNotes ? (
                                <div>
                                  <p className="text-sm font-semibold text-success mb-1 flex items-center gap-1">
                                    <CheckCircle2 className="size-4" />
                                    Notas de resolución
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {event.resolutionNotes}
                                  </p>
                                </div>
                              ) : !event.resolved ? (
                                <div className="flex items-center gap-2 text-sm text-warning">
                                  <AlertTriangle className="size-4" />
                                  <span>Este evento aún no ha sido resuelto</span>
                                </div>
                              ) : null}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>                  );
                }))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ReportEventDialog({
  onSave,
  onCancel,
}: {
  onSave: (data: Partial<Event>) => void;
  onCancel: () => void;
}) {
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [route, setRoute] = useState("");
  const [student, setStudent] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!type) e.type = "Selecciona un tipo";
    if (!severity) e.severity = "Selecciona la severidad";
    if (!title.trim()) e.title = "El título es obligatorio";
    if (!description.trim()) e.description = "La descripción es obligatoria";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      onSave({ type, severity: severity as Event["severity"], title, description, route: route || undefined, student: student || undefined });
      setSubmitting(false);
      toast.success("Evento reportado correctamente");
    }, 600);
  };

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Reportar Evento</DialogTitle>
        <DialogDescription>
          Registra un nuevo evento o incidencia en el sistema
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Evento</Label>
            <Select value={type} onValueChange={(v) => { setType(v); setErrors((p) => ({ ...p, type: "" })); }}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
          </div>
          <div className="space-y-2">
            <Label>Severidad</Label>
            <div className="flex gap-2">
              {(["Info", "Warning", "Critical"] as const).map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={severity === s ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setSeverity(s)}
                  style={
                    severity === s
                      ? {
                          backgroundColor:
                            s === "Info"
                              ? "var(--color-info, #2563EB)"
                              : s === "Warning"
                                ? "var(--color-warning, #F97316)"
                                : "var(--color-destructive, #EF4444)",
                        }
                      : undefined
                  }
                >
                  {s}
                </Button>
              ))}
            </div>
            {errors.severity && <p className="text-xs text-destructive">{errors.severity}</p>}
          </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Describe el evento brevemente"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })); }}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="route">Ruta (opcional)</Label>
            <Input
              id="route"
              placeholder="Ruta Norte"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="student">Estudiante (opcional)</Label>
            <Input
              id="student"
              placeholder="Nombre del estudiante"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <textarea
            id="description"
            className="w-full min-h-[100px] rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Describe los detalles del evento..."
            value={description}
            onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: "" })); }}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel} disabled={submitting}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          Reportar Evento
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
