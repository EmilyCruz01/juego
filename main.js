import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';

const config = {
    width: 1528,
    height: 676,
    parent: "container",
    type: Phaser.AUTO,
    scene: [PreloadScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    }
};

var game = new Phaser.Game(config);
