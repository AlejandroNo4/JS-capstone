import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.loadSpritesheets();
    this.loadImages();
    this.loadMap();
    this.loadAudio();

    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(
        0,
        this.game.renderer.height / 2,
        this.game.renderer.width * percent,
        50,
      );
    });

    this.load.on('complete', () => {
      this.scene.start('TitleScene');
    });
  }

  loadImages() {
    this.load.image('white-crystal', './assets/images/whiteCrystal.png');
    this.load.image(
      'orange-plant',
      './assets/images/characters/enemy-plant-orange.png',
    );
    this.load.image(
      'blue-plant',
      './assets/images/characters/enemy-plant-blue.png',
    );
    this.load.image('titleImg', './assets/images/bg-btn/title-background.png');
    this.load.image('introduction', './assets/images/bg-btn/introduction.png');
    this.load.image('instructions', './assets/images/bg-btn/instructions.png');
    this.load.image('game-over', './assets/images/bg-btn/game-over.png');
    this.load.image('play', './assets/images/bg-btn/play-button.png');
    this.load.image('next', './assets/images/bg-btn/next-button.png');
    this.load.image('back', './assets/images/bg-btn/back-button.png');
  }

  loadMap() {
    this.load.image('map-atlas', './assets/map/mapTiles.png');
    this.load.tilemapTiledJSON('map', './assets/map/map.json');
  }

  loadSpritesheets() {
    this.load.spritesheet('player', './assets/images/characters/player.png', {
      frameHeight: 138.8,
      frameWidth: 109.5,
    });
  }

  loadAudio() {
    this.load.audio('pickup', './assets/audio/Pickup.wav');
    this.load.audio('overSelect', './assets/audio/over-select.wav');
    this.load.audio('clickSelect', './assets/audio/click-select.wav');
    this.load.audio('main-music', './assets/audio/main-music.mp3');
    this.load.audio('title-music', './assets/audio/title-music.mp3');
    this.load.audio('boss-battle', './assets/audio/boss-battle.mp3');
    this.load.audio('explosion', './assets/audio/explosion.wav');
    this.load.audio('punch', './assets/audio/punch.wav');
    this.load.audio('bot-hurt', './assets/audio/bot-hurt.mp3');
  }
}

export default PreloadScene;
