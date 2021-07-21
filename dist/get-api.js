// const gameId = "bnRUsAVEu4IEeE9sFsQx";
// let user = "Henry";
// let score = 99;

// async function postData(data = {}) {
//   const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       mode: "cors",
//       cache: "no-cache",
//       credentials: "same-origin",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       redirect: "follow",
//       referrerPolicy: "no-referrer",
//       body: JSON.stringify(data),
//     });
//     return response.json();
//   } catch (err) {
//     return err;
//   }
// }

// async function getData() {
//   const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
//   try {
//     const response = await fetch(url, { mode: "cors" });
//     return response.json();
//   } catch (err) {
//     return err;
//   }
// }

// const asortResult = async () => {
//   const result = await getData();
//   const sortByMinNum = (a, b) => b.score - a.score;
//   const topScores = Object.values(result.result).sort(sortByMinNum).slice(0, 5);
//   console.log(topScores);
// };

// postData({ user: user, score: score }).then((data) => {
//   asortResult();
// });

class Testii {
  constructor(x) {
    this.x = x;
  }
}

export default Testii;
