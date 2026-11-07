# Agent Instructions

## Project context

Build the VDAB educational quiz for sixth-grade pupils. Follow the supplied Figma designs and existing API. Prioritise a clear, child-friendly, responsive and accessible experience.

**Current scope:** the quiz flow only:

- Fetch the three questions and their answer options from the API.
- Allow the required single- or multiple-answer selections.
- Submit answers through **"Klaar!"** and show correct/incorrect feedback.
- Let the player continue to the next question.
- Implement the required interaction states and subtle animations.

The left-panel buttons, copy action, progress meter and "Geef me een tip" behaviour are visual-only. A working countdown timer is optional; only add it if time permits.

## Stack and architecture

Use the existing project setup and conventions:

- Node.js 24, Next.js 16, React and TypeScript.
- pnpm and Tailwind CSS.
- ESLint, Prettier, Playwright and the existing GitHub Actions pipeline.

Keep the architecture feature-based, inspired by Bulletproof React, with Atomic Design for shared UI:

- `app/`: Next.js routes, layouts and page composition. Keep business logic out of route components.
- `features/quiz/`: quiz-specific components, API operations, types, state and business logic.
- `components/`: genuinely shared, domain-independent UI components, organised by Atomic Design where useful.
- `api/`, `hooks/` and `utils/`: add shared modules only when more than one feature needs them.
- `libs/`: third-party library configuration.
- `tests/e2e/`: Playwright end-to-end tests.

**Component placement and reusability:**

- Create reusable, generic components whenever appropriate, especially when they are independent of a specific feature or business domain.
- Place domain-independent components in `components/`, following Atomic Design where useful.
- Keep feature-specific components inside their respective feature.
- A component does not need to be used by multiple features to belong in the shared components directory. If it is inherently generic and independent of a feature, it can be shared from the start.
- Avoid coupling generic components to feature-specific types, data or business logic.
- Prefer configurable props and composition over duplicating similar UI components.
- Do not overengineer components or introduce abstractions without a concrete use case.

Keep code inside its feature while it is feature-specific. Move it to a shared location when there is a genuine shared use case or when the component is inherently generic. Do not create folders or abstractions just to fill out a structure.

**Dependency direction:** `app → features → shared components`. Features must not import other features directly. Shared code must not depend on feature or route code. Keep imports within a feature behind its public interface when one exists. Avoid circular dependencies.

## Implementation principles

- **KISS and YAGNI:** implement the simplest solution that meets the requirements. Do not build infrastructure for hypothetical future needs.
- **Single Responsibility:** keep components and functions focused. Separate UI, data access, state management and business rules when that improves clarity or testability.
- **DRY, with judgement:** remove meaningful duplication, but do not create generic abstractions for small or coincidental similarities.
- **Separation of concerns:** keep rendering separate from quiz evaluation and API communication.
- **Explicit contracts:** use clear TypeScript types for API data, component props and function inputs/outputs. Avoid `any`; validate untrusted API data at runtime where appropriate.
- **Readable code:** prefer clear names and straightforward control flow over clever or overly compact implementations.
- **Immutability:** avoid mutating React state or shared data.
- **Accessibility:** use semantic HTML, keyboard-accessible interactions, visible focus states, appropriate labels and sufficient contrast. Follow relevant WCAG requirements.
- **Responsive design:** match the supplied designs while ensuring the quiz works on different screen sizes.
- **Privacy and security:** never expose correct answers, secrets or server-only logic to the browser. Fetch and validate sensitive answer data on the server; send the client only the data it needs and return only the validation result. Do not log personal or sensitive data.

## Design patterns

Use patterns only when they solve an actual problem; do not introduce them by default.

- Prefer **composition** for building flexible React components.
- Use **Strategy** when multiple quiz or challenge types need different interchangeable behaviour.
- Use a **Factory** or **Registry** when creating/selecting multiple challenge implementations dynamically.
- Use an **Adapter** when translating an external API response into a stable internal model.
- Keep simple logic as simple functions; a pattern is not required for a single implementation.

When introducing a pattern, keep it proportionate to the current scope and make the reason clear.

## Next.js and React

- Prefer Server Components by default. Add `'use client'` only where browser APIs, event handlers, or client-side state are required.
- Keep server-only data and operations on the server. Never pass correct answers to client components.
- Keep client state minimal and derive values where possible instead of storing duplicate state.
- Avoid unnecessary effects, providers and global state. Use local state for local UI behaviour.
- Use the existing data-fetching approach consistently. Do not add a library or dependency without a concrete need.

## Quality and testing

Before considering work complete:

- Run the relevant TypeScript, ESLint, formatting checks.
- Add or update tests for changed behaviour.
- Use Playwright to cover important user flows, especially loading the quiz, selecting answers, submitting them, displaying feedback and moving to the next question.
- Cover loading, error and empty states where relevant.
- Verify keyboard interaction, responsive layout and accessible semantics.
- Ensure the production build succeeds.

Follow the existing scripts and configuration; do not silently weaken checks to make them pass.

## Working rules

1. Inspect the existing code, project conventions, API contract and relevant Figma design before making changes.
2. Make the smallest coherent change that fulfils the requirement.
3. Reuse existing components and dependencies when appropriate.
4. Do not invent API fields, behaviour or design requirements. If something is unclear, inspect the project first and ask only when the ambiguity blocks implementation.
5. Keep documentation and tests aligned with the implemented behaviour.
6. Do not expand beyond the defined scope unless explicitly requested.
