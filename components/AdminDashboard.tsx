"use client"

import React, { useState, useEffect } from "react"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"
import AdminHomeSection from "./AdminHomeSection"
import AdminUsersSection from "./AdminUsersSection"
import AdminStatsSection from "./AdminStatsSection"
import AdminSettingsSection from "./AdminSettingsSection"
import { AdminUser } from "./types";
import {
  Activity,
  Users,
  TrendingUp,
  Settings,
} from "lucide-react"

const metrics = [
  { title: "Total Estudiantes", value: "1,247", icon: Users, change: "+12%" },
  { title: "Activos Hoy", value: "89", icon: Users, change: "+5%" },
  { title: "Cursos Disponibles", value: "24", icon: Users, change: "+2%" },
  { title: "Consultas Chatbot", value: "3,456", icon: Users, change: "+18%" },
]

const activities = [
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
]

const pieData = [
  { name: "Completados", value: 45, color: "hsl(var(--mti-green))" },
  { name: "En Progreso", value: 35, color: "hsl(var(--mti-blue))" },
  { name: "No Iniciados", value: 20, color: "hsl(var(--muted))" },
]

const chartData = [
  { month: "Ene", estudiantes: 65, cursos: 8 },
  { month: "Feb", estudiantes: 89, cursos: 12 },
  { month: "Mar", estudiantes: 123, cursos: 15 },
  { month: "Abr", estudiantes: 156, cursos: 18 },
  { month: "May", estudiantes: 198, cursos: 20 },
  { month: "Jun", estudiantes: 234, cursos: 24 },
]

const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        const tokenData = localStorage.getItem("authTokens");
        if (tokenData) {
            return JSON.parse(tokenData).access;
        }
    }
    return null;
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [users, setUsers] = useState<AdminUser[]>([]);

  const fetchUsers = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No auth token found");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/api/users/", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      const formattedUsers: AdminUser[] = data.map((user: any) => ({
        id: user.id,
        name: user.nombre_completo,
        email: user.email,
        role: user.rol,
        status: user.estado,
        avatar: user.foto_perfil_url || "/student-avatar.png",
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (activeSection === 'users') {
      fetchUsers();
    }
  }, [activeSection]);

  const sidebarItems = [
    { id: "home", label: "Resumen", icon: Activity },
    { id: "users", label: "Usuarios", icon: Users },
    { id: "stats", label: "Estadísticas", icon: TrendingUp },
    { id: "settings", label: "Configuración", icon: Settings },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <AdminHomeSection metrics={metrics} activities={activities} pieData={pieData} />
      case "users":
        return <AdminUsersSection users={users} onUsersChange={fetchUsers} />
      case "stats":
        return <AdminStatsSection chartData={chartData} />
      case "settings":
        return <AdminSettingsSection />
      default:
        return null
    }
  }

  const handleLogout = () => {
    console.log("Logging out admin")
    localStorage.removeItem("authTokens");
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--mti-gray))]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        setOpen={setSidebarOpen}
        sidebarItems={sidebarItems}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <AdminHeader
          adminName="Administrador"
          adminEmail="admin@mtiglobaltech.com"
          avatar="/student-avatar.png"
          onMenuClick={() => setSidebarOpen(true)}
          activeSection={activeSection}
          sidebarItems={sidebarItems}
        />

        {/* Content */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
