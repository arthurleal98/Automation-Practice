# Automação de Testes - Automation Exercise

Este projeto consiste em uma suíte de testes automatizados (E2E e API) desenvolvida com **Playwright** e **TypeScript**, focada na validação das funcionalidades do site Automation Exercise.

## 🚀 Tecnologias Utilizadas

- Playwright - Framework de testes.
- TypeScript - Linguagem de programação.
- Node.js - Ambiente de execução.

## 📂 Estrutura do Projeto

O projeto segue o padrão **Page Object Model (POM)** e separa as responsabilidades de testes de interface e API.

- `src/pages`: Classes que representam as páginas da aplicação (Page Objects).
- `src/services`: Classes de serviço para abstração de chamadas de API.
- `src/fixtures`: Fixtures customizadas do Playwright para injeção de dependências.
- `utils`: Utilitários gerais (ex: manipulação de arquivos JSON).
- `tests/e2e`: Testes de ponta a ponta (Interface de Usuário).
- `tests/api`: Testes de integração de API.

## ⚙️ Pré-requisitos

Certifique-se de ter o **Node.js** instalado em sua máquina.

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Instale os navegadores do Playwright:
   ```bash
   npx playwright install
   ```

## ▶️ Executando os Testes

### Rodar todos os testes
```bash
npx playwright test
```

### Rodar apenas testes de API
```bash
npx playwright test tests/api
```

### Rodar apenas testes E2E (Interface)
```bash
npx playwright test tests/e2e
```

### Rodar em modo debug (com interface gráfica)
```bash
npx playwright test --ui
```

### Visualizar o relatório HTML
```bash
npx playwright show-report
```

## 🔮 Roadmap e Melhorias Futuras

Estamos constantemente evoluindo o framework. Abaixo estão os pontos de melhoria mapeados e funcionalidades que serão implementadas em breve:

### 🥒 BDD com Cucumber (Gherkin)
- Implementação do **Cucumber** para permitir a escrita de cenários de teste em linguagem natural (Gherkin).
- Objetivo: Melhorar a comunicação entre QA, Desenvolvedores e Stakeholders.

### 📈 Cobertura de Testes
- Adição de novos casos de teste para cobrir fluxos alternativos e de exceção.
- Refinamento dos testes existentes para maior robustez.

### 📱 Testes Mobile
- **Em breve:** Disponibilização de testes automatizados focados em emulação de dispositivos móveis e responsividade.
- Validação da experiência do usuário em telas menores (Android/iOS via emulação do Playwright).

## 📝 Notas Adicionais

- O projeto utiliza um utilitário (`JsonUtils`) para persistir dados de massa de teste gerados dinamicamente, permitindo o compartilhamento de dados entre testes de criação e exclusão de conta.
