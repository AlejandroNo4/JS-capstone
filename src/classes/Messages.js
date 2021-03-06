import Phaser from 'phaser';

export default class Message extends Phaser.GameObjects.Container {
  constructor(scene, events) {
    super(scene, 260, 40);
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(-145, -25, 280, 60);
    graphics.fillRect(-145, -25, 280, 60);
    this.text = new Phaser.GameObjects.Text(scene, 0, 0, '', {
      color: '#ffffff',
      align: 'center',
      fontSize: 17,
      wordWrap: { width: 260, useAdvancedWrap: true },
    });
    this.add(this.text);
    this.text.setOrigin(0.5);
    events.on('Message', this.showMessage, this);
    this.visible = false;
  }

  showMessage(text) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({
      delay: 2000,
      callback: this.hideMessage,
      callbackScope: this,
    });
  }

  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  }
}