class InputHandler {
    constructor() {
        this.handlers = {
            left: null,
            right: null,
            down: null,
            rotate: null
        };
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'ArrowLeft':
                    if (this.handlers.left) {
                        this.handlers.left();
                    }
                    break;
                case 'ArrowRight':
                    if (this.handlers.right) {
                        this.handlers.right();
                    }
                    break;
                case 'ArrowDown':
                    if (this.handlers.down) {
                        this.handlers.down();
                    }
                    break;
                case 'ArrowUp':
                    if (this.handlers.rotate) {
                        this.handlers.rotate();
                    }
                    break;
            }
        });
    }

    setHandlers(handlers) {
        this.handlers = { ...this.handlers, ...handlers };
    }

    setLeftHandler(handler) {
        this.handlers.left = handler;
    }

    setRightHandler(handler) {
        this.handlers.right = handler;
    }

    setDownHandler(handler) {
        this.handlers.down = handler;
    }

    setRotateHandler(handler) {
        this.handlers.rotate = handler;
    }
}