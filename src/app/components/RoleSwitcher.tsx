import { Building2, Shield, Users, Bus } from "lucide-react";
import { Button } from "./ui/button";

export type Role = "admin" | "empresa" | "familia" | "chofer";

interface RoleSwitcherProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

const roles: Array<{ id: Role; icon: typeof Building2; label: string }> = [
  { id: "empresa", icon: Building2, label: "Empresa" },
  { id: "admin", icon: Shield, label: "Admin" },
  { id: "familia", icon: Users, label: "Familia" },
  { id: "chofer", icon: Bus, label: "Chofer" },
];

export function RoleSwitcher({ role, onRoleChange }: RoleSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-card border rounded-full px-1.5 py-1 shadow-sm">
      {roles.map((r) => (
        <Button
          key={r.id}
          size="sm"
          variant={role === r.id ? "default" : "ghost"}
          className="rounded-full h-7 text-xs px-2.5"
          onClick={() => onRoleChange(r.id)}
        >
          <r.icon className="mr-1 size-3.5" />
          {r.label}
        </Button>
      ))}
    </div>
  );
}
