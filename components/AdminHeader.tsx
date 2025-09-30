"use client"
import React, { FC } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu } from "lucide-react"
import { AdminHeaderProps, SidebarItem } from "./types"

type AdminHeaderPropsWithItems = AdminHeaderProps & {
  activeSection: string
  sidebarItems: SidebarItem[]
}

const AdminHeader: FC<AdminHeaderPropsWithItems> = ({ adminName, adminEmail, avatar, onMenuClick, activeSection, sidebarItems }) => (
  <header className="bg-white shadow-sm border-b">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold text-[hsl(var(--mti-blue))]">
          {sidebarItems.find((item) => item.id === activeSection)?.label || "Panel Administrativo"}
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-[hsl(var(--mti-blue))]">{adminName}</p>
          <p className="text-xs text-muted-foreground">{adminEmail}</p>
        </div>
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </header>
)

export default AdminHeader
