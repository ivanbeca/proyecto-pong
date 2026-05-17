<script setup>
import GameBall from './GameBall.vue'
import GamePaddle from './GamePaddle.vue'

defineProps({
  board: {
    type: Object,
    required: true,
  },
  ball: {
    type: Object,
    required: true,
  },
  player: {
    type: Object,
    required: true,
  },
  enemy: {
    type: Object,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="board-frame">
    <div class="game-board">
      <div class="center-line" aria-hidden="true"></div>
      <GamePaddle :paddle="player" :board="board" side="player" />
      <GamePaddle :paddle="enemy" :board="board" side="enemy" />
      <GameBall :ball="ball" :board="board" />
      <p v-if="message" class="round-message">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.board-frame {
  width: min(100%, 800px);
  padding: 8px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 8px;
  background: #111827;
}

.game-board {
  position: relative;
  width: 100%;
  aspect-ratio: 8 / 5;
  overflow: hidden;
  border-radius: 6px;
  background:
    radial-gradient(circle at center, rgba(56, 189, 248, 0.12), transparent 34%),
    #06111f;
}

.center-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: repeating-linear-gradient(
    to bottom,
    rgba(226, 232, 240, 0.65) 0,
    rgba(226, 232, 240, 0.65) 18px,
    transparent 18px,
    transparent 32px
  );
}

.round-message {
  position: absolute;
  left: 50%;
  top: 18%;
  min-width: 180px;
  margin: 0;
  padding: 10px 16px;
  transform: translateX(-50%);
  border: 1px solid rgba(226, 232, 240, 0.25);
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.82);
  color: #f8fafc;
  font-size: 0.95rem;
  font-weight: 700;
  text-align: center;
}
</style>
