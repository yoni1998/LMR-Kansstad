# Plan van aanpak – LMR technische test

VDAB wil een webapplicatie laten ontwikkelen waarmee leerlingen van het zesde leerjaar op een speelse manier kennismaken met de arbeidsmarkt en nadenken over hun toekomstige studiekeuze.

De applicatie is opgevat als een educatief spel waarin kinderen ontdekken wat verschillende beroepen inhouden en welke factoren daarbij een rol spelen, zoals vaardigheden, interesses en werkomstandigheden. Op die manier krijgen ze een beter inzicht in de mogelijkheden op de arbeidsmarkt en worden ze gestimuleerd om later een bewustere studiekeuze te maken.

---

## 🎯 Doelstellingen

Het doel is een kindvriendelijke, toegankelijke en gebruiksvriendelijke webapplicatie te ontwikkelen die aansluit op de bestaande API en waarin alle voorziene functionaliteiten correct werken.

De applicatie moet een duidelijke en intuïtieve gebruikersflow bieden, zodat kinderen zelfstandig en zonder verwarring door de verschillende onderdelen kunnen navigeren.

- **Aantrekkelijk en kindvriendelijk:** een speelse vormgeving afgestemd op leerlingen van het zesde leerjaar, met een herkenbaar personage, levendige kleuren, grote knoppen, beknopte teksten en directe, positieve feedback.
- **Gebruiksvriendelijk:** een intuïtieve applicatie die zonder bijkomende uitleg te gebruiken is. Interacties en statussen (geselecteerd, juist, fout en uitgeschakeld) zijn duidelijk herkenbaar.
- **Toegankelijk:** naleving van de toegankelijkheidsrichtlijnen WCAG 2.2 niveau AA, met aandacht voor toetsenbordbediening, voldoende kleurcontrast en ondersteuning van `prefers-reduced-motion`.
- **Privacy en GDPR:** er worden geen gebruikersaccounts, tracking of cookies gebruikt. Enkel de spelvoortgang wordt tijdelijk opgeslagen in `sessionStorage` en blijft beperkt tot de browsersessie.
- **Functioneel correct:** alle voorziene functionaliteiten worden volgens de functionele vereisten geïmplementeerd en werken zoals verwacht, inclusief foutafhandeling en het correct afhandelen van edge cases.
- **Consistent en responsive:** herbruikbare componenten en uniforme interactiepatronen doorheen alle levels, met een optimale gebruikerservaring op zowel mobiele apparaten als desktops.
- **Performant:** de applicatie laadt snel en reageert vlot, ook op oudere schoolklassen-tablets en traag wifi.

## 🧱 Stack

| Technologie         | Motivatie                                                                                                                                                                                                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Node 24**         | LTS-versie. De versie staat vast in `.nvmrc` en in de CI, zodat lokaal en in de CI dezelfde versie wordt gebruikt.                                                                                                                                                                                                     |
| **Next.js 16**      | De externe API geeft vragen en juiste antwoorden samen terug via één GET-request. Rechtstreeks ophalen vanuit de browser zou de juiste antwoorden zichtbaar maken in de Network-tab. Next.js laat toe de vragen server-side op te halen, de juiste antwoorden te verwijderen en de selectie op de server te valideren. |
| **TypeScript**      | Typeveiligheid, veilige refactors en types als contract tussen componenten en API.                                                                                                                                                                                                                                     |
| **Zod**             | Valideert request-bodies en de structuur van externe API-responsen. Types worden afgeleid uit de schema's.                                                                                                                                                                                                             |
| **Zustand**         | Beheert de spelvoortgang (huidige vraag, score en deadline), bewaard in `sessionStorage`.                                                                                                                                                                                                                              |
| **pnpm**            | Efficiënt schijfgebruik, snelle installaties en strikte dependency-resolutie.                                                                                                                                                                                                                                          |
| **Tailwind CSS v4** | Styling dicht bij de component, met consistente design tokens.                                                                                                                                                                                                                                                         |

## ✅ Codekwaliteit en CI/CD

Om de codekwaliteit te bewaken en fouten vroegtijdig op te sporen, gebruik ik de volgende tools en afspraken:

- **ESLint:** vangt fouten op en bewaakt architectuurregels:
  - Geen circulaire imports (`import/no-cycle`).
  - Features importeren niets uit `app/`.
  - Gedeelde modules importeren niets uit `features/`.
  - Features importeren elkaar niet (`import/no-restricted-paths`).
- **Prettier:** zorgt voor uniforme codeformattering.
- **Playwright:** test de meest cruciale gebruikersflows in een echte browser.
- **Lighthouse:** analyseert performance, accessibility, best practices en SEO.
- **React profiler::** analyseert componentrenders en helpt onnodige re-renders opsporen.
- **Husky:** voert linting en Prettier uit bij een commit en de typecontrole bij een push. Uitgebreidere tests draaien in de CI.
- **Dependabot:** meldt dependency-updates en beveiligingsproblemen via pull requests.
- **GitHub Actions:** voert bij elke push en pull request de volgende controles uit:
  1. Installatie op basis van het lockbestand.
  2. Linting.
  3. Typecheck.
  4. E2E-tests.
  5. Build.

