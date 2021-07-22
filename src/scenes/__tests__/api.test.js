import { getData, postData } from "../../api";

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({user: "example", score: 40}),
}));

test('if returned value is correct', async () => {
  const json = await getData();
  expect(typeof json).toBe('object');
});

test('the length is only the top 5', async () => {
  const json = await getData();
  console.log(json)
});

test('if fetch has been called one time', async () => {
  const json = await postData({user: "example", score: 20 })
  console.log(json)
});