export class Hud {
  constructor() {
    this.elementos = []
    this.states = []
    this._render(this.render())
  }
  create(tag) {
    const el = document.createElement(tag)
    const style = el.style
    const api = {
      dom: {
        text: (text) => {
          el.textContent = text;
          return api.dom;
        },
        html: (html) => {
          el.innerHTML = html;
          return api.dom;
        },
        attr: (nome, valor) => {
          el.setAttribute(nome, valor);
          return api.dom;
        },
        on: (evento, callback) => {
          el.addEventListener(evento, callback);
          return api.dom;
        },
        append: (...children) => {
          children.forEach(child => {
            if (child == null) return;
            if (typeof child === 'string') {
              el.appendChild(document.createTextNode(child));
            } else {
              el.appendChild(child.el || child);
            }
          });
          return api.dom;
        },
        className: (nome) => {
          el.className = nome;
          return api.dom;
        },
        id: (valor) => {
          el.id = valor;
          return api.dom;
        },
        // Também pode criar um método para voltar para style:
        style: () => api.style,
        start: el
      },
      
      style: {
        color: (cor) => {
          style.color = cor;
          return api.style;
        },
        background: (cor) => {
          style.backgroundColor = cor;
          return api.style;
        },
        font: (size, family = 'inherit') => {
          style.fontSize = px(size);
          style.fontFamily = family;
          return api.style;
        },
        margin: (val) => {
          style.margin = px(val);
          return api.style;
        },
        padding: (val) => {
          style.padding = px(val);
          return api.style;
        },
        border: (val) => {
          style.border = val;
          return api.style;
        },
        width: (val) => {
          style.width = px(val);
          return api.style;
        },
        height: (val) => {
          style.height = px(val);
          return api.style;
        },
        display: (tipo) => {
          style.display = tipo;
          return api.style;
        },
        align: (items = 'center', justify = 'center') => {
          style.display = 'flex';
          style.alignItems = items;
          style.justifyContent = justify;
          return api.style;
        },
        // Método para voltar ao api.dom direto, sem precisar acessar fora:
        end: () => api /*.dom*/ ,
        start: el
      },
    }
    
    return api
  }
  
  add(element) {
    this.elementos.push(element)
  }
  _render(tanged) {
    for (let element of this.elementos) {
      // Tab to edit
      tanged.appendChild(element.start)
    }
  }
  render() {
    
  }
}

function signal(initial) {
  let value = initial;
  const listeners = new Set();
  return {
    get: () => value,
    set: (v) => { value = v; listeners.forEach(f => f()); },
    subscribe: (fn) => listeners.add(fn)
  };
}