import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.setDepth(1);
    this.scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);
    this.scene.add.existing(this);

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [64, 65, 66, 67, 68, 69, 70, 71],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [32, 33, 34, 35, 36, 37, 38, 39],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [24, 25, 26, 27, 28, 29, 30, 31],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'downLeft',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [16, 17, 18, 19, 20, 21, 22, 23],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'upLeft',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [48, 49, 50, 51, 52, 53, 54, 55],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'downRight',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [8, 9, 10, 11, 12, 13, 14, 15],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'upRight',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [40, 41, 42, 43, 44, 45, 46, 47],
      }),
      frameRate: 10,
    });
  }

  update(cursors) {
    this.body.setVelocity(0);
    this.body.allowGravity = false;

    this.moved = false;

    if (cursors.left.isDown) {
      this.moved = true;
      this.body.setVelocityX(-150);
    }
    if (cursors.right.isDown) {
      this.moved = true;
      this.body.setVelocityX(150);
    }
    if (cursors.up.isDown) {
      this.moved = true;
      this.body.setVelocityY(-150);
    }
    if (cursors.down.isDown) {
      this.moved = true;
      this.body.setVelocityY(150);
    }
    if (!this.moved) this.anims.stop();

    if (this.body.velocity.y === 0) {
      if (this.body.velocity.x < 0) {
        this.anims.play('left', true);
      } else if (this.body.velocity.x > 0) {
        this.anims.playReverse('right', true);
      }
    }
    if (this.body.velocity.x === 0) {
      if (this.body.velocity.y < 0) {
        this.anims.play('up', true);
      } else if (this.body.velocity.y > 0) {
        this.anims.play('down', true);
      }
    }
    if (this.body.velocity.x !== 0 && this.body.velocity.y !== 0) {
      if (this.body.velocity.x < 0 && this.body.velocity.y < 0) {
        this.anims.play('upLeft', true);
      } else if (this.body.velocity.x > 0 && this.body.velocity.y > 0) {
        this.anims.playReverse('downRight', true);
      } else if (this.body.velocity.x > 0 && this.body.velocity.y < 0) {
        this.anims.playReverse('upRight', true);
      } else if (this.body.velocity.x < 0 && this.body.velocity.y > 0) {
        this.anims.play('downLeft', true);
      }
    }
  }
}

export default Player;
