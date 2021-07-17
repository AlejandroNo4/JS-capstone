class GameOverScene extends Phaser.Scene{
  constructor(){
    super("GameOverScene")
  }

  init(data){
    this.finalScore = data.finalScore
  }

  create(){
    this.sys.game.sound.stopAll();
    this.add.image(0,0, "game-over").setOrigin(0)
    this.pointsText = this.add.text(this.game.renderer.width * 0.30, this.game.renderer.height * 0.30, `FINAL SCORE: ${this.finalScore}`, {
      fontSize: "35px",
      fontFamily: "arial",
      color: "#fff",
    });
    let backButton = this.add.image(this.game.renderer.width * 0.80, this.game.renderer.height * 0.90, "back")


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