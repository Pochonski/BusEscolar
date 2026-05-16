import { useState } from "react";
import { Bell, Home, MapPin, CreditCard, AlertTriangle, CheckCheck, X } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Notification {
  id: number;
  type: "Recogida" | "Entrega" | "Pago" | "Evento";
  icon: typeof Bell;
  iconColor: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, type: "Recogida", icon: Home, iconColor: "text-success", title: "Sofía fue recogida", body: "Recogida puntual a las 6:47 AM por Carlos Mendoza Quispe en Calle Los Pinos #45.", time: "hace 3 min", unread: true },
  { id: 2, type: "Pago", icon: CreditCard, iconColor: "text-warning", title: "Próximo vencimiento", body: "Factura de Mayo vence el 5 de Junio 2026. Monto: S/ 445.00.", time: "hace 1 hora", unread: true },
  { id: 3, type: "Evento", icon: AlertTriangle, iconColor: "text-destructive", title: "Simulacro programado", body: "El viernes 23 de mayo a las 10:00 AM se realizará simulacro de evacuación en el colegio San Francisco de Asís.", time: "hace 3 horas", unread: true },
  { id: 4, type: "Entrega", icon: MapPin, iconColor: "text-primary", title: "Sofía entregada en casa", body: "Entrega realizada a las 3:15 PM por Rosa María Huamán. Estudiante recibida por Ana Torres.", time: "Ayer", unread: false },
  { id: 5, type: "Recogida", icon: Home, iconColor: "text-success", title: "Recogida completada", body: "Sofía fue recogida ayer a las 6:45 AM. Sin novedades reportadas.", time: "Ayer", unread: false },
  { id: 6, type: "Pago", icon: CreditCard, iconColor: "text-success", title: "Pago confirmado", body: "Se recibió el pago de S/ 445.00 correspondiente a Mayo 2026. Comprobante registrado.", time: "hace 2 días", unread: false },
  { id: 7, type: "Evento", icon: AlertTriangle, iconColor: "text-chart-3", title: "Cambio de horario temporal", body: "Por obras en Av. Arequipa, la recogida del lunes 19 se adelantará 10 minutos. Salida: 6:35 AM.", time: "hace 3 días", unread: false },
];

const typeIcons: Record<string, typeof Bell> = {
  Recogida: Home,
  Entrega: MapPin,
  Pago: CreditCard,
  Evento: AlertTriangle,
};

export function FamiliaNotificaciones() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="p-4 space-y-4">
      {unreadCount > 0 && (
        <Button variant="outline" size="sm" className="w-full" onClick={markAllRead}>
          <CheckCheck className="mr-2 size-4" />
          Marcar todas como leídas ({unreadCount})
        </Button>
      )}

      <div className="space-y-2">
        {notifications.map((notif) => {
          const Icon = typeIcons[notif.type] || Bell;
          return (
            <div
              key={notif.id}
              className={`relative p-3 rounded-lg cursor-pointer transition-all ${
                notif.unread
                  ? "border-l-4 border-l-primary bg-accent/40"
                  : "bg-accent/10 opacity-70"
              }`}
              onClick={() => markAsRead(notif.id)}
            >
              <button
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  dismiss(notif.id);
                }}
              >
                <X className="size-3" />
              </button>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-card shrink-0">
                  <Icon className={`size-4 ${notif.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {notif.type}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                    {notif.unread && (
                      <div className="size-2 rounded-full bg-primary ml-auto" />
                    )}
                  </div>
                  <p className="text-sm font-semibold mb-1">{notif.title}</p>
                  <p className="text-xs text-muted-foreground">{notif.body}</p>
                </div>
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="size-10 mx-auto mb-2 text-muted-foreground opacity-40" />
              <p className="text-muted-foreground">No tienes notificaciones</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
