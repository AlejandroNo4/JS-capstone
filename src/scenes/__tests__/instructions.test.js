import InstructionsScene from '../InstructionsScene';

jest.mock('../InstructionsScene');

const connectMock = jest.fn();

InstructionsScene.mockImplementationOnce(() => ({
  constructor: connectMock,
}));

beforeEach(() => {
  InstructionsScene.mockClear();
});

test('The game instance can be created', () => {
  const game = new InstructionsScene();
  expect(game).toBeTruthy();
});

test('The InstructionsScene is an object', () => {
  const game = new InstructionsScene();
  expect(typeof game).toEqual('object');
});

test('Bad way to call a new InstructionsScene', () => {
  const game = InstructionsScene();
  expect(game).not.toEqual('object');
});

test("The game constructor doesn't have any argument", () => {
  const game = new InstructionsScene();
  game.constructor();
  expect(connectMock.mock.calls).not.toBe(game.constructor('Scene'));
});

test('The game declared function includes all declared functions', () => {
  const game = new InstructionsScene();
  expect(Object.keys(game)).toEqual(['create', 'update']);
});
