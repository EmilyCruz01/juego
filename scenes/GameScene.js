import Player from './Player.js';
import ObstacleManager from './ObstacleManager.js';
import ScoreManager from './ScoreManager.js';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.gameOver = false;
    }

    create() {
        console.log("GameScene: Iniciado");

        this.cameras.main.setBackgroundColor('#30d4ad');
        this.frog = new Player(this, 500, 100, 'frog');
        this.bunny = new Player(this, 500, 400, 'bunny');

        this.createGround();

        this.obstacleManager = new ObstacleManager(this);
        this.scoreManager = new ScoreManager(this);

        // Agregar colisiones
        this.physics.add.collider(this.frog.sprite, this.obstacleManager.waterObstacles, this.hitObstacle, null, this);
        this.physics.add.collider(this.bunny.sprite, this.obstacleManager.waterObstacles, this.hitObstacle, null, this);

        this.physics.add.collider(this.frog.sprite, this.obstacleManager.airObstacles, this.hitObstacle, null, this);
        this.physics.add.collider(this.bunny.sprite, this.obstacleManager.airObstacles, this.hitObstacle, null, this);
    }

    createGround() {
        console.log("GameScene: Creando el suelo");
        const frogGround = this.physics.add.staticGroup();
        frogGround.create(500, 275, 'ground').setScale(2, 0.1).refreshBody();

        const bunnyGround = this.physics.add.staticGroup();
        bunnyGround.create(500, 600, 'ground').setScale(2, 0.1).refreshBody();

        this.physics.add.collider(this.frog.sprite, frogGround);
        this.physics.add.collider(this.bunny.sprite, bunnyGround);
    }

    update(time, delta) {
        if (!this.gameOver) {
            console.log("GameScene: Actualizando...");
            this.frog.update();
            this.bunny.update();

            this.obstacleManager.updateObstacleSpeed(this.scoreManager.getScore());
        }
    }

    hitObstacle(player, obstacle) {
        if (this.gameOver) return;
        console.log("GameScene: Colisión detectada, juego terminado");

        this.physics.pause();
        player.setTint(0xff0000);
        this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        this.gameOver = true;

        this.time.delayedCall(2000, () => {
            this.scene.restart();
        });
    }
}

export default GameScene;
