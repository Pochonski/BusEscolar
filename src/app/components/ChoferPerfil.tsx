import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Phone, IdCard, Route, Car } from "lucide-react";
import { Button } from "./ui/button";

export function ChoferPerfil() {
  const chofer = {
    name: "Carlos Mendoza Quispe",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza",
    phone: "+51 987 654 321",
    license: "Q-12345678",
    route: "Ruta Norte",
    vehicle: "AQP-832 — Mercedes-Benz Sprinter",
    vehiclePhoto: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=150&fit=crop",
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <img src={chofer.photo} alt={chofer.name} className="size-24 rounded-2xl border-4 border-primary/20 mb-3" />
            <h2 className="text-xl font-bold">{chofer.name}</h2>
            <Badge variant="default" className="mt-1">Chofer</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Información</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone className="size-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Teléfono</p>
              <p className="font-medium text-sm">{chofer.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IdCard className="size-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Licencia</p>
              <p className="font-medium text-sm">{chofer.license}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Route className="size-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Ruta Asignada</p>
              <p className="font-medium text-sm">{chofer.route}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Car className="size-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Vehículo</p>
              <p className="font-medium text-sm">{chofer.vehicle}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full">
        Cerrar Sesión
      </Button>
    </div>
  );
}
