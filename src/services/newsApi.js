// const BASE_URL = 'https://api.hnpwa.com/v0/';

const fetchNews = (currentPage = 1) => {
  // return fetch(`${BASE_URL}${currentPage}.json`, {
  return fetch(`https://api.hnpwa.com/v0/${currentPage}.json`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      mode: 'no-cors',
    },
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .catch(err => {
      console.error('Error: ', err);
    });
};

const fetchComments = id => {
  return fetch(`https://api.hnpwa.com/v0/item/${id}.json`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .catch(err => {
      console.error('Error: ', err);
    });
};

export default { fetchNews, fetchComments };
