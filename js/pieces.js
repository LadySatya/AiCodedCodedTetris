class PieceManager {
    constructor() {
        this.tetrominos = {
            I: { 
                shapes: [
                    // State 0 (spawn)
                    [
                        [0,0,0,0],
                        [1,1,1,1],
                        [0,0,0,0],
                        [0,0,0,0]
                    ],
                    // State R (90° clockwise)
                    [
                        [0,0,1,0],
                        [0,0,1,0],
                        [0,0,1,0],
                        [0,0,1,0]
                    ],
                    // State 2 (180°)
                    [
                        [0,0,0,0],
                        [0,0,0,0],
                        [1,1,1,1],
                        [0,0,0,0]
                    ],
                    // State L (270°/90° counter-clockwise)
                    [
                        [0,1,0,0],
                        [0,1,0,0],
                        [0,1,0,0],
                        [0,1,0,0]
                    ]
                ], 
                color: 1 
            },
            O: { 
                shapes: [
                    // O piece doesn't rotate in SRS
                    [
                        [0,2,2,0],
                        [0,2,2,0],
                        [0,0,0,0],
                        [0,0,0,0]
                    ]
                ], 
                color: 2 
            },
            T: { 
                shapes: [
                    // State 0 (spawn)
                    [
                        [0,3,0],
                        [3,3,3],
                        [0,0,0]
                    ],
                    // State R (90° clockwise)
                    [
                        [0,3,0],
                        [0,3,3],
                        [0,3,0]
                    ],
                    // State 2 (180°)
                    [
                        [0,0,0],
                        [3,3,3],
                        [0,3,0]
                    ],
                    // State L (270°/90° counter-clockwise)
                    [
                        [0,3,0],
                        [3,3,0],
                        [0,3,0]
                    ]
                ], 
                color: 3 
            },
            S: { 
                shapes: [
                    // State 0 (spawn)
                    [
                        [0,4,4],
                        [4,4,0],
                        [0,0,0]
                    ],
                    // State R (90° clockwise)
                    [
                        [0,4,0],
                        [0,4,4],
                        [0,0,4]
                    ],
                    // State 2 (180°)
                    [
                        [0,0,0],
                        [0,4,4],
                        [4,4,0]
                    ],
                    // State L (270°/90° counter-clockwise)
                    [
                        [4,0,0],
                        [4,4,0],
                        [0,4,0]
                    ]
                ], 
                color: 4 
            },
            Z: { 
                shapes: [
                    // State 0 (spawn)
                    [
                        [5,5,0],
                        [0,5,5],
                        [0,0,0]
                    ],
                    // State R (90° clockwise)
                    [
                        [0,0,5],
                        [0,5,5],
                        [0,5,0]
                    ],
                    // State 2 (180°)
                    [
                        [0,0,0],
                        [5,5,0],
                        [0,5,5]
                    ],
                    // State L (270°/90° counter-clockwise)
                    [
                        [0,5,0],
                        [5,5,0],
                        [5,0,0]
                    ]
                ], 
                color: 5 
            },
            J: { 
                shapes: [
                    // State 0 (spawn)
                    [
                        [6,0,0],
                        [6,6,6],
                        [0,0,0]
                    ],
                    // State R (90° clockwise)
                    [
                        [0,6,6],
                        [0,6,0],
                        [0,6,0]
                    ],
                    // State 2 (180°)
                    [
                        [0,0,0],
                        [6,6,6],
                        [0,0,6]
                    ],
                    // State L (270°/90° counter-clockwise)
                    [
                        [0,6,0],
                        [0,6,0],
                        [6,6,0]
                    ]
                ], 
                color: 6 
            },
            L: { 
                shapes: [
                    // State 0 (spawn)
                    [
                        [0,0,7],
                        [7,7,7],
                        [0,0,0]
                    ],
                    // State R (90° clockwise)
                    [
                        [0,7,0],
                        [0,7,0],
                        [0,7,7]
                    ],
                    // State 2 (180°)
                    [
                        [0,0,0],
                        [7,7,7],
                        [7,0,0]
                    ],
                    // State L (270°/90° counter-clockwise)
                    [
                        [7,7,0],
                        [0,7,0],
                        [0,7,0]
                    ]
                ], 
                color: 7 
            }
        };
        
        this.pieceBag = [];
        this.bagIndex = 0;
        this.currentPiece = null;
        
        // SRS Wall Kick Data - basic kick tests
        this.wallKickData = {
            // Standard pieces (J, L, T, S, Z)
            JLTSZ: {
                '0->R': [[0,0], [-1,0], [-1,1], [0,-2], [-1,-2]],
                'R->0': [[0,0], [1,0], [1,-1], [0,2], [1,2]],
                'R->2': [[0,0], [1,0], [1,-1], [0,2], [1,2]],
                '2->R': [[0,0], [-1,0], [-1,1], [0,-2], [-1,-2]],
                '2->L': [[0,0], [1,0], [1,1], [0,-2], [1,-2]],
                'L->2': [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]],
                'L->0': [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]],
                '0->L': [[0,0], [1,0], [1,1], [0,-2], [1,-2]]
            },
            // I piece has different kick data
            I: {
                '0->R': [[0,0], [-2,0], [1,0], [-2,-1], [1,2]],
                'R->0': [[0,0], [2,0], [-1,0], [2,1], [-1,-2]],
                'R->2': [[0,0], [-1,0], [2,0], [-1,2], [2,-1]],
                '2->R': [[0,0], [1,0], [-2,0], [1,-2], [-2,1]],
                '2->L': [[0,0], [2,0], [-1,0], [2,1], [-1,-2]],
                'L->2': [[0,0], [-2,0], [1,0], [-2,-1], [1,2]],
                'L->0': [[0,0], [1,0], [-2,0], [1,-2], [-2,1]],
                '0->L': [[0,0], [-1,0], [2,0], [-1,2], [2,-1]]
            }
        };
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

    rotatePiece(isValidMove, clockwise = true) {
        if (!this.currentPiece) return false;
        
        const pieceShapes = this.tetrominos[this.currentPiece.type].shapes;
        const oldRotation = this.currentPiece.rotation;
        
        let newRotation;
        if (clockwise) {
            newRotation = (this.currentPiece.rotation + 1) % pieceShapes.length;
        } else {
            newRotation = (this.currentPiece.rotation - 1 + pieceShapes.length) % pieceShapes.length;
        }
        
        // Try SRS wall kicks
        const kickTests = this.getWallKickTests(oldRotation, newRotation);
        
        for (const [offsetX, offsetY] of kickTests) {
            this.currentPiece.rotation = newRotation;
            
            if (isValidMove(offsetX, offsetY)) {
                // Apply the successful offset
                this.currentPiece.x += offsetX;
                this.currentPiece.y += offsetY;
                return true;
            }
        }
        
        // No valid position found, revert rotation
        this.currentPiece.rotation = oldRotation;
        return false;
    }

    getWallKickTests(fromRotation, toRotation) {
        const pieceType = this.currentPiece.type;
        
        // O piece doesn't use wall kicks (doesn't rotate)
        if (pieceType === 'O') {
            return [[0, 0]];
        }
        
        // Get rotation state names
        const stateNames = ['0', 'R', '2', 'L'];
        const fromState = stateNames[fromRotation];
        const toState = stateNames[toRotation];
        const transitionKey = `${fromState}->${toState}`;
        
        // Use I piece kicks for I piece, otherwise use standard kicks
        const kickData = pieceType === 'I' ? this.wallKickData.I : this.wallKickData.JLTSZ;
        
        return kickData[transitionKey] || [[0, 0]];
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