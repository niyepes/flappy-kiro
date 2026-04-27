// SRP: única responsabilidad — gestionar puntuación y persistencia
const STORAGE_KEY = 'flappyKiroHighScore';

export class ScoreManager {
  constructor() {
    this.current = 0;
    this.high = this._loadHighScore();
  }

  reset() {
    this.current = 0;
  }

  increment() {
    this.current++;
    if (this.current > this.high) {
      this.high = this.current;
      this._saveHighScore();
    }
  }

  isNewRecord() {
    return this.current === this.high && this.current > 0;
  }

  _loadHighScore() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  }

  _saveHighScore() {
    localStorage.setItem(STORAGE_KEY, this.high.toString());
  }
}
