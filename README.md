# Setup
1. `npm install`
2. `npm run build`
3. `.env.sample` nach `.env` kopieren und ausfüllen
4. `node dist/index.js`

## Watch-Version
Terminal 1: `tsc -w`

Terminal 2: `node dist/index.js` nach Änderung neu starten, bzw nodemon benutzen

## Docker
### Environment
`npm run docker:dev` startet eine Entwicklungsversion mit MongoDB auf :27017 und Mongo-Express auf :8089. 
`npm run docker` startet das Projekt als Produktiv-Docker Deployment