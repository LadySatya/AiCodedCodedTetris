class Renderer {
    constructor(canvasId, cellSize) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = cellSize;
        this.colors = {
            1: '#00FFFF', // I - Cyan
            2: '#FFFF00', // O - Yellow  
            3: '#800080', // T - Purple
            4: '#00FF00', // S - Green
            5: '#FF0000', // Z - Red
            6: '#0000FF', // J - Blue
            7: '#FFA500'  // L - Orange
        };
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBoard(board) {
        this.clear();
        const grid = board.getGrid();
        
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                const x = col * this.cellSize;
                const y = row * this.cellSize;
                
                if (grid[row][col] === 0) {
                    this.ctx.strokeStyle = '#333';
                    this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
                } else {
                    this.ctx.fillStyle = this.getColor(grid[row][col]);
                    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    this.ctx.strokeStyle = '#000';
                    this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
                }
            }
        }
    }

    drawPiece(piece) {
        if (!piece || !piece.currentPiece) return;
        
        const shape = piece.getCurrentShape();
        const color = piece.getCurrentColor();
        
        if (!shape || !color) return;
        
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const x = (piece.currentPiece.x + col) * this.cellSize;
                    const y = (piece.currentPiece.y + row) * this.cellSize;
                    
                    this.ctx.fillStyle = this.getColor(color);
                    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    this.ctx.strokeStyle = '#000';
                    this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
                }
            }
        }
    }

    drawGameOver(score) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
        
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Final Score: ${score}`, this.canvas.width / 2, this.canvas.height / 2 + 40);
        this.ctx.fillText('Press F5 to restart', this.canvas.width / 2, this.canvas.height / 2 + 80);
    }

    updateDisplay(gameState) {
        const stats = gameState.getStats();
        
        const scoreElement = document.getElementById('score');
        const linesElement = document.getElementById('lines');
        const levelElement = document.getElementById('level');
        
        if (scoreElement) scoreElement.textContent = stats.score;
        if (linesElement) linesElement.textContent = stats.lines;
        if (levelElement) levelElement.textContent = stats.level;
    }

    getColor(pieceType) {
        return this.colors[pieceType] || '#666';
    }
}