import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  FileText,
  Download,
  CreditCard,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Calendar,
  Banknote,
  Receipt,
  Building2,
  User,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

/* ═══════════════════════════════════════════════
   PLANES DE COBRO (E8)
   ═══════════════════════════════════════════════ */

interface PaymentPlan {
  id: number;
  name: string;
  service: string;
  amount: number;
  frequency: "Mensual" | "Bimestral" | "Trimestral" | "Anual" | "Único";
  collectionDay: number;
  lateFee: number;
  earlyPaymentDiscount: number;
  status: "Activo" | "Inactivo";
}

const initialPlans: PaymentPlan[] = [
  {
    id: 1,
    name: "Plan Regular Mensual",
    service: "Servicio Regular - Mañana",
    amount: 450,
    frequency: "Mensual",
    collectionDay: 5,
    lateFee: 25,
    earlyPaymentDiscount: 5,
    status: "Activo",
  },
  {
    id: 2,
    name: "Plan Regular Tarde",
    service: "Servicio Regular - Tarde",
    amount: 400,
    frequency: "Mensual",
    collectionDay: 5,
    lateFee: 20,
    earlyPaymentDiscount: 5,
    status: "Activo",
  },
  {
    id: 3,
    name: "Plan Completo (Mañana + Tarde)",
    service: "Servicio Completo",
    amount: 800,
    frequency: "Mensual",
    collectionDay: 5,
    lateFee: 40,
    earlyPaymentDiscount: 10,
    status: "Activo",
  },
  {
    id: 4,
    name: "Plan Trimestral con Descuento",
    service: "Servicio Regular - Mañana",
    amount: 1280,
    frequency: "Trimestral",
    collectionDay: 1,
    lateFee: 50,
    earlyPaymentDiscount: 8,
    status: "Activo",
  },
  {
    id: 5,
    name: "Plan Anual Corporativo",
    service: "Servicio Completo",
    amount: 8800,
    frequency: "Anual",
    collectionDay: 1,
    lateFee: 0,
    earlyPaymentDiscount: 12,
    status: "Inactivo",
  },
];

const frequencyLabels: Record<string, string> = {
  Mensual: "Mensual",
  Bimestral: "Bimestral",
  Trimestral: "Trimestral",
  Anual: "Anual",
  "Único": "Único",
};

/* ═══════════════════════════════════════════════
   FACTURACIÓN (E9)
   ═══════════════════════════════════════════════ */

interface Invoice {
  id: number;
  number: string;
  studentName: string;
  period: string;
  baseAmount: number;
  lateFee: number;
  discount: number;
  total: number;
  dueDate: string;
  paymentDate?: string;
  status: "Pagado" | "Pendiente" | "Vencido" | "Cancelado";
  paymentMethod?: string;
  reference?: string;
}

