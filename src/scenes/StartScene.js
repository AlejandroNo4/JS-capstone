class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  preload() {
    this.load.image("white-crystal", "./assets/images/whiteCrystal.png");
    this.load.image("blue-crystal", "./assets/images/blueCrystal.png");
    this.load.image("green-crystal", "./assets/images/greenCrystal.png");

    this.load.audio("pickup", "./assets/audio/Pickup.wav")

    this.load.image("map-atlas", "./assets/map/mapTiles.png");
    this.load.tilemapTiledJSON("map", "./assets/map/map.json");

    this.load.spritesheet("player", "./assets/images/characters/player.png", {
      frameHeight: 138.8,
      frameWidth: 109.5,
    });

    this.load.image(
      "blue-plant",
      "./assets/images/characters/enemy-plant-blue.png"
    );
    this.load.image(
      "orange-plant",
      "./assets/images/characters/enemy-plant-orange.png"
    );
  }

  create() {
    this.scene.start("GamePlay");
  }
}



export { StartScene };
