class GameState {
    constructor() {
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.isRunning = true;
        this.dropTimer = 0;
        this.dropInterval = 500;
    }

    reset() {
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.isRunning = true;
        this.dropTimer = 0;
        this.dropInterval = 500;
    }

    addLines(linesCleared) {
        if (linesCleared > 0) {
            this.lines += linesCleared;
            this.score += linesCleared * 100 * this.level;
            this.level = Math.floor(this.lines / 10) + 1;
            this.dropInterval = Math.max(50, 500 - (this.level - 1) * 50);
            
            return true; // Indicates display should be updated
        }
        return false;
    }

    updateDropTimer(deltaTime) {
        this.dropTimer += deltaTime;
        return this.dropTimer >= this.dropInterval;
    }

    resetDropTimer() {
        this.dropTimer = 0;
    }

    gameOver() {
        this.isRunning = false;
    }

    getStats() {
        return {
            score: this.score,
            lines: this.lines,
            level: this.level,
            isRunning: this.isRunning,
            dropInterval: this.dropInterval
        };
    }
}