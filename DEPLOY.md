# 🚀 Deploy no Easypanel com Nixpacks

## ✅ Pré-requisitos

O projeto está pronto para deploy! Todos os arquivos necessários já estão configurados.

## 📋 Configuração no Easypanel

### 1. Criar novo projeto
- Acesse seu Easypanel
- Clique em "Create Project"
- Escolha "Git Repository"

### 2. Conectar repositório
- URL: `https://github.com/daflones/criatech`
- Branch: `main`

### 3. Configurar Build
- **Método de Build**: Nixpacks ✅ (já selecionado na imagem)
- **Comando de Instalação**: (deixe vazio, usa o padrão)
- **Comando de Build**: (deixe vazio, usa o padrão)
- **Comando de Início**: (deixe vazio, usa o padrão)

O arquivo `nixpacks.toml` já configura tudo automaticamente!

### 4. Variáveis de Ambiente (IMPORTANTE!)

Adicione **EXATAMENTE** estas variáveis na seção "Environment Variables":

```
NEXT_PUBLIC_SUPABASE_URL=https://dqckxzliothvmxatqmty.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxY2t4emxpb3Rodm14YXRxbXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzczMjUzMywiZXhwIjoyMDc5MzA4NTMzfQ.sMjfGwHUkqk9VeEjhRI5C6uF93u7z3SxZ70c5pPK4LI
NODE_ENV=production
```

⚠️ **CRÍTICO - NOMES EXATOS**: 
- ✅ `NEXT_PUBLIC_SUPABASE_URL` (COM o prefixo NEXT_PUBLIC_)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` (SEM o prefixo NEXT_PUBLIC_)
- ❌ NÃO use `SUPABASE_URL` (sem o NEXT_PUBLIC_)
- ❌ NÃO use `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`

### 5. Porta
- Porta padrão: **3000** (Next.js usa automaticamente)

### 6. Deploy
- Clique em "Deploy"
- Aguarde o build (leva ~2-3 minutos)

## 🔧 Arquivos de Configuração

### `nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["nodejs_20"]

[phases.install]
cmds = ["npm ci"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"
```

### `package.json` (scripts)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

## ✅ Checklist de Deploy

- [x] Repositório no GitHub
- [x] `nixpacks.toml` configurado
- [x] `package.json` com scripts corretos
- [x] `.gitignore` protegendo `.env.local`
- [x] API route para Supabase (`/api/leads`)
- [ ] Variáveis de ambiente configuradas no Easypanel
- [ ] Deploy realizado

## 🐛 Troubleshooting

### Build falha
- Verifique se as variáveis de ambiente estão corretas
- Confirme que a service_role_key do Supabase está configurada

### Formulário não salva leads
- Verifique a variável `SUPABASE_SERVICE_ROLE_KEY`
- Confirme que a tabela `leads` existe no Supabase
- Verifique os logs da aplicação

### Imagens não aparecem
- Certifique-se que as imagens estão em `/public/images/`
- Verifique se foram commitadas no Git

## 📱 Após o Deploy

1. Teste o formulário de leads
2. Verifique se os dados estão sendo salvos no Supabase
3. Teste em diferentes dispositivos (mobile, tablet, desktop)
4. Configure domínio customizado (opcional)

## 🔗 Links Úteis

- Repositório: https://github.com/daflones/criatech
- Documentação Nixpacks: https://nixpacks.com/docs
- Next.js Deploy: https://nextjs.org/docs/deployment
