import GamePlayScene from '../GamePlayScene';

jest.mock('../GamePlayScene');

const connectMock = jest.fn();

GamePlayScene.mockImplementation(() => ({
  connect: connectMock,
}));

const mockedMethodImpl = jest.fn();

beforeAll(() => {
  GamePlayScene.mockImplementation(() => ({
    mockedMethod: mockedMethodImpl,
  }));
});

beforeEach(() => {
  GamePlayScene.mockClear();
  mockedMethodImpl.mockClear();
});

test('The game instance can be created', () => {
  const game = new GamePlayScene();
  expect(game).toBeTruthy();
});