class TetrisGame {
    constructor() {
        this.BOARD_WIDTH = 10;
        this.BOARD_HEIGHT = 20;
        this.CELL_SIZE = 30;
        
        this.board = new Board(this.BOARD_WIDTH, this.BOARD_HEIGHT);
        this.pieceManager = new PieceManager();
        this.gameState = new GameState();
        this.renderer = new Renderer('gameCanvas', this.CELL_SIZE);
        this.inputHandler = new InputHandler();
        
        this.lastTime = 0;
        this.isFirstPiece = true;
        
        this.setupInputHandlers();
        this.init();
    }

    setupInputHandlers() {
        this.inputHandler.setHandlers({
            left: () => this.movePiece(-1, 0),
            right: () => this.movePiece(1, 0),
            down: () => this.movePiece(0, 1),
            rotate: () => this.rotatePiece()
        });
    }

    init() {
        this.renderer.updateDisplay(this.gameState);
        this.spawnNewPiece();
        requestAnimationFrame(this.gameLoop);
    }

    spawnNewPiece() {
        this.pieceManager.spawnNewPiece(this.BOARD_WIDTH);
        
        // Don't check game over for the very first piece
        if (!this.isFirstPiece && !this.board.isValidPosition(this.pieceManager, 0, 0)) {
            this.gameState.gameOver();
        }
        
        this.isFirstPiece = false;
    }

    movePiece(dx, dy) {
        if (!this.gameState.getStats().isRunning) return;
        
        const isValidMove = (offsetX, offsetY) => {
            const tempPiece = { ...this.pieceManager.currentPiece };
            tempPiece.x += offsetX;
            tempPiece.y += offsetY;
            
            return this.board.isValidPosition({
                getCurrentShape: () => this.pieceManager.getCurrentShape(),
                currentPiece: tempPiece
            });
        };
        
        return this.pieceManager.movePiece(dx, dy, isValidMove);
    }

    rotatePiece() {
        if (!this.gameState.getStats().isRunning) return;
        
        const isValidMove = (offsetX, offsetY) => {
            return this.board.isValidPosition(this.pieceManager, offsetX, offsetY);
        };
        
        this.pieceManager.rotatePiece(isValidMove);
    }

    dropPiece() {
        const moved = this.movePiece(0, 1);
        if (!moved) {
            this.board.placePiece(this.pieceManager);
            const linesCleared = this.board.clearLines();
            
            if (this.gameState.addLines(linesCleared)) {
                this.renderer.updateDisplay(this.gameState);
            }
            
            this.spawnNewPiece();
        }
    }

    update(deltaTime) {
        if (!this.gameState.getStats().isRunning) return;
        
        if (this.gameState.updateDropTimer(deltaTime)) {
            this.dropPiece();
            this.gameState.resetDropTimer();
        }
    }

    render() {
        this.renderer.drawBoard(this.board);
        
        if (this.gameState.getStats().isRunning) {
            this.renderer.drawPiece(this.pieceManager);
        } else {
            this.renderer.drawGameOver(this.gameState.getStats().score);
        }
    }

    gameLoop = (currentTime = 0) => {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.render();
        
        requestAnimationFrame(this.gameLoop);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TetrisGame();
});