// SRP: responsable únicamente de la física y estado del jugador
import { CONFIG } from './config.js';

const { PLAYER, PHYSICS } = CONFIG;

export class Player {
  constructor(getCanvasSize) {
    this.getCanvasSize = getCanvasSize;
    this.reset();
  }

  reset() {
    const { height } = this.getCanvasSize();
    this.x = PLAYER.X;
    this.y = height / 2;
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
    const { height } = this.getCanvasSize();
    return this.y <= 0 || this.y + PLAYER.H >= height - 20; // 20 for ground
  }
}
