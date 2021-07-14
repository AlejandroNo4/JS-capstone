import { HeroesMenu, ActionsMenu, EnemiesMenu } from "../classes/Menu";
import Message from "../classes/Messages";

class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");
  }
  preload() {}

  remapHeroes() {
    let heroes = this.battleScene.heroes;
    this.heroesMenu.remap(heroes);
  }

  remapEnemies() {
    const enemies = this.battleScene.enemies;
    this.enemiesMenu.remap(enemies);
  }

  onKeyInput(event) {
    if (this.currentMenu && this.currentMenu.selected) {
      if (event.code === "ArrowUp") {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === "ArrowDown") {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === "ArrowRight" || event.code === "Shift") {
      } else if (event.code === "Space" || event.code === "ArrowLeft") {
        this.currentMenu.confirm();
      }
    }
  }

  onPlayerSelect(id) {
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  }

  onSelectAction() {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
  }

  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection("attack", index);
  }

  createMenu() {
    // map hero menu items to heroes
    this.remapHeroes();
    // map enemies menu items to enemies
    this.remapEnemies();
    // first move
    this.battleScene.nextTurn();
  }

  create() {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(2, 400, 220, 200);
    this.graphics.fillRect(2, 400, 220, 200);
    this.graphics.strokeRect(225, 400, 220, 200);
    this.graphics.fillRect(225, 400, 220, 200);
    this.graphics.strokeRect(448, 400, 350, 200);
    this.graphics.fillRect(448, 400, 350, 200);

    // basic container to hold all menus
    this.menus = this.add.container();

    this.heroesMenu = new HeroesMenu(460, 425, this);
    this.actionsMenu = new ActionsMenu(250, 425, this);
    this.enemiesMenu = new EnemiesMenu(8, 425, this);

    // the currently selected menu

    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    this.battleScene = this.scene.get("BattleScene");

    // listen for keyboard events
    this.input.keyboard.on("keydown", this.onKeyInput, this);

    // when its player cunit turn to move
    this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

    // when the action on the menu is selected
    // for now we have only one action so we dont send and action id
    this.events.on("SelectAction", this.onSelectAction, this);

    // an enemy is selected
    this.events.on("Enemy", this.onEnemy, this);

    // when the scene receives wake event
    this.sys.events.on("wake", this.createMenu, this);

    // the message describing the current action
    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.createMenu();
  }
}

export { UIScene };
