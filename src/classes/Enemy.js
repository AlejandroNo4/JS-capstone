import Unit from './Unit';

class Enemy extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage);
    this.setScale(2);
  }
}

export default Enemy;