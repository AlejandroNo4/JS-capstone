import BattleScene from '../src/scenes/BattleScene';

jest.mock('../src/scenes/BattleScene');

const connectMock = jest.fn();

BattleScene.mockImplementation(() => ({
  connect: connectMock,
}));

const mockedMethodImpl = jest.fn();

beforeAll(() => {
  BattleScene.mockImplementation(() => ({
    mockedMethod: mockedMethodImpl,
  }));
});

beforeEach(() => {
  BattleScene.mockClear();
  mockedMethodImpl.mockClear();
});

test('The game instance can be created', () => {
  const game = new BattleScene();
  expect(game).toBeTruthy();
});