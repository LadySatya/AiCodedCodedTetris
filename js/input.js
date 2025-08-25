class InputHandler {
    constructor() {
        this.handlers = {
            left: null,
            right: null,
            down: null,
            rotateClockwise: null,
            rotateCounterClockwise: null
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
                case 'KeyZ':
                    if (this.handlers.rotateCounterClockwise) {
                        this.handlers.rotateCounterClockwise();
                    }
                    break;
                case 'KeyX':
                    if (this.handlers.rotateClockwise) {
                        this.handlers.rotateClockwise();
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

    setRotateClockwiseHandler(handler) {
        this.handlers.rotateClockwise = handler;
    }

    setRotateCounterClockwiseHandler(handler) {
        this.handlers.rotateCounterClockwise = handler;
    }
}