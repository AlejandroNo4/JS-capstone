import Menu from './Menu';

class EnemiesMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.x = x;
    this.y = y;
    this.scene = scene;
  }

  confirm() {
    this.scene.events.emit('Enemy', this.menuItemIndex);
  }
}

export default EnemiesMenu;
