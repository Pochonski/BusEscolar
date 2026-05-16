import { ArrowLeft, Phone, MapPin, Clock, Route, Car, Users, User, AlertTriangle, Heart, Brain, Eye, Ear, Stethoscope, ShieldAlert, CheckCircle2, XCircle, AlertCircle, Circle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Progress } from "./ui/progress";

export interface StudentDetailData {
  id: number;
  photo: string;
  name: string;
  age: number;
  school: string;
  grade: string;
  specialNeeds: boolean;
  specialNeedsList: SpecialNeed[];
  guardian: string;
  guardianPhone: string;
  guardianAltPhone: string;
  guardianAddress: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: "Activo" | "Inactivo";
  assignedRoute: string;
  assignedStop: string;
  pickupTime: string;
  dropoffTime: string;
  vehiclePlate: string;
  driverName: string;
  driverPhoto: string;
  paymentPlan: string;
  invoices: StudentInvoice[];
  rideHistory: RideLog[];
}

interface SpecialNeed {
  category: "Física" | "Cognitiva" | "Médica" | "Sensorial" | "Alergia" | "Otra";
  description: string;
  notes: string;
}

interface StudentInvoice {
  id: number;
  number: string;
  period: string;
  amount: number;
  status: "Pagado" | "Pendiente" | "Vencido" | "Cancelado";
  dueDate: string;
  paymentDate?: string;
}

interface RideLog {
  id: number;
  date: string;
  type: "Recogida" | "Entrega";
  status: "A tiempo" | "Retraso" | "Ausente" | "Justificado";
  time: string;
  loggedBy: string;
  stop: string;
}

const specialNeedCategoryConfig: Record<string, { icon: typeof Heart; color: string; label: string }> = {
  "Física": { icon: Heart, color: "bg-red-100 text-red-700", label: "Física" },
  "Cognitiva": { icon: Brain, color: "bg-purple-100 text-purple-700", label: "Cognitiva" },
  "Médica": { icon: Stethoscope, color: "bg-blue-100 text-blue-700", label: "Médica" },
  "Sensorial": { icon: Eye, color: "bg-amber-100 text-amber-700", label: "Sensorial" },
  "Alergia": { icon: AlertTriangle, color: "bg-orange-100 text-orange-700", label: "Alergia" },
  "Otra": { icon: ShieldAlert, color: "bg-gray-100 text-gray-700", label: "Otra" },
};

const invoiceStatusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  Pagado: { color: "bg-success", icon: CheckCircle2 },
  Pendiente: { color: "bg-warning", icon: Clock },
  Vencido: { color: "bg-destructive", icon: AlertCircle },
  Cancelado: { color: "bg-gray-500", icon: XCircle },
};

const rideStatusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  "A tiempo": { color: "text-success", icon: CheckCircle2 },
  "Retraso": { color: "text-orange-500", icon: AlertTriangle },
  "Ausente": { color: "text-destructive", icon: XCircle },
  "Justificado": { color: "text-blue-500", icon: AlertCircle },
};

