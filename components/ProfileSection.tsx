"use client"
import React, { useState, FC, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import {
  User,
  TrendingUp,
  Play,
  CheckCircle,
  Award,
  Edit2,
  CalendarDays,
  LogIn,
  Building,
  UserCheck
} from "lucide-react"

type StudentData = {
  name: string;
  email: string;
  role: string;
  department: string;
  supervisor: string;
  avatar: string;
  joinDate: string;
  lastLogin: string;
  status: string;
  completedCourses: number;
  inProgressCourses: number;
  certificatesEarned: number;
  totalTimeLearned: string;
};

type ActivityItem = {
  id: number;
  type: string;
  description: string;
  timestamp: string;
};

type ProfileSectionProps = {
  student: StudentData;
  activity: ActivityItem[];
};

const ProfileSection: FC<ProfileSectionProps> = ({ student, activity }) => {
    // FIX: Evita el error de hidratación renderizando las fechas solo en el cliente
    const [isClient, setIsClient] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    useEffect(() => { setIsClient(true); }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    return (
        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in-up">
            <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg border-0 text-center">
                    <CardContent className="p-6">
                        <Avatar className="w-24 h-24 mx-auto ring-4 ring-[#ACD157]/50"><AvatarImage src={student.avatar} /><AvatarFallback className="text-3xl bg-[#123C69] text-white">{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                        <h3 className="mt-4 text-xl font-bold text-[#123C69]">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.email}</p>
                        <Separator className="my-4"/>
                        <div className="space-y-3 text-sm text-left text-gray-600">
                           {isClient && <>
                                <div className="flex items-center"><CalendarDays className="w-4 h-4 mr-2 text-[#ACD157]"/> Miembro desde: {formatDate(student.joinDate)}</div>
                                <div className="flex items-center"><LogIn className="w-4 h-4 mr-2 text-[#ACD157]"/> Último acceso: {formatDate(student.lastLogin)}</div>
                           </>}
                            <div className="flex items-center"><UserCheck className="w-4 h-4 mr-2 text-[#ACD157]"/> Supervisor: {student.supervisor}</div>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="shadow-lg border-0">
                    <CardHeader><CardTitle className="text-base text-[#123C69]">Actividad Reciente</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {activity.map(item => (
                                <li key={item.id} className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#ACD157]/20 text-[#123C69]">
                                        {item.type === 'start_course' && <Play className="w-3 h-3"/>}
                                        {item.type === 'complete_module' && <CheckCircle className="w-3 h-3"/>}
                                        {item.type === 'earn_certificate' && <Award className="w-3 h-3"/>}
                                    </div>
                                    <div><p className="text-sm text-gray-800">{item.description}</p><p className="text-xs text-gray-400">{item.timestamp}</p></div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full bg-[#123C69] hover:bg-[#ACD157] text-white">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Editar Perfil
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-[#123C69]">
                                <User className="w-5 h-5 text-[#ACD157]" />
                                Editar Perfil
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nombre</Label>
                                <Input id="name" defaultValue={student.name} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input id="email" type="email" defaultValue={student.email} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">Rol</Label>
                                <Input id="role" defaultValue={student.role} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">Teléfono</Label>
                                <Input id="phone" type="tel" placeholder="Ej. +52 55 1234 5678" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="location" className="text-right">Ubicación</Label>
                                <Input id="location" placeholder="Ciudad, País" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right">Habilidades</Label>
                                <Input id="skills" placeholder="Ej. React, Node.js, UX Design" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="employeeId" className="text-right">ID Empleado</Label>
                                <Input id="employeeId" placeholder="Ej. MTI12345" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-[#123C69] hover:bg-[#ACD157]">
                                Guardar Cambios
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Card className="shadow-lg border-0">
                    <CardHeader><CardTitle className="flex items-center gap-2 text-[#123C69]"><TrendingUp className="w-5 h-5 text-[#ACD157]" />Estadísticas de Aprendizaje</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-gray-50 rounded-lg"><h4 className="text-2xl font-bold text-[#123C69]">{student.completedCourses}</h4><p className="text-xs text-gray-500">Cursos Completados</p></div>
                        <div className="p-4 bg-gray-50 rounded-lg"><h4 className="text-2xl font-bold text-[#123C69]">{student.inProgressCourses}</h4><p className="text-xs text-gray-500">Cursos en Progreso</p></div>
                        <div className="p-4 bg-gray-50 rounded-lg"><h4 className="text-2xl font-bold text-[#123C69]">{student.certificatesEarned}</h4><p className="text-xs text-gray-500">Certificados</p></div>
                        <div className="p-4 bg-gray-50 rounded-lg"><h4 className="text-2xl font-bold text-[#123C69]">{student.totalTimeLearned}</h4><p className="text-xs text-gray-500">Tiempo Invertido</p></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfileSection;
