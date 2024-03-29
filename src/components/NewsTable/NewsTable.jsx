import React, { useState, useMemo, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './NewsTable.css';
import { MOBILE_MAX } from '../../utils/CONSTANTS.js';

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

const NewsTable = ({ news, location, title = 'News' }) => {
  const { items, requestSort, sortConfig } = useSortableData(news);
  const [isMobile, setIsMobile] = useState(false);

  const backLocation = location?.pathname;

  const handleResize = () => {
    const windowInnerWidth = window.innerWidth;
    windowInnerWidth < MOBILE_MAX ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getClassNamesFor = name => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <>
      {isMobile && (
        <button
          type="button"
          onClick={() => requestSort('time')}
          className={`${getClassNamesFor('time')} timeMobile`}
        >
          time
        </button>
      )}
      <table>
        <caption>{title}</caption>
        <thead>
          <tr>
            {!isMobile && (
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('time')}
                  className={getClassNamesFor('time')}
                >
                  Time
                </button>
              </th>
            )}

            <th>
              <button
                type="button"
                onClick={() => requestSort('title')}
                className={getClassNamesFor('title')}
              >
                Title
              </button>
            </th>
            {!isMobile && (
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('domain')}
                  className={getClassNamesFor('domain')}
                >
                  Domain
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {items?.map(item => (
            <tr key={item.id}>
              {!isMobile && (
                <td>
                  <Link
                    to={{
                      pathname: `comments/${item.id}`,
                      state: { from: backLocation },
                    }}
                  >
                    <span className="block-with-text">
                      {toISODate(item.time)}
                    </span>
                  </Link>
                </td>
              )}

              <td>
                <Link
                  to={{
                    pathname: `comments/${item.id}`,
                    state: { from: backLocation },
                  }}
                >
                  <span className="block-with-text">{item.title}</span>
                </Link>
              </td>
              {!isMobile && (
                <td>
                  <Link
                    to={{
                      pathname: `comments/${item.id}`,
                      state: { from: backLocation },
                    }}
                  >
                    <span className="block-with-text"> {item.domain}</span>
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
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

export default withRouter(NewsTable);
