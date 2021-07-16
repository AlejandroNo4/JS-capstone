class TitleScene extends Phaser.Scene{
  constructor(){
    super("TitleScene")
  }

  
  create(){
    this.add.image(0,0, "titleImg").setOrigin(0)
    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.65, "play").setScale(1.5)

    this.sound.pauseOnBlur = false
    this.clickSelectSound = this.sound.add("clickSelect");
    this.overSelectSound = this.sound.add("overSelect");
    this.mainTheme = this.sound.add("title-music")

    this.mainTheme.play({loop: true})

    playButton.setInteractive();
    playButton.on("pointerover",()=>{
      this.overSelectSound.play();
    })

    playButton.on("pointerup",()=>{
      this.clickSelectSound.play();
      this.scene.start("IntroductionScene")
    })

    
  }

}

export default TitleScene