import {AssetLoader} from '/src/carregar_Imagens.js/assetLoard.js';
 /**
 * Representa uma imagem no canvas.
 */
export class Sprite {
  constructor(imagePath) {
    this.image = null; // carregar depois via AssetLoader
    this.imagePath = imagePath
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }
  render(ctx) {
  this.draw(ctx)
}

update(dt){
}

  draw(ctx) {
  if (this.image) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  } else {
    const loader = new AssetLoader();
    
    loader.loadImage(this.imagePath).then(img => {
      this.image = img;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // Desenha depois de carregar
    }).catch(err => {
      console.error('Erro ao carregar imagem:', err);
    });
  }
}
}