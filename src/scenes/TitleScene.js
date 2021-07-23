import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    this.add.image(0, 0, 'titleImg').setOrigin(0);
    this.playButton = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.65,
        'play',
      )
      .setScale(1.5);

    this.createForm();

    this.sound.pauseOnBlur = false;
    this.clickSelectSound = this.sound.add('clickSelect');
    this.overSelectSound = this.sound.add('overSelect');
    this.titleTheme = this.sound.add('title-music');

    this.titleTheme.play({ loop: true });

    this.playButton.setInteractive();
    this.playButton.on('pointerover', () => {
      this.overSelectSound.play();
    });

    this.playButton.on('pointerup', () => {
      this.clickSelectSound.play();
      this.scene.start('IntroductionScene');
    });
    this.playButton.visible = false;
  }

  createForm() {
    const { body } = document;
    const nameForm = document.createElement('form');
    const nameInput = document.createElement('input');
    nameInput.setAttribute('required', '');
    const label = document.createElement('p');
    label.innerText = 'Player name:';
    nameForm.appendChild(label);
    nameForm.appendChild(nameInput);
    nameForm.classList.add('formInputName', 'd-block');
    nameInput.classList.add('inputBox');
    label.classList.add('label');
    body.appendChild(nameForm);

    nameForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.playButton.visible = true;
      this.registry.set('name', nameInput.value);
      body.removeChild(body.lastChild);
    });
  }
}

export default TitleScene;
