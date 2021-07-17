import { PlayerCharacter, Enemy } from "../classes/Unit";

class BattleScene extends Phaser.Scene {
  constructor() {
    super("BattleScene");
  }

  init(data){
    this.hp = data.score
  }

  create() {
    // change the background to green
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
    this.startBattle();
    // on wake event we call startBattle too
    this.sys.events.on("wake", this.startBattle, this);
    this.explosion = this.sound.add("explosion");
    this.punch = this.sound.add("punch");
    this.hurt = this.sound.add("bot-hurt");
  }

  receivePlayerSelection(action, target) {
    if (action == "attack") {
      this.units[this.index].attack(this.enemies[target]);

      if (this.index === 0) {
        this.explosion.play();
      } else if (this.index === 1) {
        this.punch.play();
      }
    }
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this,
    });
  }

  exitBattle() {
    this.scene.sleep("UIScene");
    this.scene.switch("GamePlay");
  }

  wake() {
    this.scene.run("UIScene");
    this.time.addEvent({
      delay: 2000,
      callback: this.exitBattle,
      callbackScope: this,
    });
  }

  startBattle() {
    this.sys.game.sound.stopAll();
    this.battleTheme = this.sound.add("boss-battle");
    this.battleTheme.play({ loop: true });
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");

    // player character - warrior
    const warrior = new PlayerCharacter(
      this,
      600,
      130,
      "player",
      1,
      "BotHero's cannions",
      this.hp,
      20
    );
    this.add.existing(warrior);

    // player character - BotFist
    const BotFist = new PlayerCharacter(
      this,
      600,
      300,
      "player",
      25,
      "Bot Fists",
      this.hp * 0.8,
      8
    );
    this.add.existing(BotFist);

    const plantBlue = new Enemy(
      this,
      150,
      130,
      "blue-plant",
      null,
      "Enemy",
      50,
      3
    );
    this.add.existing(plantBlue);

    const plantOrange = new Enemy(
      this,
      150,
      300,
      "orange-plant",
      null,
      "Enemy2",
      50,
      3
    );
    this.add.existing(plantOrange);

    // array with heroes
    this.heroes = [warrior, BotFist];
    // array with enemies
    this.enemies = [plantBlue, plantOrange];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1; // currently active unit

    this.scene.run("UIScene");
  }

  checkEndBattle() {
    let victory = true;
    // if all enemies are dead we have victory
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].living) victory = false;
    }
    let gameOver = true;
    // if all heroes are dead we have game over
    for (let i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].living) gameOver = false;
    }
    return victory || gameOver;
  }

  endBattle() {
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i++) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
    // sleep the UI
    this.scene.sleep("UIScene");
    // return to WorldScene and sleep current BattleScene
    this.scene.start("GameOverScene", { finalScore: this.hp});
  }

  nextTurn() {
    // if we have victory or game over
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      // currently active unit
      this.index++;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);
    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      // we need the player to select action and then enemy
      this.events.emit("PlayerSelect", this.index);
    } else {
      // else if its enemy unit
      // pick random living hero to be attacked
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      // call the enemy's attack function
      this.units[this.index].attack(this.heroes[r]);
      this.hurt.play();
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({
        delay: 3000,
        callback: this.nextTurn,
        callbackScope: this,
      });
    }
  }
}

export { BattleScene };
