import { useState, useEffect } from "react";
import { Search, Plus, Building, Phone, Mail, MapPin, MoreHorizontal, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Company {
  id: number;
  name: string;
  ruc: string;
  phone: string;
  email: string;
  address: string;
  status: "Activo" | "Inactivo";
  students: number;
  routes: number;
  joinedDate: string;
  adminName: string;
  adminPhone: string;
}

const initialCompanies: Company[] = [
  {
    id: 1,
    name: "Transportes Lima SAC",
    ruc: "20100123456",
    phone: "+51 987 654 321",
    email: "info@transporteslima.pe",
    address: "Av. Arequipa 1200, Miraflores, Lima",
    status: "Activo",
    students: 487,
    routes: 24,
    joinedDate: "2024-01-15",
    adminName: "María González",
    adminPhone: "+51 987 111 000",
  },
  {
    id: 2,
    name: "Transportes Los Andes SRL",
    ruc: "20400567890",
    phone: "+51 976 543 210",
    email: "contacto@losandes.pe",
    address: "Jr. Los Olivos 345, San Isidro, Lima",
    status: "Activo",
    students: 312,
    routes: 15,
    joinedDate: "2024-03-10",
    adminName: "Jorge Huamán Torres",
    adminPhone: "+51 976 111 222",
  },
  {
    id: 3,
    name: "Movilidad Escolar Norte SAC",
    ruc: "20500987654",
    phone: "+51 965 432 109",
    email: "admin@movilidadnorte.pe",
    address: "Av. Universitaria 1500, San Martín de Porres, Lima",
    status: "Activo",
    students: 245,
    routes: 12,
    joinedDate: "2024-05-20",
    adminName: "Carmen Rojas Vega",
    adminPhone: "+51 965 333 444",
  },
  {
    id: 4,
    name: "Bus Escolar Centro SRL",
    ruc: "20111222333",
    phone: "+51 954 321 098",
    email: "info@busescolarcentro.pe",
    address: "Calle Real 789, Breña, Lima",
    status: "Activo",
    students: 198,
    routes: 10,
    joinedDate: "2024-07-01",
    adminName: "Roberto Flores Díaz",
    adminPhone: "+51 954 555 666",
  },
  {
    id: 5,
    name: "Transporte Andino EIRL",
    ruc: "20600777444",
    phone: "+51 943 210 987",
    email: "contacto@transporteandino.pe",
    address: "Av. La Molina 800, La Molina, Lima",
    status: "Inactivo",
    students: 156,
    routes: 8,
    joinedDate: "2024-02-28",
    adminName: "Luis Paredes Gutiérrez",
    adminPhone: "+51 943 777 888",
  },
  {
    id: 6,
    name: "Corporación Educativa San Martín S.A.C.",
    ruc: "20444888999",
    phone: "+51 932 109 876",
    email: "adm@corpsanmartin.pe",
    address: "Av. Brasil 500, Jesús María, Lima",
    status: "Inactivo",
    students: 0,
    routes: 0,
    joinedDate: "2025-11-01",
    adminName: "Andrea Sánchez Paz",
    adminPhone: "+51 932 999 000",
  },
  {
    id: 7,
    name: "Rutas Escolares del Sur SAC",
    ruc: "20333555666",
    phone: "+51 921 098 765",
    email: "info@rutasdelsur.pe",
    address: "Av. Benavides 2300, Surco, Lima",
    status: "Activo",
    students: 178,
    routes: 9,
    joinedDate: "2024-08-15",
    adminName: "Diego Castro Ramos",
    adminPhone: "+51 921 444 555",
  },
  {
    id: 8,
    name: "Transporte Escolar Callao SRL",
    ruc: "20222999333",
    phone: "+51 910 987 654",
    email: "info@transportecallao.pe",
    address: "Av. Sáenz Peña 1200, Callao",
    status: "Activo",
    students: 134,
    routes: 7,
    joinedDate: "2024-11-10",
    adminName: "Patricia Vega Huamán",
    adminPhone: "+51 910 111 333",
  },
];

export function AdminEmpresas() {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);
  const [filterStatus, setFilterStatus] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editCompany, setEditCompany] = useState<Company | null>(null);
  const [detailCompany, setDetailCompany] = useState<Company | null>(null);

  const filtered = companies.filter((c) => {
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.ruc.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const activeCount = companies.filter((c) => c.status === "Activo").length;
  const totalStudents = companies.reduce((s, c) => s + c.students, 0);

  const toggleStatus = (id: number) => {
    setCompanies(
      companies.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Activo" ? "Inactivo" as const : "Activo" as const }
          : c
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Empresas</h2>
          <p className="text-muted-foreground">
            Administra las empresas registradas en la plataforma
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="mr-2 size-4" />
              Nueva Empresa
            </Button>
          </DialogTrigger>
          <CompanyForm
            title="Nueva Empresa"
            description="Registra una nueva empresa en la plataforma"
            onSave={(data) => {
              setCompanies([
                ...companies,
                {
                  id: Math.max(0, ...companies.map((c) => c.id)) + 1,
                  name: data.name || "",
                  ruc: data.ruc || "",
                  phone: data.phone || "",
                  email: data.email || "",
                  address: data.address || "",
                  status: "Inactivo",
                  students: 0,
                  routes: 0,
                  joinedDate: new Date().toISOString().split("T")[0],
                  adminName: data.adminName || "",
                  adminPhone: data.adminPhone || "",
                },
              ]);
              setCreateOpen(false);
            }}
            onCancel={() => setCreateOpen(false)}
          />
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Empresas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{companies.length}</div>
            <p className="text-xs text-muted-foreground">{activeCount} activas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estudiantes Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-primary">{totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">En todas las empresas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Empresas Inactivas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-destructive">
              {companies.filter((c) => c.status === "Inactivo").length}
            </div>
            <p className="text-xs text-muted-foreground">Requieren activación</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Empresas Registradas</CardTitle>
          <CardDescription>
            {filtered.length} de {companies.length} empresas mostradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, RUC o email..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filtrar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Activo">Activas</SelectItem>
                <SelectItem value="Inactivo">Inactivas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border table-responsive">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>RUC</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead className="text-right">Estudiantes</TableHead>
                  <TableHead className="text-right">Rutas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={`sk-${i}`}>
                      <TableCell><Skeleton className="h-4 w-40 mb-1" /><Skeleton className="h-3 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><div className="space-y-1"><Skeleton className="h-4 w-28" /><Skeleton className="h-4 w-32" /></div></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-8 ml-auto" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-6 ml-auto" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-28 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No se encontraron empresas
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Ingreso: {new Date(company.joinedDate).toLocaleDateString("es-PE")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{company.ruc}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="size-3 text-muted-foreground" />
                          {company.phone}
                        </p>
                        <p className="text-sm flex items-center gap-1 text-muted-foreground">
                          <Mail className="size-3" />
                          {company.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {company.students}
                    </TableCell>
                    <TableCell className="text-right">{company.routes}</TableCell>
                    <TableCell>
                      <Badge
                        variant={company.status === "Activo" ? "default" : "secondary"}
                      >
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditCompany(company)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={
                            company.status === "Activo"
                              ? "text-destructive hover:text-destructive"
                              : "text-success hover:text-success"
                          }
                          onClick={() => toggleStatus(company.id)}
                        >
                          {company.status === "Activo" ? "Desactivar" : "Activar"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDetailCompany(company)}
                        >
                          Ver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editCompany} onOpenChange={(open) => !open && setEditCompany(null)}>
        {editCompany && (
          <CompanyForm
            title="Editar Empresa"
            description={`Editando ${editCompany.name}`}
            company={editCompany}
            onSave={(data) => {
              setCompanies(
                companies.map((c) =>
                  c.id === editCompany.id
                    ? {
                        ...c,
                        name: data.name || c.name,
                        ruc: data.ruc || c.ruc,
                        phone: data.phone || c.phone,
                        email: data.email || c.email,
                        address: data.address || c.address,
                        adminName: data.adminName || c.adminName,
                        adminPhone: data.adminPhone || c.adminPhone,
                      }
                    : c
                )
              );
              setEditCompany(null);
            }}
            onCancel={() => setEditCompany(null)}
          />
        )}
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={!!detailCompany} onOpenChange={(open) => !open && setDetailCompany(null)}>
        {detailCompany && (
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>{detailCompany.name}</DialogTitle>
              <DialogDescription>Detalle completo de la empresa</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-3">
                <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building className="size-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{detailCompany.name}</h3>
                  <Badge
                    variant={detailCompany.status === "Activo" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {detailCompany.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">RUC</p>
                  <p className="font-mono">{detailCompany.ruc}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fecha de Ingreso</p>
                  <p>{new Date(detailCompany.joinedDate).toLocaleDateString("es-PE")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Teléfono</p>
                  <p className="flex items-center gap-1">
                    <Phone className="size-3" />
                    {detailCompany.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="flex items-center gap-1 text-sm">
                    <Mail className="size-3" />
                    {detailCompany.email}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Dirección</p>
                <p className="flex items-start gap-1">
                  <MapPin className="size-3 mt-0.5 shrink-0" />
                  {detailCompany.address}
                </p>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm font-semibold mb-2">Administrador de la empresa</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Nombre</p>
                    <p className="font-medium">{detailCompany.adminName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Teléfono</p>
                    <p className="flex items-center gap-1">
                      <Phone className="size-3" />
                      {detailCompany.adminPhone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-3 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-accent/50 text-center">
                  <p className="text-2xl font-bold text-primary">{detailCompany.students}</p>
                  <p className="text-xs text-muted-foreground">Estudiantes</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/50 text-center">
                  <p className="text-2xl font-bold text-primary">{detailCompany.routes}</p>
                  <p className="text-xs text-muted-foreground">Rutas</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailCompany(null)}>
                Cerrar
              </Button>
              <Button onClick={() => {
                setDetailCompany(null);
                setEditCompany(detailCompany);
              }}>
                Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

function CompanyForm({
  company,
  onSave,
  onCancel,
  title,
  description,
}: {
  company?: Company;
  onSave: (data: Partial<Company>) => void;
  onCancel: () => void;
  title: string;
  description: string;
}) {
  const [name, setName] = useState(company?.name || "");
  const [ruc, setRuc] = useState(company?.ruc || "");
  const [phone, setPhone] = useState(company?.phone || "");
  const [email, setEmail] = useState(company?.email || "");
  const [address, setAddress] = useState(company?.address || "");
  const [adminName, setAdminName] = useState(company?.adminName || "");
  const [adminPhone, setAdminPhone] = useState(company?.adminPhone || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "El nombre es obligatorio";
    if (!ruc.trim() || ruc.length < 10) e.ruc = "RUC inválido (min 10 dígitos)";
    if (!phone.trim()) e.phone = "El teléfono es obligatorio";
    if (!email.trim() || !email.includes("@")) e.email = "Email inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      onSave({ name, ruc, phone, email, address, adminName, adminPhone });
      setSubmitting(false);
      toast.success(company ? "Empresa actualizada" : "Empresa registrada");
    }, 600);
  };

  const clearErr = (field: string) => setErrors((p) => ({ ...p, [field]: "" }));

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="cname">Nombre de la Empresa</Label>
          <Input id="cname" placeholder="Transportes Lima SAC" value={name} onChange={(e) => { setName(e.target.value); clearErr("name"); }} />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cruc">RUC</Label>
            <Input id="cruc" placeholder="20100123456" value={ruc} onChange={(e) => { setRuc(e.target.value); clearErr("ruc"); }} />
            {errors.ruc && <p className="text-xs text-destructive">{errors.ruc}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cphone">Teléfono</Label>
            <Input id="cphone" placeholder="+51 987 654 321" value={phone} onChange={(e) => { setPhone(e.target.value); clearErr("phone"); }} />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cemail">Email</Label>
          <Input id="cemail" type="email" placeholder="info@empresa.pe" value={email} onChange={(e) => { setEmail(e.target.value); clearErr("email"); }} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="caddress">Dirección</Label>
          <Input id="caddress" placeholder="Av. Arequipa 1200, Lima" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="border-t pt-3">
          <p className="text-sm font-semibold mb-3">Administrador de la Empresa</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cadmin">Nombre completo</Label>
              <Input id="cadmin" placeholder="María González" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cadminphone">Teléfono</Label>
              <Input id="cadminphone" placeholder="+51 987 111 000" value={adminPhone} onChange={(e) => setAdminPhone(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel} disabled={submitting}>Cancelar</Button>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          Guardar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
