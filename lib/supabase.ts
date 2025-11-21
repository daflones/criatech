export interface WebsiteFormData {
  website_type: string
  company_name: string
  characteristics: string
}

export interface VideoFormData {
  business_type: string
  video_format: string
  company_name: string
}

export interface Lead {
  id?: string
  whatsapp: string
  service_type: 'website' | 'video'
  form_data: WebsiteFormData | VideoFormData
  created_at?: string
}

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at'>) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lead),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao salvar lead')
  }

  const result = await response.json()
  return result.data
}
