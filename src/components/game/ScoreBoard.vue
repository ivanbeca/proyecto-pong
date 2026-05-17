<script setup>
defineProps({
  playerScore: {
    type: Number,
    required: true,
  },
  enemyScore: {
    type: Number,
    required: true,
  },
  statusText: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <header class="score-board">
    <div class="score-player">
      <span class="score-label">Jugador</span>
      <strong>{{ playerScore }}</strong>
    </div>

    <div class="score-status">
      <span>Pong</span>
      <small>{{ statusText }}</small>
    </div>

    <div class="score-player enemy">
      <span class="score-label">IA</span>
      <strong>{{ enemyScore }}</strong>
    </div>
  </header>
</template>

<style scoped>
.score-board {
  width: min(100%, 800px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  color: #e5e7eb;
}

.score-player,
.score-status {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.82);
}

.score-player {
  gap: 14px;
  justify-content: flex-start;
  padding: 14px 18px;
}

.score-player.enemy {
  justify-content: flex-end;
}

.score-label {
  color: #94a3b8;
  font-size: 0.88rem;
  font-weight: 700;
  text-transform: uppercase;
}

.score-player strong {
  min-width: 44px;
  color: #f8fafc;
  font-size: 2.6rem;
  line-height: 1;
  text-align: center;
}

.score-status {
  min-width: 170px;
  flex-direction: column;
  gap: 5px;
  padding: 10px 18px;
}

.score-status span {
  color: #38bdf8;
  font-size: 1.45rem;
  font-weight: 800;
}

.score-status small {
  color: #cbd5e1;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .score-board {
    grid-template-columns: 1fr 1fr;
  }

  .score-status {
    grid-column: 1 / -1;
    grid-row: 1;
    min-height: 58px;
  }

  .score-player {
    min-height: 62px;
  }

  .score-player strong {
    font-size: 2rem;
  }
}
</style>
