import { useState } from "react";
import { AlertTriangle, CheckCircle2, Send, Camera } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const incidentTypes = [
  "Retraso",
  "Falla del vehículo",
  "Cambio de ruta forzado",
  "Emergencia",
  "Clima adverso",
  "Estudiante no recogido",
];

export function ChoferReportar() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  if (submitted) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="size-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="size-10 text-success" />
        </div>
        <h2 className="text-xl font-bold mb-2">Incidencia Reportada</h2>
        <p className="text-muted-foreground mb-6">
          La central ha sido notificada. Gracias por reportar.
        </p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setType(""); setSeverity(""); setTitle(""); setDescription(""); setPhotoUrl(""); }}>
          Reportar otra incidencia
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
            <h2 className="text-lg font-bold">Reportar Incidencia</h2>
          </div>

          {/* Quick-select type */}
          <div className="space-y-2">
            <Label>Tipo de Incidencia</Label>
            <div className="grid grid-cols-2 gap-2">
              {incidentTypes.map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant={type === t ? "default" : "outline"}
                  size="sm"
                  className="text-xs justify-start"
                  onClick={() => setType(t)}
                >
                  <AlertTriangle className="size-3 mr-1" />
                  {t}
                </Button>
              ))}
            </div>
          </div>

          {/* Severity */}
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
                            s === "Info" ? "#2563EB" : s === "Warning" ? "#F97316" : "#EF4444",
                        }
                      : undefined
                  }
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dtitle">Título</Label>
            <Input
              id="dtitle"
              placeholder="Describe brevemente"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ddesc">Descripción</Label>
            <textarea
              id="ddesc"
              className="w-full min-h-[100px] rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Detalles de la incidencia..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dphoto">Adjuntar foto (URL)</Label>
            <Input
              id="dphoto"
              placeholder="https://..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            {photoUrl && (
              <div className="p-2 rounded-lg bg-accent/30 text-xs flex items-center gap-2">
                <Camera className="size-3" />
                Foto adjuntada
              </div>
            )}
          </div>

          <Button
            className="w-full"
            disabled={!type || !severity || !title || !description}
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