Een wijziging is pas klaar wanneer alle controles succesvol zijn uitgevoerd.

## 🗂️ Structuur

Ik hanteer een feature-based architectuur, geïnspireerd op [Bulletproof React](https://github.com/alan2207/bulletproof-react), waarbij functionaliteiten per feature worden georganiseerd en gedeelde, generieke UI-componenten in een aparte `components`-folder worden ondergebracht.
Een onderdeel blijft binnen zijn feature zolang alleen die feature het gebruikt. Pas wanneer een tweede feature het nodig heeft, verhuist het naar `src/`.

Afhankelijkheden lopen in één richting:

`app → features → components`

### Huidige situatie: de technische test (één feature)

```text
project/
├── src/
│   ├── app/                           # Next.js routing, layouts en pagina's
│   │   ├── layout.tsx                 # Globale layout, fonts en providers
│   │   └── page.tsx                   # Startpagina, haalt quizgegevens server-side op
│   │
│   ├── features/
│   │   └── quiz/                      # Functionaliteit specifiek voor de quiz
│   │       ├── api/                   # API-communicatie (getQuiz.api.ts)
│   │       ├── components/            # Quizspecifieke UI-componenten
│   │       │   └── side-panel/        # Componenten van het quiz-zijpaneel
│   │       ├── hooks/                 # Custom hooks voor quizspecifieke logica
│   │       └── model/                 # Types, Zod-schema's, helpers en Zustand-store
│   │
│   ├── components/                    # Generieke, herbruikbare UI-componenten
│   └── assets/                        # Statische bestanden zoals afbeeldingen en iconen
│
├── tests/                              # Geautomatiseerde tests (Playwright E2E)
└── package.json
```

De mappen `api/`, `hooks/` en `utils/` op `src/`-niveau worden toegevoegd zodra meerdere features dezelfde functionaliteit nodig hebben.

### Toekomstige situatie: het volledige spel

Het spel kan groeien naar meerdere domeinen, zoals de wereldkaart, spelsessies, uitdagingen en resultaten.

Het zijpaneel verhuist dan naar `game-session`, omdat meerdere uitdagingen er gebruik van maken.

Wanneer een feature te groot wordt, splits ik die op in verticale slices. Zo kan `challenges` bijvoorbeeld worden opgesplitst in `core`, `multiple-choice`, `tile-match` en `phone-call`, elk met eigen componenten, logica en hooks.

```text
project/
├── src/
│   ├── app/                              # Next.js routing, layouts en pagina's
│   │
│   ├── features/                         # Functionaliteiten georganiseerd per feature
│   │   ├── onboarding/                   # Componenten, hooks en logica voor onboarding
│   │   ├── world-map/                    # Wereldkaart en bijhorende functionaliteit
│   │   ├── game-session/                 # Spelsessie: components, hooks, API, store en helpers
│   │   ├── challenges/                   # Verschillende soorten speluitdagingen
│   │   │   ├── core/                     # Gemeenschappelijke contracten en schema's
│   │   │   ├── multiple-choice/          # Meerkeuzevragen
│   │   │   ├── tile-match/               # Tegels combineren
│   │   │   └── phone-call/               # Telefoongesprekken als speluitdaging
│   │   ├── results/                      # Resultaten en scoreverwerking
│   │
│   ├── components/                       # Generieke UI-componenten (atoms en molecules)
│   ├── api/                              # Gedeelde API-configuratie en infrastructuur
│   ├── hooks/                            # Generieke, gedeelde custom hooks
│   ├── utils/                            # Algemene hulpfuncties
│   └── libs/                             # Configuratie en initialisatie van externe libraries
│
├── tests/                                # Geautomatiseerde tests (Playwright E2E)
└── package.json
```

## 🔌 Data-driven

De opdracht bevat momenteel drie vragen, maar de applicatie moet kunnen uitbreiden naar meerdere levels, beroepen en speltypes. Daarom wordt de inhoud als data gedefinieerd en weergegeven door een generieke UI. Zo vereist een nieuw level of beroep geen aanpassingen aan de UI-code.

Correcte antwoorden blijven uitsluitend op de server en worden daar gevalideerd. Ze worden uit de data gefilterd voordat vragen naar de client gaan. Pas na het indienen van een antwoord geeft de API terug of het correct was.

- **Nieuw level of beroep:** enkel data toevoegen.
- **Nieuw speltype:** één nieuwe component ontwikkelen, waarna onbeperkt levels via data kunnen worden toegevoegd.

## 🛠️ Aanpak en methodiek

### Gebruik van AI tijdens de ontwikkeling

Tijdens het ontwikkelproces wordt actief gebruikgemaakt van AI als ondersteunende tool om de efficiëntie en kwaliteit van de ontwikkeling te verhogen.

AI wordt onder andere ingezet voor:

- **Herbruikbare componenten:** ondersteunen bij het ontwikkelen en optimaliseren van generieke componenten.
- **Layouts:** opzetten en uitwerken van layouts op basis van de aangeleverde designs.
- **Functionaliteit en flows:** ondersteunen bij het implementeren van functionaliteiten en het uitwerken van de gebruikersflows.
- **Toegankelijkheid:** verbeteren van de toegankelijkheid door onder andere semantische HTML, ARIA-attributen en andere accessibility best practices toe te passen.

AI dient hierbij als hulpmiddel tijdens de ontwikkeling. De gegenereerde code en suggesties worden steeds geëvalueerd, getest en waar nodig aangepast.

### Fases en resultaten

| Fase                              | Resultaat                                                                                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Project setup**              | Een werkend Next.js-project met pnpm, TypeScript, ESLint (inclusief architectuurregels), Prettier, Husky en een eerste CI-pipeline.            |
| **2. Design tokens**              | Kleuren, typografie en spacing uit Figma beschikbaar als Tailwind-tokens.                                                                      |
| **3. Herbruikbare componenten**   | Een set componenten (Button, Surface, OptionButton, CountdownTimer, ...) met alle voorziene staten.                                            |
| **4. Schermen en API-integratie** | Quizscherm en zijpaneel volgens Figma, gekoppeld aan de API via route handlers, mapping en Zod-schema's, met loading-, error- en empty states. |
| **5. Quizflow**                   | Een volledig doorloopbare quiz met persistente voortgang, navigatie tussen levels, score en eindscherm.                                        |
| **6. Responsive design**          | Quizscherm en zijpaneel werken correct op mobiel, tablet en desktop.                                                                           |
| **7. Accessibility**              | De quiz is volledig bedienbaar met het toetsenbord, met correct focusbeheer in de modal, ARIA-labels en voldoende contrast.                    |
| **8. Animaties**                  | Vloeiende overgangen volgens Figma.                                                                                                            |
| **9. Testing**                    | E2E-tests die de volledige quizflow afdekken in meerdere browsers en slagen in de CI-pipeline.                                                 |

Bij de planning bouwen we eerst wat essentieel is voor een werkend product. De extra's komen pas daarna aan bod, zodat we die bij tijdsdruk kunnen schrappen zonder het eindresultaat in gevaar te brengen.

### Testaanpak

Testing gebeurt continu tijdens de ontwikkeling. De laatste fase bestaat uit een volledige validatie van de applicatie, inclusief regressie-, browser- en accessibilitytests.

| Onderdeel         | Hoe getest                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Functioneel**   | End-to-end tests met Playwright die de volledige quizflow doorlopen: antwoorden selecteren, valideren, levelovergang, score en eindscherm.                                |
| **Browsers**      | De Playwright-tests worden uitgevoerd in Chromium (Chrome en Edge), Firefox en WebKit (Safari), zowel op desktop als mobiel, om de browsercompatibiliteit te controleren. |
| **Responsive**    | Handmatig met de devtools op verschillende schermgroottes.                                                                                                                |
| **Accessibility** | Handmatig met een screenreader en toetsenbordnavigatie, en met Axe DevTools en WAVE om problemen met ARIA en contrast op te sporen.                                       |
| **CI**            | De Playwright-tests draaien automatisch in de pipeline bij elke pull request, zodat regressies snel zichtbaar worden.                                                     |

### Individuele werkwijze: Kanban

Individueel werk ik met een Kanban-bord met drie kolommen:

- To Do
- In Progress
- Done

De fases worden opgesplitst in kleine tickets. Ik beperk het aantal gelijktijdige taken in uitvoering tot maximaal twee, zodat ik voldoende focus behoud.

### Teamwerkwijze: Agile (Scrum)

In een team zou ik werken met Scrum in sprints van twee weken.

- **Sprint planning:** het team selecteert de tickets voor de sprint. Elk ticket bevat acceptatiecriteria en een inschatting.
- **Dagelijkse stand-up:** maximaal 15 minuten om de voortgang te bespreken en blokkades snel te identificeren.
- **Wekelijkse opvolging:** halverwege de sprint bekijken we de voortgang en sturen we bij. Zo worden problemen na een week zichtbaar in plaats van pas aan het einde van de sprint.
- **Sprint review en retrospective:** een demo aan stakeholders (bijvoorbeeld VDAB) en een bespreking van wat beter kan.
- **Backlog refinement:** tickets voor de volgende sprint worden voorbereid voordat die begint.

Het Scrum-bord krijgt extra kolommen zoals `In Review`, `blocked` en `Testing`.

## 🗓️ Planning

[planning](./planning.md)

## ⚠️ Afhankelijkheden en risico's

[afhankelijkheden](./afhankelijkheden.md)
