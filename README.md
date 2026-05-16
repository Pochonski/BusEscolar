# BusEscolar

Plataforma SaaS de gestion de transporte escolar. Aplicacion web (desktop-first, responsiva) con vistas moviles para familias y choferes.

## Stack tecnologico

| Tecnologia | Version | Proposito |
|---|---|---|
| TypeScript | -- | Lenguaje principal |
| React | 18.3.1 | Libreria UI |
| Vite | 6.3.5 | Build tool y servidor de desarrollo |
| Tailwind CSS | 4.1.12 | Framework CSS utilitario |
| shadcn/ui | 1.x | Componentes UI (basados en Radix UI) |
| Recharts | 2.15.2 | Graficos (lineas, barras, torta) |
| Lucide React | 0.487.0 | Set de iconos |
| React Hook Form | 7.55.0 | Manejo de formularios |
| React Day Picker | 8.10.1 | Selector de fechas |
| Motion | via tw-animate-css | Animaciones CSS |
| Sonner | 2.0.3 | Notificaciones toast |

### Dependencias de infraestructura (shadcn/ui)

| Paquete | Uso |
|---|---|
| @radix-ui/* | Primitivos accesibles (dialog, select, tabs, sidebar, etc.) |
| class-variance-authority | Variantes de componentes |
| clsx, tailwind-merge | Utilidades de clases CSS |
| cmdk | Comando / busqueda con teclado |
| embla-carousel-react | Carrusel |
| input-otp | Campo OTP |
| next-themes | Tema claro/oscuro |
| react-resizable-panels | Paneles redimensionables |
| vaul | Drawer / bottom sheet |

---

## Roles y funcionalidades

La aplicacion tiene **4 roles** con vistas independientes, navegables desde un toggle flotante en la esquina superior derecha. La navegacion se maneja con `useState` (sin libreria de routing).

### 1. Administrador (Super Admin) — Vista desktop

| Pantalla | Descripcion |
|---|---|
| **Dashboard** | KPIs del sistema: empresas activas, estudiantes transportados, ingresos mensuales, incidencias activas. Feed de actividad y top empresas. |
| **Empresas** | CRUD completo de empresas: tabla con busqueda, filtros, modal de creacion/edicion/detalle. Campos: nombre, RUC, telefono, email, estado. |

### 2. Empresa (Transport Company Manager) — Vista desktop

| Pantalla | Descripcion |
|---|---|
| **Dashboard** | KPIs de la empresa, grafico de ingresos (line chart), sesiones de ruta activas, feed de eventos. |
| **Estudiantes** | Tabla de estudiantes con busqueda, filtros y vista de detalle con tabs (datos generales, necesidades especiales, pagos, historial de viajes). |
| **Rutas** | Vista dividida: lista de rutas + mapa. Editor de rutas con paradas ordenables, asignacion de vehiculo/chofer/asistente, polilinea en mapa. |
| **Vehiculos** | Grid de tarjetas con foto, placa, modelo. Modal de creacion/edicion con foto, placa, marca, modelo, ano, color, capacidad, GPS ID. |
| **Personal** | Dos tabs: Choferes y Asistentes. Tarjetas con foto, nombre, telefono, licencia. Formulario de creacion. |
| **Pagos** | Planes de cobro (tabla CRUD), Facturacion (tabla con estados de pago, registro de pagos, generacion masiva), Reporte de cobranza (grafico de barras, desglose por estudiante). |
| **Eventos** | Tabla de incidencias con filtros por tipo/severidad/fecha. Modal de reporte. |
| **Tracking** | Sesiones de ruta del dia con tarjetas de estudiantes y sus estados, mapa en vivo con posicion del vehiculo. |

### 3. Familia / Encargado (Guardian) — Vista movil 390px

| Pantalla | Descripcion |
|---|---|
| **Inicio** | Dashboard con saludo, tarjeta de servicio del dia (estados animados), pagos proximos, notificaciones recientes. |
| **Mapa** | Tracking en vivo SVG con bus animado, paradas, polilinea, bottom sheet con info del chofer. |
| **Pagos** | Historial de facturas con estados. Boton "Pagar ahora" con modal de pago. |
| **Notificaciones** | Lista con borde azul para no leidas, swipe para descartar, marcar todas como leidas. |
| **Reportar** | Formulario de novedades: tipo, fecha, descripcion. |
| **Perfil** | Datos del estudiante, servicio asignado, necesidades especiales. |

### 4. Chofer (Driver) — Vista movil 390px

| Pantalla | Descripcion |
|---|---|
| **Mi Ruta** | Checklist de ruta diaria con paradas, estudiantes, acciones recoger/ausente, toggle manana/tarde, iniciar/finalizar ruta. |
| **Mapa** | Vista de mapa del chofer. |
| **Reportar** | Reporte rapido de incidencias con seleccion de tipo, severidad, descripcion y foto. |
| **Perfil** | Datos del chofer. |

---

## Arquitectura

```
src/
├── main.tsx                     # Entry point: monta <App /> en #root
├── styles/
│   ├── index.css                # Importa fonts.css + tailwind.css + theme.css
│   ├── fonts.css                # Google Fonts: Inter (400-700)
│   ├── tailwind.css             # Tailwind v4 + tw-animate-css
│   └── theme.css                # Design system BusEscolar (colores, tipografia, dark mode)
└── app/
    ├── App.tsx                  # App principal: switch de roles via useState
    └── components/
        ├── AdminLayout.tsx      # Sidebar desktop para Admin
        ├── AdminDashboard.tsx   # Dashboard Admin
        ├── AdminEmpresas.tsx    # Gestion de empresas
        ├── EmpresaLayout.tsx    # Sidebar desktop para Empresa
        ├── EmpresaDashboard.tsx # Dashboard Empresa
        ├── EmpresaEstudiantes.tsx      # Gestion de estudiantes
        ├── EmpresaEstudianteDetalle.tsx # Detalle de estudiante con tabs
        ├── EmpresaRutas.tsx      # Gestion de rutas + mapa
        ├── EmpresaVehiculos.tsx  # Gestion de vehiculos
        ├── EmpresaPersonal.tsx   # Gestion de personal
        ├── EmpresaPagos.tsx      # Planes, facturacion y reportes
        ├── EmpresaEventos.tsx    # Eventos e incidencias
        ├── EmpresaTracking.tsx   # Tracking del dia
        ├── FamiliaLayout.tsx     # Bottom tabs para Familia
        ├── FamiliaDashboard.tsx  # Dashboard Familia
        ├── FamiliaTracking.tsx   # Mapa tracking Familia
        ├── FamiliaPerfil.tsx     # Perfil estudiante (vista familia)
        ├── FamiliaPagos.tsx      # Pagos Familia
        ├── FamiliaNotificaciones.tsx # Notificaciones
        ├── FamiliaReportar.tsx   # Reportar novedad
        ├── ChoferLayout.tsx      # Bottom tabs para Chofer
        ├── ChoferRuta.tsx        # Checklist de ruta diaria
        ├── ChoferReportar.tsx    # Reporte de incidencia
        ├── ChoferMapa.tsx        # Mapa chofer
        ├── ChoferPerfil.tsx      # Perfil chofer
        └── ui/                  # 30+ componentes shadcn/ui
```

### Patron de navegacion

No se usa libreria de routing. `App.tsx` mantiene el estado `role` y `section` con `useState`. Cada layout renderiza el contenido segun la seccion activa usando un switch/case o renderizado condicional.

```
App.tsx
  └── Role toggle (Admin | Empresa | Familia | Chofer)
      └── Layout del rol
          └── Sidebar/TabBar con secciones
              └── Componente de la seccion activa
```

---

## Design system

Definido en `src/styles/theme.css` como variables CSS. Tailwind v4 usa `@theme inline` para mapearlas a clases utilitarias.

### Colores

| Token | Hex | Uso |
|---|---|---|
| `--primary` | `#2563EB` | Acciones principales, sidebar active |
| `--secondary` | `#F97316` | Alertas, acentos |
| `--success` | `#16A34A` | Estados completados, pagos |
| `--destructive` | `#EF4444` | Errores, vencidos, eliminar |
| `--warning` | `#F97316` | Advertencias |
| `--info` | `#2563EB` | Informacion |
| `--background` | `#F8FAFC` | Fondo general |
| `--foreground` | `#1E293B` | Texto principal |
| `--muted` | `#E2E8F0` | Fondos secundarios |
| `--muted-foreground` | `#64748B` | Texto secundario |
| `--card` | `#ffffff` | Fondos de tarjetas |
| `--border` | `#E2E8F0` | Bordes |

### Tipografia

- **Familia**: Inter (Google Fonts), 400-700
- **Base**: 16px
- **Titulos**: `font-weight: 500` (medium)

### Bordes y sombras

- **Radio**: `0.5rem` (8px)
- **Sombras**: sutiles en tarjetas

### Modo oscuro

Soportado mediante la clase `.dark`. Las variables se redefinen en el bloque `.dark { ... }` de `theme.css`.

---

## Empezar

### Requisitos

- Node.js >= 18
- npm >= 9

### Instalacion

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

El servidor arranca en `http://localhost:5173/`.

### Build de produccion

```bash
npm run build
```

El output se genera en `dist/`.

### Previsualizar build

```bash
npx vite preview
```

---

## Despliegue en Vercel

### Opcion 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

Seguir el wizard. Vercel autodetecta Vite y aplica la configuracion correcta.

### Opcion 2: Vercel Dashboard

1. Conectar el repositorio de GitHub en [vercel.com](https://vercel.com)
2. Vercel autodetecta el framework (Vite)
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

### Configuracion (opcional)

Crear `vercel.json` en la raiz:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Esto asegura que todas las rutas sirvan `index.html` (necesario para SPAs con routing, aunque este proyecto actualmente no usa routing por URL).

---

## Estado actual

Este es un **prototipo funcional de frontend**. Los datos son mock/hardcodeados y se pierden al recargar la pagina. Para produccion se requiere:

- [ ] Backend / API REST
- [ ] Base de datos y autenticacion
- [ ] Routing real (react-router)
- [ ] Manejo de estado global (Zustand, Redux, Context)
- [ ] Integracion con mapas reales (Leaflet, Google Maps, Mapbox)
- [ ] Tests unitarios y de integracion
- [ ] CI/CD

---

## Licencia

Privado — Todos los derechos reservados.
