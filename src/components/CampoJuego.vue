<template>
  <div class="campo-juego">
    <div class="pelota" :style="estiloPelota"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const posicionX = ref(0)
const posicionY = ref(0)

const velocidadX = 3
const velocidadY = 2
const anchoCampo = 800
const altoCampo = 500
const tamanoPelota = 20

let animacionId = null

const estiloPelota = computed(() => ({
  transform: `translate(${posicionX.value}px, ${posicionY.value}px)`,
}))

const moverPelota = () => {
  posicionX.value += velocidadX
  posicionY.value += velocidadY

  if (posicionX.value > anchoCampo || posicionY.value > altoCampo) {
    posicionX.value = -tamanoPelota
    posicionY.value = -tamanoPelota
  }

  animacionId = requestAnimationFrame(moverPelota)
}

onMounted(() => {
  animacionId = requestAnimationFrame(moverPelota)
})

onUnmounted(() => {
  cancelAnimationFrame(animacionId)
})
</script>

<style scoped>
.campo-juego {
  width: 800px;
  height: 500px;
  max-width: 100%;
  background: #000;
  position: relative;
  overflow: hidden;
}

.pelota {
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
