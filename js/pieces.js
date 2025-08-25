class PieceManager {
    constructor() {
        this.tetrominos = {
            I: { 
                shapes: [
                    [[1,1,1,1]],
                    [[1],[1],[1],[1]]
                ], 
                color: 1 
            },
            O: { 
                shapes: [[[2,2],[2,2]]], 
                color: 2 
            },
            T: { 
                shapes: [
                    [[0,3,0],[3,3,3]],
                    [[3,0],[3,3],[3,0]],
                    [[3,3,3],[0,3,0]],
                    [[0,3],[3,3],[0,3]]
                ], 
                color: 3 
            },
            S: { 
                shapes: [
                    [[0,4,4],[4,4,0]],
                    [[4,0],[4,4],[0,4]]
                ], 
                color: 4 
            },
            Z: { 
                shapes: [
                    [[5,5,0],[0,5,5]],
                    [[0,5],[5,5],[5,0]]
                ], 
                color: 5 
            },
            J: { 
                shapes: [
                    [[6,0,0],[6,6,6]],
                    [[6,6],[6,0],[6,0]],
                    [[6,6,6],[0,0,6]],
                    [[0,6],[0,6],[6,6]]
                ], 
                color: 6 
            },
            L: { 
                shapes: [
                    [[0,0,7],[7,7,7]],
                    [[7,0],[7,0],[7,7]],
                    [[7,7,7],[7,0,0]],
                    [[7,7],[0,7],[0,7]]
                ], 
                color: 7 
            }
        };
        
        this.pieceBag = [];
        this.bagIndex = 0;
        this.currentPiece = null;
    }

    shuffleBag() {
        const pieces = Object.keys(this.tetrominos);
        this.pieceBag = [...pieces];
        
        // Fisher-Yates shuffle
        for (let i = this.pieceBag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.pieceBag[i], this.pieceBag[j]] = [this.pieceBag[j], this.pieceBag[i]];
        }
        
        this.bagIndex = 0;
    }

    getNextPieceType() {
        if (this.pieceBag.length === 0 || this.bagIndex >= this.pieceBag.length) {
            this.shuffleBag();
        }
        
        return this.pieceBag[this.bagIndex++];
    }

    spawnNewPiece(boardWidth) {
        const pieceType = this.getNextPieceType();
        this.currentPiece = {
            type: pieceType,
            x: Math.floor(boardWidth / 2) - 1,
            y: 0,
            rotation: 0
        };
        return this.currentPiece;
    }

    getCurrentShape() {
        if (!this.currentPiece) return null;
        return this.tetrominos[this.currentPiece.type].shapes[this.currentPiece.rotation];
    }

    getCurrentColor() {
        if (!this.currentPiece) return null;
        return this.tetrominos[this.currentPiece.type].color;
    }

    rotatePiece(isValidMove) {
        if (!this.currentPiece) return false;
        
        const pieceShapes = this.tetrominos[this.currentPiece.type].shapes;
        const newRotation = (this.currentPiece.rotation + 1) % pieceShapes.length;
        const oldRotation = this.currentPiece.rotation;
        
        this.currentPiece.rotation = newRotation;
        
        if (!isValidMove(0, 0)) {
            this.currentPiece.rotation = oldRotation;
            return false;
        }
        
        return true;
    }

    movePiece(dx, dy, isValidMove) {
        if (!this.currentPiece) return false;
        
        if (isValidMove(dx, dy)) {
            this.currentPiece.x += dx;
            this.currentPiece.y += dy;
            return true;
        }
        return false;
    }

    getColors() {
        return {
            1: '#00FFFF', // I - Cyan
            2: '#FFFF00', // O - Yellow  
            3: '#800080', // T - Purple
            4: '#00FF00', // S - Green
            5: '#FF0000', // Z - Red
            6: '#0000FF', // J - Blue
            7: '#FFA500'  // L - Orange
        };
    }
}