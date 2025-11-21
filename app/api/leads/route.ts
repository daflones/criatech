import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Cliente Supabase com service role (apenas server-side)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { whatsapp, service_type, form_data } = body

    // Validação básica
    if (!whatsapp || !service_type || !form_data) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Inserir lead no Supabase usando service role
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([{ whatsapp, service_type, form_data }])
      .select()

    if (error) {
      console.error('Erro ao salvar lead:', error)
      return NextResponse.json(
        { error: 'Erro ao salvar dados' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
