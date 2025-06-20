export class Kliko {
  constructor() {
    this.actions = {};
    this.templates = {};
  }
  
  AddAction(name, elementId) {
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Elemento "${elementId}" não encontrado.`);
    
    this.actions[name] = {
      pressed: false,
      element,
      handlers: {},
    };
    
    const builder = {
      on: (eventName,callback) => {
        const handler = () => { this.actions[name].pressed = true; if(callback)callback() };
        element.addEventListener(eventName, handler);
        this.actions[name].handlers[eventName] = { handler, target: element };
        return builder;
      },
      off: (eventName,callback) => {
        const handler = () => { this.actions[name].pressed = false; if(callback)callback()};
        element.addEventListener(eventName, handler);
        this.actions[name].handlers[eventName] = { handler, target: element };
        return builder;
      },
      globalOff: (eventName, callback) => {
        const handler = () => { this.actions[name].pressed = false; if(callback)callback()};
        window.addEventListener(eventName, handler);
        this.actions[name].handlers[`global-${eventName}`] = { handler, target: window };
        return builder;
      },
      globalOn: (eventName, callback) => {
  const handler = () => { this.actions[name].pressed = true; if(callback)callback()};
  window.addEventListener(eventName, handler);
  this.actions[name].handlers[`global-${eventName}`] = { handler, target: window };
  return builder;
}
    };
    
    return builder;
  }
  
  isPressed(name) {
    return !!this.actions[name]?.pressed;
  }
  
  destroyAction(name) {
    const action = this.actions[name];
    if (!action) return;
    
    for (const [event, { handler, target }] of Object.entries(action.handlers)) {
      const eventName = event.replace(/^global-/, '');
      target.removeEventListener(eventName, handler);
    }
    
    delete this.actions[name];
  }
  
  addTemplate(name, config = { on: [], off: [], globalOn: [], globalOff: [] }) {
    this.templates[name] = config;
  }
  
useTemplate(name, nameAction, elementID) {
  const template = this.templates[name];
  const action = this.AddAction(nameAction, elementID);
  
  for (const tipo in template) {
    const lista = template[tipo];
    
    for (const item of lista) {
      const { event, callback } = item;
      
      switch (tipo) {
        case 'on':
          
          if (callback) action.on(event,callback);
          else {
            action.on(event
            )
          }
          break;
        case 'off':
          if (callback) action.off(event,callback);
          else {
            action.off(event)
          }
          break;
        case 'globalOn':
          if (callback) action.globalOn(event,callback);
          else {
            action.globalOn(event
            )
          }
          break;
        case 'globalOff':
          if (callback) action.globalOff(event,callback);
          else {
            action.globalOff(event
            )
          }
          break;
      }
    }
  }
}}