import {PixieApp} from '/src/index.js';

const app = new PixieApp({ width: 340, height: 400, canvasId:'canvas'});
app.start();
//console.log(app)
import { Sprite } from '/src/graphicis/sprite.js';

const player = new Sprite('/assents/imagens/Untitled_erono_720_720.png');
player.x = 0
player.y = 0
player.width = 32;
player.height = 32;

app.add(player);


let mover = false
app.onUpdate = (dt) => {
  if (mover) {
player.x += 10*dt
player.y += 10*dt
player.height += 10*dt;
player.width += 10*dt;
}
}

setTimeout(() => mover = true, 3000 )
//(100, 100);
//player.setScale(2);

//app.add(player);
/*
import { Keyboard } from 'pixieframe';

app.onUpdate = (dt) => {
  if (Keyboard.isDown('ArrowRight')) player.x += 100 * dt;
  if (Keyboard.isDown('ArrowLeft')) player.x -= 100 * dt;
};

player.addAnimation('walk', {
  frames: ['walk1.png', 'walk2.png', 'walk3.png'],
  frameRate: 10
});

player.play('walk');

import { Scene } from 'pixieframe';

class MenuScene extends Scene {
  onEnter() {
    const title = new Sprite('title.png');
    title.center();
    this.add(title);
  }
}

app.changeScene(new MenuScene());*/
