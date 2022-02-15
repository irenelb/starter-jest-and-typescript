Tra gli sviluppatori l'argomento testing è ancora molto controverso, con questo articolo ci piacerebbe aiutare chi vorrebbe fare i primi passi nel mondo del **testing**.

All'inizio può risultare frustrante e non si sa mai da dove cominciare... ma grazie a questa breve guida faremo un piccolo passo avanti: vedremo come mettere in piedi da zero un progetto configurato per eseguire degli Unit Test con Jest e TypeScript.

### Table of Contents

- [Inizializzazione del Progetto](#inizializzazione-del-progetto)
- [Installazione e Configurazione di JEST con TypeScript](#installazione-e-configurazione-di-jest-con-typescript)
  - [Configurare TypeScript](#configurare-typescript)
  - [Configurare JEST](#configurare-jest)
- [Test d'esempio](#test-desempio)
- [A che serve Husky e come si usa?](#a-che-serve-husky-e-come-si-usa)
    - [Formattazione](#formattazione)
    - [Testing](#testing)
  

### Prerequisiti

* Aver installato Git
* Account GitLab/Github
* Code Editor (VSCode)
* Conoscenza base di [TypeScript](https://www.TypeScriptlang.org/docs/)
* Documentazione di [Jest](https://jestjs.io/docs/getting-started) a portata di mano!

*i primi due punti sono opzionali se si vuole mantenere il codice in locale*

### Steps

1. Creazione del repository (su GitLab/Github)
2. Inizializzazione del Progetto
3. Installazione e configurazione di TypeScript e JEST
4. Aggiunta di Prettier per la formattazione
5. Scrittura dei test
6. Aggiunta di Husky (contenuto aggiuntivo)

### Cos'è JEST?

Secondo la documentazione ufficiale:

> Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

Jest è un framework per la creazione di Test in Javascript può essere utilizzato con TypeScript, Node, React, Angular ecc... sia per applicazioni backend che frontend. Jest ti permette di creare una suite di test in modo semplice e immediato. I test vengono eseguiti parallelamente ognuno con il proprio processo per massimizzare le performance.

## Inizializzazione del Progetto

```sh
> npm init
```

## Installazione e Configurazione di JEST con TypeScript

```sh
> npm i jest @types/jest ts-jest TypeScript -D
```

* Installare il framework jest
* Installare i tipi per jest (@types/jest)
* Installare ts-jest che ci consente di testare con Jest i progetti scritti in TypeScript
* Installare TypeScript prerequisito per 'ts-jest'.
* Con il -D specifichiamo che le dipendenze devono essere salvate come dev dependencies nel package.json

### Configurare TypeScript

```sh
> npx tsc --init
```

Lanciando questo comando verrà creato un file tsconfig.json nel quale definiamo le configurazioni iniziali del nostro progetto TypeScript.

Aggiungiamo il campo *include* nel file `tsconfig.json` in modo da definire i file o i patterns da includere nel progetto, solo i file che si trovano sotto una specifica cartella ad esempio: `/src` saranno inclusi nella compilazione.

```JSON
  "include": ["src/**/*"],
```

### Configurare JEST

JEST può essere utilizzato senza definire un file di configurazione. Nel nostro caso però abbiamo la necessità di cofigurare Jest per utilizzare TypeScript dato che di default non riconosce i file .ts

Dobbiamo specificare nelle configurazioni di Jest che utilizzeremo ts-jest.

Per prima cosa generiamo il file jest.config utilizzando il comando:

```sh
 > npx jest --init
```

Seguiamo le istruzioni e quando ci verrà chiesto se vogliamo utilizzare TypeScript digitiamo "y". Una volta aver risposto a tutte le domande verrà creato un file jest.config.ts

Alla configurazione aggiungiamo il campo trasform dove definiamo che compileremo i file di test .ts utilizzando ts-jest

```TypeScript
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
```

e definiamo anche i pattern dove si trovano i test che dovranno essere ignorati:

```TypeScript
 testPathIgnorePatterns: ["/node_modules/", "/dist"],
```

Aggiungiamo al package.json lo script per eseguire i test:

```JSON
    "test": "jest --watchAll --verbose",
```

con il flag `--watchAll` stiamo eseguendo i test in watchMode quindi Jest si accorgerà quando un file viene modificato e rilancerà i test.
Mentre il flag `--verbose` aggiunge informazioni sulla gerarchia dei test in visualizzazione.

Ora non ci resta che scrivere i test e il codice da testare.

## Test d'esempio

## A che serve Husky e come si usa?

Husky serve a configurare Git hooks personalizzati usando Javascript. Viene utilizzato nel caso volessi eseguire del codice Javascript/TypeScript prima che la commit sia eseguita.
Utilizzo di Husky in questo progetto:

* formattazione
* testing

Abbiamo utilizzato Husky per eseguire prima della commit la formattazione dei file con *Prettier*. Abbiamo poi aggiunto la condizione che per committare devono andare a buon fine i test.

#### Formattazione

**Importante!** Assicurarsi di aver installato prettier:

```sh
> npm i -D prettier
```

per configurare husky e prettier, utilizzeremo lint-staged il comando:

```sh
> npx mrm lint-staged
```

si occuperà di installare husky e lint-staged, e di aggiungere al package.json le configurazioni che serviranno a eseguire lo script per la formattazione prima del commit.

Inoltre verrà creata una cartella .husky dove ci sono le configurazioni.

#### Testing

Per configurare la condizione di buona riuscita dei test necessaria ad eseguire la commit, abbiamo creato un hook lanciando il comando:

```sh
> npx husky add .husky/pre-commit "npm run test-precommit"
```

quindi prima di fare la commit verrà eseguito il comando `npm run test-precommit` definito nel `package.json`

```json
"scripts": {

    "test": "jest --watchAll --verbose",
    "test-precommit": "jest --ci", 

  }
```
