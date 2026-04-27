// SRP: orquesta el loop y coordina dependencias inyectadas
// DIP: depende de abstracciones (Player, PipeManager, Renderer, InputHandler, ScoreManager, GameStateMachine)
import { Player }            from './src/physics.js';
import { PipeManager }       from './src/pipes.js';
import { Renderer }          from './src/renderer.js';
import { InputHandler }      from './src/input.js';
import { ScoreManager }      from './src/score.js';
import { GameStateMachine }  from './src/state-machine.js';

const canvas   = document.getElementById('gameCanvas');
const score    = new ScoreManager();
const player   = new Player();
const pipes    = new PipeManager(score);
const renderer = new Renderer(canvas.getContext('2d'));
const input    = new InputHandler(canvas);
const state    = new GameStateMachine();

input.addEventListener('action', () => {
  if (state.isMenu())     startGame();
  if (state.isPlaying())  player.jump();
  if (state.isGameOver()) reset();
});

function startGame() {
  state.toPlaying();
}

function reset() {
  player.reset();
  pipes.reset();
  score.reset();
  state.toMenu();
}

function update(dt) {
  if (!state.isPlaying()) return;
  player.update(dt);
  if (player.isOutOfBounds() || pipes.update(dt, player.hitbox)) {
    state.toGameOver();
  }
}

function render() {
  if (state.isMenu()) {
    renderer.drawMenu(score.high);
  } else if (state.isPlaying()) {
    renderer.drawFrame(player, pipes.pipes, score.current);
  } else if (state.isGameOver()) {
    renderer.drawFrame(player, pipes.pipes, score.current);
    renderer.drawGameOver(score.current, score.high, score.isNewRecord());
  }
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
