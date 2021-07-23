import UIScene from '../UIScene';

jest.mock('../UIScene');

const connectMock = jest.fn();

UIScene.mockImplementationOnce(() => ({
  constructor: connectMock,
}));

beforeEach(() => {
  UIScene.mockClear();
});

test('The game instance can be created', () => {
  const game = new UIScene();
  expect(game).toBeTruthy();
});

test('The UIScene is an object', () => {
  const game = new UIScene();
  expect(typeof game).toEqual('object');
});

test('Bad way to call a new UIScene', () => {
  const game = UIScene();
  expect(game).not.toEqual('object');
});

test("The game constructor doesn't have any argument", () => {
  const game = new UIScene();
  game.constructor();
  expect(connectMock.mock.calls).not.toBe(game.constructor('Scene'));
});

test('The game declared function includes all declared functions', () => {
  const game = new UIScene();
  expect(Object.keys(game)).toEqual([
    'remapHeroes',
    'remapEnemies',
    'onKeyInput',
    'onPlayerSelect',
    'onSelectAction',
    'onEnemy',
    'createMenu',
    'create',
    'update',
  ]);
});
