class Ambiente {
  constructor() {
    this.prop = ""
  }
}

const ambiente = new Ambiente()


const cena = ambiente.createScena()

cena.createEntidade('nome')
  .path('/assents/imagens/Untitled_erono_720_720.png')
  .setPosition(0,10)
  .setScala(32,32)
  
  
const engine = new Engine()

const cena = engine.criarCena()

cena.novaEntidade('nome')
  .setSprite('/assets/imagens/personagem.png')
  .setPosicao(0, 10)
  .setEscala(32, 32)
  
  