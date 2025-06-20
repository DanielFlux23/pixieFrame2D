/**
 * Pré-carregador de imagens e outros recursos.
 */
export class AssetLoader {
  constructor() {
    this.assets = {};
  }
  
  loadImage(path) {
    if (this.assets[path]) return Promise.resolve(this.assets[path]);
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.assets[path] = img;
        resolve(img);
      };
      img.onerror = reject;
      img.src = path;
    });
  }
  
  get(path) {
    return this.assets[path] || null;
  }
  
  unloadAll() {
    this.assets = {}; // libera referências para o GC
  }
}

/*const cityLoader = new AssetLoader();
const dungeonLoader = new AssetLoader();

// Ao entrar na cidade:
await cityLoader.loadImage("sprites/npc-guard.png");
draw(cityLoader.get("sprites/npc-guard.png"));

// Ao sair da cidade:
cityLoader.unloadAll();*/