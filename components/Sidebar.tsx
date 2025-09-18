import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  BookOpen,
  TrendingUp,
  LogOut,
  X,
  Award,
} from "lucide-react";
import Image from "next/image";
import { SidebarProps, SidebarItem } from "./types";

const sidebarItems: SidebarItem[] = [
  { id: 'profile', icon: User, label: "Mi Perfil" },
  { id: 'courses', icon: BookOpen, label: "Mis Cursos" },
  { id: 'progress', icon: TrendingUp, label: "Mi Progreso" },
  { id: 'certificates', icon: Award, label: "Certificados" },
];

const Sidebar: FC<SidebarProps> = ({ activeSection, setActiveSection, onLogout, isOpen, setOpen }) => (
  <>
    {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#123C69] to-[#1a4d7a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1">
              <Image src="/logoMTI.png" alt="MTI Global" width={32} height={32} className="object-contain" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Formación360</h2>
              <p className="text-[#ACD157] text-xs">Dashboard</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="lg:hidden text-white hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveSection(item.id); setOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeSection === item.id
                ? "bg-[#123C69] text-white shadow-lg"
                : "text-gray-600 hover:bg-[#ACD157]/10 hover:text-[#123C69]"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <Button onClick={onLogout} variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 bg-transparent">
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  </>
);

export default Sidebar;
