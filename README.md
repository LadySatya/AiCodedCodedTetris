# Tetris Game

A fully functional Tetris implementation built with vanilla JavaScript, HTML5 Canvas, and CSS.

## 🎮 How to Play

Open `index.html` in your web browser and start playing!

### Controls
- **← →** Move piece left/right
- **Z** Rotate piece counter-clockwise ↺
- **X** Rotate piece clockwise ↻
- **↓** Drop piece faster (soft drop)

## ✨ Features

### Core Gameplay
- **Standard Tetris Board**: 10×20 grid game area
- **All 7 Tetrominos**: Complete set of standard pieces (I, O, T, S, Z, J, L)
- **Super Rotation System (SRS)**: Official rotation system with proper centers and wall kicks
- **Dual Rotation Controls**: Separate counter-clockwise (Z) and clockwise (X) rotation
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
- **SRS Compliance**: Wall kick system enabling advanced techniques like T-spins

## 🛠️ Technical Implementation

### Architecture
- **Vanilla JavaScript**: No external dependencies or frameworks
- **HTML5 Canvas**: 2D rendering for smooth graphics
- **Event-Driven**: Keyboard controls with proper event handling
- **Modular Design**: Object-oriented classes with single responsibilities

### Key Systems
- **PieceManager**: Handles tetromino definitions, rotations, and bag-based generation
- **Board**: Manages game grid, collision detection, and line clearing
- **GameState**: Tracks scoring, level progression, and game timing
- **Renderer**: Handles all canvas drawing and UI updates
- **InputHandler**: Processes keyboard events with configurable handlers
- **TetrisGame**: Main controller that coordinates all modules

## 📁 File Structure

```
VibeCodedTetris/
├── js/
│   ├── pieces.js      # PieceManager class - tetrominos & bag system
│   ├── board.js       # Board class - grid management & collision
│   ├── gameState.js   # GameState class - scoring & progression 
│   ├── input.js       # InputHandler class - keyboard controls
│   ├── renderer.js    # Renderer class - canvas drawing
│   └── game.js        # TetrisGame class - main coordination
├── index.html         # Main HTML structure
├── style.css          # Game styling and layout
└── README.md          # This documentation
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

The modular design makes customization straightforward:

**Game Configuration** (in `game.js`):
- `BOARD_WIDTH` / `BOARD_HEIGHT`: Adjust game board size
- `CELL_SIZE`: Change visual block size

**Piece Customization** (in `pieces.js`):
- Add new tetromino shapes in the `tetrominos` object
- Modify colors in the `getColors()` method
- Adjust bag system behavior

**Scoring & Timing** (in `gameState.js`):
- Modify scoring multipliers in `addLines()`
- Adjust speed progression in level calculations

**Visual Styling** (in `renderer.js`):
- Change colors and drawing styles
- Add visual effects or animations

## 🎨 Features Highlight

### Super Rotation System (SRS)
Implements the official Tetris rotation system used in modern games:
- **Proper rotation centers**: Each piece rotates around its geometric center
- **Wall kick system**: Pieces attempt multiple positions when rotating near obstacles
- **I-piece special handling**: 4×4 grid with unique kick patterns
- **T-spin capability**: Enables advanced techniques and higher scores

### Bag System
Unlike simple random generation, this implementation uses a "bag" system that ensures fair piece distribution. Every 7 pieces, you're guaranteed to receive each tetromino type exactly once, eliminating frustrating droughts of specific pieces.

### Dual Rotation Controls
Modern control scheme with separate rotation directions:
- **Z key**: Counter-clockwise rotation ↺
- **X key**: Clockwise rotation ↻
- Enables precise piece manipulation and advanced techniques

### Progressive Difficulty
The game naturally increases in difficulty through:
- Faster drop speeds as levels increase
- Higher score requirements for progression
- Maintaining challenge without becoming impossible

### Authentic Experience
Faithfully recreates the modern Tetris experience with:
- SRS-compliant piece behavior
- Traditional scoring system
- Classic color scheme
- Professional-grade game mechanics

---

**Enjoy the game!** 🎮