import Unit from './Unit';

class PlayerCharacter extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage);
    this.flipX = true;

    this.setScale(1.5);
  }
}

export default PlayerCharacter;