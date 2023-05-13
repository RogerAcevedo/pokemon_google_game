import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty
} from './updateCustomProperty.js'

const pokeElem = document.querySelector('[data-pokemon]')
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const POKE_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let pokeFrame
let currentFrameTime
let yVelocity

export function setupPokemon() {
    isJumping = false
    pokeFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(pokeElem, '--bottom', 0)
    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown', onJump)
}

export function updatePokemon(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getPokeRect() {
    return pokeElem.getBoundingClientRect()
}

export function setPokeLose() {
    pokeElem.src = 'images/pika-lose.png'
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        pokeElem.src = `images/pika-stationary.png`
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        pokeFrame = (pokeFrame + 1) % POKE_FRAME_COUNT
        pokeElem.src = `images/pika-run-${pokeFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(pokeElem, '--bottom', yVelocity * delta)

    if (getCustomProperty(pokeElem, '--bottom') <= 0) {
        setCustomProperty(pokeElem, '--bottom', 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== 'Space' || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}