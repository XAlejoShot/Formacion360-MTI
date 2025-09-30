"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegisterUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserRegistered: () => void;
};

export function RegisterUserDialog({ open, onOpenChange, onUserRegistered }: RegisterUserDialogProps) {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!nombreCompleto || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
            const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_completo: nombreCompleto,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al registrar el usuario.");
      }

      onUserRegistered();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Estudiante</DialogTitle>
          <DialogDescription>
            Complete los campos para registrar un nuevo estudiante.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <DialogFooter>
          <Button onClick={handleSubmit}>Registrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
