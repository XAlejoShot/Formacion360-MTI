"use client"
import React, { FC } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { Play, BookOpen } from "lucide-react"

type Course = {
  id: number;
  name: string;
  progress: number;
  status: string;
  image: string;
};

type CoursesSectionProps = {
  courses: Course[];
};

const CoursesSection: FC<CoursesSectionProps> = ({ courses }) => (
    <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold text-[#123C69] mb-4">Catálogo de Cursos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <Image src={course.image} alt={course.name} width={400} height={200} className="w-full h-32 object-cover" />
                    <div className="p-4 flex flex-col flex-grow">
                         <CardTitle className="text-base font-bold text-[#123C69] mb-2">{course.name}</CardTitle>
                        <div className="space-y-3 mt-auto">
                             <div className="flex justify-between items-center text-sm">
                                <span className={`font-semibold ${ course.status === "Completado" ? "text-green-600" : course.status === "En progreso" ? "text-blue-600" : "text-gray-500" }`}>{course.status}</span>
                                <span className="font-bold text-[#123C69]">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                            <Button className="w-full mt-2 bg-gradient-to-r from-[#ACD157] to-[#9bc142] text-white">
                                {course.status === "No iniciado" ? <Play className="w-4 h-4 mr-2" /> : <BookOpen className="w-4 h-4 mr-2" />}
                                {course.status === "Completado" ? "Ver Contenido" : "Continuar Curso"}
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

export default CoursesSection;
