class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = Array(height).fill().map(() => Array(width).fill(0));
    }

    reset() {
        this.grid = Array(this.height).fill().map(() => Array(this.width).fill(0));
    }

    isValidPosition(piece, offsetX = 0, offsetY = 0) {
        if (!piece || !piece.getCurrentShape) return false;
        
        const shape = piece.getCurrentShape();
        if (!shape) return false;
        
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const newX = piece.currentPiece.x + col + offsetX;
                    const newY = piece.currentPiece.y + row + offsetY;
                    
                    if (newX < 0 || newX >= this.width || 
                        newY >= this.height || 
                        (newY >= 0 && this.grid[newY][newX] !== 0)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    placePiece(piece) {
        const shape = piece.getCurrentShape();
        const color = piece.getCurrentColor();
        
        if (!shape || !color) return;
        
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const boardX = piece.currentPiece.x + col;
                    const boardY = piece.currentPiece.y + row;
                    
                    if (boardY >= 0 && boardY < this.height && boardX >= 0 && boardX < this.width) {
                        this.grid[boardY][boardX] = color;
                    }
                }
            }
        }
    }

    clearLines() {
        let linesCleared = 0;
        
        for (let row = this.height - 1; row >= 0; row--) {
            if (this.grid[row].every(cell => cell !== 0)) {
                this.grid.splice(row, 1);
                this.grid.unshift(Array(this.width).fill(0));
                linesCleared++;
                row++; // Check the same row again since we shifted everything down
            }
        }
        
        return linesCleared;
    }


    getCell(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return 0;
        }
        return this.grid[y][x];
    }

    getGrid() {
        return this.grid;
    }
}