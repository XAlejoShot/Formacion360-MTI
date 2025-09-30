"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setIsLoading(true)

    if (!email) {
      setError("Por favor ingresa tu correo electrónico.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/password-reset/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.detail || "Si existe una cuenta con este correo, se ha enviado un enlace para restablecer la contraseña.")
        setEmail("")
      } else {
        setError(data.detail || "Ocurrió un error. Por favor, inténtalo de nuevo.")
      }
    } catch (err) {
      setError("No se pudo conectar al servidor. Inténtalo más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#123C69] via-[#1a4d7a] to-[#0f2d4f]"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#ACD157]/15 via-transparent to-[#123C69]/80"></div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl border-0 animate-fade-in-up rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#123C69] via-[#ACD157] to-[#123C69]"></div>

        <CardHeader className="text-center pb-6 pt-10">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ACD157]" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#123C69] via-[#1a4d7a] to-[#123C69] bg-clip-text text-transparent">
                Recuperar Contraseña
              </h1>
              <Sparkles className="w-5 h-5 text-[#ACD157]" />
            </div>
            <p className="text-gray-600 text-sm">Ingresa tu correo para recibir instrucciones</p>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {message && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-lg text-center text-sm font-semibold" role="alert">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg text-center text-sm font-semibold" role="alert">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-[#123C69] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Correo electrónico
              </label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-gray-50/80 border-2 border-gray-200 focus:border-[#ACD157] focus:ring-4 focus:ring-[#ACD157]/20 rounded-xl text-base transition-all duration-300 hover:border-gray-300"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#123C69] to-[#1a4d7a] hover:from-[#ACD157] hover:to-[#9bc142] text-white font-bold text-base transition-all duration-500 rounded-xl"
            >
              {isLoading ? "Enviando..." : "Enviar Enlace de Recuperación"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200/60 text-center">
            <Link href="/" className="text-sm font-medium text-[#123C69] hover:text-[#ACD157] transition-colors duration-200 hover:underline">
              Volver al inicio de sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
