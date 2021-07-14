class Start extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  preload() {
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

class GamePlay extends Phaser.Scene {
  constructor() {
    super("GamePlay");
  }

  preload() {}

  onMeetEnemy(player, zone) {
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake the world
    this.cameras.main.shake(300);

    this.scene.switch("BattleScene");
  }

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tilesetTerrain = map.addTilesetImage("map-tileset", "map-atlas");

    const terrain = map.createLayer("Terrain", tilesetTerrain, 0, 0);
    const obstacles = map.createLayer("Obstacles", tilesetTerrain, 0, 0);
    obstacles.setCollisionByExclusion([-1]);
    const details = map.createLayer("Details", tilesetTerrain, 0, 0);

    this.player = this.physics.add.sprite(400, 12750, "player", 64);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [64, 65, 66, 67, 68, 69, 70, 71],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [32, 33, 34, 35, 36, 37, 38, 39],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [24, 25, 26, 27, 28, 29, 30, 31],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "downLeft",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [16, 17, 18, 19, 20, 21, 22, 23],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "upLeft",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [48, 49, 50, 51, 52, 53, 54, 55],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "downRight",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [8, 9, 10, 11, 12, 13, 14, 15],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "upRight",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [40, 41, 42, 43, 44, 45, 46, 47],
      }),
      frameRate: 10,
    });

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, obstacles);

    this.enemies = this.physics.add.group({
      classType: Phaser.GameObjects.Zone,
    });
    for (let i = 0; i < 10; i++) {
      let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      this.enemies.create(x, y, 20, 20);
    }
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.onMeetEnemy,
      false,
      this
    );

    this.sys.events.on("wake", this.wake, this);
  }

  update() {
    this.player.body.setVelocity(0);
    this.player.body.allowGravity = false;

    this.moved = false;

    if (this.cursors.left.isDown) {
      this.moved = true;
      this.player.body.setVelocityX(-150);
    }
    if (this.cursors.right.isDown) {
      this.moved = true;
      this.player.body.setVelocityX(150);
    }
    if (this.cursors.up.isDown) {
      this.moved = true;
      this.player.body.setVelocityY(-150);
    }
    if (this.cursors.down.isDown) {
      this.moved = true;
      this.player.body.setVelocityY(150);
    }
    if (!this.moved) this.player.anims.stop();

    if (this.player.body.velocity.y == 0) {
      if (this.player.body.velocity.x < 0) {
        this.player.anims.play("left", true);
      } else if (this.player.body.velocity.x > 0) {
        this.player.anims.playReverse("right", true);
      }
    }
    if (this.player.body.velocity.x == 0) {
      if (this.player.body.velocity.y < 0) {
        this.player.anims.play("up", true);
      } else if (this.player.body.velocity.y > 0) {
        this.player.anims.play("down", true);
      }
    }
    if (
      this.player.body.velocity.x !== 0 &&
      this.player.body.velocity.y !== 0
    ) {
      if (this.player.body.velocity.x < 0 && this.player.body.velocity.y < 0) {
        this.player.anims.play("upLeft", true);
      } else if (
        this.player.body.velocity.x > 0 &&
        this.player.body.velocity.y > 0
      ) {
        this.player.anims.playReverse("downRight", true);
      } else if (
        this.player.body.velocity.x > 0 &&
        this.player.body.velocity.y < 0
      ) {
        this.player.anims.playReverse("upRight", true);
      } else if (
        this.player.body.velocity.x < 0 &&
        this.player.body.velocity.y > 0
      ) {
        this.player.anims.play("downLeft", true);
      }
    }
  }
}

export { Start, GamePlay };
