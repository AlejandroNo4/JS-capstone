import IntroductionScene from '../IntroductionScene';

jest.mock('../IntroductionScene');

const connectMock = jest.fn();

IntroductionScene.mockImplementationOnce(() => ({
  constructor: connectMock,
}));

beforeEach(() => {
  IntroductionScene.mockClear();
});

test('The game instance can be created', () => {
  const game = new IntroductionScene();
  expect(game).toBeTruthy();
});

test('The IntroductionScene is an object', () => {
  const game = new IntroductionScene();
  expect(typeof game).toEqual('object');
});

test('Bad way to call a new IntroductionScene', () => {
  const game = IntroductionScene();
  expect(game).not.toEqual('object');
});

test("The game constructor doesn't have any argument", () => {
  const game = new IntroductionScene();
  game.constructor();
  expect(connectMock.mock.calls).not.toBe(game.constructor('Scene'));
});

test('The game declared function includes all declared functions', () => {
  const game = new IntroductionScene();
  expect(Object.keys(game)).toEqual(['create', 'update']);
});