export function EmpresaEstudianteDetalle({
  student,
  onBack,
}: {
  student: StudentDetailData;
  onBack: () => void;
}) {
  const paidInvoices = student.invoices.filter((i) => i.status === "Pagado").length;
  const pendingInvoices = student.invoices.filter((i) => i.status === "Pendiente").length;
  const overdueInvoices = student.invoices.filter((i) => i.status === "Vencido").length;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-2">
        <ArrowLeft className="mr-2 size-4" />
        Volver a Estudiantes
      </Button>

      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative">
              <img
                src={student.photo}
                alt={student.name}
                className="size-24 rounded-2xl border-4 border-border object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(student.name)}`;
                }}
              />
              <div className={`absolute -bottom-1 -right-1 size-6 rounded-full border-4 border-card ${student.status === "Activo" ? "bg-success" : "bg-gray-400"}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <Badge variant={student.status === "Activo" ? "default" : "secondary"}>
                  {student.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {student.age} años · {student.grade} · {student.school}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {student.specialNeedsList.map((need, i) => {
                  const cfg = specialNeedCategoryConfig[need.category];
                  const Icon = cfg.icon;
                  return (
                    <Badge key={i} variant="outline" className={cfg.color}>
                      <Icon className="size-3 mr-1" />
                      {cfg.label}: {need.description}
                    </Badge>
                  );
                })}
                {student.specialNeedsList.length === 0 && (
                  <span className="text-sm text-muted-foreground">Sin necesidades especiales registradas</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="datos-generales">
        <TabsList>
          <TabsTrigger value="datos-generales">Datos Generales</TabsTrigger>
          <TabsTrigger value="necesidades">Necesidades</TabsTrigger>
          <TabsTrigger value="pagos">Pagos</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        {/* Tab: Datos Generales */}
        <TabsContent value="datos-generales" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="size-4" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Nombre completo</p>
                  <p className="font-medium">{student.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Edad</p>
                    <p className="font-medium">{student.age} años</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Colegio</p>
                    <p className="font-medium truncate">{student.school}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Grado</p>
                  <p className="font-medium">{student.grade}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="size-4" />
                  Información del Tutor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Nombre</p>
                  <p className="font-medium">{student.guardian}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  <span>{student.guardianPhone}</span>
                </div>
                {student.guardianAltPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{student.guardianAltPhone} (alt.)</span>
                  </div>
                )}
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="size-4 text-muted-foreground mt-0.5" />
                  <span>{student.guardianAddress}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldAlert className="size-4" />
                  Contacto de Emergencia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Nombre</p>
                  <p className="font-medium">{student.emergencyContact}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  <span>{student.emergencyPhone}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Route className="size-4" />
                  Servicio Asignado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Ruta</p>
                  <p className="font-medium">{student.assignedRoute}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Parada</p>
                  <p className="font-medium">{student.assignedStop}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Recogida</p>
                    <p className="font-medium flex items-center gap-1">
                      <Clock className="size-3" />
                      {student.pickupTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Entrega</p>
                    <p className="font-medium flex items-center gap-1">
                      <Clock className="size-3" />
                      {student.dropoffTime}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Car className="size-4 text-muted-foreground" />
                    <span className="text-sm">{student.vehiclePlate}</span>
                  </div>
                  {student.driverName && (
                    <div className="flex items-center gap-2">
                      <img
                        src={student.driverPhoto}
                        alt={student.driverName}
                        className="size-6 rounded-full"
                      />
                      <span className="text-sm">{student.driverName}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Necesidades */}
        <TabsContent value="necesidades" className="space-y-4 mt-4">
          {student.specialNeedsList.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="size-12 mx-auto mb-3 text-muted-foreground opacity-40" />
                <p className="text-muted-foreground">No se registran necesidades especiales</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {student.specialNeedsList.map((need, i) => {
                const cfg = specialNeedCategoryConfig[need.category];
                const Icon = cfg.icon;
                return (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${cfg.color.replace("text-", "bg-").replace("700", "100").replace("500", "100")}`}>
                          <Icon className={`size-5 ${cfg.color.split(" ")[1]}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className={cfg.color}>
                              {cfg.label}
                            </Badge>
                            <span className="font-semibold">{need.description}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{need.notes}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Tab: Pagos */}
        <TabsContent value="pagos" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Plan asignado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-sm">{student.paymentPlan}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pagadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-success">{paidInvoices}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-warning">{pendingInvoices}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Vencidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-destructive">{overdueInvoices}</div>
              </CardContent>
            </Card>
          </div>

          {/* Payment status visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="size-4" />
                Estado de Pagos
              </CardTitle>
              <CardDescription>
                {student.invoices.length} facturas registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 h-8 rounded-full overflow-hidden">
                {paidInvoices > 0 && (
                  <div
                    className="bg-success h-full flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${(paidInvoices / student.invoices.length) * 100}%` }}
                  >
                    {Math.round((paidInvoices / student.invoices.length) * 100)}%
                  </div>
                )}
                {pendingInvoices > 0 && (
                  <div
                    className="bg-warning h-full flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${(pendingInvoices / student.invoices.length) * 100}%` }}
                  >
                    {Math.round((pendingInvoices / student.invoices.length) * 100)}%
                  </div>
                )}
                {overdueInvoices > 0 && (
                  <div
                    className="bg-destructive h-full flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${(overdueInvoices / student.invoices.length) * 100}%` }}
                  >
                    {Math.round((overdueInvoices / student.invoices.length) * 100)}%
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="size-3 rounded bg-success" />
                  Pagado
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-3 rounded bg-warning" />
                  Pendiente
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-3 rounded bg-destructive" />
                  Vencido
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice history table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historial de Facturas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead># Factura</TableHead>
                      <TableHead>Periodo</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead>Fecha límite</TableHead>
                      <TableHead>Fecha pago</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.invoices.map((inv) => {
                      const stCfg = invoiceStatusConfig[inv.status];
                      const StIcon = stCfg.icon;
                      return (
                        <TableRow key={inv.id}>
                          <TableCell className="font-mono text-sm">{inv.number}</TableCell>
                          <TableCell>{inv.period}</TableCell>
                          <TableCell className="text-right font-medium">
                            S/ {inv.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>{new Date(inv.dueDate).toLocaleDateString("es-PE")}</TableCell>
                          <TableCell>
                            {inv.paymentDate
                              ? new Date(inv.paymentDate).toLocaleDateString("es-PE")
                              : "—"}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${stCfg.color} text-white border-0`}>
                              <StIcon className="size-3 mr-1" />
                              {inv.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {student.invoices.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No hay facturas registradas
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Historial */}
        <TabsContent value="historial" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Registro de Viajes</CardTitle>
              <CardDescription>
                Últimos registros de recogida y entrega
              </CardDescription>
            </CardHeader>
            <CardContent>
              {student.rideHistory.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No hay registros de viajes
                </div>
              ) : (
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

                  <div className="space-y-4">
                    {student.rideHistory.map((log) => {
                      const stCfg = rideStatusConfig[log.status];
                      const StIcon = stCfg.icon;
                      return (
                        <div key={log.id} className="flex gap-4 relative">
                          <div className={`relative z-10 size-10 rounded-full border-2 border-border bg-card flex items-center justify-center shrink-0 ${stCfg.color}`}>
                            <StIcon className="size-4" />
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant={log.type === "Recogida" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {log.type}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`${stCfg.color} border-current text-xs`}
                              >
                                {log.status}
                              </Badge>
                            </div>
                            <p className="text-sm">
                              <span className="font-medium">
                                {new Date(log.date).toLocaleDateString("es-PE", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                })}
                              </span>
                              {" · "}
                              <span className="text-muted-foreground">{log.time}</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {log.stop} · Registrado por: {log.loggedBy}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
