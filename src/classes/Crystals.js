class Crystals extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.points = 30;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }
}

export { Crystals };
