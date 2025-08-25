const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 30;

let board = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
let gameRunning = true;
let dropTimer = 0;
let dropInterval = 500;
let score = 0;
let lines = 0;
let level = 1;
let pieceBag = [];
let bagIndex = 0;

const TETROMINOS = {
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

let currentPiece = {
    type: 'T',
    x: 3,
    y: 0,
    rotation: 0
};

function isGameOver() {
    return isCollision(0, 0);
}

function gameOver() {
    gameRunning = false;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.font = '24px Arial';
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
    ctx.fillText('Press F5 to restart', canvas.width / 2, canvas.height / 2 + 80);
}

function shuffleBag() {
    const pieces = Object.keys(TETROMINOS);
    pieceBag = [...pieces];
    
    // Fisher-Yates shuffle
    for (let i = pieceBag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieceBag[i], pieceBag[j]] = [pieceBag[j], pieceBag[i]];
    }
    
    bagIndex = 0;
}

function getNextPiece() {
    if (pieceBag.length === 0 || bagIndex >= pieceBag.length) {
        shuffleBag();
    }
    
    return pieceBag[bagIndex++];
}

function spawnNewPiece() {
    const pieceType = getNextPiece();
    currentPiece = {
        type: pieceType,
        x: Math.floor(BOARD_WIDTH / 2) - 1,
        y: 0,
        rotation: 0
    };
    
    if (isGameOver()) {
        gameOver();
    }
}

function getCurrentPieceShape() {
    return TETROMINOS[currentPiece.type].shapes[currentPiece.rotation];
}

function rotatePiece() {
    const pieceShapes = TETROMINOS[currentPiece.type].shapes;
    const newRotation = (currentPiece.rotation + 1) % pieceShapes.length;
    
    const oldRotation = currentPiece.rotation;
    currentPiece.rotation = newRotation;
    
    if (isCollision()) {
        currentPiece.rotation = oldRotation;
    }
}

function isCollision(offsetX = 0, offsetY = 0, rotation = currentPiece.rotation) {
    const shape = TETROMINOS[currentPiece.type].shapes[rotation];
    
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                const newX = currentPiece.x + col + offsetX;
                const newY = currentPiece.y + row + offsetY;
                
                if (newX < 0 || newX >= BOARD_WIDTH || 
                    newY >= BOARD_HEIGHT || 
                    (newY >= 0 && board[newY][newX] !== 0)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function movePiece(dx, dy) {
    if (!isCollision(dx, dy)) {
        currentPiece.x += dx;
        currentPiece.y += dy;
        return true;
    }
    return false;
}

function clearLines() {
    let linesCleared = 0;
    
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1);
            board.unshift(Array(BOARD_WIDTH).fill(0));
            linesCleared++;
            row++; // Check the same row again since we shifted everything down
        }
    }
    
    if (linesCleared > 0) {
        lines += linesCleared;
        score += linesCleared * 100 * level;
        level = Math.floor(lines / 10) + 1;
        dropInterval = Math.max(50, 500 - (level - 1) * 50);
        
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('lines').textContent = lines;
    document.getElementById('level').textContent = level;
}

function placePiece() {
    const shape = getCurrentPieceShape();
    const color = TETROMINOS[currentPiece.type].color;
    
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                const boardX = currentPiece.x + col;
                const boardY = currentPiece.y + row;
                
                if (boardY >= 0) {
                    board[boardY][boardX] = color;
                }
            }
        }
    }
    
    clearLines();
}

function drawPiece() {
    const shape = getCurrentPieceShape();
    const color = TETROMINOS[currentPiece.type].color;
    
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                const x = (currentPiece.x + col) * CELL_SIZE;
                const y = (currentPiece.y + row) * CELL_SIZE;
                
                ctx.fillStyle = getColor(color);
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                ctx.strokeStyle = '#000';
                ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let row = 0; row < BOARD_HEIGHT; row++) {
        for (let col = 0; col < BOARD_WIDTH; col++) {
            const x = col * CELL_SIZE;
            const y = row * CELL_SIZE;
            
            if (board[row][col] === 0) {
                ctx.strokeStyle = '#333';
                ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
            } else {
                ctx.fillStyle = getColor(board[row][col]);
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                ctx.strokeStyle = '#000';
                ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function getColor(pieceType) {
    const colors = {
        1: '#00FFFF', // I - Cyan
        2: '#FFFF00', // O - Yellow  
        3: '#800080', // T - Purple
        4: '#00FF00', // S - Green
        5: '#FF0000', // Z - Red
        6: '#0000FF', // J - Blue
        7: '#FFA500'  // L - Orange
    };
    return colors[pieceType] || '#666';
}

document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'ArrowLeft':
            movePiece(-1, 0);
            break;
        case 'ArrowRight':
            movePiece(1, 0);
            break;
        case 'ArrowDown':
            movePiece(0, 1);
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
    }
});

let lastTime = 0;

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    if (gameRunning) {
        dropTimer += deltaTime;
        
        if (dropTimer >= dropInterval) {
            if (!movePiece(0, 1)) {
                placePiece();
                spawnNewPiece();
            }
            dropTimer = 0;
        }
        
        drawBoard();
        drawPiece();
    } else {
        // Redraw game over screen to ensure it stays visible
        drawBoard();
        gameOver();
    }
    
    requestAnimationFrame(gameLoop);
}

updateDisplay();
spawnNewPiece();
requestAnimationFrame(gameLoop);