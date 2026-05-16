import { useState } from "react";
import { Plus, Phone, IdCard, Circle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface PersonalMember {
  id: number;
  type: "Chofer" | "Asistente";
  photo: string;
  fullName: string;
  phone: string;
  licenseNumber?: string;
  status: "Activo" | "Inactivo";
  assignedRoute?: string;
}

const initialChoferes: PersonalMember[] = [
  {
    id: 1,
    type: "Chofer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza",
    fullName: "Carlos Mendoza Quispe",
    phone: "+51 987 654 321",
    licenseNumber: "Q-12345678",
    status: "Activo",
    assignedRoute: "Ruta Norte"
  },
  {
    id: 2,
    type: "Chofer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuisParedes",
    fullName: "Luis Alberto Paredes Cruz",
    phone: "+51 976 543 210",
    licenseNumber: "Q-87654321",
    status: "Activo",
    assignedRoute: "Ruta Sur"
  },
  {
    id: 3,
    type: "Chofer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=RobertoVargas",
    fullName: "Roberto Vargas Huamán",
    phone: "+51 965 432 109",
    licenseNumber: "Q-23456789",
    status: "Activo",
    assignedRoute: "Ruta Este"
  },
  {
    id: 4,
    type: "Chofer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=JuanPerez",
    fullName: "Juan Pérez Gutiérrez",
    phone: "+51 954 321 098",
    licenseNumber: "Q-34567890",
    status: "Activo",
    assignedRoute: "Ruta Centro"
  },
  {
    id: 5,
    type: "Chofer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=PedroFlores",
    fullName: "Pedro Flores Sánchez",
    phone: "+51 943 210 987",
    licenseNumber: "Q-45678901",
    status: "Inactivo",
  },
];

const initialAsistentes: PersonalMember[] = [
  {
    id: 6,
    type: "Asistente",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=RosaHuaman",
    fullName: "Rosa María Huamán Castillo",
    phone: "+51 932 109 876",
    status: "Activo",
    assignedRoute: "Ruta Norte"
  },
  {
    id: 7,
    type: "Asistente",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnaFlores",
    fullName: "Ana Patricia Flores Vega",
    phone: "+51 921 098 765",
    status: "Activo",
    assignedRoute: "Ruta Este"
  },
  {
    id: 8,
    type: "Asistente",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariaLopez",
    fullName: "María López Chávez",
    phone: "+51 910 987 654",
    status: "Activo",
    assignedRoute: "Ruta Centro"
  },
  {
    id: 9,
    type: "Asistente",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarmenTorres",
    fullName: "Carmen Torres Rojas",
    phone: "+51 909 876 543",
    status: "Inactivo",
  },
];

function PersonalForm({
  member,
  defaultType,
  onSave,
  onCancel,
  title,
  description,
}: {
  member?: PersonalMember;
  defaultType: "Chofer" | "Asistente";
  onSave: (v: Partial<PersonalMember>) => void;
  onCancel: () => void;
  title: string;
  description: string;
}) {
  const [type, setType] = useState<"Chofer" | "Asistente">(member?.type || defaultType);
  const [photo, setPhoto] = useState(member?.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=Nuevo${defaultType}`);
  const [fullName, setFullName] = useState(member?.fullName || "");
  const [phone, setPhone] = useState(member?.phone || "");
  const [licenseNumber, setLicenseNumber] = useState(member?.licenseNumber || "");

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label>Tipo de Personal</Label>
          <div className="flex gap-2">
            <Button
              variant={type === "Chofer" ? "default" : "outline"}
              size="sm"
              onClick={() => setType("Chofer")}
            >
              Chofer
            </Button>
            <Button
              variant={type === "Asistente" ? "default" : "outline"}
              size="sm"
              onClick={() => setType("Asistente")}
            >
              Asistente
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="photo">URL de foto</Label>
          <div className="flex items-center gap-3">
            <img
              src={photo}
              alt="Preview"
              className="size-14 rounded-full border object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName || "Default")}`;
              }}
            />
            <Input
              id="photo"
              placeholder="https://api.dicebear.com/..."
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre completo</Label>
          <Input
            id="fullName"
            placeholder="Carlos Mendoza Quispe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            placeholder="+51 987 654 321"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {type === "Chofer" && (
          <div className="space-y-2">
            <Label htmlFor="license">Número de Licencia</Label>
            <Input
              id="license"
              placeholder="Q-12345678"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
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
              type,
              photo,
              fullName,
              phone,
              licenseNumber: type === "Chofer" ? licenseNumber : undefined,
            })
          }
          disabled={!fullName || !phone}
        >
          Guardar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function PersonalCard({
  member,
  onClick,
}: {
  member: PersonalMember;
  onClick: () => void;
}) {
  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={member.photo}
              alt={member.fullName}
              className="size-16 rounded-full border-2 border-border object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(member.fullName)}`;
              }}
            />
            <div className={`absolute -bottom-1 -right-1 size-5 rounded-full border-2 border-card ${member.status === "Activo" ? "bg-success" : "bg-gray-400"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold truncate">{member.fullName}</p>
              <Badge
                variant={member.status === "Activo" ? "default" : "secondary"}
                className="shrink-0"
              >
                {member.status}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="size-3" />
                {member.phone}
              </span>
              {member.licenseNumber && (
                <span className="flex items-center gap-1">
                  <IdCard className="size-3" />
                  {member.licenseNumber}
                </span>
              )}
            </div>
            {member.assignedRoute && (
              <p className="text-xs text-muted-foreground mt-1">
                Ruta asignada: {member.assignedRoute}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EmpresaPersonal() {
  const [choferes, setChoferes] = useState<PersonalMember[]>(initialChoferes);
  const [asistentes, setAsistentes] = useState<PersonalMember[]>(initialAsistentes);
  const [activeTab, setActiveTab] = useState<string>("choferes");
  const [createOpen, setCreateOpen] = useState(false);
  const [editMember, setEditMember] = useState<PersonalMember | null>(null);

  const isChoferes = activeTab === "choferes";

  const handleCreate = (data: Partial<PersonalMember>) => {
    const newMember: PersonalMember = {
      id: Math.max(0, ...[...choferes, ...asistentes].map((m) => m.id)) + 1,
      type: data.type || "Chofer",
      photo: data.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.fullName || "Nuevo")}`,
      fullName: data.fullName || "",
      phone: data.phone || "",
      licenseNumber: data.licenseNumber,
      status: "Activo",
    };
    if (newMember.type === "Chofer") {
      setChoferes([...choferes, newMember]);
    } else {
      setAsistentes([...asistentes, newMember]);
    }
    setCreateOpen(false);
  };

  const handleEdit = (data: Partial<PersonalMember>) => {
    if (!editMember) return;
    const updated = {
      ...editMember,
      type: data.type || editMember.type,
      photo: data.photo || editMember.photo,
      fullName: data.fullName || editMember.fullName,
      phone: data.phone || editMember.phone,
      licenseNumber: data.type === "Chofer" ? (data.licenseNumber ?? editMember.licenseNumber) : undefined,
    };

    if (updated.type === "Chofer") {
      setChoferes(choferes.map((m) => (m.id === updated.id ? updated : m)));
      if (editMember.type === "Asistente") {
        setAsistentes(asistentes.filter((m) => m.id !== updated.id));
      }
    } else {
      setAsistentes(asistentes.map((m) => (m.id === updated.id ? updated : m)));
      if (editMember.type === "Chofer") {
        setChoferes(choferes.filter((m) => m.id !== updated.id));
      }
    }
    setEditMember(null);
  };

  const activeCount = [...choferes, ...asistentes].filter((m) => m.status === "Activo").length;
  const totalCount = choferes.length + asistentes.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Personal</h2>
          <p className="text-muted-foreground">
            Administra choferes y asistentes
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              onClick={() => setActiveTab("choferes")}
            >
              <Plus className="mr-2 size-4" />
              {isChoferes ? "Nuevo Chofer" : "Nuevo Asistente"}
            </Button>
          </DialogTrigger>
          <PersonalForm
            defaultType={isChoferes ? "Chofer" : "Asistente"}
            title={isChoferes ? "Nuevo Chofer" : "Nuevo Asistente"}
            description={`Registra un nuevo ${isChoferes ? "chofer" : "asistente"} en el sistema`}
            onSave={handleCreate}
            onCancel={() => setCreateOpen(false)}
          />
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Personal Registrado</CardTitle>
              <CardDescription>
                {activeCount} activos de {totalCount} registrados
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Circle className="size-3 fill-success text-success" />
                  <span className="text-muted-foreground">
                    {choferes.filter((c) => c.status === "Activo").length} choferes activos
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <Circle className="size-3 fill-primary text-primary" />
                  <span className="text-muted-foreground">
                    {asistentes.filter((a) => a.status === "Activo").length} asistentes activos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="choferes">
                Choferes ({choferes.length})
              </TabsTrigger>
              <TabsTrigger value="asistentes">
                Asistentes ({asistentes.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="choferes" className="space-y-3">
              {choferes.map((ch) => (
                <PersonalCard
                  key={ch.id}
                  member={ch}
                  onClick={() => setEditMember(ch)}
                />
              ))}
              {choferes.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No hay choferes registrados
                </p>
              )}
            </TabsContent>
            <TabsContent value="asistentes" className="space-y-3">
              {asistentes.map((as) => (
                <PersonalCard
                  key={as.id}
                  member={as}
                  onClick={() => setEditMember(as)}
                />
              ))}
              {asistentes.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No hay asistentes registrados
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={!!editMember} onOpenChange={(open) => !open && setEditMember(null)}>
        {editMember && (
          <PersonalForm
            defaultType={editMember.type}
            member={editMember}
            title={`Editar ${editMember.type}`}
            description={`Editando datos de ${editMember.fullName}`}
            onSave={handleEdit}
            onCancel={() => setEditMember(null)}
          />
        )}
      </Dialog>
    </div>
  );
}
