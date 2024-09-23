class ScoreManager {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
    }

    addScore(amount) {
        this.score += amount;
    }

    updateScore(newScore) {
        this.score = newScore;
    }

    getScore() {
        return this.score;
    }
}

export default ScoreManager;
