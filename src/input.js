// SRP: captura input del usuario y emite eventos desacoplados
// OCP: nuevos métodos de input se añaden sin modificar consumidores
export class InputHandler extends EventTarget {
  constructor(canvas) {
    super();
    document.addEventListener('keydown', e => {
      if (e.code === 'Space') { e.preventDefault(); this._emit('action'); }
    });
    canvas.addEventListener('mousedown', () => this._emit('action'));
    canvas.addEventListener('touchstart', e => { e.preventDefault(); this._emit('action'); }, { passive: false });
  }

  _emit(type) {
    this.dispatchEvent(new Event(type));
  }
}
