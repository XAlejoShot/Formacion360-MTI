"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  UserCheck,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Edit,
  Trash2,
  UserCog,
  TrendingUp,
  Activity,
  Award,
} from "lucide-react"

// Mock data
const metrics = [
  { title: "Total Estudiantes", value: "1,247", icon: Users, change: "+12%" },
  { title: "Activos Hoy", value: "89", icon: UserCheck, change: "+5%" },
  { title: "Cursos Disponibles", value: "24", icon: BookOpen, change: "+2%" },
  { title: "Consultas Chatbot", value: "3,456", icon: MessageSquare, change: "+18%" },
]

const users = [
  {
    id: 1,
    name: "Ana García",
    email: "ana.garcia@gmail.com",
    role: "Estudiante",
    status: "Activo",
    avatar: "/student-avatar.png",
  },
  {
    id: 2,
    name: "Carlos López",
    email: "carlos.lopez@hotmail.com",
    role: "Estudiante",
    status: "Activo",
    avatar: "/student-avatar.png",
  },
  {
    id: 3,
    name: "María Rodríguez",
    email: "maria@mtiglobaltech.com",
    role: "Admin",
    status: "Activo",
    avatar: "/student-avatar.png",
  },
  {
    id: 4,
    name: "Juan Pérez",
    email: "juan.perez@yahoo.com",
    role: "Estudiante",
    status: "Inactivo",
    avatar: "/student-avatar.png",
  },
  {
    id: 5,
    name: "Laura Martín",
    email: "laura.martin@gmail.com",
    role: "Estudiante",
    status: "Activo",
    avatar: "/student-avatar.png",
  },
]

const chartData = [
  { month: "Ene", estudiantes: 65, cursos: 8 },
  { month: "Feb", estudiantes: 89, cursos: 12 },
  { month: "Mar", estudiantes: 123, cursos: 15 },
  { month: "Abr", estudiantes: 156, cursos: 18 },
  { month: "May", estudiantes: 198, cursos: 20 },
  { month: "Jun", estudiantes: 234, cursos: 24 },
]

const pieData = [
  { name: "Completados", value: 45, color: "hsl(var(--mti-green))" },
  { name: "En Progreso", value: 35, color: "hsl(var(--mti-blue))" },
  { name: "No Iniciados", value: 20, color: "hsl(var(--muted))" },
]

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sidebarItems = [
    { id: "home", label: "Resumen", icon: Activity },
    { id: "users", label: "Usuarios", icon: Users },
    { id: "stats", label: "Estadísticas", icon: TrendingUp },
    { id: "settings", label: "Configuración", icon: Settings },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <Card
                  key={index}
                  className="animate-fade-in-up border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        <p className="text-2xl font-bold text-[hsl(var(--mti-blue))]">{metric.value}</p>
                        <p className="text-xs text-[hsl(var(--mti-green))] font-medium">{metric.change}</p>
                      </div>
                      <div className="h-12 w-12 bg-[hsl(var(--mti-blue))] rounded-lg flex items-center justify-center">
                        <metric.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--mti-blue))] flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        user: "Ana García",
                        action: "completó el curso",
                        course: "React Avanzado",
                        time: "hace 2 horas",
                      },
                      {
                        user: "Carlos López",
                        action: "inició el curso",
                        course: "Node.js Básico",
                        time: "hace 4 horas",
                      },
                      { user: "María Rodríguez", action: "actualizó su perfil", course: "", time: "hace 1 día" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-[hsl(var(--mti-gray))]">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/student-avatar.png" />
                          <AvatarFallback>
                            {activity.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                            {activity.course && <span className="text-[hsl(var(--mti-blue))]"> {activity.course}</span>}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--mti-blue))]">Progreso de Cursos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-4 mt-4">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-sm">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "users":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[hsl(var(--mti-blue))]">Gestión de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Correo</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Activo" ? "default" : "destructive"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                              <UserCog className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )

      case "stats":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--mti-blue))]">Crecimiento Mensual</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="estudiantes" fill="hsl(var(--mti-blue))" />
                      <Bar dataKey="cursos" fill="hsl(var(--mti-green))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--mti-blue))]">Tendencia de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="estudiantes"
                        stroke="hsl(var(--mti-blue))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--mti-blue))", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[hsl(var(--mti-blue))]">Configuración del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[hsl(var(--mti-gray))]">
                    <h3 className="font-medium mb-2">Configuración General</h3>
                    <p className="text-sm text-muted-foreground">Ajustes básicos del sistema y plataforma.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[hsl(var(--mti-gray))]">
                    <h3 className="font-medium mb-2">Gestión de Cursos</h3>
                    <p className="text-sm text-muted-foreground">Administrar cursos, contenido y evaluaciones.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[hsl(var(--mti-gray))]">
                    <h3 className="font-medium mb-2">Configuración de Chatbot</h3>
                    <p className="text-sm text-muted-foreground">
                      Personalizar respuestas y comportamiento del asistente IA.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--mti-gray))]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-[hsl(var(--mti-blue))] text-white transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-[hsl(var(--mti-blue-light))]"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  activeSection === item.id
                    ? "bg-[hsl(var(--mti-green))] text-[hsl(var(--mti-blue))] hover:bg-[hsl(var(--mti-green-dark))]"
                    : "text-white hover:bg-[hsl(var(--mti-blue-light))]"
                }`}
                onClick={() => {
                  setActiveSection(item.id)
                  setSidebarOpen(false)
                }}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-[hsl(var(--mti-blue-light))]"
            onClick={() => (window.location.href = "/")}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-2xl font-bold text-[hsl(var(--mti-blue))]">
                {sidebarItems.find((item) => item.id === activeSection)?.label || "Panel Administrativo"}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-[hsl(var(--mti-blue))]">Administrador</p>
                <p className="text-xs text-muted-foreground">admin@mtiglobaltech.com</p>
              </div>
              <Avatar>
                <AvatarImage src="/student-avatar.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  )
}