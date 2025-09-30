"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation" // Import useRouter
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, Eye, EyeOff, Shield, Sparkles } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "", form: "" })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter() // Initialize router

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ email: "", password: "", form: "" })

    // Client-side validation
    const newErrors = { email: "", password: "", form: "" }

    if (!email) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!validateEmail(email)) {
      newErrors.email = "Por favor ingresa un correo electrónico válido"
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida"
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
            // La URL ahora apunta a la ruta de login dentro de nuestra app de usuarios.
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("accessToken", data.access)
        localStorage.setItem("refreshToken", data.refresh)

        // Role-based redirection
        if (data.user && data.user.rol === "administrador") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      } else {
        const errorData = await response.json()
        // Handle specific error messages from the backend if available
        if (errorData.detail) {
          setErrors({ ...newErrors, form: errorData.detail })
        } else {
          setErrors({ ...newErrors, form: "Credenciales inválidas. Por favor, inténtalo de nuevo." })
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ ...newErrors, form: "No se pudo conectar al servidor. Inténtalo más tarde." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#123C69] via-[#1a4d7a] to-[#0f2d4f]"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#ACD157]/15 via-transparent to-[#123C69]/80"></div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#ACD157]/20 rounded-full blur-2xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-[#ACD157]/25 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-lg animate-pulse-glow"></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-[#ACD157]/30 rounded-full blur-md animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl border-0 animate-fade-in-up rounded-3xl overflow-hidden relative">
        {/* Subtle top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#123C69] via-[#ACD157] to-[#123C69]"></div>

        <CardHeader className="text-center pb-6 pt-10 bg-gradient-to-b from-white/90 to-white/70">
          {/* Logo section with enhanced styling */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-2xl ring-4 ring-[#ACD157]/40 bg-white p-1 hover:ring-[#ACD157]/60 transition-all duration-300">
              <Image src="/logoMTI.png" alt="MTI Global Logo" fill className="object-contain p-1" priority />
            </div>
          </div>

          {/* Enhanced header content */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ACD157]" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#123C69] via-[#1a4d7a] to-[#123C69] bg-clip-text text-transparent">
                Formación360
              </h1>
              <Sparkles className="w-5 h-5 text-[#ACD157]" />
            </div>
            <p className="text-[#123C69] text-base font-semibold">Plataforma de Aprendizaje</p>
            <p className="text-gray-600 text-sm">Inicia sesión para continuar tu formación</p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ACD157] to-[#9bc142] mx-auto rounded-full shadow-lg"></div>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* General form error */}
            {errors.form && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg text-center text-sm font-semibold" role="alert">
                {errors.form}
              </div>
            )}

            {/* Email field */}
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
                  className={`h-12 bg-gray-50/80 border-2 border-gray-200 focus:border-[#ACD157] focus:ring-4 focus:ring-[#ACD157]/20 rounded-xl text-base transition-all duration-300 hover:border-gray-300 ${
                    errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
                  }`}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm font-medium flex items-center gap-2" role="alert">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
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
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#ACD157] transition-colors duration-200 p-1 rounded-md hover:bg-gray-100"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="text-red-500 text-sm font-medium flex items-center gap-2"
                  role="alert"
                >
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="data-[state=checked]:bg-[#ACD157] data-[state=checked]:border-[#ACD157] w-4 h-4 rounded-md"
                />
                <label htmlFor="remember" className="text-sm font-medium text-[#123C69] cursor-pointer">
                  Recuérdame
                </label>
              </div>

              <a
                href="/forgot-password"
                className="text-sm font-medium text-[#123C69] hover:text-[#ACD157] transition-colors duration-200 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Enhanced login button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#123C69] to-[#1a4d7a] hover:from-[#ACD157] hover:to-[#9bc142] text-white font-bold text-base transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded-xl relative overflow-hidden group mt-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Iniciar sesión</span>
                </div>
              )}
            </Button>
          </form>

          {/* Enhanced footer */}
          <div className="mt-6 pt-6 border-t border-gray-200/60 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              Powered by
              <span className="font-semibold text-[#123C69] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ACD157]" />
                MTI Global
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
