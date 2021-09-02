import React, { useState } from 'react';
import './Comments.css';

const Comments = ({ data }) => {
  const { title, comments } = data;

  return (
    <>
      <button type="button">
        <a href="/"> Go back</a>
      </button>
      <h2>Title: {title}</h2>
      <h3>Comments</h3>

      {comments?.length > 0 ? (
        <ul>
          {comments?.map(comment => (
            <li
              key={comment.id}
              dangerouslySetInnerHTML={{
                __html: comment.content,
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
