'use client'

import { motion } from 'framer-motion'
import { Code, Video, Zap, Palette, BarChart, Shield } from 'lucide-react'

const features = [
  {
    icon: Code,
    title: 'Sites Personalizados',
    description: 'Desenvolvimento web sob medida para seu negócio, com design moderno e responsivo.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Video,
    title: 'Vídeos com IA',
    description: 'Criação de vídeos profissionais usando inteligência artificial adaptados ao seu nicho.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Alta Performance',
    description: 'Sites otimizados para velocidade e conversão, garantindo a melhor experiência do usuário.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Palette,
    title: 'Design Exclusivo',
    description: 'Identidade visual única que representa a essência da sua marca.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: BarChart,
    title: 'Análise de Dados',
    description: 'Métricas e relatórios detalhados para acompanhar o crescimento do seu negócio.',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Shield,
    title: 'Segurança Garantida',
    description: 'Proteção avançada e backups automáticos para manter seus dados seguros.',
    color: 'from-indigo-500 to-purple-500',
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Soluções <span className="gradient-text">Completas</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tudo que você precisa para levar seu negócio ao próximo nível
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="h-full glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-gray-800 hover:border-gray-700">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
