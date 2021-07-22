import PreloadScene from '../PreloadScene';

jest.mock('../PreloadScene');

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