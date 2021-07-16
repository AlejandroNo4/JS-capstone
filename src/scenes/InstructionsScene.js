class InstructionsScene extends Phaser.Scene{
  constructor(){
    super("InstructionsScene")
  }
  create(){
    this.add.image(0,0, "instructions").setOrigin(0)
    let nextButton = this.add.image(this.game.renderer.width * 0.80, this.game.renderer.height * 0.90, "next")
    let backButton = this.add.image(this.game.renderer.width * 0.20, this.game.renderer.height * 0.90, "back")

    this.clickSelectSound = this.sound.add("clickSelect");
    this.overSelectSound = this.sound.add("overSelect");
    this.mainTheme = this.sound.add("main-music")

    backButton.setInteractive();
    backButton.on("pointerover",()=>{
      this.overSelectSound.play();
    })

    backButton.on("pointerup",()=>{
      this.clickSelectSound.play();
      this.scene.start("IntroductionScene")
    })


    nextButton.setInteractive();
    nextButton.on("pointerover",()=>{
      this.overSelectSound.play();
    })

    nextButton.on("pointerup",()=>{
      this.clickSelectSound.play();
      this.sys.game.sound.stopAll();
      this.mainTheme.play({loop: true})
      this.scene.start("GamePlay")
    })

    
  }
}

export default InstructionsScene