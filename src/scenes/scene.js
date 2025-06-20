/**
 * Classe base para cenas.
 */
export class Scene {
  constructor() {
    this.entities = [];
  }
  
  onEnter() {
    // Chamado quando a cena inicia
    // Pode ser sobrescrito por subclasses
  }
  
  onExit() {
    // Chamado ao trocar de cena
    // Pode ser sobrescrito por subclasses
  }
  
  update(dt) {
    // Atualizar todas as entidades que tiverem um método update
    for (const entity of this.entities) {
      if (typeof entity.update === 'function') {
        entity.update(dt);
      }
    }
  }
  
  render(ctx) {
    // Desenhar todas as entidades que tiverem um método render
    for (const entity of this.entities) {
      if (typeof entity.render === 'function') {
        entity.render(ctx);
      }
    }
  }
  
  remove(entity) {
    this.entities = this.entities.filter(e => e !== entity);
  }
  
  add(entity) {
    this.entities.push(entity);
  }
  
  clear() {
    // Remove todas as entidades — útil para reiniciar a cena
    this.entities = [];
  }
  
  find(predicate) {
    // Procura entidades que satisfaçam uma condição
    return this.entities.find(predicate);
  }
}
