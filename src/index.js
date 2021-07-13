import { Start, GamePlay } from "./core-game";
import { Introduction } from "./introduction";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
          debug: true
      }
  },
  scene: [Start, GamePlay]
};

const game = new Phaser.Game(config);
