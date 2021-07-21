import PointsScene from "../src/scenes/PointsScene"


jest.mock("../src/scenes/PointsScene");

const connectMock = jest.fn();

PointsScene.mockImplementation(() => ({
  connect: connectMock,
}));

const mockedMethodImpl = jest.fn();

beforeAll(() => {
  PointsScene.mockImplementation(() => ({
    mockedMethod: mockedMethodImpl,
  }));
});

beforeEach(() => {
  PointsScene.mockClear();
  mockedMethodImpl.mockClear();
});

test('The game instance can be created', () => {
  const game = new PointsScene();
  expect(game).toBeTruthy();
});