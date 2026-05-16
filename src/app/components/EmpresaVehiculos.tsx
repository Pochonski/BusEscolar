import { useState } from "react";
import { Plus, Car, Users, Gauge, Circle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
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

interface Vehicle {
  id: number;
  photo: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  colorHex: string;
  capacity: number;
  gpsDeviceId: string;
  status: "Operativo" | "En Mantenimiento" | "Inactivo";
  lastMaintenance: string;
}

const initialVehicles: Vehicle[] = [
  {
    id: 1,
    photo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    plate: "AQP-832",
    brand: "Mercedes-Benz",
    model: "Sprinter 415",
    year: 2023,
    color: "Blanco",
    colorHex: "#FFFFFF",
    capacity: 22,
    gpsDeviceId: "GPS-001-TRACK",
    status: "Operativo",
    lastMaintenance: "15/03/2026"
  },
  {
    id: 2,
    photo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop",
    plate: "BXK-445",
    brand: "Hyundai",
    model: "County 2023",
    year: 2023,
    color: "Amarillo",
    colorHex: "#EAB308",
    capacity: 25,
    gpsDeviceId: "GPS-002-TRACK",
    status: "Operativo",
    lastMaintenance: "28/02/2026"
  },
  {
    id: 3,
    photo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
    plate: "CML-912",
    brand: "Volkswagen",
    model: "Volksbus 15.190",
    year: 2022,
    color: "Blanco",
    colorHex: "#FFFFFF",
    capacity: 30,
    gpsDeviceId: "GPS-003-TRACK",
    status: "Operativo",
    lastMaintenance: "10/04/2026"
  },
  {
    id: 4,
    photo: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=400&h=300&fit=crop",
    plate: "DTX-556",
    brand: "Mercedes-Benz",
    model: "Sprinter 515",
    year: 2024,
    color: "Azul",
    colorHex: "#1D4ED8",
    capacity: 19,
    gpsDeviceId: "GPS-004-TRACK",
    status: "Operativo",
    lastMaintenance: "05/05/2026"
  },
  {
    id: 5,
    photo: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop",
    plate: "EPL-445",
    brand: "Toyota",
    model: "Coaster 2022",
    year: 2022,
    color: "Blanco",
    colorHex: "#FFFFFF",
    capacity: 20,
    gpsDeviceId: "GPS-005-TRACK",
    status: "En Mantenimiento",
    lastMaintenance: "01/04/2026"
  },
  {
    id: 6,
    photo: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
    plate: "FXV-123",
    brand: "Iveco",
    model: "Daily 50C17",
    year: 2021,
    color: "Rojo",
    colorHex: "#DC2626",
    capacity: 18,
    gpsDeviceId: "GPS-006-TRACK",
    status: "Inactivo",
    lastMaintenance: "12/12/2025"
  },
  {
    id: 7,
    photo: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=400&h=300&fit=crop",
    plate: "GML-789",
    brand: "Hyundai",
    model: "County 2024",
    year: 2024,
    color: "Amarillo",
    colorHex: "#EAB308",
    capacity: 25,
    gpsDeviceId: "GPS-007-TRACK",
    status: "Operativo",
    lastMaintenance: "20/04/2026"
  },
  {
    id: 8,
    photo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
    plate: "HLP-321",
    brand: "Volkswagen",
    model: "Volksbus 15.190",
    year: 2023,
    color: "Verde",
    colorHex: "#16A34A",
    capacity: 30,
    gpsDeviceId: "GPS-008-TRACK",
    status: "En Mantenimiento",
    lastMaintenance: "08/05/2026"
  },
];

const statusConfig: Record<string, { color: string; icon: typeof Circle }> = {
  "Operativo": { color: "bg-success", icon: Circle },
  "En Mantenimiento": { color: "bg-warning", icon: Circle },
  "Inactivo": { color: "bg-gray-500", icon: Circle },
};

const colorOptions = [
  { label: "Blanco", value: "#FFFFFF" },
  { label: "Amarillo", value: "#EAB308" },
  { label: "Azul", value: "#1D4ED8" },
  { label: "Rojo", value: "#DC2626" },
  { label: "Verde", value: "#16A34A" },
  { label: "Naranja", value: "#F97316" },
  { label: "Gris", value: "#6B7280" },
  { label: "Negro", value: "#1E293B" },
];

function VehicleForm({
  vehicle,
  onSave,
  onCancel,
  title,
  description,
}: {
  vehicle?: Vehicle;
  onSave: (v: Partial<Vehicle>) => void;
  onCancel: () => void;
  title: string;
  description: string;
}) {
  const [photo, setPhoto] = useState(vehicle?.photo || "");
  const [plate, setPlate] = useState(vehicle?.plate || "");
  const [brand, setBrand] = useState(vehicle?.brand || "");
  const [model, setModel] = useState(vehicle?.model || "");
  const [year, setYear] = useState(String(vehicle?.year || new Date().getFullYear()));
  const [color, setColor] = useState(vehicle?.colorHex || "#FFFFFF");
  const [capacity, setCapacity] = useState(String(vehicle?.capacity || 20));
  const [gpsId, setGpsId] = useState(vehicle?.gpsDeviceId || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!plate.trim()) e.plate = "La placa es obligatoria";
    if (!brand.trim()) e.brand = "La marca es obligatoria";
    if (!model.trim()) e.model = "El modelo es obligatorio";
    if (!year || Number(year) < 2000) e.year = "Año inválido";
    if (!capacity || Number(capacity) < 1) e.capacity = "Capacidad inválida";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      onSave({ photo, plate, brand, model, year: Number(year), color: colorOptions.find((c) => c.value === color)?.label || color, colorHex: color, capacity: Number(capacity), gpsDeviceId: gpsId });
      setSubmitting(false);
      toast.success(vehicle ? "Vehículo actualizado" : "Vehículo registrado");
    }, 600);
  };

  return (
    <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="photo">URL de foto del vehículo</Label>
          <Input
            id="photo"
            placeholder="https://images.unsplash.com/..."
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          {photo && (
            <img
              src={photo}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg border"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plate">Placa</Label>
            <Input id="plate" placeholder="ABC-123" value={plate} onChange={(e) => { setPlate(e.target.value); setErrors((p) => ({ ...p, plate: "" })); }} />
            {errors.plate && <p className="text-xs text-destructive">{errors.plate}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Marca</Label>
            <Input id="brand" placeholder="Mercedes-Benz" value={brand} onChange={(e) => { setBrand(e.target.value); setErrors((p) => ({ ...p, brand: "" })); }} />
            {errors.brand && <p className="text-xs text-destructive">{errors.brand}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="model">Modelo</Label>
            <Input id="model" placeholder="Sprinter 415" value={model} onChange={(e) => { setModel(e.target.value); setErrors((p) => ({ ...p, model: "" })); }} />
            {errors.model && <p className="text-xs text-destructive">{errors.model}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Año</Label>
            <Input id="year" type="number" placeholder="2024" value={year} onChange={(e) => { setYear(e.target.value); setErrors((p) => ({ ...p, year: "" })); }} />
            {errors.year && <p className="text-xs text-destructive">{errors.year}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger id="color">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-full border" style={{ backgroundColor: color }} />
                  <SelectValue placeholder="Seleccionar color" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    <div className="flex items-center gap-2">
                      <div className="size-4 rounded-full border" style={{ backgroundColor: c.value }} />
                      {c.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidad</Label>
            <Input id="capacity" type="number" placeholder="22" value={capacity} onChange={(e) => { setCapacity(e.target.value); setErrors((p) => ({ ...p, capacity: "" })); }} />
            {errors.capacity && <p className="text-xs text-destructive">{errors.capacity}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gpsId">ID Dispositivo GPS</Label>
          <Input
            id="gpsId"
            placeholder="GPS-001-TRACK"
            value={gpsId}
            onChange={(e) => setGpsId(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel} disabled={submitting}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          Guardar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export function EmpresaVehiculos() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [createOpen, setCreateOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);

  const operativos = vehicles.filter((v) => v.status === "Operativo").length;
  const mantenimiento = vehicles.filter((v) => v.status === "En Mantenimiento").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Vehículos</h2>
          <p className="text-muted-foreground">
            Administra la flota de vehículos
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="mr-2 size-4" />
              Nuevo Vehículo
            </Button>
          </DialogTrigger>
          <VehicleForm
            title="Nuevo Vehículo"
            description="Registra un nuevo vehículo en la flota"
            onSave={(data) => {
              const newVehicle: Vehicle = {
                id: Math.max(0, ...vehicles.map((v) => v.id)) + 1,
                photo: data.photo || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
                plate: data.plate || "",
                brand: data.brand || "",
                model: data.model || "",
                year: data.year || new Date().getFullYear(),
                color: data.color || "Blanco",
                colorHex: data.colorHex || "#FFFFFF",
                capacity: data.capacity || 20,
                gpsDeviceId: data.gpsDeviceId || "",
                status: "Operativo",
                lastMaintenance: new Date().toLocaleDateString("es-PE"),
              };
              setVehicles([...vehicles, newVehicle]);
              setCreateOpen(false);
            }}
            onCancel={() => setCreateOpen(false)}
          />
        </Dialog>
      </div>

      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Vehículos Operativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-success">{operativos}</div>
            <p className="text-xs text-muted-foreground">de {vehicles.length} totales</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              En Mantenimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-warning">{mantenimiento}</div>
            <p className="text-xs text-muted-foreground">Requieren revisión</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            onClick={() => setEditVehicle(vehicle)}
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={vehicle.photo}
                alt={vehicle.plate}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop";
                }}
              />
              <div className="absolute top-3 right-3">
                <Badge
                  className={`${statusConfig[vehicle.status].color} text-white border-0`}
                >
                  <Circle className="size-2 mr-1 fill-current" />
                  {vehicle.status}
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white font-bold text-lg">{vehicle.plate}</p>
              </div>
            </div>
            <CardContent className="p-4 space-y-2">
              <div>
                <p className="font-semibold">
                  {vehicle.brand} {vehicle.model}
                </p>
                <p className="text-sm text-muted-foreground">{vehicle.year}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="size-4" />
                  <span>{vehicle.capacity} asientos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Gauge className="size-4" />
                  <span>GPS: {vehicle.gpsDeviceId}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <div
                  className="size-5 rounded-full border-2 border-border"
                  style={{ backgroundColor: vehicle.colorHex }}
                />
                <span className="text-sm text-muted-foreground">{vehicle.color}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Último mantenimiento: {vehicle.lastMaintenance}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!editVehicle} onOpenChange={(open) => !open && setEditVehicle(null)}>
        {editVehicle && (
          <VehicleForm
            title="Editar Vehículo"
            description={`Editando ${editVehicle.plate} - ${editVehicle.brand} ${editVehicle.model}`}
            vehicle={editVehicle}
            onSave={(data) => {
              setVehicles(
                vehicles.map((v) =>
                  v.id === editVehicle.id
                    ? {
                        ...v,
                        photo: data.photo || v.photo,
                        plate: data.plate || v.plate,
                        brand: data.brand || v.brand,
                        model: data.model || v.model,
                        year: data.year || v.year,
                        color: data.color || v.color,
                        colorHex: data.colorHex || v.colorHex,
                        capacity: data.capacity || v.capacity,
                        gpsDeviceId: data.gpsDeviceId || v.gpsDeviceId,
                      }
                    : v
                )
              );
              setEditVehicle(null);
            }}
            onCancel={() => setEditVehicle(null)}
          />
        )}
      </Dialog>
    </div>
  );
}
