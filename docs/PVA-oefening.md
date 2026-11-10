# Plan van aanpak – LMR technische test

Opdracht: de quizcomponent van een educatief VDAB-spel voor het zesde leerjaar. Drie meerkeuzevragen uit de API met feedback per antwoord. De schermen, inclusief zijpaneel, zijn visueel volledig uitgewerkt.

---

## 🎯 Doel en scope

- **Kindvriendelijk en intuïtief:** speelse vormgeving volgens Figma, grote knoppen, korte teksten, duidelijke staten (geselecteerd, juist, fout, uitgeschakeld).
- **Toegankelijk:** WCAG 2.2 AA, toetsenbordbediening, goed contrast, `prefers-reduced-motion`.
- **Privacyvriendelijk:** geen accounts, tracking of cookies. Voortgang enkel in `sessionStorage`.
- **Responsive** op mobiel en desktop, met herbruikbare componenten.
- **Performant:** de applicatie laadt snel en reageert vlot, ook op oudere schoolklassen-tablets en traag wifi.
- **Buiten scope:** werkende knoppen, copy en progressmeter in het zijpaneel en de tipfunctie (enkel visueel). De aftelklok is een nice-to-have.
- **Functioneel correct:** alle voorziene functionaliteiten worden volgens de functionele vereisten geïmplementeerd en werken zoals verwacht.

---

## 🧱 Stack

| Technologie          | Waarom                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Next.js 16**       | De API geeft vragen en juiste antwoorden samen terug. Server-side ophalen laat toe de antwoorden te verwijderen en de selectie op de server te valideren, zodat ze niet in de Network-tab staan. |
| **TypeScript + Zod** | Typeveiligheid en validatie van de API-response, met types afgeleid uit de schema's.                                                                                                             |
| **Zustand**          | Spelvoortgang (vraag, score, deadline) in `sessionStorage`.                                                                                                                                      |
| **Tailwind CSS v4**  | Styling met design tokens uit Figma.                                                                                                                                                             |
| **pnpm, Node 24**    | Snelle installaties, vaste Node-versie via `.nvmrc`.                                                                                                                                             |

---

## ✅ Kwaliteit en CI

- **ESLint + Prettier**, met architectuurregels (geen circulaire imports, `features/` importeert niets uit `app/`).
- **Husky:** lint en Prettier bij commit, typecheck bij push.
- **Lighthouse:** analyseert performance, accessibility, best practices en SEO.
- **React profiler::** analyseert componentrenders en helpt onnodige re-renders opsporen.
- **GitHub Actions:** installatie, lint, typecheck, E2E, build.
- **README** met duidelijke installatie-instructies.

---

## 🗂️ Structuur

Feature-based, geïnspireerd op Bulletproof React. Afhankelijkheden lopen één richting: `app → features → components`.

```text
src/
├── app/                  # Routing, layout, startpagina (server-side data)
├── features/quiz/
│   ├── api/              # API-communicatie
│   ├── components/       # Quiz-UI en zijpaneel
│   ├── hooks/            # Quizlogica
│   └── model/            # Types, Zod-schema's, store
├── components/           # Generieke UI (Button, OptionButton, CountdownTimer, ...)
└── assets/
tests/                    # Playwright E2E
```

---

## 🚀 Fases

| #   | Fase               | Resultaat                                                                  |
| --- | ------------------ | -------------------------------------------------------------------------- |
| 1   | Project setup      | Next.js, linting, Husky, eerste CI                                         |
| 2   | Design tokens      | Kleuren, typografie en spacing uit Figma                                   |
| 3   | Componenten        | Button, OptionButton, Surface, CountdownTimer met alle staten              |
| 4   | Schermen           | Quiz en zijpaneel volgens Figma, met mockdata                              |
| 5   | API-integratie     | Server-side ophalen, antwoorden verwijderen, Zod, loading- en error-states |
| 6   | Quizflow           | Store, „klaar!”-validatie, volgende vraag, score en eindscherm             |
| 7   | Responsive         | Layout op alle schermgroottes                                              |
| 8   | Accessibility      | Toetsenbord, focus, ARIA, contrast                                         |
| 9   | Animaties en timer | Overgangen en aftelklok (nice-to-have)                                     |
| 10  | Testing            | E2E in Chromium, Firefox en WebKit, plus axe                               |

**Werkwijze:** Kanban (To Do, In Progress, Done), kleine tickets, maximaal twee taken tegelijk.
**AI:** hulpmiddel voor componenten, layouts en accessibility. Alle output wordt gelezen en getest.

---

## 🗓️ Planning

[planning](./planning.md)

---

## ⚠️ Afhankelijkheden en risico's

> Beperkt tot de quizcomponent uit de opdracht.

---

## 🔗 Afhankelijkheden

- **Figma-designs en design tokens:** schermen voor de happy flow, plus kleuren en typografie als tokens.
- **Fonts en iconen:** FlandersArtSans en FontAwesome Pro zijn gelicentieerd. Ik heb de bestanden of licenties nodig, of een goedgekeurd alternatief.
- **Assets:** personage en afbeeldingen uit Figma in exporteerbare vorm.
- **API-contract:** formaat van `quiz_data.json` en foutafhandeling.
- **Requirements:** wat is must-have en wat nice-to-have (de timer is nice-to-have).
- **Functioneel correct:** alle voorziene functionaliteiten worden volgens de functionele vereisten geïmplementeerd en werken zoals verwacht, inclusief foutafhandeling en het correct afhandelen van edge cases.

---

## 🚧 Blockers

| Blocker                                      | Aanpak                                                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Ontbrekende designs of assets**            | UI is onduidelijk. Vraag de bestanden aan en werk intussen met placeholders.                           |
| **API niet bereikbaar of afwijkend formaat** | Werk met mockdata tot de API werkt en valideer het formaat met Zod.                                    |
| **Onduidelijke requirements**                | Functionaliteit kan verkeerd uitgewerkt worden. Stem de verwachtingen vooraf af met de projectleiders. |

---

## ⚠️ Risico's

| Risico                                                       | Aanpak                                                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Vergeten edge cases** (laden, fout, geen antwoord gekozen) | Werk ze expliciet uit, ook al tonen de designs enkel de happy flow.                        |
| **Overengineering**                                          | Houd de architectuur klein en afgestemd op één quiz.                                       |
| **Onvoldoende testdekking**                                  | Test de belangrijkste flow en foutscenario's met Playwright.                               |
| **Te late responsive testing**                               | Test regelmatig op verschillende schermgroottes.                                           |
| **Trage of oude toestellen op school**                       | Houd animaties eenvoudig, beperk de grootte van afbeeldingen en test in meerdere browsers. |
| **Beperkte tijd**                                            | Eerst de must-haves. Timer en animaties komen als laatste.                                 |

---

## ❓ Vragen voor het team

- **Foute antwoorden:** wat toont de quiz als de speler enkel foute antwoorden geeft? De designs tonen alleen de happy flow.
- **Afgelopen timer:** wat gebeurt er als de aftelklok afloopt (doorgaan, resultaat tonen of opnieuw proberen)?
- **Pagina verversen:** moet de speler na een refresh verder kunnen waar hij was?
- **Mobile:** is mobile in scope? De componenten hebben mobile-varianten, maar de schermen ontbreken.
- **Browsers en toestellen:** welke browsers en toestellen moeten ondersteund worden?
