import BattleScene from '../BattleScene';

jest.mock('../BattleScene');

const connectMock = jest.fn();

BattleScene.mockImplementationOnce(() => ({
  constructor: connectMock,
}));

beforeEach(() => {
  BattleScene.mockClear();
});

test('The game instance can be created', () => {
  const game = new BattleScene();
  expect(game).toBeTruthy();
});

test('The BattleScene is an object', () => {
  const game = new BattleScene();
  expect(typeof game).toEqual('object');
});

test('Bad way to call a new BattleScene', () => {
  const game = BattleScene();
  expect(game).not.toEqual('object');
});

test("The game constructor doesn't have any argument", () => {
  const game = new BattleScene();
  game.constructor();
  expect(connectMock.mock.calls).not.toBe(game.constructor('Scene'));
});

test('The game declared function includes all declared functions', () => {
  const game = new BattleScene();
  expect(Object.keys(game)).toEqual([
    'init',
    'create',
    'receivePlayerSelection',
    'startBattle',
    'checkEndBattle',
    'endBattle',
    'nextTurn',
    'update',
  ]);
});
