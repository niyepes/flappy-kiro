// SRP: responsable de generación, movimiento y reciclado de tuberías
// DIP: depende de ScoreManager inyectado
import { CONFIG } from './config.js';
import { overlap } from './collision.js';

const { PIPE, CANVAS } = CONFIG;

export class PipeManager {
  constructor(scoreManager) {
    this.scoreManager = scoreManager;
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
    const last = this.pipes[this.pipes.length - 1];
    if (!last || last.x <= CANVAS.W - PIPE.INTERVAL) {
      const min = PIPE.MIN_MARGIN;
      const max = CANVAS.H - PIPE.GAP - min;
      this.pipes.push({ x: CANVAS.W, topH: Math.random() * (max - min) + min, scored: false });
    }
  }

  _hitsPlayer(p, box) {
    const top = { x: p.x, y: 0, w: PIPE.W, h: p.topH };
    const bot = { x: p.x, y: p.topH + PIPE.GAP, w: PIPE.W, h: CANVAS.H - p.topH - PIPE.GAP };
    return overlap(box, top) || overlap(box, bot);
  }
}
