import TitleScene from '../TitleScene';

jest.mock('../TitleScene');

const connectMock = jest.fn();

TitleScene.mockImplementationOnce(() => ({
  constructor: connectMock,
}));

beforeEach(() => {
  TitleScene.mockClear();
});

test('The game instance can be created', () => {
  const game = new TitleScene();
  expect(game).toBeTruthy();
});

test('The TitleScene is an object', () => {
  const game = new TitleScene();
  expect(typeof game).toEqual('object');
});

test('Bad way to call a new TitleScene', () => {
  const game = TitleScene();
  expect(game).not.toEqual('object');
});

test("The game constructor doesn't have any argument", () => {
  const game = new TitleScene();
  game.constructor();
  expect(connectMock.mock.calls).not.toBe(game.constructor('Scene'));
});

test('The game declared function includes all declared functions', () => {
  const game = new TitleScene();
  expect(Object.keys(game)).toEqual(['create', 'createForm', 'update']);
});
