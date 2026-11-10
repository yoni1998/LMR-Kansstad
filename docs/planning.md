## Developmentplanning en tijdsinschatting

Voor de ontwikkeling wordt per taak een tijdsinschatting gemaakt op basis van drie scenario's:

- **Optimistisch:** wanneer alles vlot verloopt.
- **Realistisch:** de meest waarschijnlijke tijdsinschatting.
- **Pessimistisch:** wanneer onverwachte problemen of extra complexiteit optreden.

## Inschatting en doorlooptijd

Onderstaande tabel geeft een inschatting van de benodigde ontwikkelingstijd per fase en taak. Er wordt gewerkt met drie scenario's: optimistisch, realistisch en pessimistisch.

De inschattingen zijn uitgedrukt in werkdagen, waarbij één werkdag overeenkomt met acht uur.

| Fase                       | Taak                                                    |           Optimistisch |            Realistisch |          Pessimistisch |
| -------------------------- | ------------------------------------------------------- | ---------------------: | ---------------------: | ---------------------: |
| **Projectopzet**           | Project setup (dependencies, configuratie en structuur) |                 30 min |                  1 uur |                1,5 uur |
|                            | Design tokens                                           |                 15 min |                 30 min |                 45 min |
|                            | Code quality (ESLint, Prettier, TypeScript, ...)        |                 30 min |                  1 uur |                1,5 uur |
| **Component development**  | 18 herbruikbare componenten                             |                3 dagen |                4 dagen |                5 dagen |
| **Applicatieontwikkeling** | 10 unieke schermen opbouwen op basis van Figma          |                3 dagen |                5 dagen |                7 dagen |
|                            | Gebruikersflows en interacties                          |                  1 dag |              1,5 dagen |              2,5 dagen |
|                            | API-integraties                                         |                0,5 dag |                  1 dag |                2 dagen |
|                            | State management                                        |                0,5 dag |                  1 dag |                2 dagen |
|                            | Error handling en edge cases                            |                0,5 dag |                  1 dag |                2 dagen |
| **UI & UX**                | Responsive design                                       |                  1 dag |                2 dagen |              2,5 dagen |
|                            | Toegankelijkheid (WCAG)                                 |                  1 dag |              1,5 dagen |                2 dagen |
|                            | Animaties en overgangen                                 |                0,5 dag |                  1 dag |              1,5 dagen |
| **Testing & oplevering**   | Unit- en integration tests                              |                0,5 dag |                  1 dag |              1,5 dagen |
|                            | End-to-endtests (Playwright)                            |                0,5 dag |                  1 dag |                  1 dag |
|                            | Cross-browser testing                                   |                0,5 dag |                  1 dag |                  1 dag |
|                            | Bugs oplossen en finale validatie                       |                0,5 dag |                  1 dag |                2 dagen |
|                            | Documentatie                                            |                0,5 dag |                  1 dag |              1,5 dagen |
|                            | CI/CD en deployment                                     |                0,5 dag |                  1 dag |              1,5 dagen |
| **Totaal**                 |                                                         | **113 uur (14 dagen)** | **195 uur (24 dagen)** | **284 uur (36 dagen)** |

De realistische inschatting bedraagt ongeveer 24 werkdagen, wat overeenkomt met ongeveer vijf werkweken.

De effectieve doorlooptijd is afhankelijk van verschillende factoren:

- De complexiteit van de functionaliteiten.
- De kwaliteit, structuur en volledigheid van het API-contract, en in welke mate dit toelaat om quizvragen en verschillende vraagtypes dynamisch en herbruikbaar te renderen, in plaats van elk scherm afzonderlijk op te bouwen.
- Eventuele technische obstakels tijdens de ontwikkeling.

_De tijdsinschattingen zijn gebaseerd op werkdagen van 8 uur en omvatten de effectieve ontwikkelingstijd. In de praktijk moet daarnaast rekening worden gehouden met projectgerelateerde overhead, zoals meetings, code reviews en feedbackverwerking. Hiervoor kan doorgaans een bijkomende 10 à 15% worden voorzien. Vakantie, feestdagen en eventuele afwezigheden komen daar nog bovenop en moeten afzonderlijk worden meegenomen in de kalenderplanning._

**Opmerking:** Responsive design, toegankelijkheid en codekwaliteit worden niet uitsluitend op het einde aangepakt, maar meegenomen tijdens de volledige ontwikkeling.
