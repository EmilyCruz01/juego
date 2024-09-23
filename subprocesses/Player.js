class Player {
    constructor(scene, x, y, texture) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x, y, texture).setDisplaySize(100, 100);
        this.scene.physics.world.gravity.y = 800; 
        this.onGround = true; 
    }

    update(jumpKey) {
        if (this.scene.input.keyboard.addKey(jumpKey).isDown && this.onGround) {
            this.sprite.setVelocityY(-400);
            this.onGround = false;
        }

        if (this.sprite.body.touching.down) {
            this.onGround = true;
        }
    }

    reset() {
        this.sprite.setPosition(this.initialX, this.initialY);
        this.sprite.setVelocity(0);
    }
}

export default Player;
