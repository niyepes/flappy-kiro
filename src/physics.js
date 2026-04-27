// SRP: responsable únicamente de la física y estado del jugador
import { CONFIG } from './config.js';

const { PLAYER, PHYSICS, CANVAS } = CONFIG;

export class Player {
  constructor() { this.reset(); }

  reset() {
    this.x = PLAYER.X;
    this.y = CANVAS.H / 2;
    this.vy = 0;
  }

  jump() {
    this.vy = PHYSICS.JUMP_FORCE;
  }

  update(dt) {
    this.vy = Math.min(this.vy + PHYSICS.GRAVITY * dt, PHYSICS.MAX_FALL);
    this.y += this.vy * dt;
  }

  /** Hitbox reducida para colisiones más justas */
  get hitbox() {
    const m = PLAYER.HITBOX_MARGIN;
    return { x: this.x + m, y: this.y + m, w: PLAYER.W - m * 2, h: PLAYER.H - m * 2 };
  }

  isOutOfBounds() {
    return this.y <= 0 || this.y + PLAYER.H >= CANVAS.H;
  }
}
