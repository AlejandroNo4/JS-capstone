import Phaser from 'phaser';
import GameOverScene from './scenes/GameOverScene';
import InstructionsScene from './scenes/InstructionsScene';
import IntroductionScene from './scenes/IntroductionScene';
import TitleScene from './scenes/TitleScene';
import PreloadScene from './scenes/PreloadScene';
import PointsScene from './scenes/PointsScene';
import GamePlayScene from './scenes/GamePlayScene';
import BattleScene from './scenes/BattleScene';
import UIScene from './scenes/UIScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [
    PreloadScene,
    TitleScene,
    IntroductionScene,
    InstructionsScene,
    GamePlayScene,
    PointsScene,
    BattleScene,
    UIScene,
    GameOverScene,
  ],
};

const game = new Phaser.Game(config);

export default game;