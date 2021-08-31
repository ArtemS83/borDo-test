import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import newsApi from './services/newsApi';

function App() {
  const [news, setNews] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    newsApi.fetchNews(page).then(data => {
      setNews([...news, ...data]);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (loadMore && page <= 10) {
      newsApi.fetchNews(page).then(data => {
        setNews([...news, ...data]);
      });
    }
    setLoadMore(false);
  }, [loadMore]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage(prevPage => prevPage + 1);
    setLoadMore(true);
  }

  return (
    <>
      <Table news={news} />
      {loadMore && (
        <div style={{ textAlign: 'center', fontSize: '24px' }}>Loding..</div>
      )}
    </>
  );
}

export default App;
