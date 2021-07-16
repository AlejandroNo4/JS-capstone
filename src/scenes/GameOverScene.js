class GameOverScene extends Phaser.Scene{
  constructor(){
    super("GameOverScene")
  }
  create(){
    this.sys.game.sound.stopAll();
    this.add.image(0,0, "game-over").setOrigin(0)
    let backButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.65, "back").setScale(1.5)


    this.clickSelectSound = this.sound.add("clickSelect");
    this.overSelectSound = this.sound.add("overSelect");

    backButton.setInteractive();
    backButton.on("pointerover",()=>{
      this.overSelectSound.play();
    })

    backButton.on("pointerup",()=>{
      this.clickSelectSound.play();
      this.scene.start("TitleScene")
    })

    
  }
}

export default GameOverScene