const initialInvoices: Invoice[] = [
  {
    id: 1,
    number: "FAC-2026-0501",
    studentName: "Sofía Ramírez Torres",
    period: "Mayo 2026",
    baseAmount: 450,
    lateFee: 0,
    discount: 5,
    total: 445,
    dueDate: "2026-05-05",
    paymentDate: "2026-05-03",
    status: "Pagado",
    paymentMethod: "Transferencia",
    reference: "BCP-987654321",
  },
  {
    id: 2,
    number: "FAC-2026-0502",
    studentName: "Sebastián Torres Ramírez",
    period: "Mayo 2026",
    baseAmount: 450,
    lateFee: 25,
    discount: 0,
    total: 475,
    dueDate: "2026-05-05",
    status: "Pendiente",
  },
  {
    id: 3,
    number: "FAC-2026-0503",
    studentName: "Valentina Pérez Sánchez",
    period: "Mayo 2026",
    baseAmount: 450,
    lateFee: 0,
    discount: 0,
    total: 450,
    dueDate: "2026-05-05",
    paymentDate: "2026-05-04",
    status: "Pagado",
    paymentMethod: "Efectivo",
    reference: "Recibo #001234",
  },
  {
    id: 4,
    number: "FAC-2026-0504",
    studentName: "Diego Mendoza Castillo",
    period: "Mayo 2026",
    baseAmount: 450,
    lateFee: 0,
    discount: 10,
    total: 440,
    dueDate: "2026-05-05",
    status: "Vencido",
  },
  {
    id: 5,
    number: "FAC-2026-0505",
    studentName: "Luis García Huamán",
    period: "Mayo 2026",
    baseAmount: 400,
    lateFee: 0,
    discount: 5,
    total: 395,
    dueDate: "2026-05-05",
    paymentDate: "2026-05-02",
    status: "Pagado",
    paymentMethod: "Tarjeta",
    reference: "VISA-4567",
  },
  {
    id: 6,
    number: "FAC-2026-0506",
    studentName: "Camila Torres Ríos",
    period: "Mayo 2026",
    baseAmount: 450,
    lateFee: 25,
    discount: 0,
    total: 475,
    dueDate: "2026-05-05",
    status: "Vencido",
  },
  {
    id: 7,
    number: "FAC-2026-0507",
    studentName: "Mateo Quispe López",
    period: "Mayo 2026",
    baseAmount: 800,
    lateFee: 0,
    discount: 10,
    total: 790,
    dueDate: "2026-05-05",
    paymentDate: "2026-05-01",
    status: "Pagado",
    paymentMethod: "Transferencia",
    reference: "INTERBANK-123456",
  },
  {
    id: 8,
    number: "FAC-2026-0508",
    studentName: "Valeria Sánchez Paz",
    period: "Mayo 2026",
    baseAmount: 450,
    lateFee: 0,
    discount: 0,
    total: 450,
    dueDate: "2026-05-05",
    status: "Pendiente",
  },
  {
    id: 9,
    number: "FAC-2026-0509",
    studentName: "Adrián López Vega",
    period: "Mayo 2026",
    baseAmount: 450,
    lateFee: 0,
    discount: 5,
    total: 445,
    dueDate: "2026-05-05",
    status: "Cancelado",
  },
  {
    id: 10,
    number: "FAC-2026-0410",
    studentName: "Isabella Castro Mendoza",
    period: "Abril 2026",
    baseAmount: 450,
    lateFee: 25,
    discount: 0,
    total: 475,
    dueDate: "2026-04-05",
    paymentDate: "2026-04-15",
    status: "Pagado",
    paymentMethod: "Efectivo",
    reference: "Recibo #000987",
  },
  {
    id: 11,
    number: "FAC-2026-0411",
    studentName: "Joaquín Ríos Vargas",
    period: "Abril 2026",
    baseAmount: 450,
    lateFee: 0,
    discount: 5,
    total: 445,
    dueDate: "2026-04-05",
    paymentDate: "2026-04-03",
    status: "Pagado",
    paymentMethod: "Transferencia",
    reference: "BCP-876543210",
  },
  {
    id: 12,
    number: "FAC-2026-0412",
    studentName: "Gabriela Paredes Soto",
    period: "Abril 2026",
    baseAmount: 450,
    lateFee: 0,
    discount: 0,
    total: 450,
    dueDate: "2026-04-05",
    status: "Vencido",
  },
];

const invoiceStatusConfig: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
  Pagado: { color: "bg-success", icon: CheckCircle2, label: "Pagado" },
  Pendiente: { color: "bg-warning", icon: Clock, label: "Pendiente" },
  Vencido: { color: "bg-destructive", icon: AlertTriangle, label: "Vencido" },
  Cancelado: { color: "bg-gray-500", icon: XCircle, label: "Cancelado" },
};

/* ═══════════════════════════════════════════════
   REPORTE DE COBRANZA (E10)
   ═══════════════════════════════════════════════ */

const collectionMonthlyData = [
  { month: "Ene 2026", facturado: 52000, cobrado: 48500 },
  { month: "Feb 2026", facturado: 54000, cobrado: 51000 },
  { month: "Mar 2026", facturado: 56500, cobrado: 53800 },
  { month: "Abr 2026", facturado: 56000, cobrado: 52000 },
  { month: "May 2026", facturado: 58000, cobrado: 42000 },
];

interface CollectionByStudent {
  studentName: string;
  totalFacturado: number;
  pagado: number;
  pendiente: number;
  vencido: number;
  cumplimiento: number;
}

