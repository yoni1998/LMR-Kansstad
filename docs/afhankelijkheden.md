## Afhankelijkheden

- **Figma-designs en design tokens:** Beschikbaarheid van de UI voor de happy flow, loading states, foutmeldingen en lege resultaten. Daarnaast moeten de design tokens voor onder andere kleuren en typografie (fonts, font sizes en font weights) beschikbaar zijn.
- **API-contract:** beschikbare endpoints, request- en responsemodellen en foutafhandeling.
- **Requirements:** de verwachte functionaliteit (must haves, should haves, nice to haves), business rules en acceptatiecriteria.
- **Responsive design:** afspraken over de layout op mobiel, tablet en desktop.
- **Technische afspraken:** gebruikte technologieën, projectstructuur en afspraken rond codekwaliteit.

## Blockers

- **Ontbrekende Figma-designs:** er is onduidelijkheid over de gewenste UI.
- **Ontbrekend API-contract:** het is onduidelijk hoe de data wordt opgehaald en verwerkt. Leg het contract vast of werk tijdelijk met mocks.
- **Onduidelijke requirements:** functionaliteit kan verkeerd worden geïmplementeerd. Stem de verwachtingen af met de product owner en klant.
- **Niet-beschikbare backend:** testen met echte data is niet mogelijk. Gebruik mockdata tot de API beschikbaar is.
- **Ontbrekende testdata of toegangsrechten:** bepaalde functionaliteiten kunnen niet getest worden. Vraag toegang en testdata tijdig aan.

## Risico's

- **Wijzigende requirements:** wijzigingen tijdens de ontwikkeling kunnen extra werk en vertraging veroorzaken. Stem de scope en acceptatiecriteria vooraf af.
- **Afwijkende API-responses:** wanneer de API afwijkt van het contract, kunnen er integratieproblemen ontstaan. Controleer het contract en voorzie integratietests.
- **Vergeten edge cases:** ontbrekende foutafhandeling kan leiden tot een slechte gebruikerservaring. Werk loading states, lege resultaten en foutscenario's expliciet uit.
- **Te late responsive testing:** wanneer layouts pas op het einde worden getest, kunnen extra aanpassingen nodig zijn. Test regelmatig op verschillende schermgroottes.
- **Overengineering:** een te complexe architectuur zorgt voor onnodig onderhoud en vertraagt de ontwikkeling. Stem de architectuur af op de scope van het project.
- **Onvoldoende testdekking:** wijzigingen kunnen bestaande functionaliteit breken. Test de belangrijkste gebruikersflows en foutscenario's.
- **Onduidelijke prioriteiten:** minder belangrijke features kunnen te veel tijd innemen. Implementeer eerst de must-haves en breid daarna verder uit.
- **Gebruikers werken op trage of oude toestellen:** scholen werken vaak met oudere laptops, tablets en trage verbindingen. Zware animaties of grote bestanden kunnen het spel onbruikbaar maken. Test de webapplicatie op verschillende browsers en browserversies, houd animaties speels maar eenvoudig en beperk de grootte van afbeeldingen en bundels.

## Vragen voor het team

Deze vragen hebben betrekking rond het design van de hele applicatie.

- **Tegelspel:** hoe werkt het tegelspel precies, en wat gebeurt er als de speler verkeerde tegels aanduidt (reset, tijdverlies of een foutmelding)?
- **Afgelopen timer:** wat gebeurt er als de globale timer links bovenaan afloopt (game over, doorgaan of het resultaat tonen)?
- **Backend-data:** welke data komt van de backend (levels, beroepen, voortgang, resultaten), en kan de applicatie dynamisch uit data worden opgebouwd, zodat levels niet handmatig aangemaakt moeten worden?
- **Voortgang bewaren:** wordt de voortgang bewaard, en is er een account of wordt er anoniem gespeeld?
- **Pagina verversen:** wat gebeurt er als de speler midden in een sessie ververst (verder spelen, het level herstarten of opnieuw beginnen)?
- **Foute antwoorden:** wat moet er gebeuren als de user alleen maar foute antwoorden geeft. De design laat alleen maar de happy flow zien?
- **Mobile:** is mobile in scope? De componenten hebben mobile-varianten, maar de schermen ontbreken.
- **Moeilijkheidsniveaus:** wat is het verschil tussen Light, Casual en Expert (andere levels, minder tijd of minder hints)?
- **Hints:** hoe werkt "Geef me een tip", en kost een tip tijd of punten?
- **Knoppen in het linkerpaneel:** wat doen de knoppen voor hulp, herstarten en muziek precies, en reset herstarten het level of het hele spel?
- **Route naar het einddiploma:** hoe komt een speler op het einddiploma, en kan dat pas na alle beroepen?
- **Scoreberekening:** hoe worden de talentpercentages en de "All-star"-score berekend?
- **Browsers en toestellen:** welke browsers en toestellen moeten ondersteund worden, zeker gezien de oudere toestellen op scholen?
- **Analytics en meertaligheid:** is er analytics nodig, en moet het spel in meerdere talen (NL/FR) bestaan?
