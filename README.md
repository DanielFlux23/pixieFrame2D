# PixieFrame2d

![logo](/assents/imagens/logo5_18_102632.png)

**PixieFrame** é uma micro-engine 2D em JavaScript que entrega o básico com estilo. Nada de inchaço, só o essencial: renderização, game loop, input e sprites. Feita pra quem quer controle total sem carregar um monstro de engine.

## Features

- **Renderização rápida** com `CanvasRenderingContext2D`
- **Loop de jogo** baseado em `requestAnimationFrame`
- **Sistema básico de entidades**
- **Gerenciador de input** (teclado/mouse)
- **Sprites e animações quadro a quadro**
- **Gerenciamento simples de cenas**
- **Pré-carregamento de imagens**
- **Helpers de debug opcionais (FPS, bounding boxes)**

## Instalação

```bash
npm install pixieframe
```

Ou use via CDN:

```html
<script src="https://cdn.seuservidor.com/pixieframe.min.js"></script>
```

## Exemplo rápido

```js
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

cena.add(player);
app.add(cena)

const input = new Kliko();

input.AddAction('pular', 'pular')
  .on('pointerdown')
  .off('pointerup')
  .globalOff('pointercancel')
  
app.onUpdate = (dt) => {
  if (input.isPressed('pular')) player.y -= 250 * dt;
};
```

## Estrutura da Engine

```
PixieFrame/
├── core/           # Game loop e gerenciamento global
├── graphics/       # Renderização e sprites
├── input/          # Teclado e mouse
├── scenes/         # Gerenciador de cenas
├── utils/          # Helpers e debug
```

## Filosofia

> Se não precisa, não existe.  
> Se existe, é simples.  
> Se for complexo, está fora.

PixieFrame não tenta ser tudo — ela tenta ser o **mínimo viável jogável**. Ideal pra protótipos, jogos casuais ou quem quer entender como as engrenagens funcionam.

## Roadmap

- [ ] Sistema de partículas leve
- [ ] Animação por interpolação (tweening)
- [ ] Suporte a sons com Web Audio API
- [ ] Physics 2D (opcional e modular)
