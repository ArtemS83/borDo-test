import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import newsApi from './services/newsApi';

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    newsApi
      .fetchNews()
      .then(data => {
        setNews(data);
      })
      .catch(error => console.log('ERROR: ', error));
  }, []);

  return (
    <>
      <Table news={news} />
    </>
  );
}

export default App;
