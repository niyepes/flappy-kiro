// SRP: única responsabilidad — gestionar estados y transiciones del juego
// OCP: nuevos estados se pueden añadir sin modificar código existente

export const GameState = {
  MENU: 0,
  PLAYING: 1,
  GAME_OVER: 2,
};

export class GameStateMachine {
  constructor() {
    this.current = GameState.MENU;
  }

  toMenu() {
    this.current = GameState.MENU;
  }

  toPlaying() {
    this.current = GameState.PLAYING;
  }

  toGameOver() {
    this.current = GameState.GAME_OVER;
  }

  isMenu() {
    return this.current === GameState.MENU;
  }

  isPlaying() {
    return this.current === GameState.PLAYING;
  }

  isGameOver() {
    return this.current === GameState.GAME_OVER;
  }
}
