import GamePlayScene from "../src/scenes/GamePlayScene"

jest.mock("../src/scenes/GamePlayScene");

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