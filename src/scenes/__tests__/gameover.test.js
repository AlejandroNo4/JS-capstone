import GameOverScene from '../GameOverScene';

jest.mock('../GameOverScene');

const connectMock = jest.fn();

GameOverScene.mockImplementationOnce(() => ({
  constructor: connectMock,
}));

beforeEach(() => {
  GameOverScene.mockClear();
});

test('The game instance can be created', () => {
  const game = new GameOverScene();
  expect(game).toBeTruthy();
});

test('The GameOverScene is an object', () => {
  const game = new GameOverScene();
  expect(typeof game).toEqual('object');
});

test('Bad way to call a new GameOverScene', () => {
  const game = GameOverScene();
  expect(game).not.toEqual('object');
});

test("The game constructor doesn't have any argument", () => {
  const game = new GameOverScene();
  game.constructor();
  expect(connectMock.mock.calls).not.toBe(game.constructor('Scene'));
});

test('The game declared function includes all declared functions', () => {
  const game = new GameOverScene();
  expect(Object.keys(game)).toEqual(['init', 'create', 'topScores', 'update']);
});
