import { StartScene } from "./scenes/StartScene";
import { GamePlayScene } from "./scenes/GamePlayScene";
import { BattleScene } from "./scenes/BattleScene";
import { UIScene } from "./scenes/UIScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [StartScene, GamePlayScene, BattleScene, UIScene],
};

const game = new Phaser.Game(config);
