import PreloadScene from '../PreloadScene';

jest.mock('../PreloadScene');

const connectMock = jest.fn();

PreloadScene.mockImplementationOnce(() => ({
  constructor: connectMock,
}));

beforeEach(() => {
  PreloadScene.mockClear();
});

test('The game instance can be created', () => {
  const game = new PreloadScene();
  expect(game).toBeTruthy();
});

test('The PreloadScene is an object', () => {
  const game = new PreloadScene();
  expect(typeof game).toEqual('object');
});

test('Bad way to call a new PreloadScene', () => {
  const game = PreloadScene();
  expect(game).not.toEqual('object');
});

test("The game constructor doesn't have any argument", () => {
  const game = new PreloadScene();
  game.constructor();
  expect(connectMock.mock.calls).not.toBe(game.constructor('Scene'));
});

test('The game declared function includes all declared functions', () => {
  const game = new PreloadScene();
  expect(Object.keys(game)).toEqual([
    'preload',
    'loadImages',
    'loadMap',
    'loadSpritesheets',
    'loadAudio',
    'update',
  ]);
});
