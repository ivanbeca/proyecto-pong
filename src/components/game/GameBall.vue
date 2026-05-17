<script setup>
import { computed } from 'vue'

const props = defineProps({
  ball: {
    type: Object,
    required: true,
  },
  board: {
    type: Object,
    required: true,
  },
})

const ballStyle = computed(() => ({
  left: `${(props.ball.x / props.board.width) * 100}%`,
  top: `${(props.ball.y / props.board.height) * 100}%`,
  width: `${(props.ball.size / props.board.width) * 100}%`,
  height: `${(props.ball.size / props.board.height) * 100}%`,
}))
</script>

<template>
  <div class="game-ball" :style="ballStyle" aria-hidden="true"></div>
</template>

<style scoped>
.game-ball {
  position: absolute;
  border-radius: 50%;
  background: #f8fafc;
  box-shadow: 0 0 16px rgba(248, 250, 252, 0.7);
}
</style>
