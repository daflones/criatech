import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import StructuredData from '../components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CriaTech | Desenvolvimento de Sites e Vídeos com IA no Rio de Janeiro',
  description: 'CriaTech: Especialistas em desenvolvimento de sites, sistemas e vídeos com inteligência artificial. Transformamos seu negócio com soluções digitais de alta conversão. Atendimento em todo Brasil.',
  keywords: [
    'CriaTech',
    'cria tech',
    'criatech',
    'desenvolvimento de sites',
    'desenvolvimento web',
    'sites com IA',
    'vídeos com inteligência artificial',
    'landing pages',
    'sistemas personalizados',
    'softwares sob medida',
    'desenvolvimento de software',
    'Rio de Janeiro',
    'Brasil',
    'alta conversão',
    'transformação digital',
    'tecnologia e inovação',
    'sites responsivos',
    'e-commerce',
    'plataformas web'
  ],
  authors: [{ name: 'CriaTech' }],
  creator: 'CriaTech',
  publisher: 'CriaTech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://criatech.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://criatech.com.br',
    title: 'CriaTech | Desenvolvimento de Sites e Vídeos com IA',
    description: 'Especialistas em desenvolvimento de sites, sistemas e vídeos com inteligência artificial. Transformamos seu negócio com soluções digitais de alta conversão.',
    siteName: 'CriaTech',
    images: [
      {
        url: '/images/heroo.png',
        width: 1200,
        height: 630,
        alt: 'CriaTech - Desenvolvimento de Sites e Vídeos com IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CriaTech | Desenvolvimento de Sites e Vídeos com IA',
    description: 'Especialistas em desenvolvimento de sites, sistemas e vídeos com inteligência artificial. Transformamos seu negócio com soluções digitais.',
    images: ['/images/heroo.png'],
    creator: '@criatech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: [
      { url: '/images/heroo.png', sizes: 'any', type: 'image/png' },
      { url: '/images/heroo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/heroo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/heroo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'apple-touch-icon-precomposed', url: '/images/heroo.png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StructuredData />
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
