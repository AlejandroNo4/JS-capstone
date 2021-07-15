class PointsScene extends Phaser.Scene {
  constructor() {
    super("PointsScene");
  }

  init() {
    this.gameScene = this.scene.get("GamePlay");
  }

  create() {
    this.setUpElements();
    this.setUpEvents();
  }

  setUpElements() {
    this.pointsText = this.add.text(35, 8, "Points: 0", {
      fontSize: "16px",
      fontFamily: "arial",
      color: "#000",
    });
  }

  setUpEvents() {
    this.gameScene.events.on("updateScore", (points) =>{
      this.pointsText.setText(`Points: ${points}`)
    })
  }
}

export { PointsScene };
