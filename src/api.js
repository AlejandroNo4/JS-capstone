import 'regenerator-runtime/runtime';

const gameId = 'bnRUsAVEu4IEeE9sFsQx';

async function postData(data = {}) {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    return err;
  }
}

async function getData() {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
  try {
    const response = await fetch(url, { mode: 'cors' });
    return response.json();
  } catch (err) {
    return err;
  }
}

export { postData, getData };