"use client"
import React, { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download } from "lucide-react"

type Certificate = {
  id: number;
  courseName: string;
  issueDate: string;
  credentialId: string;
};

type CertificatesSectionProps = {
  certificates: Certificate[];
};

const CertificatesSection: FC<CertificatesSectionProps> = ({ certificates }) => (
    <Card className="shadow-lg border-0 animate-fade-in-up">
        <CardHeader><CardTitle className="flex items-center gap-2 text-[#123C69]"><Award className="w-5 h-5 text-[#ACD157]" />Mis Certificados</CardTitle><CardDescription>Aquí puedes ver y descargar todos los certificados que has obtenido.</CardDescription></CardHeader>
        <CardContent>
            <div className="space-y-4">
                {certificates.map(cert => (
                    <div key={cert.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50/50 transition-colors">
                        <div>
                            <p className="font-semibold text-[#123C69]">{cert.courseName}</p>
                            <p className="text-sm text-gray-500">Emitido: {cert.issueDate} | ID: {cert.credentialId}</p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 sm:mt-0"><Download className="w-4 h-4 mr-2" />Descargar</Button>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

export default CertificatesSection;
