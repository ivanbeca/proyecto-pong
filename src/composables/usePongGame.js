import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import {
  BALL_SIZE,
  BALL_SPEED_INCREMENT,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  ENEMY_SPEED,
  INITIAL_BALL_SPEED,
  MAX_BALL_SPEED,
  PADDLE_HEIGHT,
  PADDLE_MARGIN,
  PADDLE_WIDTH,
  PLAYER_SPEED,
  ROUND_RESET_DELAY,
} from '../constants/gameConfig'

const createPaddle = (x) => ({
  x,
  y: BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
})

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export function usePongGame() {
  const board = {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
  }

  const ball = reactive({
    x: BOARD_WIDTH / 2 - BALL_SIZE / 2,
    y: BOARD_HEIGHT / 2 - BALL_SIZE / 2,
    size: BALL_SIZE,
    velocityX: INITIAL_BALL_SPEED,
    velocityY: 2.8,
  })

  const player = reactive(createPaddle(PADDLE_MARGIN))
  const enemy = reactive(createPaddle(BOARD_WIDTH - PADDLE_MARGIN - PADDLE_WIDTH))
  const score = reactive({
    player: 0,
    enemy: 0,
  })

  const isPaused = ref(false)
  const isWaitingRound = ref(false)
  const roundMessage = ref('W/S o flechas para mover')

  const pressedKeys = {
    up: false,
    down: false,
  }

  let animationId = null
  let roundTimer = null

  const statusText = computed(() => {
    if (isPaused.value) {
      return 'Pausa'
    }

    if (isWaitingRound.value) {
      return 'Preparando saque'
    }

    return 'En juego'
  })

  const resetPaddles = () => {
    player.y = BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2
    enemy.y = BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2
  }

  const resetBall = (direction = 1) => {
    const verticalDirection = Math.random() > 0.5 ? 1 : -1

    ball.x = BOARD_WIDTH / 2 - BALL_SIZE / 2
    ball.y = BOARD_HEIGHT / 2 - BALL_SIZE / 2
    ball.velocityX = direction * INITIAL_BALL_SPEED
    ball.velocityY = verticalDirection * (2 + Math.random() * 2)
  }

  const resetRound = (winner) => {
    isWaitingRound.value = true
    roundMessage.value = winner === 'player' ? 'Punto para jugador' : 'Punto para IA'
    resetPaddles()
    resetBall(winner === 'player' ? 1 : -1)

    clearTimeout(roundTimer)
    roundTimer = setTimeout(() => {
      isWaitingRound.value = false
      roundMessage.value = ''
    }, ROUND_RESET_DELAY)
  }

  const resetMatch = () => {
    clearTimeout(roundTimer)
    score.player = 0
    score.enemy = 0
    isPaused.value = false
    isWaitingRound.value = false
    roundMessage.value = 'Partida reiniciada'
    resetPaddles()
    resetBall(Math.random() > 0.5 ? 1 : -1)

    roundTimer = setTimeout(() => {
      roundMessage.value = ''
    }, ROUND_RESET_DELAY)
  }

  const togglePause = () => {
    if (isWaitingRound.value) {
      return
    }

    isPaused.value = !isPaused.value
    roundMessage.value = isPaused.value ? 'Pausa' : ''
  }

  const movePlayer = () => {
    if (pressedKeys.up) {
      player.y -= PLAYER_SPEED
    }

    if (pressedKeys.down) {
      player.y += PLAYER_SPEED
    }

    player.y = clamp(player.y, 0, BOARD_HEIGHT - PADDLE_HEIGHT)
  }

  const moveEnemy = () => {
    const enemyCenter = enemy.y + enemy.height / 2
    const ballCenter = ball.y + ball.size / 2

    if (ballCenter < enemyCenter - 8) {
      enemy.y -= ENEMY_SPEED
    }

    if (ballCenter > enemyCenter + 8) {
      enemy.y += ENEMY_SPEED
    }

    enemy.y = clamp(enemy.y, 0, BOARD_HEIGHT - PADDLE_HEIGHT)
  }

  const hasPaddleCollision = (paddle) => (
    ball.x < paddle.x + paddle.width
    && ball.x + ball.size > paddle.x
    && ball.y < paddle.y + paddle.height
    && ball.y + ball.size > paddle.y
  )

  const bounceFromPaddle = (paddle, direction) => {
    const paddleCenter = paddle.y + paddle.height / 2
    const ballCenter = ball.y + ball.size / 2
    const hitPosition = (ballCenter - paddleCenter) / (paddle.height / 2)
    const newSpeed = Math.min(Math.abs(ball.velocityX) + BALL_SPEED_INCREMENT, MAX_BALL_SPEED)

    ball.velocityX = direction * newSpeed
    ball.velocityY = hitPosition * 6
  }

  const moveBall = () => {
    ball.x += ball.velocityX
    ball.y += ball.velocityY

    if (ball.y <= 0) {
      ball.y = 0
      ball.velocityY = Math.abs(ball.velocityY)
    }

    if (ball.y + ball.size >= BOARD_HEIGHT) {
      ball.y = BOARD_HEIGHT - ball.size
      ball.velocityY = -Math.abs(ball.velocityY)
    }

    if (ball.velocityX < 0 && hasPaddleCollision(player)) {
      ball.x = player.x + player.width
      bounceFromPaddle(player, 1)
    }

    if (ball.velocityX > 0 && hasPaddleCollision(enemy)) {
      ball.x = enemy.x - ball.size
      bounceFromPaddle(enemy, -1)
    }

    if (ball.x + ball.size < 0) {
      score.enemy += 1
      resetRound('enemy')
    }

    if (ball.x > BOARD_WIDTH) {
      score.player += 1
      resetRound('player')
    }
  }

  const updateGame = () => {
    if (!isPaused.value && !isWaitingRound.value) {
      movePlayer()
      moveEnemy()
      moveBall()
    }

    animationId = requestAnimationFrame(updateGame)
  }

  const getControlKey = (key) => {
    if (key === 'w' || key === 'W' || key === 'ArrowUp') {
      return 'up'
    }

    if (key === 's' || key === 'S' || key === 'ArrowDown') {
      return 'down'
    }

    return null
  }

  const handleKeyDown = (event) => {
    const controlKey = getControlKey(event.key)

    if (controlKey) {
      event.preventDefault()
      pressedKeys[controlKey] = true
    }

    if (event.code === 'Space') {
      event.preventDefault()
      togglePause()
    }
  }

  const handleKeyUp = (event) => {
    const controlKey = getControlKey(event.key)

    if (controlKey) {
      event.preventDefault()
      pressedKeys[controlKey] = false
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    animationId = requestAnimationFrame(updateGame)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
    cancelAnimationFrame(animationId)
    clearTimeout(roundTimer)
  })

  return {
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
  }
}
