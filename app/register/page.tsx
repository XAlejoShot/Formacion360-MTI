"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail, Lock, Eye, EyeOff, User, Sparkles } from "lucide-react"
import Image from "next/image"

export default function RegisterPage() {
  const [nombreCompleto, setNombreCompleto] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ nombreCompleto: "", email: "", password: "", form: "" })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ nombreCompleto: "", email: "", password: "", form: "" })

    const newErrors = { nombreCompleto: "", email: "", password: "", form: "" }

    if (!nombreCompleto) {
      newErrors.nombreCompleto = "El nombre completo es requerido"
    }
    if (!email) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!validateEmail(email)) {
      newErrors.email = "Por favor ingresa un correo electrónico válido"
    }
    if (!password) {
      newErrors.password = "La contraseña es requerida"
    } else if (password.length < 8) {
        newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    if (newErrors.nombreCompleto || newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, nombre_completo: nombreCompleto, password }),
      })

      if (response.ok) {
        // On successful registration, redirect to the login page
        router.push("/")
      } else {
        const errorData = await response.json()
        const formError = errorData.detail || "Ocurrió un error en el registro. Por favor, inténtalo de nuevo."
        setErrors({ ...newErrors, form: formError })
      }
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ ...newErrors, form: "No se pudo conectar al servidor. Inténtalo más tarde." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#123C69] via-[#1a4d7a] to-[#0f2d4f]"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#ACD157]/15 via-transparent to-[#123C69]/80"></div>

      <div className="absolute top-20 left-10 w-40 h-40 bg-[#ACD157]/20 rounded-full blur-2xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-[#ACD157]/25 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl border-0 animate-fade-in-up rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#123C69] via-[#ACD157] to-[#123C69]"></div>

        <CardHeader className="text-center pb-6 pt-10 bg-gradient-to-b from-white/90 to-white/70">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-2xl ring-4 ring-[#ACD157]/40 bg-white p-1 hover:ring-[#ACD157]/60 transition-all duration-300">
              <Image src="/logoMTI.png" alt="MTI Global Logo" fill className="object-contain p-1" priority />
            </div>
          </div>

          <div className="space-y-3">
             <h1 className="text-3xl font-bold bg-gradient-to-r from-[#123C69] via-[#1a4d7a] to-[#123C69] bg-clip-text text-transparent">
                Crear una Cuenta
              </h1>
            <p className="text-gray-600 text-sm">Únete a Formación360 para empezar a aprender</p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ACD157] to-[#9bc142] mx-auto rounded-full shadow-lg"></div>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.form && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg text-center text-sm font-semibold" role="alert">
                {errors.form}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="nombreCompleto" className="text-sm font-semibold text-[#123C69] flex items-center gap-2">
                <User className="w-4 h-4" />
                Nombre Completo
              </label>
              <Input
                id="nombreCompleto"
                type="text"
                placeholder="John Doe"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                className={`h-12 bg-gray-50/80 border-2 border-gray-200 focus:border-[#ACD157] focus:ring-4 focus:ring-[#ACD157]/20 rounded-xl text-base transition-all duration-300 hover:border-gray-300 ${
                  errors.nombreCompleto ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
                }`}
              />
              {errors.nombreCompleto && (
                <p className="text-red-500 text-sm font-medium">{errors.nombreCompleto}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-[#123C69] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 bg-gray-50/80 border-2 border-gray-200 focus:border-[#ACD157] focus:ring-4 focus:ring-[#ACD157]/20 rounded-xl text-base transition-all duration-300 hover:border-gray-300 ${
                  errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-medium">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-[#123C69] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Contraseña
              </label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pr-12 h-12 bg-gray-50/80 border-2 border-gray-200 focus:border-[#ACD157] focus:ring-4 focus:ring-[#ACD157]/20 rounded-xl text-base transition-all duration-300 hover:border-gray-300 ${
                    errors.password ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#ACD157] transition-colors duration-200"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm font-medium">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#123C69] to-[#1a4d7a] hover:from-[#ACD157] hover:to-[#9bc142] text-white font-bold text-base transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed rounded-xl mt-6"
            >
              {isLoading ? "Creando cuenta..." : "Registrar"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200/60 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <a href="/" className="font-semibold text-[#123C69] hover:text-[#ACD157] hover:underline">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
