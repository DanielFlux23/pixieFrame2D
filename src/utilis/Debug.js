/**
 * Ferramentas visuais de debug.
 */
export class Debug {
  static showFPS(ctx, fps) {
    // Desenhar o FPS no canto
    ctx.fillStyle = 'green';
    ctx.font = '16px monospace';
    ctx.fillText(`FPS: ${fps}`, 10, 20);
  }
  
  static drawBoundingBox(ctx, entity) {
    // Desenhar um retângulo ao redor da entidade
    if (!entity || !entity.x || !entity.y || !entity.width || !entity.height) return;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(entity.x, entity.y, entity.width, entity.height);
  }
}