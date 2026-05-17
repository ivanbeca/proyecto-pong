# Proyecto Pong

Pong sencillo creado con Vue 3, Vite, Composition API y JavaScript.

## Ejecutar

```bash
npm install
npm run dev
```

## Estructura

```text
src/
  App.vue
  main.js
  style.css
  components/
    CampoJuego.vue
    game/
      GameBall.vue
      GameBoard.vue
      GamePaddle.vue
      ScoreBoard.vue
  composables/
    usePongGame.js
  constants/
    gameConfig.js
```

## Tareas Jira

- PP-2 Movimiento pelota: `src/composables/usePongGame.js`
- PP-3 Colisiones paredes: `src/composables/usePongGame.js`
- PP-4 Movimiento palas: `src/components/game/GamePaddle.vue` y `src/composables/usePongGame.js`
- PP-5 Marcador: `src/components/game/ScoreBoard.vue`
- PP-6 IA enemigo: `src/composables/usePongGame.js`
- PP-7 Reinicio ronda: `src/composables/usePongGame.js`
- PP-8 Diseño visual: `src/style.css`, `src/components/CampoJuego.vue` y `src/components/game/GameBoard.vue`
- PP-9 Refactor y limpieza: componentes de `src/components/game/`, `src/constants/gameConfig.js` y eliminación de la demo inicial
