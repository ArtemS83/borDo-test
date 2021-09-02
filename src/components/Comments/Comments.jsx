import React from 'react';
import { withRouter } from 'react-router-dom';
import './Comments.css';

const Comments = ({ data, location, history }) => {
  const { title, comments } = data;

  const handelGoBack = () => {
    history.push(location?.state?.from || '/');
  };

  return (
    <>
      <button type="button" onClick={handelGoBack} className="go-back">
        Go back
      </button>
      <h2>Title: {title}</h2>

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

export default withRouter(Comments);
