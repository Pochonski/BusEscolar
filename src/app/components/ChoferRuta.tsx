import { useState } from "react";
import { Clock, CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface StudentAtStop {
  id: number;
  name: string;
  photo: string;
  status: "pending" | "picked_up" | "absent";
}

interface StopInfo {
  id: number;
  label: string;
  time: string;
  students: StudentAtStop[];
}

const initialStops: StopInfo[] = [
  {
    id: 1,
    label: "Parada 1 — Calle Los Pinos #45",
    time: "6:45 AM",
    students: [
      { id: 101, name: "Sofía Ramírez Torres", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia", status: "picked_up" },
      { id: 102, name: "Diego Mendoza Castillo", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego", status: "picked_up" },
    ],
  },
  {
    id: 2,
    label: "Parada 2 — Av. Arequipa 1200",
    time: "7:00 AM",
    students: [
      { id: 103, name: "Luis García Huamán", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuisGarcia", status: "pending" },
      { id: 104, name: "Camila Torres Ríos", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camila", status: "picked_up" },
    ],
  },
  {
    id: 3,
    label: "Parada 3 — Jr. Los Olivos 234",
    time: "7:10 AM",
    students: [
      { id: 105, name: "Mateo Quispe López", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mateo", status: "pending" },
      { id: 106, name: "Valeria Sánchez Paz", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valeria", status: "pending" },
    ],
  },
];

export function ChoferRuta({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [stops, setStops] = useState<StopInfo[]>(initialStops);
  const [routeActive, setRouteActive] = useState(true);
  const [tripType, setTripType] = useState<"Mañana" | "Tarde">("Mañana");
  const [clickingId, setClickingId] = useState<number | null>(null);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

  const updateStudent = (stopId: number, studentId: number, newStatus: "picked_up" | "absent") => {
    setClickingId(studentId);
    setTimeout(() => {
      setStops((prev) =>
        prev.map((stop) =>
          stop.id === stopId
            ? {
                ...stop,
                students: stop.students.map((s) =>
                  s.id === studentId ? { ...s, status: s.status === newStatus ? "pending" : newStatus } : s
                ),
              }
            : stop
        )
      );
      setClickingId(null);
    }, 500);
  };

  const isStopComplete = (stop: StopInfo) =>
    stop.students.every((s) => s.status !== "pending");

  const totalStudents = stops.reduce((sum, s) => sum + s.students.length, 0);
  const processedCount = stops.reduce(
    (sum, s) => sum + s.students.filter((st) => st.status !== "pending").length,
    0
  );

  return (
    <div className="p-4 space-y-4 relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm opacity-80">Ruta Norte • AQP-832</p>
            <h2 className="text-xl font-bold">{tripType === "Mañana" ? "Recogida matutina" : "Entrega vespertina"}</h2>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{timeStr}</div>
            <p className="text-xs opacity-70">{processedCount}/{totalStudents} recogidos</p>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <Button
            size="sm"
            variant={tripType === "Mañana" ? "secondary" : "ghost"}
            className="text-white border-white/20"
            onClick={() => setTripType("Mañana")}
          >
            Mañana
          </Button>
          <Button
            size="sm"
            variant={tripType === "Tarde" ? "secondary" : "ghost"}
            className="text-white border-white/20"
            onClick={() => setTripType("Tarde")}
          >
            Tarde
          </Button>
        </div>

        {routeActive && (
          <div className="flex items-center gap-2 mb-3 px-2 py-1.5 rounded-full bg-white/15 text-xs">
            <div className="size-2 rounded-full bg-success animate-pulse" />
            <span>GPS transmitiendo ubicación en vivo</span>
          </div>
        )}

        <Button
          variant="secondary"
          size="sm"
          className="w-full text-primary"
          onClick={() => setRouteActive(!routeActive)}
        >
          {routeActive ? "Finalizar Ruta" : "Iniciar Ruta"}
        </Button>
      </div>

      {/* Stop Checklist */}
      <div className="space-y-3">
        {stops.map((stop) => {
          const complete = isStopComplete(stop);
          return (
            <Card
              key={stop.id}
              className={`overflow-hidden ${
                complete ? "border-success border-2" : ""
              }`}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{stop.id}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{stop.label}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="size-3" />
                          {stop.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  {complete && (
                    <Badge className="bg-success text-white border-0">
                      <CheckCircle2 className="size-3 mr-1" />
                      Completado
                    </Badge>
                  )}
                </div>

                <div className="space-y-1.5 mt-2">
                  {stop.students.map((student) => (
                    <div
                      key={student.id}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        student.status === "picked_up"
                          ? "bg-success/10"
                          : student.status === "absent"
                          ? "bg-destructive/10"
                          : "bg-accent/20"
                      }`}
                    >
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="size-8 rounded-full border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(student.name)}`;
                        }}
                      />
                      <span className="flex-1 text-sm truncate">{student.name}</span>

                      {student.status === "pending" && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => updateStudent(stop.id, student.id, "picked_up")}
                            disabled={clickingId === student.id}
                          >
                            {clickingId === student.id ? (
                              <Loader2 className="size-3 mr-1 animate-spin" />
                            ) : (
                              <CheckCircle2 className="size-3 mr-1" />
                            )}
                            Recoger
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-7 text-xs"
                            onClick={() => updateStudent(stop.id, student.id, "absent")}
                          >
                            <XCircle className="size-3 mr-1" />
                            Ausente
                          </Button>
                        </div>
                      )}

                      {student.status === "picked_up" && (
                        <Badge className="bg-success text-white border-0">
                          <CheckCircle2 className="size-3 mr-1" />
                          Recogido
                        </Badge>
                      )}

                      {student.status === "absent" && (
                        <Badge variant="destructive">
                          <XCircle className="size-3 mr-1" />
                          Ausente
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAB Reportar */}
      <button
        className="fixed bottom-20 right-4 size-14 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors z-10"
        style={{ maxWidth: "calc(50% + 160px)" }}
        onClick={() => onNavigate("reportar")}
      >
        <AlertTriangle className="size-6" />
      </button>
    </div>
  );
}
