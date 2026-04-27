// SRP: responsable de generación, movimiento y reciclado de tuberías
// DIP: depende de ScoreManager inyectado
import { CONFIG } from './config.js';
import { overlap } from './collision.js';

const { PIPE } = CONFIG;

export class PipeManager {
  constructor(scoreManager, getCanvasSize) {
    this.scoreManager = scoreManager;
    this.getCanvasSize = getCanvasSize;
    this.reset();
  }

  reset() {
    this.pipes = [];
  }

  update(dt, playerHitbox) {
    this._spawnIfNeeded();

    for (const p of this.pipes) {
      p.x -= PIPE.SPEED * dt;

      if (!p.scored && p.x + PIPE.W < playerHitbox.x) {
        p.scored = true;
        this.scoreManager.increment();
      }

      if (this._hitsPlayer(p, playerHitbox)) return true; // collision
    }

    this.pipes = this.pipes.filter(p => p.x + PIPE.W > 0);
    return false;
  }

  _spawnIfNeeded() {
    const { width, height } = this.getCanvasSize();
    const spawnX = 600; // Fixed spawn distance from left
    const last = this.pipes[this.pipes.length - 1];
    if (!last || last.x <= spawnX - PIPE.INTERVAL) {
      const min = PIPE.MIN_MARGIN;
      const max = height - PIPE.GAP - min - 20; // 20 for ground
      this.pipes.push({ x: spawnX, topH: Math.random() * (max - min) + min, scored: false });
    }
  }

  _hitsPlayer(p, box) {
    const { height } = this.getCanvasSize();
    const top = { x: p.x, y: 0, w: PIPE.W, h: p.topH };
    const bot = { x: p.x, y: p.topH + PIPE.GAP, w: PIPE.W, h: height - p.topH - PIPE.GAP };
    return overlap(box, top) || overlap(box, bot);
  }
}
