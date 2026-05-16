import { useState } from "react";
import {
  Plus,
  MapPin,
  Route,
  Car,
  Users,
  GripVertical,
  X,
  Clock,
  Navigation,
  Search,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
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

interface Stop {
  id: number;
  label: string;
  address: string;
  pickupTime: string;
  dropoffTime: string;
  assignedStudents: string[];
}

interface RouteData {
  id: number;
  name: string;
  service: string;
  vehiclePlate: string;
  vehiclePhoto: string;
  driverName: string;
  driverPhoto: string;
  assistantName: string;
  assistantPhoto: string;
  stops: Stop[];
  active: boolean;
  studentsCount: number;
}

const mockStudents = [
  "Sofía Ramírez Torres",
  "Sebastián Torres Ramírez",
  "Valentina Pérez Sánchez",
  "Diego Mendoza Castillo",
  "Luis García Huamán",
  "Camila Torres Ríos",
  "Mateo Quispe López",
  "Valeria Sánchez Paz",
  "Adrián López Vega",
  "Isabella Castro Mendoza",
  "Joaquín Ríos Vargas",
  "Gabriela Paredes Soto",
  "Andrés Huamán Díaz",
  "Ximena Flores Cruz",
  "Daniel Quiroz León",
];

const mockVehicles = [
  { plate: "AQP-832", photo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100&h=80&fit=crop" },
  { plate: "BXK-445", photo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=100&h=80&fit=crop" },
  { plate: "CML-912", photo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=80&fit=crop" },
  { plate: "DTX-556", photo: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=100&h=80&fit=crop" },
  { plate: "EPL-445", photo: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=100&h=80&fit=crop" },
  { plate: "GML-789", photo: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=100&h=80&fit=crop" },
];

const mockDrivers = [
  { name: "Carlos Mendoza Quispe", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza" },
  { name: "Luis Alberto Paredes Cruz", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuisParedes" },
  { name: "Roberto Vargas Huamán", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=RobertoVargas" },
  { name: "Juan Pérez Gutiérrez", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=JuanPerez" },
];

const mockAssistants = [
  { name: "Rosa María Huamán Castillo", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=RosaHuaman" },
  { name: "Ana Patricia Flores Vega", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnaFlores" },
  { name: "María López Chávez", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariaLopez" },
];

const initialRoutes: RouteData[] = [
  {
    id: 1,
    name: "Ruta Norte",
    service: "Servicio Regular - Mañana",
    vehiclePlate: "AQP-832",
    vehiclePhoto: mockVehicles[0].photo,
    driverName: mockDrivers[0].name,
    driverPhoto: mockDrivers[0].photo,
    assistantName: mockAssistants[0].name,
    assistantPhoto: mockAssistants[0].photo,
    active: true,
    studentsCount: 15,
    stops: [
      {
        id: 1,
        label: "Parada 1 — Calle Los Pinos #45",
        address: "Calle Los Pinos #45, San Isidro",
        pickupTime: "6:45 AM",
        dropoffTime: "3:15 PM",
        assignedStudents: ["Sofía Ramírez Torres", "Diego Mendoza Castillo"],
      },
      {
        id: 2,
        label: "Parada 2 — Av. Arequipa 1200",
        address: "Av. Arequipa 1200, Miraflores",
        pickupTime: "7:00 AM",
        dropoffTime: "3:00 PM",
        assignedStudents: ["Luis García Huamán", "Camila Torres Ríos"],
      },
      {
        id: 3,
        label: "Parada 3 — Jr. Los Olivos 234",
        address: "Jr. Los Olivos 234, San Isidro",
        pickupTime: "7:10 AM",
        dropoffTime: "2:50 PM",
        assignedStudents: ["Mateo Quispe López", "Valeria Sánchez Paz"],
      },
      {
        id: 4,
        label: "Colegio San Francisco de Asís",
        address: "Av. Principal 500, Miraflores",
        pickupTime: "7:30 AM",
        dropoffTime: "2:30 PM",
        assignedStudents: [],
      },
    ],
  },
  {
    id: 2,
    name: "Ruta Centro",
    service: "Servicio Regular - Mañana",
    vehiclePlate: "BXK-445",
    vehiclePhoto: mockVehicles[1].photo,
    driverName: mockDrivers[3].name,
    driverPhoto: mockDrivers[3].photo,
    assistantName: mockAssistants[2].name,
    assistantPhoto: mockAssistants[2].photo,
    active: true,
    studentsCount: 18,
    stops: [
      {
        id: 5,
        label: "Parada 1 — Jr. Libertad 456",
        address: "Jr. Libertad 456, Lima Cercado",
        pickupTime: "6:50 AM",
        dropoffTime: "3:20 PM",
        assignedStudents: ["Valentina Pérez Sánchez", "Adrián López Vega"],
      },
      {
        id: 6,
        label: "Parada 2 — Calle Real 789",
        address: "Calle Real 789, Breña",
        pickupTime: "7:05 AM",
        dropoffTime: "3:05 PM",
        assignedStudents: [],
      },
      {
        id: 7,
        label: "Colegio Santa María",
        address: "Av. Brasil 1500, Jesús María",
        pickupTime: "7:25 AM",
        dropoffTime: "2:45 PM",
        assignedStudents: [],
      },
    ],
  },
  {
    id: 3,
    name: "Ruta Sur",
    service: "Servicio Regular - Mañana",
    vehiclePlate: "CML-912",
    vehiclePhoto: mockVehicles[2].photo,
    driverName: mockDrivers[1].name,
    driverPhoto: mockDrivers[1].photo,
    assistantName: mockAssistants[1].name,
    assistantPhoto: mockAssistants[1].photo,
    active: true,
    studentsCount: 22,
    stops: [
      {
        id: 8,
        label: "Parada 1 — Jr. Los Pinos 345",
        address: "Jr. Los Pinos 345, Surquillo",
        pickupTime: "6:40 AM",
        dropoffTime: "3:30 PM",
        assignedStudents: ["Sebastián Torres Ramírez", "Isabella Castro Mendoza"],
      },
      {
        id: 9,
        label: "Parada 2 — Av. Venezuela 1500",
        address: "Av. Venezuela 1500, San Miguel",
        pickupTime: "6:55 AM",
        dropoffTime: "3:15 PM",
        assignedStudents: ["Joaquín Ríos Vargas"],
      },
      {
        id: 10,
        label: "Colegio Nuestra Señora del Carmen",
        address: "Calle Los Cedros 200, San Miguel",
        pickupTime: "7:20 AM",
        dropoffTime: "3:00 PM",
        assignedStudents: [],
      },
    ],
  },
  {
    id: 4,
    name: "Ruta Este",
    service: "Servicio Regular - Mañana",
    vehiclePlate: "DTX-556",
    vehiclePhoto: mockVehicles[3].photo,
    driverName: mockDrivers[2].name,
    driverPhoto: mockDrivers[2].photo,
    assistantName: mockAssistants[1].name,
    assistantPhoto: mockAssistants[1].photo,
    active: true,
    studentsCount: 20,
    stops: [
      {
        id: 11,
        label: "Parada 1 — Calle Las Magnolias 890",
        address: "Calle Las Magnolias 890, La Molina",
        pickupTime: "6:35 AM",
        dropoffTime: "3:35 PM",
        assignedStudents: ["Gabriela Paredes Soto", "Andrés Huamán Díaz"],
      },
      {
        id: 12,
        label: "Parada 2 — Av. Los Próceres 567",
        address: "Av. Los Próceres 567, Ate",
        pickupTime: "6:50 AM",
        dropoffTime: "3:20 PM",
        assignedStudents: ["Ximena Flores Cruz"],
      },
      {
        id: 13,
        label: "Colegio Santo Domingo",
        address: "Av. La Universidad 300, La Molina",
        pickupTime: "7:15 AM",
        dropoffTime: "3:00 PM",
        assignedStudents: [],
      },
    ],
  },
  {
    id: 5,
    name: "Ruta Oeste",
    service: "Servicio Especial - Tarde",
    vehiclePlate: "EPL-445",
    vehiclePhoto: mockVehicles[4].photo,
    driverName: mockDrivers[1].name,
    driverPhoto: mockDrivers[1].photo,
    assistantName: mockAssistants[0].name,
    assistantPhoto: mockAssistants[0].photo,
    active: false,
    studentsCount: 12,
    stops: [
      {
        id: 14,
        label: "Colegio La Salle",
        address: "Av. La Marina 800, Magdalena",
        pickupTime: "2:00 PM",
        dropoffTime: "7:30 AM",
        assignedStudents: [],
      },
      {
        id: 15,
        label: "Parada 2 — Jr. Sucre 456",
        address: "Jr. Sucre 456, Pueblo Libre",
        pickupTime: "2:20 PM",
        dropoffTime: "7:10 AM",
        assignedStudents: ["Daniel Quiroz León"],
      },
    ],
  },
];

function RoutesMap({ selectedRoute }: { selectedRoute: RouteData | null }) {
  return (
    <Card className="sticky top-24 overflow-hidden h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Navigation className="size-4 text-primary" />
          {selectedRoute ? `Mapa: ${selectedRoute.name}` : "Selecciona una ruta"}
        </CardTitle>
        <CardDescription>
          {selectedRoute
            ? `${selectedRoute.stops.length} paradas · ${selectedRoute.studentsCount} estudiantes`
            : "Haz clic en una ruta para ver su recorrido"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-[350px] bg-gradient-to-br from-slate-50 to-blue-50"
        >
          <defs>
            <pattern id="rgrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#e2e8f0" strokeWidth="0.25" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#rgrid)" />

          {selectedRoute ? (
            <>
              {/* Route polyline */}
              <path
                d={selectedRoute.stops
                  .map((_, i) => {
                    const x = 15 + ((i * 70) / Math.max(1, selectedRoute.stops.length - 1));
                    const y = i % 2 === 0 ? 30 : 55;
                    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={selectedRoute.active ? "0" : "5,3"}
                opacity={selectedRoute.active ? 0.8 : 0.4}
              />

              {/* Stop markers */}
              {selectedRoute.stops.map((stop, i) => {
                const x = 15 + ((i * 70) / Math.max(1, selectedRoute.stops.length - 1));
                const y = i % 2 === 0 ? 30 : 55;
                const isSchool = stop.label.toLowerCase().includes("colegio");

                return (
                  <g key={stop.id}>
                    {/* Connecting line */}
                    {selectedRoute.active && (
                      <circle cx={x} cy={y} r="7" fill="rgba(37,99,235,0.08)" />
                    )}

                    {/* Stop marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r="4.5"
                      fill={isSchool ? "#1E293B" : selectedRoute.active ? "#2563EB" : "#94A3B8"}
                      stroke="white"
                      strokeWidth="1.5"
                    />

                    {/* Stop number */}
                    <text
                      x={x}
                      y={y + 0.6}
                      textAnchor="middle"
                      fill="white"
                      fontSize="3"
                      fontWeight="bold"
                    >
                      {isSchool ? "C" : i + 1}
                    </text>

                    {/* Stop label */}
                    {x > 50 ? (
                      <text
                        x={x - 5.5}
                        y={y - 7}
                        textAnchor="end"
                        fill="#64748B"
                        fontSize="2.2"
                      >
                        {stop.label.split(" — ")[0]}
                      </text>
                    ) : (
                      <text
                        x={x + 5.5}
                        y={y - 7}
                        textAnchor="start"
                        fill="#64748B"
                        fontSize="2.2"
                      >
                        {stop.label.split(" — ")[0]}
                      </text>
                    )}

                    {/* Student count badge */}
                    {stop.assignedStudents.length > 0 && (
                      <g>
                        <circle cx={x} cy={y + 8} r="2.5" fill="white" stroke="#D1D5DB" strokeWidth="0.5" />
                        <text
                          x={x}
                          y={y + 8.6}
                          textAnchor="middle"
                          fill="#64748B"
                          fontSize="2"
                          fontWeight="bold"
                        >
                          {stop.assignedStudents.length}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </>
          ) : (
            <g>
              <circle cx="50" cy="45" r="8" fill="rgba(37,99,235,0.08)" />
              <MapPin className="size-6" style={{ transform: "translate(42, 34)" }} />
              <text
                x="50"
                y="65"
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="3"
                fontWeight="500"
              >
                Sin ruta seleccionada
              </text>
            </g>
          )}

          {/* Legend */}
          <g transform="translate(4, 92)">
            <rect width="42" height="7" rx="2" fill="white" stroke="#e2e8f0" strokeWidth="0.4" />
            <circle cx="6" cy="3.5" r="2" fill="#2563EB" />
            <text x="9" y="5" fontSize="1.8" fill="#64748B">Parada</text>
            <circle cx="19" cy="3.5" r="2" fill="#1E293B" />
            <text x="22" y="5" fontSize="1.8" fill="#64748B">Colegio</text>
            <circle cx="32" cy="3.5" r="0.4" fill="#D1D5DB" />
            <text x="33" y="5" fontSize="1.8" fill="#64748B">#est.</text>
          </g>
        </svg>
      </CardContent>
    </Card>
  );
}

function RouteEditDialog({
  route,
  onSave,
  onCancel,
  title,
}: {
  route?: RouteData;
  onSave: (data: Partial<RouteData> & { stops: Stop[] }) => void;
  onCancel: () => void;
  title: string;
}) {
  const [name, setName] = useState(route?.name || "");
  const [service, setService] = useState(route?.service || "");
  const [selectedVehicle, setSelectedVehicle] = useState(route?.vehiclePlate || "");
  const [selectedDriver, setSelectedDriver] = useState(route?.driverName || "");
  const [selectedAssistant, setSelectedAssistant] = useState(route?.assistantName || "none");
  const [stops, setStops] = useState<Stop[]>(
    route?.stops.map((s) => ({ ...s })) || []
  );

  const addStop = (label?: string, address?: string) => {
    const newId = Math.max(0, ...stops.map((s) => s.id)) + 1;
    setStops([
      ...stops,
      {
        id: newId,
        label: label || `Parada ${stops.length + 1}`,
        address: address || "",
        pickupTime: "7:00 AM",
        dropoffTime: "3:00 PM",
        assignedStudents: [],
      },
    ]);
  };

  const removeStop = (stopId: number) => {
    setStops(stops.filter((s) => s.id !== stopId));
  };

  const updateStop = (stopId: number, field: keyof Stop, value: string | string[]) => {
    setStops(stops.map((s) => (s.id === stopId ? { ...s, [field]: value } : s)));
  };

  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newStops = [...stops];
    const [dragged] = newStops.splice(dragIndex, 1);
    newStops.splice(index, 0, dragged);
    setStops(newStops);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const toggleStudent = (stopId: number, studentName: string) => {
    setStops(
      stops.map((s) => {
        if (s.id !== stopId) return s;
        const has = s.assignedStudents.includes(studentName);
        return {
          ...s,
          assignedStudents: has
            ? s.assignedStudents.filter((st) => st !== studentName)
            : [...s.assignedStudents, studentName],
        };
      })
    );
  };

  const vehicle = mockVehicles.find((v) => v.plate === selectedVehicle);
  const driver = mockDrivers.find((d) => d.name === selectedDriver);
  const assistant = mockAssistants.find((a) => a.name === selectedAssistant);

  return (
    <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          Configura los detalles de la ruta y sus paradas
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="rname">Nombre de la Ruta</Label>
          <Input
            id="rname"
            placeholder="Ruta Norte"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">Servicio Asociado</Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="service">
              <SelectValue placeholder="Seleccionar servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Servicio Regular - Mañana">Servicio Regular - Mañana</SelectItem>
              <SelectItem value="Servicio Regular - Tarde">Servicio Regular - Tarde</SelectItem>
              <SelectItem value="Servicio Especial - Mañana">Servicio Especial - Mañana</SelectItem>
              <SelectItem value="Servicio Especial - Tarde">Servicio Especial - Tarde</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle">Vehículo</Label>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger id="vehicle">
                <SelectValue placeholder="Seleccionar vehículo" />
              </SelectTrigger>
              <SelectContent>
                {mockVehicles.map((v) => (
                  <SelectItem key={v.plate} value={v.plate}>
                    <div className="flex items-center gap-2">
                      <img src={v.photo} alt="" className="size-6 rounded object-cover" />
                      {v.plate}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="driver">Chofer</Label>
            <Select value={selectedDriver} onValueChange={setSelectedDriver}>
              <SelectTrigger id="driver">
                <SelectValue placeholder="Seleccionar chofer" />
              </SelectTrigger>
              <SelectContent>
                {mockDrivers.map((d) => (
                  <SelectItem key={d.name} value={d.name}>
                    <div className="flex items-center gap-2">
                      <img src={d.photo} alt="" className="size-6 rounded-full" />
                      {d.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assistant">Asistente (opcional)</Label>
          <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
            <SelectTrigger id="assistant">
              <SelectValue placeholder="Seleccionar asistente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Ninguno</SelectItem>
              {mockAssistants.map((a) => (
                <SelectItem key={a.name} value={a.name}>
                  <div className="flex items-center gap-2">
                    <img src={a.photo} alt="" className="size-6 rounded-full" />
                    {a.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stops Editor */}
        <div className="space-y-3 mt-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Label className="text-base">Paradas ({stops.length})</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => addStop()}>
                <Plus className="mr-1 size-3" />
                Añadir Parada
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                className="pl-10 h-9 text-sm"
                placeholder="Buscar dirección para añadir parada..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value;
                    if (value.trim()) {
                      addStop(value.trim(), value.trim());
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Escribe una dirección y presiona Enter para añadir. Arrastra las paradas para reordenar.
          </p>

          <div className="space-y-2">
            {stops.map((stop, index) => (
              <Card
                key={stop.id}
                className={`overflow-hidden cursor-grab active:cursor-grabbing ${
                  dragIndex === index ? "opacity-50 ring-2 ring-primary" : ""
                }`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                      <GripVertical className="size-4" />
                    </div>

                    <div className="flex-1 grid gap-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Etiqueta</Label>
                          <Input
                            className="h-8 text-sm"
                            placeholder="Parada 1"
                            value={stop.label}
                            onChange={(e) => updateStop(stop.id, "label", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Dirección</Label>
                          <Input
                            className="h-8 text-sm"
                            placeholder="Calle Los Pinos #45"
                            value={stop.address}
                            onChange={(e) => updateStop(stop.id, "address", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Hora recogida</Label>
                          <Input
                            className="h-8 text-sm"
                            placeholder="7:00 AM"
                            value={stop.pickupTime}
                            onChange={(e) => updateStop(stop.id, "pickupTime", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Hora entrega</Label>
                          <Input
                            className="h-8 text-sm"
                            placeholder="3:00 PM"
                            value={stop.dropoffTime}
                            onChange={(e) => updateStop(stop.id, "dropoffTime", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs mb-1 block">Estudiantes asignados ({stop.assignedStudents.length})</Label>
                        <div className="flex flex-wrap gap-1">
                          {stop.assignedStudents.map((student) => (
                            <Badge
                              key={student}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => toggleStudent(stop.id, student)}
                            >
                              {student}
                              <X className="size-3 ml-1" />
                            </Badge>
                          ))}
                        </div>
                        <Select
                          value=""
                          onValueChange={(value) => {
                            if (value) toggleStudent(stop.id, value);
                          }}
                        >
                          <SelectTrigger className="h-7 text-xs mt-1">
                            <SelectValue placeholder="+ Agregar estudiante" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockStudents
                              .filter((s) => !stop.assignedStudents.includes(s))
                              .map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive shrink-0"
                      onClick={() => removeStop(stop.id)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {stops.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-4">
              No hay paradas definidas. Usa "Añadir Parada" para comenzar.
            </p>
          )}
        </div>

        {/* Preview map */}
        {stops.length > 0 && (
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-accent/30 px-3 py-2 border-b">
              <p className="text-xs font-semibold flex items-center gap-1">
                <Navigation className="size-3" />
                Vista previa del recorrido
              </p>
            </div>
            <svg viewBox="0 0 100 50" className="w-full h-[150px] bg-gradient-to-br from-slate-50 to-blue-50">
              <defs>
                <pattern id="pgrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.2" />
                </pattern>
              </defs>
              <rect width="100" height="50" fill="url(#pgrid)" />
              {stops.length > 1 && (
                <path
                  d={stops
                    .map((_, i) => {
                      const x = 10 + ((i * 80) / (stops.length - 1));
                      const y = 20 + (i % 2) * 15;
                      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              )}
              {stops.map((stop, i) => {
                const x = stops.length > 1 ? 10 + ((i * 80) / (stops.length - 1)) : 50;
                const y = stops.length > 1 ? 20 + (i % 2) * 15 : 25;
                return (
                  <g key={stop.id}>
                    <circle cx={x} cy={y} r="3" fill="#2563EB" stroke="white" strokeWidth="1" />
                    <text x={x} y={y + 0.4} textAnchor="middle" fill="white" fontSize="2.2" fontWeight="bold">
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          onClick={() =>
            onSave({
              name,
              service,
              vehiclePlate: selectedVehicle,
              vehiclePhoto: vehicle?.photo || "",
              driverName: selectedDriver,
              driverPhoto: driver?.photo || "",
              assistantName: selectedAssistant === "none" ? "" : selectedAssistant,
              assistantPhoto: assistant?.photo || "",
              stops,
              studentsCount: new Set(stops.flatMap((s) => s.assignedStudents)).size,
            })
          }
          disabled={!name || !service || !selectedVehicle || !selectedDriver}
        >
          Guardar Ruta
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export function EmpresaRutas() {
  const [routes, setRoutes] = useState<RouteData[]>(initialRoutes);
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [editRoute, setEditRoute] = useState<RouteData | null>(null);
  const [search, setSearch] = useState("");

  const selectedRoute = routes.find((r) => r.id === selectedRouteId) || null;

  const filteredRoutes = routes.filter(
    (r) =>
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.vehiclePlate.toLowerCase().includes(search.toLowerCase()) ||
      r.driverName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: number) => {
    setRoutes(routes.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Rutas</h2>
          <p className="text-muted-foreground">
            Administra las rutas de transporte escolar
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="mr-2 size-4" />
              Nueva Ruta
            </Button>
          </DialogTrigger>
          <RouteEditDialog
            title="Nueva Ruta"
            onSave={(data) => {
              const newRoute: RouteData = {
                id: Math.max(0, ...routes.map((r) => r.id)) + 1,
                name: data.name || "Nueva Ruta",
                service: data.service || "Servicio Regular - Mañana",
                vehiclePlate: data.vehiclePlate || "",
                vehiclePhoto: data.vehiclePhoto || "",
                driverName: data.driverName || "",
                driverPhoto: data.driverPhoto || "",
                assistantName: data.assistantName || "",
                assistantPhoto: data.assistantPhoto || "",
                stops: data.stops || [],
                active: true,
                studentsCount: data.studentsCount || 0,
              };
              setRoutes([...routes, newRoute]);
              setSelectedRouteId(newRoute.id);
              setCreateOpen(false);
            }}
            onCancel={() => setCreateOpen(false)}
          />
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Route list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar rutas..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {filteredRoutes.map((route) => (
              <Card
                key={route.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRouteId === route.id
                    ? "ring-2 ring-primary border-primary"
                    : ""
                }`}
                onClick={() => setSelectedRouteId(route.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{route.name}</h4>
                      <p className="text-xs text-muted-foreground">{route.service}</p>
                    </div>
                    <Switch
                      checked={route.active}
                      onCheckedChange={() => toggleActive(route.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Car className="size-3" />
                      {route.vehiclePlate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {route.stops.length} paradas
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3" />
                      {route.studentsCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t">
                    <img
                      src={route.driverPhoto}
                      alt={route.driverName}
                      className="size-6 rounded-full"
                    />
                    <span className="text-xs text-muted-foreground">{route.driverName}</span>
                    <Badge
                      variant={route.active ? "default" : "secondary"}
                      className="ml-auto text-xs"
                    >
                      {route.active ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredRoutes.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No se encontraron rutas
              </p>
            )}
          </div>
        </div>

        {/* Map + info panel */}
        <div className="lg:col-span-3 space-y-4">
          <RoutesMap selectedRoute={selectedRoute} />

          {selectedRoute && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{selectedRoute.name}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditRoute(selectedRoute)}
                  >
                    Editar Ruta
                  </Button>
                </div>
                <CardDescription>
                  {selectedRoute.stops.length} paradas · {selectedRoute.studentsCount} estudiantes asignados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded overflow-hidden">
                        <img
                          src={selectedRoute.vehiclePhoto}
                          alt=""
                          className="size-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{selectedRoute.vehiclePlate}</p>
                        <p className="text-xs text-muted-foreground">Vehículo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedRoute.driverPhoto}
                        alt=""
                        className="size-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm">{selectedRoute.driverName}</p>
                        <p className="text-xs text-muted-foreground">Chofer</p>
                      </div>
                    </div>
                    {selectedRoute.assistantName && (
                      <div className="flex items-center gap-2">
                        <img
                          src={selectedRoute.assistantPhoto}
                          alt=""
                          className="size-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-sm">{selectedRoute.assistantName}</p>
                          <p className="text-xs text-muted-foreground">Asistente</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3">
                    <p className="text-sm font-semibold mb-2">Paradas ({selectedRoute.stops.length})</p>
                    <div className="space-y-1">
                      {selectedRoute.stops.map((stop, i) => (
                        <div
                          key={stop.id}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-sm"
                        >
                          <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-primary">
                              {stop.label.toLowerCase().includes("colegio") ? "C" : i + 1}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{stop.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{stop.address}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs flex items-center gap-1">
                              <Clock className="size-3" />
                              {stop.pickupTime}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {stop.assignedStudents.length} estudiantes
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={!!editRoute} onOpenChange={(open) => !open && setEditRoute(null)}>
        {editRoute && (
          <RouteEditDialog
            title="Editar Ruta"
            route={editRoute}
            onSave={(data) => {
              setRoutes(
                routes.map((r) =>
                  r.id === editRoute.id
                    ? {
                        ...r,
                        name: data.name || r.name,
                        service: data.service || r.service,
                        vehiclePlate: data.vehiclePlate || r.vehiclePlate,
                        vehiclePhoto: data.vehiclePhoto || r.vehiclePhoto,
                        driverName: data.driverName || r.driverName,
                        driverPhoto: data.driverPhoto || r.driverPhoto,
                        assistantName: data.assistantName || r.assistantName,
                        assistantPhoto: data.assistantPhoto || r.assistantPhoto,
                        stops: data.stops || r.stops,
                        studentsCount: data.studentsCount ?? r.studentsCount,
                      }
                    : r
                )
              );
              setEditRoute(null);
            }}
            onCancel={() => setEditRoute(null)}
          />
        )}
      </Dialog>
    </div>
  );
}
