"use client"
import React, { FC, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, X, MessageCircle } from "lucide-react"

const Chatbot: FC = () => {
    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const handleSend = () => { if (message.trim()) { console.log("Sending message:", message); setMessage(""); } };

    return (
        <div className="fixed bottom-6 right-6 z-40">
            {isOpen && (
                <Card className="w-80 h-96 mb-4 shadow-2xl border-0 animate-fade-in-up">
                    <CardHeader className="bg-gradient-to-r from-[#123C69] to-[#1a4d7a] text-white rounded-t-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2"><Bot className="w-5 h-5 text-[#ACD157]" /><CardTitle className="text-sm">Soporte IA</CardTitle></div>
                            <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="text-white hover:bg-white/20 h-6 w-6 p-0"><X className="w-4 h-4" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 flex flex-col h-[calc(24rem-4rem)]">
                        <div className="flex-1 bg-gray-50 rounded-lg p-3 mb-3 overflow-y-auto"><p className="text-sm text-gray-600 text-center">¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?</p></div>
                        <div className="flex gap-2">
                            <Input type="text" placeholder="Escribe tu mensaje..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSend()} className="flex-1"/>
                            <Button onClick={handleSend} size="sm" className="bg-[#123C69] hover:bg-[#ACD157] transition-colors"><Send className="w-4 h-4" /></Button>
                        </div>
                    </CardContent>
                </Card>
            )}
             <Button onClick={() => setOpen(!isOpen)} className="w-14 h-14 rounded-full bg-gradient-to-r from-[#123C69] to-[#1a4d7a] hover:from-[#ACD157] hover:to-[#9bc142] shadow-2xl transition-all duration-300 hover:scale-110">
                <MessageCircle className="w-6 h-6" />
            </Button>
        </div>
    );
};

export default Chatbot;
