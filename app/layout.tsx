import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CriaTech - Soluções Digitais de Alta Conversão',
  description: 'Desenvolvimento de sistemas, softwares e vídeos com IA para maximizar suas conversões. Sites personalizados e estratégias digitais que transformam visitantes em clientes.',
  keywords: 'desenvolvimento web, vídeos com IA, alta conversão, landing pages, sistemas personalizados',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #374151',
            },
            success: {
              iconTheme: {
                primary: '#6366f1',
                secondary: '#f9fafb',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
