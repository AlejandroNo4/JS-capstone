import GameOverScene from '../GameOverScene';

jest.mock('../GameOverScene');

const connectMock = jest.fn();

GameOverScene.mockImplementation(() => ({
  connect: connectMock,
}));

const mockedMethodImpl = jest.fn();

beforeAll(() => {
  GameOverScene.mockImplementation(() => ({
    mockedMethod: mockedMethodImpl,
  }));
});

beforeEach(() => {
  GameOverScene.mockClear();
  mockedMethodImpl.mockClear();
});

test('The game instance can be created', () => {
  const game = new GameOverScene();
  expect(game).toBeTruthy();
});