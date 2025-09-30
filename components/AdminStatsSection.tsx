"use client"
import React, { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { AdminChartData } from "./types"

type AdminStatsSectionProps = {
  chartData: AdminChartData[]
}

const AdminStatsSection: FC<AdminStatsSectionProps> = ({ chartData }) => (
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

export default AdminStatsSection
