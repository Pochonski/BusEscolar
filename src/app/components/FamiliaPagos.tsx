import { useState } from "react";
import { CreditCard, CheckCircle2, Clock, AlertCircle, XCircle, FileText, Banknote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FamilyInvoice {
  id: number;
  period: string;
  amount: number;
  status: "Pagado" | "Pendiente" | "Vencido";
  paymentDate?: string;
  receiptUrl?: string;
}

const initialInvoices: FamilyInvoice[] = [
  { id: 1, period: "Mayo 2026", amount: 445, status: "Pagado", paymentDate: "2026-05-03", receiptUrl: "https://comprobantes.app/recibo-FAC501.pdf" },
  { id: 2, period: "Abril 2026", amount: 450, status: "Pagado", paymentDate: "2026-04-02", receiptUrl: "https://comprobantes.app/recibo-FAC401.pdf" },
  { id: 3, period: "Marzo 2026", amount: 450, status: "Pagado", paymentDate: "2026-03-04", receiptUrl: "https://comprobantes.app/recibo-FAC301.pdf" },
  { id: 4, period: "Febrero 2026", amount: 450, status: "Pagado", paymentDate: "2026-02-01", receiptUrl: "https://comprobantes.app/recibo-FAC201.pdf" },
  { id: 5, period: "Enero 2026", amount: 450, status: "Pagado", paymentDate: "2026-01-03" },
];

const statusCfg: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
  Pagado: { color: "bg-success", icon: CheckCircle2, label: "Pagado" },
  Pendiente: { color: "bg-warning", icon: Clock, label: "Pendiente" },
  Vencido: { color: "bg-destructive", icon: AlertCircle, label: "Vencido" },
};

export function FamiliaPagos() {
  const [invoices, setInvoices] = useState<FamilyInvoice[]>(initialInvoices);
  const [payOpen, setPayOpen] = useState(false);

  const pendingInvoice = invoices.find((i) => i.status === "Vencido");
  const hasOverdue = pendingInvoice != null;

  return (
    <div className="p-4 space-y-4">
      {/* Pending alert */}
      {hasOverdue && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="size-5 text-destructive" />
            <h3 className="font-bold text-destructive">Pago Vencido</h3>
          </div>
          <p className="text-sm mb-2">
            Factura de {pendingInvoice.period} — S/ {pendingInvoice.amount.toFixed(2)}
          </p>
          <Dialog open={payOpen} onOpenChange={setPayOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive" className="w-full">
                <Banknote className="mr-1 size-4" />
                Pagar ahora
              </Button>
            </DialogTrigger>
            <PaymentModal
              invoice={pendingInvoice}
              onSave={(data) => {
                setInvoices(
                  invoices.map((i) =>
                    i.id === pendingInvoice.id
                      ? { ...i, status: "Pagado" as const, paymentDate: new Date().toISOString().split("T")[0], receiptUrl: data.receiptUrl }
                      : i
                  )
                );
                setPayOpen(false);
              }}
              onCancel={() => setPayOpen(false)}
            />
          </Dialog>
        </div>
      )}

      {/* Invoice History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="size-4 text-primary" />
            Historial de Pagos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {invoices.map((inv) => {
              const sc = statusCfg[inv.status];
              const SI = sc.icon;
              return (
                <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                  <div>
                    <p className="font-medium text-sm">{inv.period}</p>
                    <p className="text-lg font-bold">S/ {inv.amount.toFixed(2)}</p>
                    {inv.paymentDate && (
                      <p className="text-xs text-muted-foreground">
                        Pagado: {new Date(inv.paymentDate).toLocaleDateString("es-PE")}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge className={`${sc.color} text-white border-0 mb-1`}>
                      <SI className="size-3 mr-1" />
                      {sc.label}
                    </Badge>
                    {inv.receiptUrl && inv.status === "Pagado" && (
                      <a href={inv.receiptUrl} className="text-xs text-primary flex items-center gap-1 mt-1" target="_blank">
                        <FileText className="size-3" />
                        Ver comprobante
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PaymentModal({
  invoice,
  onSave,
  onCancel,
}: {
  invoice: FamilyInvoice;
  onSave: (data: { receiptUrl?: string }) => void;
  onCancel: () => void;
}) {
  const [method, setMethod] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");

  return (
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle>Realizar Pago</DialogTitle>
        <DialogDescription>
          {invoice.period} — S/ {invoice.amount.toFixed(2)}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="p-4 rounded-lg bg-accent/50 text-center">
          <p className="text-2xl font-bold text-primary">S/ {invoice.amount.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">{invoice.period}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fpmethod">Método de Pago</Label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger id="fpmethod">
              <SelectValue placeholder="Seleccionar método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Efectivo">Efectivo</SelectItem>
              <SelectItem value="Transferencia">Transferencia</SelectItem>
              <SelectItem value="Tarjeta">Tarjeta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fpreceipt">URL del Comprobante</Label>
          <Input
            id="fpreceipt"
            placeholder="https://comprobantes.app/..."
            value={receiptUrl}
            onChange={(e) => setReceiptUrl(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button onClick={() => onSave({ receiptUrl })} disabled={!method}>
          <CheckCircle2 className="mr-1 size-4" />
          Confirmar Pago
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