const collectionByStudent: CollectionByStudent[] = [
  { studentName: "Sofía Ramírez Torres", totalFacturado: 2250, pagado: 2250, pendiente: 0, vencido: 0, cumplimiento: 100 },
  { studentName: "Sebastián Torres Ramírez", totalFacturado: 2250, pagado: 1775, pendiente: 475, vencido: 0, cumplimiento: 79 },
  { studentName: "Valentina Pérez Sánchez", totalFacturado: 2250, pagado: 1800, pendiente: 450, vencido: 0, cumplimiento: 80 },
  { studentName: "Diego Mendoza Castillo", totalFacturado: 2250, pagado: 1810, pendiente: 0, vencido: 440, cumplimiento: 80 },
  { studentName: "Luis García Huamán", totalFacturado: 2000, pagado: 2000, pendiente: 0, vencido: 0, cumplimiento: 100 },
  { studentName: "Camila Torres Ríos", totalFacturado: 2250, pagado: 1775, pendiente: 0, vencido: 475, cumplimiento: 79 },
  { studentName: "Mateo Quispe López", totalFacturado: 4000, pagado: 4000, pendiente: 0, vencido: 0, cumplimiento: 100 },
  { studentName: "Valeria Sánchez Paz", totalFacturado: 2250, pagado: 1800, pendiente: 450, vencido: 0, cumplimiento: 80 },
  { studentName: "Adrián López Vega", totalFacturado: 2250, pagado: 1350, pendiente: 0, vencido: 0, cumplimiento: 60 },
  { studentName: "Isabella Castro Mendoza", totalFacturado: 2250, pagado: 2250, pendiente: 0, vencido: 0, cumplimiento: 100 },
];

/* ═══════════════════════════════════════════════
   DIALOGS
   ═══════════════════════════════════════════════ */

