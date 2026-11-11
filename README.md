## 📚 Documentatie

|     | Document                                             | Inhoud                                                       |
| --- | ---------------------------------------------------- | ------------------------------------------------------------ |
| 📓  | [Logbook](docs/logbook.md)                           | Wat ik wanneer gedaan heb en waarom                          |
| 🛠️  | [PVA-project](docs/PVA-project.md)                   | PROJECT: Plan van aanpak: stack, structuur en werkwijze      |
| 🛠️  | [PVA-oefening](docs/PVA-oefening.md)                 | OEFENING: Plan van aanpak: stack, structuur en werkwijze     |
| 🚧  | [afhankelijkheden](docs/afhankelijkheden.md)         | Afhankelijkheden, blockers, risico's en vragen voor het team |
| 🗓️  | [Planning](docs/planning.md)                         | Fases en doorlooptijd                                        |

# Next.js + TypeScript

A scalable web application built with **Next.js**, **TypeScript**, **Tailwind CSS v4**, and **Node 24**.

## Getting Started

### Prerequisites

Install the following tools:

- [Node 24](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)

Check your installed versions:

```bash
node --version
pnpm --version
```

### Installation

Clone the repository, navigate to the project directory, and install the dependencies:

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the project root directory. This file is not included in the repository and must be created manually.

Add the following environment variable:

```env
BASE_URL=https://lab.lfwd.be/
```

### Start the Development Server

```bash
pnpm dev
```

Next.js starts the development server and displays the local URL in the terminal, usually `http://localhost:3000`.

### Production Build

```bash
pnpm build
```

This creates an optimized production build using Next.js. The generated build output is stored in `.next/`.

Start the production server locally:

```bash
pnpm start
```

Build the application before running the production server.

## Development Tools

### Code Quality and Validation

Run the available checks individually:

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `pnpm typecheck`    | Checks TypeScript types without emitting output. |
| `pnpm lint`         | Runs ESLint across the project.                  |
| `pnpm lint:fix`     | Automatically fixes supported ESLint issues.     |
| `pnpm format`       | Formats supported project files with Prettier.   |
| `pnpm format:check` | Checks formatting without modifying files.       |

Run all configured quality checks in sequence:

```bash
pnpm check
```

This runs type checking, linting and formatting validation.

### Bundle Analysis

Next.js supports bundle analysis through its built-in analyzer in compatible versions. Configure and run the analyzer according to the installed Next.js version when bundle inspection becomes necessary.

### End-to-End Testing with Playwright

Playwright tests application behavior through browser interactions, helping verify complete user flows.

Run the E2E test suite:

```bash
pnpm test:e2e
```

Launch the interactive Playwright UI:

```bash
pnpm test:e2e:ui
```

Generate tests by interacting with the application in a browser:

```bash
pnpm test:e2e:codegen
```

The code-generation script targets `http://localhost:3000`. Make sure the Next.js development server is running at that URL before starting code generation.

## Available Scripts

| Script                  | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| `pnpm dev`              | Starts the Next.js development server.           |
| `pnpm build`            | Creates an optimized production build.           |
| `pnpm start`            | Starts the production server.                    |
| `pnpm typecheck`        | Runs TypeScript checks without emitting files.   |
| `pnpm lint`             | Checks project code with ESLint.                 |
| `pnpm lint:fix`         | Fixes supported lint issues automatically.       |
| `pnpm format`           | Formats project files with Prettier.             |
| `pnpm format:check`     | Checks formatting without modifying files.       |
| `pnpm check`            | Runs all configured quality checks.              |
| `pnpm test:e2e`         | Runs Playwright E2E tests.                       |
| `pnpm test:e2e:ui`      | Opens the Playwright UI.                         |
| `pnpm test:e2e:codegen` | Opens Playwright Codegen for the configured URL. |
