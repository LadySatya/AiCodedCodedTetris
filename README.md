# Tetris Game

A fully functional Tetris implementation built with vanilla JavaScript, HTML5 Canvas, and CSS.

## 🎮 How to Play

Open `index.html` in your web browser and start playing!

### Controls
- **← →** Move piece left/right
- **↑** Rotate piece clockwise
- **↓** Drop piece faster (soft drop)

## ✨ Features

### Core Gameplay
- **Standard Tetris Board**: 10×20 grid game area
- **All 7 Tetrominos**: Complete set of standard pieces (I, O, T, S, Z, J, L)
- **Piece Rotation**: Full 4-direction rotation with collision checking
- **Movement System**: Smooth left/right/down movement with boundary detection
- **Collision Detection**: Comprehensive collision system for walls, floor, and piece-to-piece interactions

### Advanced Features
- **Bag System**: Modern piece distribution ensuring all 7 pieces appear exactly once per bag
- **Line Clearing**: Automatic detection and removal of completed rows
- **Gravity System**: Automatic piece dropping with customizable intervals
- **Progressive Speed**: Game speed increases every 10 lines cleared
- **Scoring System**: Points awarded for cleared lines, multiplied by current level

### Game States
- **Live Statistics**: Real-time display of score, lines cleared, and current level
- **Game Over Detection**: Proper end-game state when pieces reach the top
- **Game Over Screen**: Clear indication when game ends with final score and restart instructions

### Visual & Technical
- **Authentic Colors**: Traditional Tetris piece colors (I-Cyan, O-Yellow, T-Purple, etc.)
- **Smooth Rendering**: 60fps game loop using `requestAnimationFrame()`
- **Responsive Canvas**: Clean HTML5 Canvas rendering with proper scaling
- **Modern Styling**: Clean, minimalist interface with dark theme

## 🛠️ Technical Implementation

### Architecture
- **Vanilla JavaScript**: No external dependencies or frameworks
- **HTML5 Canvas**: 2D rendering for smooth graphics
- **Event-Driven**: Keyboard controls with proper event handling
- **Modular Design**: Well-organized functions for game logic, rendering, and state management

### Key Systems
- **Piece System**: Object-oriented tetromino definitions with rotation matrices
- **Board Management**: 2D array representation with efficient update methods
- **Timer System**: Delta-time based game loop for consistent gameplay across different frame rates
- **State Management**: Clean separation between game state, rendering, and user input

## 📁 File Structure

```
VibeCodedTetris/
├── index.html      # Main HTML structure
├── tetris.js       # Core game logic and rendering
├── style.css       # Game styling and layout
└── README.md       # This documentation
```

## 🎯 Game Rules

- **Objective**: Clear horizontal lines by filling them completely with blocks
- **Line Clearing**: Complete rows disappear and award points
- **Scoring**: 100 points per line × current level multiplier
- **Level Progression**: Level increases every 10 lines cleared
- **Speed Increase**: Drop interval decreases by 50ms per level (minimum 50ms)
- **Game Over**: Game ends when new pieces cannot be placed

## 🚀 Getting Started

1. Clone or download the project files
2. Open `index.html` in any modern web browser
3. Start playing immediately - no installation required!

## 🔧 Customization

The game is easily customizable through the JavaScript constants:

- `BOARD_WIDTH` / `BOARD_HEIGHT`: Adjust game board size
- `CELL_SIZE`: Change visual block size
- `dropInterval`: Modify initial game speed
- Tetromino colors in `getColor()` function
- Scoring multipliers in `clearLines()` function

## 🎨 Features Highlight

### Bag System
Unlike simple random generation, this implementation uses a "bag" system that ensures fair piece distribution. Every 7 pieces, you're guaranteed to receive each tetromino type exactly once, eliminating frustrating droughts of specific pieces.

### Progressive Difficulty
The game naturally increases in difficulty through:
- Faster drop speeds as levels increase
- Higher score requirements for progression
- Maintaining challenge without becoming impossible

### Authentic Experience
Faithfully recreates the classic Tetris experience with:
- Standard piece shapes and rotations
- Traditional scoring system
- Classic color scheme
- Familiar game mechanics

---

**Enjoy the game!** 🎮