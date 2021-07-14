import { Start, GamePlay } from "./core-game";
import { BattleScene } from "./battle";
import { UIScene } from "./units";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Start, GamePlay, BattleScene, UIScene],
};

const game = new Phaser.Game(config);
