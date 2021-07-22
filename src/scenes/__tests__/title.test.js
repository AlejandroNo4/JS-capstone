import TitleScene from '../TitleScene';

jest.mock('../TitleScene');

const connectMock = jest.fn();

TitleScene.mockImplementation(() => ({
  connect: connectMock,
}));

const mockedMethodImpl = jest.fn();

beforeAll(() => {
  TitleScene.mockImplementation(() => ({
    mockedMethod: mockedMethodImpl,
  }));
});

beforeEach(() => {
  TitleScene.mockClear();
  mockedMethodImpl.mockClear();
});

test('The game instance can be created', () => {
  const game = new TitleScene();
  expect(game).toBeTruthy();
});