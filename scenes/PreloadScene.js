class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        console.log("PreloadScene: Cargando assets...");
        this.load.image("frog", "./assets/froggy-resting.png");
        this.load.image("bunny", "./assets/bunny-resting.png");
        this.load.image("water", "./assets/water.png");
        this.load.image("balloon", "./assets/balloon.png");
        this.load.image("ground", "./assets/ground.png");
    }

    create() {
        console.log("PreloadScene: Assets cargados, pasando a GameScene");
        this.scene.start('GameScene');
    }
}

export default PreloadScene;
