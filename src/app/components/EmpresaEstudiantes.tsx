import { useState, useEffect } from "react";
import { Search, Plus, Users, School, Filter, ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
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
import { EmpresaEstudianteDetalle, StudentDetailData } from "./EmpresaEstudianteDetalle";

const initialStudents: StudentDetailData[] = [
  {
    id: 1,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    name: "Sofía Ramírez Torres",
    age: 8,
    school: "Colegio San Francisco de Asís",
    grade: "3° Primaria",
    specialNeeds: true,
    specialNeedsList: [
      {
        category: "Alergia",
        description: "Alergia al maní y frutos secos",
        notes: "Llevar epinefrina autoinyectable en todo momento. Revisar etiquetas de alimentos en celebraciones escolares. Coordinado con enfermería del colegio."
      }
    ],
    guardian: "Ana Torres",
    guardianPhone: "+51 987 111 222",
    guardianAltPhone: "+51 987 333 444",
    guardianAddress: "Calle Los Pinos #45, San Isidro, Lima",
    emergencyContact: "Roberto Ramírez (Padre)",
    emergencyPhone: "+51 987 555 666",
    status: "Activo",
    assignedRoute: "Ruta Norte",
    assignedStop: "Parada 1 — Calle Los Pinos #45",
    pickupTime: "6:45 AM",
    dropoffTime: "3:15 PM",
    vehiclePlate: "AQP-832",
    driverName: "Carlos Mendoza Quispe",
    driverPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza",
    paymentPlan: "Plan Regular Mensual - S/ 450",
    invoices: [
      { id: 101, number: "FAC-2026-0501", period: "Mayo 2026", amount: 445, status: "Pagado", dueDate: "2026-05-05", paymentDate: "2026-05-03" },
      { id: 102, number: "FAC-2026-0401", period: "Abril 2026", amount: 450, status: "Pagado", dueDate: "2026-04-05", paymentDate: "2026-04-02" },
      { id: 103, number: "FAC-2026-0301", period: "Marzo 2026", amount: 450, status: "Pagado", dueDate: "2026-03-05", paymentDate: "2026-03-04" },
    ],
    rideHistory: [
      { id: 1001, date: "2026-05-16", type: "Recogida", status: "A tiempo", time: "6:47 AM", loggedBy: "Carlos Mendoza", stop: "Parada 1 — Calle Los Pinos #45" },
      { id: 1002, date: "2026-05-15", type: "Entrega", status: "A tiempo", time: "3:17 PM", loggedBy: "Rosa María Huamán", stop: "Parada 1 — Calle Los Pinos #45" },
      { id: 1003, date: "2026-05-15", type: "Recogida", status: "Retraso", time: "6:52 AM", loggedBy: "Carlos Mendoza", stop: "Parada 1 — Calle Los Pinos #45" },
      { id: 1004, date: "2026-05-14", type: "Entrega", status: "A tiempo", time: "3:14 PM", loggedBy: "Rosa María Huamán", stop: "Parada 1 — Calle Los Pinos #45" },
      { id: 1005, date: "2026-05-14", type: "Recogida", status: "A tiempo", time: "6:45 AM", loggedBy: "Carlos Mendoza", stop: "Parada 1 — Calle Los Pinos #45" },
    ],
  },
  {
    id: 2,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian",
    name: "Sebastián Torres Ramírez",
    age: 10,
    school: "Colegio Santa María",
    grade: "5° Primaria",
    specialNeeds: false,
    specialNeedsList: [],
    guardian: "Roberto Ramírez",
    guardianPhone: "+51 987 555 666",
    guardianAltPhone: "",
    guardianAddress: "Jr. Los Olivos 234, San Isidro, Lima",
    emergencyContact: "Ana Torres (Madre)",
    emergencyPhone: "+51 987 111 222",
    status: "Activo",
    assignedRoute: "Ruta Norte",
    assignedStop: "Parada 3 — Jr. Los Olivos 234",
    pickupTime: "7:10 AM",
    dropoffTime: "2:50 PM",
    vehiclePlate: "AQP-832",
    driverName: "Carlos Mendoza Quispe",
    driverPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza",
    paymentPlan: "Plan Regular Mensual - S/ 450",
    invoices: [
      { id: 201, number: "FAC-2026-0502", period: "Mayo 2026", amount: 475, status: "Pendiente", dueDate: "2026-05-05" },
      { id: 202, number: "FAC-2026-0402", period: "Abril 2026", amount: 450, status: "Pagado", dueDate: "2026-04-05", paymentDate: "2026-04-04" },
    ],
    rideHistory: [
      { id: 2001, date: "2026-05-16", type: "Recogida", status: "Ausente", time: "7:10 AM", loggedBy: "Carlos Mendoza", stop: "Parada 3 — Jr. Los Olivos 234" },
      { id: 2002, date: "2026-05-15", type: "Recogida", status: "A tiempo", time: "7:10 AM", loggedBy: "Carlos Mendoza", stop: "Parada 3 — Jr. Los Olivos 234" },
    ],
  },
  {
    id: 3,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina",
    name: "Valentina Pérez Sánchez",
    age: 7,
    school: "Colegio San Francisco de Asís",
    grade: "2° Primaria",
    specialNeeds: false,
    specialNeedsList: [],
    guardian: "María Sánchez",
    guardianPhone: "+51 976 222 333",
    guardianAltPhone: "",
    guardianAddress: "Calle Real 789, Breña, Lima",
    emergencyContact: "Felipe Pérez (Padre)",
    emergencyPhone: "+51 976 444 555",
    status: "Activo",
    assignedRoute: "Ruta Centro",
    assignedStop: "Parada 1 — Jr. Libertad 456",
    pickupTime: "6:50 AM",
    dropoffTime: "3:20 PM",
    vehiclePlate: "BXK-445",
    driverName: "Juan Pérez Gutiérrez",
    driverPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=JuanPerez",
    paymentPlan: "Plan Regular Mensual - S/ 450",
    invoices: [
      { id: 301, number: "FAC-2026-0503", period: "Mayo 2026", amount: 450, status: "Pagado", dueDate: "2026-05-05", paymentDate: "2026-05-04" },
      { id: 302, number: "FAC-2026-0403", period: "Abril 2026", amount: 450, status: "Pagado", dueDate: "2026-04-05", paymentDate: "2026-04-01" },
    ],
    rideHistory: [
      { id: 3001, date: "2026-05-16", type: "Recogida", status: "A tiempo", time: "6:51 AM", loggedBy: "Juan Pérez", stop: "Parada 1 — Jr. Libertad 456" },
      { id: 3002, date: "2026-05-15", type: "Recogida", status: "A tiempo", time: "6:49 AM", loggedBy: "Juan Pérez", stop: "Parada 1 — Jr. Libertad 456" },
    ],
  },
  {
    id: 4,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego",
    name: "Diego Mendoza Castillo",
    age: 9,
    school: "Colegio Nuestra Señora del Carmen",
    grade: "4° Primaria",
    specialNeeds: true,
    specialNeedsList: [
      {
        category: "Cognitiva",
        description: "TDAH diagnosticado",
        notes: "Requiere asiento cerca del asistente. Medicación administrada en casa antes de la recogida. Permitir pausas si muestra inquietud."
      },
      {
        category: "Sensorial",
        description: "Sensibilidad auditiva",
        notes: "Sensible a ruidos fuertes. Ubicar en asiento delantero. Avisar antes de pasar por zonas con tráfico pesado o bocinas."
      }
    ],
    guardian: "Carmen Castillo",
    guardianPhone: "+51 965 111 888",
    guardianAltPhone: "+51 965 222 999",
    guardianAddress: "Av. Universitaria 1200, San Miguel, Lima",
    emergencyContact: "Víctor Mendoza (Padre)",
    emergencyPhone: "+51 965 333 000",
    status: "Activo",
    assignedRoute: "Ruta Sur",
    assignedStop: "Parada 1 — Jr. Los Pinos 345",
    pickupTime: "6:40 AM",
    dropoffTime: "3:30 PM",
    vehiclePlate: "CML-912",
    driverName: "Luis Alberto Paredes Cruz",
    driverPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuisParedes",
    paymentPlan: "Plan Completo (Mañana + Tarde) - S/ 800",
    invoices: [
      { id: 401, number: "FAC-2026-0504", period: "Mayo 2026", amount: 440, status: "Vencido", dueDate: "2026-05-05" },
      { id: 402, number: "FAC-2026-0404", period: "Abril 2026", amount: 800, status: "Pagado", dueDate: "2026-04-05", paymentDate: "2026-04-10" },
      { id: 403, number: "FAC-2026-0304", period: "Marzo 2026", amount: 800, status: "Pagado", dueDate: "2026-03-05", paymentDate: "2026-03-03" },
    ],
    rideHistory: [
      { id: 4001, date: "2026-05-16", type: "Recogida", status: "Justificado", time: "—", loggedBy: "Sistema", stop: "Parada 1 — Jr. Los Pinos 345" },
      { id: 4002, date: "2026-05-15", type: "Recogida", status: "A tiempo", time: "6:41 AM", loggedBy: "Luis Paredes", stop: "Parada 1 — Jr. Los Pinos 345" },
      { id: 4003, date: "2026-05-15", type: "Entrega", status: "Retraso", time: "3:42 PM", loggedBy: "Ana Flores", stop: "Parada 1 — Jr. Los Pinos 345" },
    ],
  },
];

const schoolOptions = [
  { value: "san-francisco", label: "Colegio San Francisco de Asís" },
  { value: "santa-maria", label: "Colegio Santa María" },
  { value: "carmen", label: "Colegio Nuestra Señora del Carmen" },
];

export function EmpresaEstudiantes() {
  const [students, setStudents] = useState<StudentDetailData[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSchool, setFilterSchool] = useState("all-schools");
  const [selectedStudent, setSelectedStudent] = useState<StudentDetailData | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = students.filter((s) => {
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.school.toLowerCase().includes(search.toLowerCase()) ||
      s.guardian.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && s.status === "Activo") ||
      (filterStatus === "inactive" && s.status === "Inactivo");
    const matchesSchool =
      filterSchool === "all-schools" ||
      schoolOptions.find((o) => o.value === filterSchool)?.label === s.school;
    return matchesSearch && matchesStatus && matchesSchool;
  });

  if (selectedStudent) {
    return (
      <EmpresaEstudianteDetalle
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Estudiantes</h2>
          <p className="text-muted-foreground">
            Administra el registro de estudiantes transportados
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="mr-2 size-4" />
              Nuevo Estudiante
            </Button>
          </DialogTrigger>
          <StudentCreateDialog
            onSave={(data) => {
              const newStudent: StudentDetailData = {
                id: Math.max(0, ...students.map((s) => s.id)) + 1,
                photo: data.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name || "Nuevo")}`,
                name: data.name || "",
                age: data.age || 0,
                school: data.school || "",
                grade: data.grade || "",
                specialNeeds: data.specialNeeds || false,
                specialNeedsList: [],
                guardian: data.guardian || "",
                guardianPhone: data.guardianPhone || "",
                guardianAltPhone: "",
                guardianAddress: "",
                emergencyContact: "",
                emergencyPhone: "",
                status: "Activo",
                assignedRoute: "",
                assignedStop: "",
                pickupTime: "",
                dropoffTime: "",
                vehiclePlate: "",
                driverName: "",
                driverPhoto: "",
                paymentPlan: "",
                invoices: [],
                rideHistory: [],
              };
              setStudents([...students, newStudent]);
              setCreateOpen(false);
            }}
            onCancel={() => setCreateOpen(false)}
          />
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estudiantes Registrados</CardTitle>
          <CardDescription>
            {filtered.length} de {students.length} estudiantes mostrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, colegio o tutor..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 size-4" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSchool} onValueChange={setFilterSchool}>
              <SelectTrigger className="w-[200px]">
                <School className="mr-2 size-4" />
                <SelectValue placeholder="Filtrar por colegio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-schools">Todos los colegios</SelectItem>
                {schoolOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border table-responsive">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Colegio</TableHead>
                  <TableHead>Grado</TableHead>
                  <TableHead>Tutor</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={`sk-${i}`}>
                      <TableCell><div className="flex items-center gap-3"><Skeleton className="size-10 rounded-full" /><div className="space-y-1"><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-24" /></div></div></TableCell>
                      <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-14 rounded-full" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No se encontraron estudiantes con los filtros seleccionados
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((student) => (
                  <TableRow key={student.id} className="cursor-pointer hover:bg-accent/50">
                    <TableCell onClick={() => setSelectedStudent(student)}>
                      <div className="flex items-center gap-3">
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="size-10 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(student.name)}`;
                          }}
                        />
                        <div>
                          <p className="font-medium">{student.name}</p>
                          {student.specialNeeds && (
                            <Badge variant="outline" className="mt-1">
                              Necesidades especiales
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell onClick={() => setSelectedStudent(student)}>
                      {student.age} años
                    </TableCell>
                    <TableCell onClick={() => setSelectedStudent(student)} className="max-w-[200px] truncate">
                      {student.school}
                    </TableCell>
                    <TableCell onClick={() => setSelectedStudent(student)}>{student.grade}</TableCell>
                    <TableCell onClick={() => setSelectedStudent(student)}>{student.guardian}</TableCell>
                    <TableCell onClick={() => setSelectedStudent(student)}>
                      <Badge variant={student.status === "Activo" ? "default" : "secondary"}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudent(student);
                        }}
                      >
                        Ver detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentCreateDialog({
  onSave,
  onCancel,
}: {
  onSave: (data: Partial<StudentDetailData>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [guardian, setGuardian] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "El nombre es obligatorio";
    if (!age || Number(age) < 1) e.age = "Edad inválida";
    if (!school) e.school = "Selecciona un colegio";
    if (!grade.trim()) e.grade = "El grado es obligatorio";
    if (!guardian.trim()) e.guardian = "El tutor es obligatorio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      onSave({ name, age: Number(age), school, grade, guardian, guardianPhone });
      setSubmitting(false);
      toast.success("Estudiante registrado correctamente");
    }, 600);
  };

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Nuevo Estudiante</DialogTitle>
        <DialogDescription>
          Registra un nuevo estudiante en el sistema
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="sname">Nombre completo</Label>
          <Input id="sname" placeholder="Sofía Ramírez Torres" value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sage">Edad</Label>
            <Input id="sage" type="number" placeholder="8" value={age} onChange={(e) => { setAge(e.target.value); setErrors((p) => ({ ...p, age: "" })); }} />
            {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sgrade">Grado</Label>
            <Input id="sgrade" placeholder="3° Primaria" value={grade} onChange={(e) => { setGrade(e.target.value); setErrors((p) => ({ ...p, grade: "" })); }} />
            {errors.grade && <p className="text-xs text-destructive">{errors.grade}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sschool">Colegio</Label>
          <Select value={school} onValueChange={(v) => { setSchool(v); setErrors((p) => ({ ...p, school: "" })); }}>
            <SelectTrigger id="sschool"><SelectValue placeholder="Seleccionar colegio" /></SelectTrigger>
            <SelectContent>{schoolOptions.map((s) => (<SelectItem key={s.value} value={s.label}>{s.label}</SelectItem>))}</SelectContent>
          </Select>
          {errors.school && <p className="text-xs text-destructive">{errors.school}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sguardian">Tutor</Label>
            <Input id="sguardian" placeholder="Ana Torres" value={guardian} onChange={(e) => { setGuardian(e.target.value); setErrors((p) => ({ ...p, guardian: "" })); }} />
            {errors.guardian && <p className="text-xs text-destructive">{errors.guardian}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sphone">Teléfono del tutor</Label>
            <Input id="sphone" placeholder="+51 987 111 222" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel} disabled={submitting}>Cancelar</Button>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          Registrar Estudiante
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
