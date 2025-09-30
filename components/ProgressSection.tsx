"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend, BarChart } from "recharts"
import { BarChart2, PieChart as PieChartIcon } from "lucide-react"

const PIE_COLORS = ["hsl(var(--mti-green))", "hsl(var(--mti-blue))", "hsl(var(--mti-blue-light))", "hsl(var(--mti-blue-dark))"];

type CourseProgress = {
  name: string;
  progress: number;
};

type TimeSpent = {
  day: string;
  hours: number;
};

type ProgressDetails = {
  overallProgress: number;
  courses: CourseProgress[];
  timeSpent: TimeSpent[];
};

const RADIAN = Math.PI / 180;
function CustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

type ProgressSectionProps = {
  progress: ProgressDetails;
};

export default function ProgressSection({ progress }: ProgressSectionProps) {
    return (
        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in-up">
            <Card className="lg:col-span-2 shadow-lg border-0">
                 <CardHeader><CardTitle className="flex items-center gap-2 text-[#123C69]"><BarChart2 className="w-5 h-5 text-[#ACD157]" />Horas de Estudio Semanales</CardTitle></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={progress.timeSpent}>
                            <XAxis dataKey="day" stroke="#888888" fontSize={12} /><YAxis stroke="#888888" fontSize={12} />
                            <Tooltip cursor={{fill: 'hsl(var(--mti-green) / 0.1)'}}/>
                            <Bar dataKey="hours" name="Horas" fill="url(#colorUv)" radius={[4, 4, 0, 0]} />
                             <defs><linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--mti-green))" stopOpacity={0.8}/><stop offset="95%" stopColor="hsl(var(--mti-blue))" stopOpacity={0.8}/></linearGradient></defs>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="shadow-lg border-0">
                 <CardHeader><CardTitle className="flex items-center gap-2 text-[#123C69]"><PieChartIcon className="w-5 h-5 text-[#ACD157]" />Progreso por Curso</CardTitle><CardDescription>Avance en cursos activos</CardDescription></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={progress.courses} dataKey="progress" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} labelLine={false} label={<CustomizedLabel />}>
                                 {progress.courses.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />))}
                            </Pie>
                            <Tooltip />
                            <Legend iconSize={10} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}