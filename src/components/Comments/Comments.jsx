import React, { useState } from 'react';
import './Comments.css';

const Comments = ({ data }) => {
  const { title, url, comments } = data;

  return (
    <>
      <button type="button">
        <a href="/"> Go back</a>
      </button>
      <h2>Title: {title}</h2>
      <a href={url} target="_blank">
        {url}
      </a>
      <h3>Comments</h3>

      {comments?.length > 0 ? (
        <ul>
          {comments?.map(comment => (
            <li
              key={comment.id}
              dangerouslySetInnerHTML={{
                __html: comment.content.replace(/<p>/g, ''),
              }}
            />
          ))}
        </ul>
      ) : (
        <p>No comments</p>
      )}
    </>
  );
};

export default Comments;
