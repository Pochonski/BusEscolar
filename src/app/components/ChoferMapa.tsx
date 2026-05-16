import { Navigation, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function ChoferMapa() {
  return (
    <div className="p-4 space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <svg viewBox="0 0 100 100" className="w-full h-[400px] bg-gradient-to-br from-slate-50 to-blue-50">
            <defs>
              <pattern id="dgrid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#e2e8f0" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dgrid)" />

            {/* Route line */}
            <path d="M20,25 L35,40 L50,35 L65,50 L75,45" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="6,3" opacity="0.7" />

            {/* Stops */}
            {[
              { x: 20, y: 25, n: 1, c: "#2563EB" },
              { x: 35, y: 40, n: 2, c: "#2563EB" },
              { x: 50, y: 35, n: 3, c: "#16A34A" },
              { x: 65, y: 50, n: "C", c: "#1E293B" },
              { x: 75, y: 45, n: 4, c: "#2563EB" },
            ].map((s, i) => (
              <g key={i}>
                <circle cx={s.x} cy={s.y} r="6" fill={s.c} opacity="0.1" />
                <circle cx={s.x} cy={s.y} r="3.5" fill={s.c} stroke="white" strokeWidth="1.2" />
                <text x={s.x} y={s.y + 0.8} textAnchor="middle" fill="white" fontSize="2.5" fontWeight="bold">{s.n}</text>
              </g>
            ))}

            {/* Bus */}
            <g>
              <circle cx="40" cy="38" r="5" fill="#2563EB" opacity="0.2">
                <animate attributeName="r" from="5" to="9" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <rect x="37" y="33" width="6" height="10" rx="2.5" fill="#2563EB" stroke="white" strokeWidth="1" />
              <text x="40" y="38.5" textAnchor="middle" fill="white" fontSize="3">🚌</text>
            </g>

            <text x="50" y="93" textAnchor="middle" fill="#94A3B8" fontSize="2.5">Ruta Norte • AQP-832</text>
          </svg>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium">En ruta — ETA colegio: 7:30 AM</span>
        </div>
        <Badge variant="default">3/8 paradas</Badge>
      </div>
    </div>
  );
}
