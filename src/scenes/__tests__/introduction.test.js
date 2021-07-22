import IntroductionScene from '../IntroductionScene';

jest.mock('../IntroductionScene');

const connectMock = jest.fn();

IntroductionScene.mockImplementation(() => ({
  connect: connectMock,
}));

const mockedMethodImpl = jest.fn();

beforeAll(() => {
  IntroductionScene.mockImplementation(() => ({
    mockedMethod: mockedMethodImpl,
  }));
});

beforeEach(() => {
  IntroductionScene.mockClear();
  mockedMethodImpl.mockClear();
});

test('The game instance can be created', () => {
  const game = new IntroductionScene();
  expect(game).toBeTruthy();
});