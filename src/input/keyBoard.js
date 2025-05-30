/**
 * Gerencia entrada do teclado.
 */
export const Keyboard = {
  keysDown: new Set(),
  
  init() {
    // Adicionar event listeners
  },
  
  isDown(key) {
    return this.keysDown.has(key);
  }
};