import Phaser from "phaser";
class IntroductionScene extends Phaser.Scene {
  constructor() {
    super("IntroductionScene");
  }
  create() {
    this.add.image(0, 0, "introduction").setOrigin(0);
    let nextButton = this.add.image(
      this.game.renderer.width * 0.8,
      this.game.renderer.height * 0.9,
      "next"
    );
    let backButton = this.add.image(
      this.game.renderer.width * 0.2,
      this.game.renderer.height * 0.9,
      "back"
    );

    this.clickSelectSound = this.sound.add("clickSelect");
    this.overSelectSound = this.sound.add("overSelect");

    backButton.setInteractive();
    backButton.on("pointerover", () => {
      this.overSelectSound.play();
    });

    backButton.on("pointerup", () => {
      this.clickSelectSound.play();
      this.sys.game.sound.stopAll();
      this.scene.start("TitleScene");
    });

    nextButton.setInteractive();
    nextButton.on("pointerover", () => {
      this.overSelectSound.play();
    });

    nextButton.on("pointerup", () => {
      this.clickSelectSound.play();
      this.scene.start("InstructionsScene");
    });
  }
}

export default IntroductionScene;
