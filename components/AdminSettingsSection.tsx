"use client"
import React, { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AdminSettingsSection: FC = () => (
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

export default AdminSettingsSection
