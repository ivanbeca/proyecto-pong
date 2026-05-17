<script setup>
import { usePongGame } from '../composables/usePongGame'
import GameBoard from './game/GameBoard.vue'
import ScoreBoard from './game/ScoreBoard.vue'

const {
  board,
  ball,
  player,
  enemy,
  score,
  isPaused,
  roundMessage,
  statusText,
  resetMatch,
  togglePause,
} = usePongGame()
</script>

<template>
  <section class="pong-shell" aria-label="Juego Pong">
    <ScoreBoard
      :player-score="score.player"
      :enemy-score="score.enemy"
      :status-text="statusText"
    />

    <GameBoard
      :board="board"
      :ball="ball"
      :player="player"
      :enemy="enemy"
      :message="roundMessage"
    />

    <footer class="game-footer">
      <p>Jugador: W/S o flechas. Espacio para pausar.</p>

      <div class="game-actions" aria-label="Acciones de partida">
        <button type="button" @click="togglePause">
          {{ isPaused ? 'Continuar' : 'Pausar' }}
        </button>
        <button type="button" class="secondary" @click="resetMatch">
          Reiniciar
        </button>
      </div>
    </footer>
  </section>
</template>

<style scoped>
.pong-shell {
  width: min(100%, 840px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.game-footer {
  width: min(100%, 800px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: #cbd5e1;
}

.game-footer p {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.game-actions {
  display: flex;
  gap: 10px;
}

button {
  min-width: 104px;
  border: 0;
  border-radius: 6px;
  padding: 10px 16px;
  background: #38bdf8;
  color: #082f49;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
}

button:hover {
  background: #7dd3fc;
}

button.secondary {
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: transparent;
  color: #e5e7eb;
}

button.secondary:hover {
  background: rgba(148, 163, 184, 0.14);
}

@media (max-width: 640px) {
  .game-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .game-actions {
    width: 100%;
  }

  button {
    flex: 1;
  }
}
</style>
