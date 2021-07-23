import { getData, postData } from '../../api';

require('jest-fetch-mock').enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

test('if returned value is correct', async () => {
  fetch.mockResponseOnce(JSON.stringify({ user: 'example', score: 45 }));
  const json = await getData();
  expect(json).toEqual({ user: 'example', score: 45 });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bnRUsAVEu4IEeE9sFsQx/scores/',
    { mode: 'cors' },
  );
});

test('getData returns a rejection when catch errors', async () => {
  fetch.mockReject(() => Promise.reject(new Error('Something wrong happened')));
  const json = await getData();
  expect(json).toEqual(Error('Something wrong happened'));
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bnRUsAVEu4IEeE9sFsQx/scores/',
    { mode: 'cors' },
  );
});

test('if new data has been posted succesfully', async () => {
  fetch.mockResponseOnce(
    JSON.stringify({ result: 'Leaderboard score created correctly.' }),
  );
  const newData = await postData({ user: 'example', score: 45 });
  expect(newData).toEqual({ result: 'Leaderboard score created correctly.' });
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('postData returns a rejection when catch errors', async () => {
  fetch.mockReject(() => Promise.reject(new Error('Something wrong happened')));
  const json = await postData({ user: '', score: null });
  expect(json).toEqual(Error('Something wrong happened'));
  expect(fetch).toHaveBeenCalledTimes(1);
});
