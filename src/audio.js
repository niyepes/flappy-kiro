// SRP: única responsabilidad — gestionar reproducción de audio
export class AudioManager {
  constructor() {
    this.sounds = {
      jump: this._load('assets/jump.wav'),
      gameOver: this._load('assets/game_over.wav'),
    };
  }

  _load(src) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    return audio;
  }

  play(name) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {}); // ignore autoplay policy errors
    }
  }
}
