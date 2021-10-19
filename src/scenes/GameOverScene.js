import Phaser from 'phaser';
import { postData, getData } from '../api';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.finalScore = data.finalScore;
  }

  create() {
    this.userName = this.registry.get('name');

    this.body = document.body;
    this.sys.game.sound.stopAll();
    this.add.image(0, 0, 'game-over').setOrigin(0);
    this.pointsText = this.add.text(
      this.game.renderer.width * 0.3,
      this.game.renderer.height * 0.25,
      `Your final score: ${this.finalScore}`,
      {
        fontSize: '35px',
        fontFamily: 'arial',
        color: '#fff',
      },
    );
    const backButton = this.add.image(
      this.game.renderer.width * 0.8,
      this.game.renderer.height * 0.9,
      'back',
    );

    this.clickSelectSound = this.sound.add('clickSelect');
    this.overSelectSound = this.sound.add('overSelect');

    backButton.setInteractive();
    backButton.on('pointerover', () => {
      this.overSelectSound.play();
    });

    backButton.on('pointerup', () => {
      this.clickSelectSound.play();
      this.body.removeChild(
        this.body.childNodes[this.body.childNodes.length - 2],
      );
      this.scene.start('TitleScene');
    });

    this.topScores();
  }

  topScores() {
    postData({ user: this.userName, score: this.finalScore }).then(async () => {
      const result = await getData();
      const sortByMinNum = (a, b) => b.score - a.score;
      const topScores = Object.values(result.result)
        .sort(sortByMinNum)
        .slice(0, 5);

      const listContainer = document.createElement('ul');
      const labelItem = document.createElement('li');
      labelItem.classList.add('label');
      labelItem.innerText = 'Top scores:';
      listContainer.appendChild(labelItem);
      listContainer.classList.add('list');
      for (let i = 0; i < 5; i += 1) {
        const listItem = document.createElement('li');
        const itemName = document.createElement('p');
        const itemScore = document.createElement('p');
        itemName.innerText = topScores[i].user;
        listItem.appendChild(itemName);
        itemScore.innerText = topScores[i].score;
        listItem.appendChild(itemScore);
        listItem.classList.add('item-list');
        listContainer.appendChild(listItem);
      }
      this.body.insertBefore(listContainer, this.body.lastChild);
    });
  }
}

export default GameOverScene;
