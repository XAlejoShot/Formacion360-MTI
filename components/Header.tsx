import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Sparkles } from "lucide-react";
import { HeaderProps } from "./types";

const Header: FC<HeaderProps> = ({ studentName, avatar, onMenuClick }) => (
  <header className="bg-white shadow-sm border-b border-gray-200">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#123C69] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#ACD157]" />
            Bienvenido, {studentName.split(' ')[0]}
          </h1>
          <p className="text-gray-600">¡Continúa tu formación en Formación360!</p>
        </div>
      </div>
      <Avatar className="w-10 h-10 ring-2 ring-[#ACD157]/30">
        <AvatarImage src={avatar || "/placeholder.svg"} alt={studentName} />
        <AvatarFallback className="bg-[#123C69] text-white font-bold">
          {studentName.split(" ").map((n) => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
    </div>
  </header>
);

export default Header;
