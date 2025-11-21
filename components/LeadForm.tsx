'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Phone, ArrowRight, CheckCircle, Globe, Video, ShoppingCart, FileText, Code, Store, Megaphone, MessageSquare } from 'lucide-react'
import { saveLead, WebsiteFormData, VideoFormData } from '@/lib/supabase'
import toast from 'react-hot-toast'

type FormData = {
  whatsapp: string
  service_type: 'website' | 'video'
  // Website fields
  website_type?: string
  // Video fields
  business_type?: string
  video_format?: string
  // Common
  company_name?: string
  characteristics?: string
}

export default function LeadForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [preSelectedService, setPreSelectedService] = useState<'website' | 'video' | null>(null)
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>()
  
  const serviceType = watch('service_type')
  const websiteType = watch('website_type')
  const businessType = watch('business_type')
  const videoFormat = watch('video_format')
  const companyName = watch('company_name')

  // Detectar serviço pré-selecionado da URL
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        // Pegar parâmetros do hash (ex: #lead-form?service=website)
        const hash = window.location.hash
        const queryString = hash.includes('?') ? hash.split('?')[1] : ''
        const params = new URLSearchParams(queryString)
        const service = params.get('service')
        
        if (service === 'website' || service === 'video') {
          setPreSelectedService(service)
          setValue('service_type', service)
        }

        // Scroll suave para o formulário
        const formElement = document.getElementById('lead-form')
        if (formElement && hash.includes('lead-form')) {
          setTimeout(() => {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      }
    }

    // Executar na montagem
    handleHashChange()

    // Escutar mudanças no hash
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [setValue])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      let form_data: WebsiteFormData | VideoFormData
      
      if (data.service_type === 'website') {
        form_data = {
          website_type: data.website_type || '',
          company_name: data.company_name || '',
          characteristics: data.characteristics || ''
        }
      } else {
        form_data = {
          business_type: data.business_type || '',
          video_format: data.video_format || '',
          company_name: data.company_name || ''
        }
      }
      
      await saveLead({
        whatsapp: data.whatsapp,
        service_type: data.service_type,
        form_data
      })
      
      setIsSuccess(true)
      toast.success('Dados recebidos com sucesso!')
    } catch (error) {
      console.error('Error saving lead:', error)
      toast.error('Erro ao enviar formulário. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  return (
    <section id="lead-form" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Comece Sua <span className="gradient-text">Transformação</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Preencha o formulário e receba uma proposta personalizada
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 sm:p-12 border border-gray-800">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                          <Phone className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Qual seu WhatsApp?</h3>
                        <p className="text-gray-400">Vamos entrar em contato para entender suas necessidades</p>
                      </div>

                      <div>
                        <input
                          type="tel"
                          {...register('whatsapp', {
                            required: 'WhatsApp é obrigatório',
                            pattern: {
                              value: /^\(\d{2}\)\s\d{5}-\d{4}$/,
                              message: 'Formato inválido. Use: (11) 99999-9999'
                            }
                          })}
                          onChange={(e) => {
                            e.target.value = formatWhatsApp(e.target.value)
                          }}
                          placeholder="(11) 99999-9999"
                          className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors text-lg"
                        />
                        {errors.whatsapp && (
                          <p className="mt-2 text-red-400 text-sm">{errors.whatsapp.message}</p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const whatsapp = watch('whatsapp')
                          if (whatsapp && /^\(\d{2}\)\s\d{5}-\d{4}$/.test(whatsapp)) {
                            // Se tem serviço pré-selecionado, pula para etapa 3
                            if (preSelectedService) {
                              setStep(3)
                            } else {
                              setStep(2)
                            }
                          } else {
                            toast.error('Por favor, insira um WhatsApp válido')
                          }
                        }}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Continuar
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">O que você precisa?</h3>
                        <p className="text-gray-400">Selecione o serviço desejado</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto">
                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            value="website"
                            {...register('service_type', { required: true })}
                            className="sr-only peer"
                          />
                          <div className="h-full p-8 glass rounded-xl border-2 border-gray-700 peer-checked:border-primary-500 peer-checked:bg-primary-500/10 hover:border-gray-600 transition-all text-center">
                            <Globe className="w-12 h-12 mx-auto mb-4 text-primary-400" />
                            <div className="font-semibold text-lg">Site</div>
                            <p className="text-sm text-gray-400 mt-2">Desenvolvimento web</p>
                          </div>
                        </label>

                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            value="video"
                            {...register('service_type', { required: true })}
                            className="sr-only peer"
                          />
                          <div className="h-full p-8 glass rounded-xl border-2 border-gray-700 peer-checked:border-secondary-500 peer-checked:bg-secondary-500/10 hover:border-gray-600 transition-all text-center">
                            <Video className="w-12 h-12 mx-auto mb-4 text-secondary-400" />
                            <div className="font-semibold text-lg">Vídeo IA</div>
                            <p className="text-sm text-gray-400 mt-2">Vídeos com inteligência artificial</p>
                          </div>
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={() => serviceType && setStep(3)}
                        disabled={!serviceType}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuar
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full text-gray-400 hover:text-white transition-colors"
                      >
                        Voltar
                      </button>
                    </motion.div>
                  )}

                  {/* ETAPA 3 - WEBSITE: Tipo de Site */}
                  {step === 3 && serviceType === 'website' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Que tipo de site você precisa?</h3>
                        <p className="text-gray-400">Escolha a categoria que melhor se encaixa</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: 'ecommerce', icon: ShoppingCart, label: 'E-commerce', desc: 'Loja online' },
                          { value: 'landing', icon: FileText, label: 'Landing Page', desc: 'Página de vendas' },
                          { value: 'sistema', icon: Code, label: 'Sistema', desc: 'Plataforma web' },
                          { value: 'institucional', icon: Store, label: 'Institucional', desc: 'Site corporativo' },
                        ].map((option) => (
                          <label key={option.value} className="cursor-pointer">
                            <input
                              type="radio"
                              value={option.value}
                              {...register('website_type', { required: true })}
                              className="sr-only peer"
                            />
                            <div className="p-4 glass rounded-xl border-2 border-gray-700 peer-checked:border-primary-500 peer-checked:bg-primary-500/10 hover:border-gray-600 transition-all text-center">
                              <option.icon className="w-8 h-8 mx-auto mb-2 text-primary-400" />
                              <div className="font-semibold text-sm">{option.label}</div>
                              <p className="text-xs text-gray-400 mt-1">{option.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => websiteType && setStep(4)}
                        disabled={!websiteType}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuar
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(preSelectedService ? 1 : 2)}
                        className="w-full text-gray-400 hover:text-white transition-colors"
                      >
                        Voltar
                      </button>
                    </motion.div>
                  )}

                  {/* ETAPA 3 - VIDEO: Tipo de Comércio */}
                  {step === 3 && serviceType === 'video' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Qual o tipo do seu comércio?</h3>
                        <p className="text-gray-400">Selecione o segmento do seu negócio</p>
                      </div>

                      <div className="space-y-3">
                        {[
                          'Restaurante',
                          'Mercado/Supermercado',
                          'Loja de Roupas',
                          'Serviços',
                          'Indústria',
                          'Tecnologia',
                          'Saúde',
                          'Educação',
                          'Outro'
                        ].map((type) => (
                          <label key={type} className="cursor-pointer block">
                            <input
                              type="radio"
                              value={type}
                              {...register('business_type', { required: true })}
                              className="sr-only peer"
                            />
                            <div className="p-4 glass rounded-xl border-2 border-gray-700 peer-checked:border-secondary-500 peer-checked:bg-secondary-500/10 hover:border-gray-600 transition-all">
                              <div className="font-semibold">{type}</div>
                            </div>
                          </label>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => businessType && setStep(4)}
                        disabled={!businessType}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuar
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(preSelectedService ? 1 : 2)}
                        className="w-full text-gray-400 hover:text-white transition-colors"
                      >
                        Voltar
                      </button>
                    </motion.div>
                  )}

                  {/* ETAPA 4 - WEBSITE: Nome da Empresa */}
                  {step === 4 && serviceType === 'website' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Qual o nome da sua empresa?</h3>
                        <p className="text-gray-400">Informe o nome do seu negócio</p>
                      </div>

                      <div>
                        <input
                          type="text"
                          {...register('company_name', { required: 'Nome da empresa é obrigatório' })}
                          placeholder="Ex: Minha Empresa Ltda"
                          className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors text-lg"
                        />
                        {errors.company_name && (
                          <p className="mt-2 text-red-400 text-sm">{errors.company_name.message}</p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => companyName && setStep(5)}
                        disabled={!companyName}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuar
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="w-full text-gray-400 hover:text-white transition-colors"
                      >
                        Voltar
                      </button>
                    </motion.div>
                  )}

                  {/* ETAPA 4 - VIDEO: Formato do Vídeo */}
                  {step === 4 && serviceType === 'video' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Qual o formato do vídeo?</h3>
                        <p className="text-gray-400">Escolha o estilo que melhor atende</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: 'venda', icon: Megaphone, label: 'Vendas', desc: 'Promover produtos' },
                          { value: 'comunicativo', icon: MessageSquare, label: 'Comunicativo', desc: 'Informar/educar' },
                          { value: 'institucional', icon: Store, label: 'Institucional', desc: 'Apresentação' },
                          { value: 'social', icon: Video, label: 'Redes Sociais', desc: 'Conteúdo viral' },
                        ].map((option) => (
                          <label key={option.value} className="cursor-pointer">
                            <input
                              type="radio"
                              value={option.value}
                              {...register('video_format', { required: true })}
                              className="sr-only peer"
                            />
                            <div className="p-4 glass rounded-xl border-2 border-gray-700 peer-checked:border-secondary-500 peer-checked:bg-secondary-500/10 hover:border-gray-600 transition-all text-center">
                              <option.icon className="w-8 h-8 mx-auto mb-2 text-secondary-400" />
                              <div className="font-semibold text-sm">{option.label}</div>
                              <p className="text-xs text-gray-400 mt-1">{option.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => videoFormat && setStep(5)}
                        disabled={!videoFormat}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuar
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="w-full text-gray-400 hover:text-white transition-colors"
                      >
                        Voltar
                      </button>
                    </motion.div>
                  )}

                  {/* ETAPA 5 - WEBSITE: Características */}
                  {step === 5 && serviceType === 'website' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Como você imagina seu site?</h3>
                        <p className="text-gray-400">Descreva as características e funcionalidades desejadas</p>
                      </div>

                      <div>
                        <textarea
                          {...register('characteristics', { required: 'Por favor, descreva suas expectativas' })}
                          rows={6}
                          placeholder="Ex: Gostaria de um site moderno, com cores azul e branco, com catálogo de produtos, formulário de contato, integração com WhatsApp..."
                          className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                        />
                        {errors.characteristics && (
                          <p className="mt-2 text-red-400 text-sm">{errors.characteristics.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="w-full text-gray-400 hover:text-white transition-colors"
                      >
                        Voltar
                      </button>
                    </motion.div>
                  )}

                  {/* ETAPA 5 - VIDEO: Nome da Empresa */}
                  {step === 5 && serviceType === 'video' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Qual o nome da sua empresa?</h3>
                        <p className="text-gray-400">Informe o nome do seu negócio</p>
                      </div>

                      <div>
                        <input
                          type="text"
                          {...register('company_name', { required: 'Nome da empresa é obrigatório' })}
                          placeholder="Ex: Minha Empresa Ltda"
                          className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors text-lg"
                        />
                        {errors.company_name && (
                          <p className="mt-2 text-red-400 text-sm">{errors.company_name.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="w-full text-gray-400 hover:text-white transition-colors"
                      >
                        Voltar
                      </button>
                    </motion.div>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center animate-scale-in">
                    <CheckCircle className="w-16 h-16 text-green-400" />
                  </div>
                  <h3 className="text-4xl font-bold mb-4 gradient-text">Dados Recebidos!</h3>
                  <p className="text-gray-300 text-lg mb-4">
                    Obrigado por seu interesse na CriaTech!
                  </p>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Nossa equipe irá analisar suas informações e entrará em contato em breve via WhatsApp para conversar sobre suas necessidades e apresentar a melhor solução.
                  </p>
                  <div className="glass rounded-xl p-6 max-w-md mx-auto">
                    <p className="text-sm text-gray-400">
                      ⏱️ Tempo médio de resposta: <span className="text-primary-400 font-semibold">24 horas</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
