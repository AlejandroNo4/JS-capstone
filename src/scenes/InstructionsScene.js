import Phaser from 'phaser';

class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('InstructionsScene');
  }

  create() {
    this.add.image(0, 0, 'instructions').setOrigin(0);
    const nextButton = this.add.image(
      this.game.renderer.width * 0.8,
      this.game.renderer.height * 0.9,
      'next',
    );
    const backButton = this.add.image(
      this.game.renderer.width * 0.2,
      this.game.renderer.height * 0.9,
      'back',
    );

    this.clickSelectSound = this.sound.add('clickSelect');
    this.overSelectSound = this.sound.add('overSelect');
    this.mainTheme = this.sound.add('main-music');

    backButton.setInteractive();
    backButton.on('pointerover', () => {
      this.overSelectSound.play();
    });

    backButton.on('pointerup', () => {
      this.clickSelectSound.play();
      this.scene.start('IntroductionScene');
    });

    nextButton.setInteractive();
    nextButton.on('pointerover', () => {
      this.overSelectSound.play();
    });

    nextButton.on('pointerup', () => {
      this.clickSelectSound.play();
      this.sys.game.sound.stopAll();
      this.mainTheme.play({ loop: true });
      this.scene.start('GamePlay');
    });
  }
}

export default InstructionsScene;
