import PointsScene from '../PointsScene';

jest.mock('../PointsScene');

const connectMock = jest.fn();

PointsScene.mockImplementationOnce(() => ({
  constructor: connectMock,
}));

beforeEach(() => {
  PointsScene.mockClear();
});

test('The game instance can be created', () => {
  const game = new PointsScene();
  expect(game).toBeTruthy();
});

test('The PointsScene is an object', () => {
  const game = new PointsScene();
  expect(typeof game).toEqual('object');
});

test('Bad way to call a new PointsScene', () => {
  const game = PointsScene();
  expect(game).not.toEqual('object');
});

test("The game constructor doesn't have any argument", () => {
  const game = new PointsScene();
  game.constructor();
  expect(connectMock.mock.calls).not.toBe(game.constructor('Scene'));
});

test('The game declared function includes all declared functions', () => {
  const game = new PointsScene();
  expect(Object.keys(game)).toEqual([
    'init',
    'create',
    'setUpElements',
    'setUpEvents',
    'update',
  ]);
});
