// SRP: única responsabilidad — dibujar en el canvas
import { CONFIG } from './config.js';

const { CANVAS, PIPE, PLAYER } = CONFIG;

export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.kiroImg = new Image();
    this.kiroImg.src = 'assets/ghosty.png';
    this.bgOffset = 0;
  }

  updateBackground(dt) {
    this.bgOffset = (this.bgOffset + 30 * dt) % CANVAS.W;
  }

  drawMenu(highScore) {
    const { ctx } = this;
    this._sky();
    this._ground();
    
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, CANVAS.W, CANVAS.H);
    
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 56px sans-serif';
    ctx.fillText('Flappy Kiro', CANVAS.W / 2, CANVAS.H / 2 - 60);
    
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#ddd';
    ctx.fillText('Presiona ESPACIO o CLIC para comenzar', CANVAS.W / 2, CANVAS.H / 2 + 20);
    
    if (highScore > 0) {
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#ffd700';
      ctx.fillText(`High Score: ${highScore}`, CANVAS.W / 2, CANVAS.H / 2 + 60);
    }
  }

  drawFrame(player, pipes, score) {
    this._sky();
    pipes.forEach(p => this._pipe(p));
    this._ground();
    this._player(player);
    this._score(score);
  }

  drawGameOver(score, highScore, isNewRecord) {
    const { ctx } = this;
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, 0, CANVAS.W, CANVAS.H);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText('Game Over', CANVAS.W / 2, CANVAS.H / 2 - 40);
    
    ctx.font = '22px sans-serif';
    ctx.fillText(`Score: ${score}`, CANVAS.W / 2, CANVAS.H / 2 + 10);
    
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#ffd700';
    ctx.fillText(`High Score: ${highScore}`, CANVAS.W / 2, CANVAS.H / 2 + 40);
    
    if (isNewRecord) {
      ctx.fillStyle = '#00ff00';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('🎉 New Record! 🎉', CANVAS.W / 2, CANVAS.H / 2 + 70);
    }
    
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#ddd';
    ctx.fillText('Espacio o clic para reiniciar', CANVAS.W / 2, CANVAS.H / 2 + 105);
  }

  _sky() {
    const { ctx } = this;
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS.H);
    gradient.addColorStop(0, '#87ceeb');
    gradient.addColorStop(1, '#b0e0e6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS.W, CANVAS.H);
    
    // Parallax clouds
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 3; i++) {
      const x = ((i * 200 - this.bgOffset) % CANVAS.W) - 50;
      ctx.beginPath();
      ctx.arc(x, 80 + i * 40, 30, 0, Math.PI * 2);
      ctx.arc(x + 25, 80 + i * 40, 35, 0, Math.PI * 2);
      ctx.arc(x + 50, 80 + i * 40, 30, 0, Math.PI * 2);
      ctx.fill();
    }
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
    const { ctx } = this;
    const rotation = Math.max(-0.5, Math.min(0.4, player.vy / 1000));
    
    ctx.save();
    ctx.translate(player.x + PLAYER.W / 2, player.y + PLAYER.H / 2);
    ctx.rotate(rotation);
    
    if (this.kiroImg.complete && this.kiroImg.naturalWidth) {
      ctx.drawImage(this.kiroImg, -PLAYER.W / 2, -PLAYER.H / 2, PLAYER.W, PLAYER.H);
    } else {
      ctx.fillStyle = '#fff';
      ctx.fillRect(-PLAYER.W / 2, -PLAYER.H / 2, PLAYER.W, PLAYER.H);
    }
    ctx.restore();
  }

  _score(score) {
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.font = 'bold 20px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`Score: ${score}`, CANVAS.W / 2, CANVAS.H - 4);
  }
}
