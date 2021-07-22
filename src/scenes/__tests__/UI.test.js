import UIScene from '../UIScene';

jest.mock('../UIScene');

const connectMock = jest.fn();

UIScene.mockImplementation(() => ({
  connect: connectMock,
}));

const mockedMethodImpl = jest.fn();

beforeAll(() => {
  UIScene.mockImplementation(() => ({
    mockedMethod: mockedMethodImpl,
  }));
});

beforeEach(() => {
  UIScene.mockClear();
  mockedMethodImpl.mockClear();
});

test('The game instance can be created', () => {
  const game = new UIScene();
  expect(game).toBeTruthy();
});