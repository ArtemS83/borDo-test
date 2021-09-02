import React, { useState, useEffect } from 'react';
import NewsTable from '../../components/NewsTable';
import Loader from '../../components/Loader';
import newsApi from '../../services/newsApi';

const NewestPage = () => {
  const [news, setNews] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    newsApi.fetchNewest(page).then(data => {
      setNews([...news, ...data]);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (loadMore && page <= 10) {
      newsApi.fetchNewest(page).then(data => {
        setNews([...news, ...data]);
      });
    }
    setLoadMore(false);
  }, [loadMore]);

  function handleScroll() {
    if (
      Math.round(window.scrollY + window.innerHeight) >=
      Math.round(document.body.scrollHeight)
    ) {
      setPage(prevPage => prevPage + 1);
      setLoadMore(true);
    }
  }
  // Newest
  return (
    <>
      <NewsTable news={news} title="Newest" />
      {loadMore && <Loader />}
    </>
  );
};

export default NewestPage;
