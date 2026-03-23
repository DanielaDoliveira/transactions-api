# Transactions API

API RESTful para gerenciamento de transações financeiras, desenvolvida com Node.js, Fastify e TypeScript.

---

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Knex.js](https://knexjs.org/)
- [SQLite](https://www.sqlite.org/)

---

## Requisitos

- Node.js 18+
- npm

---

## Instalação e execução

**1. Clone o repositório:**

```bash
git clone <url-do-repositório>
cd 02-api-node-js
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
NODE_ENV=development
DATABASE_URL=./db/app.db
```

**4. Execute as migrations do banco de dados:**

```bash
npm run knex -- migrate:latest
```

**5. Inicie o servidor em modo desenvolvimento:**

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

---

## Rotas

A autenticação é feita via cookie `sessionId`, gerado automaticamente na primeira transação criada.

### POST `/transactions`

Cria uma nova transação. Caso não exista um cookie `sessionId`, ele será gerado automaticamente.

**Body:**

```json
{
  "title": "Freelancer",
  "amount": 8000,
  "type": "credit"
}
```

| Campo    | Tipo                    | Descrição                                                          |
|----------|-------------------------|--------------------------------------------------------------------|
| `title`  | `string`                | Título da transação                                                |
| `amount` | `number`                | Valor da transação                                                 |
| `type`   | `credit` ou `debit`     | Crédito soma o valor, débito subtrai                               |

**Resposta:** `201 Created`

---

### GET `/transactions`

Retorna todas as transações da sessão atual.

> Requer cookie `sessionId`.

**Resposta:** `200 OK`

```json
{
  "transactions": [
    {
      "id": "db48ff87-59bf-46a0-825c-24ecf73c6450",
      "title": "Freelancer",
      "amount": 8000,
      "created_at": "2026-03-22 21:00:19",
      "session_id": "a803a163-d771-43ea-8258-5e43fe6ee2db"
    }
  ]
}
```

---

### GET `/transactions/:id`

Retorna uma transação específica pelo ID.

> Requer cookie `sessionId`.

**Parâmetro:** `id` — UUID da transação.

**Resposta:** `200 OK`

```json
{
  "transaction": {
    "id": "db48ff87-59bf-46a0-825c-24ecf73c6450",
    "title": "Freelancer",
    "amount": 8000,
    "created_at": "2026-03-22 21:00:19",
    "session_id": "a803a163-d771-43ea-8258-5e43fe6ee2db"
  }
}
```

---

### GET `/transactions/summary`

Retorna o saldo total das transações da sessão atual.

> Requer cookie `sessionId`.

**Resposta:** `200 OK`

```json
{
  "summary": {
    "amount": 8000
  }
}
```

---

## Scripts disponíveis

| Comando           | Descrição                                      |
|-------------------|------------------------------------------------|
| `npm run dev`     | Inicia o servidor em modo desenvolvimento      |
| `npm run knex`    | Executa comandos do Knex (migrations, seeds)   |
| `npm run lint`    | Executa o ESLint e corrige erros automaticamente |
| `npm run test`    | Executa os testes com Vitest                   |

---

## Migrations

Para criar uma nova migration:

```bash
npm run knex -- migrate:make nome_da_migration
```

Para executar as migrations:

```bash
npm run knex -- migrate:latest
```

Para reverter a última migration:

```bash
npm run knex -- migrate:rollback
```

---

## Testes

```bash
npm run test
```

Os testes são executados com [Vitest](https://vitest.dev/) e [Supertest](https://github.com/ladjs/supertest).

---

## Licença

ISC




---
# Requisitos funcionais
- [x] O usuário deve poder obter um resumo da sua conta
- [x] O usuário deve poder criar uma nova transação.
- [x] O usuário deve poder listar todas as transações que já ocorreram.
- [x] O usuário deve poder visualizar uma transação única;
# Regras de negócio
- [x]  A transação pode ser do tipo crédito que somará ao valor total ou débito, que subtrairá;
- [x]  Deve ser possível identificarmos o usuário entre as requisições.
- [x]  o usuário só pode visualizar transações o qual ele criou.

