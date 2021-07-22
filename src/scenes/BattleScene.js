import Phaser from 'phaser';
import Enemy from '../classes/Enemy';
import PlayerCharacter from '../classes/PlayerCharacter';

class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  init(data) {
    this.hp = data.score;
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);
    this.explosion = this.sound.add('explosion');
    this.punch = this.sound.add('punch');
    this.hurt = this.sound.add('bot-hurt');
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
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

  startBattle() {
    this.sys.game.sound.stopAll();
    this.battleTheme = this.sound.add('boss-battle');
    this.battleTheme.play({ loop: true });
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    const warrior = new PlayerCharacter(
      this,
      600,
      130,
      'player',
      1,
      'Robot cannon',
      this.hp,
      20,
    );
    this.add.existing(warrior);

    const BotFist = new PlayerCharacter(
      this,
      600,
      300,
      'player',
      25,
      'Robot fists',
      this.hp * 0.8,
      8,
    );
    this.add.existing(BotFist);

    const plantBlue = new Enemy(
      this,
      150,
      130,
      'blue-plant',
      null,
      'Enemy',
      50,
      15,
    );
    this.add.existing(plantBlue);

    const plantOrange = new Enemy(
      this,
      150,
      300,
      'orange-plant',
      null,
      'Enemy2',
      50,
      10,
    );
    this.add.existing(plantOrange);

    this.heroes = [warrior, BotFist];
    this.enemies = [plantBlue, plantOrange];
    this.units = this.heroes.concat(this.enemies);

    this.index = -1;

    this.scene.run('UIScene');
  }

  checkEndBattle() {
    let victory = true;
    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].living) victory = false;
    }
    let gameOver = true;
    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].living) gameOver = false;
    }
    return victory || gameOver;
  }

  endBattle() {
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i += 1) {
      this.units[i].destroy();
    }
    this.units.length = 0;
    this.scene.sleep('UIScene');
    this.scene.start('GameOverScene', { finalScore: this.hp });
  }

  nextTurn() {
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      this.index += 1;
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);
    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerSelect', this.index);
    } else {
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      this.units[this.index].attack(this.heroes[r]);
      this.hurt.play();
      this.time.addEvent({
        delay: 3000,
        callback: this.nextTurn,
        callbackScope: this,
      });
    }
  }
}

export default BattleScene;
