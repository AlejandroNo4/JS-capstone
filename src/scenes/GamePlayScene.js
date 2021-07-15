import { Player } from "../classes/Player";
import { Crystals } from "../classes/Crystals";

class GamePlayScene extends Phaser.Scene {
  constructor() {
    super("GamePlay");
  }

  init() {
    this.scene.launch("PointsScene");
    this.score = 0
  }

  create() {

    this.createPlayer()
    this.createMap()
    this.createCrystals()
    this.createEnemiesZone()
    this.createAudio()

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(
      this.player,
      this.crystalsGroup,
      this.collect,
      null,
      this
    );

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
    this.player.update(this.cursors);
  }

  createPlayer(){
    this.player = new Player(this, 200, 1100, "player", 1);
  }

  createMap(){
    const map = this.make.tilemap({ key: "map" });
    const tilesetTerrain = map.addTilesetImage("map-tileset", "map-atlas");
    const terrain = map.createLayer("Terrain", tilesetTerrain, 0, 0);
    const obstacles = map.createLayer("Obstacles", tilesetTerrain, 0, 0);
    obstacles.setCollisionByExclusion([-1]);
    const details = map.createLayer("Details", tilesetTerrain, 0, 0);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.physics.add.collider(this.player, obstacles);
  }

  createCrystals(){
    this.crystalsGroup = this.physics.add.group()
    for (let i = 0; i < 30; i++) {
      this.spawnCrystal()
    }
  }

  spawnCrystal(){
    let x = Phaser.Math.RND.between(0, 900);
    let y = Phaser.Math.RND.between(0, 800);
    let crystal = new Crystals(this, x, y, "white-crystal").setScale(0.07);
    this.crystalsGroup.add(crystal)
  }

  createEnemiesZone(){
    this.enemies = this.physics.add.group({
      classType: Phaser.GameObjects.Zone,
    });
    this.enemies.create(900, 100, 100, 50);
  }

  createAudio(){
    this.crystalPickupSound = this.sound.add("pickup");
  }

  collect(player, crystal) {
    this.crystalPickupSound.play();
    this.score += crystal.points
    this.events.emit("updateScore", this.score)
    crystal.destroy();
    console.log(crystal.points);
  }

  onMeetEnemy(zone) {
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    this.scene.switch("BattleScene");
  }

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

}

export { GamePlayScene };


