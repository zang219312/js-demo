class EventBus {
  constructor() {
    this.listeners = new Map()
  }

  on(event, cb) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event).push(cb)
  }

  emit(event, ...args) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(listener => listener(...args))
    }
  }

  off(event, cb) {
    if (this.listeners.has(event)) {
      if (cb) {
        this.listeners.set(event, this.listeners.get(event).filter(listener => listener !== cb))
      } else {
        this.listeners.delete(event)
      }
    }
  }

  once(event, cb) {
    const once = (...agrs) => {
      cb(...agrs)
      this.off(event, once)
    }

    this.on(event, once)
  }

}

const eventBus = new EventBus()
const handler1 = (...args) => console.log(...args)
const handler2 = (...args) => console.log(...args.map(v => v + 1))
const handler3 = (...args) => console.log(...args.map(v => v + 10))
console.log(eventBus)
eventBus.on('click', handler1)
eventBus.on('click', handler2)
eventBus.off('click', handler2)

eventBus.emit('click', 1, 2, 3, 4)
