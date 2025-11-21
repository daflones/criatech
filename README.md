# CriaTech - Landing Page High-Ticket

Landing page profissional de alta conversão para a CriaTech, empresa especializada em desenvolvimento de sistemas, softwares e vídeos com IA.

## 🚀 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Framer Motion** - Animações
- **Supabase** - Banco de dados
- **React Hook Form** - Gerenciamento de formulários
- **Lucide React** - Ícones

## 🎨 Design

- **Cores**: Cinza, Azul e Rosado
- **Estilo**: Moderno, tecnológico e minimalista
- **Animações**: Suaves e profissionais
- **Responsivo**: Mobile-first

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas credenciais do Supabase

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

## 🗄️ Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Obtenha suas credenciais:
   - **Project URL**: Settings → API → Project URL
   - **Service Role Key**: Settings → API → service_role (secret)
   
   ⚠️ **IMPORTANTE**: Use a **service_role key** (não a anon key) para ter permissões completas
   
3. Crie a tabela `leads` com o seguinte SQL:

```sql
-- Criar tabela de leads
create table leads (
  id uuid default uuid_generate_v4() primary key,
  whatsapp text not null,
  service_type text not null check (service_type in ('website', 'video')),
  form_data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS (Row Level Security)
alter table leads enable row level security;

-- Criar política para permitir inserções públicas (IMPORTANTE!)
create policy "Enable insert for all users" 
  on leads 
  for insert 
  to anon, authenticated
  with check (true);

-- Criar política para permitir leitura apenas para usuários autenticados
create policy "Enable read for authenticated users only" 
  on leads 
  for select 
  to authenticated
  using (true);

-- Índice para buscar por tipo de serviço
create index idx_leads_service_type on leads(service_type);

-- Índice GIN para buscar dentro do JSONB
create index idx_leads_form_data on leads using gin(form_data);
```

4. Crie um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_project_url_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
```

⚠️ **SEGURANÇA**: A service_role key é usada apenas no servidor (API routes) e nunca é exposta ao cliente

## 📁 Estrutura do Projeto

```
CriaTech/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── About.tsx
│   ├── Pricing.tsx
│   ├── LeadForm.tsx
│   └── Footer.tsx
├── lib/
│   └── supabase.ts
├── public/
│   └── images/
│       └── (coloque suas imagens aqui)
└── package.json
```

## 🖼️ Imagens

Adicione suas imagens na pasta `public/images/`:
- `logo.png` - Logo da CriaTech
- `hero.png` - Imagem principal do hero
- Outras imagens para o carrossel/galeria

## 🎯 Funcionalidades

- ✅ Hero section com CTA destacado
- ✅ Seção de features/serviços
- ✅ Sobre a empresa
- ✅ Pricing com plano de R$ 297
- ✅ Formulário multi-step para captura de leads
- ✅ Integração com Supabase
- ✅ Redirecionamento para WhatsApp
- ✅ Animações e efeitos visuais
- ✅ Design responsivo
- ✅ Otimizado para conversão

## 📱 Captura de Leads

O formulário possui fluxo condicional com até 4 etapas:

**Etapa 1:** WhatsApp - Captura o número de contato

**Etapa 2:** Tipo de Serviço - Site ou Vídeo

**Se escolher SITE:**
- Etapa 3: Tipo de site (E-commerce, Landing Page, Sistema, etc)
- Etapa 4: Nome da empresa
- Etapa 5: Características desejadas no site

**Se escolher VÍDEO:**
- Etapa 3: Tipo de comércio
- Etapa 4: Formato do vídeo (Venda, Comunicativo, etc)
- Etapa 5: Nome da empresa

Após o envio, o lead é salvo no Supabase com estrutura JSONB e uma mensagem de sucesso é exibida.

## 🎨 Personalização

Para personalizar cores, edite o arquivo `tailwind.config.js`:
- `primary` - Tons de azul
- `secondary` - Tons de rosa/roxo
- `gray` - Tons de cinza

## 📄 Licença

© 2024 CriaTech. Todos os direitos reservados.
