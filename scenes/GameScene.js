import ScoreManager from '../subprocesses/ScoreManager.js';
import ObstacleManager from '../subprocesses/ObstacleManager.js';
import Player from '../subprocesses/Player.js'; 

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.scoreWorker = new Worker('../subprocesses/worker.js');
        this.scoreWorker.onmessage = this.handleScoreUpdate.bind(this);
        
        this.scoreIncrement = 100; 
        this.gameOver = false;
    }

    create() {
        console.log("GameScene iniciado");
        this.cameras.main.setBackgroundColor('#30d4ad');
       
        this.frog = new Player(this, 500, 100, 'frog');
        this.bunny = new Player(this, 500, 400, 'bunny');
    
        this.createGround();

        this.obstacleManager = new ObstacleManager(this);
        this.scoreManager = new ScoreManager(this);
    
        this.physics.add.overlap([this.frog.sprite, this.bunny.sprite], this.obstacleManager.getObstacles(), this.hitObstacle, null, this);
    }
    
    createGround() {
        const frogGround = this.physics.add.staticGroup();
        frogGround.create(500, 275, 'ground').setScale(2, 0.1).refreshBody();
    
        const bunnyGround = this.physics.add.staticGroup();
        bunnyGround.create(500, 600, 'ground').setScale(2, 0.1).refreshBody();
    
        this.physics.add.collider(this.frog.sprite, frogGround);
        this.physics.add.collider(this.bunny.sprite, bunnyGround);
    }

    update(time, delta) {
        if (!this.gameOver) {
            this.scoreWorker.postMessage({ type: 'update', delta: delta });

            this.frog.update(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.bunny.update(Phaser.Input.Keyboard.KeyCodes.W);

            this.scoreManager.addScore(this.scoreIncrement);
            this.obstacleManager.updateObstacleSpeed(this.scoreManager.getScore());
        }
    }

    handleScoreUpdate(event) {
        const score = event.data.score;
        this.scoreManager.updateScore(score);
    }

    hitObstacle(player, obstacle) {
        this.physics.pause(); 
        player.setTint(0xff0000); 
        this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        
        this.gameOver = true; 
        
        this.scoreManager.updateScore(0);
        this.scoreManager.score = 0; 
        
        this.frog.reset();
        this.bunny.reset();
        
        this.obstacleManager.clearObstacles();
        
        this.time.delayedCall(2000, () => {
            this.physics.resume(); 
            this.gameOver = false; 
            this.obstacleManager.spawnObstacles(); 
        });
    }
}

export default GameScene;
