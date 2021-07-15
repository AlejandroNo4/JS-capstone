class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  preload() {
    this.loadSpritesheets()
    this.loadImages()
    this.loadMap()
    this.loadAudio()
  }

  loadImages(){
    this.load.image("white-crystal", "./assets/images/whiteCrystal.png");
    this.load.image("orange-plant","./assets/images/characters/enemy-plant-orange.png");
    this.load.image("blue-plant", "./assets/images/characters/enemy-plant-blue.png");
  }

  loadMap(){
    this.load.image("map-atlas", "./assets/map/mapTiles.png");
    this.load.tilemapTiledJSON("map", "./assets/map/map.json");
  }

  loadSpritesheets(){
    this.load.spritesheet("player", "./assets/images/characters/player.png", {
      frameHeight: 138.8,
      frameWidth: 109.5,
    });
  }

  loadAudio(){
    this.load.audio("pickup", "./assets/audio/Pickup.wav")
  }

  create() {
    this.scene.start("GamePlay");
  }
}



export { StartScene };
