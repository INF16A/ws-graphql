# Setup
1. `npm install`
2. `npm run build`
3. `.env.sample` nach `.env` kopieren und ausfüllen
4. `npm run start`

## Watch-Version
Terminal 1: `tsc -w`

Terminal 2: `node dist/index.js` nach Änderung neu starten, bzw nodemon benutzen

## Docker
### Environment
`npm run docker:dev` startet eine Entwicklungsversion mit MongoDB auf :27017 und Mongo-Express auf :8089. 
`npm run docker` startet das Projekt als Produktiv-Docker Deployment

# Development
## Issues
Aufgaben werden als Issues abgelegt und dort verwaltet. Issues sind auf dem Level User-Storys oder Technical Requirement zu erstellen.
Innerhalb eines Issues kann eine Task-List angelegt werden, mit dem feinere Aufgaben getrackt werden können.

Issues werden als Tasks auf dem Projektboard abgelegt.

## Branching
Pro Issue ist ein Branch zu erstellen. Namenskonvention: `feature/[Kurzname]#[Issue-Nr]`, z.B. `feature/registration#1`

So kann ein Branch einfach zu einem Issue zugeordnet werden.

Der `master` Branch ist beschreibbar. Es ist kein Review notwendig um zu mergen, das kann entweder per Pull-Request oder per lokalem merge passieren.
Ein merge auf Master bedeutet, dass die User Story bzw. das Feature komplett ist.

Änderungen am `master`-Branch sollen per Rebase in den lokalen Branch integriert werden um unnötige Merge Commits zu vermeiden und die master History sauber zu halten.
