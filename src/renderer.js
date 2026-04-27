// SRP: única responsabilidad — dibujar en el canvas
import { CONFIG } from './config.js';

const { CANVAS, PIPE, PLAYER } = CONFIG;

export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.kiroImg = new Image();
    this.kiroImg.src = 'assets/ghosty.png';
  }

  drawFrame(player, pipes, score) {
    this._sky();
    pipes.forEach(p => this._pipe(p));
    this._ground();
    this._player(player);
    this._score(score);
  }

  drawGameOver(score) {
    const { ctx } = this;
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, 0, CANVAS.W, CANVAS.H);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText('Game Over', CANVAS.W / 2, CANVAS.H / 2 - 20);
    ctx.font = '22px sans-serif';
    ctx.fillText(`Score: ${score}`, CANVAS.W / 2, CANVAS.H / 2 + 20);
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#ddd';
    ctx.fillText('Espacio o clic para reiniciar', CANVAS.W / 2, CANVAS.H / 2 + 55);
  }

  _sky() {
    this.ctx.fillStyle = '#87ceeb';
    this.ctx.fillRect(0, 0, CANVAS.W, CANVAS.H);
  }

  _ground() {
    this.ctx.fillStyle = '#4a4a6a';
    this.ctx.fillRect(0, CANVAS.H - 20, CANVAS.W, 20);
  }

  _pipe(p) {
    this._pipeSegment(p.x, 0, PIPE.W, p.topH);
    this._pipeSegment(p.x, p.topH + PIPE.GAP, PIPE.W, CANVAS.H - p.topH - PIPE.GAP);
  }

  _pipeSegment(x, y, w, h) {
    const { ctx } = this;
    ctx.fillStyle = '#3a7d44';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#2d6235';
    ctx.fillRect(x + 4, y, w - 8, h);
    const capH = 18, capX = 6;
    const capY = (y === 0) ? h - capH : y;
    ctx.fillStyle = '#3a7d44';
    ctx.fillRect(x - capX, capY, w + capX * 2, capH);
  }

  _player(player) {
    if (this.kiroImg.complete && this.kiroImg.naturalWidth) {
      this.ctx.drawImage(this.kiroImg, player.x, player.y, PLAYER.W, PLAYER.H);
    } else {
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(player.x, player.y, PLAYER.W, PLAYER.H);
    }
  }

  _score(score) {
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.font = 'bold 20px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`Score: ${score}`, CANVAS.W / 2, CANVAS.H - 4);
  }
}
