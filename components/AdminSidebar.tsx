"use client"
import React, { FC } from "react"
import { Button } from "@/components/ui/button"
import { X, LogOut } from "lucide-react"
import { AdminSidebarProps, SidebarItem } from "./types"

type AdminSidebarPropsWithItems = AdminSidebarProps & {
  sidebarItems: SidebarItem[]
}

const AdminSidebar: FC<AdminSidebarPropsWithItems> = ({ activeSection, setActiveSection, onLogout, isOpen, setOpen, sidebarItems }) => (
  <>
    {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setOpen(false)} />}
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-[hsl(var(--mti-blue))] text-white transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-[hsl(var(--mti-blue-light))]"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start text-left ${
                activeSection === item.id
                  ? "bg-[hsl(var(--mti-green))] text-[hsl(var(--mti-blue))] hover:bg-[hsl(var(--mti-green-dark))]"
                  : "text-white hover:bg-[hsl(var(--mti-blue-light))]"
              }`}
              onClick={() => {
                setActiveSection(item.id)
                setOpen(false)
              }}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <Button
          variant="secondary"
          className="w-full justify-start text-red-600 hover:bg-red-100 hover:text-red-700 bg-white"
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  </>
)

export default AdminSidebar
