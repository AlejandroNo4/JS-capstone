import GamePlayScene from '../GamePlayScene';

jest.mock('../GamePlayScene');

const connectMock = jest.fn();

GamePlayScene.mockImplementationOnce(() => ({
  constructor: connectMock,
}));

beforeEach(() => {
  GamePlayScene.mockClear();
});

test('The game instance can be created', () => {
  const game = new GamePlayScene();
  expect(game).toBeTruthy();
});

test('The GamePlayScene is an object', () => {
  const game = new GamePlayScene();
  expect(typeof game).toEqual('object');
});

test('Bad way to call a new GamePlayScene', () => {
  const game = GamePlayScene();
  expect(game).not.toEqual('object');
});

test("The game constructor doesn't have any argument", () => {
  const game = new GamePlayScene();
  game.constructor();
  expect(connectMock.mock.calls).not.toBe(game.constructor('Scene'));
});

test('The game declared function includes all declared functions', () => {
  const game = new GamePlayScene();
  expect(Object.keys(game)).toEqual([
    'init',
    'create',
    'update',
    'createPlayer',
    'createMap',
    'createCrystals',
    'spawnCrystal',
    'createEnemiesZone',
    'createAudio',
    'collect',
    'onMeetEnemy',
    'wake',
  ]);
});
