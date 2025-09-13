"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  BookOpen,
  TrendingUp,
  MessageCircle,
  LogOut,
  Menu,
  X,
  Play,
  CheckCircle,
  Clock,
  Sparkles,
  Bot,
  Send,
} from "lucide-react"
import Image from "next/image"

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  // Mock student data
  const studentData = {
    name: "Ana García",
    email: "ana.garcia@gmail.com",
    role: "Estudiante",
    progress: 65,
    avatar: "/student-avatar.png",
  }

  const courses = [
    { id: 1, name: "Desarrollo Web Frontend", progress: 80, status: "En progreso", color: "bg-blue-500" },
    { id: 2, name: "JavaScript Avanzado", progress: 100, status: "Completado", color: "bg-green-500" },
    { id: 3, name: "React y Next.js", progress: 45, status: "En progreso", color: "bg-purple-500" },
    { id: 4, name: "Bases de Datos", progress: 0, status: "No iniciado", color: "bg-gray-400" },
  ]

  const handleLogout = () => {
    console.log("[v0] Logging out student")
    window.location.href = "/"
  }

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      console.log("[v0] Sending chat message:", chatMessage)
      setChatMessage("")
      // Here you would integrate with actual AI chatbot
    }
  }

  const sidebarItems = [
    { icon: User, label: "Perfil", active: true },
    { icon: TrendingUp, label: "Progreso", active: false },
    { icon: BookOpen, label: "Cursos", active: false },
    { icon: MessageCircle, label: "Soporte IA", active: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Sidebar header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#123C69] to-[#1a4d7a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1">
                <Image src="/logoMTI.png" alt="MTI Global" width={32} height={32} className="object-contain" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Formación360</h2>
                <p className="text-[#ACD157] text-xs">Dashboard Estudiante</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? "bg-[#123C69] text-white shadow-lg"
                  : "text-gray-600 hover:bg-[#ACD157]/10 hover:text-[#123C69]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-[#123C69] flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#ACD157]" />
                  Bienvenido, {studentData.name}
                </h1>
                <p className="text-gray-600">¡Continúa tu formación en Formación360!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="w-10 h-10 ring-2 ring-[#ACD157]/30">
                <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={studentData.name} />
                <AvatarFallback className="bg-[#123C69] text-white font-bold">
                  {studentData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6 space-y-6">
          {/* Profile section */}
          <Card className="bg-gradient-to-r from-[#123C69] to-[#1a4d7a] text-white border-0 shadow-xl animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20 ring-4 ring-[#ACD157]/50">
                  <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={studentData.name} />
                  <AvatarFallback className="bg-[#ACD157] text-[#123C69] font-bold text-xl">
                    {studentData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{studentData.name}</h2>
                  <p className="text-[#ACD157] mb-1">{studentData.email}</p>
                  <p className="text-white/80 text-sm">{studentData.role}</p>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 rounded-lg p-3">
                    <User className="w-8 h-8 text-[#ACD157] mx-auto mb-1" />
                    <p className="text-xs text-white/80">Perfil Activo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress section */}
          <Card className="shadow-lg border-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#123C69]">
                <TrendingUp className="w-5 h-5 text-[#ACD157]" />
                Progreso General
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Progreso actual</span>
                  <span className="text-2xl font-bold text-[#123C69]">{studentData.progress}%</span>
                </div>
                <Progress value={studentData.progress} className="h-3 bg-gray-200" />
                <p className="text-sm text-gray-600">¡Excelente progreso! Continúa así para completar tu formación.</p>
              </div>
            </CardContent>
          </Card>

          {/* Courses section */}
          <Card className="shadow-lg border-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#123C69]">
                <BookOpen className="w-5 h-5 text-[#ACD157]" />
                Mis Cursos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-[#ACD157]/50 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-[#123C69] group-hover:text-[#ACD157] transition-colors">
                        {course.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {course.status === "Completado" && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {course.status === "En progreso" && <Play className="w-4 h-4 text-blue-500" />}
                        {course.status === "No iniciado" && <Clock className="w-4 h-4 text-gray-400" />}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{course.status}</span>
                        <span className="font-medium text-[#123C69]">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-40">
        {chatOpen && (
          <Card className="w-80 h-96 mb-4 shadow-2xl border-0 animate-fade-in-up">
            <CardHeader className="bg-gradient-to-r from-[#123C69] to-[#1a4d7a] text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#ACD157]" />
                  <CardTitle className="text-sm">Soporte IA</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatOpen(false)}
                  className="text-white hover:bg-white/20 h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex-1 bg-gray-50 rounded-lg p-3 mb-3 overflow-y-auto">
                <div className="text-sm text-gray-600 text-center">
                  ¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#ACD157]"
                />
                <Button
                  onClick={sendChatMessage}
                  size="sm"
                  className="bg-[#123C69] hover:bg-[#ACD157] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#123C69] to-[#1a4d7a] hover:from-[#ACD157] hover:to-[#9bc142] shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
