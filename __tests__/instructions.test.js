import InstructionsScene from "../src/scenes/InstructionsScene"

jest.mock("../src/scenes/InstructionsScene");

const connectMock = jest.fn();

InstructionsScene.mockImplementation(() => ({
  connect: connectMock,
}));

const mockedMethodImpl = jest.fn();

beforeAll(() => {
  InstructionsScene.mockImplementation(() => ({
    mockedMethod: mockedMethodImpl,
  }));
});

beforeEach(() => {
  InstructionsScene.mockClear();
  mockedMethodImpl.mockClear();
});

test('The game instance can be created', () => {
  const game = new InstructionsScene();
  expect(game).toBeTruthy();
});