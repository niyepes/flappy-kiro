// SRP: orquesta el loop y coordina dependencias inyectadas
// DIP: depende de abstracciones (Player, PipeManager, Renderer, InputHandler)
import { Player }       from './src/physics.js';
import { PipeManager }  from './src/pipes.js';
import { Renderer }     from './src/renderer.js';
import { InputHandler } from './src/input.js';

const PLAYING = 0, GAME_OVER = 1;

const canvas   = document.getElementById('gameCanvas');
const player   = new Player();
const pipes    = new PipeManager();
const renderer = new Renderer(canvas.getContext('2d'));
const input    = new InputHandler(canvas);

let state = PLAYING;

input.addEventListener('action', () => {
  if (state === PLAYING)   player.jump();
  if (state === GAME_OVER) reset();
});

function reset() {
  player.reset();
  pipes.reset();
  state = PLAYING;
}

function update(dt) {
  if (state !== PLAYING) return;
  player.update(dt);
  if (player.isOutOfBounds() || pipes.update(dt, player.hitbox)) {
    state = GAME_OVER;
  }
}

function render() {
  renderer.drawFrame(player, pipes.pipes, pipes.score);
  if (state === GAME_OVER) renderer.drawGameOver(pipes.score);
}

let last = null;
function loop(ts) {
  const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
  last = ts;
  update(dt);
  render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
