# ⏲ ReminderApi

A **ReminderApi** é uma API REST que permite que usuários autenticados criem e gerenciem lembretes, incluindo funcionalidades de criação, listagem, atualização, ativação/desativação e exclusão.

## 🚀 Funcionalidades

- Autenticação de usuários
- Criar lembretes
- Listar lembretes
- Atualizar lembretes
- Ativar ou desativar lembretes
- Excluir lembretes
- Endpoint de health check da API


## 🛠️ Tecnologias

- Node.js
- Express
- Supabase
- TypeScript
- REST API


## ⚙️ Como rodar o projeto

### ① Clonar o repositório

```bash
git clone https://github.com/jaquelinereiss/ReminderApi.git
cd ReminderApi
```

### ② Instalar dependências

```bash
npm install
```

### ③ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
PORT=3000
```

### ④ Rodar o servidor

Modo desenvolvimento:

```bash
npm run dev
```

Servidor disponível em:

```
http://localhost:3000
```

## 🔐 Autenticação

A API utiliza **Bearer Token** retornado pelo Supabase durante o login, com a autenticação gerenciada pelo **Supabase Auth**, garantindo acesso seguro às rotas protegidas.

Header obrigatório nas rotas protegidas:

```
Authorization: Bearer {access_token}
```


## 📡 Endpoints

### 🔹 Health Check
#### ▹ GET `/health`
- Verifica se a API está funcionando.

#

### 🔹 Auth
#### ▹ POST `/auth/login`
- Autentica um usuário e retorna um **access_token**.

#

### 🔹 Reminders
Todas as rotas abaixo exigem autenticação.

#### ▹ POST `/reminders`
- Cria um novo lembrete para o usuário autenticado.


#### ▹ GET `/reminders`
- Retorna todos os lembretes do usuário autenticado.


#### ▹ PUT `/reminders/:id`
- Atualiza os dados de um lembrete existente.


#### ▹ PATCH `/reminders/:id/active`
- Altera o status de ativação do lembrete.


#### ▹ DELETE `/reminders/:id`
- Remove um lembrete do sistema.

#

### ✧ Tipos de repetição

| Tipo | Descrição |
|-----|-----|
| once | executa apenas uma vez |
| daily | executa todos os dias |
| interval | executa em intervalo de horas |

#### Exemplo com intervalo

```json
{
  "repeatType": "interval",
  "interval": 4
}
```

## 🌐 API Online

A API está hospedada na plataforma **Render** e pode ser acessada publicamente.

**Base URL**

```
https://reminderapi.onrender.com
```

**Health Check**

```
GET https://reminderapi.onrender.com/health
```
