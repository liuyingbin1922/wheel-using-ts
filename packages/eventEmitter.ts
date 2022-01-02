
export class EventEmitter {
    private events = {}

    public on(event, listener) {
        if (this.events[event] === undefined) {
            this.events[event] = []
        }

        this.events[event].push(listener)

        return (): void => {
            this.off(event, listener)
        }
    }

    public off(event?, listener?) {
        if (event === undefined && listener === undefined) {
            this.events = {}
        } else if (listener === undefined) {
            delete this.events[event]
        } else if (this.events[event].indexOf(listener) !== -1) {
            this.events[event].splice(this.events[event].indexOf(listener), 1)
        }
    }

    public emit(event: string, ...args) {
        if (this.events[event] !== undefined) {
            for (const listener of this.events[event]) {
                listener(...args)
            }
        }

        if (event !== '*') {
            this.emit('*', ...args)
        }
    }

    public once(event, listener) {
        return this.on(event, () => {
            this.emit(event)

            this.off(event, listener)
        })
    }
}
