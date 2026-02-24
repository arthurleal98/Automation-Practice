# Automa��o de Testes - Automation Exercise

Este framework de testes surgiu como um exemplo pr�tico de automa��o usando **Playwright** + **TypeScript**.
Ele cobre tanto testes de interface (E2E) quanto de API, e foi organizado para ser did�tico
 e adapt�vel a novos cen�rios.

## ?? Padr�es e Arquitetura

O c�digo segue um padr�o **Page Object Model (POM)** combinado com uma camada de servi�os
para chamadas de API. Isso garante:

- Separa��o clara entre l�gica de navega��o/a��o e as valida��es.
- **Fixtures personalizadas** (em `src/fixtures/test.fixture.ts`) para inje��o de p�ginas
  e reutiliza��o de inst�ncias dentro dos testes.
- **Tipos TypeScript fortes** definidos em `src/types/api.ts` para maior previsibilidade
  durante o desenvolvimento.
- **Utilit�rios comuns** (`utils/DataUtils`, `utils/JsonUtils`) para gera��o de dados e
  persist�ncia tempor�ria entre testes.

### Design Decisions

1. **Localizadores centralizados**: as classes de p�gina exp�em strings de seletor que
   podem ser usadas nos testes via fixtures.
2. **M�todos bilingues**: a base do projeto usa nomes em portugu�s, mas adiciona aliases
   em ingl�s para facilitar leitura em times internacionais.
3. **API services** encapsulam detalhes do protocolo (`form`, `params`) e retornam
   objetos `APIResponse` gen�ricos.

## ?? Ferramentas e Depend�ncias

- **Playwright** v1.58+ com suporte a TypeScript.
- **Node.js** (vers�o LTS recomendada).
- Tipos Node.js e configura��es de compilador via `tsconfig.json`.

## ??? Estrutura do Projeto

- `src/pages` � Page Objects (objetos de p�gina).
- `src/services` � Servi�os de API.
- `src/fixtures` � Fixtures customizadas para testes Playwright.
- `tests/e2e` � Testes de ponta a ponta de UI.
- `tests/api` � Testes de API.
- `utils` � Utilit�rios gerais como geradores de dados e manipula��o de JSON.
- `src/types` � Defini��es de tipos/interfaces compartilhadas.

## ?? Pr�-requisitos

Certifique-se de ter o **Node.js** instalado em sua m�quina.

## ?? Instala��o

1. Clone o reposit�rio:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Instale as depend�ncias do projeto:
   ```bash
   npm install
   ```

3. Instale os navegadores do Playwright:
   ```bash
   npx playwright install
   ```

## ?? Executando os Testes

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

### Rodar em modo debug (com interface gr�fica)
```bash
npx playwright test --ui
```

### Visualizar o relat�rio HTML
```bash
npx playwright show-report
```

## ?? Boas Pr�ticas Adotadas

- Uso intensivo de async/await e espera expl�cita via `expect(locator).toBeVisible`.
- Reuso de dados gerados entre fluxos (ex: cadastro -> login) mediante `JsonUtils`.
- Testes isolados que criam e limpam seus pr�prios dados.- Quando um fluxo depende de outro (cadastro seguido de exclusão), usamos `test.describe.serial` para garantir execução sequencial em vez de concorrente.
## ?? Roadmap e Melhorias Futuras

Estamos constantemente evoluindo o framework. Abaixo est�o os pontos de melhoria mapeados e funcionalidades que ser�o implementadas em breve:

### ?? BDD com Cucumber (Gherkin)
- Implementa��o do **Cucumber** para permitir a escrita de cen�rios de teste em linguagem natural (Gherkin).
- Objetivo: Melhorar a comunica��o entre QA, Desenvolvedores e Stakeholders.

### ?? Cobertura de Testes
- Adi��o de novos casos de teste para cobrir fluxos alternativos e de exce��o.
- Refinamento dos testes existentes para maior robustez.

### ?? Testes Mobile
- **Em breve:** Disponibiliza��o de testes automatizados focados em emula��o de dispositivos m�veis e responsividade.
- Valida��o da experi�ncia do usu�rio em telas menores (Android/iOS via emula��o do Playwright).

## ?? Notas Adicionais

- O projeto utiliza um utilit�rio (`JsonUtils`) para persistir dados de massa de teste gerados dinamicamente, permitindo o compartilhamento de dados entre testes de cria��o e exclus�o de conta.

