"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, UserCog, Trash2, PlusCircle } from "lucide-react";
import { AdminUser } from "./types";
import { RegisterUserDialog } from "./RegisterUserDialog";
import { useToast } from "./ui/use-toast";

type AdminUsersSectionProps = {
  users: AdminUser[];
  onUsersChange: () => void;
};

const AdminUsersSection = ({ users, onUsersChange }: AdminUsersSectionProps) => {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleUserRegistered = () => {
    toast({
      title: "Usuario Registrado",
      description: "El nuevo estudiante ha sido registrado exitosamente.",
    });
    onUsersChange();
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[hsl(var(--mti-blue))]">Gestión de Usuarios</CardTitle>
          <Button onClick={() => setIsRegisterDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Registrar Usuario
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Activo" ? "default" : "destructive"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                        <UserCog className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <RegisterUserDialog
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
        onUserRegistered={handleUserRegistered}
      />
    </div>
  );
};

export default AdminUsersSection
