"use client"
import React, { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Award } from "lucide-react"
import { AdminMetric, AdminActivity, AdminPieData } from "./types"

type AdminHomeSectionProps = {
  metrics: AdminMetric[]
  activities: AdminActivity[]
  pieData: AdminPieData[]
}

const AdminHomeSection: FC<AdminHomeSectionProps> = ({ metrics, activities, pieData }) => (
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
            {activities.map((activity, index) => (
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

export default AdminHomeSection
