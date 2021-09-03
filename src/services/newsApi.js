import axios from 'axios';

axios.defaults.baseURL = 'https://api.hnpwa.com/v0/';

const fetchNews = (currentPage = 1) => {
  return axios
    .get(`news/${currentPage}.json`)
    .then(({ data }) => data)
    .catch(err => {
      console.error('Error: ', err);
    });
};

const fetchNewest = (currentPage = 1) => {
  return axios
    .get(`newest/${currentPage}.json`)
    .then(({ data }) => data)
    .catch(err => {
      console.error('Error: ', err);
    });
};

const fetchComments = id => {
  return axios
    .get(`item/${id}.json`)
    .then(({ data }) => data)
    .catch(err => {
      console.error('Error: ', err);
    });
};

// const BASE_URL = 'https://api.hnpwa.com/v0/';

// const fetchNews = (currentPage = 1) => {
//   return fetch(`${BASE_URL}news/${currentPage}.json`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       mode: 'no-cors',
//     },
//   })
//     .then(response => {
//       if (response.ok) return response.json();
//       throw new Error('Error fetching data');
//     })
//     .catch(err => {
//       console.error('Error: ', err);
//     });
// };

// const fetchComments = id => {
//   return fetch(`${BASE_URL}item/${id}.json`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       mode: 'no-cors',
//     },
//   })
//     .then(response => {
//       if (response.ok) return response.json();
//       throw new Error('Error fetching data');
//     })
//     .catch(err => {
//       console.error('Error: ', err);
//     });
// };

// const fetchNewest = (currentPage = 1) => {
//   return fetch(`${BASE_URL}newest/${currentPage}.json`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       mode: 'no-cors',
//     },
//   })
//     .then(response => {
//       if (response.ok) return response.json();
//       throw new Error('Error fetching data');
//     })
//     .catch(err => {
//       console.error('Error: ', err);
//     });
// };

export default { fetchNews, fetchComments, fetchNewest };
