# 🚀 Automação de Testes - Automation Exercise

Este framework de testes foi desenvolvido como um exemplo prático de automação utilizando **Playwright + TypeScript**, cobrindo tanto testes de **Interface (E2E)** quanto **API**.

O projeto foi estruturado seguindo **boas práticas de Clean Code**, princípios de **manutenibilidade**, **reutilização** e o padrão **Page Object Model (POM)**, tornando-o escalável e adaptável a novos cenários.

---

# 🏗️ Arquitetura e Padrões

O projeto segue o padrão **Page Object Model (POM)** combinado com uma camada de **Services para API**, garantindo:

- ✅ Separação clara entre ações da página e validações
- ✅ Organização e reutilização de código
- ✅ Baixo acoplamento entre testes e regras de navegação
- ✅ Facilidade de manutenção e escalabilidade

## 🔹 Page Object Model (POM)

Cada página possui sua própria classe contendo:

- Mapeamento de elementos (locators)
- Métodos de interação
- Responsabilidades bem definidas

Os testes contêm apenas:
- Fluxo de negócio
- Validações
- Regras de comportamento

Isso mantém o teste **limpo, legível e expressivo**.

---

## 🔹 Camada de Services (API)

A camada `services` encapsula:

- Detalhes de requisições HTTP
- Parâmetros e payloads
- Manipulação de respostas
- Retorno tipado com `APIResponse`

Isso garante:

- Reuso de chamadas
- Abstração da implementação HTTP
- Código mais organizado e desacoplado

---

## 🔹 Fixtures Customizadas

Arquivo: `src/fixtures/test.fixture.ts`

Permite:

- Injeção automática de Page Objects
- Reutilização de instâncias
- Setup centralizado
- Código de teste mais limpo

---

## 🔹 Tipagem Forte com TypeScript

Tipos compartilhados definidos em: `src/types/api.ts`

Benefícios:

- Previsibilidade durante o desenvolvimento
- Autocomplete eficiente
- Redução de erros em tempo de compilação
- Contratos claros entre camadas

---

# 🗂️ Estrutura do Projeto

```
src/
├── pages/           → Page Objects
├── services/        → Serviços de API
├── fixtures/        → Fixtures customizadas
├── types/           → Interfaces e tipos compartilhados
├── utils/           → Utilitários (DataUtils)
utils/               → Utilitários gerais (JsonUtils)
tests/
├── e2e/             → Testes de Interface
└── api/             → Testes de API
```

---

# 🛠️ Tecnologias Utilizadas

- **Playwright v1.58+**
- **TypeScript**
- **Node.js (LTS recomendado)**

---

# 📋 Pré-requisitos

Certifique-se de ter instalado:

- Node.js (versão LTS recomendada)

---

# 📦 Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

---

# ▶️ Executando os Testes

### Rodar todos os testes
```bash
npm test
```

### Rodar apenas testes de API
```bash
npm run test:api
```

### Rodar apenas testes E2E (Interface)
```bash
npm run test:e2e
```

### Rodar em modo debug (UI Mode)
```bash
npm run test:debug
```

### Visualizar relatório HTML
```bash
npm run report
```

---

# ✅ Boas Práticas Adotadas

- ✔ Uso consistente de async/await
- ✔ Esperas explícitas com `expect(locator).toBeVisible()`
- ✔ Testes independentes (criam e limpam seus próprios dados)
- ✔ Reutilização de massa de dados entre fluxos
- ✔ Separação clara de responsabilidades
- ✔ Métodos pequenos e com única responsabilidade (SRP)
- ✔ Nomenclatura clara e descritiva
- ✔ Baixo acoplamento entre testes e implementação
- ✔ Métodos bilingues (português + inglês) para maior flexibilidade

---

# 🔄 Execução Sequencial Quando Necessário

Quando um fluxo depende diretamente de outro (ex: cadastro seguido de exclusão), utilizamos:

```typescript
test.describe.serial()
```

Isso garante execução sequencial e evita problemas de concorrência.

---

# 🧪 Persistência de Massa de Dados

O projeto utiliza o utilitário `JsonUtils` para:

- Persistir dados gerados dinamicamente
- Compartilhar dados entre testes
- Manter independência entre cenários

**Exemplo de uso:**

1. Criar usuário
2. Salvar dados em JSON
3. Utilizar no teste de login ou exclusão

---

# 🚧 Roadmap e Melhorias Futuras

O framework está em constante evolução.

## 🔹 BDD com Cucumber (Gherkin)

- Implementação de escrita de cenários em linguagem natural
- Maior colaboração entre QA, Devs e Stakeholders

## 🔹 Expansão da Cobertura de Testes

- Fluxos alternativos
- Casos de erro
- Cenários de exceção
- Testes negativos

## 🔹 Testes Mobile

- Emulação de dispositivos móveis
- Validação de responsividade
- Testes Android/iOS via Playwright

---

# 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

- Demonstrar boas práticas de automação
- Aplicar padrões de arquitetura consolidados
- Evidenciar organização, qualidade e escalabilidade
- Servir como base para projetos reais de QA/SDET

---

# 🤖 Ferramentas e Assistência

Este projeto foi desenvolvido com suporte de **IAs** para acelerar o processo e melhorar a qualidade:

- **Claude (Anthropic)** - Arquitetura, refatoração de código, otimizações e boas práticas
- **ChatGPT (OpenAI)** - Ideação, estrutura de documentação e melhorias de legibilidade

O uso de IAs permitiu:
- ⚡ Acelerar o desenvolvimento mantendo qualidade
- 🔍 Identificar padrões e anti-patterns
- 📚 Estruturar documentação clara e profissional
- 🎯 Aplicar melhores práticas de forma consistente
- 🛠️ Otimizar código e arquitetura

---

# 📝 Contribuições

Se desejar contribuir ou sugerir melhorias, fique à vontade para:

- Abrir uma **issue** com dúvidas ou sugestões
- Enviar um **pull request** com melhorias
- Reportar bugs ou comportamentos inesperados

---

**Desenvolvido com ❤️ e auxílio de IA**
