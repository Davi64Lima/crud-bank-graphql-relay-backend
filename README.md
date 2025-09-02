# 🏦 Bank CRUD GraphQL Relay - Backend

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-16+-e10098.svg)](https://graphql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0+-green.svg)](https://mongodb.com/)

Uma API GraphQL moderna para sistema bancário construída para o **Woovi Challenge**, implementando operações CRUD com padrões Relay e funcionalidades de transferência entre contas.

## 🎯 Visão Geral

Este projeto implementa um sistema bancário simplificado com:

- Criação e gerenciamento de contas
- Transferências entre contas com validações de saldo
- Histórico completo de transações
- API GraphQL com padrões Relay para paginação
- Arquitetura escalável e performática

## 🏗️ Arquitetura e Decisões Técnicas

### Stack Tecnológica

**Backend Core:**

- **Node.js + TypeScript**: Type safety e desenvolvimento moderno
- **Koa.js**: Framework minimalista e performático para APIs
- **GraphQL**: API flexível e eficiente para frontend
- **MongoDB + Mongoose**: Base NoSQL com ODM robusto

**GraphQL Ecosystem:**

- **graphql-relay**: Implementação dos padrões Relay (Connections, Nodes)
- **DataLoader**: Solução elegante para problema N+1 queries
- **koa-graphql**: Integração GraphQL com Koa.js

**Ferramentas de Desenvolvimento:**

- **pnpm**: Gerenciador de pacotes eficiente
- **nodemon**: Hot reload para desenvolvimento
- **dotenv-safe**: Gerenciamento seguro de variáveis de ambiente

### Decisões Arquiteturais

#### 1. **Estrutura de Pastas por Features**

```
src/
├── models/           # Modelos Mongoose (Account, Transaction)
├── modules/          # Módulos GraphQL organizados por domínio
│   ├── Account/      # Types, queries, mutations de Account
│   └── Transaction/  # Types, queries, mutations de Transaction
├── services/         # Lógica de negócio (TransferService)
├── dataloaders/      # DataLoaders para otimização de queries
├── context/          # Context GraphQL com loaders e auth
├── schema/           # Schema GraphQL principal
└── server/           # Configuração do servidor Koa
```

**Por que esta estrutura?**

- **Escalabilidade**: Fácil adicionar novos módulos (User, Payment, etc.)
- **Manutenibilidade**: Código relacionado fica junto
- **Separação de responsabilidades**: Models, business logic, e GraphQL separados
- **Padrão de mercado**: Amplamente adotado em projetos GraphQL

#### 2. **Mongoose com Validações e Métodos Customizados**

```typescript
// Exemplo: Account.ts
AccountSchema.methods.hasSufficientBalance = function (
  amount: number
): boolean {
  return this.balance >= amount;
};
```

**Por que Mongoose?**

- **Validações built-in**: Schema validation, required fields, etc.
- **Middleware**: Pre/post hooks para operações
- **Population**: Relacionamentos simples entre collections
- **Type Safety**: Boa integração com TypeScript

#### 3. **Service Layer para Lógica de Negócio**

```typescript
// TransferService com transações MongoDB
static async executeTransfer(fromId, toId, amount) {
  const session = await mongoose.startSession();
  // Transação ACID garantindo consistência
}
```

**Por que Service Layer?**

- **Transações ACID**: Transferências consistentes
- **Reutilização**: Lógica compartilhada entre resolvers
- **Testabilidade**: Fácil de unit test
- **Complexidade**: Isolamento de regras de negócio

#### 4. **GraphQL Modular com Relay Patterns**

```
modules/Account/
├── Account.ts        # GraphQL Type definition
├── queries/          # Query resolvers
└── mutations/        # Mutation resolvers
```

**Por que modular?**

- **Relay Compliance**: Preparado para frontend Relay
- **Organização**: Cada entidade em seu próprio módulo
- **Manutenção**: Fácil encontrar e modificar resolvers
- **Team Work**: Diferentes devs podem trabalhar em módulos diferentes

#### 5. **DataLoaders para Performance**

```typescript
// Elimina N+1 queries automaticamente
const accounts = await context.loaders.account.loadMany(accountIds);
```

**Por que DataLoaders?**

- **Performance**: Elimina N+1 queries
- **Cache**: Cache automático por request
- **Batching**: Agrupa queries similares
- **Padrão de mercado**: Standard em APIs GraphQL

### Modelo de Dados

#### Account (Conta)

```typescript
{
  _id: ObjectId,
  name: string,        // Nome do titular
  balance: number,     // Saldo atual
  createdAt: Date,
  updatedAt: Date
}
```

#### Transaction (Transação)

```typescript
{
  _id: ObjectId,
  from: ObjectId,      // Conta origem (ref: Account)
  to: ObjectId,        // Conta destino (ref: Account)
  amount: number,      // Valor transferido
  status: enum,        // pending | completed | failed
  description?: string, // Descrição opcional
  createdAt: Date,
  updatedAt: Date
}
```

**Decisões do Schema:**

- **ObjectId**: Padrão MongoDB, boa performance
- **Referencias**: from/to como ObjectId para integridade
- **Status enum**: Controle de estado das transações
- **Timestamps**: Auditoria automática
- **Balance denormalizado**: Performance vs consistência eventual

### Patterns Implementados

#### 1. **Repository Pattern** (via Mongoose)

- Models encapsulam acesso aos dados
- Métodos customizados nos schemas
- Validações centralizadas

#### 2. **Service Pattern**

- `TransferService`: Orquestra transferências complexas
- Lógica de negócio isolada dos resolvers
- Transações ACID para consistência

#### 3. **DataLoader Pattern**

- Cache e batching automático
- Resolução eficiente de relacionamentos
- Performance otimizada para GraphQL

#### 4. **Relay Connection Pattern** (Próximo)

- Paginação cursor-based
- Metadata de paginação (hasNextPage, etc.)
- Padrão para frontend Relay

## 🚀 Getting Started

### Pré-requisitos

- Node.js 18+
- MongoDB 6.0+
- pnpm 8+

### Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd backend

# Instale dependências
pnpm install

# Configure ambiente
cp .env.example .env
# Edite .env com sua MONGO_URI

# Execute seed para dados de teste
pnpm run seed

# Inicie o servidor
pnpm run dev
```

### Scripts Disponíveis

- `pnpm dev`: Servidor com hot reload
- `pnpm start`: Servidor de produção
- `pnpm build`: Compilar TypeScript
- `pnpm seed`: Inserir dados de teste

## 📡 GraphQL API

### Endpoints

- **GraphQL**: `http://localhost:4000/graphql`
- **GraphiQL**: `http://localhost:4000/graphql` (playground interativo)

### Queries Principais

```graphql
# Listar contas
query {
  accounts {
    id
    name
    balance
  }
}

# Buscar conta específica
query {
  account(id: "account_id") {
    id
    name
    balance
    transactions {
      id
      amount
      status
    }
  }
}

# Listar transações
query {
  transactions(limit: 10, offset: 0) {
    id
    amount
    status
    fromAccount {
      name
    }
    toAccount {
      name
    }
  }
}
```

### Mutations Principais

```graphql
# Criar conta
mutation {
  createAccount(name: "João Silva") {
    id
    name
    balance
  }
}

# Executar transferência
mutation {
  createTransaction(
    from: "account_id_1"
    to: "account_id_2"
    amount: 100.50
    description: "Pagamento teste"
  ) {
    id
    amount
    status
  }
}
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
PORT=4000                                    # Porta do servidor
MONGO_URI=mongodb://localhost:27017/bank    # URI do MongoDB
```

### Estrutura do Banco

- **Database**: `bank`
- **Collections**: `accounts`, `transactions`
- **Indexes**: Otimizados para queries frequentes

## 🏗️ Próximas Implementações

### Fase 1 - CRUD Completo ✅

- [x] Models Mongoose
- [x] Service Layer
- [x] Estrutura GraphQL modular
- [ ] Queries e Mutations funcionais
- [ ] Validações completas

### Fase 2 - Relay Implementation

- [ ] Connection types
- [ ] Edge types
- [ ] PageInfo implementation
- [ ] Cursor-based pagination

### Fase 3 - Performance & Quality

- [ ] DataLoaders implementation
- [ ] Error handling robusto
- [ ] Logging estruturado
- [ ] Unit tests

### Fase 4 - Production Ready

- [ ] Authentication/Authorization
- [ ] Rate limiting
- [ ] Deploy configuration
- [ ] Monitoring

## 📋 Convenções

### Commits (Semantic Commits)

```
feat: add user authentication
fix: resolve balance calculation bug
docs: update API documentation
refactor: optimize database queries
test: add unit tests for transfer service
```

### Código

- **ESLint + Prettier**: Formatação consistente
- **Nomenclatura**: camelCase para variáveis, PascalCase para types
- **Imports**: Absolute paths via tsconfig paths

## 🚀 Deploy

### Environment Requirements

- Node.js 18+
- MongoDB Atlas ou instância dedicada
- Variáveis de ambiente configuradas

### Deploy Platforms

- **Railway**: Recommended para desenvolvimento
- **Render**: Alternative com free tier
- **Vercel**: Para funções serverless

## 📞 Contato

**Projeto**: Woovi Challenge - Bank CRUD GraphQL Relay  
**Desenvolvedor**: [Davi Lima](https://www.linkedin.com/in/davi64lima/)\
**GitHub**: [/Davi64Lima](https://github.com/Davi64Lima) \
**Email**: [devdavi64lima@gmail.com](mailto:devdavi64lima@gmail.com)
