import PreloadScene from "../src/scenes/PreloadScene"

jest.mock("../src/scenes/PreloadScene");

const connectMock = jest.fn();

PreloadScene.mockImplementation(() => ({
  connect: connectMock,
}));

const mockedMethodImpl = jest.fn();

beforeAll(() => {
  PreloadScene.mockImplementation(() => ({
    mockedMethod: mockedMethodImpl,
  }));
});

beforeEach(() => {
  PreloadScene.mockClear();
  mockedMethodImpl.mockClear();
});

test('The game instance can be created', () => {
  const game = new PreloadScene();
  expect(game).toBeTruthy();
});