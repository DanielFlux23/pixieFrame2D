import { PixieApp,
Sprite, 
Scene, 
Kliko, 
  Hud
} from '/src/index.js';

const app = new PixieApp({ width: 340, height: 400, canvasId: 'canvas' });
app.start();

const cena = new Scene();

const player = new Sprite('/assets/imagens/dinossauro.png');
player.x = 150;
player.y = 350;
player.width = 32;
player.height = 32;

const obstaculo = new Sprite('/assets/imagens/cactos.png');
obstaculo.x = 250;
obstaculo.y = 350;
obstaculo.width = 32;
obstaculo.height = 32;

const chao = new Sprite('/assets/imagens/chao_deserto.png')
chao.x = 0
chao.y = 300
chao.width = app.canvas.width;
chao.height = 100;

cena.add(player);
cena.add(obstaculo)
cena.add(chao)
app.add(cena)

class GameHud extends Hud {
  pular() {
  const button = this.create('button')
    .dom
    .text('pular')
    .id('pular')
  
  this.add(button)
}

  render() {
    this.pular()
    return document.body;
  }
}

new GameHud();

const input = new Kliko();

input.AddAction('pular', 'pular')
  .on('pointerdown')
  .off('pointerup')
  .globalOff('pointercancel')
  
app.onUpdate = (dt) => {
  if (input.isPressed('pular')) player.y -= 250 * dt;
  if (player.y < 350 /* && chao.y < 100*/ ) {
  player.y += 100 * dt;
}

  if(obstaculo.x > - 50){
    obstaculo.x -= 100 * dt;
 }  else {
  obstaculo.x = 350;
}

};