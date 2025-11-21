'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import Image from 'next/image'

const websiteFeatures = [
  'Site personalizado e responsivo',
  'Design exclusivo e moderno',
  'Otimização para conversão',
  'Integração com redes sociais',
  'Suporte técnico 24/7',
  'Certificado SSL de segurança',
  'Análise de métricas',
]

const videoFeatures = [
  'Vídeo profissional com IA',
  'Roteiro personalizado',
  'Narração com voz sintética',
  'Edição e efeitos visuais',
  'Música de fundo',
  'Formatos para redes sociais',
  'Revisões ilimitadas',
]

export default function Pricing() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Nossos <span className="gradient-text">Planos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Escolha a solução ideal para o seu negócio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card 1 - Sites */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full text-white font-semibold text-xs shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                Mais Popular
              </div>
            </div>

            <div className="glass rounded-2xl p-8 border-2 border-primary-500/30 glow h-full flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Desenvolvimento de Sites</h3>
                <p className="text-gray-400 text-sm">Site profissional completo</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-gray-500 text-2xl line-through">R$ 497</span>
                  <span className="text-5xl font-bold gradient-text">R$ 297</span>
                </div>
                <div className="text-gray-400 text-sm">Pagamento único</div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {websiteFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#lead-form?service=website"
                className="block w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-bold text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
              >
                Solicitar Orçamento
              </a>
            </div>
          </motion.div>

          {/* Card 2 - Vídeos IA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass rounded-2xl p-8 border border-gray-800 hover:border-secondary-500/50 transition-all duration-300 h-full flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Vídeos com IA</h3>
                <p className="text-gray-400 text-sm">Vídeo profissional automatizado</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold gradient-text">R$ 49,99</span>
                </div>
                <div className="text-gray-400 text-sm">Por vídeo</div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {videoFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#lead-form?service=video"
                className="block w-full px-6 py-4 glass border border-secondary-500 rounded-xl font-bold text-white hover:bg-secondary-500/20 hover:scale-105 transition-all duration-300 text-center"
              >
                Solicitar Orçamento
              </a>
            </div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">Empresas que confiam na CriaTech:</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[1, 2, 3].map((num) => (
              <motion.div
                key={num}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="relative w-32 h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={`/images/marca${num}.png`}
                  alt={`Marca ${num}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
