import Menu from './Menu';

class HeroesMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.x = x;
    this.y = y;
    this.scene = scene;
  }
}

export default HeroesMenu;