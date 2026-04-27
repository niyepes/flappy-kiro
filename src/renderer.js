// SRP: única responsabilidad — dibujar en el canvas
import { CONFIG } from './config.js';

const { CANVAS, PIPE, PLAYER } = CONFIG;

export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.kiroImg = new Image();
    this.kiroImg.src = 'assets/ghosty.png';
    this.bgOffset = 0;
    this.clouds = this._generateClouds();
  }

  _generateClouds() {
    const clouds = [];
    for (let i = 0; i < 8; i++) {
      clouds.push({
        x: Math.random() * 800,
        y: 50 + Math.random() * 300,
        size: 20 + Math.random() * 30,
        speed: 0.3 + Math.random() * 0.5
      });
    }
    return clouds;
  }

  updateBackground(dt) {
    this.bgOffset += 30 * dt;
    this.clouds.forEach(cloud => {
      cloud.x -= cloud.speed * 30 * dt;
      if (cloud.x < -100) cloud.x = this.ctx.canvas.width + 50;
    });
  }

  drawMenu(highScore) {
    const { ctx } = this;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    
    this._sky();
    this._ground();
    
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, w, h);
    
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 56px sans-serif';
    ctx.fillText('Flappy Kiro', w / 2, h / 2 - 60);
    
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#ddd';
    ctx.fillText('Presiona ESPACIO o CLIC para comenzar', w / 2, h / 2 + 20);
    
    if (highScore > 0) {
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#ffd700';
      ctx.fillText(`High Score: ${highScore}`, w / 2, h / 2 + 60);
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
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText('Game Over', w / 2, h / 2 - 40);
    
    ctx.font = '22px sans-serif';
    ctx.fillText(`Score: ${score}`, w / 2, h / 2 + 10);
    
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#ffd700';
    ctx.fillText(`High Score: ${highScore}`, w / 2, h / 2 + 40);
    
    if (isNewRecord) {
      ctx.fillStyle = '#00ff00';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('🎉 New Record! 🎉', w / 2, h / 2 + 70);
    }
    
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#ddd';
    ctx.fillText('Espacio o clic para reiniciar', w / 2, h / 2 + 105);
  }

  _sky() {
    const { ctx } = this;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, '#87ceeb');
    gradient.addColorStop(1, '#b0e0e6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    
    // Draw clouds
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    this.clouds.forEach(cloud => {
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.size * 0.8, cloud.y, cloud.size * 1.1, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.size * 1.6, cloud.y, cloud.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  _ground() {
    const { ctx } = this;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.fillStyle = '#4a4a6a';
    ctx.fillRect(0, h - 20, w, 20);
  }

  _pipe(p) {
    const h = this.ctx.canvas.height;
    this._pipeSegment(p.x, 0, PIPE.W, p.topH);
    this._pipeSegment(p.x, p.topH + PIPE.GAP, PIPE.W, h - p.topH - PIPE.GAP - 20);
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
    const { ctx } = this;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${score}`, w / 2, h - 4);
  }
}
