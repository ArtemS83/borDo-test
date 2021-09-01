import React, { useState, useMemo } from 'react';
import './Table.css';
import newsApi from '../../services/newsApi';
import Comments from '../Comments/Comments.jsx';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const Table = ({ news }) => {
  const { items, requestSort, sortConfig } = useSortableData(news);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const getClassNamesFor = name => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const hendleComments = id => {
    newsApi.fetchComments(id).then(data => {
      setComments(data);
    });
    setCommentsLoading(true);
  };

  return (
    <>
      {commentsLoading ? (
        <Comments data={comments} />
      ) : (
        <table>
          <caption>News</caption>
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('time')}
                  className={getClassNamesFor('time')}
                >
                  Time
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('title')}
                  className={getClassNamesFor('title')}
                >
                  Title
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('domain')}
                  className={getClassNamesFor('domain')}
                >
                  Domain
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {items?.map(item => (
              <tr
                key={item.id}
                onClick={() => {
                  hendleComments(item.id);
                }}
              >
                <td>{toISODate(item.time)}</td>
                <td>{item.title}</td>
                <td>{item.domain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

function toISODate(milliseconds) {
  const date = new Date(milliseconds * 1000);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  h = h < 10 ? '0' + h : h;
  min = min < 10 ? '0' + min : min;
  s = s < 10 ? '0' + s : s;
  return [y, m, d].join('-') + ' ' + [h, min, s].join(':');
}

export default Table;
