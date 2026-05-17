<script setup>
import { computed } from 'vue'

const props = defineProps({
  paddle: {
    type: Object,
    required: true,
  },
  board: {
    type: Object,
    required: true,
  },
  side: {
    type: String,
    required: true,
  },
})

const paddleStyle = computed(() => ({
  left: `${(props.paddle.x / props.board.width) * 100}%`,
  top: `${(props.paddle.y / props.board.height) * 100}%`,
  width: `${(props.paddle.width / props.board.width) * 100}%`,
  height: `${(props.paddle.height / props.board.height) * 100}%`,
}))
</script>

<template>
  <div class="game-paddle" :class="side" :style="paddleStyle" aria-hidden="true"></div>
</template>

<style scoped>
.game-paddle {
  position: absolute;
  border-radius: 6px;
  background: #f8fafc;
}

.game-paddle.player {
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.5);
}

.game-paddle.enemy {
  background: #fb7185;
  box-shadow: 0 0 18px rgba(251, 113, 133, 0.45);
}
</style>
