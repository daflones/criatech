'use client'

import { motion } from 'framer-motion'
import { Target, Users, Rocket, Heart } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Sobre a <span className="gradient-text">CriaTech</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Somos especialistas em transformar negócios através da tecnologia e inovação digital
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo circular */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative w-32 h-32 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur-xl opacity-50 animate-pulse-slow" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary-500/30 glass">
                  <Image
                    src="/images/heroo.png"
                    alt="CriaTech Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <h3 className="text-3xl font-bold mb-6">Nossa Missão</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Democratizar o acesso a soluções digitais de alta qualidade, permitindo que empresas 
              de todos os tamanhos possam competir no mercado digital com ferramentas profissionais 
              e estratégias comprovadas de conversão.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Utilizamos inteligência artificial e as mais modernas tecnologias para criar 
              experiências digitais que realmente convertem visitantes em clientes fiéis.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Foco em Resultados</h4>
              <p className="text-sm text-gray-400">Cada projeto é otimizado para máxima conversão</p>
            </div>

            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Suporte Dedicado</h4>
              <p className="text-sm text-gray-400">Equipe disponível 24/7 para você</p>
            </div>

            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Inovação Constante</h4>
              <p className="text-sm text-gray-400">Sempre à frente das tendências</p>
            </div>

            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary-500 to-primary-500 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Paixão pelo Cliente</h4>
              <p className="text-sm text-gray-400">Seu sucesso é nossa prioridade</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
