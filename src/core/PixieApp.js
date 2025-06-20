import {GameLoop} from '/src/core/GameLoop.js';


 /**
 * Classe principal da engine. Responsável por gerenciar canvas, loop de jogo, renderização e a cena atual.
 */
export class PixieApp {
  /**
   * Cria uma nova aplicação Pixie.
   * @param {Object} config - Configurações iniciais.
   * @param {number} [config.width=800] - Largura do canvas.
   * @param {number} [config.height=600] - Altura do canvas.
   * @param {string|null} [config.canvasId=null] - ID de um canvas existente no DOM. Se nulo, cria um novo.
   */
  constructor({ width = 800, height = 600, canvasId = null } = {}) {
    /** @type {HTMLCanvasElement} */
    this.canvas = canvasId ? document.getElementById(canvasId) : document.createElement('canvas');
    if (!canvasId) document.body.appendChild(this.canvas);

    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    
   /** @type {Scene|null} */
    this.scene = null;
    
    /** @type {Function} Função de renderização principal */
    this.renderer = () => {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
  if (this.scene && typeof this.scene.render === 'function') {
    this.scene.render(this.ctx);
  }
};
    
    /** @type {gameLoop} Loop de jogo responsável por chamar update/render */
    this.loop = new GameLoop(this._update.bind(this), this.renderer);
  }
  
  /**
   * Inicia o loop de jogo.
   */
  start() {
    this.loop.start();
  }
  
  /**
   * Interrompe o loop de jogo.
   */
  stop() {
    this.loop.running = false;
  }
  
  /**
   * Adiciona uma entidade à cena atual.
   * @param {Object} entity - Entidade com métodos opcionais `update(dt)` e `render(ctx)`.
   */
  add(entity) {
    this.scene = entity;
  }
  
/**
 * Substitui a cena atual por uma nova (instância de Scene).
 * @param {Scene} newScene 
 */
changeScene(newScene) {
  if (this.scene && typeof this.scene.onExit === 'function') {
    this.scene.onExit();
  }
  
  this.scene = newScene;
  
  if (this.scene && typeof this.scene.onEnter === 'function') {
    this.scene.onEnter();
  }
}
  
  /**
   * Atualiza o estado do jogo. Chamada automaticamente a cada frame pelo GameLoop.
   * @param {number} dt - Delta time (tempo desde o último frame), em segundos.
   * @private
   */
  _update(dt) {
  this.onUpdate(dt);
  
  if (this.scene && typeof this.scene.update === 'function') {
    this.scene.update(dt);
  }
}
  
  /**
   * Callback sobrescrevível para lógica de jogo customizada por frame.
   * @param {number} dt - Delta time (tempo desde o último frame), em segundos.
   */
  onUpdate(dt) {
    // Substitua este método para adicionar lógica global de jogo.
  }
}
