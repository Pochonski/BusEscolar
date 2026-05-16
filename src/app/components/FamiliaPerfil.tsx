import { Phone, MapPin, Clock, Car, Route, Heart, AlertTriangle, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function FamiliaPerfil() {
  const student = {
    name: "Sofía Ramírez Torres",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    age: 8,
    school: "Colegio San Francisco de Asís",
    grade: "3° Primaria",
    route: "Ruta Norte",
    pickupTime: "6:45 AM",
    dropoffTime: "3:15 PM",
    vehiclePlate: "AQP-832",
    vehiclePhoto: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=150&fit=crop",
    driverName: "Carlos Mendoza Quispe",
    driverPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza",
    assistantName: "Rosa María Huamán Castillo",
    assistantPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=RosaHuaman",
    specialNeeds: [
      { category: "Alergia", description: "Alergia al maní y frutos secos", notes: "Llevar epinefrina autoinyectable. Coordinado con enfermería." }
    ]
  };

  return (
    <div className="p-4 space-y-4">
      {/* Student Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <img src={student.photo} alt={student.name} className="size-24 rounded-2xl border-4 border-primary/20 mb-3" />
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-muted-foreground text-sm">
              {student.age} años · {student.grade} · {student.school}
            </p>
            {student.specialNeeds.length > 0 && (
              <Badge variant="outline" className="mt-2 bg-orange-50 text-orange-700 border-orange-200">
                <AlertTriangle className="size-3 mr-1" />
                Necesidades especiales
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Assigned Service */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Route className="size-4 text-primary" />
            Servicio Asignado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Ruta</p>
            <p className="font-medium">{student.route}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Recogida</p>
              <p className="font-medium flex items-center gap-1"><Clock className="size-3" />{student.pickupTime}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Entrega</p>
              <p className="font-medium flex items-center gap-1"><Clock className="size-3" />{student.dropoffTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/30">
            <img src={student.vehiclePhoto} alt="Vehículo" className="w-12 h-9 rounded object-cover" />
            <div>
              <p className="text-sm font-medium">{student.vehiclePlate}</p>
              <p className="text-xs text-muted-foreground">Mercedes-Benz Sprinter</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img src={student.driverPhoto} alt="" className="size-10 rounded-full border" />
            <div>
              <p className="text-sm font-medium">{student.driverName}</p>
              <p className="text-xs text-muted-foreground">Chofer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img src={student.assistantPhoto} alt="" className="size-10 rounded-full border" />
            <div>
              <p className="text-sm font-medium">{student.assistantName}</p>
              <p className="text-xs text-muted-foreground">Asistente</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Needs */}
      {student.specialNeeds.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="size-4 text-orange-500" />
              Necesidades Especiales
            </CardTitle>
          </CardHeader>
          <CardContent>
            {student.specialNeeds.map((need, i) => (
              <div key={i} className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                <Badge variant="outline" className="mb-1 bg-orange-100 text-orange-700 border-orange-300">
                  {need.category}
                </Badge>
                <p className="font-semibold text-sm">{need.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{need.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Edit request */}
      <Button variant="outline" className="w-full">
        <User className="mr-2 size-4" />
        Solicitar cambio de datos
      </Button>
    </div>
  );
}
