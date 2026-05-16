import { useState } from "react";
import { AlertTriangle, CheckCircle2, Send } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const eventTypes = [
  "Ausencia planificada",
  "Llegaré tarde",
  "Cambio de dirección",
  "Emergencia",
  "Otro",
];

export function FamiliaReportar() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  if (submitted) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="size-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="size-10 text-success" />
        </div>
        <h2 className="text-xl font-bold mb-2">Novedad Reportada</h2>
        <p className="text-muted-foreground mb-6">
          La empresa ha sido notificada. Te contactarán si necesitan más información.
        </p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setType(""); setDate(""); setDescription(""); }}>
          Reportar otra novedad
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="size-5 text-orange-500" />
            <h2 className="text-lg font-bold">Reportar Novedad</h2>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ftype">Tipo de evento</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="ftype">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(type === "Ausencia planificada" || type === "Llegaré tarde") && (
            <div className="space-y-2">
              <Label htmlFor="fdate">Fecha</Label>
              <Input
                id="fdate"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fdesc">Descripción</Label>
            <textarea
              id="fdesc"
              className="w-full min-h-[120px] rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Describe los detalles de la novedad..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            disabled={!type || !description}
            onClick={() => setSubmitted(true)}
          >
            <Send className="mr-2 size-4" />
            Enviar Reporte
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
