import { useState } from "react";
import { Phone, Navigation, MapPin, Car, User, AlertTriangle, Bus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const driver = { name: "Carlos Mendoza Quispe", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza", phone: "+51 987 654 321" };
const assistant = { name: "Rosa María Huamán", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=RosaHuaman", phone: "+51 932 109 876" };
const vehicle = { plate: "AQP-832", model: "Mercedes-Benz Sprinter", photo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=150&fit=crop" };

const stopsData = [
  { x: 20, y: 25, type: "home" as const, label: "Casa — Calle Los Pinos #45", isStudentStop: true },
  { x: 38, y: 40, type: "pin" as const, label: "Av. Arequipa 1200" },
  { x: 52, y: 35, type: "pin" as const, label: "Jr. Los Olivos 234" },
  { x: 72, y: 50, type: "school" as const, label: "Colegio San Francisco" },
];

export function FamiliaTracking({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [busPos, setBusPos] = useState({ x: 35, y: 32 });
  const [sheetExpanded, setSheetExpanded] = useState(false);

  const moveBus = () => {
    setBusPos((prev) => {
      const idx = Math.floor(Math.random() * 4);
      const targets = [{ x: 25, y: 28 }, { x: 40, y: 38 }, { x: 55, y: 32 }, { x: 68, y: 48 }];
      return targets[idx];
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* SVG Map */}
      <div className="flex-1 relative min-h-[350px]" onClick={moveBus}>
        <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <defs>
            <pattern id="fgrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#e2e8f0" strokeWidth="0.3" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="100" height="100" fill="url(#fgrid)" />

          {/* Route polyline */}
          <path
            d="M20,25 L38,40 L52,35 L72,50"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeDasharray="4,2"
            opacity="0.5"
          />

          {/* Stop markers */}
          {stopsData.map((stop, i) => (
            <g key={i}>
              {stop.isStudentStop && (
                <>
                  <circle cx={stop.x} cy={stop.y} r="7" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.3">
                    <animate attributeName="r" from="6" to="10" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {stop.type === "home" && (
                <g>
                  <circle cx={stop.x} cy={stop.y} r="4.5" fill="#EF4444" stroke="white" strokeWidth="1" filter="url(#glow)" />
                  <text x={stop.x} y={stop.y + 1.2} textAnchor="middle" fill="white" fontSize="2.5" fontWeight="bold">H</text>
                  <text x={stop.x} y={stop.y + 9} textAnchor="middle" fill="#EF4444" fontSize="2.2" fontWeight="bold">Tu parada</text>
                </g>
              )}
              {stop.type === "school" && (
                <g>
                  <rect x={stop.x - 4} y={stop.y - 4} width="8" height="8" rx="2" fill="#1E293B" stroke="white" strokeWidth="0.8" />
                  <text x={stop.x} y={stop.y + 1.2} textAnchor="middle" fill="white" fontSize="3">C</text>
                  <text x={stop.x} y={stop.y + 9} textAnchor="middle" fill="#64748B" fontSize="2.2">Colegio</text>
                </g>
              )}
              {stop.type === "pin" && (
                <g>
                  <circle cx={stop.x} cy={stop.y} r="3.5" fill="#94A3B8" stroke="white" strokeWidth="0.8" />
                  <text x={stop.x} y={stop.y + 8} textAnchor="middle" fill="#94A3B8" fontSize="2">{i + 1}</text>
                </g>
              )}
            </g>
          ))}

          {/* Bus marker */}
          <g>
            {/* Pulse */}
            <circle cx={busPos.x} cy={busPos.y} r="5" fill="#2563EB" opacity="0.2">
              <animate attributeName="r" from="5" to="10" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            {/* Bus */}
            <rect x={busPos.x - 3} y={busPos.y - 5} width="6" height="10" rx="2.5" fill="#2563EB" stroke="white" strokeWidth="1" />
            <text x={busPos.x} y={busPos.y + 0.8} textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">🚌</text>
          </g>

          {/* ETA floating card */}
          <g transform={`translate(${busPos.x + 6}, ${busPos.y - 8})`}>
            <rect x={-18} y={-5} width="18" height="10" rx="3" fill="white" stroke="#2563EB" strokeWidth="0.5" filter="url(#glow)" />
            <text x={-9} y={-0.2} textAnchor="middle" fill="#2563EB" fontSize="2.5" fontWeight="bold">ETA 3 min</text>
            <text x={-9} y={3} textAnchor="middle" fill="#64748B" fontSize="1.8">a tu parada</text>
          </g>

          {/* Click hint */}
          <text x="50" y="95" textAnchor="middle" fill="#94A3B8" fontSize="2.5">
            Toca el mapa para mover el bus
          </text>
        </svg>
      </div>

      {/* Bottom Sheet */}
      <div className={`border-t border-border bg-card transition-all ${sheetExpanded ? "h-[280px]" : "h-[130px]"}`}>
        <div
          className="p-2 flex justify-center cursor-pointer"
          onClick={() => setSheetExpanded(!sheetExpanded)}
        >
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <div className="px-4 pb-4 space-y-3">
          {/* Status */}
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-semibold">En camino — ETA 3 min a tu parada</span>
          </div>

          {/* Staff info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={driver.photo} alt="" className="size-10 rounded-full border" />
              <div>
                <p className="text-sm font-medium">{driver.name}</p>
                <p className="text-xs text-muted-foreground">Chofer</p>
              </div>
            </div>
            {sheetExpanded && (
              <Button size="sm" variant="outline" className="gap-1">
                <Phone className="size-3" />
                Llamar
              </Button>
            )}
          </div>

          {sheetExpanded && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={assistant.photo} alt="" className="size-10 rounded-full border" />
                  <div>
                    <p className="text-sm font-medium">{assistant.name}</p>
                    <p className="text-xs text-muted-foreground">Asistente</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-1">
                  <Phone className="size-3" />
                  Llamar
                </Button>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/30">
                <img src={vehicle.photo} alt="" className="w-14 h-10 rounded object-cover" />
                <div>
                  <p className="font-medium text-sm">{vehicle.plate}</p>
                  <p className="text-xs text-muted-foreground">{vehicle.model}</p>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => onNavigate("reportar")}>
                <AlertTriangle className="mr-1 size-4" />
                Reportar novedad
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
