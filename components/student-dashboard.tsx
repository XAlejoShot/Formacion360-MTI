"use client"
import React, { useState, FC } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  BookOpen,
  TrendingUp,
  LogOut,
  Menu,
  X,
  Sparkles,
  Award
} from "lucide-react"
import Image from "next/image"
import ProfileSection from "./ProfileSection"
import CoursesSection from "./CoursesSection"
import ProgressSection from "./ProgressSection"
import CertificatesSection from "./CertificatesSection"
import Chatbot from "./Chatbot"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { SidebarProps, HeaderProps, StudentData, ActivityItem, Course, ProgressDetails, Certificate, SidebarItem } from "./types"

// --- DATOS DE PRUEBA AMPLIADOS ---
const studentData = {
  name: "Ana García",
  email: "ana.garcia@gmail.com",
  role: "Desarrolladora Frontend Jr.",
  department: "Tecnología e Innovación",
  supervisor: "Carlos López",
  avatar: "/student-avatar.png",
  joinDate: "2023-08-15",
  lastLogin: "2025-09-12T14:30:00Z",
  status: "Activo",
  completedCourses: 2,
  inProgressCourses: 3,
  certificatesEarned: 2,
  totalTimeLearned: "78 Horas",
};

const activityFeed = [
    { id: 1, type: "start_course", description: "Inició el curso 'Diseño UI/UX para Developers'", timestamp: "hace 2 horas" },
    { id: 2, type: "complete_module", description: "Completó el módulo 'Estado y Props' en 'React y Next.js'", timestamp: "ayer" },
    { id: 3, type: "earn_certificate", description: "Obtuvo el certificado de 'JavaScript Avanzado'", timestamp: "hace 3 días" },
    { id: 4, type: "start_course", description: "Inició el curso 'Bases de Datos con SQL'", timestamp: "hace 1 semana" },
];

const courses = [
    { id: 1, name: "Desarrollo Web Frontend", progress: 80, status: "En progreso", image: "/placeholder.jpg" },
    { id: 2, name: "JavaScript Avanzado", progress: 100, status: "Completado", image: "/placeholder.jpg" },
    { id: 3, name: "React y Next.js", progress: 45, status: "En progreso", image: "/placeholder.jpg" },
    { id: 4, name: "Bases de Datos con SQL", progress: 10, status: "En progreso", image: "/placeholder.jpg" },
    { id: 5, name: "Diseño UI/UX para Developers", progress: 15, status: "En progreso", image: "/placeholder.jpg" },
    { id: 6, name: "Metodologías Ágiles (Scrum)", progress: 100, status: "Completado", image: "/placeholder.jpg" },
];

const progressDetails = {
    overallProgress: 65,
    courses: [
        { name: "Frontend", progress: 80 },
        { name: "JS Avanzado", progress: 100 },
        { name: "React", progress: 45 },
        { name: "UI/UX", progress: 15 },
    ],
    timeSpent: [
        { day: "Lun", hours: 2 }, { day: "Mar", hours: 3 }, { day: "Mié", hours: 1.5 },
        { day: "Jue", hours: 4 }, { day: "Vie", hours: 2.5 }, { day: "Sáb", hours: 1 },
    ]
};

const certificates = [
    { id: 1, courseName: "JavaScript Avanzado", issueDate: "2024-03-20", credentialId: "JS-ADV-12345" },
    { id: 2, courseName: "Metodologías Ágiles (Scrum)", issueDate: "2024-01-15", credentialId: "SCRUM-MASTER-67890" },
];

const sidebarItems = [
    { id: 'profile', icon: User, label: "Mi Perfil" },
    { id: 'courses', icon: BookOpen, label: "Mis Cursos" },
    { id: 'progress', icon: TrendingUp, label: "Mi Progreso" },
    { id: 'certificates', icon: Award, label: "Certificados" },
];

const PIE_COLORS = ["hsl(var(--mti-green))", "hsl(var(--mti-blue))", "hsl(var(--mti-blue-light))", "hsl(var(--mti-blue-dark))"];






// --- COMPONENTE PRINCIPAL DEL DASHBOARD ---

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const handleLogout = () => { console.log("Logging out student"); window.location.href = "/"; };
  
  const renderContent = () => {
      switch (activeSection) {
          case 'profile': return <ProfileSection student={studentData} activity={activityFeed} />;
          case 'courses': return <CoursesSection courses={courses} />;
          case 'progress': return <ProgressSection progress={progressDetails} />;
          case 'certificates': return <CertificatesSection certificates={certificates} />;
          default: return <ProfileSection student={studentData} activity={activityFeed} />;
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} isOpen={sidebarOpen} setOpen={setSidebarOpen}/>
      <div className="lg:ml-64">
        <Header studentName={studentData.name} avatar={studentData.avatar} onMenuClick={() => setSidebarOpen(true)}/>
        <main className="p-6">{renderContent()}</main>
      </div>
      <Chatbot />
    </div>
  );
}