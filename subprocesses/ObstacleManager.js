class ObstacleManager {
    constructor(scene) {
        this.scene = scene;
        this.waterObstacles = this.scene.physics.add.group();
        this.airObstacles = this.scene.physics.add.group();

        this.scene.time.addEvent({
            delay: 2000,
            callback: this.spawnObstacles,
            callbackScope: this,
            loop: true
        });

        this.baseSpeed = -250;
    }

    spawnObstacles() {
        const obstacleType = Math.random() < 0.5 ? 'water' : 'balloon';
        let obstacle;

        if (obstacleType === 'water') {
            const yPosition = Math.random() < 0.5 ? 175 : 500;
            obstacle = this.waterObstacles.create(1600, yPosition, 'water');
            obstacle.setDisplaySize(100, 50);
        } else {
            const yPosition = Math.random() < 0.5 ? 100 : 440;
            obstacle = this.airObstacles.create(1600, yPosition, 'balloon');
            obstacle.setDisplaySize(50, 50);
        }

        obstacle.setVelocityX(this.baseSpeed);
        obstacle.body.allowGravity = false;
    }

    updateObstacleSpeed(score) {
        const speed = Math.max(-250, -200 - Math.floor(score / 100) * 50);
        this.waterObstacles.setVelocityX(speed);
        this.airObstacles.setVelocityX(speed);
    }

    getObstacles() {
        return [...this.waterObstacles.getChildren(), ...this.airObstacles.getChildren()];
    }

    clearObstacles() {
        this.waterObstacles.clear(true, true);
        this.airObstacles.clear(true, true);
    }
}

export default ObstacleManager;
