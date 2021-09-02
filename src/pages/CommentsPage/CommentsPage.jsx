import React, { useState, useEffect } from 'react';
import newsApi from '../../services/newsApi';
import Comments from '../../components/Comments';

const CommentsPage = props => {
  const [comments, setComments] = useState([]);
  const idNews = Number(props.match.params.newsId);

  useEffect(() => {
    newsApi.fetchComments(idNews).then(data => {
      setComments(data);
    });
  }, []);

  return (
    <>
      <h1>Comments</h1>
      <Comments data={comments} />
    </>
  );
};

export default CommentsPage;