function PlanFormDialog({
  plan,
  onSave,
  onCancel,
  title,
}: {
  plan?: PaymentPlan;
  onSave: (data: Partial<PaymentPlan>) => void;
  onCancel: () => void;
  title: string;
}) {
  const [name, setName] = useState(plan?.name || "");
  const [service, setService] = useState(plan?.service || "");
  const [amount, setAmount] = useState(String(plan?.amount || 0));
  const [frequency, setFrequency] = useState(plan?.frequency || "Mensual");
  const [collectionDay, setCollectionDay] = useState(String(plan?.collectionDay || 5));
  const [lateFee, setLateFee] = useState(String(plan?.lateFee || 0));
  const [discount, setDiscount] = useState(String(plan?.earlyPaymentDiscount || 0));

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          Configura los detalles del plan de cobro
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="planname">Nombre del Plan</Label>
          <Input id="planname" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="planservice">Servicio Asociado</Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="planservice">
              <SelectValue placeholder="Seleccionar servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Servicio Regular - Mañana">Servicio Regular - Mañana</SelectItem>
              <SelectItem value="Servicio Regular - Tarde">Servicio Regular - Tarde</SelectItem>
              <SelectItem value="Servicio Completo">Servicio Completo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Monto (S/)</Label>
            <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency">Frecuencia</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger id="frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mensual">Mensual</SelectItem>
                <SelectItem value="Bimestral">Bimestral</SelectItem>
                <SelectItem value="Trimestral">Trimestral</SelectItem>
                <SelectItem value="Anual">Anual</SelectItem>
                <SelectItem value="Único">Único</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="day">Día de cobro</Label>
            <Input id="day" type="number" value={collectionDay} onChange={(e) => setCollectionDay(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="late">Recargo mora (S/)</Label>
            <Input id="late" type="number" value={lateFee} onChange={(e) => setLateFee(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disc">Dto. pronto pago (%)</Label>
            <Input id="disc" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button
          onClick={() =>
            onSave({
              name,
              service,
              amount: Number(amount),
              frequency: frequency as PaymentPlan["frequency"],
              collectionDay: Number(collectionDay),
              lateFee: Number(lateFee),
              earlyPaymentDiscount: Number(discount),
            })
          }
          disabled={!name || !service}
        >
          Guardar Plan
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function PaymentDialog({
  onSave,
  onCancel,
}: {
  onSave: (data: Partial<Invoice>) => void;
  onCancel: () => void;
}) {
  const [invoiceNum, setInvoiceNum] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [reference, setReference] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Registrar Pago</DialogTitle>
        <DialogDescription>
          Registra el pago de una factura
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="invnum">Buscar Factura (#)</Label>
          <Input
            id="invnum"
            placeholder="FAC-2026-0501"
            value={invoiceNum}
            onChange={(e) => setInvoiceNum(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payamount">Monto Recibido (S/)</Label>
          <Input
            id="payamount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="method">Método de Pago</Label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger id="method">
              <SelectValue placeholder="Seleccionar método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Efectivo">Efectivo</SelectItem>
              <SelectItem value="Transferencia">Transferencia</SelectItem>
              <SelectItem value="Tarjeta">Tarjeta</SelectItem>
              <SelectItem value="Otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ref">Número de Referencia</Label>
          <Input
            id="ref"
            placeholder="BCP-987654321"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="receipt">URL del Comprobante</Label>
          <Input
            id="receipt"
            placeholder="https://comprobantes.app/recibo-12345.pdf"
            value={receiptUrl}
            onChange={(e) => setReceiptUrl(e.target.value)}
          />
          {receiptUrl && (
            <div className="mt-1 p-2 rounded border bg-accent/30 text-xs text-muted-foreground flex items-center gap-2">
              <FileText className="size-3" />
              Comprobante cargado: {receiptUrl.split("/").pop()?.substring(0, 30)}...
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button
          onClick={() =>
            onSave({
              number: invoiceNum,
              total: Number(amount),
              paymentMethod: method,
              reference,
            })
          }
          disabled={!invoiceNum || !amount || !method}
        >
          Registrar Pago
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export function EmpresaPagos() {
  const [activeTab, setActiveTab] = useState("planes");
  const [plans, setPlans] = useState<PaymentPlan[]>(initialPlans);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [createPlanOpen, setCreatePlanOpen] = useState(false);
  const [editPlan, setEditPlan] = useState<PaymentPlan | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const [searchPlan, setSearchPlan] = useState("");
  const [searchInvoice, setSearchInvoice] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterStudent, setFilterStudent] = useState("");
  const [reportDateFrom, setReportDateFrom] = useState("2026-01-01");
  const [reportDateTo, setReportDateTo] = useState("2026-05-31");

  const filteredPlans = plans.filter(
    (p) =>
      !searchPlan ||
      p.name.toLowerCase().includes(searchPlan.toLowerCase()) ||
      p.service.toLowerCase().includes(searchPlan.toLowerCase())
  );

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      !searchInvoice ||
      inv.number.toLowerCase().includes(searchInvoice.toLowerCase()) ||
      inv.studentName.toLowerCase().includes(searchInvoice.toLowerCase());
    const matchesStatus = filterStatus === "all" || inv.status === filterStatus;
    const matchesStudent =
      !filterStudent ||
      inv.studentName.toLowerCase().includes(filterStudent.toLowerCase());
    const matchesDateFrom = !filterDateFrom || inv.dueDate >= filterDateFrom;
    const matchesDateTo = !filterDateTo || inv.dueDate <= filterDateTo;
    return matchesSearch && matchesStatus && matchesStudent && matchesDateFrom && matchesDateTo;
  });

  /* Reporte calculations */
  const totalFacturado = collectionByStudent.reduce((s, x) => s + x.totalFacturado, 0);
  const totalCobrado = collectionByStudent.reduce((s, x) => s + x.pagado, 0);
  const totalPendiente = collectionByStudent.reduce((s, x) => s + x.pendiente, 0);
  const totalVencido = collectionByStudent.reduce((s, x) => s + x.vencido, 0);
  const porcentajeCobranza = Math.round((totalCobrado / totalFacturado) * 100);

  const chartConfig = {
    facturado: { label: "Facturado", color: "#2563EB" },
    cobrado: { label: "Cobrado", color: "#16A34A" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Pagos</h2>
          <p className="text-muted-foreground">
            Administra planes de cobro y facturación
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="planes">
            <Building2 className="size-4 mr-1" />
            Planes de Cobro
          </TabsTrigger>
          <TabsTrigger value="facturacion">
            <Receipt className="size-4 mr-1" />
            Facturación
          </TabsTrigger>
          <TabsTrigger value="reportes">
            <BarChart3 className="size-4 mr-1" />
            Reporte de Cobranza
          </TabsTrigger>
        </TabsList>

        {/* ═════ PLANES DE COBRO ═════ */}
        <TabsContent value="planes" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-sm relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar planes..."
                className="pl-10"
                value={searchPlan}
                onChange={(e) => setSearchPlan(e.target.value)}
              />
            </div>
            <Dialog open={createPlanOpen} onOpenChange={setCreatePlanOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Plus className="mr-2 size-4" />
                  Nuevo Plan
                </Button>
              </DialogTrigger>
              <PlanFormDialog
                title="Nuevo Plan de Cobro"
                onSave={(data) => {
                  setPlans([
                    ...plans,
                    {
                      id: Math.max(0, ...plans.map((p) => p.id)) + 1,
                      name: data.name || "",
                      service: data.service || "",
                      amount: data.amount || 0,
                      frequency: data.frequency || "Mensual",
                      collectionDay: data.collectionDay || 5,
                      lateFee: data.lateFee || 0,
                      earlyPaymentDiscount: data.earlyPaymentDiscount || 0,
                      status: "Activo",
                    },
                  ]);
                  setCreatePlanOpen(false);
                }}
                onCancel={() => setCreatePlanOpen(false)}
              />
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="rounded-md table-responsive">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead>Frecuencia</TableHead>
                      <TableHead className="text-center">Día de cobro</TableHead>
                      <TableHead className="text-right">Recargo mora</TableHead>
                      <TableHead className="text-right">Dto. PP (%)</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell className="text-muted-foreground">{plan.service}</TableCell>
                        <TableCell className="text-right font-medium">
                          S/ {plan.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{plan.frequency}</TableCell>
                        <TableCell className="text-center">{plan.collectionDay}</TableCell>
                        <TableCell className="text-right text-destructive">
                          S/ {plan.lateFee.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-success">
                          {plan.earlyPaymentDiscount}%
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={plan.status === "Activo" ? "default" : "secondary"}
                          >
                            {plan.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditPlan(plan)}
                            >
                              Editar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={plan.status === "Inactivo" ? "text-success hover:text-success" : "text-destructive hover:text-destructive"}
                              onClick={() => {
                                setPlans(
                                  plans.map((p) =>
                                    p.id === plan.id
                                      ? { ...p, status: p.status === "Activo" ? "Inactivo" as const : "Activo" as const }
                                      : p
                                  )
                                );
                              }}
                            >
                              {plan.status === "Activo" ? "Desactivar" : "Activar"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPlans.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                          No se encontraron planes
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Dialog open={!!editPlan} onOpenChange={(open) => !open && setEditPlan(null)}>
            {editPlan && (
              <PlanFormDialog
                title="Editar Plan de Cobro"
                plan={editPlan}
                onSave={(data) => {
                  setPlans(
                    plans.map((p) =>
                      p.id === editPlan.id
                        ? {
                            ...p,
                            name: data.name || p.name,
                            service: data.service || p.service,
                            amount: data.amount ?? p.amount,
                            frequency: data.frequency || p.frequency,
                            collectionDay: data.collectionDay ?? p.collectionDay,
                            lateFee: data.lateFee ?? p.lateFee,
                            earlyPaymentDiscount: data.earlyPaymentDiscount ?? p.earlyPaymentDiscount,
                          }
                        : p
                    )
                  );
                  setEditPlan(null);
                }}
                onCancel={() => setEditPlan(null)}
              />
            )}
          </Dialog>
        </TabsContent>

        {/* ═════ FACTURACIÓN ═════ */}
        <TabsContent value="facturacion" className="space-y-4 mt-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex gap-3 flex-1 flex-wrap">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar factura..."
                  className="pl-10"
                  value={searchInvoice}
                  onChange={(e) => setSearchInvoice(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 size-4" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Pagado">Pagado</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Vencido">Vencido</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="w-[150px]"
                placeholder="Desde"
              />
              <Input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="w-[150px]"
                placeholder="Hasta"
              />
              <div className="min-w-[180px] relative">
                <Input
                  placeholder="Filtrar por estudiante..."
                  value={filterStudent}
                  onChange={(e) => setFilterStudent(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Download className="mr-1 size-4" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-1 size-4" />
                Excel
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="mr-1 size-4" />
                Generar Facturas del Mes
              </Button>
              <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Banknote className="mr-1 size-4" />
                    Registrar Pago
                  </Button>
                </DialogTrigger>
                <PaymentDialog
                  onSave={(data) => {
                    const target = invoices.find((i) => i.number === data.number);
                    if (target) {
                      setInvoices(
                        invoices.map((i) =>
                          i.id === target.id
                            ? {
                                ...i,
                                status: "Pagado" as const,
                                paymentDate: new Date().toISOString().split("T")[0],
                                paymentMethod: data.paymentMethod,
                                reference: data.reference,
                              }
                            : i
                        )
                      );
                    }
                    setPaymentOpen(false);
                  }}
                  onCancel={() => setPaymentOpen(false)}
                />
              </Dialog>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="rounded-md table-responsive">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead># Factura</TableHead>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Periodo</TableHead>
                      <TableHead className="text-right">Monto base</TableHead>
                      <TableHead className="text-right">Recargo</TableHead>
                      <TableHead className="text-right">Descuento</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Fecha límite</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((inv) => {
                      const statusCfg = invoiceStatusConfig[inv.status];
                      const StatusIcon = statusCfg.icon;
                      return (
                        <TableRow key={inv.id}>
                          <TableCell className="font-mono text-sm">{inv.number}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="size-3 text-muted-foreground" />
                              {inv.studentName}
                            </div>
                          </TableCell>
                          <TableCell>{inv.period}</TableCell>
                          <TableCell className="text-right">
                            S/ {inv.baseAmount.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right text-destructive">
                            {inv.lateFee > 0 ? `S/ ${inv.lateFee.toFixed(2)}` : "—"}
                          </TableCell>
                          <TableCell className="text-right text-success">
                            {inv.discount > 0 ? `S/ ${inv.discount.toFixed(2)}` : "—"}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            S/ {inv.total.toFixed(2)}
                          </TableCell>
                          <TableCell>{new Date(inv.dueDate).toLocaleDateString("es-PE")}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${statusCfg.color} text-white border-0`}
                            >
                              <StatusIcon className="size-3 mr-1" />
                              {statusCfg.label}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filteredInvoices.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                          No se encontraron facturas
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ═════ REPORTE DE COBRANZA ═════ */}
        <TabsContent value="reportes" className="space-y-4 mt-4">
          {/* Date range filter */}
          <div className="flex items-center gap-3">
            <Label className="text-sm shrink-0">Rango de fechas:</Label>
            <Input
              type="date"
              value={reportDateFrom}
              onChange={(e) => setReportDateFrom(e.target.value)}
              className="w-auto"
            />
            <span className="text-muted-foreground text-sm">a</span>
            <Input
              type="date"
              value={reportDateTo}
              onChange={(e) => setReportDateTo(e.target.value)}
              className="w-auto"
            />
          </div>

          {/* Summary cards */}
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Facturado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">S/ {totalFacturado.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Cobrado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-success">S/ {totalCobrado.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pendiente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-warning">S/ {totalPendiente.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Vencido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-destructive">S/ {totalVencido.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">% Cobranza</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-primary">{porcentajeCobranza}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Bar chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-5 text-success" />
                Cobranza por Mes
              </CardTitle>
              <CardDescription>Facturado vs Cobrado — Últimos 5 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={collectionMonthlyData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} tickMargin={8} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                    tickMargin={8}
                    tickFormatter={(v) => `${(v / 1000)}k`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => [
                          `S/ ${Number(value).toLocaleString()}`,
                          name === "facturado" ? "Facturado" : "Cobrado",
                        ]}
                      />
                    }
                  />
                  <Bar dataKey="facturado" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cobrado" fill="#16A34A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Student breakdown table */}
          <Card>
            <CardHeader>
              <CardTitle>Desglose por Estudiante</CardTitle>
              <CardDescription>
                Cumplimiento de pagos — {collectionByStudent.length} estudiantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead className="text-right">Total Facturado</TableHead>
                      <TableHead className="text-right">Pagado</TableHead>
                      <TableHead className="text-right">Pendiente</TableHead>
                      <TableHead className="text-right">Vencido</TableHead>
                      <TableHead className="w-[200px]">% Cumplimiento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {collectionByStudent.map((row) => (
                      <TableRow key={row.studentName}>
                        <TableCell className="font-medium">{row.studentName}</TableCell>
                        <TableCell className="text-right">
                          S/ {row.totalFacturado.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-success">
                          S/ {row.pagado.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-warning">
                          {row.pendiente > 0 ? `S/ ${row.pendiente.toLocaleString()}` : "—"}
                        </TableCell>
                        <TableCell className="text-right text-destructive">
                          {row.vencido > 0 ? `S/ ${row.vencido.toLocaleString()}` : "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={row.cumplimiento}
                              className="h-2 flex-1"
                            />
                            <span className="text-sm font-medium w-10 text-right">
                              {row.cumplimiento}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
