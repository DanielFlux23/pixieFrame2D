export class Aureo {
constructor() {
this.audioCtx = new AudioContext();
this.musicas = {};
this.currentSource = null;
this.gainNode = this.audioCtx.createGain(); // Controle de volume
this.gainNode.connect(this.audioCtx.destination);
}

create(name) {
return {
path: (url) => {
this.musicas[name] = url;
}
};
}

async carregar(url) {
const response = await fetch(url);
const arrayBuffer = await response.arrayBuffer();
return arrayBuffer;
}

async decodificar(arrayBuffer) {
const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
return audioBuffer;
}

createFont(audioBuffer, { loop = false } = {}) {
const source = this.audioCtx.createBufferSource();
source.buffer = audioBuffer;
source.loop = loop;
source.connect(this.gainNode); // Passa pelo volume antes de ir pro destino final
return source;
}

play(source) {
source.start(0);
this.currentSource = source;
}

stop() {
if (this.currentSource) {
try {
this.currentSource.stop();
} catch (e) {
// Já foi parado, ignora
}
this.currentSource = null;
}
}

setVolume(value) {
// valor entre 0.0 (mudo) e 1.0 (volume máximo)
this.gainNode.gain.value = Math.min(1, Math.max(0, value));
}

async tocar(nome, { loop = false } = {}) {
const url = this.musicas[nome];
if (!url) throw new Error(`Música "${nome}" não foi registrada.`);

const arrayBuffer = await this.carregar(url);
const audioBuffer = await this.decodificar(arrayBuffer);
const source = this.createFont(audioBuffer, { loop });
this.play(source);
}
}
