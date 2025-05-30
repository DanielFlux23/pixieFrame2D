/**
 * GameLoop gerencia o ciclo principal de um jogo.
 * Ele chama as funções de atualização e renderização em cada frame,
 * garantindo que o jogo funcione de forma consistente independente do FPS.
 */
export class GameLoop {
  /**
   * @param {function(delta: number): void} updateCallback - Função chamada a cada frame para atualizar o estado do jogo.
   * @param {function(): void} renderCallback - Função chamada a cada frame para desenhar o jogo na tela.
   */
  constructor(updateCallback, renderCallback) {
    /** @private */
    this.lastTime = 0;
    
    /** @private */
    this.update = updateCallback;
    
    /** @private */
    this.render = renderCallback;
    
    /** @private */
    this.running = false;
  }
  
  /**
   * Inicia o loop do jogo.
   * Começa chamando o primeiro frame e inicializa o lastTime.
   */
  start() {
    this.running = true;
    requestAnimationFrame((time) => {
      this.lastTime = time;
      this._loop(time);
    });
  }
  
  /**
   * Loop interno que calcula o delta time, chama update/render e agenda o próximo frame.
   * @private
   * @param {DOMHighResTimeStamp} time - Timestamp atual fornecido pelo requestAnimationFrame.
   */
  _loop(time) {
    if (!this.running) return;
    
    const delta = (time - this.lastTime) / 1000; 
    this.lastTime = time;
    
    this.update(delta); // Atualiza estado do jogo com base no tempo decorrido
    this.render(); // Renderiza o jogo na tela
    
    requestAnimationFrame(this._loop.bind(this));
  }
}